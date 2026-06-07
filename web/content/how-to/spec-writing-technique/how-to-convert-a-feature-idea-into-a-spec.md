---
title: "How to convert a feature idea into a spec"
seoDescription: "Turn a rough feature idea into a reviewed SpecDD spec for spec-driven development by defining scope, behavior, boundaries, scenarios, tasks, and open questions."
excerpt: "Convert feature ideas into implementation-neutral specs that preserve intent, expose ambiguity, and give humans and agents a durable source of truth."
level: "Beginner"
howtoID: "1071009"
weight: 100
---

This guide shows you how to turn a rough feature idea into a SpecDD spec that can guide implementation in a
spec-driven development workflow.

A feature idea is usually temporary and incomplete. A spec should be durable, local, reviewable, and neutral about
implementation details unless the implementation choice is part of the contract.

## Short answer

Start with the feature's local subject and purpose. Convert clear decisions into `Must`, plausible non-goals into
`Must not`, external relationships into `Depends on` or `References`, examples into `Scenario`, and implementation work
into local `Tasks`. Mark unresolved questions explicitly instead of silently deciding them.

## When to use this guide

Use this guide when:

- a ticket or chat thread describes a feature but not its durable behavior
- an agent needs a reviewed target before coding
- a feature idea crosses several modules
- product intent is clear but edge cases are not
- you want code review to compare the implementation against stable context

## Example feature idea

Rough idea:

> Let users add itinerary items faster. If they leave the place blank, do not save the item. If the day is outside the
> trip range, show a validation error. Do not touch destination search.

That idea can become a small local spec:

```sdd
Spec: Itinerary validation

Purpose:
  Prevent incomplete or out-of-range itinerary items from being saved.

Owns:
  ./itinerary-validation.js
  ./itinerary-validation.test.js

Must:
  Reject itinerary items without a place name.
  Reject itinerary items whose day is outside the trip date range.
  Preserve existing itinerary items when validation fails.

Must not:
  Change destination search behavior.

Depends on:
  ../dates/date-range.sdd

Scenario: Missing place name
  Given an itinerary item without a place name
  When the item is saved
  Then validation fails
  And the item is not added to the itinerary

Tasks:
  [ ] Add missing-place validation.
  [ ] Add out-of-range day validation.

Done when:
  Validation failure cases are covered by checks.
  Destination search behavior is unchanged.
```

## Steps

### 1. Restate the feature as a local subject

Avoid starting with a broad product area:

```sdd
Spec: Trip planning improvements
```

Prefer the smallest useful subject:

```sdd
Spec: Itinerary validation
```

If the feature truly crosses several subjects, write one parent coordination spec and smaller local specs for the
pieces that own behavior.

### 2. Separate decisions from assumptions

Read the idea and classify each line:

- decided behavior
- local boundary
- dependency
- unresolved question
- implementation suggestion
- unrelated context

Only decided behavior should become durable `Must` rules. Unresolved questions should stay visible:

```sdd
Tasks:
  [?] Confirm whether validation errors should be inline or modal.
```

### 3. Write required behavior

Convert decisions into outcome-focused `Must` rules:

```sdd
Must:
  Reject itinerary items without a place name.
  Reject itinerary items whose day is outside the trip date range.
```

Do not write:

```sdd
Must:
  Add a clean validation utility with good UX.
```

That hides multiple decisions and gives reviewers little to check.

### 4. Add boundaries and dependencies

If the idea says not to touch another area, make that a boundary:

```sdd
Must not:
  Change destination search behavior.
```

If the feature needs another area's behavior, name it:

```sdd
Depends on:
  ../dates/date-range.sdd
```

This helps humans and agents avoid accidental cross-area changes.

### 5. Capture scenarios

Use `Scenario` for concrete behavior examples:

```sdd
Scenario: Out-of-range itinerary day
  Given a trip from June 10 to June 12
  When an itinerary item is saved for June 14
  Then validation fails
  And the item is not added to the itinerary
```

Scenarios are not tests by themselves, but they make useful test inputs.

### 6. Create local tasks

Tasks should be small enough to implement inside the spec authority:

```sdd
Tasks:
  [ ] Add missing-place validation.
  [ ] Add out-of-range day validation.
  [ ] Cover validation failure cases.
```

Avoid tasks that quietly expand scope:

```sdd
Tasks:
  [ ] Redesign itinerary editing.
```

### 7. Review before implementation

Before treating the spec as authoritative, check:

- the subject is small enough
- behavior is correct
- boundaries reflect the feature idea
- open questions are marked
- tasks do not exceed local authority
- completion criteria are clear

Generated drafts are planning aids until a human reviews and accepts them.

## Working with an agent

Good prompt examples:

```text
Draft the Itinerary validation spec from this feature idea.
```

```text
Revise the Itinerary validation spec so unresolved product decisions remain explicit.
```

```text
Review the Itinerary validation spec for ambiguous behavior before implementation.
```

Each prompt names the human feature or spec. Keep the instruction narrow, then review the output before using it.

## Common mistakes

- Turning every ticket sentence into a durable rule.
- Writing implementation detail before behavior is clear.
- Hiding uncertain decisions as `Must` rules.
- Creating one broad spec for several unrelated owners.
- Forgetting `Must not` rules for areas the feature should not affect.

## How to verify the result

The feature idea has become a usable spec when:

- the spec has a local subject
- clear decisions are represented as behavior
- non-goals and dependencies are explicit
- scenarios cover important examples
- unresolved questions are visible
- local tasks and done criteria are ready for implementation

## Related how-tos

- [How to draft specs automatically with AI, then review](/how-to/spec-driven-workflows/how-to-draft-specs-automatically-with-ai-then-review/)
- [How to write a feature spec](/how-to/write-specs-by-level/how-to-write-a-feature-spec/)
- [How to review a draft spec before using it](/how-to/spec-writing-technique/how-to-review-a-draft-spec-before-using-it/)
- [How to write Scenario blocks](/how-to/use-spec-sections/how-to-write-scenario-blocks/)

## Related reference

- [Language reference](/language-reference/)
