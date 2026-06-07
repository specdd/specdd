---
title: "How to start from a minimum viable spec"
seoDescription: "Start from a minimum viable SpecDD spec for spec-driven development with Spec and Purpose, then add ownership, behavior, boundaries, tasks, scenarios, and Done when only as needed."
excerpt: "Begin with the smallest useful SpecDD spec and grow it only when implementation, review, or agent behavior shows a real gap."
level: "Beginner"
howtoID: "1071003"
weight: 40
---

This guide shows you how to start from a minimum viable SpecDD spec for a spec-driven development workflow.

SpecDD does not require every section in every file. The best first spec is often small enough to review in one minute
and useful enough to guide the next change.

## Short answer

A minimal complete `.sdd` file can contain only `Spec`. A useful minimal spec usually also includes `Purpose`. For
implementation work, add ownership, key `Must` and `Must not` rules, a task, and `Done when` when those sections are
needed. Grow the spec only when a missing rule, boundary, or check causes ambiguity.

## Steps

### 1. Start with the smallest complete file

```sdd
Spec: Itinerary Filter
```

This is complete, but often too thin to guide implementation.

### 2. Add `Purpose`

```sdd
Spec: Itinerary Filter

Purpose:
  Filter visible itinerary items by trip day.
```

This is a useful minimum when you are naming the subject and preserving why it exists.

### 3. Add ownership when work will happen

```sdd
Owns:
  ./itinerary-filter.js
  ./itinerary-filter.test.js
```

Ownership gives reviewers and agents a local boundary.

### 4. Add behavior and boundaries

```sdd
Must:
  Show only itinerary items assigned to the selected trip day.

Must not:
  Change itinerary item ordering.
```

Use `Must not` only for plausible local mistakes.

### 5. Add task and completion criteria

```sdd
Tasks:
  [ ] Add empty-day filtering behavior.

Done when:
  Empty-day filtering is covered by a check.
```

Do this when there is actual work to perform.

## Full small example

```sdd
Spec: Itinerary Filter

Purpose:
  Filter visible itinerary items by trip day.

Owns:
  ./itinerary-filter.js
  ./itinerary-filter.test.js

Must:
  Show only itinerary items assigned to the selected trip day.

Must not:
  Change itinerary item ordering.

Tasks:
  [ ] Add empty-day filtering behavior.

Done when:
  Empty-day filtering is covered by a check.
```

## When to stop

Stop adding sections when the spec answers the current work:

- What is this subject?
- Why does it exist?
- What does it own?
- What behavior must hold?
- What must not happen?
- What work is open?
- How do reviewers know it is done?

If a section does not help answer a real question, omit it.

## Common mistakes

- Creating a large spec before the first task is clear.
- Adding every section from the language reference.
- Leaving a spec at `Spec` only when implementation needs authority.
- Adding broad `Must not` lists before observing real boundary risks.
- Writing tasks without `Done when` for ambiguous work.

## How to verify the result

The minimum viable spec is enough when:

- implementation can proceed without guessing scope
- reviewers can compare the diff to the spec
- tasks are local
- completion is checkable
- missing sections are truly unnecessary for this work

## Related how-tos

- [How to write good specs](/how-to/spec-writing-technique/how-to-write-good-specs/)
- [How to write the Spec section](/how-to/use-spec-sections/how-to-write-the-spec-section/)
- [How to write the Purpose section](/how-to/use-spec-sections/how-to-write-the-purpose-section/)

## Related reference

- [Language reference](/language-reference/)
