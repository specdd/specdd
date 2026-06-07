---
title: "How to write a feature spec"
seoDescription: "Write a SpecDD feature spec for spec-driven development with user-visible or business capability behavior, scenarios, boundaries, and completion criteria."
excerpt: "Use feature specs for capabilities people can observe: inputs, outcomes, scenarios, non-goals, and checks that guide implementation."
level: "Beginner"
howtoID: "1051002"
weight: 30
---

This guide shows you how to write a SpecDD feature spec for a spec-driven development workflow.

A feature spec describes a user-visible, business, operational, or documentation capability. It is useful when behavior
matters across more than one implementation detail.

## Short answer

Write a feature spec around one capability. Use `Purpose` for the feature outcome, `Must` for required behavior,
`Must not` for non-goals, `Accepts` and `Returns` when inputs and outputs matter, `Scenario` for concrete behavior,
and `Done when` for completion criteria.

## When to use this guide

Use this guide when:

- a capability needs review before implementation
- behavior crosses several files but belongs to one local area
- product or business rules need to stay near implementation
- tests should trace to user-visible behavior
- agents need a feature boundary before coding

## Steps

### 1. Choose one capability

Good:

```text
Add place to itinerary.
```

Too broad:

```text
Travel planning.
```

Feature specs work best when the behavior can be named and checked.

### 2. Place the spec where it is discoverable

Examples:

```text
src/trips/add-place.feature.sdd
src/trips/add-place.sdd
```

Suffixes are optional. If the folder already makes the role clear, a simple name is often enough.

If the feature spec is not a same-basename match for the files being changed, make it discoverable from a directory or
local spec with `Structure`, `References`, `Can read`, or `Depends on`.

### 3. Write required behavior

```sdd
Must:
  An existing trip is required.
  A place name is required.
  When the trip and place are valid, the place appears on the selected trip day.
```

Keep rules outcome-focused.

### 4. Add non-goals

```sdd
Must not:
  Create a new trip automatically.
  Purchase bookings or tickets.
  Change destination search results.
```

Use non-goals to prevent plausible wrong work.

### 5. Add a behavior scenario

```sdd
Scenario: trip exists
  Given a Paris trip exists
  When the person adds "Louvre Museum" for "2026-06-12"
  Then "Louvre Museum" appears on the June 12 itinerary
  And the Paris trip remains selected
```

Scenarios make feature behavior testable and reviewable.

### 6. Add tasks and completion criteria

```sdd
Tasks:
  [ ] Add missing-place validation.

Done when:
  Add-place behavior is covered by a check.
  Destination search behavior is unchanged.
```

Tasks should be local to the feature's authority.

## Complete example

```sdd
Spec: Add Place To Itinerary

Purpose:
  Let a person add a place to an existing trip itinerary.

Must:
  An existing trip is required.
  A place name is required.
  When the trip and place are valid, the place appears on the selected trip day.

Must not:
  Create a new trip automatically.
  Purchase bookings or tickets.
  Change destination search results.

Tasks:
  [ ] Add missing-place validation.

Done when:
  Add-place behavior is covered by a check.

Scenario: trip exists
  Given a Paris trip exists
  When the person adds "Louvre Museum" for "2026-06-12"
  Then "Louvre Museum" appears on the June 12 itinerary
  And the Paris trip remains selected
```

## Common mistakes

- Writing a feature spec for an entire product area.
- Hiding feature behavior only in tasks.
- Forgetting non-goals that prevent adjacent work.
- Adding scenarios that are too vague to test.
- Leaving named feature specs disconnected from applicable local specs.

## How to verify the result

The feature spec is ready when:

- the capability is clear
- required behavior is observable
- non-goals protect likely overreach
- at least one scenario describes important behavior
- completion criteria say how review will know it is done

## Related how-tos

- [How to write Scenario blocks](/how-to/use-spec-sections/how-to-write-scenario-blocks/)
- [How to write Done when](/how-to/use-spec-sections/how-to-write-done-when/)
- [How to reference another area's spec safely](/how-to/spec-driven-workflows/how-to-reference-another-areas-spec-safely/)

## Related reference

- [Language reference](/language-reference/)
