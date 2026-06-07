---
title: "How to add SpecDD to an existing project"
seoDescription: "Add spec-driven development to an existing repository safely with specdd init, preserve existing agent files, configure project rules, and start with one local spec."
excerpt: "Initialize SpecDD in a live repository, review skipped or generated files, keep local preferences out of Git, and start adoption around one real area."
level: "Beginner"
howtoID: "1011003"
weight: 40
---

This guide shows how to add SpecDD to an existing repository without turning the adoption into a broad rewrite.

SpecDD works well on existing projects because you can initialize the framework once, then introduce `.sdd` specs around
the next module, feature, service, workflow, or documentation area you actually plan to change.

## Prerequisites

Before you start, make sure you have:

- an existing project repository
- the SpecDD CLI installed
- a clean working branch or a clear diff you can review

## Steps

### 1. Start from a branch you can review

Before initializing, check the current diff:

```bash
git status --short
```

Use a branch or commit boundary that makes the setup files easy to inspect. SpecDD initialization is small, but it still
adds project instructions that future agents will follow.

### 2. Run init at the intended content root

From the repository root, run:

```bash
specdd init
```

If SpecDD should govern a subproject instead of the whole repository, initialize that subdirectory:

```bash
specdd init path/to/subproject
```

The selected content root is important because root specs, `/`-prefixed paths, and inherited spec context are resolved
from that boundary.

### 3. Review generated and skipped files

The current setup expects:

```text
AGENTS.md
CLAUDE.md
.specdd/
  bootstrap.md
  bootstrap.project.md
  bootstrap.local.md
  .gitignore
```

During init, existing non-bootstrap files are left unchanged. If your repository already had `AGENTS.md`, `CLAUDE.md`,
or local bootstrap files, review those files and add the generated `AGENTS.md` content manually where needed:

```md
Before working on this project, read `.specdd/bootstrap.md`.

Assume the role, rules, workflow, and implementation constraints described in SpecDD. Treat SpecDD specs as
source-adjacent development contracts, not optional documentation. Adhere to SpecDD rules unless explicitly
instructed otherwise.
```

Keep any existing agent instructions that are still valid. The goal is to wire SpecDD into the project, not erase useful
local guidance.

### 4. Put project conventions in bootstrap.project.md

Add shared team rules to:

```text
.specdd/bootstrap.project.md
```

Good project-wide rules include:

- build and test commands
- code style conventions
- naming conventions
- framework-specific constraints
- dependency policies
- where generated files or vendored files live

Do not put personal preferences there. Put those in `.specdd/bootstrap.local.md`, which is ignored by the generated
`.specdd/.gitignore`.

### 5. Add a root spec

Create a root `.sdd` file named after the content root directory.

If the content root is:

```text
travel-planner/
```

create:

```text
travel-planner.sdd
```

Start with a short project contract:

```sdd
Spec: Travel Planner

Purpose:
  Help people plan trips and keep itinerary items organized.

Structure:
  ./src: Application source files
  ./tests: Project checks

Must:
  Trips can be created and reviewed.

Must not:
  Booking and ticket purchases are outside Travel Planner.
```

### 6. Start adoption in one active area

Pick the next area you expect to change. For example:

```text
src/trips/itinerary.js
src/trips/itinerary.sdd
```

Add a small same-basename spec:

```sdd
Spec: Itinerary

Purpose:
  Keep a trip itinerary organized by day.

Owns:
  ./itinerary.js

Must:
  Itinerary items remain grouped by trip day.

Must not:
  Manage destination search results.
```

This gives the first real implementation area a local contract without requiring the whole repository to be fully
specified.

### 7. Verify the setup

Run:

```bash
specdd inspect .
```

Then check the diff:

```bash
git status --short
git diff
```

Commit only the shared setup and the first reviewed specs. Leave `.specdd/bootstrap.local.md` uncommitted.

## Common mistakes

- Initializing the wrong directory in a monorepo.
- Replacing existing agent instructions without reviewing them.
- Trying to spec the whole existing codebase before using SpecDD.
- Putting personal shell preferences in `.specdd/bootstrap.project.md`.
- Committing `.specdd/bootstrap.local.md`.

## Related how-tos

- [How to initialize SpecDD in a new project](/how-to/install-and-setup/how-to-initialize-specdd-in-a-new-project/)
- [How to structure a SpecDD project layout](/how-to/install-and-setup/how-to-structure-a-specdd-project-layout/)
- [How to choose your first SpecDD use case](/how-to/getting-started/how-to-choose-your-first-specdd-use-case/)

## Related reference

- [Quickstart](/quickstart/)
- [Tools](/tools/)
- [Language reference](/language-reference/)
