---
title: "How to use specs as a source of truth"
seoDescription: "Use SpecDD specs as the durable source of truth for spec-driven development behavior, boundaries, tasks, and review instead of temporary prompts or scattered tickets."
excerpt: "Make specs the reviewed, versioned source of truth by putting intended behavior in the repository, keeping it synced with code, and reviewing changes against it."
level: "Beginner"
howtoID: "1071010"
weight: 110
---

This guide shows you how to use SpecDD specs as the source of truth for project behavior in a spec-driven development
workflow.

The core shift is simple: the durable context lives in the repository, not in a one-time prompt. Prompts, tickets, and
chat threads can start work, but the reviewed spec is what humans and agents should use when implementing and reviewing
behavior.

## Short answer

Put durable intent, ownership, boundaries, dependencies, tasks, and completion criteria in `.sdd` files beside the work
they govern. Treat prompts and tickets as inputs, not authority. Review the spec before implementation, review the code
against the spec, and update the spec whenever behavior intentionally changes.

## When to use this guide

Use this guide when:

- agents repeat mistakes because context lived only in earlier prompts
- tickets describe behavior that should outlive the sprint
- reviewers cannot tell whether code matches intended behavior
- existing documentation is too broad to guide local changes
- the team wants humans and agents to share the same operating context

## What belongs in the source of truth

Put durable project behavior in specs:

- what a module, feature, service, component, API, model, or job owns
- what behavior must hold
- what behavior is forbidden or out of scope
- what dependencies are allowed or required
- what files may be modified
- what tasks remain
- what completion criteria reviewers should check

Do not put one-time coordination in specs unless it changes durable behavior.

## Steps

### 1. Move durable decisions into specs

If a ticket says:

> The itinerary validator must reject blank place names and must not change destination search.

turn that into a local spec:

```sdd
Spec: Itinerary validation

Purpose:
  Prevent incomplete itinerary items from being saved.

Must:
  Reject itinerary items without a place name.

Must not:
  Change destination search behavior.
```

Now the rule survives the ticket, the chat, and the prompt that started the change.

### 2. Keep prompts and tickets temporary

Use prompts to ask for action:

```text
Implement the missing-place validation task for Itinerary validation.
```

Use tickets to coordinate people, priority, deadlines, and discussion.

Use specs for the durable local contract. If a prompt or ticket contains behavior the project must preserve, move that
behavior into a spec before implementation relies on it.

### 3. Review specs before coding

Before implementation starts, review the spec for:

- correct intended behavior
- local ownership
- appropriate boundaries
- unresolved ambiguity
- testable outcomes
- compatibility with parent specs

A generated draft is not the source of truth until it has been reviewed.

### 4. Compare code against specs

During review, ask:

- Did the change implement the specified behavior?
- Did it stay within `Owns` and `Can modify` authority?
- Did it avoid `Must not` and `Forbids` violations?
- Did it satisfy `Done when`?
- Did the change reveal a missing or stale spec rule?

Specs do not replace code review. They make the review target explicit.

### 5. Update specs with behavior changes

When code intentionally changes behavior, update the spec in the same change or in a preceding spec-only change.

Do not let the source of truth lag behind implementation. Drift makes later work slower because humans and agents must
guess which source to trust.

### 6. Use tests to prove specified behavior

Specs explain why behavior exists and where it belongs. Tests prove the behavior works.

Use specs to derive tests, especially from:

- `Must`
- `Must not`
- `Scenario`
- `Example`
- `Handles`
- `Raises`
- `Done when`

When a test fails because behavior intentionally changed, update the spec and the test together.

## Common mistakes

- Treating a prompt as durable project context.
- Leaving important behavior only in a ticket comment.
- Updating code without updating the governing spec.
- Using specs as a replacement for tests.
- Using tests as a replacement for design intent and boundaries.
- Keeping one large central document instead of local specs beside the governed work.

## How to verify the result

Specs are acting as the source of truth when:

- durable behavior is in versioned `.sdd` files
- humans and agents can find local context beside the work
- prompts refer to named work instead of restating all rules
- reviews compare diffs against specs
- intentional behavior changes update specs
- tests cover the behavior the specs define

## Related how-tos

- [How to run the spec-first loop](/how-to/spec-driven-workflows/how-to-run-the-spec-first-loop/)
- [How to keep specs in sync with code changes](/how-to/spec-driven-workflows/how-to-keep-specs-in-sync-with-code-changes/)
- [How to require spec updates in code review](/how-to/code-review-and-governance/how-to-require-spec-updates-in-code-review/)
- [How to decide what belongs in a ticket vs a spec](/how-to/teams-and-process/how-to-decide-what-belongs-in-a-ticket-vs-a-spec/)

## Related reference

- [Quickstart](/quickstart/)
