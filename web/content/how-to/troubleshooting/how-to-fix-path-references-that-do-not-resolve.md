---
title: "How to fix path references that do not resolve"
seoDescription: "Fix unresolved SpecDD path references by checking explicit prefixes, relative location, content root, moved files, case sensitivity, stale references, and globs."
excerpt: "Troubleshoot unresolved SpecDD paths by checking ./, ../, and / references, content root assumptions, renamed files, case differences, and malformed globs."
level: "Beginner"
howtoID: "1191005"
weight: 60
---

This guide shows you how to fix SpecDD path references that do not resolve.

Missing exact paths are unresolved references, not `.sdd` syntax errors. The fix is usually to correct the path, open
the right content root, update a stale reference, or make the line plain prose when it was not meant to be a path.

## Short answer

SpecDD treats only explicit path prefixes as file references: `./`, `../`, and `/`. Check whether the reference is meant
to be a path, resolve it from the current spec directory or selected content root, fix renamed or moved files, check
case sensitivity, and validate with editor diagnostics or `specdd lint`.

## Steps

### 1. Confirm the reference is meant to be a path

This is prose, not a path reference:

```sdd
Owns:
  itinerary.js
```

Use an explicit path when you want tools to resolve it:

```sdd
Owns:
  ./itinerary.js
```

If the line is only descriptive prose, leave it unprefixed.

### 2. Use an explicit path prefix

Supported path prefixes are:

- `./` relative to the current `.sdd` file directory
- `../` relative to the current `.sdd` file directory
- `/` relative to the selected content root

Unsupported:

```sdd
Can read:
  ~/shared/spec.sdd
```

Use a project-relative or spec-relative path instead.

### 3. Check the reference base

For this spec:

```text
src/trips/itinerary.sdd
```

this path:

```sdd
Can read:
  ../storage/trip-storage.sdd
```

resolves from `src/trips/`, not from the repository root.

Paths starting with `/` resolve from the selected content root:

```sdd
References:
  /src/storage/trip-storage.sdd
```

If the wrong root is open, `/` paths can appear broken.

### 4. Check moved or renamed files

Unresolved references often come from stale paths after a refactor:

```sdd
References:
  ../storage/trip-store.sdd
```

If the file is now:

```text
../storage/trip-storage.sdd
```

update the reference.

### 5. Check case and monorepo root

Case matters on many filesystems and in tools. Make the path match the actual filename:

```text
TripStorage.sdd
```

is not the same as:

```text
trip-storage.sdd
```

In monorepos, confirm which directory is the selected SpecDD content root. A `/` path resolves from that root, not
necessarily from the Git repository root if the project has independent SpecDD roots.

### 6. Fix malformed globs

Malformed globs are warning-level unresolved glob issues, not syntax errors.

Problem:

```sdd
Can read:
  ./fixtures/[*.json
```

Fix:

```sdd
Can read:
  ./fixtures/*.json
```

### 7. Validate with editor or CLI

Run:

```sh
specdd lint path/to/spec.sdd
```

or use editor path warnings. The unresolved reference should disappear after the path is corrected.

## Common causes

- Missing `./`, `../`, or `/` prefix.
- Assuming `../` resolves from the repository root.
- Opening a nested folder as the workspace root.
- Renaming files without updating references.
- Case mismatch.
- Using `~/` paths.
- Malformed glob syntax.

## How to verify the fix

The path is fixed when:

- the reference uses the intended explicit prefix
- the target exists at that resolved location
- case matches the filesystem
- editor path warnings clear
- `specdd lint` passes for the edited spec
- related spec resolution includes the intended context when appropriate

## Related how-tos

- [How to enable .sdd validation and path warnings in your editor](/how-to/editor-setup/how-to-enable-sdd-validation-and-path-warnings-in-your-editor/)
- [How to debug spec resolution problems](/how-to/troubleshooting/how-to-debug-spec-resolution-problems/)
- [How to reference another area's spec safely](/how-to/spec-driven-workflows/how-to-reference-another-areas-spec-safely/)
- [How to use the CLI through an agent](/how-to/work-with-specdd-skills/how-to-use-the-cli-through-an-agent-specdd-cli/)

## Related reference

- [Language reference](/language-reference/)
