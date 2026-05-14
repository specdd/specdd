---
title: "SpecDD for Developers"
date: 2026-05-03
description: "A developer-focused introduction to SpecDD, showing how local .sdd files make AI-assisted implementation easier to scope, review, test, and keep aligned with real project constraints."
excerpt: "AI coding agents are good at producing plausible code. SpecDD helps make that code right for your project by putting small, local implementation contracts beside the files they govern. For developers, that means less re-explaining, fewer boundary violations, clearer reviews, and a workflow that gives agents the context they need before they start guessing."
author: "Matīss Treinis"
---

If you have spent any serious time with AI coding agents, you have probably seen two failure patterns often enough that
they stop being surprising.

The first is the local-context miss. The agent reads the nearby code, finds a plausible pattern, writes something that
looks reasonable, and still gets the important part wrong. Sometimes it imports from a layer it should not know about,
or adds an option to a public type without understanding the migration cost. Other times it handles the happy path
correctly while missing the product rule that makes the edge case matter, or rewrites a helper because the helper looks
small rather than because it is the right place to make the change.

The second is more subtle, and in some ways more annoying. The agent brings in a pattern that is broadly considered
"best practice" because that is what the internet, framework tutorials, and its training data have taught it to prefer.
It assumes validation belongs in one layer, state belongs in another, a repository should look a certain way, or a
framework feature is the obvious modern answer. Those ideas may be reasonable in many projects, but they are still
wrong when your local architecture has different boundaries, different runtime constraints, or a history that explains
why the obvious pattern is not the right one here.

In both cases, the diff can be competent in isolation while still not quite belonging to the system you are working on.

The part that burns time is not nonsense code, which is usually easy to reject. The expensive output is the
almost-correct patch that requires you to reconstruct the missing context, explain the boundary again, steer the agent
back into the local design, and then review a second or third attempt.

SpecDD is a way to stop doing that work over and over in chat. For developers, the idea is simple: put the context the
agent needs next to the code it is changing, in a small structured file that is easy for humans to review and precise
enough for agents to follow. Instead of hoping the model infers the local rules from source code, tickets, old comments,
and whatever you remembered to write in the prompt, you give it a local contract and make the implementation follow
that contract.

## The agent is usually underbriefed

It is tempting to describe bad agent output as a model quality problem, and to be fair, it very often is. Models still
miss things, reason poorly, overfit to the visible pattern, or invent a shortcut that a careful developer would avoid.
But in many day-to-day coding failures, the agent is failing less at programming than at being a member of your project.

That distinction matters because project knowledge is not contained cleanly in the code. Some of it is there, of course,
but a lot of it is distributed across commit history, pull-request comments, incident reviews, product decisions,
architectural preferences, team habits, and the memory of people who have worked in the codebase long enough to know
where the traps are.

Humans learn that context slowly. We ask questions, get review comments, break something once, remember the pain, and
eventually develop a sense for what belongs where. An AI agent does not get that slow immersion unless you put the
relevant knowledge in front of it at the moment it needs to act.

The usual workaround is prompting. You tell the agent what to do, mention the boundary, paste some notes, maybe point it
at a few files, and hope that is enough. It often is enough for a small change, but it does not leave the project in a
better state after the change is done. The next session starts cold, the next agent does not inherit your explanation,
and the next developer still has to discover the same rule. SpecDD moves that context out of the conversation and into
the repository.

## A prompt should not be your only contract

Prompts are useful, but they are a poor place to keep durable engineering intent. They are transient by default, and
even when they are saved somewhere, they rarely stay connected to the code they were meant to guide. A prompt can tell
an agent what you want right now, while a spec can tell every future agent and developer what must remain true in that
part of the system.

If a service must never call a vendor SDK directly, that rule should not have to be rediscovered in review every time
someone touches the service. If a parser owns a particular normalization step, that should not live only in the head of
the person who wrote it. If a component exposes a narrow public API and intentionally hides a messier internal model,
the agent should not have to infer that from the file layout alone.

A local spec gives those rules somewhere to live, and it gives you something better to review. Instead of reviewing an
AI-generated patch against a mental model you have to rebuild every time, you can review it against a small contract
that sits next to the code. When the implementation and the spec disagree, you have a concrete question to answer: is
the implementation wrong, or did the intended behavior actually change?

