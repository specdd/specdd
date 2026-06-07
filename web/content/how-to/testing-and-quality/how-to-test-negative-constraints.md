---
title: "How to test negative constraints"
seoDescription: "Test spec-driven development negative constraints by choosing practical checks for Must not behavior, Forbids dependency boundaries, forbidden calls, and regression guards."
excerpt: "Use tests, static checks, and review evidence to verify important Must not and Forbids rules without forcing every negative constraint into a unit test."
level: "Intermediate"
howtoID: "1131009"
weight: 100
---

This guide shows you how to test negative constraints in spec-driven development.

Negative constraints are rules about what must not happen. In SpecDD, they usually appear in `Must not` and `Forbids`.
They protect boundaries, non-goals, forbidden behavior, blocked dependencies, paths, tools, modules, libraries, and
access patterns.

Negative constraints are extremely useful, but they require judgment. Some deserve unit or integration tests. Some are
better enforced with static checks. Some are best covered by code review because automation would be brittle or
misleading.

## Short answer

Classify the negative rule first. Use behavior tests for `Must not` rules that describe observable forbidden behavior.
Use static checks, dependency rules, or linting for `Forbids` entries that block imports, paths, modules, libraries, or
access patterns. Use review evidence for judgment-heavy boundaries. Do not force every negative constraint into a unit
test.

## When to use this guide

Use this guide when:

- a `Must not` rule protects an important behavior boundary
- a `Forbids` rule blocks dependency direction or access
- a previous bug involved a forbidden side effect
- reviewers need proof that a boundary still holds
- CI should enforce import or dependency rules
- an agent made a happy-path test pass while doing forbidden work

## Steps

### 1. Classify the negative rule

Behavior-level `Must not`:

```sdd
Must not:
  Save itinerary items after validation fails.
```

Dependency-level `Forbids`:

```sdd
Forbids:
  UI importing ../adapters/*
```

Policy or review-level boundary:

```sdd
Must not:
  Change destination search ranking.
```

The right evidence depends on which kind of rule you have.

### 2. Test forbidden behavior

For observable forbidden behavior, write a test:

```sdd
Must not:
  Save itinerary items after validation fails.
```

Possible test:

```text
Validation failure does not call storage and leaves the itinerary unchanged.
```

This test proves a specific negative effect.

### 3. Test forbidden side effects

Negative constraints often protect side effects:

```sdd
Must not:
  Emit TripDataExported when export authorization fails.
  Send notification emails before trip edit access is confirmed.
  Retry permission failures.
```

Possible checks:

- event was not emitted
- email sender was not called
- retry count stayed zero
- audit sink did not receive a denied action as a success event

Use mocks, fakes, spies, logs, or integration harnesses only when they are part of the project's normal testing style.

### 4. Check forbidden dependencies statically

For `Forbids`:

```sdd
Forbids:
  domain importing ../adapters/*
  UI importing ../adapters/*
```

A static check is usually better than a runtime test:

- import-boundary lint rule
- dependency graph check
- package dependency policy
- architecture test
- module visibility check

Runtime tests rarely prove that a forbidden import cannot be added later.

### 5. Add regression guards for known failures

If a forbidden behavior already regressed once, add a focused guard:

```sdd
Scenario: validation failure does not store
  Given the place name is empty
  When the person adds the itinerary item
  Then validation fails
  And no itinerary item is stored
```

This scenario can become a regression test.

### 6. Use review evidence where automation is not practical

Some negative rules are important but hard to automate cheaply:

```sdd
Must not:
  Change destination search ranking.
```

Possible evidence:

- existing destination search tests pass
- changed files do not touch destination search ranking code
- reviewer confirms no ranking inputs changed
- trace shows destination search spec was read-only context

If a rule keeps regressing, invest in stronger automation later.

### 7. Put the evidence in Done when

Good:

```sdd
Done when:
  Validation failure does not call storage.
  UI import boundary is covered by the import-boundary check.
  Destination search ranking remains unchanged by review and existing checks.
```

Weak:

```sdd
Done when:
  Negative cases pass.
```

Name the evidence that matters.

## Examples

### Must not behavior

```sdd
Must not:
  Save itinerary changes after validation fails.

Done when:
  Validation failure does not call storage.
```

Best evidence: focused behavior test.

### Forbids dependency

```sdd
Forbids:
  UI importing ../adapters/*

Done when:
  UI import boundary check passes.
```

Best evidence: static import-boundary check.

### Boundary protected by review

```sdd
Must not:
  Change destination search ranking.

Done when:
  Existing destination search checks pass.
  Review confirms destination ranking inputs are unchanged.
```

Best evidence: existing tests plus targeted review, unless this boundary keeps regressing.

## Common mistakes

- Ignoring `Must not` because the happy path passes.
- Trying to unit-test every `Forbids` entry instead of using static checks.
- Treating review-only evidence as enough for a recurring regression.
- Writing negative tests that assert private implementation detail.
- Forgetting to test absence of side effects such as events, retries, writes, or notifications.
- Removing a negative check when a boundary changes instead of updating the owning spec.

## How to verify the result

Negative constraints are covered well when:

- each important `Must not` has behavior evidence or a reason it does not need automation
- each important `Forbids` has static or review evidence
- known regressions have focused guards
- side effects are checked when they are the risk
- `Done when` names the evidence
- reviewers understand what remains manual

## Related how-tos

- [How to write Must not rules](/how-to/use-spec-sections/how-to-write-must-not-rules/)
- [How to use the Forbids section](/how-to/use-spec-sections/how-to-use-the-forbids-section/)
- [How to choose the right test level from a spec](/how-to/testing-and-quality/how-to-choose-the-right-test-level-from-a-spec/)
- [How to review changes to Must not and Forbids](/how-to/code-review-and-governance/how-to-review-changes-to-must-not-and-forbids/)

## Related reference

- [Language reference](/language-reference/)
