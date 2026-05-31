# SpecDD Quickstart

SpecDD helps humans and AI agents change a project without guessing.

You add small `.sdd` files near the code, docs, workflows, or other project parts they describe. Each `.sdd` file is a
local contract: what this part is for, what it owns, what outcomes must hold, and what boundaries should not be crossed.

## 1. Install

```bash
npm install --global specdd
```

Other setup options are listed on the [tools page](https://specdd.ai/tools/).

## 2. Initialize

Choose the folder you want SpecDD to govern. This is the selected content root.

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

The `.specdd/` files contain the rules agents follow before they edit anything. Put shared project rules in
`.specdd/bootstrap.project.md`, such as code style, commands, syntax choices, and where to find things. Put your own
preferences in `.specdd/bootstrap.local.md`.

## 3. Add the First Spec

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

## 4. Add a Local Spec

When work gets specific, add a nearby spec for the part being changed.

Same-basename specs apply to matching files in the same directory:

```text
src/trips/itinerary.js
src/trips/itinerary.sdd
```

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
  [ ] Add missing-place validation.

Done when:
  The missing-place scenario is checked.

Scenario: missing place name
  Given the place name is empty
  When the person adds the itinerary item
  Then validation fails
  And no itinerary item is stored
```

## 5. Ask for a Small Change

Give the agent a focused request:

```text
Read AGENTS.md, find the SpecDD rules for src/trips/itinerary.sdd, and complete its open task.
```

The agent should read the relevant specs, confirm what it may edit, make the smallest correct change, run useful checks,
and mark the task done only after the checks pass.

## 6. Quick Tips

- A spec describes the thing that should remain after the work, not the ticket or prompt that created it.
- Put project-wide agent rules in `.specdd/bootstrap.project.md`.
- Put personal working preferences in `.specdd/bootstrap.local.md`.
- Use `Purpose` for a short summary of what the subject is for.
- Use `Owns` or `Can modify` for edit permission.
- Use `Can read` or `References` for context; they do not grant edit permission.
- Use `Must` for required outcomes and observable behavior.
- Use `Must not` for realistic local boundaries, not every unrelated thing the subject does not do.
- Use `Forbids` for blocked dependencies, paths, tools, libraries, or access.
- Use `Tasks` for local work items.
- Do not duplicate a rule by writing the same idea again in reverse.
- Apply specs from the selected content root down to the target. Sibling specs do not apply unless referenced.
- Use explicit paths: `./local`, `../parent`, or `/from-content-root`.
- Keep syntax simple: exact section labels, two-space body indentation, whole-line comments, and task markers like `[ ]`
  or `[x]`.

For full documentation, go to [SpecDD project homepage](https://specdd.ai) where you will find complete instructions
on how to adopt SpecDD.
