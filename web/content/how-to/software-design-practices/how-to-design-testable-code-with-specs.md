---
title: "How to design testable code with specs"
seoDescription: "Design testable code with spec-driven development by writing specs with observable behavior, clear boundaries, scenarios, dependencies, and Done when checks."
excerpt: "Use specs to shape code that is easier to test: local responsibilities, explicit dependencies, scenarios as inputs, and boundaries that keep setup small."
level: "Intermediate"
howtoID: "1101006"
weight: 70
---

This guide shows you how to design testable code with SpecDD in a spec-driven development workflow.

Tests are easier to write when the design has clear responsibilities, explicit dependencies, and observable behavior.
They become painful when one unit owns too much, hidden side effects spread across layers, or the only way to verify a
small rule is to run an entire application workflow.

Specs help by shaping the design before and during implementation. A good spec does not just say what to build. It also
makes the unit testable by defining what the unit owns, what collaborators matter, what behavior must be observed, what
must not happen, and what checks count as done.

## Short answer

Write specs around testable units. Use `Purpose` and `Owns` to keep the subject local, `Must` for observable behavior,
`Must not` and `Forbids` to block hidden side effects, `Depends on` for important collaborators, `Scenario` and
`Example` as test inputs, and `Done when` to connect the spec to checks.

## When to use this guide

Use this guide when:

- tests require too much unrelated setup
- behavior is hard to observe directly
- a unit has hidden dependencies
- validation or policy rules are duplicated in UI, API, and jobs
- side effects happen in surprising places
- specs describe behavior but not how it will be checked

## The design idea

Testable code is usually well-designed code, but not because every implementation detail is exposed. It is testable
because the important behavior has a clear owner and a clear boundary. You can provide inputs, observe outputs or
effects, and verify that forbidden side effects did not happen.

SpecDD makes this concrete. If a spec's behavior cannot be tested without unrelated layers, that is a design signal. The
spec may be too broad, the unit may own too much, or an important dependency may be hidden.

## Steps

### 1. Write observable behavior

Good:

```sdd
Must:
  Reject itinerary items without a place name.
  Preserve existing itinerary items when validation fails.
```

Weak:

```sdd
Must:
  Improve itinerary validation quality.
```

Observable behavior gives tests something specific to verify.

### 2. Keep the subject local

Use `Owns` to define the testable boundary:

```sdd
Spec: Itinerary Validation

Purpose:
  Decide whether an itinerary item can be saved.

Owns:
  ./itinerary-validation.js
  ./itinerary-validation.test.js
```

If the spec owns UI, domain behavior, storage, and API behavior all at once, tests will likely need broad integration
setup. Split the concerns unless the broad workflow is intentionally what you are testing.

### 3. Name dependencies

Use `Depends on` for collaborators that affect behavior:

```sdd
Depends on:
  TripDateRange
```

The implementation can then receive that dependency in a way tests can control. The spec does not prescribe dependency
injection mechanics, but it does make the collaborator visible.

### 4. Use scenarios as test inputs

Specs are not tests, but scenarios are excellent test seeds:

```sdd
Scenario: missing place name
  Given the place name is empty
  When the person adds the itinerary item
  Then validation fails
  And no itinerary item is stored
```

This scenario suggests at least one check. It also clarifies that no storage effect should occur.

### 5. Avoid hidden side effects

Use `Must not` for side effects that would make tests and behavior harder to reason about:

```sdd
Must not:
  Save itinerary items when validation fails.
  Fetch destination search results during validation.
```

Use `Forbids` for hard access boundaries:

```sdd
Forbids:
  direct browser storage access
  ../destination-search/*
```

This keeps a validation unit test from needing storage or search infrastructure.

### 6. Define Done when checks

Connect design and verification:

```sdd
Done when:
  Missing-place validation is covered by a check.
  Validation failure preserves existing itinerary items.
  No storage write occurs after validation failure.
```

`Done when` should not merely say "tests pass." It should identify the checks that prove the specified behavior.

## Example testable spec

```sdd
Spec: Itinerary Validation

Purpose:
  Decide whether an itinerary item can be saved.

Owns:
  ./itinerary-validation.js
  ./itinerary-validation.test.js

Must:
  Reject itinerary items without a place name.
  Reject itinerary items whose day is outside the trip date range.
  Preserve existing itinerary items when validation fails.

Must not:
  Save itinerary items directly.
  Fetch destination search results.

Depends on:
  TripDateRange

Scenario: missing place name
  Given the place name is empty
  When the person adds the itinerary item
  Then validation fails
  And no itinerary item is stored

Done when:
  Missing-place validation is covered by a check.
  Out-of-range day validation is covered by a check.
  Validation failure does not write to storage.
```

This spec leads naturally to focused tests because the responsibility, inputs, collaborators, and forbidden effects are
visible.

## Common mistakes

- Writing broad specs that require full application setup for every check.
- Stating behavior as vague quality goals instead of observable outcomes.
- Hiding important collaborators in implementation detail.
- Forgetting to specify forbidden side effects.
- Treating scenarios as tests without adding actual checks.
- Writing `Done when` criteria that do not identify what must be verified.

## How to verify the result

The code design is testable when:

- the spec subject is local
- behavior can be observed from inputs, outputs, raised errors, events, or controlled side effects
- dependencies that affect behavior are visible
- scenarios can become test cases
- forbidden side effects can be checked
- tests do not need unrelated layers unless the spec is intentionally an integration boundary

## Related how-tos

- [How to write Scenario blocks](/how-to/use-spec-sections/how-to-write-scenario-blocks/)
- [How to write Done when](/how-to/use-spec-sections/how-to-write-done-when/)
- [How to write specs for edge cases](/how-to/spec-writing-technique/how-to-write-specs-for-edge-cases/)
- [How to use the Depends on section](/how-to/use-spec-sections/how-to-use-the-depends-on-section/)

## Related reference

- [Language reference](/language-reference/)
