---
title: "How to manage dependency direction with specs"
seoDescription: "Manage dependency direction with spec-driven development by defining allowed imports, forbidden reverse dependencies, layer rules, and review checks."
excerpt: "Use SpecDD specs to make dependency direction explicit so modules, layers, packages, services, and adapters do not depend on the wrong things."
level: "Intermediate"
howtoID: "1101019"
weight: 200
---

This guide shows you how to manage dependency direction with SpecDD in a spec-driven development workflow.

Dependency direction is one of the most important parts of software design. It decides which parts of the system know
about which other parts. When direction is clear, inner rules stay independent, adapters stay replaceable, UI stays
focused, and packages can evolve without circular knowledge.

When direction is unclear, convenient imports win. A domain model imports storage. A UI component imports an adapter. A
low-level package imports an application service. A child module reaches into a sibling's internals. SpecDD lets you put
the direction rule where it belongs and enforce it during every change.

## Short answer

Write dependency direction in the spec that owns the architecture boundary. Use `Depends on` for allowed collaborators,
`Forbids` for reverse imports, blocked paths, modules, tools, libraries, or access patterns, and `Must not` for behavior
that would invert the design. Use local specs to depend on stable contracts, not internals. Review dependency changes as
architecture changes.

## When to use this guide

Use this guide when:

- layers are importing each other in both directions
- packages have circular dependencies
- UI code talks directly to infrastructure
- domain code imports framework, transport, or storage details
- services call sibling internals instead of public contracts
- a new dependency needs architecture review
- agents keep choosing imports based on proximity rather than direction

## The design idea

Dependencies are not neutral. Every dependency creates knowledge. If high-level policy depends on low-level details, the
policy becomes harder to reuse and test. If sibling modules depend on each other's internals, local changes become
cross-module changes. If a package imports its consumer, reuse becomes fragile.

SpecDD helps because it separates three ideas:

- allowed collaborators in `Depends on`
- forbidden dependency paths in `Forbids`
- responsibility boundaries in `Must not`

Together, those sections make direction reviewable.

## Steps

### 1. Choose the dependency boundary

Place dependency direction at the owner of the rule:

- root spec for project-wide architecture direction
- repository spec for top-level apps and packages
- package spec for package import rules
- module spec for subsystem boundaries
- local service, adapter, API, component, or model spec for narrow collaborators

Do not put project-wide import conventions in a local spec. Project-wide conventions belong in `.specdd/bootstrap.project.md`.

### 2. State allowed direction

Use `Depends on` for important allowed collaborators:

```sdd
Spec: Itinerary Service

Depends on:
  ItineraryValidation
  TripStorage
```

For a broader boundary:

```sdd
Spec: Trips Module Architecture

Depends on:
  UI depends on services
  services depend on domain
  services depend on adapters
```

Keep the list focused on design-significant relationships.

### 3. Forbid reverse dependencies

Use `Forbids`:

```sdd
Forbids:
  domain importing ./adapters/*
  domain importing ./ui/*
  adapters importing ./ui/*
  packages/core importing packages/app/*
```

`Forbids` is the right section for dependency direction rules that block imports, paths, libraries, tools, or access
patterns.

### 4. Use behavior boundaries too

Dependency direction is not only imports. A layer can preserve imports and still take on the wrong responsibility.

Use `Must not`:

```sdd
Must not:
  UI components decide trip edit access rules.
  Storage adapters decide itinerary visibility.
  Domain models perform network calls.
```

These rules stop responsibility inversion.

### 5. Depend on contracts, not internals

Good:

```sdd
Depends on:
  TripStorage
```

Weak:

```sdd
Depends on:
  ./adapters/trip-storage/local-storage-json-v3-internals.js
```

Use the stable contract whenever possible. If a caller must depend on an internal detail, treat that as a design
decision and write it explicitly.

### 6. Keep tasks within dependency direction

Invalid task:

```sdd
Tasks:
  [ ] Import TripStorage directly from the Itinerary Form.
```

If the component spec forbids adapter imports, this task is blocked. The task should be rewritten:

```sdd
Tasks:
  [ ] Submit itinerary item input through itinerary behavior.
```

Tasks do not override `Forbids` or `Must not`.

### 7. Review dependency changes

When a change adds or removes a dependency, ask:

- Which spec owns the direction rule?
- Is the dependency allowed by `Depends on`?
- Is it blocked by `Forbids`?
- Does it depend on a stable contract or an internal detail?
- Does it create a cycle?
- Does it move behavior into the wrong layer?
- Does a parent spec already forbid it?

If the dependency direction needs to change, update the owning spec first or in the same reviewed change.

## Example package direction

```sdd
Spec: Trip Packages

Purpose:
  Keep reusable trip domain packages independent from application and UI packages.

Structure:
  ./packages/trip-domain/: reusable trip domain rules
  ./packages/trip-app/: application services and adapters
  ./packages/trip-ui/: UI components

Must:
  trip-app depends on trip-domain.
  trip-ui depends on trip-app public contracts.
  trip-domain remains independent of application and UI packages.

Forbids:
  ./packages/trip-domain/* importing ./packages/trip-app/*
  ./packages/trip-domain/* importing ./packages/trip-ui/*
  ./packages/trip-app/* importing ./packages/trip-ui/*

Must not:
  UI packages decide trip domain invariants.
  Domain packages perform network or storage access.
```

This spec defines dependency direction at the package boundary. Local specs can then add narrower rules without
contradicting it.

## Common mistakes

- Writing dependency direction only in diagrams or prose.
- Listing every import in `Depends on` instead of meaningful collaborators.
- Forgetting `Forbids`, which leaves reverse dependencies unblocked.
- Allowing a task to violate a parent dependency rule.
- Depending on internals because the public contract is missing one behavior.
- Moving project-wide import conventions into local specs instead of `.specdd/bootstrap.project.md`.
- Reviewing behavior but not new imports and dependency paths.

## How to verify the result

Dependency direction is managed well when:

- the owning spec states allowed direction
- reverse dependencies are blocked with `Forbids`
- behavior inversion is blocked with `Must not`
- local specs depend on stable contracts
- tasks respect inherited dependency rules
- review checks include imports, paths, calls, and ownership
- dependency changes update the spec that owns the direction

## Related how-tos

- [How to prevent cross-layer coupling](/how-to/software-design-practices/how-to-prevent-cross-layer-coupling/)
- [How to define and enforce module and architecture boundaries with specs](/how-to/software-design-practices/how-to-define-and-enforce-module-and-architecture-boundaries-with-specs/)
- [How to use the Depends on section](/how-to/use-spec-sections/how-to-use-the-depends-on-section/)
- [How to use the Forbids section](/how-to/use-spec-sections/how-to-use-the-forbids-section/)

## Related reference

- [Language reference](/language-reference/)
