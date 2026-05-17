---
title: "Hacking SpecDD: Generating Specs from Prompts, for Fun and Profit"
date: 2026-05-09
seoDescription: "A practical guide to using AI agents to generate SpecDD specs from rough prompts, then reviewing and tightening those specs before implementation."
excerpt: "You do not have to write every SpecDD spec from scratch. A rough prompt can become a useful first draft, the draft can become a reviewed contract, and the contract can guide implementation. The trick is using AI to make intent cheaper to structure without handing it ownership of the decisions."
author: "Matīss Treinis"
---

One of the more useful discoveries once you start using SpecDD in real work is that the blank page is optional. You do
not have to sit down and produce a polished spec from nothing before anything else can happen. You can begin with the
rough version of what you want: a feature idea, a ticket description, a few notes from a meeting, or the half-formed
prompt you were about to hand directly to an AI coding agent.

The hack is to ask the agent for the spec first.

That changes the shape of the work in a small but important way. If the agent writes code directly from a vague prompt,
its assumptions land in the implementation. If the agent writes a spec first, those assumptions land in plain text,
where they are much cheaper to review, correct, and reuse. The first draft does not need polish so much as it needs to
give you something concrete enough to argue with.

That is where SpecDD becomes a very practical companion to AI-assisted development: you can use the agent to turn messy
intent into structured context, then use your own judgment to decide what the system is actually supposed to do.

## The prompt becomes the contract

Most AI coding workflows treat the prompt as the contract. You describe the feature, the agent writes the code, and the
review happens after the implementation exists. That can work for small tasks, but it is a poor fit for features with
permissions, edge cases, product nuance, or architectural boundaries.

Spec generation gives you another step. The prompt becomes raw material for a spec, the spec becomes the contract, and
the implementation follows that contract.

That may sound like a small distinction until you watch the failure mode change. Instead of discovering during code
review that the agent guessed the wrong ownership model, ignored permissions, or invented a queue because that looked
like a common pattern, you can see those assumptions in the generated spec before the code exists. You can keep the
parts that are right, delete the parts that are invented, and sharpen the parts that were too vague in the original
prompt.

The resulting workflow can stay lightweight: write a rough prompt, generate a spec, review the spec, ask for a plan,
then implement from the reviewed spec. The point is not to add ceremony, but to create one useful checkpoint where
intent can be corrected before it turns into code.

## A rough feature idea

Here is a deliberately ordinary feature idea:

```text
I want users to schedule a report to be emailed every Monday morning.
Only account admins can create schedules.
Users can pause or delete schedules.
The email must not include data the recipient is not allowed to see.
```

This is not a spec yet, and it leaves a lot open, but it already contains the shape of the feature: a recurring
schedule, an admin permission rule, lifecycle operations, and a data access constraint. That is enough to start.

Instead of asking the agent to implement it, you can ask for a SpecDD draft.

```text
Turn this feature idea into a SpecDD spec.
Keep it implementation-neutral.
Include Purpose, Must, Must not, and Done when.
Do not add Scenario sections yet.
Do not invent technical dependencies.
```

A first pass might look something like this:

```sdd
Spec: Scheduled Report Emails

Purpose:
  Allow account admins to schedule report emails every Monday morning.

Must:
  Let account admins create report email schedules.
  Let users pause or delete schedules.
  Send scheduled report emails every Monday morning.
  Ensure emailed report data is visible to the recipient.

Must not:
  Let non-admin users create schedules.
  Email report data to recipients who cannot view it.

Done when:
  Admins can create schedules.
  Users can pause and delete schedules.
  Scheduled emails are sent every Monday morning.
  Report data is not sent to unauthorized recipients.
```

As a first pass, that is useful, but perhaps not quite good enough to implement from yet.

The value of this draft is that the missing pieces are now visible. "Monday morning" has no time zone. "Users" is
ambiguous, because the original prompt says only account admins can create schedules but also says users can pause or
delete them. The spec says the data must be visible to the recipient, but it does not say whether permission is checked
when the schedule is created, when the email is sent, or both. It does not say what happens if the saved report is
deleted, what happens when an account is suspended, whether a paused schedule still appears in the UI, or whether
skipped delivery counts as success.

Those are not nitpicks. They are implementation decisions waiting to happen accidentally.

## Tightening the generated spec

Once the first draft exists, review becomes much easier. You are no longer staring at a vague feature request. You are
looking at a contract that can be corrected.

In this example, a useful review might decide a few things. Monday morning uses the account's configured time zone. Only
account admins can create, pause, resume, or delete schedules. Permission is checked at send time, because access can
change after the schedule is created. Deleted reports skip future delivery rather than sending stale data. Delivery
attempts are recorded so support and administrators can see what happened.

