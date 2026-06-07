---
title: "How to avoid god objects and god modules"
seoDescription: "Avoid god objects and god modules with spec-driven development by limiting ownership, splitting responsibilities, adding non-goals, and keeping tasks local."
excerpt: "Use local specs to prevent one object, service, module, or directory from accumulating unrelated behavior and becoming the place every change goes."
level: "Intermediate"
howtoID: "1101008"
weight: 90
---

This guide shows you how to avoid god objects and god modules with SpecDD in a spec-driven development workflow.

A god object or god module is the place where unrelated behavior accumulates because it is convenient, familiar, or
already central. It might validate input, render UI state, persist data, call external services, apply policy, send
events, and format reports. At first this feels efficient. Later every change becomes risky because too many concerns
share one owner.

SpecDD helps by making ownership visible. If one spec owns too many unrelated paths, rules, and tasks, the spec itself
shows the design smell. You can then split responsibilities into smaller local specs and use non-goals to prevent the
old unit from absorbing them again.

## Short answer

Look for specs with broad ownership, mixed responsibilities, unrelated `Must` rules, and tasks that require many layers.
Split the god unit into smaller specs at the right levels: model, service, adapter, component, API, job, event, policy,
module, or package. Move each rule to the owning spec, add `Must not` boundaries to prevent relapse, and keep future
tasks inside local `Owns` or `Can modify` authority.

## When to use this guide

Use this guide when:

- one service or module changes for many unrelated reasons
- a spec's `Purpose` needs a long list of responsibilities
- `Owns` includes most of a subsystem
- tests for one rule require setting up many unrelated collaborators
- agents keep editing the same central file for every task
- reviewers cannot tell which part of a broad spec owns a rule

## The design idea

God units are usually created by success, not neglect. A central module is useful, so more work goes there. A service
already sees the data, so more decisions move into it. A component already handles the user action, so it starts saving
data and enforcing policy too.

The fix is not merely "make files smaller." The fix is to make ownership smaller and more coherent. Specs give you a
place to draw those new ownership lines.

## Steps

### 1. Recognize the god unit

Warning signs in a spec:

- the `Purpose` contains several unrelated clauses
- `Owns` covers UI, domain, adapters, and API files
- `Must` rules describe many kinds of behavior
- `Must not` is missing because everything is considered in scope
- tasks are broad, such as "clean up trip management"
- one local change requires editing many unrelated files

If the spec is hard to summarize, the code it governs is probably hard to change safely.

### 2. Identify separate responsibilities

Take a broad spec:

```sdd
Spec: Trip Manager

Purpose:
  Manage trip creation, itinerary validation, storage, destination search, booking, and reporting.
```

Split the responsibilities:

- trip creation API
- itinerary validation
- trip storage
- destination search adapter
- booking integration
- reporting job

Each responsibility can become its own local spec if it has durable behavior worth protecting.

### 3. Create smaller owning specs

Examples:

```sdd
Spec: Itinerary Validation

Purpose:
  Decide whether an itinerary item can be saved.
```

```sdd
Spec: Trip Storage

Purpose:
  Persist and retrieve trips and itinerary items.
```

```sdd
Spec: Destination Search Adapter

Purpose:
  Translate destination search requests between trip planning and the external destination provider.
```

The new specs should be placed beside the code they govern.

### 4. Move rules to the owner

If the old broad spec says:

```sdd
Must:
  Reject itinerary items without a place name.
  Save trip changes.
  Normalize destination provider results.
```

move those rules:

- validation rule to the itinerary validation spec
- save behavior to the storage spec
- provider normalization to the adapter spec

Do not leave duplicate copies behind. Duplicates drift.

### 5. Add non-goals to the old unit

If a coordinating service remains, narrow it:

```sdd
Spec: Itinerary Service

Purpose:
  Coordinate itinerary validation and storage when itinerary items are added.

Depends on:
  ItineraryValidation
  TripStorage

Must:
  Validate itinerary input before storage is called.
  Save itinerary changes only after validation succeeds.

Must not:
  Own itinerary validation rules.
  Persist trips directly.
  Fetch destination search results.
```

The old central point can still coordinate, but it no longer owns every decision.

### 6. Review future tasks

Reject tasks that recreate the god unit:

```sdd
Tasks:
  [ ] Add validation, storage, search, and reporting for the new itinerary workflow.
```

Split them:

```sdd
Tasks:
  [ ] Add missing-place validation.
```

```sdd
Tasks:
  [ ] Save accepted itinerary items.
```

```sdd
Tasks:
  [ ] Normalize destination search results.
```

Each task belongs in the spec that owns the behavior.

## Common mistakes

- Treating a god module as acceptable because it has many small helper functions.
- Splitting files without splitting spec ownership.
- Leaving duplicated rules in the old broad spec and the new local specs.
- Making the coordinating service own all downstream behavior.
- Giving one spec broad `Can modify` authority because the refactor touches many files.
- Letting future tasks drift back into the central object.

## How to verify the result

The design has moved away from a god unit when:

- each remaining spec has a coherent purpose
- broad rules have been moved to local owners
- duplicated rules were removed
- the coordinator depends on local owners instead of owning their decisions
- `Must not` blocks responsibility relapse
- tests can target each responsibility with less unrelated setup

## Related how-tos

- [How to maintain the Single Responsibility Principle with SpecDD](/how-to/software-design-practices/how-to-maintain-the-single-responsibility-principle-with-specdd/)
- [How to split a large spec](/how-to/spec-writing-technique/how-to-split-a-large-spec/)
- [How to keep specs small and maintainable](/how-to/spec-writing-technique/how-to-keep-specs-small-and-maintainable/)
- [How to write a service spec](/how-to/write-specs-by-level/how-to-write-a-service-spec/)

## Related reference

- [Language reference](/language-reference/)
