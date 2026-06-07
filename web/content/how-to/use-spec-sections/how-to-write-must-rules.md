---
title: "How to write Must rules"
seoDescription: "Write SpecDD Must rules as specific, outcome-focused requirements that describe required behavior without vague goals or implementation clutter."
excerpt: "Use Must for required behavior and responsibilities: make each rule local, observable, durable, and reviewable."
level: "Beginner"
howtoID: "1061008"
weight: 90
---

This guide shows you how to write `Must` rules in a SpecDD `.sdd` file.

`Must` lists positive requirements: responsibilities, invariants, and behavior that must hold for the specified subject.

## Short answer

Use `Must` for required local behavior. Write each rule as a specific outcome that humans can review and tests or checks
can often verify. Avoid vague goals, implementation instructions, future tasks, and rules that belong to another spec.

## Syntax

```sdd
Must:
  Reject itinerary items without a place name.
  Keep existing itinerary items unchanged when validation fails.
```

Rules:

- `Must` is a mixed-entry body section.
- It must not have inline text after `Must:`.
- Body entries use two spaces.
- Entries are free-form requirements unless project rules narrow them.

## Steps

### 1. Write outcomes, not hopes

Weak:

```sdd
Must:
  Improve itinerary validation.
```

Better:

```sdd
Must:
  Reject itinerary items without a place name.
```

The better rule is reviewable and can become a test.

### 2. Keep rules local

For an itinerary spec:

```sdd
Must:
  Keep itinerary items assigned to a trip day.
```

Do not add unrelated behavior:

```sdd
Must:
  Rank destinations by popularity.
```

That belongs in a destination search spec.

### 3. Make rules durable

Do not write a temporary work item as a `Must`:

```sdd
Must:
  Refactor validation this sprint.
```

Use `Tasks`:

```sdd
Tasks:
  [ ] Refactor validation without changing itinerary behavior.
```

Use `Must` for the behavior that should remain true after the task is done.

### 4. Avoid implementation clutter

Too implementation-heavy:

```sdd
Must:
  Use an array map followed by a reducer to validate itinerary items.
```

Better:

```sdd
Must:
  Validate all itinerary items before saving.
```

If a collaborator, dependency, or public contract matters, use `Depends on`, `Accepts`, `Returns`, or `Exposes`.

### 5. Pair important rules with evidence

For important behavior, add a `Done when` or `Scenario`:

```sdd
Done when:
  Missing-place validation is covered by a check.

Scenario: missing place name
  Given the place name is empty
  When the person adds the itinerary item
  Then validation fails
```

`Must` states the rule. Checks and scenarios make it easier to verify.

## Common mistakes

- Writing vague goals such as "make it robust."
- Putting tasks in `Must`.
- Describing implementation mechanics instead of required behavior.
- Adding rules owned by a sibling spec.
- Duplicating parent `Must` rules in every child spec.

## How to verify the result

Your `Must` rules are useful when:

- each rule is required behavior
- the rule belongs to the local subject
- reviewers can tell whether it is satisfied
- important rules have checks, scenarios, or done criteria
- temporary work remains in `Tasks`

## Related how-tos

- [How to write Must not rules](/how-to/use-spec-sections/how-to-write-must-not-rules/)
- [How to write Done when](/how-to/use-spec-sections/how-to-write-done-when/)
- [How to write Scenario blocks](/how-to/use-spec-sections/how-to-write-scenario-blocks/)

## Related reference

- [Language reference](/language-reference/)
