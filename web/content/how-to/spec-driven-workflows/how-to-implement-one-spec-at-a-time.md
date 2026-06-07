---
title: "How to implement one spec at a time"
seoDescription: "Implement one SpecDD spec at a time in a spec-driven development workflow by choosing a local contract, confirming writable scope, completing one task or behavior, verifying it, and avoiding multi-area drift."
excerpt: "Keep SpecDD implementation focused by selecting one local spec, staying inside its write authority, completing one task or behavior, and reviewing the result before moving on."
level: "Beginner"
howtoID: "1081002"
weight: 30
---

This guide shows you how to implement one SpecDD spec at a time in a spec-driven development workflow so work stays
local, reviewable, and easy to verify.

SpecDD works best when contributors implement one spec or a small related group of specs at a time. For most work, one
spec is the best default because the local contract already contains the behavior, boundaries, and finish line.

## Short answer

Choose one reviewed local spec, identify its inherited constraints and writable scope, complete one task or behavior
inside that scope, run checks, update task status only after verification, and review the diff before starting another
spec.

## When to use this guide

Use this guide when:

- a feature spans several files but one local behavior can be implemented first
- an agent tends to edit nearby areas opportunistically
- review comments often say the change is too broad
- tasks are spread across several specs
- you want reliable progress without a large multi-spec plan

## Principle

One spec at a time is a scope-control practice.

SpecDD specs inherit parent context, but the nearest relevant local spec provides the authority for the concrete work.
If you implement several local specs at once, it becomes harder to tell which spec authorized which file change, which
`Must` rule drove a behavior, and which `Done when` criteria prove completion.

Keeping the unit of work small makes implementation easier for humans, agents, and reviewers. It also makes rollback
and follow-up changes less risky because each change has a clear local reason.

## Steps

### 1. Pick the target spec

Start from the spec that best matches the behavior you want to change.

For example:

```text
src/trips/itinerary.sdd
src/trips/itinerary.js
src/trips/itinerary.test.js
```

The target is the Itinerary spec, not the whole trip-planning module. Parent module specs still matter as inherited
context, but they should not turn one local task into a broad module edit.

### 2. Confirm inherited context

For work on `src/trips/itinerary.js`, the effective context might be:

```text
travel-planner.sdd
src/trips/trips.sdd
src/trips/itinerary.sdd
```

The local spec inherits parent rules. A child spec may add or narrow behavior, but it must not silently loosen parent
constraints, ignore parent `Must not` rules, or use dependencies the parent forbids.

### 3. Identify write authority

Check the nearest local spec for:

```sdd
Can modify:
```

If `Can modify` is absent, use:

```sdd
Owns:
```

Example:

```sdd
Spec: Itinerary

Owns:
  ./itinerary.js
  ./itinerary.test.js

Can read:
  ../destinations/destination-search.sdd

Must not:
  Change destination search behavior.
```

This spec can read destination search context, but it does not grant authority to edit destination search files.

### 4. Choose one task or behavior

Use the smallest local work item that can be completed and checked.

```sdd
Tasks:
  [ ] Add missing-place validation.
  [ ] Keep itinerary items sorted after a date change.
  [ ] Show a save-failure message.
```

Start with one task:

```text
Implement the missing-place validation task.
```

One to three related specs can work for simple changes when boundaries are obvious, but prefer one spec when the work is
new, risky, unclear, or agent-assisted.

### 5. Implement the smallest change

The implementation should satisfy the selected task or behavior without sweeping in adjacent cleanup.

Good final scope:

```text
src/trips/itinerary.js
src/trips/itinerary.test.js
src/trips/itinerary.sdd
```

Suspicious final scope:

```text
src/trips/itinerary.js
src/trips/trip-storage.js
src/destinations/destination-search.js
src/booking/checkout.js
```

If the task truly requires another area, stop and make that dependency explicit. You may need a second spec, an explicit
reference, or a broader reviewed plan.

### 6. Verify before marking done

Run the checks that prove the selected task. Then update the task status:

```sdd
Tasks:
  [x] Add missing-place validation.
  [ ] Keep itinerary items sorted after a date change.
  [ ] Show a save-failure message.
```

Do not mark unrelated tasks complete. Tasks are local work guidance, not a place to record hopeful progress.

### 7. Move to the next spec deliberately

After the first spec is implemented and reviewed, choose the next spec or task.

Use a separate prompt:

```text
Plan the itinerary sorting task.
```

This creates a clean boundary between completed work and the next piece of work. It also gives reviewers a chance to
notice when the next task needs a different local contract.

## Example

A feature idea might eventually require itinerary behavior, trip storage, and destination search. Implement it as a
sequence:

```text
1. Itinerary: reject missing place names.
2. Itinerary: keep items sorted by trip date.
3. Trip storage: persist validation-safe itinerary updates.
4. Destination search: no change, referenced only for context.
```

Each step has a different local contract. Destination search may be relevant context, but it is not writable unless its
own spec authorizes a change.

## Best practices

- Prefer one local spec per implementation prompt.
- Use `Can modify` when writable scope should be narrower than ownership.
- Treat `Can read` and `References` as context, not edit permission.
- Keep task status changes in the spec that owns the completed work.
- Split a task when it cannot be completed inside the local boundary.
- Review each diff before starting the next local spec.

## Common mistakes

- Implementing a parent module spec as if it grants permission to edit every child file.
- Completing several unrelated tasks because the files were already open.
- Treating referenced sibling specs as writable authority.
- Marking a parent task done from a child implementation without explicit instruction.
- Continuing into the next spec before the current diff has been checked.

## How to verify the result

The one-spec workflow worked when:

- one local spec clearly authorized the change
- changed files stayed inside `Can modify` or `Owns`
- inherited `Must not` and `Forbids` rules were preserved
- exactly the selected task or behavior was completed
- checks prove that behavior
- unrelated tasks remain open

## Related how-tos

- [How to run the spec-first loop](/how-to/spec-driven-workflows/how-to-run-the-spec-first-loop/)
- [How to keep agents from changing the wrong files](/how-to/agent-workflows/how-to-keep-agents-from-changing-the-wrong-files/)
- [How to ask an agent to plan before coding](/how-to/agent-workflows/how-to-ask-an-agent-to-plan-before-coding/)
- [How to keep specs in sync with code changes](/how-to/spec-driven-workflows/how-to-keep-specs-in-sync-with-code-changes/)

## Related reference

- [Quickstart](/quickstart/)
- [Language reference](/language-reference/)
