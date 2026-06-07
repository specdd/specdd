---
title: "How to enforce and document local code style and conventions"
seoDescription: "Document code style enforcement for spec-driven development in .specdd/bootstrap.project.md with formatter, lint, test, generated-file, dependency, and style-doc rules."
excerpt: "Use bootstrap.project.md for code style enforcement, concrete commands, generated-file policy, dependency rules, and links to existing style docs."
level: "Beginner"
howtoID: "1001010"
weight: 110
---

Code style rules only help when contributors can find the formatter, linter, and review checks that enforce them. In
SpecDD, shared code-style enforcement belongs in `.specdd/bootstrap.project.md`.

This guide shows how to document code style enforcement for spec-driven development: formatting and lint commands, test
commands, generated-file policy, dependency restrictions, and links to existing style docs.

## Short answer

Put shared code-style and enforcement rules in `.specdd/bootstrap.project.md`: formatting commands, lint commands,
test or typecheck commands, generated-file policy, dependency restrictions, and links to existing style docs. Keep
`.sdd` specs focused on operational contracts for project areas. Use the broader team-rules guide for general bootstrap
conventions and the `.sdd` conventions guide for spec naming, placement, section-use, and task-status rules.

## When to use this guide

Use this guide when:

- an agent keeps formatting code differently from the project
- contributors need one place for formatter, lint, test, and review-check commands
- the project already has style docs, but agents do not find them reliably
- a team wants SpecDD setup files to explain how local implementation work should be checked

## Steps

### 1. Collect the conventions that already exist

Start with the rules the project actually follows.

Examples:

- formatter command
- lint command
- test or typecheck command
- file naming rules that affect implementation style
- import ordering
- generated-file policy
- dependency restrictions
- preferred test style
- links to existing code style docs

Do not invent a full style guide in the first pass. Capture the rules that already affect day-to-day work.

### 2. Put shared rules in bootstrap.project.md

Open:

```text
.specdd/bootstrap.project.md
```

Add a section for code style and checks:

```md
# Code style and checks

Follow these conventions for all implementation work:

- Use the existing formatter before reporting work complete.
- Follow the existing import-ordering and filename conventions.
- Do not edit generated files directly.
- Do not add a new dependency for formatting, linting, or test structure without review.
- Keep tests beside the code when the surrounding project already does that.

Run these checks when relevant:

- `npm run lint`
- `npm test`
- `npm run typecheck`
```

This file is loaded after `.specdd/bootstrap.md` and before `.specdd/bootstrap.local.md`, making it the right place for
team-wide code-style and check rules.

### 3. Link existing style docs instead of copying them

If your project already has code style, testing, or dependency docs, link them from `.specdd/bootstrap.project.md`:

```md
# Existing project docs

Use these docs when they are relevant to the files being changed:

- `./docs/code-style.md`: formatting, naming, and import conventions
- `./docs/testing.md`: test structure and fixture rules
- `./docs/dependencies.md`: approved dependencies and exception process

If these docs conflict with the governing `.sdd` spec, stop and ask for a decision instead of guessing.
```

Linking keeps one source for long-form guidance. The bootstrap file tells agents where that guidance lives.

### 4. Be specific about commands

Vague instructions such as "run checks" are easy to miss. List the commands the project actually uses.

Example:

```md
# Checks

For TypeScript source changes, run:

- `npm run lint`
- `npm run typecheck`
- `npm test`

For documentation-only changes, run:

- `npm run docs:check`
```

If commands vary by package, say where to run them:

```md
Run package commands from the package directory that owns the changed files.
```

### 5. Keep root specs focused on behavior and boundaries

Do not put project-wide code style, command, generated-file, dependency, or review-check rules in root specs or local
`.sdd` specs. Those conventions belong in `.specdd/bootstrap.project.md`. For broader repository rules, use
[How to configure team rules in bootstrap.project.md](/how-to/spec-driven-workflows/how-to-configure-team-rules-in-bootstrap-project-md/).
For `.sdd` file naming, placement, and task-status conventions, use
[How to create team conventions for .sdd files](/how-to/teams-and-process/how-to-create-team-conventions-for-sdd-files/).

Use `.sdd` specs for local operational contracts:

```sdd
Spec: Billing Settings

Purpose:
  Let account admins review and update billing settings.

Owns:
  ./billing-settings.ts
  ./billing-settings.test.ts

Must:
  Billing settings reflect current account billing rules.

Must not:
  Modify invoice generation behavior.
```

The local spec says what the area owns and what must remain true. The bootstrap project file says how work should be
formatted, checked, and organized across the repository.

### 6. Add local exceptions only when they are truly local

Sometimes one area has a real local convention. Put that in the nearest relevant `.sdd` spec only when it is part of
that area's contract.

Example:

```sdd
Spec: Public API Schemas

Purpose:
  Define public API schema files.

Owns:
  ./schemas/

Must:
  Public schema filenames use kebab-case.
  Schema examples remain valid JSON.
```

This is local behavior for the API schema area, not a whole-project style guide.

### 7. Ask agents to follow the conventions through normal tasks

Keep prompts focused on the work:

```text
Implement the open billing settings task.
```

The bootstrap project file should already tell the agent which conventions and checks apply. If you need a convention
review only, ask for that directly:

```text
Check whether the Billing Settings changes follow the project conventions.
```

### 8. Verify the setup

Run SpecDD checks:

```bash
specdd inspect .
specdd lint
```

Then run the project checks named in `.specdd/bootstrap.project.md`.

Review:

- `.specdd/bootstrap.project.md` contains shared code-style and enforcement rules
- existing style docs are linked instead of duplicated
- commands are concrete and current
- `.sdd` specs do not repeat whole-project code-style rules
- local exceptions appear only where they are genuinely local
- agents report which checks they ran before marking work complete

## Common mistakes

- Putting team-wide code style in a root `.sdd` spec.
- Using `.specdd/bootstrap.local.md` for shared team conventions.
- Writing "follow project style" without naming commands or documents.
- Duplicating a long style guide in multiple specs.
- Treating SpecDD as a replacement for formatters, linters, tests, or review.
- Adding local style exceptions that really should apply to the whole project.

## Related how-tos

- [How to configure team rules in bootstrap.project.md](/how-to/spec-driven-workflows/how-to-configure-team-rules-in-bootstrap-project-md/)
- [How to create team conventions for .sdd files](/how-to/teams-and-process/how-to-create-team-conventions-for-sdd-files/)
- [How to verify your SpecDD setup is correct](/how-to/install-and-setup/how-to-verify-your-specdd-setup-is-correct/)

## Related reference

- [Quickstart](/quickstart/)
- [Tools](/tools/)
