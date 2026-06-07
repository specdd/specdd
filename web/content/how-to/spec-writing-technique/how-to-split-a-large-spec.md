---
title: "How to split a large spec"
seoDescription: "Split a large SpecDD spec into smaller local specs for spec-driven development by identifying ownership, child behavior, repeated parent constraints, unrelated tasks, and writable scope."
excerpt: "Break overgrown specs into local contracts without losing inherited context or write authority."
level: "Intermediate"
howtoID: "1071006"
weight: 70
---

This guide shows you how to split a large SpecDD spec into smaller, maintainable local specs for a spec-driven
development workflow.

Large specs are hard to keep in context and tend to drift. Splitting works best when each new spec owns a real local
subject and the parent keeps only shared constraints.

## Short answer

Split a large spec when it owns unrelated responsibilities, lists too many paths, mixes parent and child behavior,
duplicates inherited rules, or contains unrelated tasks. Move child-specific behavior into child or same-basename specs,
keep shared constraints in the parent, and preserve write authority with `Owns` or `Can modify`.

## When to use this guide

Use this guide when:

- a spec is too long to review
- one spec owns several unrelated areas
- tasks require different local authorities
- a parent spec contains file-level behavior
- agents overbuild because the spec includes too much scope
- repeated parent rules are drifting in children

## Steps

### 1. Identify why the spec is large

Look for:

- broad `Owns` or `Can modify`
- unrelated `Must` rules
- long `Must not` lists
- child-specific scenarios
- tasks for different modules
- copied parent constraints
- examples for several subjects

The cause tells you how to split.

### 2. Find separate subjects

Possible subjects:

- module boundary
- feature capability
- service orchestration
- model invariants
- adapter boundary
- component behavior
- policy decision
- job behavior

Each subject should be able to answer what it owns and what behavior belongs there.

### 3. Move child behavior down

Before:

```sdd
Spec: Trips

Must:
  Reject itinerary items without a place name.
  Save trips through TripStorage.
  Deny read-only users from editing trips.
```

After:

```text
trips.sdd
itinerary.sdd
trip-storage.sdd
trip-access.policy.sdd
```

The parent keeps shared trip context. Child specs own local behavior.

### 4. Keep shared rules in the parent

Parent:

```sdd
Must not:
  Purchase bookings or tickets.
```

Do not copy that rule into every child. Inheritance carries it down.

### 5. Preserve write authority

When moving behavior, move or narrow authority:

```sdd
Owns:
  ./itinerary.js
  ./itinerary.test.js
```

If the old spec had broad `Can modify`, replace it with focused authority in the new local specs.

### 6. Connect named specs when needed

If the split creates named specs that are not same-basename matches, make them discoverable:

```sdd
Structure:
  ./trip-access.policy.sdd: Trip access decisions

References:
  ./trip-access.policy.sdd
```

### 7. Review the split as a contract change

Check:

- no behavior disappeared
- rules moved to the owner that should govern them
- parent constraints still apply
- child specs do not loosen parent rules
- tasks remain local
- write authority is not accidentally expanded

## Common mistakes

- Splitting by file count instead of responsibility.
- Losing shared parent constraints during the split.
- Copying every parent rule into each new child spec.
- Leaving broad `Can modify` in the old parent.
- Creating named child specs that are not discoverable.

## How to verify the split

The split worked when:

- each spec has one clear subject
- parent rules are shared and inherited
- child specs own child behavior
- authority is narrower or equally clear
- implementation can still find the effective spec chain
- review can explain where each rule moved

## Related how-tos

- [How to keep specs small and maintainable](/how-to/spec-writing-technique/how-to-keep-specs-small-and-maintainable/)
- [How to avoid duplicating parent constraints in child specs](/how-to/spec-writing-technique/how-to-avoid-duplicating-parent-constraints-in-child-specs/)
- [How to resolve conflicts between specs](/how-to/spec-driven-workflows/how-to-resolve-conflicts-between-specs/)

## Related reference

- [Language reference](/language-reference/)
