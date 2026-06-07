---
title: "How to refactor with SpecDD"
seoDescription: "Refactor with spec-driven development by capturing current behavior in local specs, confirming authority, changing structure in small steps, and verifying behavior stayed the same."
excerpt: "Use SpecDD to make refactoring behavior-preserving: define the contract first, work inside authority, and update specs only when structure or ownership changes."
level: "Intermediate"
howtoID: "1151000"
weight: 10
---

This guide shows you how to refactor with SpecDD in a spec-driven development workflow.

A refactor changes structure without changing specified behavior. That distinction matters. If the work changes outputs,
validation, permissions, public contracts, errors, or user-visible behavior, it is not only a refactor. Treat that as a
behavior change and update the owning spec deliberately.

SpecDD is an amazing way to refactor because it gives the refactor a contract to preserve. Instead of relying on memory,
you can point to local specs, scenarios, `Must` rules, `Must not` boundaries, public contracts, and `Done when` criteria.

## Short answer

Before refactoring, make sure the current intended behavior is captured in the governing spec. Confirm that the files you
will edit or move are inside `Owns` or `Can modify`. Refactor in small structural steps, preserve `Must`, `Must not`,
`Forbids`, scenarios, and public contract sections, and run checks before marking tasks complete. Update specs only when
structure, ownership, paths, tasks, or completion criteria change.

## When to use this guide

Use this guide when:

- code needs cleanup without intended behavior changes
- a large file should be split
- private helpers should be renamed or reorganized
- tests should move with code
- imports need simplification
- a module should be prepared for later feature work
- agents need guardrails for a structural change

## Steps

### 1. Confirm the change is a refactor

Ask:

- Will any `Must` behavior change?
- Will any `Must not` boundary be weakened?
- Will a public `Exposes`, `Accepts`, `Returns`, or `Raises` contract change?
- Will permissions, validation, persistence, or user-visible behavior change?
- Will another spec own behavior after the change?

If yes, split the work. First update or add the behavior spec, then refactor under that reviewed authority.

### 2. Capture current behavior

If no local spec exists, create a small one before the refactor:

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

The spec should capture intended behavior, not every current implementation detail.

### 3. Check write authority

Before editing, confirm the nearest local spec grants authority:

```sdd
Can modify:
  ./itinerary-validation.js
  ./itinerary-validation.test.js
```

If `Can modify` is absent, `Owns` acts as the modification boundary. Files listed only in `Can read` or `References`
are context, not edit permission.

### 4. Plan small structural steps

Good refactor steps:

- extract a private helper
- move a test with its code
- split a file inside the same owner
- rename a private symbol
- remove duplication while preserving behavior
- update imports after moving files

Avoid broad rewrites that make behavior preservation hard to review.

### 5. Refactor inside scope

During the change, keep checking:

- no specified behavior changed
- no forbidden dependency was introduced
- no public contract changed accidentally
- no task was expanded beyond the local boundary
- tests still prove the same behavior

If the refactor reveals a missing behavior rule, pause and update the spec deliberately.

### 6. Update specs only when structure changes

A private cleanup may need no spec edit. Update specs when:

- `Owns` paths change
- `Can modify` paths change
- `Structure` changes
- a same-basename spec moves with a file
- `References` or `Can read` paths become stale
- task status or `Done when` changes

Do not rewrite `Must` rules if behavior is unchanged.

### 7. Run checks and review the diff

Run the relevant tests and quality gates. If practical, run baseline checks before a risky refactor and final checks
afterward.

Review the diff against:

- `Must`
- `Must not`
- `Forbids`
- write authority
- scenarios
- public contracts
- `Done when`

## Example refactor plan

```text
Target: Itinerary Validation

Preserve:
  missing-place validation
  unchanged itinerary after validation failure
  no direct storage writes

Steps:
  1. Extract validation result builder.
  2. Move edge-case helpers into itinerary-validation-rules.js.
  3. Update tests without changing assertions.
  4. Update Owns if the new file remains part of the local validation unit.
  5. Run focused validation tests and project quality gates.
```

This plan is specific enough to review before code moves.

## Common mistakes

- Calling a behavior change a refactor.
- Refactoring code before capturing the intended behavior in a spec.
- Moving files outside `Owns` or `Can modify`.
- Updating behavior rules just because private structure changed.
- Forgetting to update path references after a move.
- Skipping checks and relying on visual diff review.

## How to verify the result

The refactor is safe when:

- specified behavior is unchanged
- public contracts are preserved unless explicitly in scope
- changed files stayed inside authority
- specs were updated for structural changes
- tests and checks still pass
- reviewers can trace the diff back to the preserved spec contract

## Related how-tos

- [How to refactor while preserving specified behavior](/how-to/work-with-specdd-skills/how-to-refactor-while-preserving-specified-behavior-specdd-refactor/)
- [How to prevent regressions with local specs](/how-to/testing-and-quality/how-to-prevent-regressions-with-local-specs/)
- [How to update specs during refactoring](/how-to/refactoring-and-maintenance/how-to-update-specs-during-refactoring/)
- [How to recover from spec-code drift](/how-to/spec-driven-workflows/how-to-recover-from-spec-code-drift/)

## Related reference

- [Language reference](/language-reference/)
