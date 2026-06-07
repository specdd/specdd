---
title: "How to plan adoption with an agent (specdd-adopt)"
seoDescription: "Plan spec-driven development adoption with specdd-adopt by checking bootstrap status, using the CLI for init or update only when requested, and proposing the smallest useful initial spec shape."
excerpt: "Use specdd-adopt to add or update SpecDD framework files through the CLI, inspect only enough repository shape, and propose small reviewed adoption scopes."
level: "Intermediate"
howtoID: "1091012"
weight: 170
---

This guide shows you how to use `specdd-adopt` to plan or start spec-driven development adoption with an agent.

Use this skill when a repository needs SpecDD added, or when SpecDD framework bootstrap files need an operator-requested
update. If the project is already bootstrapped and the request is normal spec authoring or implementation, use another
task-specific skill instead.

## Short answer

Use `specdd-adopt` when the operator explicitly asks to add SpecDD to a project or update SpecDD framework files. The
agent should check whether `.specdd/bootstrap.md` already exists, use the SpecDD CLI for setup or updates, read the
active bootstrap chain after initialization or changed updates, inspect only enough repository shape, and propose the
smallest useful initial spec scope before creating specs.

## When to use this guide

Use this guide when:

- a repository does not yet have SpecDD bootstrap files
- an existing SpecDD project needs framework files updated by request
- a team wants a small adoption plan before writing specs
- an agent should propose initial spec boundaries
- a legacy repo needs gradual SpecDD coverage

## Steps

### 1. Check whether SpecDD is already bootstrapped

The agent should check for:

```text
.specdd/bootstrap.md
```

If it exists, the repository is already a SpecDD project. Use `specdd-adopt` only for explicit framework updates. For
normal spec writing, switch to `specdd-author`. For implementation, use `specdd-do` or another task-specific skill.

### 2. Use the CLI only for requested setup or updates

For initial setup, the CLI command is:

```sh
specdd init
```

For framework updates, the CLI command is:

```sh
specdd update
```

The agent should not manually copy, install, update, or edit SpecDD framework bootstrap files outside the CLI.

### 3. Read bootstrap after initialization

After `specdd init`, or after `specdd update` when framework files changed, the agent should read the active bootstrap
chain before proposing specs:

```text
.specdd/bootstrap.md
.specdd/bootstrap.project.md
.specdd/bootstrap.local.md
```

This ensures later spec authoring follows the actual project rules.

### 4. Inspect only enough repository shape

Adoption planning does not require reading the entire repository.

Useful first-pass context:

- top-level directories
- manifests and build files
- test directories
- docs and architecture notes
- major entry points
- high-change or high-risk areas named by the user

The goal is to choose a small adoption scope, not to reverse-engineer every file.

### 5. Propose the smallest useful initial specs

Most projects should start with:

- a root project spec named after the selected content root
- one local spec near the next area of active work

Example:

```text
travel-planner/
  travel-planner.sdd
  src/trips/itinerary.sdd
```

Start where missing context already costs time: a module under active change, a workflow with subtle business rules, or
an area where agents often make wrong edits.

### 6. Create specs only after approval

The agent should create `.sdd` files only when the adoption scope is explicitly requested or approved.

Generated adoption specs should be short, local, behavioral, and constraint-oriented. They should label assumptions
instead of presenting guessed behavior as active contracts.

## Agent prompt

Use one prompt for adoption planning:

```text
Plan a small SpecDD adoption for this repository.
```

Use a separate prompt if you approve creating files:

```text
Create the approved initial SpecDD specs.
```

## Common mistakes

- Using `specdd-adopt` for normal work in an already bootstrapped project.
- Manually editing framework bootstrap files instead of using the CLI for setup or updates.
- Trying to specify the whole repository at once.
- Creating local specs before a root project spec exists.
- Presenting guessed legacy behavior as a reviewed contract.
- Changing implementation files during adoption planning.

## How to verify the result

Adoption was handled correctly when:

- bootstrap status was checked
- CLI setup or update ran only when requested
- bootstrap files were read after initialization or changed update
- the adoption scope is small and reviewable
- proposed specs have clear local boundaries
- assumptions are marked
- implementation files were not changed unless explicitly requested

## Related how-tos

- [How to add SpecDD to an existing project](/how-to/install-and-setup/how-to-add-specdd-to-an-existing-project/)
- [How to initialize SpecDD in a new project](/how-to/install-and-setup/how-to-initialize-specdd-in-a-new-project/)
- [How to author and revise specs](/how-to/work-with-specdd-skills/how-to-author-and-revise-specs-specdd-author/)
- [How to use the CLI through an agent](/how-to/work-with-specdd-skills/how-to-use-the-cli-through-an-agent-specdd-cli/)

## Related reference

- [Quickstart](/quickstart/)
- [Tools](/tools/)
