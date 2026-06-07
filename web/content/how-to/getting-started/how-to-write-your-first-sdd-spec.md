---
title: "How to write your first .sdd spec"
seoDescription: "Write your first SpecDD .sdd spec for spec-driven development by choosing a local target, defining purpose, ownership, requirements, boundaries, completion criteria, and one scenario."
excerpt: "Write a first SpecDD .sdd spec by choosing a local target and adding purpose, ownership, required behavior, boundaries, completion criteria, and one scenario."
level: "Beginner"
howtoID: "1001004"
weight: 50
---

Your first `.sdd` spec should be small, local, and useful. It does not need to describe the whole project. It only needs
to give a developer or agent enough intent to make one change without guessing the local rules.

This guide shows you how to write a first SpecDD spec for one file or module.

## Short answer

Create a `.sdd` file beside the code or project area you want to protect. Start with `Spec`, `Purpose`, `Owns`, a few
`Must` rules, one or two `Must not` boundaries, `Done when`, and a concrete `Scenario`. Add other sections only when
they clarify real implementation decisions.

{{< protip title="Spec design tip" >}}
Name the subject that will remain after the work, not the task that produced it. `Spec: Itinerary` is durable;
`Spec: Add validation` is not.
{{< /protip >}}

## Prerequisites

You only need:

- a project where SpecDD has been initialized
- a file, module, workflow, or documentation page you want to change
- enough understanding to describe the intended behavior

If SpecDD is not initialized yet, start with [How to use SpecDD in 10 minutes](/how-to/getting-started/how-to-use-specdd-in-10-minutes/).

## Steps

### 1. Pick one local target

Choose the nearest useful boundary. For a first spec, a single source file or small module is usually best.

Example:

```text
src/trips/itinerary.js
```

Create a same-basename spec beside it:

```text
src/trips/itinerary.sdd
```

Same-basename specs are easy for humans and tools to locate. If `itinerary.js` is the target, `itinerary.sdd` in the
same directory is the local spec for that file.

### 2. Add the required `Spec` section

Every complete `.sdd` file starts with `Spec:`. The name should describe the subject, not the current task.

```sdd
Spec: Itinerary
```

Do not write:

```sdd
Spec: Add validation task
```

The task will pass. The itinerary contract should remain.

### 3. State the purpose

Use `Purpose` to explain why this subject exists:

```sdd
Purpose:
  Keep a trip itinerary organized by day.
```

Keep it short. The purpose should orient a reader before they inspect detailed rules.

### 4. Define ownership

Use `Owns` for files, symbols, responsibilities, or concepts governed by this spec.

```sdd
Owns:
  ./itinerary.js
```

For implementation work, a SpecDD agent treats `Owns` as the modification boundary when `Can modify` is absent. If you
need separate read and write boundaries, add `Can modify` and `Can read` later.

### 5. Add required behavior with `Must`

Write observable outcomes, not implementation instructions:

```sdd
Must:
  Valid itinerary items are stored with a place name and trip date.
  Itinerary items appear grouped by trip day.
  A missing place name is rejected before an item is stored.
```

Avoid vague requirements:

```sdd
Must:
  Handle itinerary logic well.
```

The agent cannot reliably test or review "well".

### 6. Add local boundaries with `Must not`

Use `Must not` for plausible mistakes this subject might otherwise make:

```sdd
Must not:
  Manage destination search results.
  Purchase bookings or tickets.
```

Do not list every unrelated capability. A useful negative rule protects a nearby boundary, dependency direction,
security concern, or repeated source of confusion.

### 7. Add completion criteria

Use `Done when` to tell the developer or agent when to stop:

```sdd
Done when:
  Missing-place behavior is covered by a check.
  Existing itinerary ordering still passes.
```

This prevents both under-implementation and over-implementation.

### 8. Add one scenario

Scenarios make behavior concrete enough to test:

```sdd
Scenario: missing place name
  Given the place name is empty
  When the person adds the itinerary item
  Then validation fails
  And no itinerary item is stored
```

A scenario does not replace tests, but it gives tests a clear source.

## Complete first-spec example

```sdd
Spec: Itinerary

Purpose:
  Keep a trip itinerary organized by day.

Owns:
  ./itinerary.js

Must:
  Valid itinerary items are stored with a place name and trip date.
  Itinerary items appear grouped by trip day.
  A missing place name is rejected before an item is stored.

Must not:
  Manage destination search results.
  Purchase bookings or tickets.

Tasks:
  [ ] Add missing-place validation.

Done when:
  Missing-place behavior is covered by a check.
  Existing itinerary ordering still passes.

Scenario: missing place name
  Given the place name is empty
  When the person adds the itinerary item
  Then validation fails
  And no itinerary item is stored
```

## Syntax checklist

Before using the spec, check:

- the file starts with `Spec: Name`
- section labels use exact capitalization
- body entries are indented with two spaces
- `Spec`, `Platform`, and `Scenario` use inline values
- `Purpose`, `Owns`, `Must`, `Must not`, and `Done when` do not use inline text after the colon
- task markers use supported states such as `[ ]` and `[x]`
- explicit file paths start with `./`, `../`, or `/`

## Common mistakes

- Writing the spec as a ticket instead of a durable contract.
- Making the first spec too broad.
- Describing implementation steps instead of required outcomes.
- Forgetting what the subject must not own.
- Adding sibling context without using explicit `References`.

## How to verify the result

Your first `.sdd` spec is ready when:

- a reader can tell what the subject owns
- the required behavior is specific enough to test
- the local boundaries are clear
- the modification boundary is clear
- the spec is short enough to review in one pass

## Related how-tos

- [How to start with spec-driven development](/how-to/getting-started/how-to-start-with-spec-driven-development/)
- [How to run your first spec-driven change end to end](/how-to/getting-started/how-to-run-your-first-spec-driven-change-end-to-end/)
- [How to choose your first SpecDD use case](/how-to/getting-started/how-to-choose-your-first-specdd-use-case/)

## Related reference

- [Quickstart](/quickstart/)
- [Language reference](/language-reference/)
