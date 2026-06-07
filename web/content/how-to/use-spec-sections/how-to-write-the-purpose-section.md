---
title: "How to write the Purpose section"
seoDescription: "Write the Purpose section in SpecDD as a short implementation-neutral statement of why the specified subject exists."
excerpt: "Use Purpose to explain why a subject exists in one or two stable lines, then put behavior, ownership, and tasks in their own sections."
level: "Beginner"
howtoID: "1061002"
weight: 30
---

This guide shows you how to write the `Purpose` section in a SpecDD `.sdd` file.

`Purpose` gives the reader the reason the subject exists. It should be short, stable, and implementation-neutral.

## Short answer

Write `Purpose` as one or two body lines that explain the subject's role. Do not put inline text after `Purpose:`.
Avoid tasks, implementation details, and broad product essays. Use later sections for ownership, requirements,
boundaries, and work items.

## Syntax

Valid:

```sdd
Purpose:
  Keep a trip itinerary organized by day.
```

Invalid:

```sdd
Purpose: Keep a trip itinerary organized by day.
```

Rules:

- `Purpose` is optional but useful in most specs.
- It is a body-capable section.
- It must not have inline text after the colon.
- Body entries use two spaces.

## Steps

### 1. State the durable reason

Good:

```sdd
Purpose:
  Keep a trip itinerary organized by day.
```

This tells reviewers what the subject is for without describing every behavior.

### 2. Keep implementation out

Too implementation-heavy:

```sdd
Purpose:
  Use a reducer, a storage adapter, and an event emitter to manage itinerary state.
```

Better:

```sdd
Purpose:
  Keep itinerary state consistent while people add, move, and remove places.
```

Use `Depends on`, `Handles`, or other sections for implementation contracts when those details matter.

### 3. Keep tasks out

Do not write:

```sdd
Purpose:
  Add validation for missing place names.
```

That is work, not purpose.

Use:

```sdd
Purpose:
  Keep trip itinerary items valid and organized.

Tasks:
  [ ] Add validation for missing place names.
```

### 4. Make it specific enough to guide boundaries

Too vague:

```sdd
Purpose:
  Manage trips.
```

Better:

```sdd
Purpose:
  Let people arrange places into a day-by-day trip itinerary.
```

The better version helps reviewers recognize when booking, destination search, or account settings are outside this
subject.

## Common mistakes

- Writing a marketing description instead of an implementation purpose.
- Putting `Purpose` on one inline line after the colon.
- Describing the current task instead of the durable subject.
- Listing implementation mechanisms that belong in contract or dependency sections.
- Making the purpose so broad that every nearby change seems in scope.

## How to verify the result

The `Purpose` section is strong when:

- it explains why the subject exists
- it stays short
- it is still true after the current task ends
- it helps identify out-of-scope work
- detailed behavior appears in `Must`, `Must not`, `Scenario`, or contract sections

## Related how-tos

- [How to write Must rules](/how-to/use-spec-sections/how-to-write-must-rules/)
- [How to write Must not rules](/how-to/use-spec-sections/how-to-write-must-not-rules/)
- [How to write Tasks](/how-to/use-spec-sections/how-to-write-tasks/)

## Related reference

- [Language reference](/language-reference/)
