---
title: "How to implement under spec authority (specdd-do)"
seoDescription: "Implement under active SpecDD authority in a spec-driven development workflow with specdd-do by resolving the governing specs, confirming write scope, making the smallest change, checking it, and reporting results."
excerpt: "Use specdd-do for implementation work after specs grant authority: change only allowed files, preserve Must not and Forbids, verify the result, and update tasks only when complete."
level: "Beginner"
howtoID: "1091002"
weight: 80
---

This guide shows you how to use `specdd-do` for implementation work under active SpecDD authority in a spec-driven
development workflow.

Use this skill when the intended change is ready to make: code, tests, docs, task updates, or spec changes that are
authorized by the governing spec chain.

## Short answer

Use `specdd-do` after the target work has clear SpecDD authority. The agent should resolve the relevant spec chain,
identify the nearest local `Can modify` or `Owns` boundary, make the smallest correct change, run relevant checks, update
task status only after verification, and report the specs used, files changed, checks, and remaining uncertainty.

## When to use this guide

Use this guide when:

- a reviewed spec has an open implementation task
- a plan has been approved and is ready to execute
- code, docs, tests, or tasks need to change inside a known boundary
- an agent should avoid opportunistic cleanup
- task status should change only after checks pass

## Steps

### 1. Start from a reviewed task

Use a task-focused prompt:

```text
Implement the Itinerary validation task.
```

If the work is risky or unclear, use planning first:

```text
Plan the Itinerary validation change.
```

Then implement only after the plan is reviewed.

### 2. Confirm local write authority

The agent must not edit without clear write authority. In a local spec, that usually comes from:

```sdd
Can modify:
  ./itinerary.js
  ./itinerary.test.js
```

or, when `Can modify` is absent:

```sdd
Owns:
  ./itinerary.js
  ./itinerary.test.js
```

`Can read` and `References` provide context. They do not grant edit permission.

### 3. Make the smallest correct change

The implementation should satisfy the requested task without broadening scope.

Good:

```text
Add missing-place validation and its focused check.
```

Too broad:

```text
Rewrite itinerary storage, destination search, and validation together.
```

If the requested change would violate `Must not`, `Forbids`, write authority, security constraints, destructive
behavior, or public contracts, the agent should stop and ask for direction.

### 4. Run relevant checks

The agent should run the project checks that prove the change when available:

- focused tests for the behavior
- existing tests for the area
- linting or formatting checks
- documentation builds when docs changed
- spec linting when `.sdd` files changed

If checks cannot run, the report should say why.

### 5. Update task status only after verification

Do not mark a task done just because code was edited.

After implementation and checks:

```sdd
Tasks:
  [x] Add missing-place validation.
```

Do not complete unrelated tasks opportunistically.

### 6. Report specs, files, checks, and uncertainty

A useful `specdd-do` report includes:

- specs used
- files changed
- checks run
- task status changes
- unresolved uncertainty
- skipped checks and reasons

This makes review fast because the report connects the change back to the contract.

## Common mistakes

- Asking for implementation before the spec grants write authority.
- Treating referenced context as writable scope.
- Completing nearby tasks that were not requested.
- Updating task status before checks run.
- Ignoring `Must not` or `Forbids` because the code change seems small.

## How to verify the result

The implementation was handled correctly when:

- every edited file is inside `Can modify` or `Owns`
- the requested `Must` behavior is satisfied
- `Must not` and `Forbids` rules remain intact
- relevant checks pass or skipped checks are explained
- task status changed only after verification
- the final report names specs, files, checks, and remaining uncertainty

## Related how-tos

- [How to run the spec-first loop](/how-to/spec-driven-workflows/how-to-run-the-spec-first-loop/)
- [How to implement one spec at a time](/how-to/spec-driven-workflows/how-to-implement-one-spec-at-a-time/)
- [How to review a diff against specs](/how-to/work-with-specdd-skills/how-to-review-a-diff-against-specs-specdd-review/)
- [How to chain SpecDD skills safely](/how-to/work-with-specdd-skills/how-to-chain-specdd-skills-safely/)

## Related reference

- [Tools](/tools/)
- [Language reference](/language-reference/)
