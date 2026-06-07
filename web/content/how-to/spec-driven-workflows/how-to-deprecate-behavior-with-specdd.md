---
title: "How to deprecate behavior with SpecDD"
seoDescription: "Deprecate behavior with spec-driven development by documenting the transition in existing sections, preserving required compatibility, blocking new usage, and tracking removal tasks."
excerpt: "Use SpecDD to make deprecation explicit with Must, Must not, Tasks, Done when, and Scenarios so old behavior is migrated safely instead of disappearing accidentally."
level: "Intermediate"
howtoID: "1081010"
weight: 110
---

This guide shows you how to deprecate behavior with spec-driven development using the standard `.sdd` sections.

SpecDD does not need a special deprecation syntax. A deprecation is a contract change: some behavior must continue for a
while, new use may be forbidden, migration work must be tracked, and final removal must be checked.

## Short answer

Update the spec that owns the behavior. State what remains supported, what new usage is no longer allowed, what replaces
the behavior, which tasks complete the migration, and what `Done when` criteria prove removal is safe. Use `Must`,
`Must not`, `Forbids`, `Tasks`, `Done when`, and `Scenario` instead of inventing a custom `Deprecated` section.

## When to use this guide

Use this guide when:

- an old API, command, option, file format, workflow, or dependency is being phased out
- existing users or jobs still need temporary compatibility
- new code should stop using an old behavior
- agents keep reintroducing an old path because it still exists in code
- removal needs several small implementation steps

## Security and risk notes

Deprecation can affect public contracts, migrations, production workflows, data compatibility, and security behavior.
Do not let an agent remove old behavior from a vague prompt. Make the transition rules explicit and review them before
implementation.

## Steps

### 1. Find the spec that owns the behavior

Deprecate behavior where it is owned.

Examples:

- a CLI flag belongs in the command or operation spec
- a response field belongs in the API or endpoint spec
- a file format belongs in the adapter, import, export, or schema spec
- a workflow step belongs in the workflow or job spec

Do not put deprecation policy in `.specdd/bootstrap.project.md` unless it is a project-wide convention. The behavior
transition belongs in the local `.sdd` contract.

### 2. Define the replacement or end state

State what should be true after the transition.

```sdd
Spec: Itinerary Export

Purpose:
  Export itinerary data for external reporting.

Owns:
  ./itinerary-export.js
  ./itinerary-export.test.js

Must:
  JSON export is the supported export format for new integrations.
```

Avoid writing only "remove CSV someday." The replacement or end state should be clear enough to implement and review.

### 3. Protect required compatibility

If old behavior must remain temporarily, say so.

```sdd
Must:
  Existing scheduled CSV reports keep working until their migration task is complete.
  JSON export is the supported export format for new integrations.
```

This prevents a removal task from breaking known dependents before the migration is ready.

### 4. Block new usage deliberately

Use `Must not` or `Forbids` to stop expansion of the deprecated path.

```sdd
Must not:
  Add new CSV-only export options.
  Create new integrations that depend on CSV export.

Forbids:
  New imports from ./csv-only-export.js
```

Use `Forbids` for dependencies, paths, modules, libraries, or access that should be blocked. Use `Must not` for
behavioral non-goals and boundaries.

### 5. Track migration and removal tasks

Break the deprecation into local tasks:

```sdd
Tasks:
  [ ] Add JSON export for scheduled reports.
  [ ] Move existing scheduled reports from CSV export to JSON export.
  [ ] Remove CSV export after scheduled reports no longer use it.
```

Do not mark removal complete until the compatibility rule and checks prove it is safe.

### 6. Verify the transition

Add `Done when` criteria and scenarios for both old and new behavior while the transition is active.

```sdd
Done when:
  New export integrations use JSON export.
  Existing scheduled reports pass through the JSON export path.
  CSV export has no remaining scheduled report callers before removal.

Scenario: existing scheduled report during migration
  Given a scheduled report still uses CSV export
  When the report runs during the migration
  Then the report still receives export data

Scenario: new export integration
  Given a new export integration is added
  When it requests itinerary data
  Then it uses JSON export
```

These checks prevent both premature removal and new growth of the deprecated behavior.

### 7. Remove the behavior only when done

When migration is complete, update the spec again:

```sdd
Must:
  JSON export is the supported export format.

Must not:
  Support CSV export.

Tasks:
  [x] Add JSON export for scheduled reports.
  [x] Move existing scheduled reports from CSV export to JSON export.
  [x] Remove CSV export after scheduled reports no longer use it.
```

Then remove code, tests, docs, and examples that still describe the old behavior as supported. If public documentation
exists, update it in the same changeset.

## Agent prompt

Use one prompt for planning:

```text
Plan the Itinerary Export deprecation.
```

Use a separate prompt for a reviewed implementation step:

```text
Implement the approved Itinerary Export migration task.
```

## Common mistakes

- Removing old behavior before existing dependents are migrated.
- Writing a task to remove behavior without a `Must` rule for the replacement.
- Blocking new use in prose but forgetting `Must not` or `Forbids`.
- Marking deprecation tasks `[x]` before checks prove no remaining callers.
- Inventing a custom `.sdd` section instead of using documented SpecDD sections.
- Updating code but leaving examples or docs that still promote the old behavior.

## How to verify the result

The deprecation is controlled when:

- the owning spec names the replacement or end state
- temporary compatibility is explicit when required
- new usage is blocked by `Must not` or `Forbids`
- migration and removal tasks are local and checked
- scenarios cover old compatibility and new behavior while both matter
- final removal updates code, specs, tests, docs, and examples together

## Related how-tos

- [How to change a spec safely after code already exists](/how-to/spec-driven-workflows/how-to-change-a-spec-safely-after-code-already-exists/)
- [How to keep specs in sync with code changes](/how-to/spec-driven-workflows/how-to-keep-specs-in-sync-with-code-changes/)
- [How to implement one spec at a time](/how-to/spec-driven-workflows/how-to-implement-one-spec-at-a-time/)
- [How to resolve conflicts between specs](/how-to/spec-driven-workflows/how-to-resolve-conflicts-between-specs/)

## Related reference

- [Language reference](/language-reference/)
