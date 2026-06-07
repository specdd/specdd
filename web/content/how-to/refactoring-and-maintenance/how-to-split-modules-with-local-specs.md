---
title: "How to split modules with local specs"
seoDescription: "Split modules with local SpecDD specs in a spec-driven development workflow by preserving parent constraints, moving ownership to child specs, avoiding duplicated rules, and verifying behavior."
excerpt: "Use local specs to divide a large module into smaller owned units without losing authority, inherited boundaries, or tests."
level: "Intermediate"
howtoID: "1151004"
weight: 50
---

This guide shows you how to split modules with local specs in a spec-driven development workflow.

Module splits are risky because they change structure, ownership, imports, and tests at the same time. Without specs,
reviewers must infer whether behavior moved safely or whether responsibilities were silently changed.

SpecDD lets you split the module by separating stable parent constraints from child responsibilities. The parent keeps
module-wide architecture. Child specs own the smaller units.

## Short answer

Before splitting a module, identify the responsibilities inside it. Keep shared module constraints in the parent spec.
Create child specs for smaller units, move `Owns` and local `Must` rules to the right child, avoid duplicating parent
rules, update paths and references, then run checks that prove behavior and boundaries were preserved.

## When to use this guide

Use this guide when:

- one module has too many responsibilities
- tests are difficult because a module owns too much
- a directory needs smaller services, models, adapters, or components
- ownership should move from a broad parent to local specs
- an agent needs safe boundaries for a module split
- a refactor should preserve behavior while improving structure

## Steps

### 1. Identify responsibilities

Start from the current module spec:

```sdd
Spec: Trips Module

Purpose:
  Provide the part of the app where people plan trips.

Owns:
  ./src/trips/*

Must:
  Trips have a destination and date range.
  Places can be added to a trip itinerary.
  Itinerary items remain grouped by day.
  Changes are saved through trip storage.
```

Potential child responsibilities:

- trip model and invariants
- itinerary validation
- trip storage adapter
- itinerary UI components
- trip API routes

### 2. Keep parent constraints in the parent

Module-wide boundaries should stay in the parent:

```sdd
Must not:
  Purchase bookings or tickets.
  Manage destination search results.
```

Child specs inherit these constraints. Do not copy them into every child spec.

### 3. Create child specs for real owners

Child spec:

```sdd
Spec: Itinerary Validation

Purpose:
  Decide whether an itinerary item can be saved.

Owns:
  ./itinerary-validation.js
  ./itinerary-validation.test.js

Must:
  Reject itinerary items without a place name.
  Preserve existing itinerary items when validation fails.

Must not:
  Save itinerary items directly.
```

This child has a coherent responsibility.

### 4. Move ownership carefully

When a file moves from parent ownership to child ownership, update both specs:

- remove broad or stale file paths from the parent if they are no longer accurate
- add explicit child `Owns` or `Can modify`
- update `Structure` in the parent if it describes the new layout
- update references to moved specs

Avoid leaving both parent and child claiming the same file unless the parent is intentionally providing broad inherited
context and the child is the nearest write authority.

### 5. Avoid duplicating parent rules

Parent:

```sdd
Must not:
  Purchase bookings or tickets.
```

Child should not repeat that unless it adds a distinct local boundary:

```sdd
Must not:
  Save itinerary items directly.
```

Duplication causes drift when parent rules change.

### 6. Move tests with behavior

If itinerary validation becomes a child owner, move or add validation tests near that child:

```sdd
Owns:
  ./itinerary-validation.js
  ./itinerary-validation.test.js
```

Do not leave all tests in the old module-level test file if they now prove local child behavior.

### 7. Verify the split

Run checks that prove:

- parent module behavior still holds
- child behavior is covered
- public contracts are unchanged
- forbidden dependencies were not introduced
- moved tests still pass
- spec paths lint

## Common mistakes

- Splitting files but leaving one broad module spec as the only owner.
- Copying parent `Must not` rules into every child.
- Moving tests without moving or updating spec authority.
- Letting child specs weaken parent architecture.
- Broadening `Can modify` during the split because paths are inconvenient.
- Treating a module split as permission to change behavior.

## How to verify the result

The module split worked when:

- parent specs keep shared architecture and boundaries
- child specs own coherent local responsibilities
- ownership paths match the new structure
- duplicate parent rules were avoided
- tests moved or were added at the right level
- behavior and public contracts stayed stable

## Related how-tos

- [How to split a large spec](/how-to/spec-writing-technique/how-to-split-a-large-spec/)
- [How to write a module spec](/how-to/write-specs-by-level/how-to-write-a-module-spec/)
- [How to avoid duplicating parent constraints in child specs](/how-to/spec-writing-technique/how-to-avoid-duplicating-parent-constraints-in-child-specs/)
- [How to design for low coupling and high cohesion](/how-to/software-design-practices/how-to-design-for-low-coupling-and-high-cohesion/)

## Related reference

- [Language reference](/language-reference/)
