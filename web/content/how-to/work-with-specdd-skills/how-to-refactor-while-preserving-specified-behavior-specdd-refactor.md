---
title: "How to refactor while preserving specified behavior (specdd-refactor)"
seoDescription: "Refactor with specdd-refactor by preserving active spec-driven development behavior, confirming write authority, avoiding boundary moves, and verifying before and after risky structure changes."
excerpt: "Use specdd-refactor for structure changes that should not change specified behavior, ownership, public contracts, or forbidden dependencies."
level: "Intermediate"
howtoID: "1091009"
weight: 130
---

This guide shows you how to use `specdd-refactor` for structure changes that should preserve active spec-driven development behavior.

A refactor is not a behavior change. If behavior must change to complete the request, stop treating the work as a pure
refactor and resolve authority for the behavior change first.

## Short answer

Use `specdd-refactor` when code, tests, docs, specs, or project structure should change without changing specified
behavior. The agent should identify public contracts, scenarios, invariants, dependencies, forbidden boundaries, and
write authority; work in small mechanical steps; run baseline checks when practical; and update specs, docs, or tests
only when the refactor changes structure they describe.

## When to use this guide

Use this guide when:

- code needs cleanup without behavior changes
- a module should be split or moved while preserving contracts
- tests or docs need structure cleanup
- ownership boundaries must remain intact
- public symbols, paths, or contracts should not change
- refactoring with an agent needs explicit guardrails

## Steps

### 1. Confirm this is a refactor

Use a focused prompt:

```text
Refactor the Itinerary validation internals.
```

Then check whether the request changes behavior. If it adds validation, changes outputs, renames public symbols, changes
errors, or moves responsibilities between specs, it is not a pure refactor.

### 2. Identify behavior to preserve

The agent should identify:

- `Must` behavior
- `Must not` boundaries
- `Forbids` dependencies and paths
- public `Exposes`, `Accepts`, `Returns`, and `Raises`
- `Scenario` examples
- invariants implied by `Done when`
- dependencies that must not widen

This becomes the refactor safety checklist.

### 3. Confirm write authority

Every file that moves or changes needs authority through the active spec chain.

Example:

```sdd
Can modify:
  ./itinerary.js
  ./itinerary.test.js
```

If a refactor needs to move responsibility across spec boundaries, stop and review the specs first. `specdd-refactor`
must not silently move ownership.

### 4. Plan small mechanical steps

Prefer changes that are easy to review:

- rename a private helper
- extract a private function
- move tests without changing assertions
- split a file inside the same owned boundary
- update imports within allowed files

Avoid broad rewrites unless the specs or user request require them.

### 5. Run baseline and final checks

When practical, run baseline checks before refactoring. Then rerun the relevant checks after each risky step or at least
after the final change.

Verification should prove behavior was preserved:

- existing tests still pass
- specified scenarios still pass
- public API snapshots or docs still match when relevant
- no forbidden dependency was added

### 6. Update specs only when structure changes

A pure internal cleanup may not need a spec edit. Update specs, docs, or tests when the refactor changes structure they
describe.

Example: if `itinerary.js` becomes `itinerary-validation.js` and `itinerary-items.js`, update `Owns`, `Can modify`, or
`Structure` in the relevant spec.

Do not rewrite behavioral requirements if behavior did not change.

## Common mistakes

- Smuggling behavior changes into a refactor.
- Moving responsibility across spec boundaries without updating specs.
- Renaming public symbols when the request only covers internals.
- Adding a new dependency that an inherited spec forbids.
- Skipping baseline checks and then being unable to tell whether a regression is new.

## How to verify the result

The refactor worked when:

- specified behavior is unchanged
- public contracts are preserved unless explicitly in scope
- changed files were authorized
- no forbidden dependency or boundary crossing was introduced
- relevant checks passed before and after risky work when practical
- specs changed only when described structure changed

## Related how-tos

- [How to implement one spec at a time](/how-to/spec-driven-workflows/how-to-implement-one-spec-at-a-time/)
- [How to implement under spec authority](/how-to/work-with-specdd-skills/how-to-implement-under-spec-authority-specdd-do/)
- [How to review a diff against specs](/how-to/work-with-specdd-skills/how-to-review-a-diff-against-specs-specdd-review/)
- [How to chain SpecDD skills safely](/how-to/work-with-specdd-skills/how-to-chain-specdd-skills-safely/)

## Related reference

- [Tools](/tools/)
- [Language reference](/language-reference/)
