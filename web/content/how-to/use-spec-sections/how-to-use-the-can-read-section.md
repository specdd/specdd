---
title: "How to use the Can read section"
seoDescription: "Use the Can read section in SpecDD to give files, specs, or docs as read-only context without granting edit permission."
excerpt: "Use Can read for context that helps implementation or review while keeping writable authority in Owns or Can modify."
level: "Beginner"
howtoID: "1061006"
weight: 70
---

This guide shows you how to use the `Can read` section in a SpecDD `.sdd` file.

`Can read` lists files, paths, specs, or prose context that may be read for understanding. It is useful when an
implementation area depends on context from another area but should not edit it.

## Short answer

Use `Can read` for read-only context. It lets humans and agents inspect related code, specs, docs, fixtures, or contracts
without granting modification authority. Put writable files in `Can modify` or `Owns`.

## Syntax

```sdd
Can read:
  ../storage/trip-storage.sdd
  ../storage/trip-storage.js
  /docs/adr/storage-boundary.md
```

Rules:

- `Can read` is a mixed-entry body section.
- It may contain paths, globs, symbols, key-value lines, or prose.
- It must not have inline text after `Can read:`.
- Body entries use two spaces.

## Steps

### 1. Identify context the work needs

Use `Can read` for:

- nearby specs needed for context
- source files that explain expected behavior
- existing docs or ADRs
- fixtures or examples
- public contracts that should be preserved
- dependency behavior that should not be edited

Example:

```sdd
Can read:
  ../destinations/destination-search.sdd
```

### 2. Keep edit permission separate

Good:

```sdd
Can modify:
  ./itinerary.js
  ./itinerary.test.js

Can read:
  ../destinations/destination-search.sdd
```

This means itinerary work may read destination search context, but it should not edit destination search under this
spec.

### 3. Use `References` for explicit related contracts

`Can read` is good for read context. `References` is useful when the relationship to another spec, contract, or document
is explicit and important.

You can use both:

```sdd
Can read:
  ../storage/trip-storage.js

References:
  ../storage/trip-storage.sdd
```

### 4. Review that context stayed read-only

During review, changed files listed only in `Can read` should be treated as suspicious. Either split the change, update
the correct owning spec, or revise write authority through review.

## Common mistakes

- Treating `Can read` as permission to edit.
- Putting every dependency in `Owns` when it only needs to be read.
- Listing broad directories that make context too noisy.
- Using `Can read` to hide missing ownership decisions.
- Forgetting to review whether read-only context changed.

## How to verify the result

`Can read` is doing its job when:

- related context is easy to find
- writable scope remains narrow
- referenced or read files stay unmodified
- reviewers can explain the read-vs-write boundary
- agents do not infer authority from imports or proximity

## Related how-tos

- [How to use the References section](/how-to/use-spec-sections/how-to-use-the-references-section/)
- [How to use the Can modify section](/how-to/use-spec-sections/how-to-use-the-can-modify-section/)
- [How to reference another area's spec safely](/how-to/spec-driven-workflows/how-to-reference-another-areas-spec-safely/)

## Related reference

- [Language reference](/language-reference/)
