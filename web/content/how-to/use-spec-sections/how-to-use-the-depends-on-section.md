---
title: "How to use the Depends on section"
seoDescription: "Use the Depends on section in SpecDD to list allowed dependencies, collaborators, contracts, symbols, paths, or required context."
excerpt: "Use Depends on to name allowed collaborators and dependencies, while preserving inherited Must not and Forbids boundaries."
level: "Intermediate"
howtoID: "1061011"
weight: 120
---

This guide shows you how to use the `Depends on` section in a SpecDD `.sdd` file.

`Depends on` lists dependencies, collaborators, contracts, symbols, paths, or required context. It is useful when a spec
should make dependency direction visible.

## Short answer

Use `Depends on` to declare collaborators or dependencies the subject is allowed or expected to use. It does not
override inherited `Forbids` or `Must not`. Keep the list focused on dependencies that matter for implementation and
review.

## Syntax

```sdd
Depends on:
  TripStorage
  DestinationSearch
  @ItineraryLogger
```

Rules:

- `Depends on` is a mixed-entry body section.
- It may contain dependency names, symbols, paths, key-value lines, or prose.
- It must not have inline text after `Depends on:`.
- Body entries use two spaces.

## Steps

### 1. Name collaborators that matter

Use `Depends on` for collaborators the subject is expected to use:

```sdd
Depends on:
  TripStorage
  DestinationSearch
```

This helps reviewers distinguish approved collaborators from accidental imports.

### 2. Use paths or symbols when precision helps

Path:

```sdd
Depends on:
  ../storage/trip-storage.sdd
```

Symbol:

```sdd
Depends on:
  @TripStorage
```

Plain names are valid text, but explicit paths and symbols give tools more to resolve.

### 3. Do not use `Depends on` to break boundaries

This conflict should stop review:

```sdd
Forbids:
  ../booking/*

Depends on:
  ../booking/api.js
```

`Depends on` cannot override inherited `Forbids` or `Must not`.

### 4. Separate dependency from read context

If the subject needs to inspect another spec but does not depend on it at runtime, use `Can read` or `References`:

```sdd
Can read:
  ../destinations/destination-search.sdd
```

Use `Depends on` when the dependency or collaborator is part of the subject's contract.

### 5. Keep the list focused

Do not list every imported helper. List dependencies that affect architecture, review, testing, or future maintenance.

## Common mistakes

- Treating `Depends on` as permission to use forbidden dependencies.
- Listing every transitive import.
- Using `Depends on` when the relationship is only read context.
- Hiding dependency direction in prose instead of naming the collaborator.
- Leaving obsolete dependencies after implementation changes.

## How to verify the result

The `Depends on` section is useful when:

- important collaborators are visible
- dependency direction is reviewable
- no entry conflicts with `Forbids` or `Must not`
- entries are precise enough for the project
- the list stays current after implementation changes

## Related how-tos

- [How to use the Forbids section](/how-to/use-spec-sections/how-to-use-the-forbids-section/)
- [How to use the References section](/how-to/use-spec-sections/how-to-use-the-references-section/)
- [How to resolve conflicts between specs](/how-to/spec-driven-workflows/how-to-resolve-conflicts-between-specs/)

## Related reference

- [Language reference](/language-reference/)
