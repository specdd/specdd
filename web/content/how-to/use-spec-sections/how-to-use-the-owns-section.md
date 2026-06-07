---
title: "How to use the Owns section"
seoDescription: "Use the Owns section in SpecDD to declare the files, directories, symbols, concepts, or responsibilities governed by a spec."
excerpt: "Use Owns to define what a spec governs; when Can modify is absent, Owns also acts as the modification boundary."
level: "Beginner"
howtoID: "1061004"
weight: 50
---

This guide shows you how to use the `Owns` section in a SpecDD `.sdd` file.

`Owns` lists files, directories, symbols, concepts, or responsibilities governed by the spec. It is one of the most
important sections for review because it tells humans and agents what the local contract is about.

## Short answer

Use `Owns` to declare what the spec governs. List owned files or paths with explicit prefixes, and list owned concepts
or responsibilities as clear prose. Only one spec should own a specific item at a given time. If `Can modify` is absent,
`Owns` also acts as the modification boundary.

## Syntax

```sdd
Owns:
  ./itinerary.js
  ./itinerary.test.js
  Itinerary behavior for trip planning.
```

Rules:

- `Owns` is a mixed-entry body section.
- It may contain paths, symbols, key-value lines, or prose.
- It must not have inline text after `Owns:`.
- Body entries use two spaces.

## Steps

### 1. List what the spec governs

For a simple local spec:

```sdd
Owns:
  ./itinerary.js
  ./itinerary.test.js
```

For responsibility ownership:

```sdd
Owns:
  Itinerary validation behavior.
  Itinerary ordering behavior.
```

Use both when helpful.

### 2. Keep ownership local

Good:

```sdd
Owns:
  ./itinerary.js
  ./itinerary.test.js
```

Too broad:

```sdd
Owns:
  ../trips/*
  ../destinations/*
  ../booking/*
```

Broad ownership makes review harder and can authorize changes that should belong to separate specs.

### 3. Separate ownership from read context

If a module needs another module for context, do not put the other module in `Owns`.

Use:

```sdd
Owns:
  ./itinerary.js

Can read:
  ../storage/trip-storage.sdd
```

`Can read` and `References` do not grant edit permission.

### 4. Add `Can modify` when writable scope differs

If the spec owns a responsibility but only some files may change, add `Can modify`:

```sdd
Owns:
  Itinerary validation behavior.
  ./itinerary.js
  ./itinerary.fixtures.json

Can modify:
  ./itinerary.js
  ./itinerary.test.js
```

When `Can modify` is present, use it for write authority.

### 5. Avoid overlapping ownership

Only one spec should own a specific item at a given time. If two specs appear to own the same file or behavior, clarify
the boundary before implementation.

## Common mistakes

- Putting every imported file in `Owns`.
- Letting two local specs own the same behavior.
- Treating `Owns` as a human team-owner field.
- Using broad globs to avoid deciding the real boundary.
- Forgetting that `Owns` becomes the write boundary when `Can modify` is absent.

## How to verify the result

The `Owns` section is clear when:

- each entry belongs to the local subject
- file paths are explicit
- read-only context is not listed as owned
- ownership does not overlap confusingly with another spec
- reviewers can tell what the spec governs

## Related how-tos

- [How to use the Can modify section](/how-to/use-spec-sections/how-to-use-the-can-modify-section/)
- [How to use the Can read section](/how-to/use-spec-sections/how-to-use-the-can-read-section/)
- [How to assign ownership for specs](/how-to/teams-and-process/how-to-assign-ownership-for-specs/)

## Related reference

- [Language reference](/language-reference/)
