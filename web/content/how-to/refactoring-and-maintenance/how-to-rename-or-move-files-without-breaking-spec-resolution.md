---
title: "How to rename or move files without breaking spec resolution"
seoDescription: "Rename or move files without breaking SpecDD resolution in a spec-driven development workflow by updating same-basename specs, directory specs, path references, roots, and validation checks."
excerpt: "Use a practical SpecDD file-move checklist for same-basename specs, explicit paths, references, case-sensitive names, content roots, and linting."
level: "Intermediate"
howtoID: "1151007"
weight: 80
---

This guide shows you how to rename or move files without breaking SpecDD resolution in a spec-driven development
workflow.

SpecDD resolution depends on local file names, same-basename specs, ancestor specs, explicit path references, and content
roots. A rename that looks harmless to the compiler can leave specs pointing at old paths or cause tools and agents to
load the wrong local contract.

Treat file moves as spec-aware maintenance.

## Short answer

When renaming or moving files, move same-basename `.sdd` files with their governed files, update explicit paths in
`Owns`, `Can modify`, `Can read`, `References`, `Structure`, `Depends on`, `Forbids`, and `Exposes`, check directory
spec relationships, avoid case-only ambiguity, lint affected specs, and confirm the moved file resolves to the intended
spec chain.

## When to use this guide

Use this guide when:

- renaming source or test files
- moving files between directories
- changing case in filenames
- moving a directory that has local specs
- changing content-root structure
- updating path-bearing spec sections
- cleaning up old references after a refactor

## Steps

### 1. List affected files

Before moving, list:

- source files
- test files
- same-basename `.sdd` files
- directory specs
- parent specs with `Structure`
- specs with explicit references to old paths
- docs or examples that link to the old file

This prevents half-updated moves.

### 2. Handle same-basename specs

Same-basename matching matters:

```text
itinerary.js -> itinerary.sdd
main.test.js -> main.test.sdd
Trip.ts -> Trip.sdd
```

If you rename:

```text
itinerary.js
```

to:

```text
itinerary-validation.js
```

rename the local spec when it still governs that file:

```text
itinerary-validation.sdd
```

### 3. Update explicit paths

Search old paths and update all relevant sections:

```sdd
Owns:
  ./itinerary-validation.js

References:
  ../validation/itinerary-validation.sdd

Forbids:
  ../legacy-itinerary/*
```

Unprefixed names are text, not path references. Use `./`, `../`, or `/` when you intend a path.

### 4. Check directory specs

A directory can be governed by same-basename or parent-held specs. When moving a directory, check both patterns:

```text
src/trips/trips.sdd
src/trips.sdd
```

If the directory's role changes, update `Structure`, parent ownership, and child specs.

### 5. Avoid case-only ambiguity

SpecDD matching is case-insensitive, with exact matches preferred. Avoid case-only duplicates such as:

```text
Trip.sdd
trip.sdd
```

Case-only renames are especially risky across platforms and tools. Prefer a clear non-ambiguous name.

### 6. Check content-root paths

Paths beginning with `/` resolve from the selected content root, not the filesystem root:

```sdd
References:
  /docs/adr/trip-layering.md
```

If a move changes the content root or project boundary, update root-relative references carefully.

### 7. Lint and inspect

Run:

```sh
specdd lint path/to/affected/directory
```

Then inspect or trace a moved file and confirm:

- the intended same-basename spec is included
- ancestor specs are still correct
- explicit references resolve
- write authority is still clear

## Move checklist

```text
Before merge:
  same-basename specs moved or renamed
  Owns paths updated
  Can modify paths updated
  References and Can read paths updated
  Structure paths updated
  Forbids paths updated
  tests moved or references updated
  no case-only ambiguity introduced
  specdd lint passes
```

## Common mistakes

- Renaming source files but not same-basename specs.
- Updating `Owns` but not `Can modify`.
- Leaving old `References` that still resolve to deleted paths.
- Treating unprefixed filenames as paths.
- Creating case-only duplicate specs.
- Moving a directory without checking parent-held directory specs.

## How to verify the result

Spec resolution still works when:

- moved files have the intended local specs
- explicit paths point to current locations
- directory specs still provide the intended context
- no ambiguous case-only names exist
- root-relative paths still use the selected content root
- lint and trace confirm the expected spec chain

## Related how-tos

- [How to name SpecDD files](/how-to/spec-writing-technique/how-to-name-specdd-files/)
- [How to use paths in SpecDD sections](/how-to/use-spec-sections/how-to-use-paths-in-specdd-sections/)
- [How to move code without losing spec authority](/how-to/refactoring-and-maintenance/how-to-move-code-without-losing-spec-authority/)
- [How to debug spec resolution problems](/how-to/troubleshooting/how-to-debug-spec-resolution-problems/)

## Related reference

- [Language reference](/language-reference/)
