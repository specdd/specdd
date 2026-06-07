---
title: "How to configure team rules in bootstrap.project.md"
seoDescription: "Configure shared spec-driven development team rules in .specdd/bootstrap.project.md for commands, code style, naming, syntax choices, documentation locations, and project workflow conventions."
excerpt: "Use .specdd/bootstrap.project.md for shared project conventions that humans and agents should apply across the repository without mixing them into local .sdd contracts."
level: "Beginner"
howtoID: "1081005"
weight: 60
---

This guide shows you how to configure shared team rules for a spec-driven development project in `.specdd/bootstrap.project.md`.

Use this file for project-wide conventions such as commands, formatting, naming, syntax choices, repository layout
notes, and links to existing team docs. Keep product behavior, local ownership, and implementation boundaries in `.sdd`
specs.

## Short answer

Put shared repository conventions in `.specdd/bootstrap.project.md`. The file is loaded after `.specdd/bootstrap.md`
and before `.specdd/bootstrap.local.md`, so it is the right place for team rules that all contributors and agents should
share. Do not put durable local behavior or area-specific write authority there.

## When to use this guide

Use this guide when:

- contributors repeat the same formatting, command, or naming instructions in prompts
- agents use the wrong test command or package manager
- the team has custom `.sdd` naming or level conventions
- existing docs need to be discoverable from SpecDD workflows
- project-wide conventions are scattered across tickets, chat, and memory

## What belongs in bootstrap.project.md

Good shared rules include:

- package manager and install commands
- test, lint, format, build, and documentation commands
- language or framework versions used by the repository
- code style conventions not already enforced by tooling
- project-wide `.sdd` naming conventions
- custom spec level names and what they mean
- repository layout notes
- locations of existing architecture docs, ADRs, runbooks, or product notes
- review expectations that apply across the project

Do not put these in `.specdd/bootstrap.project.md`:

- local feature behavior
- module ownership
- per-file write authority
- personal shell preferences
- machine-specific paths
- temporary task details
- security exceptions that weaken inherited constraints

## Steps

### 1. Identify shared team rules

Collect rules that apply to the whole repository or most contributors.

Good candidates:

```text
Use pnpm for package commands.
Run pnpm test before marking implementation tasks complete.
Use lowercase same-basename .sdd files for JavaScript modules.
Put generated API docs under docs/api.
```

Not a team bootstrap rule:

```text
The itinerary module rejects missing place names.
```

That belongs in the local Itinerary spec because it describes behavior owned by one area.

### 2. Edit bootstrap.project.md

Create or update:

```text
.specdd/bootstrap.project.md
```

Example:

```md
# Project Rules

## Commands

- Install dependencies with `pnpm install`.
- Run unit tests with `pnpm test`.
- Run linting with `pnpm lint`.
- Run formatting with `pnpm format`.

## SpecDD Conventions

- Use same-basename `.sdd` files for file-level behavior.
- Use directory-level specs for module boundaries.
- Use explicit `./`, `../`, or `/` path prefixes when a spec entry should resolve as a path.
- Use `Can modify` when writable scope is narrower than `Owns`.

## Documentation Locations

- Architecture decisions live in `docs/adr/`.
- Runbooks live in `docs/runbooks/`.
- Product notes live in `docs/product/`.
```

Keep the file direct. It should tell contributors what convention to follow, not recreate every project document.

### 3. Keep product behavior in specs

If a rule describes what a feature must do, put it in a `.sdd` spec near the feature.

```sdd
Spec: Itinerary

Must:
  Reject itinerary items without a place name.
```

Team conventions belong in `.specdd/bootstrap.project.md`. Local behavior belongs in `.sdd` files.

### 4. Link existing convention docs

If the team already has style, architecture, or operations docs, reference their locations from the project bootstrap
instead of copying all content.

```md
## Existing Project Docs

- API design guidance lives in `docs/api-guidelines.md`.
- Release runbooks live in `docs/runbooks/release.md`.
- Domain glossary lives in `docs/domain-glossary.md`.
```

When a local spec needs a specific outside contract, use the spec's `References` or `Can read` sections. The bootstrap
file makes shared locations discoverable; local specs decide what matters for a target.

### 5. Commit shared rules

Commit `.specdd/bootstrap.project.md` with the project. It is shared setup context.

Do not commit personal preferences in `.specdd/bootstrap.local.md`. That file is for local operator or environment
overrides and is normally ignored.

### 6. Verify agents can apply the rules

Use a simple workflow check:

```text
Explain the shared project conventions.
```

Then check whether the answer names the right package manager, commands, spec naming conventions, and docs locations.
If the answer is vague, tighten the bootstrap project file.

## Best practices

- Write rules as short, enforceable statements.
- Link existing docs instead of duplicating long documents.
- Keep shared command and naming conventions out of local specs.
- Keep feature behavior and module ownership out of the bootstrap file.
- Review bootstrap changes like project configuration changes.
- Remove rules that no longer match actual tooling.

## Common mistakes

- Putting team conventions in a root spec instead of `.specdd/bootstrap.project.md`.
- Putting personal shell aliases or local paths in `.specdd/bootstrap.project.md`.
- Recording feature behavior in the bootstrap file, far away from the code it governs.
- Copying an entire architecture document into the bootstrap file instead of linking its location.
- Using bootstrap rules to weaken `Must not`, `Forbids`, or write authority from specs.

## How to verify the result

Your team bootstrap is working when:

- shared commands and conventions are visible in `.specdd/bootstrap.project.md`
- local `.sdd` specs still own local behavior and boundaries
- agents and contributors do not need repeated prompt instructions for project conventions
- `.specdd/bootstrap.local.md` remains uncommitted
- code review can distinguish shared workflow rules from product behavior

## Related how-tos

- [How to enforce and document local code style and conventions](/how-to/getting-started/how-to-enforce-and-document-local-code-style-and-conventions/)
- [How to configure personal preferences in bootstrap.local.md](/how-to/spec-driven-workflows/how-to-configure-personal-preferences-in-bootstrap-local-md/)
- [How to link existing docs and content with SpecDD](/how-to/getting-started/how-to-link-existing-docs-and-content-with-specdd/)
- [How to structure a SpecDD project layout](/how-to/install-and-setup/how-to-structure-a-specdd-project-layout/)

## Related reference

- [Quickstart](/quickstart/)
- [Tools](/tools/)