The tightened spec becomes much more useful:

```sdd
Spec: Scheduled Report Emails

Purpose:
  Let account admins schedule recurring email delivery for saved reports.

Must:
  Allow account admins to create, pause, resume, and delete schedules.
  Send scheduled reports on Monday mornings in the account's configured time zone.
  Send report data only to recipients who currently have permission to view the report.
  Skip delivery if the saved report has been deleted.
  Skip delivery while the schedule is paused.
  Record the last attempted delivery time and result.

Must not:
  Send report data to users who no longer have access.
  Continue sending emails for paused or deleted schedules.
  Let non-admin users create or modify schedules.
  Treat skipped delivery as a successful send.
  Send stale report data after the source report has changed or been removed.

Done when:
  Admins can create, pause, resume, and delete schedules.
  Non-admins cannot create or modify schedules.
  Scheduled delivery respects current report permissions.
  Deleted reports and paused schedules do not send emails.
  Delivery attempts record sent, skipped, and failed outcomes.
  Tests cover permission changes, deleted reports, paused schedules, and non-admin access.
```

Notice what happened there. The agent helped create the first structure, but the real value came from reviewing the
meaning. The spec now contains behavior that was not explicit in the original prompt, but those additions are not random
AI invention. They are decisions made visible during review, which is exactly what makes generated specs useful. They
are not a way to avoid thinking, but a way to move the thinking into a form you can inspect.

## Taking it home with scenarios

The shorter spec is easier to review first because it focuses on the contract: purpose, required behavior, forbidden
behavior, and completion criteria. Once that contract feels right, you can add comprehensive scenarios as a separate
verification pass.

```text
Add comprehensive Scenario sections to this spec.
Focus on behavior that product, QA, and implementation all need to verify.
Do not add new feature scope.
```

The scenario pass can append something like this:

```sdd
Scenario: admin creates schedule
  Given an account admin is viewing a saved report
  When they create a Monday morning email schedule
  Then the schedule is saved using the account's configured time zone
  And the schedule is active

Scenario: non-admin attempts to create schedule
  Given a non-admin user is viewing a saved report
  When they try to create a report email schedule
  Then the schedule is not created
  And the user sees a permission error

Scenario: recipient loses access
  Given a report schedule has an active recipient
  And the recipient no longer has permission to view the report
  When the schedule runs
  Then no report data is sent to that recipient
  And the delivery attempt records a skipped recipient

Scenario: saved report is deleted
  Given a report schedule exists for a saved report
  When the saved report is deleted
  Then future deliveries are skipped
  And the schedule is marked inactive or invalid

Scenario: schedule is paused
  Given a report schedule is paused
  When Monday morning arrives in the account's configured time zone
  Then no report email is sent
  And the schedule remains visible for later resume or deletion
```

That is longer on purpose. Scenarios turn broad rules into concrete behavior that can be reviewed, implemented, and
tested. It's long, but QA will thank you, and so will everyone else.

## Let the agent challenge the spec

Once the spec is sharper, you can use the agent again in a different role. Instead of asking it to build, ask it to look
for ambiguity.

```text
Review this spec for ambiguity, missing edge cases, and assumptions.
Do not implement anything.
List only issues that would affect implementation or tests.
```

This kind of prompt works better after a spec exists than it does against a vague feature idea. The agent has something
concrete to inspect, so the feedback tends to become more grounded. It may ask whether recipients are individual users
or groups, whether failed delivery retries exist, whether account suspension disables schedules, whether delivery
records need to be visible in the UI, or whether schedule creation validates recipient access immediately.

Not every question needs to be answered in the first spec. Some questions may be out of scope, and some may belong in a
later spec, but the useful thing is that the questions are now attached to the contract instead of being discovered
halfway through implementation.

You can then update the spec again. If something is intentionally out of scope, capture it as a `Must not`, a local
`Tasks` item when follow-up work is real, or prose around the review rather than inventing a new spec section. Any of
those is better than letting the agent quietly decide.

## Planning before the patch

The next step can be a plan rather than code, which is another small checkpoint that tends to pay for itself on
anything with real behavior.

```text
Based on this spec, explain the implementation plan.
Name the files you expect to change and the tests you expect to add.
Do not edit files yet.
```

The plan might say that it will add a schedule model, a scheduler job, permission checks at delivery time, tests for
admin operations, and tests for skipped delivery. In a real codebase, it might name concrete files and modules, which is
where you get one more chance to catch drift. If the agent plans to put permission logic in the wrong layer, or to send
email directly from a place that only enqueues work, the mistake is still only a sentence in a plan.

