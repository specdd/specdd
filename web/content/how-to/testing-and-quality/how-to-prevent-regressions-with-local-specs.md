---
title: "How to prevent regressions with local specs"
seoDescription: "Prevent regressions with local SpecDD specs in a spec-driven development workflow by capturing bug behavior, adding regression scenarios, deriving focused tests, and preserving boundaries."
excerpt: "Use local specs to turn regressions into durable behavior and focused checks so the same bug or boundary violation does not return."
level: "Intermediate"
howtoID: "1131006"
weight: 70
---

This guide shows you how to prevent regressions with local SpecDD specs in a spec-driven development workflow.

A regression means behavior that should stay fixed changed again. The usual response is a test, and that is important.
SpecDD adds another layer: it captures why the behavior matters, where it belongs, and what adjacent behavior must not
change while fixing it.

The pattern is simple: when a bug or drift appears, update the local spec that owns the behavior, add a scenario or rule
that would have caught it, add a focused regression check, and keep the spec and test aligned.

## Short answer

When a regression appears, identify the owning local spec and add or tighten the relevant `Must`, `Must not`,
`Scenario`, `Handles`, `Raises`, or `Done when` entry. Then derive a regression test or static check from that entry.
Do not leave the fix only in code or only in a test if the behavior is part of the durable contract.

## When to use this guide

Use this guide when:

- a bug returned after a previous fix
- a boundary was crossed again
- an edge case was fixed but not specified
- a test exists but no spec explains why the behavior matters
- an implementation change broke a scenario
- a reviewer asks how the fix prevents the same issue from returning

## The design idea

Tests catch regressions. Specs prevent the team from forgetting what the test is protecting.

If a test fails months later, the spec should help the contributor understand whether the test protects intended
behavior, old accidental behavior, or a boundary that has since changed. Without that context, regression tests become
harder to maintain and easier to delete.

## Steps

### 1. Identify the regression

Name the behavior that broke:

```text
Itinerary validation allowed an item without a place name.
```

Then ask:

- Which spec should own this behavior?
- Is the behavior already specified?
- Is the existing spec too vague?
- Did the bug cross a `Must not` or `Forbids` boundary?
- Which check should have caught it?

### 2. Update the owning spec

If the spec already has the rule, tighten it if needed:

```sdd
Must:
  Reject itinerary items without a place name.
  Preserve existing itinerary items when validation fails.
```

If the rule is missing, add it to the local owner. Do not add it only to the test file.

### 3. Add a regression scenario

Use a scenario when the failure needs concrete setup:

```sdd
Scenario: blank place name after editing
  Given an itinerary item edit has a blank place name
  When the edit is saved
  Then validation fails
  And the previous itinerary item remains unchanged
```

This scenario preserves the exact failure mode without overfitting to implementation details.

### 4. Add a regression check

The check should prove the scenario:

```text
Editing an itinerary item to a blank place name fails and preserves the previous item.
```

Avoid:

```text
Calls validatePlaceName in edit mode.
```

The first test protects behavior. The second protects an implementation choice.

### 5. Protect adjacent boundaries

Regressions often happen because the fix happened in the wrong place.

Add boundaries when needed:

```sdd
Must not:
  Duplicate itinerary validation rules in UI components.
  Save itinerary changes after validation fails.
```

If the regression involved a forbidden dependency:

```sdd
Forbids:
  UI importing ../adapters/*
```

Then choose a practical verification gate: regression test, static check, or review checklist.

### 6. Keep the task open until verified

Good:

```sdd
Tasks:
  [ ] Add regression coverage for blank place name during edit.

Done when:
  Blank-place edit regression is covered by a check.
  Existing itinerary item remains unchanged after failed edit.
```

Mark the task `[x]` only after the check passes.

### 7. Review for stale behavior

Sometimes a failing regression test reveals that the intended behavior changed. If so, update the spec first or in the
same reviewed change. Do not silently delete the test or change the implementation without updating the source-of-truth
contract.

## Example regression fix

```sdd
Spec: Itinerary Validation

Purpose:
  Decide whether an itinerary item can be saved.

Must:
  Reject itinerary items without a place name.
  Preserve existing itinerary items when validation fails.

Must not:
  Save itinerary changes after validation fails.

Scenario: blank place name after editing
  Given an existing itinerary item has a place name
  When the place name is edited to blank
  Then validation fails
  And the existing itinerary item remains unchanged

Tasks:
  [ ] Add regression coverage for blank place name during edit.

Done when:
  Blank-place edit regression is covered by a check.
```

This spec captures both the bug and the behavior that protects against its return.

## Common mistakes

- Adding a regression test without updating a missing or vague spec rule.
- Writing a regression scenario that depends on private implementation details.
- Fixing the bug in a caller instead of the owner of the behavior.
- Marking a regression task done before the check runs.
- Treating a stale regression test as wrong without checking the governing spec.
- Forgetting negative boundaries that would have prevented the regression path.

## How to verify the result

Regression prevention is working when:

- the intended behavior is in the owning spec
- the failure mode is captured as a rule or scenario
- a focused regression check proves the behavior
- relevant `Must not` and `Forbids` boundaries are still enforced
- the task status matches passed checks
- future contributors can understand why the regression check exists

## Related how-tos

- [How to find test coverage gaps from specs](/how-to/testing-and-quality/how-to-find-test-coverage-gaps-from-specs/)
- [How to use SpecDD with TDD](/how-to/testing-and-quality/how-to-use-specdd-with-tdd/)
- [How to keep specs in sync with code changes](/how-to/spec-driven-workflows/how-to-keep-specs-in-sync-with-code-changes/)
- [How to write specs for edge cases](/how-to/spec-writing-technique/how-to-write-specs-for-edge-cases/)

## Related reference

- [Language reference](/language-reference/)
