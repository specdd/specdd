---
title: "How to use the CLI through an agent (specdd-cli)"
seoDescription: "Use specdd-cli to run the SpecDD CLI through an agent during spec-driven development for resolve, inspect, and lint workflows without treating CLI output as write authority."
excerpt: "Use specdd-cli through an agent to discover relevant specs, inspect spec sections, lint edited specs, and run setup or updates only when explicitly requested."
level: "Intermediate"
howtoID: "1091011"
weight: 160
---

This guide shows you how to use `specdd-cli` to run the SpecDD CLI through an agent during spec-driven development.

The CLI understands SpecDD target paths, directory spec conventions, selected roots, section filters, soft-link depth,
and spec linting. It is useful for discovery and validation, but CLI output does not grant write authority by itself.

## Short answer

Use `specdd-cli` when an agent needs the `specdd` CLI for setup, updates, spec discovery, inspection, or linting. Prefer
`specdd resolve`, `specdd inspect`, and `specdd lint` for day-to-day work. Use `specdd init` or `specdd update` only
when the operator explicitly asks for setup or framework updates. If the CLI is missing, do not install it
automatically.

## When to use this guide

Use this guide when:

- an agent needs to discover relevant specs for a concrete target
- a subtree needs to be mapped before authoring
- edited `.sdd` files need syntax validation
- SpecDD should be initialized or updated by explicit request
- broad recursive file reads would be noisier than CLI discovery

## Steps

### 1. Check whether the CLI is available

The agent should check availability:

```sh
command -v specdd
```

If `specdd` is missing, the agent should report that CLI exploration is unavailable and continue with normal bootstrap
and spec-chain resolution where possible. It should not install the CLI automatically.

### 2. Use resolve for concrete targets

Use `specdd resolve` when there is a concrete file, directory, or `.sdd` target.

```sh
specdd resolve src/trips/itinerary.js --sections Purpose,Owns,Can modify,Must,Must not,Tasks
```

`resolve` can include same-basename specs, directory-level specs, vertical context, and explicitly linked context
depending on depth. Use section filters to keep output focused.

Do not treat `resolve` output as write authority by itself. Read exact governing specs when the wording matters.

### 3. Use inspect for mapping specs

Use `specdd inspect` when the task is to understand what specs exist in a path or subtree.

```sh
specdd inspect src/trips --sections Purpose,Structure,Owns,Must,Tasks
```

This is useful before authoring new specs or choosing the right local boundary.

### 4. Use lint after editing specs

Use `specdd lint` after creating or editing `.sdd` files:

```sh
specdd lint src/trips/itinerary.sdd
```

Lint the narrowest edited path first. If several specs changed, lint the relevant directory too.

### 5. Use init or update only when requested

Use:

```sh
specdd init
```

only when the operator explicitly asks to add SpecDD to a project.

Use:

```sh
specdd update
```

only when the operator explicitly asks to update SpecDD framework files.

After initialization, or after an update that changed framework files, the agent should read the active bootstrap chain
before continuing.

### 6. Read exact specs when authority matters

CLI output helps discovery. Exact decisions still require the governing spec text.

Read exact specs when deciding:

- write authority
- `Must not` or `Forbids` stop conditions
- task status changes
- public behavior
- security or destructive operations
- wording for review findings

## Common CLI commands

```sh
specdd resolve src/trips/itinerary.js --sections Purpose,Owns,Can modify,Must,Must not,Tasks
specdd inspect src/trips --sections Purpose,Structure,Owns,Must,Tasks
specdd lint src/trips/itinerary.sdd
```

Use JSON formats only when stable machine-readable output is needed. Use extended JSON only when parser metadata, line
numbers, raw entries, or full service results are actually useful.

## Common mistakes

- Installing the CLI automatically when it is missing.
- Using `resolve` output as permission to edit files.
- Running broad `--depth all` resolution by default.
- Using `init` or `update` during normal implementation work.
- Skipping `specdd lint` after editing specs.
- Treating non-glob directory links as recursive descendant inclusion.

## How to verify the result

CLI-assisted work was handled correctly when:

- the agent reports commands used and relevant output summary
- `resolve` or `inspect` was used for discovery when useful
- exact specs were read for authority-sensitive decisions
- edited specs were linted
- setup or update commands were used only by explicit request
- any remaining authority or verification gap is reported

## Related how-tos

- [How to verify your SpecDD setup is correct](/how-to/install-and-setup/how-to-verify-your-specdd-setup-is-correct/)
- [How to author and revise specs](/how-to/work-with-specdd-skills/how-to-author-and-revise-specs-specdd-author/)
- [How to implement under spec authority](/how-to/work-with-specdd-skills/how-to-implement-under-spec-authority-specdd-do/)
- [How to plan adoption with an agent](/how-to/work-with-specdd-skills/how-to-plan-adoption-with-an-agent-specdd-adopt/)

## Related reference

- [Tools](/tools/)
- [Language reference](/language-reference/)
