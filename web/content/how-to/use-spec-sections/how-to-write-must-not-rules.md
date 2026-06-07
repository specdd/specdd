---
title: "How to write Must not rules"
seoDescription: "Write SpecDD Must not rules for plausible local boundaries, non-goals, and forbidden behavior without creating unrelated negative lists."
excerpt: "Use Must not to protect local boundaries and non-goals that contributors or agents might plausibly cross."
level: "Beginner"
howtoID: "1061009"
weight: 100
---

This guide shows you how to write `Must not` rules in a SpecDD `.sdd` file.

`Must not` lists forbidden behavior, non-goals, and architectural boundaries. It is one of the best ways SpecDD keeps
humans and agents from doing plausible but wrong work.

## Short answer

Use `Must not` for local behavior boundaries and non-goals that someone might reasonably cross. Keep each rule specific
and relevant. Do not list every unrelated thing the subject does not do, and do not restate a `Must` rule in reverse.

## Syntax

```sdd
Must not:
  Change destination search behavior.
  Mix booking purchase behavior into the itinerary.
```

Rules:

- `Must not` is a mixed-entry body section.
- It must not have inline text after `Must not:`.
- Body entries use two spaces.

## Steps

### 1. Write rules for plausible mistakes

Good:

```sdd
Must not:
  Change destination search behavior.
```

This is useful if itinerary work often touches destination search by accident.

Weak:

```sdd
Must not:
  Manage payroll.
  Launch satellites.
  Edit the accounting system.
```

Unrelated non-goals add noise.

### 2. Use behavior language

`Must not` is for forbidden behavior and boundaries:

```sdd
Must not:
  Delete itinerary items when trip dates change.
```

For blocked dependencies, paths, modules, libraries, tools, or access, use `Forbids`:

```sdd
Forbids:
  ../booking/*
```

### 3. Do not duplicate a `Must` in reverse

Avoid:

```sdd
Must:
  Keep itinerary items assigned to a trip day.

Must not:
  Leave itinerary items without a trip day.
```

The second rule usually adds no new information. Use `Must not` when it prevents a distinct boundary mistake.

### 4. Respect inherited rules

Child specs must not silently loosen parent `Must not` rules. If a parent forbids booking behavior, a child itinerary
spec cannot permit booking behavior just by omitting the rule or adding a conflicting task.

When specs conflict, the stricter rule wins unless the conflict is explicitly resolved through review.

### 5. Add checks for high-risk negative rules

Some negative rules deserve verification:

```sdd
Done when:
  Destination search behavior is unchanged.
  No booking files are modified.
```

Tests, lint rules, import checks, review checklists, or targeted diffs can provide evidence.

## Common mistakes

- Listing every unrelated non-goal.
- Using `Must not` for dependency paths that belong in `Forbids`.
- Adding a task that violates a `Must not` rule.
- Weakening a parent `Must not` in a child spec.
- Restating a `Must` rule in reverse without adding a real boundary.

## How to verify the result

Your `Must not` rules are useful when:

- each rule blocks a plausible local mistake
- the rule describes behavior or a non-goal
- the list is short enough to review
- inherited boundaries are preserved
- high-risk rules have appropriate checks

## Related how-tos

- [How to use the Forbids section](/how-to/use-spec-sections/how-to-use-the-forbids-section/)
- [How to review changes to Must not and Forbids](/how-to/code-review-and-governance/how-to-review-changes-to-must-not-and-forbids/)
- [How to resolve conflicts between specs](/how-to/spec-driven-workflows/how-to-resolve-conflicts-between-specs/)

## Related reference

- [Language reference](/language-reference/)
