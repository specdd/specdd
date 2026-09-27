---
title: Quickstart
seoDescription: "This quickstart walks through the smallest useful SpecDD setup for spec-driven development."
---

SpecDD is a lightweight framework for spec-driven development. It uses small, local `.sdd`
files beside the code, docs, workflows, or infrastructure they describe, so humans and AI agents can
share the same source of truth for intent, requirements, boundaries, and completion criteria.

This quickstart walks through the smallest useful SpecDD setup: install the command-line interface (CLI),
initialize a project, add one root spec, add one local same-basename spec, and ask an AI coding agent to complete
a focused change from those specs. You can do this in a new project or add it gradually to an
existing project around the next area you plan to change.

It demonstrates a small spec-driven development loop: create a spec, check it, and ask for a
bounded implementation.

The point is to stop making the prompt carry all project context. Prompts are temporary and easy to
misread; specs live in the repository where they can be reviewed, updated, inherited, and reused
across tools and sessions. By the end, you will have a minimal project contract that tells an agent
what it may change, what behavior must hold, and what is out of scope before implementation starts.

## Before you start

You need Node.js 22 or newer, npm, and an AI coding agent that can read and edit project files and run checks.
See the [tools guide](./TOOLS.md) for agent setup and other CLI installation options.

## 1. Install

```bash
npm install --global specdd
```

## 2. Initialize

Choose the folder you want SpecDD to govern. This is the selected content root.

For an existing project, use its root folder. For a new project, create a folder first. The examples below use
`travel-planner/`; adapt the names and spec contents to your project.

From that folder:

```bash
specdd init
```

This creates the files agents need to start correctly:

```text
AGENTS.md
CLAUDE.md
.specdd/
  bootstrap.md
  bootstrap.project.md
  bootstrap.local.md
```

`AGENTS.md` is the normal agent entrypoint. `CLAUDE.md` points Claude to `AGENTS.md`.

The `.specdd/` files contain the rules agents follow before they edit anything. `bootstrap.md` is framework-managed.
Put shared project rules in `.specdd/bootstrap.project.md`, such as code style, commands, syntax choices, and where to
find things. Put your own preferences in `.specdd/bootstrap.local.md`.

## 3. Add the first spec

Create one root `.sdd` file named after the selected content root directory.

Example for a folder named `travel-planner/`:

```text
travel-planner/
  AGENTS.md
  CLAUDE.md
  .specdd/
    bootstrap.md
    bootstrap.project.md
    bootstrap.local.md
  travel-planner.sdd
```

Start with the big picture. Do not list every file.

For the example, save the following content as `travel-planner.sdd` in the root folder:

```sdd
Spec: Travel Planner

Purpose:
  Help people plan trips and keep itinerary items organized.

Structure:
  ./src: Project source files
  ./tests: Project checks

Must:
  Trips can be created and reviewed.
  Itinerary items remain grouped by trip day.

Must not:
  Booking and ticket purchases are outside Travel Planner.
```

## 4. Add a local spec

When work gets specific, add a nearby spec for the part being changed.

A local spec can describe existing code or code you intend to create. The spec and implementation file share a
basename: the filename without its final extension. For example:

```text
src/trips/itinerary.js
src/trips/itinerary.sdd
```

Create `src/trips/` if needed, then save the following spec as `src/trips/itinerary.sdd`. Its `Owns` entry authorizes
creating `itinerary.js` if it is missing or updating it if it already exists.

```sdd
Spec: Itinerary

Purpose:
  Keep a trip itinerary organized by day.

Owns:
  ./itinerary.js

Must:
  Valid itinerary items are stored with a place name and trip date.
  Itinerary items appear in chronological order.

Must not:
  Destination search results are outside Itinerary.

Tasks:
  [ ] Create or update itinerary storage with missing-place validation.

Done when:
  The missing-place scenario passes.

Scenario: missing place name
  Given the place name is empty
  When the person adds the itinerary item
  Then validation fails
  And no itinerary item is stored
```

## 5. Review the specs

Before asking the agent to implement the task, read both specs and confirm that:

- `Owns` lists the implementation file the agent should create or change.
- The requirements and scenario describe the intended behavior, including any existing behavior you need to preserve.
- The task defines the work to complete now, and `Done when` states how to verify completion.

Revise the specs before proceeding if they do not match your intent.

## 6. Ask for a small change

Open your coding agent in the project folder and give it a focused request:

```text
Read AGENTS.md, find the SpecDD rules for src/trips/itinerary.sdd, and complete its open task.
Create the owned implementation file if it is missing; otherwise, make the smallest changes needed.
Report the files changed, checks run, and results.
```

The agent should read the relevant specs, confirm ownership and modification permission for project files, make the
smallest correct change, run useful checks, and mark the task done only after the checks pass.

## 7. Verify the result

Review the changed files and the agent's check results. Confirm that:

- `src/trips/itinerary.js` satisfies the local spec.
- A passing check demonstrates that an empty place name causes validation to fail and no itinerary item is stored.
- The task in `src/trips/itinerary.sdd` is marked `[x]` only after the checks pass.

If a check fails or the implementation does not match the spec, ask the agent to correct it and rerun the checks before
accepting the change.

## 8. Explore tools, plugins, and guides

Build on your first change by exploring the resources that fit your project:

- Explore [tools and integrations](./TOOLS.md) for editor support, agent skills, and CLI options.
- Extend SpecDD with [framework plugins](./PLUGINS.md), including Domain & Solution Design (DSD) for defining domains
  and designing solutions before writing implementation specs.
- Read the [main documentation](./README.md) to understand how specs, inheritance, ownership, and the development
  workflow fit together.
- Browse [how-to guides](./web/content/how-to/_index.md) for practical tasks and
  [articles](./web/content/articles/_index.md) for deeper explanations and use cases.
- Follow [project news](./web/content/news/_index.md) and the [changelog](./CHANGELOG.md) for releases and updates.

## Writing tips

- Describe lasting behavior and boundaries in specs. Put work items in `Tasks`.
- Include only sections and entries that affect implementation, review, or verification. Avoid repeating inherited rules.
- Put shared project instructions in `.specdd/bootstrap.project.md` and personal preferences in `.specdd/bootstrap.local.md`.
- Keep syntax simple: exact section labels, two-space body indentation, whole-line comments, and task markers like `[ ]`
  or `[x]`.

See the [section reference](./README.md#section-reference) for detailed section meanings and the
[language reference](./LANGUAGE.md) for syntax.
