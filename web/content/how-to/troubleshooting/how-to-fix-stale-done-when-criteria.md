---
title: "How to fix stale Done when criteria"
seoDescription: "Fix stale SpecDD Done when criteria by comparing current behavior, tasks, tests, and review needs, then updating completion criteria with the code change."
excerpt: "Refresh stale Done when criteria so completion signals match current behavior, tasks, tests, and review expectations."
level: "Intermediate"
howtoID: "1191010"
weight: 110
---

This guide shows you how to fix stale `Done when` criteria in a SpecDD spec.

`Done when` is the completion signal for humans and agents. When it goes stale, work can stop too early, continue too
long, or get marked done for the wrong reason.

## Short answer

Compare `Done when` with the current task, behavior, tests, and review expectations. Remove obsolete completion
criteria, add criteria that match the current contract, update specs in the same changeset as behavior changes, and mark
tasks done only after the new criteria are verified.

## Steps

### 1. Compare Done when to current behavior

Stale:

```sdd
Done when:
  Missing-place behavior is covered by a check.
```

If the task now includes save-failure behavior too, the criteria no longer cover the full work.

### 2. Check tasks and tests

Compare:

- `Tasks`
- `Must`
- `Scenario`
- tests or checks
- current implementation
- review comments

If tasks changed but `Done when` did not, completion signals may be stale.

### 3. Remove obsolete criteria

Remove criteria that no longer match the intended contract.

Do not keep old criteria just because they were useful for a previous task. If they describe behavior that remains
important, move or rewrite them under current `Must`, `Scenario`, or `Done when`.

### 4. Add current completion signals

Better:

```sdd
Done when:
  Missing-place behavior is covered by a check.
  Save-failure behavior is covered by a regression check.
  Existing itinerary behavior still passes.
```

Each line should help decide whether the work is complete.

### 5. Update code and specs together

If implementation changed the finish line, update the spec in the same changeset. Do not leave `Done when` as cleanup
after merge.

### 6. Review before marking tasks done

Only after implementation and checks:

```sdd
Tasks:
  [x] Add missing-place validation.
```

If `Done when` is stale or incomplete, do not mark the task done yet.

## Common causes

- Scope changed during implementation.
- Tests were added but criteria were not updated.
- A task was split but `Done when` stayed broad.
- Behavior was deprecated but old criteria remained.
- An agent marked `[x]` without checking completion criteria.

## How to verify the fix

`Done when` is current when:

- each criterion maps to current behavior or review needs
- obsolete criteria are removed or rewritten
- tests or checks prove the criteria where practical
- task status matches the verified criteria
- reviewers can use `Done when` as a real finish line

## Related how-tos

- [How to keep specs in sync with code changes](/how-to/spec-driven-workflows/how-to-keep-specs-in-sync-with-code-changes/)
- [How to run the spec-first loop](/how-to/spec-driven-workflows/how-to-run-the-spec-first-loop/)
- [How to manage tasks across specs](/how-to/work-with-specdd-skills/how-to-manage-tasks-across-specs-specdd-task/)
- [How to recover from spec-code drift](/how-to/spec-driven-workflows/how-to-recover-from-spec-code-drift/)

## Related reference

- [Language reference](/language-reference/)
