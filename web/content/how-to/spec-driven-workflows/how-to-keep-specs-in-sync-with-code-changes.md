---
title: "How to keep specs in sync with code changes"
seoDescription: "Keep SpecDD specs in sync with code in a spec-driven development workflow by updating behavior, tasks, scenarios, and completion criteria in the same changeset as implementation changes."
excerpt: "Prevent stale SpecDD contracts by deciding when code changes affect the spec, updating the local .sdd file in the same changeset, and reviewing code, tests, and specs together."
level: "Intermediate"
howtoID: "1081003"
weight: 40
---

This guide shows you how to keep SpecDD specs in sync with code changes in a spec-driven development workflow so `.sdd`
files remain trustworthy local contracts instead of stale documentation.

SpecDD works because specs, code, tests, and tasks stay aligned. When code changes behavior but the spec does not
change, the next contributor or agent works from the wrong source of truth.

## Short answer

Whenever a code change alters behavior, ownership, dependencies, accepted inputs, outputs, errors, or completion
criteria, update the relevant `.sdd` spec in the same changeset. Keep durable behavior in `Must`, `Must not`, contract
sections, `Scenario`, and `Done when`. Update `Tasks` only when the work is actually complete and checked.

## When to use this guide

Use this guide when:

- implementation changes behavior already described by a spec
- tests were updated but the spec still describes old behavior
- an agent completed a task and needs to update task status
- a refactor changed ownership or writable scope
- review found code and `.sdd` files telling different stories

## Principle

A stale spec is worse than no spec. It looks authoritative, but it leads humans and agents toward behavior the code no
longer has or no longer should have.

The practical rule is simple: commit spec changes with the code they govern. Do not treat spec updates as a cleanup
task for later. Later usually means the reviewer has to reconstruct intent from the diff, tests, ticket, and memory.

## Steps

### 1. Decide whether the contract changed

Not every code edit requires a spec update. Formatting, harmless internal cleanup, or a pure rename inside an unchanged
boundary may not change the contract.

Update the spec when the change affects:

- required behavior
- non-goals or forbidden behavior
- ownership or writable paths
- dependencies
- public exports, endpoints, commands, events, or interfaces
- accepted inputs or returned outputs
- raised errors or handled cases
- scenarios, examples, or completion criteria
- task status

If the change is purely internal and the spec still describes the result accurately, leave the spec alone.

### 2. Update the nearest local spec

Put the update where the behavior is owned. For a file-level behavior, that is usually the same-directory same-basename
spec:

```text
src/trips/itinerary.js
src/trips/itinerary.sdd
```

For a directory or module rule, use the directory-level spec that owns the boundary. Avoid copying the same rule into
children just because several children are affected. Inherited rules should be written once in the spec that owns them.

### 3. Keep behavior sections durable

Use durable sections for durable behavior.

Before:

```sdd
Tasks:
  [ ] Validate itinerary input.
```

After the behavior is real, do not leave the durable rule hidden only as a completed task:

```sdd
Must:
  Reject itinerary items without a place name.
  Keep existing itinerary items unchanged when validation fails.

Tasks:
  [x] Validate itinerary input.
```

Tasks are useful work guidance, but the behavior belongs in `Must`, `Must not`, contract sections, `Scenario`, or `Done
when` when it should remain true after the task is complete.

### 4. Update tasks only after verification

Task status should match reality.

```sdd
Tasks:
  [x] Add missing-place validation.
```

Use `[x]` only after the relevant behavior is implemented and checked. Use `[!]` for blocked work and `[?]` for
decisions that still need review.

Do not mark neighboring tasks complete because the implementation touched nearby files. Tasks are local to the spec
where they appear.

### 5. Align tests or checks

The spec says what should be true. Tests and checks provide evidence.

When behavior changes, update or add practical checks for:

- the new required behavior
- the old behavior that must remain true
- negative constraints when they are important
- scenarios named in the spec
- public contracts that changed

For documentation or infrastructure projects, the check might be a build, linter, preview, dry run, or review checklist
rather than a unit test.

### 6. Review specs and code together

Before accepting the change, compare:

- the spec diff
- the implementation diff
- the test or check diff
- task status changes
- any referenced specs that were read for context

The code should not promise behavior the spec forbids. The spec should not promise behavior the code does not provide.
The tests should not prove a different behavior than the spec describes.

## Example

Before implementation:

```sdd
Spec: Itinerary

Purpose:
  Keep a trip itinerary organized by day.

Owns:
  ./itinerary.js
  ./itinerary.test.js

Tasks:
  [ ] Add missing-place validation.
```

After implementation and checks:

```sdd
Spec: Itinerary

Purpose:
  Keep a trip itinerary organized by day.

Owns:
  ./itinerary.js
  ./itinerary.test.js

Must:
  Reject itinerary items without a place name.
  Keep existing itinerary items unchanged when validation fails.

Tasks:
  [x] Add missing-place validation.

Done when:
  Missing-place validation is covered by a check.

Scenario: missing place name
  Given the place name is empty
  When the person adds the itinerary item
  Then validation fails
  And no itinerary item is stored
```

The completed task records the work. The `Must` and `Scenario` preserve the behavior.

## Agent prompt

Use a separate prompt when you want a spec-code alignment review:

```text
Review the Itinerary change for spec-code alignment.
```

Use a separate prompt when the spec needs to be updated after approved behavior changed:

```text
Update the Itinerary spec for the approved validation behavior.
```

## Common mistakes

- Updating task status but forgetting to add durable behavior to `Must` or `Scenario`.
- Changing tests to match code while leaving the spec unchanged.
- Copying a parent rule into every child spec instead of updating the parent once.
- Letting an agent mark `[x]` after code changes but before checks run.
- Treating a spec update as follow-up work after the pull request has already merged.

## How to verify the result

Specs and code are in sync when:

- changed behavior is described in the nearest owning spec
- completed tasks are marked only after checks
- tests or checks cover the relevant `Done when` and `Scenario` entries
- no code violates inherited `Must not` or `Forbids`
- the pull request contains spec and code changes together when both changed

## Related how-tos

- [How to run the spec-first loop](/how-to/spec-driven-workflows/how-to-run-the-spec-first-loop/)
- [How to recover from spec-code drift](/how-to/spec-driven-workflows/how-to-recover-from-spec-code-drift/)
- [How to change a spec safely after code already exists](/how-to/spec-driven-workflows/how-to-change-a-spec-safely-after-code-already-exists/)
- [How to ask an agent to update the spec after discovering missing context](/how-to/agent-workflows/how-to-ask-an-agent-to-update-the-spec-after-discovering-missing-context/)

## Related reference

- [Quickstart](/quickstart/)
- [Language reference](/language-reference/)
