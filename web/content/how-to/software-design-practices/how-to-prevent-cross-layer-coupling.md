---
title: "How to prevent cross-layer coupling"
seoDescription: "Prevent cross-layer coupling with spec-driven development by defining allowed dependency direction, blocked layer access, adapter boundaries, and review checks."
excerpt: "Use Depends on, Forbids, Must not, and local ownership to stop UI, API, domain, and infrastructure layers from reaching past their boundaries."
level: "Intermediate"
howtoID: "1101003"
weight: 40
---

This guide shows you how to prevent cross-layer coupling with SpecDD in a spec-driven development workflow.

Cross-layer coupling happens when code in one layer reaches into another layer in a way the architecture did not intend.
A UI component imports a storage adapter. An API handler reaches around a domain service. A model calls infrastructure.
A background job duplicates business rules because calling the domain layer looks inconvenient.

These shortcuts are usually local and reasonable in the moment. Over time they make the system harder to test, change,
and explain. SpecDD gives you a concrete place to define the layer rule and check every change against it.

## Short answer

Define layer direction in the spec that owns the architecture boundary. Use `Depends on` for allowed collaborators,
`Forbids` for blocked imports, paths, dependencies, tools, or access patterns, and `Must not` for behavior a layer must
not own. Local specs should narrow the rule, not reverse it. During review, inspect imports, calls, writes, and tasks
for layer violations.

## When to use this guide

Use this guide when:

- UI code imports persistence or infrastructure directly
- API handlers contain domain rules instead of delegating
- domain models depend on framework, database, or transport details
- adapters make business decisions
- tests require full-stack setup for behavior that should be local
- agents keep choosing the shortest import path across layers

## The design idea

Layers are useful because they keep different kinds of change separate. UI layout can change without rewriting domain
rules. Persistence can change without changing the business invariant. The API transport can change without moving core
behavior.

The important design question is not "how many layers should this app have?" It is "which directions are allowed, and
which directions are forbidden?" SpecDD can encode that answer in the parent spec and let child specs inherit it.

## Steps

### 1. Name the layers

Start with the architecture you actually use:

```sdd
Spec: Trips Module

Purpose:
  Provide trip planning behavior through UI, application services, domain rules, and storage adapters.

Structure:
  ./ui/: UI components and hooks
  ./services/: application orchestration
  ./domain/: domain models, policies, and invariants
  ./adapters/: external storage and API boundaries
```

`Structure` helps humans understand the layout. It does not replace ownership or dependency rules.

### 2. Define allowed direction

Use `Must` or `Depends on` to state intended direction:

```sdd
Must:
  UI components call services for trip changes.
  Services coordinate domain rules and adapters.
  Domain rules remain independent of UI, API, and storage frameworks.

Depends on:
  services depend on domain
  services depend on adapters
  UI depends on services
```

Keep dependency statements meaningful. Do not list every import that happens to exist.

### 3. Forbid reverse access

Use `Forbids` for hard boundaries:

```sdd
Forbids:
  UI importing ./adapters/*
  domain importing ./ui/*
  domain importing ./adapters/*
  adapters importing ./ui/*
```

Use `Must not` for behavior boundaries:

```sdd
Must not:
  UI components decide whether itinerary input is valid.
  Storage adapters decide which itinerary items are visible.
```

Together, these rules block both code-level coupling and responsibility-level coupling.

### 4. Use adapters at external boundaries

External systems should usually enter through adapter specs:

```sdd
Spec: Trip Storage Adapter

Purpose:
  Persist and retrieve trips through browser local storage.

Owns:
  ./adapters/trip-storage.js
  ./adapters/trip-storage.test.js

Must:
  Save accepted trip changes.
  Load previously saved trips when the app starts.

Must not:
  Decide itinerary validation rules.
  Render UI.

Depends on:
  browser local storage
```

This keeps storage details out of UI and domain code.

### 5. Keep local tasks inside the layer

Good task in a UI spec:

```sdd
Tasks:
  [ ] Show the itinerary validation message returned by the service.
```

Layer-violating task:

```sdd
Tasks:
  [ ] Save itinerary items directly from the component.
```

The second task should be blocked if UI is forbidden from importing storage adapters.

### 6. Review imports and calls

During review, check:

- new imports
- direct file access
- framework or database dependencies
- calls from outer layers into unrelated internals
- copied domain rules in API or UI code
- tasks that cross the local `Owns` or `Can modify` boundary

Layer coupling often enters through a small convenience change, not a deliberate architecture rewrite.

## Example layer boundary

```sdd
Spec: Trips Module Architecture

Purpose:
  Keep trip planning behavior separated across UI, services, domain rules, and adapters.

Structure:
  ./ui/: UI components and hooks
  ./services/: application orchestration
  ./domain/: domain rules and invariants
  ./adapters/: external storage and API boundaries

Must:
  UI components call services for trip changes.
  Services coordinate domain rules and adapters.
  Domain rules remain independent of UI, API, and storage frameworks.

Must not:
  UI components decide itinerary validation rules.
  Adapters decide itinerary visibility or validation.

Forbids:
  UI importing ./adapters/*
  domain importing ./ui/*
  domain importing ./adapters/*
```

This spec gives future changes a clear dependency direction. A child spec may add a narrower local rule, but it cannot
silently reverse the parent architecture.

## Common mistakes

- Describing layer direction in prose but not forbidding the reverse dependency.
- Using `Depends on` to list everything instead of the architectural dependencies that matter.
- Allowing a UI task to import storage because it is a quick fix.
- Letting adapters decide domain rules because they already see the external data.
- Copying the same layer rule into every child spec.
- Reviewing behavior but not imports, calls, and dependency paths.

## How to verify the result

Cross-layer coupling is controlled when:

- the parent boundary names the layers and direction
- reverse dependencies are blocked with `Forbids`
- behavior boundaries appear in `Must not`
- adapter specs own external-system details
- local tasks stay inside the layer they belong to
- review checks include imports and calls, not only tests

## Related how-tos

- [How to define and enforce module and architecture boundaries with specs](/how-to/software-design-practices/how-to-define-and-enforce-module-and-architecture-boundaries-with-specs/)
- [How to use the Forbids section](/how-to/use-spec-sections/how-to-use-the-forbids-section/)
- [How to use the Depends on section](/how-to/use-spec-sections/how-to-use-the-depends-on-section/)
- [How to write an adapter spec](/how-to/write-specs-by-level/how-to-write-an-adapter-spec/)

## Related reference

- [Language reference](/language-reference/)
