---
title: "How to write good specs"
seoDescription: "Write good SpecDD specs for spec-driven development by keeping them local, specific, outcome-focused, constraint-oriented, and reviewable for humans and agents."
excerpt: "Good SpecDD specs are short, local, behavior-focused contracts that define ownership, constraints, tasks, and done criteria without broad vague prose."
level: "Beginner"
howtoID: "1071000"
weight: 10
---

This guide shows you how to write good SpecDD specs for a spec-driven development workflow.

A good spec is not a long explanation. It is a small local contract that helps humans and agents understand what the
subject owns, what must remain true, what must not happen, and how work is verified.

## Short answer

Good specs are local, specific, short, behavioral, constraint-oriented, and easy to review. Start with `Spec` and
`Purpose`, add ownership, required behavior, plausible boundaries, local tasks, and `Done when` only when those sections
add useful local information. Avoid vague goals, broad refactors, unrelated scope, and implementation detail that does
not affect the contract.

## When to use this guide

Use this guide when:

- a spec feels too vague to guide implementation
- reviewers cannot tell what the spec governs
- agents keep overbuilding from a spec
- a draft spec reads like a requirements essay
- code, tests, and specs are hard to compare

## Steps

### 1. Choose a local subject

Good:

```sdd
Spec: Itinerary
```

Weak:

```sdd
Spec: Trip planning and everything around it
```

The subject should be small enough that ownership, behavior, and checks are reviewable.

### 2. Write outcome-focused behavior

Good:

```sdd
Must:
  Reject itinerary items without a place name.
```

Weak:

```sdd
Must:
  Carefully validate every possible kind of trip input in a robust way.
```

Outcome-focused rules are easier to implement and test.

### 3. Define ownership and authority

Use `Owns` for what the spec governs:

```sdd
Owns:
  ./itinerary.js
  ./itinerary.test.js
```

Use `Can modify` when writable scope should be explicit or narrower:

```sdd
Can modify:
  ./itinerary.js
  ./itinerary.test.js
```

If `Can modify` is absent, `Owns` acts as the modification boundary.

### 4. Add useful boundaries

Use `Must not` for plausible local mistakes:

```sdd
Must not:
  Change destination search behavior.
```

Use `Forbids` for blocked dependencies, paths, libraries, tools, modules, or access:

```sdd
Forbids:
  ../booking/*
```

Do not list every unrelated thing the subject does not do.

### 5. Make completion checkable

```sdd
Done when:
  Missing-place behavior is covered by a check.
  Destination search behavior is unchanged.
```

`Done when` gives reviewers and agents a concrete stopping point.

### 6. Remove vague prose

Bad task:

```sdd
Tasks:
  [ ] Make trips better.
```

Better:

```sdd
Tasks:
  [ ] Add missing-place validation.
```

If a line cannot guide implementation, review, or verification, remove it or make it concrete.

## Side-by-side example

Weak:

```sdd
Spec: Trips

Purpose:
  Improve trips and make them work nicely.

Must:
  Be robust and production-quality.

Tasks:
  [ ] Clean up everything.
```

Better:

```sdd
Spec: Itinerary

Purpose:
  Keep trip itinerary items organized by day.

Owns:
  ./itinerary.js
  ./itinerary.test.js

Must:
  Reject itinerary items without a place name.
  Keep existing itinerary items unchanged when validation fails.

Must not:
  Change destination search behavior.

Tasks:
  [ ] Add missing-place validation.

Done when:
  Missing-place behavior is covered by a check.
```

## Common mistakes

- Writing broad goals instead of observable behavior.
- Describing unrelated parts of the system.
- Hiding architecture decisions in long prose.
- Omitting ownership and then expecting agents to infer scope.
- Adding implementation detail that should not be a durable contract.
- Marking tasks done without checks.

## How to verify the result

The spec is good when:

- the subject is local
- ownership and write authority are clear
- behavior is specific enough to check
- boundaries prevent plausible wrong work
- tasks are local and small
- reviewers can compare a diff against the spec

## Related how-tos

- [How to start from a minimum viable spec](/how-to/spec-writing-technique/how-to-start-from-a-minimum-viable-spec/)
- [How to write Must rules](/how-to/use-spec-sections/how-to-write-must-rules/)
- [How to write Must not rules](/how-to/use-spec-sections/how-to-write-must-not-rules/)
- [How to write Done when](/how-to/use-spec-sections/how-to-write-done-when/)

## Related reference

- [Language reference](/language-reference/)
