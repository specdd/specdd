---
title: "Hacking SpecDD: Iterative Development Using Specs as Planning Checkpoints"
date: 2026-05-10
seoDescription: "A practical guide to using SpecDD specs as iterative planning checkpoints, so AI agents can expose ambiguities, contradictions, and bad assumptions before implementation runs too far."
excerpt: "SpecDD specs are not only starting instructions. They can become planning checkpoints between intent, agent interpretation, implementation, review, and the next slice of work. The useful trick is asking the agent to plan against the spec, then using that plan to correct the agent, the spec, or your own assumptions before they become code."
author: "Matīss Treinis"
---

One of the easiest ways to get into trouble with AI-assisted development is to let the agent run too far before it has
to show its reasoning.

The starting prompt can be reasonable, the nearby code can be readable, and the agent can even make a plan that sounds
coherent when it summarizes the work afterward. The problem is that all of this may happen after it has already crossed
a boundary, expanded the scope, skipped an edge case, or implemented a plausible version of the feature that does not
match the product, security model, or local architecture.

I am not arguing for keeping agents on tiny tasks forever. The point is to give them regular stopping points, and
SpecDD works well as that stopping point. A spec is not only something you write once before implementation begins. It
can become the checkpoint you return to between each slice of work: update the spec, ask for a plan, review the plan,
correct the plan or the spec, implement a bounded slice, run tests, then update the spec again before moving on.

That rhythm matters because a plan is not only a plan. When an agent plans against a spec, it is also reviewing the
spec.

## The plan tests the spec

It is natural to treat the spec as the thing that tells the agent what to do, which is mostly right, but that framing
misses a useful feedback loop. If the agent reads the spec and produces a strange plan, the agent may be wrong because
it ignored a rule, chose a generic pattern from its training data, or tried to touch files outside the intended slice.
The spec may also be wrong.

It may contain a contradiction, or use a word that looks obvious to you but has two reasonable interpretations in the
codebase. It may describe behavior that made sense before the last refactor, leave out a `Must not` rule because
everyone on the team already knows the boundary, or include a `Done when` line that sounds complete while missing the
test case that actually protects the system.

That is why the plan is valuable before implementation. It gives you a cheap way to see how the spec is being
interpreted. If the interpretation is wrong, you can correct the agent, and if the spec made the wrong interpretation
too easy, you can correct the spec. Sometimes the plan also corrects your own assumption because the agent points at a
real conflict between what you wrote and how the system currently works.

The spec remains the source of truth after review. It just does not have to pretend it was perfect on the first pass.

## A loop that stays small

The iterative loop is simple enough to use without turning it into process theater.

You write or update the spec for the part of the system you want to change. Then you ask the agent to explain the plan
without editing files. You review that plan against the spec and the actual codebase. If the plan is wrong, the agent
revises the plan. If the spec is unclear or contradictory, the spec changes first. Only then do you ask for one bounded
implementation slice.

After that slice, you run tests and review the diff against the spec. If implementation reveals a missing rule, the
rule goes back into the spec before the next slice starts. If a task is complete, the task status can change. If
follow-up work remains, it can be captured under `Tasks` without inventing a new section.

`Tasks` are more than bookkeeping in this loop. They give you a practical control surface for phased agent work: one
task can be planned, implemented, tested, reviewed, and marked before the next task starts. That makes all kinds of
step-by-step agent tricks possible without losing the spec as the source of truth.

This loop is useful because it gives the agent permission to be helpful without giving it unlimited room to improvise.
It also gives you a place to notice that your own spec was not quite saying what you meant.

## Password reset, one slice at a time

Password reset is a good example because it looks ordinary and still contains enough edge cases to punish vague
implementation. There is token generation, email handoff, account enumeration risk, expiration, reuse, password update,
and test coverage that has to match the security model.

Here is a deliberately compact first spec:

