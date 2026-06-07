---
title: "How to design for low coupling and high cohesion"
seoDescription: "Design for low coupling and high cohesion with spec-driven development by grouping related responsibilities, minimizing dependencies, and enforcing local boundaries."
excerpt: "Use SpecDD specs to keep related behavior together, dependencies intentional, and unrelated modules separated by clear contracts."
level: "Intermediate"
howtoID: "1101010"
weight: 110
---

This guide shows you how to design for low coupling and high cohesion with SpecDD in a spec-driven development workflow.

Low coupling means one part of the system does not know more about another part than it should. High cohesion means the
behavior inside a unit belongs together. These two qualities reinforce each other: cohesive units have clearer contracts,
and clear contracts reduce unnecessary coupling.

SpecDD helps because every local spec asks you to name what belongs together, what the unit depends on, and what it must
not own. That makes coupling and cohesion reviewable instead of abstract.

## Short answer

Use `Purpose`, `Owns`, and `Must` to group related behavior into cohesive specs. Use `Depends on`, `References`, and
contract sections to make dependencies explicit. Use `Must not` and `Forbids` to prevent unrelated behavior and
unwanted dependencies from entering the unit. Review dependency changes as design changes, not just implementation
details.

## When to use this guide

Use this guide when:

- a module imports too many unrelated collaborators
- a spec has rules that do not support the same purpose
- a change in one area causes unrelated changes elsewhere
- tests need many mocks for a simple behavior
- a module both owns domain rules and infrastructure details
- dependency lists are growing without review

## The design idea

Cohesion is about belonging. If a rule belongs with the unit's purpose, it should be easy to justify in the spec. If it
does not belong, the spec should either reject it or point to the owner that does.

Coupling is about knowledge. A unit may need to depend on another unit, but it should depend on the smallest stable
contract that supports its work. When a spec lists dependencies, it creates a review moment: is this collaborator part
of the contract, or did implementation convenience leak into design?

## Steps

### 1. Define cohesive responsibilities

Good:

```sdd
Spec: Itinerary Validation

Purpose:
  Decide whether an itinerary item can be saved.

Must:
  Reject itinerary items without a place name.
  Reject itinerary items outside the trip date range.
```

Weak:

```sdd
Spec: Itinerary Utility

Purpose:
  Validate itinerary items, format destination names, save drafts, and render empty states.
```

The weak purpose groups unrelated reasons to change.

### 2. Minimize dependency lists

Use `Depends on` for meaningful collaborators:

```sdd
Depends on:
  TripDateRange
```

Do not list every helper import. A dependency belongs in the spec when it affects architecture, review, testing, or
future maintenance.

### 3. Prefer contracts over internals

Low coupling depends on stable contracts:

```sdd
Exposes:
  validateItineraryItem

Accepts:
  itinerary item input
  trip date range

Returns:
  validation result
```

Callers should rely on that contract, not private helper names or storage shape.

### 4. Use non-goals for unrelated behavior

Use `Must not` to preserve cohesion:

```sdd
Must not:
  Save itinerary items.
  Render itinerary UI.
  Fetch destination search results.
```

The unit can remain cohesive because unrelated behavior has a visible place to stop.

### 5. Forbid unwanted coupling

Use `Forbids` for dependency boundaries:

```sdd
Forbids:
  direct browser storage access
  ../ui/*
  ../adapters/*
```

This is especially useful when a shortcut would couple a cohesive unit to infrastructure or presentation code.

### 6. Review dependency changes

When a spec adds a dependency, ask:

- What behavior needs this collaborator?
- Is the dependency at the right abstraction level?
- Does the dependency point in the allowed direction?
- Is this a stable contract or an internal detail?
- Would adding the dependency make testing harder?
- Should the behavior live in the dependency instead?

Dependency additions are design changes. Treat them accordingly.

### 7. Split when cohesion drops

If a spec keeps adding unrelated `Must` rules, split it:

- validation behavior into a validation spec
- formatting behavior into a presentation or formatting spec
- persistence behavior into an adapter spec
- policy decisions into a policy spec

Do not let one "utility" spec become a home for behavior that has no better owner.

## Example cohesive service

```sdd
Spec: Itinerary Service

Purpose:
  Coordinate validation and storage when itinerary items are added.

Owns:
  ./itinerary-service.js
  ./itinerary-service.test.js

Must:
  Validate itinerary input before storage is called.
  Save itinerary changes only after validation succeeds.
  Return validation feedback when input is rejected.

Must not:
  Own itinerary validation rules.
  Persist trips directly.
  Render UI feedback.

Depends on:
  ItineraryValidation
  TripStorage

Done when:
  Validation failure does not call storage.
  Successful validation calls storage once.
```

This service is cohesive because it coordinates one workflow. It is low-coupled because it depends on stable validation
and storage contracts rather than their internals.

## Common mistakes

- Naming a spec "utils" or "manager" and letting unrelated behavior accumulate.
- Treating every import as an acceptable dependency because tests pass.
- Depending on implementation internals instead of exposed contracts.
- Forgetting non-goals that preserve cohesion.
- Adding a dependency to avoid placing behavior in the right owner.
- Measuring cohesion by file count instead of responsibility fit.

## How to verify the result

The design has low coupling and high cohesion when:

- each spec has a purpose that explains why its rules belong together
- dependency lists are short and intentional
- callers use exposed contracts instead of internals
- unrelated behavior is blocked with `Must not`
- forbidden dependencies are explicit
- tests for the unit need few unrelated collaborators
- dependency changes receive design review

## Related how-tos

- [How to separate concerns with local specs](/how-to/software-design-practices/how-to-separate-concerns-with-local-specs/)
- [How to prevent cross-layer coupling](/how-to/software-design-practices/how-to-prevent-cross-layer-coupling/)
- [How to use the Depends on section](/how-to/use-spec-sections/how-to-use-the-depends-on-section/)
- [How to avoid leaky abstractions](/how-to/software-design-practices/how-to-avoid-leaky-abstractions/)

## Related reference

- [Language reference](/language-reference/)
