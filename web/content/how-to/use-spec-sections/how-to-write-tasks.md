---
title: "How to write Tasks"
seoDescription: "Write SpecDD Tasks with valid task markers, optional IDs, local work scope, and status updates only after verification."
excerpt: "Use Tasks as a local implementation checklist with valid states: open, done, skipped, blocked, and needs decision."
level: "Beginner"
howtoID: "1061017"
weight: 180
---

This guide shows you how to write the `Tasks` section in a SpecDD `.sdd` file.

`Tasks` is a local implementation checklist. It helps humans and agents complete work in small slices without turning
the spec into a ticketing system.

## Short answer

Use `Tasks` for local work items that belong to the current spec. Each task line must use a supported marker: `[ ]`,
`[x]`, `[X]`, `[-]`, `[!]`, or `[?]`. Mark tasks done only after implementation and verification. Tasks are work
guidance, not permission to violate `Must`, `Must not`, `Forbids`, or inherited constraints.

## Syntax

```sdd
Tasks:
  [ ] Add missing-place validation.
  [x] #12 Add itinerary ordering tests.
  [?] Confirm whether duplicate places are allowed.
  [!] Save directly from UI components. Violates storage boundary.
  [-] Skip hotel booking; owned by trip booking.
```

Rules:

- `Tasks` accepts task lines only.
- Task lines use exactly two spaces of indentation.
- Supported markers are `[ ]`, `[x]`, `[X]`, `[-]`, `[!]`, and `[?]`.
- Optional task IDs appear after the marker and start with `#` followed by digits.
- Non-task body entries under `Tasks` are invalid.
- Unsupported bracketed states are invalid.

## Task states

Use:

- `[ ]` for open work
- `[x]` or `[X]` for done work
- `[-]` for intentionally skipped work
- `[!]` for blocked work
- `[?]` for work that needs a decision

Do not invent markers such as `[blocked]`, `[todo]`, or `[~]`.

## Steps

### 1. Keep tasks local

Good:

```sdd
Tasks:
  [ ] Add missing-place validation.
```

Risky:

```sdd
Tasks:
  [ ] Update itinerary validation and destination search ranking.
```

If a task needs another spec's authority, split it or update the owning spec through review.

### 2. Write tasks as work, not durable behavior

Before:

```sdd
Tasks:
  [ ] Add missing-place validation.
```

After behavior becomes durable:

```sdd
Must:
  Reject itinerary items without a place name.

Tasks:
  [x] Add missing-place validation.
```

Completed tasks record work. Durable behavior belongs in `Must`, `Must not`, contract sections, `Scenario`, or `Done
when`.

### 3. Use `[?]` for decisions

```sdd
Tasks:
  [?] Confirm whether duplicate itinerary places are allowed.
```

This keeps uncertainty visible instead of letting implementation guess.

### 4. Use `[!]` for blockers

```sdd
Tasks:
  [!] Save itinerary directly from UI components. Violates storage boundary.
```

Use blockers for real constraints such as missing authority, unresolved design decisions, or conflicts with inherited
rules.

### 5. Mark `[x]` only after checks

Do not mark work done because code changed. Mark it done after implementation and relevant checks or review evidence.

## Common mistakes

- Putting ordinary prose lines under `Tasks`.
- Inventing unsupported task states.
- Marking `[x]` before checks run.
- Using tasks to override `Must not` or `Forbids`.
- Completing unrelated tasks because files were already open.
- Leaving durable behavior only in completed task text.

## How to verify the result

The `Tasks` section is correct when:

- every line is a valid task line
- tasks are local to the spec
- task states match reality
- blocked and decision items are visible
- done tasks have evidence
- durable behavior is captured outside task text

## Related how-tos

- [How to write Done when](/how-to/use-spec-sections/how-to-write-done-when/)
- [How to require spec updates in code review](/how-to/code-review-and-governance/how-to-require-spec-updates-in-code-review/)
- [How to fix stale Done when criteria](/how-to/troubleshooting/how-to-fix-stale-done-when-criteria/)

## Related reference

- [Language reference](/language-reference/)