```sdd
Spec: Password Reset

Purpose:
  Let users regain access to their account through a secure email reset flow.

Must:
  Let a user request a reset link by email.
  Send a reset link only if the email belongs to an existing account.
  Avoid revealing whether an email address exists.
  Let the user set a new password with a valid reset token.

Must not:
  Store raw reset tokens.
  Reveal account existence in the request response.
  Allow expired or reused tokens.

Done when:
  Users can request a reset link.
  Users can reset their password with a valid token.
  Tests cover missing accounts, expired tokens, and reused tokens.
```

This is a decent first pass, but it has tension in it. "Send a reset link only if the email belongs to an existing
account" describes internal behavior, while "Avoid revealing whether an email address exists" describes external
behavior. Those can coexist, but the spec does not make the boundary explicit yet, which is exactly the kind of thing a
planning checkpoint can catch.

## First checkpoint: ask for the plan

Instead of asking the agent to implement password reset immediately, you can ask it to read the spec and explain its
plan.

```text
Read the password reset spec and explain your implementation plan.
Do not change files yet.
Call out any contradictions, ambiguities, or assumptions you notice.
```

A useful plan might say it expects to build a token service, a reset request endpoint, an email handoff, a reset
completion endpoint, and tests for missing accounts, expired tokens, and reused tokens. It may also flag the tension in
the spec: the system must send email only for real accounts, but the public request response must look the same whether
or not an account exists.

That is not the agent being difficult. It is the checkpoint doing its job.

The spec can now become clearer before code exists:

```sdd
Spec: Password Reset

Purpose:
  Let users regain access to their account through a secure email reset flow.

Must:
  Let a user request a reset link by email.
  Always return the same reset request response whether or not the email exists.
  Send a reset email only when the email belongs to an active account.
  Do not create reset tokens for missing or inactive accounts.
  Let the user set a new password with a valid reset token.

Must not:
  Store raw reset tokens.
  Reveal account existence through response text, status code, or timing differences.
  Allow expired or reused tokens.

Done when:
  Users can request a reset link.
  Users can reset their password with a valid token.
  Tests cover missing accounts, expired tokens, and reused tokens.
```

No new SpecDD language was needed; the ambiguity was resolved with clearer `Must` and `Must not` rules.

## First slice: token behavior

Now the work can shrink, because the first implementation slice does not need to build the entire password reset flow.

```text
Implement only the password reset token service according to the spec.
Keep tests aligned with token behavior.
Do not build the email flow yet.
```

At this point SpecDD starts to feel different from a normal agent prompt. The agent has a reviewed contract, but the
implementation request is still bounded enough that a token service can be implemented and tested without touching
email delivery, HTML forms, or controller behavior.

During this slice, the work may expose another missing rule. For example, the agent might ask whether issuing a new
reset token invalidates older unused tokens for the same account. That was not in the first spec, but it matters. If the
team decides the answer is yes, the spec changes before the agent continues:

```sdd
Must:
  Invalidate older unused reset tokens when a new token is issued.
  Record token creation and use timestamps.

Done when:
  Token service tests cover hashing, expiry, reuse, and replacement.
```

Again, the important thing is not that the agent knew the answer. The useful part is that the planning and
implementation cycle exposed the missing decision while the patch was still small.

## Second slice: request flow and email handoff

The next checkpoint can ask for another plan, now against the updated spec and the code that already exists.

```text
Read the updated password reset spec and token service.
Explain the plan for the reset request flow.
Do not change files yet.
```

Architecture drift often shows up here. The agent may plan to send email directly from the controller because that is a
simple pattern and it appears in plenty of code examples, while your project may have an existing email handoff service,
background job, or notification boundary that the controller is not supposed to bypass.

If the plan is wrong, you can correct the plan:

```text
Use the existing email handoff pattern.
Keep the request response generic.
Do not send email directly from the controller.
```

If that rule belongs permanently in the local contract, it can move into the spec:

```sdd
Must:
  Use the existing email handoff pattern for reset emails.

Must not:
  Send reset emails directly from the request controller.
```

Then the implementation slice can stay short:

```text
Implement the reset request flow according to the spec.
Use the existing email handoff pattern.
Keep responses generic.
```

