---
title: "How to create team conventions for .sdd files"
seoDescription: "Create SpecDD .sdd file conventions for spec-driven development by documenting naming, placement, suffix policy, path style, section usage, task status, and spec review rules in .specdd/bootstrap.project.md."
excerpt: "Standardize .sdd conventions for a team without hiding them in root specs: put shared naming, placement, suffix, path style, section-use, task-status, and spec review rules in bootstrap.project.md."
level: "Beginner"
howtoID: "1171006"
weight: 90
---

This guide shows you how to create `.sdd` file conventions for a spec-driven development workflow.

Project-wide `.sdd` conventions belong in `.specdd/bootstrap.project.md`. Do not put spec naming, placement, level,
section-use, path-style, task-status, or spec review conventions in root specs, module specs, local specs, or a separate
team convention spec.

For broader repository rules, use [How to configure team rules in bootstrap.project.md](/how-to/spec-driven-workflows/how-to-configure-team-rules-in-bootstrap-project-md/).
For formatter, linter, and code-style enforcement, use [How to enforce and document local code style and conventions](/how-to/getting-started/how-to-enforce-and-document-local-code-style-and-conventions/).

## Short answer

Document team `.sdd` conventions in `.specdd/bootstrap.project.md`: naming, placement, spec levels, suffix policy, path
style, section preferences, task status usage, spec lint expectations, and spec review expectations. Keep actual
behavior, ownership, and local implementation authority in `.sdd` specs near the code they govern.

## When to use this guide

Use this guide when:

- different contributors name specs differently
- agents choose inconsistent `.sdd` locations
- reviewers disagree about task status or section usage
- a project has custom spec levels
- teams repeat convention instructions in prompts

## Steps

### 1. Choose only useful conventions

Start with conventions that reduce confusion:

- root spec naming
- same-basename file-level specs
- directory-level spec naming
- when to use suffixes like `.component.sdd`
- custom spec levels and what each one means
- path prefix style
- task status usage
- spec lint expectations
- spec review expectations

Do not over-standardize every possible section. Specs should include only sections that add useful local information.

### 2. Put conventions in bootstrap.project.md

Use:

```text
.specdd/bootstrap.project.md
```

Example:

```md
# Project SpecDD Conventions

## Naming

- Use same-basename `.sdd` files for file-level behavior.
- Use directory-level specs for module boundaries.
- Use suffixes only when the directory does not make the subject clear.
- Document custom level suffixes in this file before using them broadly.

## Paths

- Use explicit `./`, `../`, or `/` path prefixes for file references.
- Avoid unprefixed filenames when a path reference is intended.

## Task Status

- Leave task status unchanged until implementation and checks are complete.
- Use blocked or review-needed task language only when the next action is clear.

## Spec Review

- Review specs when behavior, ownership, or write authority changes.
- Run `specdd lint` for edited `.sdd` files.
```

This file is shared project context. It is loaded after `.specdd/bootstrap.md` and before local preferences.

### 3. Define naming and placement

Use examples from your project:

```text
src/trips/itinerary.js
src/trips/itinerary.sdd
```

If a suffix convention helps:

```text
src/ui/itinerary-view.component.js
src/ui/itinerary-view.component.sdd
```

Follow your platform and team naming conventions consistently. The goal is to help humans and agents locate the right
spec reliably.

### 4. Define section usage

Team conventions can say when to prefer certain sections:

```md
## Section Use

- Use `Owns` for files or responsibilities owned by a spec.
- Use `Can modify` when writable scope is narrower than ownership.
- Use `Can read` or `References` for outside context.
- Use `Must not` only for plausible local boundary mistakes.
- Use `Done when` when task completion could otherwise be ambiguous.
```

Do not copy framework language reference content wholesale. Link the reference when needed.

### 5. Define spec review and lint expectations

Add practical expectations:

```md
## Spec Review

- Run `specdd lint` after editing `.sdd` files.
- In pull requests, review `Must`, `Must not`, `Forbids`, `Tasks`, and `Done when` changes.
- Do not mark `[x]` until implementation and checks are complete.
```

Keep this concise and enforceable.

### 6. Keep local behavior in local specs

Do not put feature behavior in `.specdd/bootstrap.project.md`.

Wrong place:

```md
- Itinerary rejects missing place names.
```

Right place:

```sdd
Spec: Itinerary

Must:
  Reject itinerary items without a place name.
```

Conventions are shared process. Behavior belongs near the code it governs.

## Common mistakes

- Creating a `team-conventions.sdd` file for project-wide conventions.
- Putting naming and syntax rules in the root spec.
- Copying the language reference into `.specdd/bootstrap.project.md`.
- Adding feature behavior to the project bootstrap file.
- Using `.specdd/bootstrap.local.md` for team-wide conventions.

## How to verify the result

Team conventions are working when:

- `.specdd/bootstrap.project.md` contains shared `.sdd` conventions
- local specs stay focused on behavior and authority
- contributors use consistent naming and placement
- agents no longer need repeated convention prompts
- edited specs are linted
- review checks task status and boundary changes

## Related how-tos

- [How to configure team rules in bootstrap.project.md](/how-to/spec-driven-workflows/how-to-configure-team-rules-in-bootstrap-project-md/)
- [How to enforce and document local code style and conventions](/how-to/getting-started/how-to-enforce-and-document-local-code-style-and-conventions/)
- [How to use basic SpecDD levels](/how-to/getting-started/how-to-use-basic-specdd-levels/)
- [How to assign ownership for specs](/how-to/teams-and-process/how-to-assign-ownership-for-specs/)

## Related reference

- [Language reference](/language-reference/)
- [Tools](/tools/)
