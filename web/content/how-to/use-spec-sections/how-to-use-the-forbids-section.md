---
title: "How to use the Forbids section"
seoDescription: "Use the Forbids section in SpecDD to block dependencies, paths, modules, libraries, tools, or access patterns."
excerpt: "Use Forbids for hard dependency and access boundaries, and remember that Depends on, Must, and Tasks do not override it."
level: "Intermediate"
howtoID: "1061010"
weight: 110
---

This guide shows you how to use the `Forbids` section in a SpecDD `.sdd` file.

`Forbids` lists forbidden dependencies, paths, modules, libraries, tools, or architectural access. Use it when a
boundary should block implementation choices, not just describe behavior.

## Short answer

Use `Forbids` for blocked dependencies, paths, modules, libraries, tools, or access patterns. Use `Must not` for
forbidden behavior and non-goals. `Depends on`, `Must`, and `Tasks` do not override inherited `Forbids`.

## Syntax

```sdd
Forbids:
  ../booking/*
  ../destinations/editor/*
  Direct booking API access from itinerary behavior.
```

Rules:

- `Forbids` is a mixed-entry body section.
- It may contain paths, globs, dependency names, or prose.
- It must not have inline text after `Forbids:`.
- Body entries use two spaces.

## Steps

### 1. Block concrete dependencies or access

Good:

```sdd
Forbids:
  ../booking/*
  Direct browser storage writes from itinerary behavior.
```

These rules tell contributors what implementation paths are off limits.

### 2. Use explicit paths for file boundaries

Good:

```sdd
Forbids:
  ../booking/*
```

Weak:

```sdd
Forbids:
  booking
```

The weak version may be useful as prose, but it is not an explicit path reference.

### 3. Keep behavior boundaries in `Must not`

Use `Must not` for behavior:

```sdd
Must not:
  Change destination search ranking.
```

Use `Forbids` for dependency or path access:

```sdd
Forbids:
  ../destinations/ranking/*
```

Often both are useful.

### 4. Check `Depends on` conflicts

This is invalid as a contract:

```sdd
Forbids:
  ../booking/*

Depends on:
  ../booking/api.js
```

`Depends on` does not override `Forbids`. Resolve the conflict before implementation.

### 5. Review removals and weakenings carefully

Removing a `Forbids` entry changes future implementation authority. Treat it as a boundary change, especially when it
affects security, data, runtime access, dependency direction, or public behavior.

## Common mistakes

- Using `Forbids` for broad non-goals that belong in `Must not`.
- Adding `Depends on` entries that conflict with inherited `Forbids`.
- Removing a forbidden dependency because a current patch wants to use it.
- Writing vague forbidden entries that reviewers cannot enforce.
- Forgetting that `Forbids` can contain prose as well as explicit paths.

## How to verify the result

The `Forbids` section is effective when:

- forbidden dependencies or paths are specific
- behavior boundaries remain in `Must not`
- allowed dependencies do not conflict with it
- high-risk changes to the section receive review
- implementation and checks show the boundary was respected

## Related how-tos

- [How to write Must not rules](/how-to/use-spec-sections/how-to-write-must-not-rules/)
- [How to use the Depends on section](/how-to/use-spec-sections/how-to-use-the-depends-on-section/)
- [How to review changes to Must not and Forbids](/how-to/code-review-and-governance/how-to-review-changes-to-must-not-and-forbids/)

## Related reference

- [Language reference](/language-reference/)
