---
title: "How to use paths in SpecDD sections"
seoDescription: "Use paths in SpecDD sections with explicit ./, ../, and / prefixes, understanding content roots, relative resolution, and path-based authority."
excerpt: "Use explicit path prefixes in SpecDD so humans, agents, and tools can distinguish real file references from prose."
level: "Intermediate"
howtoID: "1061023"
weight: 240
---

This guide shows you how to use paths in SpecDD `.sdd` sections.

Explicit paths matter because path references can affect context, ownership, write authority, and review. SpecDD treats
unprefixed filenames as text, not path references.

## Short answer

Use `./`, `../`, or `/` when you mean a file or directory path. `./` and `../` resolve relative to the current `.sdd`
file directory. `/` resolves relative to the selected content root. Put paths in sections that match intent: `Owns` or
`Can modify` for authority, `Can read` or `References` for context, `Forbids` for blocked paths, and `Structure` for
layout.

## Path prefixes

Use:

```text
./local-file.js
../sibling-area/spec.sdd
/docs/adr/storage-boundary.md
```

Meaning:

- `./` is relative to the directory containing the current `.sdd` file.
- `../` is relative to the directory containing the current `.sdd` file.
- `/` is relative to the selected content root.
- `~/` is not a supported path prefix.

Unprefixed text is not an explicit path:

```sdd
Depends on:
  TripStorage
```

`TripStorage` is dependency text, not a file path.

## Steps

### 1. Choose the section by intent

Layout:

```sdd
Structure:
  ./src: Source code
```

Ownership:

```sdd
Owns:
  ./itinerary.js
```

Write authority:

```sdd
Can modify:
  ./itinerary.js
  ./itinerary.test.js
```

Read-only context:

```sdd
Can read:
  ../storage/trip-storage.sdd
```

Blocked path:

```sdd
Forbids:
  ../booking/*
```

### 2. Use `/` paths for content-root references

Use `/` when the reference should be stable from the selected content root:

```sdd
References:
  /docs/adr/storage-boundary.md
```

The content root is selected by tooling or project setup. In a single repository, it is usually the repository root. In
a monorepo, it may be the monorepo root or an explicitly configured project root.

### 3. Avoid unprefixed filenames

Weak:

```sdd
Can modify:
  itinerary.js
```

Good:

```sdd
Can modify:
  ./itinerary.js
```

Unprefixed filenames are plain text, not explicit path references.

### 4. Understand path-bearing sections

Tools may extract explicit paths from:

- `Structure`
- `Owns`
- `Can modify`
- `Can read`
- `References`
- `Depends on`
- `Forbids`
- `Exposes`

Path-bearing does not mean path-only. These sections may still contain prose.

### 5. Review path authority

Paths in different sections mean different things.

`Can modify`:

```sdd
Can modify:
  ./itinerary.js
```

means writable under this spec.

`Can read`:

```sdd
Can read:
  ./itinerary.js
```

means read context only.

Do not treat every path as permission to edit.

## Common mistakes

- Writing unprefixed filenames when explicit paths were intended.
- Using `/` without knowing the selected content root.
- Treating paths in `Can read` or `References` as writable.
- Putting blocked paths in `Must not` instead of `Forbids`.
- Assuming a directory path recursively includes every descendant spec.

## How to verify the result

Path usage is clear when:

- explicit paths use `./`, `../`, or `/`
- the section matches the intended meaning
- write authority paths are separated from read context
- content-root paths are intentional
- reviewers can explain why each path appears

## Related how-tos

- [How to use globs in SpecDD](/how-to/use-spec-sections/how-to-use-globs-in-specdd/)
- [How to use the Can modify section](/how-to/use-spec-sections/how-to-use-the-can-modify-section/)
- [How to use the References section](/how-to/use-spec-sections/how-to-use-the-references-section/)

## Related reference

- [Language reference](/language-reference/)
