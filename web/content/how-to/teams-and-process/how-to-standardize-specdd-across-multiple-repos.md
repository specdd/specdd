---
title: "How to standardize SpecDD across multiple repos"
seoDescription: "Standardize spec-driven development across multiple repositories by using consistent bootstrap.project.md conventions, root specs, naming rules, review expectations, and local repo overrides."
excerpt: "Use a shared SpecDD baseline across repos while keeping each repo's bootstrap.project.md responsible for its own commands, naming, checks, and local conventions."
level: "Advanced"
howtoID: "1171009"
weight: 110
---

This guide shows you how to standardize spec-driven development across multiple repositories without forcing every repo into the same
shape.

SpecDD is file-based and adaptable. Standardization should make specs easier to find, review, and use across repos
while preserving each repo's language, framework, commands, and ownership model.

## Short answer

Create a small shared baseline for SpecDD usage, then express each repository's actual conventions in
`.specdd/bootstrap.project.md`. Standardize naming, path style, task status, lint expectations, and review habits where
they help. Keep repo-specific commands, platform rules, and local overrides in each repo's bootstrap project file.

## When to use this guide

Use this guide when:

- several repos are adopting SpecDD
- teams move between projects
- agents work across multiple repositories
- review expectations should be consistent
- monorepos and service repos need related but not identical conventions
- a platform team wants a lightweight baseline

## Steps

### 1. Define the shared baseline

Keep the shared baseline small:

- every SpecDD project has `.specdd/bootstrap.md`
- shared team rules live in `.specdd/bootstrap.project.md`
- personal preferences stay in `.specdd/bootstrap.local.md`
- root specs are named after the selected content root
- local specs should be close to the code or area they govern
- explicit path references use `./`, `../`, or `/`
- edited `.sdd` files are linted when the CLI is available
- specs are reviewed when behavior or authority changes

This baseline should help contributors navigate any repo without hiding local differences.

### 2. Apply conventions through bootstrap.project.md

Each repo should document its actual SpecDD conventions in:

```text
.specdd/bootstrap.project.md
```

If your organization keeps a normal shared engineering guide, each repo can point to it from `bootstrap.project.md`.
Still write the repo-specific commands and local choices in the repo itself.

Do not put cross-repo conventions in root specs or local `.sdd` files.

### 3. Keep repo-specific rules local

Different repos may use different:

- package managers
- test commands
- framework versions
- directory layouts
- naming conventions
- deployment checks
- generated file policies

Those differences belong in each repo's `.specdd/bootstrap.project.md` or local specs, depending on whether they are
project-wide conventions or local behavior contracts.

### 4. Standardize naming only where it helps

Use consistent defaults:

```text
src/trips/itinerary.js
src/trips/itinerary.sdd
```

But allow platform conventions:

```text
src/main/java/trips/Itinerary.java
src/main/java/trips/Itinerary.sdd
```

The goal is reliable location, not identical filenames across every language.

### 5. Standardize review and checks

Across repos, ask reviewers to check:

- changed files are inside `Owns` or `Can modify`
- durable behavior changes are reflected in specs
- `Must not` and `Forbids` changes are reviewed carefully
- tasks are marked `[x]` only after checks
- edited specs pass `specdd lint` when available
- tickets and specs remain aligned

This shared review habit matters more than identical spec content.

### 6. Audit repos through small examples

Choose one representative area per repo:

- one root spec
- one local spec
- one small task
- one implementation or docs change
- one review

If a contributor can follow the same basic workflow in each repo, the standard is useful.

## Common mistakes

- Forcing every repo to use identical spec filenames despite platform conventions.
- Putting organization conventions in root specs.
- Ignoring repo-specific commands and checks.
- Standardizing by copying one repo's specs into another repo.
- Measuring standardization by spec count instead of workflow consistency.
- Tracking personal preferences in shared files.

## How to verify the result

Multi-repo standardization is working when:

- every repo has clear `.specdd/bootstrap.project.md` conventions
- local differences are documented where contributors and agents can find them
- root and local specs are easy to locate
- review checks are consistent across repos
- edited specs can be linted
- contributors can complete one small spec-driven change in each repo

## Related how-tos

- [How to create team conventions for .sdd files](/how-to/teams-and-process/how-to-create-team-conventions-for-sdd-files/)
- [How to configure team rules in bootstrap.project.md](/how-to/spec-driven-workflows/how-to-configure-team-rules-in-bootstrap-project-md/)
- [How to structure a SpecDD project layout](/how-to/install-and-setup/how-to-structure-a-specdd-project-layout/)
- [How to get consistent results across different agents](/how-to/agent-workflows/how-to-get-consistent-results-across-different-agents/)

## Related reference

- [Tools](/tools/)
- [Language reference](/language-reference/)
