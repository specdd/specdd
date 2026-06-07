---
title: "How to write a module spec"
seoDescription: "Write a SpecDD module spec for spec-driven development with bounded domain, subsystem, directory, or package-area ownership, structure, dependencies, and non-goals."
excerpt: "Use module specs for inherited local context: area purpose, immediate structure, owned responsibilities, allowed dependencies, and boundaries."
level: "Beginner"
howtoID: "1051001"
weight: 20
---

This guide shows you how to write a SpecDD module spec for a spec-driven development workflow.

A module spec describes a bounded area: a domain, subsystem, package area, directory, or major implementation boundary.
It gives inherited context to child specs without replacing them.

## Short answer

Use a module spec when several child files or specs need shared local context. Describe the module's purpose, immediate
structure, owned responsibilities, allowed dependencies, and `Must not` boundaries. Keep file-level behavior in
same-basename or child specs.

## When to use this guide

Use this guide when:

- a directory has shared architecture rules
- several child specs need the same boundary
- agents keep editing sibling areas
- a subsystem has allowed or forbidden dependencies
- a parent context should apply to descendant specs

## Steps

### 1. Choose the module boundary

Good module targets:

- `src/trips/`
- `packages/trip-core/`
- `services/billing/`
- `content/help/`

The module should be a real local area with responsibilities and children.

### 2. Place the module spec

Directory-level specs can be local:

```text
src/trips/trips.sdd
```

or parent-held:

```text
src/trips.sdd
```

Both can contribute context for the directory. When both exist, they are cumulative context, not ambiguity.

Teams may also use names such as:

```text
module.sdd
```

when project conventions define that pattern.

### 3. Write the module purpose

```sdd
Spec: Trips

Purpose:
  Provide the part of the app where people plan and review trips.
```

Keep it about the area, not one child file.

### 4. Describe immediate structure

```sdd
Structure:
  ./itinerary.js: Itinerary behavior
  ./trip-storage.js: Trip persistence boundary
  ./trip-access.policy.sdd: Trip access decisions
```

Use `Structure` for immediate child roles. Do not describe every nested implementation detail.

### 5. Define ownership and authority deliberately

For broad responsibility:

```sdd
Owns:
  Trip planning behavior.
```

For explicit writable files:

```sdd
Can modify:
  ./trips.sdd
```

A parent module spec provides inherited context, but it should not grant broad edit rights to every descendant unless
that is truly intended. Nearest local specs normally provide write authority for implementation work.

### 6. Add module rules and non-goals

```sdd
Must:
  Trip planning behavior remains separate from destination search.
  Trip changes are saved through trip storage.

Must not:
  Purchase bookings.
  Manage destination search ranking.

Depends on:
  TripStorage
```

Put rules here only when they apply across the module.

### 7. Keep child behavior in child specs

Do not put all itinerary validation, storage retry, and UI rendering behavior in the module spec. Use child specs for
those local details.

## Complete example

```sdd
Spec: Trips

Purpose:
  Provide the part of the app where people plan and review trips.

Structure:
  ./itinerary.js: Itinerary behavior
  ./trip-storage.js: Trip persistence boundary
  ./trip-access.policy.sdd: Trip access decisions

Owns:
  Trip planning behavior.

Must:
  Trip behavior remains separate from destination search.
  Trip changes are saved through trip storage.

Must not:
  Purchase bookings.
  Manage destination search ranking.

Depends on:
  TripStorage
```

## Common mistakes

- Turning the module spec into a full file inventory.
- Putting child-specific behavior in the parent.
- Letting broad `Owns` make every descendant file writable.
- Duplicating root constraints instead of inheriting them.
- Treating sibling module specs as automatically inherited.

## How to verify the result

The module spec is useful when:

- it gives child specs shared context
- structure covers immediate children
- module boundaries are clear
- child-specific details stay local
- descendants inherit rules without duplicating them

## Related how-tos

- [How to use the Structure section](/how-to/use-spec-sections/how-to-use-the-structure-section/)
- [How to use the Owns section](/how-to/use-spec-sections/how-to-use-the-owns-section/)
- [How to adopt SpecDD one folder at a time](/how-to/adopt-specdd-on-existing-projects/how-to-adopt-specdd-one-folder-at-a-time/)

## Related reference

- [Language reference](/language-reference/)
