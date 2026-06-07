---
title: "How to update specs during refactoring"
seoDescription: "Update SpecDD specs during refactoring in a spec-driven development workflow by changing ownership, paths, structure, references, tasks, and Done when only when the refactor changes them."
excerpt: "Keep specs accurate during refactors without inventing behavior changes: update structural sections, path references, tasks, and checks with the code."
level: "Intermediate"
howtoID: "1151002"
weight: 30
---

This guide shows you how to update SpecDD specs during refactoring in a spec-driven development workflow.

Specs should stay accurate as structure changes. If code moves, files split, tests relocate, or ownership changes, the
specs that describe those paths and responsibilities need to move with the refactor. But a behavior-preserving refactor
should not rewrite behavioral rules just because implementation internals changed.

The job is to keep the contract accurate, not to make the spec look new.

## Short answer

During a refactor, update `Owns`, `Can modify`, `Can read`, `References`, `Structure`, tasks, and `Done when` when paths,
ownership, or verification change. Keep `Must`, `Must not`, scenarios, and public contract sections unchanged unless the
intended behavior changes. Commit spec and code updates together so future work sees one consistent source of truth.

## When to use this guide

Use this guide when:

- files are renamed or moved
- a module is split
- tests move with refactored code
- ownership changes between specs
- same-basename specs need to move
- `Structure` no longer matches directories
- `Done when` refers to old checks

## Steps

### 1. Decide whether behavior changed

Before editing the spec, ask:

- Did required behavior change?
- Did a non-goal change?
- Did a public contract change?
- Did the refactor only change structure?

If behavior changed, update the owning behavior spec intentionally. If only structure changed, keep behavior sections
stable.

### 2. Update ownership sections

Before:

```sdd
Owns:
  ./itinerary.js
  ./itinerary.test.js
```

After splitting:

```sdd
Owns:
  ./itinerary-validation.js
  ./itinerary-validation.test.js
  ./itinerary-formatting.js
  ./itinerary-formatting.test.js
```

If the split creates separate responsibilities, do not simply add every file to one broad `Owns`. Create smaller specs
for the new owners.

### 3. Update path references

Check:

- `Structure`
- `Owns`
- `Can modify`
- `Can read`
- `References`
- `Depends on` entries that use explicit paths
- `Forbids`
- `Exposes` entries that are path-like or public file paths

Use explicit `./`, `../`, or `/` prefixes when paths are intended.

### 4. Move same-basename specs with files

If:

```text
itinerary.js
itinerary.sdd
```

becomes:

```text
validation/itinerary-validation.js
validation/itinerary-validation.sdd
```

move and rename the spec so same-basename matching still works. Then update parent `Structure`, `References`, or `Owns`
entries that pointed to the old location.

### 5. Move tests without changing behavior

Tests may move during a refactor. Keep assertions aligned with the same spec behavior.

If tests now prove different behavior, that is not only a test move. Update the behavior spec and review the change as a
contract change.

### 6. Update tasks and Done when

If a task or completion criterion references old structure, update it:

```sdd
Done when:
  Missing-place validation is covered by the validation unit checks.
```

Do not leave stale `Done when` entries pointing to removed tests or old workflows.

### 7. Lint and review

After refactor-related spec edits:

```sh
specdd lint path/to/changed/spec-or-directory
```

Then review:

- paths still resolve
- behavior rules stayed stable unless intentionally changed
- ownership did not become broader by accident
- task status matches checks
- no referenced context was treated as edit authority

## Common mistakes

- Rewriting `Must` rules during a structural refactor even though behavior stayed the same.
- Adding all split files to one broad `Owns` instead of creating smaller local specs.
- Moving code but leaving same-basename specs behind.
- Updating `References` but not `Can modify` or `Owns`.
- Forgetting `Forbids` paths that now point to old directories.
- Leaving `Done when` criteria tied to removed test names.

## How to verify the result

Specs are updated correctly when:

- behavior sections changed only when behavior changed
- ownership paths match the new structure
- same-basename specs still sit beside their files
- references and forbidden paths are current
- tasks and completion criteria match actual checks
- spec lint passes
- reviewers can understand the refactor from code and spec changes together

## Related how-tos

- [How to rename or move files without breaking spec resolution](/how-to/refactoring-and-maintenance/how-to-rename-or-move-files-without-breaking-spec-resolution/)
- [How to use paths in SpecDD sections](/how-to/use-spec-sections/how-to-use-paths-in-specdd-sections/)
- [How to fix stale Done when criteria](/how-to/troubleshooting/how-to-fix-stale-done-when-criteria/)
- [How to keep specs in sync with code changes](/how-to/spec-driven-workflows/how-to-keep-specs-in-sync-with-code-changes/)

## Related reference

- [Language reference](/language-reference/)
