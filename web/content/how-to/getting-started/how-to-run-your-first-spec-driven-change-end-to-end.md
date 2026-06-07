---
title: "How to run your first spec-driven change end to end"
seoDescription: "Run your first spec-driven development change end to end by defining behavior, adding completion criteria, prompting the task, implementing, testing, and reviewing against the spec."
excerpt: "Run a complete spec-driven change by defining behavior, adding a task and scenario, implementing a small slice, checking it, and reviewing against the spec."
level: "Beginner"
howtoID: "1001005"
weight: 60
---

An end-to-end spec-driven development change starts with intent and ends with review. The important part is the loop:
define the behavior, make the implementation follow the spec, verify the result, and keep the spec aligned with the
code.

This guide shows a minimal SpecDD workflow for one small change.

## Short answer

Pick a small target, write or update the local `.sdd` spec, add a concrete `Done when` and `Scenario`, prompt the
specific work, implement the smallest change, run checks, update task status only after verification, and review the
diff against the spec.

{{< protip title="Review tip" >}}
Do not mark a SpecDD task done when code is written. Mark it done only when the behavior is implemented, checked, and
still matches the spec.
{{< /protip >}}

## What you will change

By the end, you will have:

- one local `.sdd` spec
- one bounded implementation task
- one behavior scenario
- code or docs changed inside the spec boundary
- a verification step that proves the work is complete

## Steps

### 1. Choose a small behavior

Start with behavior that fits in one local boundary.

Example:

```text
Reject itinerary items when the place name is missing.
```

This is better than:

```text
Improve itinerary management.
```

The first request has a testable outcome. The second invites broad implementation.

### 2. Find or create the local spec

If the target file is:

```text
src/trips/itinerary.js
```

use:

```text
src/trips/itinerary.sdd
```

If a spec already exists, update it before implementation when intended behavior changes. If no spec exists, create the
smallest useful one.

### 3. Define the behavior and task

Add the behavior as a requirement and the work as a task:

```sdd
Spec: Itinerary

Purpose:
  Keep a trip itinerary organized by day.

Owns:
  ./itinerary.js
  ./itinerary.test.js

Must:
  A missing place name is rejected before an itinerary item is stored.
  Existing itinerary items remain unchanged when validation fails.

Must not:
  Manage destination search results.

Tasks:
  [ ] Add missing-place validation.

Done when:
  Missing-place behavior is covered by a check.
  Existing itinerary behavior still passes.

Scenario: missing place name
  Given the place name is empty
  When the person adds the itinerary item
  Then validation fails
  And no itinerary item is stored
```

The `Must` rules define durable behavior. The task is just the current work packet.

### 4. Ask for the specific work

Use a task-focused prompt:

```text
Implement the open validation task in the Itinerary spec.
```

Do not repeat the SpecDD bootstrap instructions in the prompt. The task prompt should identify the work; the project
instructions and specs provide the workflow and boundaries. Keep each prompt to one instruction.

### 5. Implement the bounded slice

For a very small change, the implementation prompt may be the same as the task prompt:

```text
Implement missing-place validation in the Itinerary feature.
```

Keep the change as small as possible. A first spec-driven change should prove the loop, not solve every nearby problem.

### 6. Run checks

Run the relevant tests, validation, linting, or documentation checks for the project. If an agent ran the checks, review
what it reports.

Good final reports include:

- specs used
- files changed
- checks run
- task status changes
- uncertainty or skipped checks

If a check cannot run, record why. Do not mark a task complete simply because code was written.

### 7. Update task status

Only after implementation and checks are complete, update:

```sdd
Tasks:
  [x] Add missing-place validation.
```

Do not mark unrelated tasks complete. Tasks are local work guidance, not a place for opportunistic cleanup.

### 8. Review the diff against the spec

Before merging or accepting the result, check:

- every changed file is within `Owns` or `Can modify`
- every relevant `Must` rule is satisfied
- no `Must not` or `Forbids` rule was violated
- scenarios are covered by checks where practical
- the implementation did not add broader behavior than requested
- the spec still describes the code after the change

## Common mistakes

- Starting implementation before the spec says what done means.
- Treating `Tasks` as permission to violate `Must not`.
- Letting a referenced spec grant write authority.
- Marking `[x]` before checks pass.
- Expanding the first change into a broad refactor.

## How to verify the result

The end-to-end loop worked when:

- behavior was specified before implementation
- the prompt named the actual work instead of restating project instructions
- each prompt contained one instruction
- code changed inside local authority
- checks prove the requested behavior
- task status matches reality
- review can compare the result directly to the spec

## Related how-tos

- [How to write your first .sdd spec](/how-to/getting-started/how-to-write-your-first-sdd-spec/)
- [How to use spec-driven development with humans and agents](/how-to/getting-started/how-to-use-spec-driven-development-with-humans-and-agents/)
- [How to know when you do not need a spec](/how-to/getting-started/how-to-know-when-you-do-not-need-a-spec/)

## Related reference

- [Quickstart](/quickstart/)
- [Tools](/tools/)
- [Language reference](/language-reference/)
