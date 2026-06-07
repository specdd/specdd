---
title: "How to resolve conflicts between specs"
seoDescription: "Resolve SpecDD spec conflicts in a spec-driven development workflow by reading the effective chain, applying stricter constraints, preserving Must not and Forbids, and requesting decisions."
excerpt: "Handle conflicting SpecDD rules by finding the governing chain, preferring stricter constraints, treating tasks as non-authority, and fixing the owning spec."
level: "Intermediate"
howtoID: "1081007"
weight: 80
---

This guide shows you how to resolve conflicts between SpecDD specs in a spec-driven development workflow before they
turn into unsafe implementation.

A conflict usually means one part of the spec chain appears to allow work that another part forbids. In SpecDD, the safe
default is restrictive: preserve inherited constraints, respect `Must not` and `Forbids`, and do not use tasks as
permission to break architecture.

## Short answer

Read the effective spec chain for the target, confirm the conflict, then apply the stricter rule unless the operator
explicitly resolves the conflict. `Must not` and `Forbids` are stronger than `Must`, `Depends on`, or `Tasks`. If a safe
partial change is possible, do only that subset. If not, mark the work `[?]` or `[!]` and ask for a decision.

## When to use this guide

Use this guide when:

- a child spec appears to loosen a parent rule
- a task asks for behavior that `Must not` forbids
- `Depends on` names a dependency that `Forbids` blocks
- a referenced spec is being treated as writable authority
- two local specs seem to own the same file or behavior
- an agent plan includes files outside `Can modify` or `Owns`

## Principle

Conflicts should be resolved at the contract level, not hidden inside implementation.

If code proceeds while two specs disagree, the implementation quietly chooses a rule. That is hard to review and hard to
reverse. A spec conflict should be visible in the `.sdd` files, the task status, or the review notes before the code
changes.

## Steps

### 1. Identify the effective spec chain

Start from the target path or task. For:

```text
src/trips/itinerary.js
```

the chain might be:

```text
travel-planner.sdd
src/trips/trips.sdd
src/trips/itinerary.sdd
```

Sibling specs are not inherited automatically. Include outside context only when a governing spec explicitly references
it or allows it as read context.

### 2. Confirm the conflict is real

Some apparent conflicts are just different kinds of rules.

Not a conflict:

```sdd
Can read:
  ../destinations/destination-search.sdd

Must not:
  Change destination search behavior.
```

The spec can read destination search context while still forbidding destination search changes.

A real conflict:

```sdd
Must not:
  Access browser storage directly.

Tasks:
  [ ] Save trips directly to browser storage from itinerary.js.
```

The task asks for behavior the rule forbids.

### 3. Apply SpecDD conflict rules

Use these rules:

- prefer the more restrictive rule
- allow explicit local behavior only when it does not violate parent constraints
- treat `Must not` and `Forbids` as stronger than `Must`, `Depends on`, or `Tasks`
- treat inherited architecture as active unless explicitly and safely narrowed
- do not use a task as justification to violate a rule
- if a safe partial change is possible, do only the safe subset
- if the change cannot proceed safely, mark the task `[?]` or `[!]` and explain why

This keeps the repository from silently weakening constraints just because a task was written later.

### 4. Find the owning spec

Fix the conflict in the spec that owns the rule.

If the parent rule is still correct, fix or remove the child task:

```sdd
Tasks:
  [!] Save trips directly to browser storage from itinerary.js.
```

Then add a note in the task text if useful:

```sdd
Tasks:
  [!] Save trips directly to browser storage from itinerary.js. Violates inherited storage boundary.
```

If the parent rule is obsolete, update the parent through review. Do not silently override it in a child spec.

### 5. Fix the rule or the task

When the conflict is caused by an invalid task, rewrite the task inside the boundary:

```sdd
Must not:
  Access browser storage directly.

Depends on:
  TripStorage

Tasks:
  [ ] Save itinerary updates through TripStorage.
```

When the conflict is caused by missing context, add a safe reference:

```sdd
References:
  ../storage/trip-storage.sdd

Must not:
  Access browser storage directly from itinerary behavior.
```

The reference gives context. It does not grant permission to edit storage files.

### 6. Proceed only with safe work

If part of the request is safe, implement only that part.

For example, if a task asks for validation and direct storage access, and direct storage access is forbidden, you can
complete validation while marking the storage portion blocked or undecided.

Use:

```sdd
Tasks:
  [x] Add missing-place validation.
  [!] Save directly to browser storage from itinerary.js. Violates inherited storage boundary.
```

If no safe subset exists, stop at the spec update or decision request.

## Agent prompt

Use one prompt for a conflict review:

```text
Review the Itinerary storage conflict.
```

Use a separate prompt after the conflict is resolved:

```text
Implement the approved Itinerary storage plan.
```

## Common mistakes

- Treating the newest task as stronger than inherited architecture.
- Using `Depends on` to override a forbidden dependency.
- Fixing the conflict only in code while leaving contradictory specs behind.
- Adding a child `Must` rule that silently weakens a parent `Must not`.
- Editing a referenced sibling spec without local write authority.

## How to verify the result

The conflict is resolved when:

- the effective spec chain no longer contains contradictory actionable rules
- invalid tasks are rewritten, marked `[?]`, or marked `[!]`
- inherited `Must not` and `Forbids` remain active unless explicitly changed
- any implementation stayed inside `Can modify` or `Owns`
- reviewers can identify which spec owns the resolved rule

## Related how-tos

- [How to stop an agent when the spec is ambiguous](/how-to/agent-workflows/how-to-stop-an-agent-when-the-spec-is-ambiguous/)
- [How to review an agent plan against a spec](/how-to/agent-workflows/how-to-review-an-agent-plan-against-a-spec/)
- [How to reference another area's spec safely](/how-to/spec-driven-workflows/how-to-reference-another-areas-spec-safely/)
- [How to recover from spec-code drift](/how-to/spec-driven-workflows/how-to-recover-from-spec-code-drift/)

## Related reference

- [Language reference](/language-reference/)
