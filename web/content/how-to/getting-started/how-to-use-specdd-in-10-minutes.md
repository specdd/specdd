---
title: "How to use SpecDD in 10 minutes"
seoDescription: "Use spec-driven development in 10 minutes by installing the CLI, initializing a project, adding a root spec, writing one local .sdd file, and prompting an agent for a small change."
excerpt: "Set up SpecDD quickly by installing the CLI, running init, adding a root spec and one local spec, then asking an agent to complete a bounded change."
level: "Beginner"
howtoID: "1001003"
weight: 40
---

This guide shows the fastest useful path into spec-driven development with SpecDD: install the CLI, initialize a
project, add a root spec, add one local same-basename spec, and ask a contributor or agent to complete a focused change.

You can do this in a new project or in an existing project around the next file you plan to change.

## Prerequisites

Before you start, make sure you have:

- a Git repository or project folder
- a contributor or agent that can read project files
- Node.js 22 or newer if you install the CLI with npm or Yarn

Other CLI install paths are available on the [tools page](/tools/).

{{< protip title="Setup tip" >}}
Name the root spec after the selected content root directory. If the folder is `travel-planner`, the root spec is
`travel-planner.sdd`.
{{< /protip >}}

## Steps

### 1. Install the CLI

Install SpecDD with npm:

```bash
npm install --global specdd
```

Or use another supported install path from the tools page, such as Yarn, Homebrew, Docker Hub, or GitHub Container
Registry.

Verify that the command is available:

```bash
specdd --help
```

### 2. Initialize SpecDD

Choose the folder you want SpecDD to govern. This folder is the selected content root.

From that folder, run:

```bash
specdd init
```

The initialization creates the agent entrypoint files and bootstrap directory:

```text
AGENTS.md
CLAUDE.md
.specdd/
  bootstrap.md
  bootstrap.project.md
  bootstrap.local.md
```

`AGENTS.md` is the normal agent entrypoint. `CLAUDE.md` points Claude-style workflows to `AGENTS.md`. The `.specdd`
bootstrap files explain the SpecDD operating rules, so daily prompts can stay focused on the actual task.

### 3. Add a root spec

Create one root `.sdd` file named after the selected content root directory.

If your project folder is named `travel-planner`, create:

```text
travel-planner.sdd
```

Start small:

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

The root spec gives the project a top-level contract. Do not turn it into a full file inventory.

### 4. Add one local spec

Pick one real file you want to change. Add a same-basename `.sdd` file beside it.

```text
src/trips/itinerary.js
src/trips/itinerary.sdd
```

Write a small local spec:

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

This is enough to run the first loop.

### 5. Ask an agent for a bounded change

Use a focused prompt:

```text
Complete the open task in the Itinerary spec.
```

The prompt names the work in human terms. The project instructions and specs provide the SpecDD workflow and
boundaries.

### 6. Review the result

Before accepting the change, check:

- the agent modified only the files allowed by the local spec
- the implementation satisfies the `Must` rules
- the implementation does not violate `Must not`
- the scenario is covered by a useful check
- task status changed only after verification

If the work revealed a missing rule, update the spec before moving on.

## Common beginner mistakes

- Forgetting that the root spec filename must match the content root directory.
- Writing a root spec that tries to describe every file in the project.
- Repeating bootstrap instructions in the task prompt.
- Combining several instructions into one prompt.
- Treating `Can read` or `References` as permission to modify another area.
- Asking for a broad refactor as the first SpecDD task.

## Related how-tos

- [How to write your first .sdd spec](/how-to/getting-started/how-to-write-your-first-sdd-spec/)
- [How to run your first spec-driven change end to end](/how-to/getting-started/how-to-run-your-first-spec-driven-change-end-to-end/)
- [How to choose your first SpecDD use case](/how-to/getting-started/how-to-choose-your-first-specdd-use-case/)

## Related reference

- [Quickstart](/quickstart/)
- [Tools](/tools/)
- [Language reference](/language-reference/)
