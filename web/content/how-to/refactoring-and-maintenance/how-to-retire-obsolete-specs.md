---
title: "How to retire obsolete specs"
seoDescription: "Retire obsolete SpecDD specs safely in a spec-driven development workflow by proving they no longer govern behavior, moving live rules, checking references, and deleting stale files with validation."
excerpt: "Remove obsolete specs only after confirming their behavior, ownership, references, tasks, and inherited constraints are no longer active."
level: "Intermediate"
howtoID: "1151003"
weight: 40
---

This guide shows you how to retire obsolete SpecDD specs safely in a spec-driven development workflow.

An obsolete spec is not just an old file. It is a spec that no longer governs live code, tests, docs, behavior, or
workflow. Removing it without checking can erase useful constraints. Keeping it when it no longer applies can mislead
humans and agents.

The goal is to remove stale authority while preserving any behavior or boundary that still matters.

## Short answer

Retire a spec only after tracing what it owns, what references it, what behavior it defines, and whether any live code or
tests still depend on it. Move any still-valid rules to the correct owning spec, update references and tasks, then delete
the obsolete spec and run validation. Do not keep dead specs as "documentation" if they still look authoritative.

## When to use this guide

Use this guide when:

- code governed by a spec was deleted
- a feature was retired
- a module split left an old parent spec stale
- a spec describes behavior no longer shipped
- references point to removed files
- agents keep reading an old spec and making wrong changes
- tests prove behavior that no longer exists

## Steps

### 1. Confirm the spec is obsolete

Ask:

- Does any live file appear in `Owns` or `Can modify`?
- Does any active spec inherit from it?
- Is it referenced by `References`, `Can read`, or path entries?
- Do tests still prove its scenarios?
- Do docs still describe its behavior?
- Does any task remain open?

If the answer is yes, the spec may be stale, not obsolete.

### 2. Trace ownership and references

Check for:

```sdd
Owns:
  ./old-feature.js

References:
  ./old-feature.sdd
```

Use search or a trace workflow to find explicit links. Do not assume a spec is unused because its filename looks old.

### 3. Move live rules before deleting

If an old spec contains a still-valid rule:

```sdd
Must not:
  Purchase bookings or tickets.
```

move that rule to the spec that now owns the boundary, often a parent module or repository spec. Do not delete live
constraints just because their old code moved.

### 4. Resolve tasks and Done when

For open tasks:

- move still-valid tasks to the new owning spec
- mark intentionally skipped tasks `[-]` only when the project wants that history preserved
- remove tasks tied to deleted behavior
- update stale `Done when` criteria

Do not leave open tasks in a spec you are deleting without deciding where the work went.

### 5. Delete or convert intentionally

Most obsolete specs should be deleted. If you need historical design context, keep it in a non-authoritative document
such as an architecture note, not in an `.sdd` file that looks like a live contract.

Avoid leaving comments like:

```sdd
Spec: Old Feature

Purpose:
  Historical only.
```

That still looks like a spec. Prefer deletion unless the spec still governs something.

### 6. Update references and paths

After deleting or moving a spec, update:

- parent `Structure`
- sibling `References`
- `Can read`
- `Depends on` path entries
- docs links
- tests that named the old behavior
- tasks that referenced the old spec

Then lint the affected spec directory.

## Example retirement checklist

```text
Spec: Legacy Trip Export

Retirement evidence:
  old export command removed
  replacement export command has its own API spec
  no active specs reference legacy-trip-export.sdd
  compatibility rule moved to Export API spec
  legacy export tests removed with behavior removal
  specdd lint passes for export directory
```

This is the level of evidence reviewers need.

## Common mistakes

- Deleting a spec because the file name looks old without tracing references.
- Removing a parent boundary that children still inherit.
- Leaving an obsolete `.sdd` file as historical documentation.
- Deleting live `Must not` rules with retired implementation details.
- Removing tests without updating the governing behavior spec.
- Forgetting to update `Structure` and `References`.

## How to verify the result

The spec was retired safely when:

- no live code, tests, docs, or specs depend on it
- live rules were moved to their new owners
- stale tasks and completion criteria were resolved
- references and paths were updated
- spec lint passes
- reviewers understand why deletion is safe

## Related how-tos

- [How to remove dead code with SpecDD](/how-to/refactoring-and-maintenance/how-to-remove-dead-code-with-specdd/)
- [How to recover from spec-code drift](/how-to/spec-driven-workflows/how-to-recover-from-spec-code-drift/)
- [How to trace specs to code, tests, and gaps](/how-to/work-with-specdd-skills/how-to-trace-specs-to-code-tests-and-gaps-specdd-trace/)
- [How to deprecate behavior with SpecDD](/how-to/spec-driven-workflows/how-to-deprecate-behavior-with-specdd/)

## Related reference

- [Language reference](/language-reference/)
