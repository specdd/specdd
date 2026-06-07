---
title: "How to write specs that prevent technical debt"
seoDescription: "Write SpecDD specs that prevent technical debt in a spec-driven development workflow by making boundaries, non-goals, dependencies, shortcuts, and completion criteria explicit."
excerpt: "Use SpecDD to prevent recurring debt patterns: vague ownership, convenience dependencies, duplicated rules, hidden shortcuts, and unfinished local tasks."
level: "Intermediate"
howtoID: "1101011"
weight: 120
---

This guide shows you how to write specs that prevent technical debt in a spec-driven development workflow.

Technical debt is not just old code or imperfect code. In day-to-day work, debt often appears as repeated shortcuts:
business rules copied into several layers, adapters making domain decisions, broad modules absorbing unrelated tasks,
temporary behavior becoming permanent, or public contracts changing by accident.

SpecDD cannot remove all design pressure. It can prevent many recurring debt patterns by making boundaries, ownership,
non-goals, dependencies, and completion criteria explicit before the shortcut becomes normal.

## Short answer

Identify the debt pattern you want to prevent, then write a local spec rule at the owner of that pattern. Use `Must` for
the intended behavior, `Must not` for plausible wrong work, `Forbids` for blocked dependencies or access, `Tasks` for
local cleanup, and `Done when` for evidence that the debt prevention rule is actually enforced.

## When to use this guide

Use this guide when:

- the same shortcut keeps reappearing
- a refactor revealed unclear ownership
- code review keeps finding the same boundary violation
- temporary behavior needs a visible follow-up
- duplicate logic is spreading
- public contracts or layer rules are changing accidentally

## The design idea

Debt prevention works best when the spec targets a concrete failure mode. "Keep this code clean" is not a useful rule.
"UI components must not save itinerary items directly" is useful because it blocks a specific shortcut.

Specs are especially good at preventing debt that comes from ambiguity. If no one knows where a rule belongs, the rule
will be copied. If no one knows which dependencies are allowed, the convenient import will win. If no one knows when a
task is done, work will either stop too soon or spread too far.

## Steps

### 1. Identify the debt pattern

Name the recurring problem:

- duplicated validation
- direct dependency on a forbidden layer
- broad "manager" module
- public API response leaking internal fields
- temporary migration code without removal criteria
- tests coupled to private implementation details

Avoid writing a generic anti-debt spec. Debt prevention belongs in the spec that owns the behavior or boundary.

### 2. Write the owning rule

If validation is being duplicated, put the rule in the validation owner:

```sdd
Spec: Itinerary Validation

Purpose:
  Decide whether an itinerary item can be saved.

Must:
  Reject itinerary items without a place name.
  Reject itinerary items outside the trip date range.
```

Then make other specs depend on or reference this behavior instead of copying it.

### 3. Add non-goals and forbidden shortcuts

Use `Must not` for plausible wrong work:

```sdd
Must not:
  Duplicate itinerary validation rules in UI components.
  Persist itinerary items after validation fails.
```

Use `Forbids` for hard dependency boundaries:

```sdd
Forbids:
  UI importing ../adapters/*
  direct browser storage access from itinerary validation
```

Debt prevention often comes from a short, precise `Must not`.

### 4. Keep tasks local

Good:

```sdd
Tasks:
  [ ] Move missing-place validation into Itinerary Validation.
  [ ] Remove duplicate missing-place validation from Itinerary Form.
```

Weak:

```sdd
Tasks:
  [ ] Clean up validation debt everywhere.
```

Local tasks are easier to complete and review. If cleanup crosses several owners, split it into local tasks in the
owning specs.

### 5. Record accepted tradeoffs visibly

Sometimes the team accepts a short-term compromise. Put the durable part in the spec:

```sdd
Tasks:
  [?] Confirm whether legacy blank-place imports should be rejected or normalized.
  [ ] Remove legacy blank-place normalization after import migration completes.

Must not:
  Apply legacy blank-place normalization to new itinerary items.
```

This keeps the compromise from silently expanding.

### 6. Define Done when evidence

Use `Done when` to make the prevention rule checkable:

```sdd
Done when:
  UI components use itinerary validation instead of local validation copies.
  Missing-place validation is covered in the validation spec's checks.
  No UI component imports trip storage adapters.
```

If the project has import-boundary checks, lint rules, contract tests, or code review checklists, reference the relevant
evidence in `Done when`.

## Common debt patterns and spec responses

### Duplicated business rule

```sdd
Must:
  Itinerary validation owns missing-place behavior.

Must not:
  Duplicate missing-place validation in UI components, API handlers, or jobs.
```

### Convenience dependency

```sdd
Forbids:
  domain importing ../adapters/*
```

### Temporary behavior without exit criteria

```sdd
Tasks:
  [ ] Remove legacy date parsing after all saved trips include explicit time zones.

Done when:
  Legacy date parsing is removed.
  Saved-trip fixtures all include explicit time zones.
```

### Public contract leakage

```sdd
Must not:
  Expose internal storage keys in public API responses.
```

## Common mistakes

- Writing a broad "avoid technical debt" rule with no concrete behavior.
- Putting cleanup tasks in a spec that does not own the files to clean up.
- Leaving accepted shortcuts out of specs because they are "temporary".
- Using `Must not` for every possible bad idea instead of plausible local mistakes.
- Adding a debt-prevention rule without `Done when` evidence.
- Letting stale specs become a new source of debt.

## How to verify the result

The spec is preventing debt when:

- it targets a real recurring failure mode
- the owning spec contains the durable rule
- shortcuts are blocked with `Must not` or `Forbids`
- cleanup tasks are local and reviewable
- accepted tradeoffs have visible limits
- `Done when` identifies checks or review evidence
- later changes can be rejected against the spec instead of taste or memory

## Related how-tos

- [How to maintain the Single Responsibility Principle with SpecDD](/how-to/software-design-practices/how-to-maintain-the-single-responsibility-principle-with-specdd/)
- [How to write Must not rules](/how-to/use-spec-sections/how-to-write-must-not-rules/)
- [How to use the Forbids section](/how-to/use-spec-sections/how-to-use-the-forbids-section/)
- [How to keep specs in sync with code changes](/how-to/spec-driven-workflows/how-to-keep-specs-in-sync-with-code-changes/)

## Related reference

- [Language reference](/language-reference/)
