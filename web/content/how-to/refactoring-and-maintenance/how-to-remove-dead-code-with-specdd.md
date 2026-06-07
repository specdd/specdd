---
title: "How to remove dead code with SpecDD"
seoDescription: "Remove dead code with spec-driven development by proving behavior is obsolete, updating governing specs, deleting code and tests safely, and avoiding stale rules."
excerpt: "Use SpecDD to delete dead code without deleting live behavior: trace authority, update or remove specs, adjust tests, and verify nothing still depends on it."
level: "Intermediate"
howtoID: "1151008"
weight: 90
---

This guide shows you how to remove dead code with SpecDD in a spec-driven development workflow.

Dead code removal is risky when the code looks unused but still represents specified behavior, compatibility, migration
support, or a boundary rule. SpecDD gives you a way to separate dead implementation from live contract.

The safe deletion path is: prove the behavior is obsolete, update the governing spec, remove code and tests together,
and verify no stale specs still describe deleted behavior.

## Short answer

Before deleting code, trace the specs that govern it. If the behavior is still required by `Must`, `Scenario`,
`Example`, public contract sections, or `Done when`, do not delete it until the spec is changed or retired. If the
behavior is obsolete, update or remove the owning spec, delete code and tests, update references, run checks, and confirm
no stale rules remain.

## When to use this guide

Use this guide when:

- code appears unused
- a feature was deprecated and can now be removed
- a compatibility path is no longer needed
- generated or legacy code remains after a migration
- tests cover behavior that should no longer exist
- a spec still describes deleted behavior
- agents suggest deleting code during cleanup

## Steps

### 1. Prove the behavior is obsolete

Ask:

- Is the feature retired?
- Is the compatibility window over?
- Are callers removed?
- Are migrations complete?
- Are docs updated?
- Are tests proving obsolete behavior?
- Does any spec still require the behavior?

Do not delete code only because it has low usage or looks old.

### 2. Find governing specs

Trace the code to:

- nearest local spec
- same-basename spec
- ancestor specs
- explicit references
- public contract specs
- deprecation specs

Look for these section labels:

```text
Must:
Scenario:
Example:
Exposes:
Returns:
Raises:
Done when:
Tasks:
```

Any of these may still require the behavior.

### 3. Update or remove spec rules

If the behavior is intentionally removed, update the owner:

```sdd
Must not:
  Use the legacy trip export path for new exports.

Tasks:
  [x] Remove legacy trip export code after v2 export adoption.
```

If the whole spec is obsolete, retire the spec. If only one behavior is obsolete, remove or revise the specific rule and
leave the rest.

### 4. Delete code and tests together

Remove:

- implementation code
- dead tests for obsolete behavior
- fixtures only used by the deleted behavior
- docs examples for removed behavior
- generated artifacts tied only to the deleted behavior

Keep tests that still prove current behavior or compatibility.

### 5. Update references and paths

Search for the deleted code and spec names. Update:

- `Owns`
- `Can modify`
- `References`
- `Structure`
- `Depends on`
- `Forbids`
- docs links
- CI or build config

Leaving stale references makes future maintenance harder.

### 6. Run checks

Run:

- spec lint for affected directories
- tests for areas that used the deleted code
- build or type checks
- contract checks if public behavior changed
- docs checks if examples changed

If checks fail because tests still expect deleted behavior, decide whether the test is stale or the deletion was wrong.

## Example removal plan

```text
Target: Legacy trip export

Evidence:
  v2 export is released
  no active callers use legacy command
  deprecation removal criterion is satisfied
  legacy behavior removed from Export API spec

Delete:
  legacy export implementation
  legacy-only fixtures
  legacy export tests

Keep:
  v2 export contract tests
  compatibility note in release docs

Checks:
  specdd lint export directory
  export API contract tests
  project build
```

## Common mistakes

- Deleting code while the governing spec still requires it.
- Removing tests before deciding whether behavior is obsolete.
- Treating low usage as proof that behavior is dead.
- Deleting a spec that also contains still-valid boundaries.
- Leaving stale `Owns`, `References`, or docs links.
- Allowing an agent cleanup to remove compatibility behavior without review.

## How to verify the result

Dead code removal is safe when:

- obsolete behavior is explicitly removed or updated in the owning spec
- no live spec still requires the deleted code
- stale tests and docs were updated
- live behavior and contracts still pass checks
- references to deleted paths are gone
- reviewers can explain why the behavior is no longer required

## Related how-tos

- [How to retire obsolete specs](/how-to/refactoring-and-maintenance/how-to-retire-obsolete-specs/)
- [How to deprecate behavior with SpecDD](/how-to/spec-driven-workflows/how-to-deprecate-behavior-with-specdd/)
- [How to recover from spec-code drift](/how-to/spec-driven-workflows/how-to-recover-from-spec-code-drift/)
- [How to run quality gates after SpecDD changes](/how-to/testing-and-quality/how-to-run-quality-gates-after-specdd-changes/)

## Related reference

- [Language reference](/language-reference/)