This planning step is also a good test of the spec. If the agent cannot produce a coherent plan from the spec, the spec
may still be too vague. If two reasonable plans could follow from the same wording, the spec may need another rule or
scenario. When the plan is aligned, the implementation prompt can become almost boring.

```text
Implement scheduled report emails according to the spec.
Keep code and tests aligned with the spec.
```

That short prompt is the payoff, because the detail lives in the reviewed spec now. The prompt does not have to carry
the entire feature in one fragile block of chat text.

After review, generated specs can also grow a small `Tasks` section when the work naturally breaks into phases. That
lets the implementation prompt become even more boring: implement the first unchecked task according to the spec, keep
tests aligned, then stop. It is a small feature, but it opens up a lot of useful step-by-step agent workflows.

## Existing code can be speced too

The same trick works in reverse when you are bringing SpecDD into an existing project. You can ask an agent to draft a
spec from code that already exists.

```text
Read this module and draft a SpecDD spec that describes what it currently does.
Mark uncertain assumptions clearly.
Do not change code.
```

This can be very useful, especially when a module has grown over time and nobody wants to reconstruct the behavior from
scratch. The agent can summarize ownership, exposed functions, visible behavior, and testable scenarios, giving you a
first draft to review instead of another blank page.

The review matters even more here. Existing code may contain accidental behavior, old bugs, half-finished migrations,
or shortcuts that nobody wants to bless as intended design. If an agent generates a spec from that code without review,
it may turn those accidents into a contract. That can be useful when the goal is to preserve legacy behavior during a
refactor, but it is dangerous when the generated spec quietly declares every current behavior correct.

A good generated spec for existing code marks uncertainty. It says what the code appears to do, where intent is unclear,
and which behaviors may need human confirmation. That is much more useful than a confident document that guesses too
hard.

## The predictable failure modes

Generated specs tend to fail in predictable ways, which is good news because predictable failures are easier to review.

They may invent architecture because the model has seen similar features built with certain patterns before, or sound
too confident about a rule that was only implied by the prompt. They may cover the happy path and forget the negative
rules that actually protect the system. Permissions often start too vague, and error handling often arrives as a generic
sentence that does not say what the user, administrator, or logs will actually show.

The generated spec can also become too broad. A feature prompt about scheduled report emails can accidentally expand
into report creation, account notification preferences, template editing, delivery retries, analytics, and audit logs.
Some of those may matter eventually, but a spec that tries to own everything will guide implementation poorly.

## Less prose, more direction

There is a tempting but wrong way to fix a weak generated spec: add more explanation. If the spec feels thin, you ask
the agent to expand it, make it more detailed, add more context, or explain the feature more fully. Sometimes that
helps, but very often it just produces a longer document with the same uncertainty spread across more words.

With specs, less is often more. A short rule in the right section usually does more useful work than a paragraph of
general guidance. `Must not: Send report data to users who no longer have access` gives the agent a boundary. "Be
careful with permissions and make sure users only see appropriate data" gives the agent something to nod at and then
interpret.

The goal is not to make generated specs more literary. The goal is to make them more directional. Move vague prose into
`Must`, `Must not`, `Scenario`, and `Done when` where the meaning is clear enough to implement and review. If a sentence
does not change what the agent is allowed to do, what it must do, what it must avoid, or how the work will be judged,
it may not belong in the spec at all.

This is where a little more formality helps. Not heavy formality, not a requirements bureaucracy, just enough structure
that the agent can tell the difference between background, requirement, prohibition, example, and finish line. More
words do not necessarily create more context. More precise structure usually does.

The `Must not` section earns its keep here because it gives you a place to say what the feature will not do, which
dependencies it will not take, and which shortcuts are not acceptable. Generated specs often underuse that section until
you prompt for it directly.

```text
Review this spec and add only Must not rules that prevent likely implementation mistakes.
Do not add new feature scope.
```

That prompt is often worth running, because the first generated draft usually describes what to build and says too
little about what to avoid.

## Why the hack works

The useful part of generated specs is not that the agent magically knows what your system means, because it does not.
The useful part is that the agent can quickly turn loose intent into a structured draft, and that draft gives you a
better surface to work with.

AI is good at producing shape, humans are still responsible for meaning, and SpecDD makes
that division of labor practical because the output of the first AI step is not a pile of code you now have to untangle,
but a local contract you can edit before implementation starts.

When that contract is reviewed, the agent gets better context, the developer gets a clearer implementation target, and
the project keeps the result. The next agent does not have to rediscover the decision, the next developer does not have
to search the ticket history, and the next change has a local source of truth to work from.

So yes, you can hack SpecDD by generating specs from prompts. The hack is not letting AI decide what the system means.
The hack is making the first useful draft cheap enough that you actually create it, then turning that draft into
something worth implementing.