That question is much cheaper than reading a diff and trying to remember why the module looks the way it does.

## What the file looks like

SpecDD specs are intentionally plain. They are small `.sdd` files written in a section-based format that an agent can
parse without needing a custom tool. A real project can get more detailed, but the useful core is easy to understand.

```sdd
Spec: Password Reset Tokens

Purpose:
  Issue and verify short-lived password reset tokens.

Owns:
  password-reset-token.service.ts
  password-reset-token.repository.ts

Exposes:
  PasswordResetTokenService.issue(userId)
  PasswordResetTokenService.verify(token)

Depends on:
  ../users/user.repository.ts
  ../../shared/clock.ts
  ../../shared/random.ts

Must:
  Store only a hash of the reset token.
  Expire tokens after 30 minutes.
  Invalidate older tokens for the same user when a new token is issued.
  Return a generic failure for missing, expired, or already used tokens.

Must not:
  Store the raw reset token.
  Reveal whether an account exists.
  Send email directly.

Scenario: issue token
  Given a user exists
  When a reset token is issued
  Then the stored token value is hashed
  And previous tokens for that user are invalidated
  And the raw token is returned exactly once

Scenario: verify expired token
  Given a reset token was issued more than 30 minutes ago
  When the token is verified
  Then verification fails with a generic error
  And no account existence information is exposed

Done when:
  Unit tests cover issue, verify, expiry, reuse, and missing token behavior.
  The service does not import email delivery code.
```

There is nothing magical in that example, which is exactly the point. The spec names ownership, dependencies, behavior,
non-goals, scenarios, and the finish line in a form a developer can read, a reviewer can challenge, and an agent can
implement against.

The most important sections are usually the ones developers already reason about informally. `Purpose` explains why the
thing exists, while `Owns` and `Depends on` define the working area and the acceptable neighborhood. Required behavior
belongs in `Must`, hard boundaries and common mistakes belong in `Must not`, and scenarios turn expected behavior into
examples that are concrete enough to test. `Done when` defines the finish line so the agent knows when to stop, instead
of overreaching into work the spec did not ask it to do.

Not every spec needs every section, but it does need enough structure that the agent can tell the difference between a
suggestion, a requirement, and a prohibition.

## Local beats comprehensive

Most developers have seen the documentation trap from both sides. The massive Confluence project is too broad to help
with the thing you are changing. The project docs folder may contain useful background, but it does not reliably tell
you the specific rule that applies inside `src/billing/invoice.service.ts`. The ticket describes the requested change,
but not the local design constraints. The tests show expected behavior, but not always why the behavior exists or what
must not be coupled together.

This problem does not disappear just because the docs move into the repository. A large docs folder can still be stale,
detached from the code path being changed, and too broad to constrain a local implementation decision. Proximity in Git
is useful, but it is not the same as local authority.

SpecDD does not replace all of those artifacts. It changes where the most actionable intent lives.

When a spec sits beside the files it governs, context becomes navigable in the same way code is navigable. If you are
working in a module, you read the module spec. If the module inherits broader rules from a parent directory, the agent
can resolve that chain and carry those rules into the task. You do not need to stuff the whole project into the prompt
because the relevant context is already close to the work.

The same idea works at different grains of the codebase. A nearby module spec can describe the rules for a whole area,
while a service-level spec can describe the public behavior of one service, and a class-level or implementation-level
spec can cover a narrower piece of the design. Those specs are not competing with each other. Each one covers its own
layer of the software. You can also have multiple specs at the same level when the concerns are different, such as one
general service spec and another spec for a particular implementation, adapter, or policy that needs its own local
contract. Same-level specs still need to be targeted or referenced explicitly; sibling specs are not inherited
automatically.

That locality is especially useful with AI agents. Models are good at following clear local instructions. They are much
less reliable when asked to infer which part of a large, loosely related document matters for a specific change. A
massive context window does not solve that by itself. It only gives you more room to mix signal with noise, while small
specs keep the signal sharp enough to use.

## A workflow that fits normal development

The SpecDD workflow is not complicated, and it should not be. You can make it ceremonial if you want, but the useful
version is closer to how careful developers already work.

