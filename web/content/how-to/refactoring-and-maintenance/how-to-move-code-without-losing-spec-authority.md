---
title: "How to move code without losing spec authority"
seoDescription: "Move code without losing SpecDD authority in a spec-driven development workflow by moving or updating local specs, ownership paths, references, same-basename matches, and checks."
excerpt: "Keep moved files governed by the right specs: update ownership, same-basename specs, references, paths, tests, and validation with the code move."
level: "Intermediate"
howtoID: "1151005"
weight: 60
---

This guide shows you how to move code without losing SpecDD authority in a spec-driven development workflow.

Moving code is not just a filesystem operation. In a SpecDD project, a file's governing context may come from ancestor
specs, same-basename specs, explicit references, and local ownership sections. If you move code without updating those,
future contributors may read the wrong spec or edit without clear authority.

The safe move keeps code, tests, and specs aligned in the new location.

## Short answer

Before moving code, identify the current spec authority and the target authority. Move same-basename specs with their
files when they govern the moved behavior. Update `Owns`, `Can modify`, `Can read`, `References`, `Structure`, and
`Forbids` paths. Preserve behavior, move tests when appropriate, lint changed specs, and trace the moved file to confirm
the right spec governs it.

## When to use this guide

Use this guide when:

- files are moved to another directory
- code changes packages or modules
- tests move with implementation
- a same-basename `.sdd` file exists
- references point to old paths
- a module split changes local ownership
- an agent is moving code during cleanup

## Steps

### 1. Identify current authority

For a file:

```text
src/trips/itinerary-validation.js
```

check:

- same-basename spec in the same directory
- directory-level specs
- ancestor specs
- `Owns` or `Can modify`
- explicit references that affect context

Do not move the file first and then guess.

### 2. Define target authority

Ask:

- Which spec should govern the file after the move?
- Does the target directory already have a parent spec?
- Should the same-basename spec move too?
- Does behavior remain owned by the same subject?
- Are tests moving with the file?

If the target owner is new, create or update the target spec before relying on it.

### 3. Move same-basename specs with code

Before:

```text
src/trips/itinerary-validation.js
src/trips/itinerary-validation.sdd
```

After:

```text
src/trips/validation/itinerary-validation.js
src/trips/validation/itinerary-validation.sdd
```

Same-basename specs are local. Leaving the spec behind can break resolution or leave the moved file without the nearest
expected authority.

### 4. Update path sections

Check every path-bearing section in affected specs:

```sdd
Structure:
Owns:
Can modify:
Can read:
References:
Depends on:
Forbids:
Exposes:
```

Use explicit path prefixes:

```sdd
Owns:
  ./validation/itinerary-validation.js
  ./validation/itinerary-validation.test.js
```

### 5. Preserve behavior

A move should not change behavior unless that behavior change is separately specified.

Before accepting the move, verify:

- `Must` behavior still holds
- scenarios still pass
- public contracts are unchanged
- forbidden dependencies were not introduced
- tests still prove the same behavior

### 6. Check references and docs

Search for old paths:

```text
src/trips/itinerary-validation.js
src/trips/itinerary-validation.sdd
```

Update references in:

- specs
- tests
- docs
- examples
- build or package config
- code comments when they point to real paths

### 7. Lint and trace

Run:

```sh
specdd lint path/to/affected/directory
```

Then trace or inspect the moved file to confirm it resolves to the intended spec chain. The important question is:
which spec grants write authority now?

## Common mistakes

- Moving code but leaving the same-basename spec behind.
- Updating imports but not `Owns` or `Can modify`.
- Forgetting `References` that point to the old path.
- Moving tests outside the spec that owns them.
- Treating a file move as a chance to change behavior.
- Assuming a target directory's nearby spec automatically owns the moved file without checking paths.

## How to verify the result

The move preserved spec authority when:

- the moved file has a clear governing spec chain
- the nearest local spec grants write authority
- same-basename specs moved or were intentionally replaced
- all path references are current
- tests moved or still run under correct authority
- behavior and public contracts are unchanged
- spec lint and relevant checks pass

## Related how-tos

- [How to rename or move files without breaking spec resolution](/how-to/refactoring-and-maintenance/how-to-rename-or-move-files-without-breaking-spec-resolution/)
- [How to use paths in SpecDD sections](/how-to/use-spec-sections/how-to-use-paths-in-specdd-sections/)
- [How to name SpecDD files](/how-to/spec-writing-technique/how-to-name-specdd-files/)
- [How to define write authority for agents](/how-to/code-review-and-governance/how-to-define-write-authority-for-agents/)

## Related reference

- [Language reference](/language-reference/)
