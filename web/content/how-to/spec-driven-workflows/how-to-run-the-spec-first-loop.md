---
title: "How to run the spec-first loop"
seoDescription: "Run the SpecDD spec-first loop for spec-driven development by writing or updating the local spec, reviewing it, implementing a bounded task, checking the result, and keeping code and specs aligned."
excerpt: "Use the SpecDD spec-first loop to turn intent into a reviewed local contract, implement one bounded change, verify it, and update tasks only after the result matches the spec."
level: "Beginner"
howtoID: "1081000"
weight: 10
---

This guide shows you how to run the SpecDD spec-first loop for one real spec-driven development change: write or update
the relevant `.sdd` spec, review it as the source of truth, implement against it, verify the result, and keep the spec
aligned with the code.

SpecDD is an amazing way to do this because the loop does not depend on one long prompt or one person's memory. The
contract lives beside the files it governs, so humans and agents can keep returning to the same local source of truth.

## Short answer

Write or update the relevant `.sdd` spec before implementation. Review the spec until it states the intended behavior,
write authority, boundaries, tasks, and completion criteria. Then implement one task or behavior, run the relevant
checks, mark task status only after verification, and review the final diff against the spec.

## When to use this guide

Use this guide when:

- a feature or bug fix needs durable requirements
- an agent or teammate needs local context before editing
- a change could touch the wrong files without explicit boundaries
- you want the pull request to show both intent and implementation
- you are adopting SpecDD and want a repeatable first workflow

## What you will change

By the end of the loop, you will have:

- a local `.sdd` spec that describes the intended behavior
- a small implementation task or behavior slice
- clear write authority through `Can modify` or `Owns`
- `Done when` criteria that define completion
- code, tests, and task status aligned with the reviewed spec

## Steps

### 1. Choose one bounded change

Start with a change that has a clear subject and a clear stopping point.

Good:

```text
Reject itinerary items when the place name is missing.
```

Too broad:

```text
Improve itinerary management.
```

The bounded version can be specified, implemented, checked, and reviewed without pulling unrelated behavior into the
same change.

### 2. Find or create the governing spec

SpecDD resolution is path-based. Parent specs are inherited automatically, same-directory same-basename specs can govern
matching files, and sibling specs apply only when they are explicitly referenced.

For this target:

```text
src/trips/itinerary.js
```

a local same-basename spec would be:

```text
src/trips/itinerary.sdd
```

If a useful local spec already exists, update it before implementation when behavior changes. If no local spec exists,
create the smallest useful spec beside the code or area you are changing.

### 3. Write the intended behavior first

Describe the resulting contract, not the prompt or ticket that created the work.

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
  Change destination search behavior.
  Manage booking or ticket purchase behavior.

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

The `Must` rules describe durable behavior. The task names the current work packet. `Done when` tells humans and agents
when to stop.

### 4. Review the spec before implementation

Before code changes, check the spec as if it were part of the design review:

- Does `Purpose` name the subject clearly?
- Do `Owns` or `Can modify` allow only the files needed for the work?
- Do `Must` rules describe observable behavior?
- Do `Must not` rules prevent plausible boundary mistakes?
- Does `Done when` define a verifiable finish line?
- Are any assumptions marked instead of silently decided?

If a rule is unclear, fix the spec first. Implementation should be driven by reviewed specs, not by vague prompts alone.

### 5. Implement one task or behavior

Ask for one implementation action at a time.

```text
Implement the missing-place validation task.
```

For a non-trivial change, split planning and implementation into separate prompts:

```text
Plan the missing-place validation change.
```

Then, after reviewing the plan:

```text
Implement the approved missing-place validation plan.
```

The implementation should stay inside the nearest local write authority. If `Can modify` is present, use it as the
writable boundary. If it is absent, `Owns` acts as the modification boundary.

### 6. Run checks

Run the checks that prove the behavior and protect nearby behavior. Depending on the project, that might include:

- unit tests for the changed behavior
- existing tests for the governed area
- type checks
- linting or formatting checks
- documentation checks when docs changed

If a check cannot run, record why. Do not mark a task complete merely because code was written.

### 7. Update tasks and specs

After implementation and checks are complete, update only the relevant task status:

```sdd
Tasks:
  [x] Add missing-place validation.
```

If implementation revealed missing behavior, update the spec in the same changeset as the code. If the discovery is
uncertain, do not turn it into a permanent contract without review.

### 8. Review the final diff

Review the finished change against the spec:

- every changed file is inside `Can modify` or `Owns`
- every relevant `Must` rule is satisfied
- no `Must not` or `Forbids` rule was violated
- the scenario is covered by a practical check
- task status matches the verified result
- the spec still describes the code after the change

The review is the last part of the loop. It turns the spec from "what we hoped to do" into "what the repository now
claims is true."

## SpecDD pattern

This workflow uses:

- `Purpose` to name the subject
- `Owns` or `Can modify` to define write authority
- `Must` to state required behavior
- `Must not` and `Forbids` to prevent wrong work
- `Tasks` to track local implementation work
- `Done when` and `Scenario` to define completion and verification

## Common mistakes

- Starting implementation before the spec says what the finished behavior should be.
- Treating a task as permission to violate `Must not`, `Forbids`, or inherited rules.
- Marking `[x]` before checks prove the result.
- Letting a referenced spec become writable authority.
- Expanding a small spec-first change into a broad refactor.

## How to verify the result

The spec-first loop worked when:

- the intended behavior was specified before implementation
- implementation stayed inside local write authority
- relevant checks ran or a clear reason was recorded
- task status reflects verified reality
- code, tests, and specs describe the same behavior
- review can compare the diff directly against the local contract

## Related how-tos

- [How to write your first .sdd spec](/how-to/getting-started/how-to-write-your-first-sdd-spec/)
- [How to run your first spec-driven change end to end](/how-to/getting-started/how-to-run-your-first-spec-driven-change-end-to-end/)
- [How to implement one spec at a time](/how-to/spec-driven-workflows/how-to-implement-one-spec-at-a-time/)
- [How to keep specs in sync with code changes](/how-to/spec-driven-workflows/how-to-keep-specs-in-sync-with-code-changes/)

## Related reference

- [Quickstart](/quickstart/)
- [Language reference](/language-reference/)