You start by finding or writing the local spec for the part of the system you are about to change. If the spec already
exists, update it before implementation when the intended behavior is changing. If it does not exist, create the
smallest useful spec for the files you are touching. Then review the spec as intent, not as prose decoration. Once the
contract is good enough, ask the agent to implement against it.

Because the project now contains the important details, the prompt can stay short.

```text
Implement the password reset token service according to its spec.
Keep code and tests aligned with the spec.
```

After implementation, run the tests and review the diff against the spec. If the agent changed something outside the
declared ownership, there should be a reason. If it violated a `Must not`, the patch is wrong. If the implementation
reveals that the spec missed an important rule, update the spec instead of burying the new knowledge in a review
comment.

The loop is small, but it does a few useful things at once: it scopes the work before implementation, gives the agent a
better brief, gives reviewers something concrete to check, and leaves the next developer with more context than you had
when you started.

That last part is easy to undervalue until you work in the same area a month later and do not have to remember the
entire conversation again.

## Make the agent plan against the spec

One of the more useful SpecDD habits is to split planning from implementation. Before you ask an agent to change code,
you can ask it to read the relevant spec and explain what it intends to do.

```text
Read the password reset token spec and explain your implementation plan.
Do not change files yet.
```

That sounds like a small procedural detail, but it catches a lot of problems early. If the agent plans to touch files
outside the spec's ownership, you can stop it before the diff exists. If it misunderstands a `Must not` rule, you can
correct the interpretation while the mistake is still cheap. If the plan reveals that the spec is ambiguous, you can fix
the spec before implementation turns that ambiguity into code.

`Tasks` can make this even more controlled. Instead of asking the agent to implement the whole spec in one pass, you can
ask it to implement the next unchecked task, run the relevant tests, and keep the task status aligned with the spec.
That turns the spec into a phased implementation surface without turning the workflow into ceremony.

The planning cycle does not need to be heavy. For a small change, the plan might be five bullets and one clarification
question. For a larger feature, it might describe the files involved, the test cases it expects to add, the behavior it
will preserve, and the parts of the spec that drive each decision. The useful part is not the ceremony, but the moment
where the agent has to show its reading of the contract before it acts on it.

That also gives you a cleaner way to steer the work. Instead of reviewing a completed patch and saying, "you changed
the wrong layer," you can tell the agent that the plan crosses a boundary and ask it to revise the plan first. Once the
plan matches the spec, implementation becomes much less surprising.

There is a secondary benefit for your own thinking. Specs are often improved by watching how an agent interprets them.
If a capable agent reads a rule differently from how you intended it, there is a reasonable chance another developer
will eventually do the same. Planning exposes those gaps while you are still discussing intent, not after code has been
written around the wrong interpretation.

In practice, this gives you a tight loop: update the spec, ask for a plan, correct the spec or the plan, then implement.
For work that is risky, cross-cutting, or easy to misunderstand, that loop is usually cheaper than letting the agent
write first and sorting out the intent afterward.

## Where it helps first

SpecDD is most useful where agents tend to make locally plausible but project-wrong decisions. That usually means code
with boundaries, business behavior, or accumulated history.

Service layers are an obvious fit because dependency direction matters there, and adapters tend to benefit for the
related reason that they often exist specifically to keep vendor details contained. Domain modules are useful targets
when the code does not make the business rule obvious. Shared utilities deserve the same treatment when a small change
can ripple across the whole project, and frontend components can benefit when they have accessibility, state ownership,
or API constraints that are easy for an agent to flatten into a simpler implementation.

Specs also help during refactors. A refactor is supposed to preserve behavior while changing structure, but an AI agent
will sometimes "improve" behavior along the way because the old behavior looks accidental. A spec gives you a place to
say which behavior is intentional, which dependency should disappear, and which public surface must remain stable.

Tests become easier to aim as well. Scenarios in specs are not a replacement for tests, but they give tests a clearer
source. If a scenario says an expired reset token returns a generic failure, the test can assert that behavior directly.
If the implementation produces a more specific error because that was convenient internally, you have a clean mismatch
to fix.

The same applies to `Must not` rules. Tests can cover some of them, static checks can cover others, and code review can
cover the rest. The important part is that the rule exists somewhere explicit before the agent violates it.

## Good specs are small and sharp

A useful SpecDD file is not a long essay about the module, but a compact contract for the work that happens there. That
means the writing style matters, even though the format is plain text.

