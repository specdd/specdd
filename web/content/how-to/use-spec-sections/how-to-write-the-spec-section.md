---
title: "How to write the Spec section"
seoDescription: "Write the Spec section in a SpecDD .sdd file by naming the subject, placing it first, using an inline value, and keeping body text out of the section."
excerpt: "Use the Spec section as the required first line of a complete .sdd file: name the local subject clearly and put behavior in later sections."
level: "Beginner"
howtoID: "1061000"
weight: 10
---

This guide shows you how to write the `Spec` section in a SpecDD `.sdd` file.

`Spec` names the thing being specified. It is the required first section in a complete `.sdd` file, and it gives humans
and agents a quick subject label before they read the rest of the contract.

## Short answer

Start every complete `.sdd` file with `Spec: Name`. Use a clear human-readable subject name, put it at the top of the
file, and do not put body lines under it. The `Spec` line names the subject; later sections describe purpose, ownership,
behavior, boundaries, tasks, and examples.

## Syntax

Valid:

```sdd
Spec: Itinerary
```

Invalid:

```sdd
Spec:
  Itinerary
```

```sdd
Spec:Itinerary
```

```sdd
Spec : Itinerary
```

Rules:

- `Spec` must be the first section in a complete `.sdd` file.
- `Spec` must have a nonempty inline value.
- `Spec` must not have body lines.
- The colon must immediately follow `Spec`.
- A space must separate the colon from the inline value.
- Section labels are case-sensitive.

Only blank lines and whole-line comments may appear before `Spec`.

## Steps

### 1. Name the local subject

Use a name that describes the subject the file governs:

```sdd
Spec: Itinerary
```

Good subject names are:

- local
- recognizable to reviewers
- stable after the current task ends
- aligned with the file, folder, service, workflow, component, or contract being specified

Avoid names that describe a ticket or temporary task:

```sdd
Spec: Fix validation bug
```

Better:

```sdd
Spec: Itinerary
```

Put the work item in `Tasks`.

### 2. Match the file's scope

For a same-basename spec, the `Spec` name should match the source file's subject:

```text
itinerary.js
itinerary.sdd
```

```sdd
Spec: Itinerary
```

For a directory spec, name the directory's local concept:

```sdd
Spec: Trips
```

For a root spec, name the project or content root concept:

```sdd
Spec: Travel Planner
```

The `Spec` title does not create write authority by itself. Use `Owns` or `Can modify` for that.

### 3. Keep behavior out of `Spec`

Do not cram behavior into the title:

```sdd
Spec: Itinerary validation that rejects empty names and saves through storage
```

Better:

```sdd
Spec: Itinerary

Purpose:
  Keep trip itinerary items organized by day.

Must:
  Reject itinerary items without a place name.
```

The title should identify the subject. The contract belongs in later sections.

## Common mistakes

- Putting `Purpose` text under `Spec`.
- Writing `Spec:Name` without a space after the colon.
- Starting a complete file with `Purpose` or another section.
- Naming a temporary task instead of the durable subject.
- Assuming the `Spec` name grants permission to edit similarly named files.

## How to verify the result

The `Spec` section is correct when:

- it is the first section
- it has a concise inline value
- it has no body lines
- the subject matches the file or local area
- later sections carry the actual contract

## Related how-tos

- [How to write the Purpose section](/how-to/use-spec-sections/how-to-write-the-purpose-section/)
- [How to use the Owns section](/how-to/use-spec-sections/how-to-use-the-owns-section/)
- [How to write your first .sdd spec](/how-to/getting-started/how-to-write-your-first-sdd-spec/)

## Related reference

- [Language reference](/language-reference/)
