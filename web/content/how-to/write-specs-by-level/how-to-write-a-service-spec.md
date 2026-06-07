---
title: "How to write a service spec"
seoDescription: "Write a SpecDD service spec for spec-driven development with orchestration or application behavior, owned files, dependencies, tasks, scenarios, and boundaries."
excerpt: "Use service specs for local orchestration behavior: what the service owns, depends on, must do, must not do, and how changes are checked."
level: "Intermediate"
howtoID: "1051003"
weight: 40
---

This guide shows you how to write a SpecDD service spec for a spec-driven development workflow.

A service spec describes orchestration or application/domain service behavior: how a local unit coordinates models,
adapters, storage, events, APIs, or other collaborators.

## Short answer

Use a service spec when a local unit coordinates behavior rather than merely storing data or adapting an external
system. Define what the service owns, what it may modify, which collaborators it depends on, what behavior must hold,
what responsibilities it must not take, and how changes are verified.

## When to use this guide

Use this guide when:

- a service coordinates several collaborators
- review comments often ask what the service should own
- agents add logic to the wrong layer
- orchestration behavior needs tasks and scenarios
- dependency direction matters

## Steps

### 1. Identify the service role

Good service subject:

```sdd
Spec: Itinerary Service
```

Weak subject:

```sdd
Spec: Trip Stuff
```

The service should have a clear responsibility.

### 2. Define owned files and writable scope

```sdd
Owns:
  ./itinerary-service.ts
  ./itinerary-service.test.ts
```

If the service owns behavior but only certain files may change, add `Can modify`.

### 3. Declare collaborators

```sdd
Depends on:
  TripStorage
  DestinationSearch
```

Keep dependency lists focused. `Depends on` does not override `Forbids` or `Must not`.

### 4. Write orchestration behavior

```sdd
Must:
  Reject missing place names before saving.
  Save valid itinerary changes through TripStorage.
  Keep itinerary items grouped by day.
```

Use behavior outcomes, not private implementation steps.

### 5. Block adjacent responsibilities

```sdd
Must not:
  Change destination search behavior.
  Purchase bookings or tickets.

Forbids:
  Direct browser storage writes from itinerary service.
```

Service specs are good places to protect layer and responsibility boundaries.

### 6. Add tasks, checks, and scenarios

```sdd
Tasks:
  [ ] Show a clear message for a missing place name.

Done when:
  Missing-place behavior is covered by a check.

Scenario: missing place name is rejected
  Given the place name is empty
  When the person adds a place
  Then a validation message is shown
  And no itinerary item is stored
```

## Complete example

```sdd
Spec: Itinerary Service

Purpose:
  Keep the visible itinerary current as places are added or moved between days.

Owns:
  ./itinerary-service.ts
  ./itinerary-service.test.ts

Must:
  Reject missing place names before saving.
  Save valid itinerary changes through TripStorage.
  Keep itinerary items grouped by day.

Must not:
  Change destination search behavior.
  Purchase bookings or tickets.

Forbids:
  Direct browser storage writes from itinerary service.

Depends on:
  TripStorage
  DestinationSearch

Tasks:
  [ ] Show a clear message for a missing place name.

Done when:
  Missing-place behavior is covered by a check.

Scenario: missing place name is rejected
  Given the place name is empty
  When the person adds a place
  Then a validation message is shown
  And no itinerary item is stored
```

## Common mistakes

- Putting persistence details in a service spec that belongs to an adapter.
- Letting a service spec own every collaborator it depends on.
- Listing every transitive import in `Depends on`.
- Writing tasks that require files outside local authority.
- Using service specs to bypass parent `Forbids`.

## How to verify the result

The service spec is useful when:

- orchestration responsibility is clear
- dependencies are visible and allowed
- adjacent layer responsibilities are blocked
- writable scope is narrow enough to review
- scenarios or checks cover important behavior

## Related how-tos

- [How to use the Depends on section](/how-to/use-spec-sections/how-to-use-the-depends-on-section/)
- [How to use the Forbids section](/how-to/use-spec-sections/how-to-use-the-forbids-section/)
- [How to write Scenario blocks](/how-to/use-spec-sections/how-to-write-scenario-blocks/)

## Related reference

- [Language reference](/language-reference/)
