---
title: "How to upgrade from an older SpecDD project layout"
seoDescription: "Upgrade an older SpecDD project layout for spec-driven development to the current bootstrap, agent entrypoint, root spec, and local spec structure without losing project-specific rules."
excerpt: "Move an older SpecDD setup to the current layout by updating the bootstrap, preserving project rules, checking agent entrypoints, and verifying spec resolution."
level: "Intermediate"
howtoID: "1011008"
weight: 90
---

This guide shows how to move an older SpecDD project to the current layout without losing useful project-specific rules.

The current layout uses `.specdd/bootstrap.md` for official framework behavior, `.specdd/bootstrap.project.md` for
shared project rules, `.specdd/bootstrap.local.md` for local preferences, root-level agent entrypoints, and `.sdd` specs
near the files or directories they govern.

## Current target layout

The current minimal layout is:

```text
project-name/
  AGENTS.md
  CLAUDE.md
  .specdd/
    bootstrap.md
    bootstrap.project.md
    bootstrap.local.md
    .gitignore
  project-name.sdd
```

Local specs remain source-adjacent:

```text
src/trips/itinerary.js
src/trips/itinerary.sdd
```

## Steps

### 1. Inspect the old layout

Start from a reviewable branch:

```bash
git status --short
find . -name '*.sdd' -print
find . -path './.specdd/*' -print
```

Identify:

- where the old bootstrap or agent instructions live
- whether `.specdd/bootstrap.md` exists
- whether project-specific rules are mixed into generated framework text
- whether a root `.sdd` file exists
- whether local specs already use same-basename placement

### 2. Update the framework bootstrap when bootstrap.md already exists

If the project already has:

```text
.specdd/bootstrap.md
```

run:

```bash
specdd check-update
specdd update
```

Review:

```bash
git diff -- .specdd/bootstrap.md
```

`specdd update` updates the framework bootstrap. It preserves existing non-bootstrap files and does not recreate missing
non-bootstrap files.

### 3. Initialize current support files when bootstrap.md is missing

If the old layout does not have `.specdd/bootstrap.md`, run current initialization from the intended content root:

```bash
specdd init
```

If the repository already has files named `AGENTS.md`, `CLAUDE.md`, or `.specdd/bootstrap.project.md`, the init flow
leaves those existing non-bootstrap files unchanged. Review them and add any missing SpecDD wiring manually.

### 4. Move shared rules into bootstrap.project.md

Put shared team and project conventions in:

```text
.specdd/bootstrap.project.md
```

Move rules such as:

- build commands
- test commands
- naming conventions
- dependency restrictions
- generated-file locations
- team review requirements

Do not keep these conventions in the root spec just because the old layout did. The root spec should describe project
intent and constraints; project-wide setup conventions belong in `.specdd/bootstrap.project.md`.

### 5. Keep local preferences local

Put personal or machine-specific preferences in:

```text
.specdd/bootstrap.local.md
```

The current `.specdd/.gitignore` should contain:

```text
bootstrap.local.md
```

If that ignore file is missing, create it before committing the migration.

### 6. Check agent entrypoints

The current entrypoint pattern is:

```text
AGENTS.md
CLAUDE.md
```

`AGENTS.md` should tell agents to read `.specdd/bootstrap.md`. `CLAUDE.md` should point Claude-style workflows to
`AGENTS.md`.

If the old layout used a different agent instruction file, keep any still-useful project guidance, but make sure the
current entrypoints exist for the agents your team actually uses.

### 7. Check root spec naming

The root spec must match the selected content root directory basename.

Example:

```text
travel-planner/
  travel-planner.sdd
```

If the old root spec has a different filename, rename it only after checking references and links. The human-facing
`Spec:` value may remain descriptive:

```sdd
Spec: Travel Planner
```

### 8. Review local spec placement

Keep useful existing `.sdd` files. Move or rename specs only when the old placement prevents reliable resolution.

Prefer same-basename local specs for implementation targets:

```text
src/trips/itinerary.js
src/trips/itinerary.sdd
```

Use directory specs for inherited area context:

```text
src/trips/trips.sdd
```

Use explicit `References` when a spec needs sibling context. Do not assume sibling specs are inherited automatically.

### 9. Verify the migration

Run:

```bash
specdd inspect .
```

For one important target, run:

```bash
specdd resolve path/to/target-file
```

Then check:

- `.specdd/bootstrap.md` is current
- `.specdd/bootstrap.project.md` contains shared project rules
- `.specdd/bootstrap.local.md` is not committed
- `AGENTS.md` and `CLAUDE.md` are wired correctly
- the root spec filename matches the content root
- local specs still resolve around active implementation targets

## Common mistakes

- Running `specdd update` and expecting it to recreate missing support files.
- Leaving project-specific rules embedded in generated bootstrap text.
- Committing `.specdd/bootstrap.local.md`.
- Renaming specs before checking existing references.
- Treating an older central spec folder as local authority for every target.

## Related how-tos

- [How to update your SpecDD framework files](/how-to/install-and-setup/how-to-update-your-specdd-framework-files/)
- [How to structure a SpecDD project layout](/how-to/install-and-setup/how-to-structure-a-specdd-project-layout/)
- [How to verify your SpecDD setup is correct](/how-to/install-and-setup/how-to-verify-your-specdd-setup-is-correct/)

## Related reference

- [Tools](/tools/)
- [Language reference](/language-reference/)