That is the pattern in miniature: the agent plans, the plan exposes a possible drift, and the spec absorbs the rule if
the rule is part of the system rather than just a one-time correction.

## Third slice: reset completion

The final user-facing slice can build on the decisions already captured.

```text
Implement password reset completion according to the spec.
Keep token verification, password update, and token invalidation aligned with tests.
```

At this point the agent is no longer holding the entire password reset feature in a single prompt. The token rules, the
generic response behavior, the email boundary, and the missing-account behavior all live in the spec. The implementation
prompt can be short because the contract has been improved along the way.

Review also gets easier because you are not reviewing the patch against a long conversation. You are reviewing it
against the current spec. Does the code satisfy `Must`? Does it avoid `Must not`? Do the scenarios still describe the
behavior? Are the `Done when` items actually done with tests?

The shift is subtle, but it saves a lot of re-explaining.

## What the checkpoints catch

Planning checkpoints catch scope drift first. The agent may want to build password reset tokens, email templates,
session revocation, rate limiting, support tooling, and audit logs in one pass. Some of that may be useful later, but it
does not all belong in the same slice. The spec gives you a place to keep the slice honest.

They also catch architecture drift. AI agents are very good at finding generic patterns that are common in public code,
but your project may have a different boundary for good reasons. A plan that says "the controller sends the email" is
the right moment to notice that your architecture says otherwise.

Behavior drift shows up when the agent implements something plausible that misses the product or security rule. Password
reset is full of this: responses must be generic, tokens must not be raw, reused tokens must fail, inactive accounts
need defined behavior, and permission or account state cannot be guessed casually.

There is also spec drift, which is the easiest one to miss if you treat specs as perfect once written. A spec can be
stale, contradictory, ambiguous, or based on an assumption that no longer matches the code. Asking the agent to plan
against it is a cheap way to discover that, especially when the prompt explicitly asks for contradictions and
ambiguities.

## Handling uncertainty without inventing syntax

Sometimes planning exposes a question that is real but not ready to answer. That does not require inventing a new spec
section. SpecDD already has places for the result once the team knows what to do with it.

A firm rule can become `Must` or `Must not`. A behavior example can become a `Scenario`. Completion criteria can become
`Done when`. Deferred implementation work can use `Tasks` with the documented task states.

For example:

```sdd
Tasks:
  [ ] Revoke existing sessions after password reset.
  [ ] Add reset request rate limiting in the shared auth middleware.
  [ ] Add tests for missing, expired, reused, and replaced reset tokens.
```

That keeps the spec language consistent while still making deferred work visible. It also gives you a way to ask the
agent for one bounded phase at a time instead of letting it expand scope because the spec left a blank space.

The exact wording matters less than the fact that follow-up work becomes explicit in a form the next planning cycle can
see.

## When the plan changes, the spec changes first

There is a useful discipline here: if the agent's plan changes because the spec was unclear, update the spec before
implementation continues. The update can be small. It might be one clarified `Must`, one added `Must not`, one scenario,
one changed `Done when` line, or one added `Tasks` item for follow-up work.

This keeps the project memory ahead of the code. If the agent simply changes direction in chat and then implements, the
conversation may be correct but the repository remains under-specified. The next agent has to rediscover the same
thing. The next developer has to read the old ticket. The next review has to reconstruct intent from memory again.

SpecDD is most useful when the correction lands in the spec, not only in the conversation.

The same idea works beyond new features. A migration can move one data path at a time, with the spec defining which old
behavior must remain stable. A refactor can use the spec to state what public contract must not change. A bug fix can
add the missing scenario before the fix is implemented. Performance work can define what must improve and what must not
be traded away to get the improvement.

In each case, the spec is the checkpoint. The agent stops, explains the plan, exposes its assumptions, and gives you a
chance to correct the plan or the contract before the next patch exists.

That is the real hack. Iterative development with AI works better when the agent has a place to stop and show its
reasoning, and SpecDD gives that stopping point a durable form. The spec is not only the starting instruction; it is the
checkpoint that lets you correct the agent, correct the spec, and sometimes correct your own assumptions before they
become code.
