---
title: "How to choose the right test level from a spec"
seoDescription: "Choose the right test level from a SpecDD spec in a spec-driven development workflow by matching unit, integration, end-to-end, contract, snapshot, static, or benchmark checks to the governed behavior."
excerpt: "Use the spec's owner, behavior, risk, and Done when criteria to decide what kind of test or quality check should prove the change."
level: "Intermediate"
howtoID: "1131008"
weight: 90
---

This guide shows you how to choose the right test level from a SpecDD spec in a spec-driven development workflow.

Not every specified behavior needs an end-to-end test. Not every boundary can be proven by a unit test. The right test
level depends on what the spec governs and what risk the check is meant to reduce.

SpecDD helps because the spec names the owner. A model spec usually points to focused model tests. An API spec often
points to contract or request/response tests. A component spec may need interaction tests. A `Forbids` rule may need a
static import check. The spec gives you the starting point.

## Short answer

Choose the smallest check that proves the specified behavior at the level where the behavior is owned. Use unit tests
for local pure behavior, integration tests for collaborator behavior, end-to-end tests for critical user workflows,
contract tests for public interfaces, snapshot tests for stable structured output, static checks for dependency
boundaries, and benchmarks or budget checks for performance constraints.

## When to use this guide

Use this guide when:

- reviewers disagree about whether a unit test is enough
- a spec has scenarios but no test plan
- a local change is being tested only through an end-to-end flow
- negative constraints need verification
- public API behavior needs compatibility coverage
- a performance or observability rule needs evidence

## The decision principle

Start with the spec owner:

- model or policy specs usually need focused rule tests
- service specs often need collaborator or orchestration tests
- adapter specs often need boundary and failure translation tests
- API specs often need contract tests
- component specs often need interaction and accessibility checks
- job specs often need idempotency, retry, and failure tests
- event specs often need payload and handler contract tests
- module or architecture specs may need static or integration checks

Then increase test level only when the lower level cannot prove the risk.

## Test level guide

### Unit test

Use when the spec governs local logic with controlled inputs and outputs:

```sdd
Spec: Itinerary Validation

Must:
  Reject itinerary items without a place name.
```

Good evidence:

```text
Unit test for missing-place validation.
```

### Integration test

Use when the spec governs collaboration between local units:

```sdd
Spec: Itinerary Service

Depends on:
  ItineraryValidation
  TripStorage

Must:
  Save itinerary changes only after validation succeeds.
```

Good evidence:

> Integration-style service test confirming storage is called only after validation succeeds.

### End-to-end test

Use when the spec governs a critical user workflow across layers:

```sdd
Spec: Add Place To Itinerary

Must:
  When the trip and place are valid, the place appears on the selected trip day.
```

Good evidence:

```text
End-to-end check for adding a place through the user interface.
```

Do not use end-to-end tests for every local rule. They are slower, broader, and harder to diagnose.

### Contract test

Use when the spec governs a public API, event, CLI output, or package export:

```sdd
Spec: Add Itinerary Item API

Returns:
  201 with ItineraryItemResponse
  400 for validation failure
```

Good evidence:

```text
API contract test for success and validation failure response shape.
```

### Snapshot test

Use when the spec governs stable structured output:

```sdd
Returns:
  JSON export with top-level trips array
```

Good evidence:

```text
Snapshot or golden-file check for the machine-readable export.
```

Use snapshots carefully. They are useful when the output is intentionally stable and reviewers understand changes.

### Static check

Use when the spec governs dependencies, imports, paths, or access:

```sdd
Forbids:
  UI importing ../adapters/*
```

Good evidence:

```text
Static import-boundary check.
```

This is often better than a runtime test for dependency direction.

### Benchmark or budget check

Use when the spec defines performance or resource constraints:

```sdd
Must:
  Return itinerary summaries within 200 ms at p95 for trips with up to 500 itinerary items.
```

Good evidence:

```text
Benchmark or performance gate for the stated workload.
```

Do not invent performance checks without a real requirement and workload.

## Steps

### 1. Identify the spec owner

Read `Spec`, `Purpose`, `Owns`, and the spec level. The owner tells you the natural test boundary.

### 2. Classify the behavior

Ask whether the rule is:

- local calculation
- state transition
- orchestration
- public interface
- UI interaction
- external boundary
- dependency rule
- performance constraint
- security or authorization decision

### 3. Match evidence to risk

Use the smallest check that catches the failure mode. If a unit test proves the rule directly, do not jump to an
end-to-end test. If the risk is integration behavior, do not stop at an isolated unit test.

### 4. Avoid broad tests for local rules

Testing every local rule through an end-to-end flow creates slow, brittle suites. Keep broad tests for critical flows
and use focused tests for local behavior.

### 5. Cover boundaries appropriately

For `Must not` and `Forbids`, choose practical evidence:

- runtime regression test for behavior that must not happen
- static check for forbidden imports or dependencies
- review evidence for judgment-heavy constraints

### 6. Record the chosen check

Use `Done when`:

```sdd
Done when:
  Missing-place validation is covered by a unit check.
  Add itinerary item API response shape is covered by a contract check.
  UI import boundary is covered by a static check.
```

Only mention the level when it adds clarity. Avoid over-constraining tests if the project may reasonably change test
strategy later.

## Common mistakes

- Defaulting every scenario to an end-to-end test.
- Using a unit test for behavior that depends on real collaborator integration.
- Testing public API contracts only through UI flows.
- Using snapshots for output that is not intended to be stable.
- Trying to prove dependency direction with runtime tests when a static check is better.
- Writing `Done when` so specific that harmless test refactors become spec changes.

## How to verify the result

The chosen test level is right when:

- it matches the spec owner
- it proves the failure mode that matters
- it is no broader than necessary
- public contracts have contract-level evidence
- boundaries have static or review evidence where practical
- `Done when` explains the expected check without locking in unnecessary implementation detail

## Related how-tos

- [How to design testable code with specs](/how-to/software-design-practices/how-to-design-testable-code-with-specs/)
- [How to find test coverage gaps from specs](/how-to/testing-and-quality/how-to-find-test-coverage-gaps-from-specs/)
- [How to write specs for performance constraints](/how-to/spec-writing-technique/how-to-write-specs-for-performance-constraints/)
- [How to write an API spec](/how-to/write-specs-by-level/how-to-write-an-api-spec/)

## Related reference

- [Language reference](/language-reference/)
