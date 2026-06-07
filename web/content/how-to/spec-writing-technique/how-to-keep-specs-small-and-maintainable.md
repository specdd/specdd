---
title: "How to keep specs small and maintainable"
seoDescription: "Keep SpecDD specs small and maintainable in a spec-driven development workflow by preferring local specs, avoiding inventories, delegating child behavior, and adding detail only when it helps."
excerpt: "Prefer many small SpecDD specs over one large one; keep each local, concise, and useful for the next implementation or review."
level: "Beginner"
howtoID: "1071001"
weight: 20
---

This guide shows you how to keep SpecDD specs small and maintainable in a spec-driven development workflow.

Long specs are harder for humans to review and harder for agents to use reliably. SpecDD works best when context is
local and focused.

## Short answer

Prefer many small specs close to the code they govern over one large spec. Include only sections that add useful local
authority, constraints, behavior, tasks, or context. Put broad parent rules in parent specs, child behavior in child
specs, and project conventions in `.specdd/bootstrap.project.md`.

## When to use this guide

Use this guide when:

- a spec is becoming a long requirements document
- a root or module spec contains child-specific behavior
- agents slow down or overbuild from too much context
- reviewers cannot scan the spec
- several unrelated tasks are collected in one file

## Steps

### 1. Start with the smallest useful subject

Good:

```text
src/trips/itinerary.sdd
```

Risky:

```text
src/trips/all-trip-behavior.sdd
```

The smaller subject makes `Owns`, `Must`, `Must not`, `Tasks`, and `Done when` easier to write.

### 2. Use only useful sections

A minimal useful spec may be:

```sdd
Spec: Itinerary Filter

Purpose:
  Filter visible itinerary items by trip day.
```

Add sections when they solve a real gap:

- ownership is unclear
- write authority needs a boundary
- behavior needs tests
- non-goals prevent wrong work
- dependencies need review
- tasks need local tracking
- completion criteria are ambiguous

### 3. Leave out obvious detail

Do not list everything the subject obviously does not do. Use `Must not` only for plausible mistakes:

```sdd
Must not:
  Change destination search behavior.
```

Avoid:

```sdd
Must not:
  Manage payroll.
  Edit unrelated admin pages.
  Launch unrelated infrastructure.
```

### 4. Delegate child behavior

A module spec can say:

```sdd
Structure:
  ./itinerary.js: Itinerary behavior
```

The itinerary behavior itself belongs in:

```text
./itinerary.sdd
```

Do not use parent specs as catch-all detail stores.

### 5. Avoid repeated parent rules

If the root spec says:

```sdd
Must not:
  Purchase bookings or tickets.
```

do not copy that into every child spec. Let inheritance carry the rule.

### 6. Trim after review

Review should remove:

- vague goals
- duplicate parent rules
- stale tasks
- unrelated examples
- long prose background
- implementation details that are not contract
- broad writable paths added for convenience

## Common mistakes

- Measuring spec quality by length.
- Adding every section because the language supports it.
- Keeping old task notes after durable behavior moved to `Must`.
- Repeating inherited boundaries in every child.
- Listing entire folder inventories in `Structure`.
- Using one large spec because splitting feels like extra work.

## How to verify the result

Specs are maintainable when:

- each spec fits one local subject
- reviewers can scan it quickly
- child specs own child behavior
- parent specs carry shared constraints once
- tasks are current and local
- future changes know where to add detail

## Related how-tos

- [How to split a large spec](/how-to/spec-writing-technique/how-to-split-a-large-spec/)
- [How to avoid duplicating parent constraints in child specs](/how-to/spec-writing-technique/how-to-avoid-duplicating-parent-constraints-in-child-specs/)
- [How to use the Structure section](/how-to/use-spec-sections/how-to-use-the-structure-section/)
- [How to adopt SpecDD one folder at a time](/how-to/adopt-specdd-on-existing-projects/how-to-adopt-specdd-one-folder-at-a-time/)

## Related reference

- [Quickstart](/quickstart/)
- [Language reference](/language-reference/)