Prefer concrete rules over general guidance. `Must not: Send email directly` is better than "try to keep notification
concerns separate," and `Owns: password-reset-token.service.ts` is better than a vague note that the service is related
to password reset. Allowed dependencies should be named, boundaries should be written as boundaries, and edge cases
should become scenarios when they clarify the behavior.

Avoid turning one spec into a dumping ground for the entire subsystem. Once a file grows large enough that an agent has
to hunt through it for the part that matters, you have recreated the big-doc problem at a smaller scale. Split specs
around ownership and behavior. Let the directory structure do some of the work.

Be careful with generated specs. Agents are good at drafting them from existing code, and that can save real time, but
the generated spec is only as useful as your review. If the agent misunderstands the design and writes that
misunderstanding into a spec, future implementation will follow the wrong contract with impressive consistency. Drafting
is cheap; review is where the engineering judgment lives.

The test I use is simple enough: could another developer make a correct change in this area with only the code, this
spec, and the usual project bootstrap? If not, the spec is probably missing something important or saying too much in
the wrong places.

## Existing projects can adopt SpecDD unevenly

You do not need to stop the team and specify the whole codebase. That would be the fastest way to turn a useful idea
into a documentation project nobody asked for.

Start with the next piece of code you were already going to change. If the module has no spec, ask an agent to draft
one from the existing implementation, then correct it before using it. Keep the first version small. Capture the
purpose, the files it owns, the dependencies it should and should not use, and the behavior you know is easy to get
wrong. Add scenarios where they clarify the work. Leave the spec better than you found it when the change is complete.

Because SpecDD is local, you can add it around a risky adapter without touching the rest of the system, add it to a
feature while leaving older features alone, or use it heavily in areas where agents do a lot of work and lightly in
areas that are stable.

Over time, the parts of the codebase that change most often accumulate the most useful context, which is usually the
right shape. Specifications should follow the heat of development, not sit in a perfect but unused map of the entire
project.

## Follow SpecDD, fit the project

There are two things worth keeping separate. The SpecDD file definition and section language should be followed.
`Purpose`, `Owns`, `Depends on`, `Must`, `Must not`, `Scenario`, `Done when`, `Tasks`, and the documented task states
mean what SpecDD says they mean, and tooling will eventually rely on that consistency. If every project gives those
words private meanings, agents and tools lose the grammar.

Where the files live is different. Specs should follow the shape of the platform, language, framework, and architecture
you are already using. A Rails app, a Go service, a React frontend, and a Java project do not need to arrange specs
identically. Put the spec near the code whose boundary it describes, and let the local architecture decide whether that
means a module spec, a service spec, an adapter spec, a component spec, or something narrower.

Naming should follow the same logic. Do not fight the naming rules of the platform, language, framework, or project
just to make every spec look identical across ecosystems. A capable AI tool should be able to follow local naming
conventions when the files are placed sensibly, and if the convention matters, write it into the project override file
so every agent sees the same rule.

The bootstrap files should stay as small and succinct as the project allows. `.specdd/bootstrap.md` teaches the common
SpecDD workflow and language, while `.specdd/bootstrap.project.md` and `.specdd/bootstrap.local.md` adapt that workflow
to the project, user, environment, or operator. Use them to explain how agents should apply SpecDD in this codebase,
not to dump a second documentation system into the prompt. Where possible, prefer rules that teach the agent how to
find and use local authority over rules that try to preload everything the agent might need to know.

## The point is less re-explaining

The best developer tools remove boring work without hiding the important decisions, and SpecDD belongs in that category.
It does not remove the need to understand the code, review patches, write tests, or make design calls. It removes some
of the repeated context transfer that makes AI-assisted development feel more tiring than it should.

You still have to tell the agent what matters, but you do it in a place where the project can keep the answer.

The practical payoff shows up the next time an agent touches the module. It can read the rule instead of rediscovering
it, and the next reviewer can compare the patch against a contract instead of reconstructing intent from memory. A
developer coming in later can understand why the obvious shortcut is not the right shortcut, while tests can line up
with behavior that has been written down before implementation starts.

SpecDD does not make AI agents perfect, and it does not pretend that code review becomes optional. What it does is make
the agent less dependent on guessing. In a real codebase, that is the difference between a tool that produces code and a
tool that can participate in the way your project actually works.
