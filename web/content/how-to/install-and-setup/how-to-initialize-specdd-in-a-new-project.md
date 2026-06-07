---
title: "How to initialize SpecDD in a new project"
seoDescription: "Initialize spec-driven development in a new project with specdd init, review the generated bootstrap and agent files, add a root spec, and verify the setup."
excerpt: "Run `specdd init`, review the generated bootstrap and agent files, commit the shared setup files, add a root spec, and verify the new project is ready."
level: "Beginner"
howtoID: "1011002"
weight: 30
---

This guide shows how to initialize SpecDD in a new project so humans and agents share the same local
specification context from the beginning.

## Prerequisites

Before you start, make sure you have:

- a project directory or a path where the project should be created
- the SpecDD CLI installed
- Git, if you plan to commit the generated setup files

## Steps

### 1. Choose the content root

The content root is the directory SpecDD will govern. For most projects, this is the repository root.

Example:

```text
travel-planner/
```

The root spec must later be named after that directory:

```text
travel-planner.sdd
```

### 2. Initialize the current directory

From the project root, run:

```bash
specdd init
```

To initialize another directory, pass the path:

```bash
specdd init path/to/project
```

If the target directory does not exist, `specdd init` creates it. If the target already contains
`.specdd/bootstrap.md`, the CLI treats it as already initialized and stops.

### 3. Review the generated files

Initialization creates the agent entrypoint files and bootstrap directory:

```text
AGENTS.md
CLAUDE.md
.specdd/
  bootstrap.md
  bootstrap.project.md
  bootstrap.local.md
  .gitignore
```

`AGENTS.md` is the normal agent entrypoint. `CLAUDE.md` points Claude-style workflows to `AGENTS.md`.

The bootstrap files load in this order:

```text
.specdd/bootstrap.md
-> .specdd/bootstrap.project.md
-> .specdd/bootstrap.local.md
```

Use `.specdd/bootstrap.project.md` for shared project conventions. Use `.specdd/bootstrap.local.md` for personal or
machine-specific preferences.

### 4. Commit the shared setup files

Commit the shared framework files:

```bash
git add AGENTS.md CLAUDE.md .specdd/bootstrap.md .specdd/bootstrap.project.md .specdd/.gitignore
```

Do not commit `.specdd/bootstrap.local.md`. The generated `.specdd/.gitignore` ignores `bootstrap.local.md` so local
operator preferences stay local.

### 5. Add the root spec

Create one root `.sdd` file named after the content root directory.

For a project named `travel-planner`, create:

```text
travel-planner.sdd
```

Start with a small project-level contract:

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

The root spec should describe the project boundary. Do not turn it into a full inventory of every file.

### 6. Verify the setup

Run:

```bash
specdd --help
specdd inspect .
```

Then check:

- `.specdd/bootstrap.md` exists
- `.specdd/bootstrap.project.md` exists
- `.specdd/.gitignore` ignores `bootstrap.local.md`
- `AGENTS.md` points agents to `.specdd/bootstrap.md`
- the root `.sdd` filename matches the content root directory name

## Common mistakes

- Initializing a nested folder when the repository root should be the SpecDD content root.
- Committing `.specdd/bootstrap.local.md`.
- Naming the root spec after the repository display name instead of the actual directory basename.
- Putting team conventions in the root spec instead of `.specdd/bootstrap.project.md`.

## Related how-tos

- [How to install the SpecDD CLI](/how-to/install-and-setup/how-to-install-the-specdd-cli/)
- [How to structure a SpecDD project layout](/how-to/install-and-setup/how-to-structure-a-specdd-project-layout/)
- [How to verify your SpecDD setup is correct](/how-to/install-and-setup/how-to-verify-your-specdd-setup-is-correct/)

## Related reference

- [Quickstart](/quickstart/)
- [Tools](/tools/)
- [Language reference](/language-reference/)
