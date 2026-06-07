---
title: "How to manage tasks across specs (specdd-task)"
seoDescription: "Manage SpecDD Tasks entries in a spec-driven development workflow with specdd-task by finding task-bearing specs, keeping tasks local, updating status only after checks, and avoiding architecture overrides."
excerpt: "Use specdd-task to find, add, organize, interpret, and update Tasks entries while preserving inherited constraints and local spec authority."
level: "Intermediate"
howtoID: "1091010"
weight: 140
---

This guide shows you how to use `specdd-task` to manage `Tasks` entries across SpecDD specs in a spec-driven
development workflow.

Tasks are local implementation guidance. They help order work, but they do not override `Must`, `Must not`, `Forbids`,
inherited constraints, or write authority.

## Short answer

Use `specdd-task` when an agent should find, add, interpret, organize, or update `Tasks` entries. The agent should focus
on task-bearing specs that apply to the requested scope, treat parent tasks as planning context unless targeted
directly, update status only in the currently targeted spec, and mark `[x]` only after the work and relevant checks are
complete.

## When to use this guide

Use this guide when:

- you need to find open tasks in a feature or module
- a spec needs local implementation tasks
- a task status should be updated after verified work
- tasks are too broad or conflict with inherited rules
- a parent task and child task need to be interpreted safely
- blocked or undecided work needs clear status

## Steps

### 1. Choose the task scope

Use a focused prompt:

```text
List open Itinerary tasks.
```

or:

```text
Update the Itinerary validation task status.
```

The scope should name the spec, feature, or task in human terms.

### 2. Find task-bearing specs

The agent should find specs that apply to the requested scope, not every `Tasks` section in the repository.

For a local feature, the relevant tasks are usually in the nearest local spec. Parent tasks can provide planning context,
but they are not automatically actionable in child specs unless the user targets them directly.

### 3. Keep tasks local and actionable

Good task:

```sdd
Tasks:
  [ ] Add missing-place validation.
```

Too broad:

```sdd
Tasks:
  [ ] Improve all trip planning behavior.
```

Invalid if inherited rules forbid it:

```sdd
Tasks:
  [ ] Write itinerary data directly to browser storage.
```

If a task cannot be completed inside the local `Owns` or `Can modify` boundary, revise the task or create a reviewed
spec update.

### 4. Use the right task state

SpecDD supports these task states:

```text
[ ] open
[x] done
[X] done
[-] skipped
[!] blocked
[?] needs decision
```

Use them deliberately:

- `[ ]` for work that remains open
- `[x]` or `[X]` only after work and checks are complete
- `[-]` when the task is intentionally skipped and the reason is clear
- `[!]` when work is blocked
- `[?]` when a design or behavior decision is unresolved

### 5. Update only the targeted spec

If the request targets the Itinerary spec, update the Itinerary task status only.

Do not complete unrelated tasks in parent specs, sibling specs, or nearby files just because the implementation touched
them. A task is local to the spec where it appears.

### 6. Report status changes and blockers

A good `specdd-task` report includes:

- task IDs or exact task text
- old and new status
- verification used for `[x]`
- blocked or uncertain tasks
- any task that conflicts with inherited constraints
- any scope that needs a separate spec-driven change

## Example

Before:

```sdd
Tasks:
  [ ] Add missing-place validation.
  [?] Confirm whether duplicate itinerary places are allowed.
  [!] Decide how save failures should be shown.
```

After implementing and checking validation:

```sdd
Tasks:
  [x] Add missing-place validation.
  [?] Confirm whether duplicate itinerary places are allowed.
  [!] Decide how save failures should be shown.
```

Only the completed and verified task changed.

## Common mistakes

- Using a task to override `Must not`, `Forbids`, or write authority.
- Marking `[x]` before tests or checks run.
- Completing parent tasks from a child implementation without explicit scope.
- Adding tasks that are too broad to be local.
- Losing blocked and undecided work by deleting `[!]` or `[?]` tasks.

## How to verify the result

Task management worked when:

- tasks are local, actionable, and consistent with inherited constraints
- task status changed only in the intended spec
- `[x]` entries have implementation and verification behind them
- blocked and undecided work remains visible
- no task expands write authority
- the report lists exact task text or IDs and verification

## Related how-tos

- [How to implement under spec authority](/how-to/work-with-specdd-skills/how-to-implement-under-spec-authority-specdd-do/)
- [How to run the spec-first loop](/how-to/spec-driven-workflows/how-to-run-the-spec-first-loop/)
- [How to keep specs in sync with code changes](/how-to/spec-driven-workflows/how-to-keep-specs-in-sync-with-code-changes/)
- [How to chain SpecDD skills safely](/how-to/work-with-specdd-skills/how-to-chain-specdd-skills-safely/)

## Related reference

- [Tools](/tools/)
- [Language reference](/language-reference/)
