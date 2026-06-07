---
title: "How to be explicit in a spec"
seoDescription: "Make SpecDD specs explicit for spec-driven development by stating behavior, constraints, non-goals, dependencies, uncertainty, and completion criteria directly."
excerpt: "Explicit specs reduce hidden assumptions by saying what must happen, what must not happen, what may be touched, and how completion will be checked."
level: "Beginner"
howtoID: "1071008"
weight: 90
---

This guide shows you how to make a SpecDD spec explicit enough to guide implementation, review, and tests in a
spec-driven development workflow.

Explicit does not mean long. It means the spec says the important things directly: what behavior is required, what is
out of scope, what may be changed, what must not be touched, what the subject depends on, and what counts as done.

## Short answer

Replace broad intent with observable behavior. Use `Owns` and `Can modify` for authority, `Must` for required behavior,
`Must not` and `Forbids` for boundaries, `Depends on` and `References` for context, `Scenario` or `Example` for concrete
cases, and `Done when` for reviewable completion. When something is unclear, mark it as an open question instead of
silently deciding.

## When to use this guide

Use this guide when:

- a spec contains words like "robust", "clean", "better", "simple", or "production-ready"
- reviewers disagree about what the spec means
- an agent keeps making reasonable but unwanted assumptions
- tasks do not say when they are complete
- dependencies and non-goals are buried in prose

## Steps

### 1. Replace vague language

Vague:

```sdd
Must:
  Handle errors nicely.
```

Explicit:

```sdd
Must:
  Return a validation error when the itinerary item is missing a place name.
  Preserve existing itinerary items when validation fails.
```

If a rule cannot be checked, rewrite it until a reviewer can tell whether a diff satisfies it.

### 2. State ownership and paths

Do not make readers infer the local boundary:

```sdd
Owns:
  ./itinerary.js
  ./itinerary.test.js

Can read:
  ../destinations/search.sdd
```

Use explicit relative paths. `./` means the current spec directory. `../` means the parent directory. `/` means the
content root for the SpecDD project.

### 3. Write direct behavior rules

Good behavior rules describe outcomes, not implementation preferences:

```sdd
Must:
  Normalize blank notes to an empty string before saving an itinerary item.
  Reject an itinerary item when its day is outside the trip date range.
```

Avoid locking in implementation detail unless the implementation choice is part of the durable contract:

```sdd
Must:
  Use exactly three helper functions named validateA, validateB, and validateC.
```

That kind of rule is usually too brittle unless callers, tests, or reviewers truly depend on it.

### 4. Add non-goals and forbidden work

Use `Must not` for plausible local mistakes:

```sdd
Must not:
  Change destination search ranking.
  Create bookings or purchase tickets.
```

Use `Forbids` when a dependency, path, tool, library, or kind of access is blocked:

```sdd
Forbids:
  ../booking/*
  network access during validation
```

This keeps boundaries visible during implementation and review.

### 5. Name dependencies and context

If behavior depends on another area, say so:

```sdd
Depends on:
  ../destinations/search.sdd

References:
  ../dates/date-range.sdd
```

Use dependency sections to make cross-area context intentional. Do not copy the other area's rules into this spec unless
this spec owns a local refinement.

### 6. Define completion criteria

Use `Done when` to stop work at the right point:

```sdd
Done when:
  Missing-place validation is covered by a check.
  Existing itinerary items remain unchanged after a validation failure.
  No destination search tests change.
```

Completion criteria should be reviewable from code, tests, docs, or a clear manual check.

### 7. Preserve uncertainty instead of guessing

If a draft idea contains ambiguity, keep the ambiguity visible:

```sdd
Tasks:
  [?] Confirm whether blank place names should be rejected or auto-filled from recent destinations.
```

Do not turn an unresolved product or architecture decision into a silent implementation assumption.

## Before and after

Before:

```sdd
Spec: Trip improvements

Purpose:
  Make itinerary editing nicer and safer.

Must:
  Be robust.
  Avoid bad side effects.

Tasks:
  [ ] Improve itinerary validation.
```

After:

```sdd
Spec: Itinerary validation

Purpose:
  Protect saved itinerary items from incomplete or out-of-range entries.

Owns:
  ./itinerary-validation.js
  ./itinerary-validation.test.js

Must:
  Reject itinerary items without a place name.
  Reject itinerary items whose day is outside the trip date range.
  Preserve existing itinerary items when validation fails.

Must not:
  Change destination search ranking.

Depends on:
  ../dates/date-range.sdd

Tasks:
  [ ] Add missing-place validation.
  [ ] Add out-of-range day validation.

Done when:
  Validation failure cases are covered by checks.
  Destination search behavior is unchanged.
```

## Common mistakes

- Using adjectives where a concrete behavior is needed.
- Hiding non-goals in background prose instead of `Must not`.
- Forgetting to name paths when modification authority matters.
- Writing tasks without `Done when` criteria.
- Resolving open questions without review.
- Copying parent constraints instead of depending on inherited context.

## How to verify the result

The spec is explicit when:

- a reviewer can name the governed subject
- required behavior is observable
- boundaries are written in dedicated sections
- dependencies are visible
- unknowns are marked
- completion can be checked without guessing

## Related how-tos

- [How to write Must rules](/how-to/use-spec-sections/how-to-write-must-rules/)
- [How to write Must not rules](/how-to/use-spec-sections/how-to-write-must-not-rules/)
- [How to use the Depends on section](/how-to/use-spec-sections/how-to-use-the-depends-on-section/)
- [How to write Done when](/how-to/use-spec-sections/how-to-write-done-when/)

## Related reference

- [Language reference](/language-reference/)
