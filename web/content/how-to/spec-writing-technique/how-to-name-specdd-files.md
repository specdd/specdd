---
title: "How to name SpecDD files"
seoDescription: "Name SpecDD files for spec-driven development using root-spec naming, same-basename matching, optional suffixes, existing project conventions, and consistent case rules."
excerpt: "Name .sdd files so humans, agents, and tools can find the right local spec: root by content root, local by same basename, suffixes only when useful."
level: "Beginner"
howtoID: "1071004"
weight: 50
---

This guide shows you how to name spec-driven development `.sdd` files.

Good naming makes specs easy to find. It also helps tools and agents resolve the local spec without guessing from
similar names, symbols, tests, or imports.

## Short answer

Name the root spec after the selected content root directory. For local file behavior, prefer same-directory
same-basename specs such as `itinerary.js` and `itinerary.sdd`. Use suffixes such as `.component.sdd`, `.policy.sdd`,
or `.api.sdd` only when they clarify the subject. Follow existing project naming conventions and avoid ambiguous
case-only duplicates.

## Steps

### 1. Name the root spec after the content root

If the content root is:

```text
travel-planner/
```

the root spec is:

```text
travel-planner.sdd
```

Use the directory basename, not the product title or package identifier.

### 2. Use same-basename specs for files

```text
itinerary.js
itinerary.sdd
```

Same-directory basename matching is an explicit SpecDD rule. The `.sdd` file is the local spec for the ordinary file
when they share a basename in the same directory.

Examples:

```text
main.test.js -> main.test.sdd
Dockerfile -> Dockerfile.sdd
Trip.ts -> Trip.sdd
```

Matching is case-insensitive, but exact matches should win.

### 3. Use directory specs for directories

A directory can be described by a same-basename spec inside it:

```text
src/trips/trips.sdd
```

or by a parent-held spec:

```text
src/trips.sdd
```

Both may contribute context. They are cumulative, not ambiguity.

### 4. Use suffixes only when they clarify

Suffixes are optional:

```text
itinerary.component.sdd
trip-access.policy.sdd
create-trip.api.sdd
```

Omit the suffix when the folder or filename already makes the role clear:

```text
src/trips/itinerary.sdd
```

### 5. Follow project conventions

SpecDD naming examples are illustrations, not rules. A Python project may use lowercase names. A Java project may use
class-like names. Use the convention that makes specs align closely with the files and components they describe.

Put project-wide naming conventions in `.specdd/bootstrap.project.md`.

### 6. Connect named specs explicitly

Named specs do not automatically apply to every nearby file.

If a named feature or policy spec should be discoverable from a directory, reference it:

```sdd
Structure:
  ./trip-access.policy.sdd: Trip access decisions

References:
  ./trip-access.policy.sdd
```

References provide context, not write authority.

## Common mistakes

- Naming the root spec after the product title instead of the content-root directory.
- Adding suffixes everywhere even when the folder already explains the role.
- Assuming `.feature.sdd` names create authority by themselves.
- Creating case-only duplicates that tools must treat as ambiguous.
- Putting project naming conventions in local specs instead of `.specdd/bootstrap.project.md`.

## How to verify the result

Spec file names are working when:

- the root spec matches the content root basename
- file-level specs use same-basename matching
- directory specs are easy to resolve
- suffixes clarify rather than clutter
- named sibling specs are explicitly connected when needed

## Related how-tos

- [How to place .sdd files in a repository](/how-to/spec-writing-technique/how-to-place-sdd-files-in-a-repository/)
- [How to use paths in SpecDD sections](/how-to/use-spec-sections/how-to-use-paths-in-specdd-sections/)
- [How to use basic SpecDD levels](/how-to/getting-started/how-to-use-basic-specdd-levels/)

## Related reference

- [Language reference](/language-reference/)
