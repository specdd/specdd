---
title: "How to fix a spec that conflicts with a parent spec"
seoDescription: "Fix a SpecDD child spec that conflicts with a parent spec by reading the inherited chain, applying stricter-wins logic, rewriting invalid tasks, and escalating unsafe changes."
excerpt: "Resolve parent-child SpecDD conflicts by preserving inherited constraints, treating Must not and Forbids as stronger than tasks, and fixing the owning rule."
level: "Intermediate"
howtoID: "1191008"
weight: 90
---

This guide shows you how to fix a spec that conflicts with a parent spec.

In SpecDD, parent specs provide inherited constraints and context. Child specs may add or narrow behavior, but they must
not silently loosen parent constraints or ignore inherited `Must not` and `Forbids` rules.

## Short answer

Read the effective spec chain from the content root to the target, identify the conflicting rules, prefer the stricter
rule, and treat `Must not` and `Forbids` as stronger than `Must`, `Depends on`, or `Tasks`. Rewrite the child rule or
task when it violates the parent. Change the parent only through explicit review.

## Steps

### 1. Read the inherited chain

For a target such as:

```text
src/trips/itinerary.js
```

the chain might be:

```text
travel-planner.sdd
src/trips/trips.sdd
src/trips/itinerary.sdd
```

Do not judge the child spec by itself.

### 2. Confirm the conflict

Example parent rule:

```sdd
Must not:
  Access browser storage directly.
```

Child task:

```sdd
Tasks:
  [ ] Save trips directly to browser storage from itinerary.js.
```

The task conflicts with the parent rule.

### 3. Apply stricter-wins logic

Use these rules:

- prefer the more restrictive rule
- allow local behavior only when it does not violate parent constraints
- treat `Must not` and `Forbids` as stronger than `Must`, `Depends on`, or `Tasks`
- do not use a task as permission to violate a rule
- if safe partial work is possible, do only that subset
- if no safe work is possible, mark the task `[?]` or `[!]`

### 4. Fix the child rule or task

Rewrite the task inside the allowed architecture:

```sdd
Depends on:
  TripStorage

Tasks:
  [ ] Save itinerary updates through TripStorage.
```

or mark it blocked:

```sdd
Tasks:
  [!] Save trips directly to browser storage from itinerary.js. Violates inherited storage boundary.
```

### 5. Update the parent only through review

If the parent rule is obsolete, do not override it in a child spec. Update the parent spec through the normal review
process because it changes inherited authority for all descendants.

### 6. Verify no constraint was weakened

After the fix, check:

- the child no longer contradicts the parent
- `Must not` and `Forbids` remain active
- tasks are local and actionable
- implementation plans stay inside write authority
- unresolved decisions are marked clearly

## Common causes

- Adding a task without reading parent constraints.
- Using `Depends on` to justify a forbidden dependency.
- Copying a parent rule into a child and later changing only one copy.
- Treating the newest spec as strongest.
- Allowing an agent to implement the child task before conflict review.

## How to verify the fix

The conflict is fixed when:

- the effective spec chain has no actionable contradiction
- invalid tasks are rewritten, blocked, or marked for decision
- parent constraints remain active unless explicitly changed
- the owning spec holds the corrected rule
- reviewers can explain which rule governs implementation

## Related how-tos

- [How to resolve conflicts between specs](/how-to/spec-driven-workflows/how-to-resolve-conflicts-between-specs/)
- [How to stop an agent when the spec is ambiguous](/how-to/agent-workflows/how-to-stop-an-agent-when-the-spec-is-ambiguous/)
- [How to debug spec resolution problems](/how-to/troubleshooting/how-to-debug-spec-resolution-problems/)
- [How to recover from spec-code drift](/how-to/spec-driven-workflows/how-to-recover-from-spec-code-drift/)

## Related reference

- [Language reference](/language-reference/)
