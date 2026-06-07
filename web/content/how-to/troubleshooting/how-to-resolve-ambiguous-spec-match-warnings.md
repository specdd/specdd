---
title: "How to resolve ambiguous spec match warnings"
seoDescription: "Resolve ambiguous SpecDD spec match warnings by fixing case-only same-basename collisions, preferring exact filenames, and renaming specs so tools do not guess."
excerpt: "Fix ambiguous SpecDD matches when multiple case-insensitive same-basename specs could govern one target by renaming files and preserving exact local authority."
level: "Intermediate"
howtoID: "1191004"
weight: 50
---

This guide shows you how to resolve ambiguous spec match warnings.

SpecDD same-basename matching is case-insensitive, with exact filename matches preferred. If several case-insensitive
matches exist and none is exact, tools should report ambiguity instead of guessing.

## Short answer

Find the target file and the competing `.sdd` files in the same directory. Keep one exact same-basename match for the
target, rename or remove the ambiguous case-only alternatives, update any explicit references, then rerun resolution or
validation.

## Steps

### 1. Identify the target file

Start from the file or directory that produced the warning:

```text
src/trips/Itinerary.js
```

SpecDD looks for a same-directory same-basename `.sdd` file.

### 2. Find competing same-basename specs

Problem example:

```text
src/trips/Itinerary.js
src/trips/itinerary.sdd
src/trips/Itinerary.sdd
```

On a case-insensitive match, both specs could appear to govern `Itinerary.js`. If exact matching does not make the
answer clear, the safe behavior is to report ambiguity.

### 3. Prefer exact filename matches

If the target is:

```text
Itinerary.js
```

the clearest local spec is:

```text
Itinerary.sdd
```

If your project convention uses lowercase filenames, rename the source and spec consistently instead:

```text
itinerary.js
itinerary.sdd
```

Do not rely on tools guessing between case-only variants.

### 4. Rename to remove ambiguity

Keep one local spec for the target:

```text
src/trips/Itinerary.js
src/trips/Itinerary.sdd
```

Move unrelated behavior into a different, clearly named spec:

```text
src/trips/itinerary-view.sdd
```

Only use named specs when they have a clear subject and are referenced or otherwise part of the applicable chain.

### 5. Update references

Search for explicit references to the renamed spec:

```text
References:
  ./itinerary.sdd
```

Update them to the new path. Use explicit prefixes such as `./`, `../`, or `/`.

### 6. Verify resolution

Run the relevant tool:

```sh
specdd resolve src/trips/Itinerary.js --sections Spec,Owns,Can modify,Must
```

or use editor validation. The target should resolve to one local spec without ambiguity.

## Common causes

- Case-only duplicate specs such as `itinerary.sdd` and `Itinerary.sdd`.
- Renaming source files but not spec files.
- Mixing platform naming conventions across one directory.
- Copying a spec as a draft and leaving it beside the real spec.
- Using named specs without explicit references.

## How to verify the fix

The ambiguity is fixed when:

- one same-directory same-basename spec governs the target
- exact filename matching is clear
- stale references were updated
- `specdd resolve` or editor diagnostics no longer report ambiguity
- reviewers can tell which spec grants local authority

## Related how-tos

- [How to use basic SpecDD levels](/how-to/getting-started/how-to-use-basic-specdd-levels/)
- [How to debug spec resolution problems](/how-to/troubleshooting/how-to-debug-spec-resolution-problems/)
- [How to fix an agent that cannot find the right local spec](/how-to/troubleshooting/how-to-fix-an-agent-that-cannot-find-the-right-local-spec/)
- [How to structure a SpecDD project layout](/how-to/install-and-setup/how-to-structure-a-specdd-project-layout/)

## Related reference

- [Language reference](/language-reference/)
