---
title: "How to set up Cursor for SpecDD"
seoDescription: "Set up Cursor for spec-driven development with universal Agent Skills, project bootstrap files, and verification prompts that confirm Cursor can work from .sdd specs."
excerpt: "Deploy SpecDD universal Agent Skills for Cursor, open the SpecDD project root, and verify Cursor can orient and plan from local specs."
level: "Beginner"
howtoID: "1021003"
weight: 60
---

This guide shows you how to set up Cursor for spec-driven development using the universal Agent Skills package.

Cursor is listed as an Agent Skills-compatible client in the SpecDD tools reference. Use the universal package when a
dedicated SpecDD plugin is not the right install path for your agent.

Source and install details: [github.com/specdd/agentskills](https://github.com/specdd/agentskills)

## Prerequisites

Before you start, make sure you have:

- Cursor installed
- the SpecDD CLI installed
- a project where SpecDD is initialized or can be initialized

## Steps

### 1. Initialize SpecDD in the project

From the project root:

```bash
specdd init
```

This creates the project entrypoint and bootstrap files:

```text
AGENTS.md
CLAUDE.md
.specdd/
  bootstrap.md
  bootstrap.project.md
  bootstrap.local.md
```

Commit the shared setup files, but keep `.specdd/bootstrap.local.md` local.

### 2. Deploy universal Agent Skills

From the project root, install SpecDD Agent Skills into the current project's Agent Skills directory:

```bash
specdd agentskills deploy
```

This installs skills into:

```text
.agents/skills
```

### 3. Deploy into another project directory

Install into a different project path:

```bash
specdd agentskills deploy path/to/project
```

This is useful when you are preparing a repository before opening it in Cursor.

### 4. Use user-level or manual install

For a user-level install, use:

```bash
specdd agentskills deploy --user
```

That installs into:

```text
~/.agents/skills
```

For manual installation, clone the universal Agent Skills package and copy the `specdd-*` skill directories into the
target skills directory Cursor reads.

### 5. Open the project root in Cursor

Open the folder that contains `AGENTS.md`, `.specdd/`, and the root `.sdd` file.

This matters because SpecDD resolves inherited specs from the selected content root down to the target path.

### 6. Verify Cursor can use SpecDD

Use a small orientation request:

```text
Orient in this SpecDD project.
```

For a real feature:

```text
Explain the Itinerary spec.
```

The response should identify SpecDD context and avoid treating the repository as unstructured source code.

### 7. Use concise prompts

Once Cursor is set up, use prompts that identify the work:

```text
Plan the Itinerary validation change.
```

```text
Implement the open validation task.
```

## Common mistakes

- Deploying Agent Skills globally but opening Cursor in an environment that only reads project-local skills.
- Manually copying the package wrapper instead of the `specdd-*` skill directories.
- Opening a nested folder instead of the SpecDD content root.
- Expecting Agent Skills to create specs automatically before the project has been initialized.
- Skipping the orientation check after deployment.

## How to verify the result

Cursor is ready for SpecDD when:

- `.agents/skills` or `~/.agents/skills` contains the SpecDD skills
- the project contains `.specdd/bootstrap.md`
- orientation and explanation requests mention relevant specs
- plans identify allowed edits, constraints, and checks

## Related how-tos

- [How to install SpecDD universal Agent Skills for any agent](/how-to/set-up-your-agent/how-to-install-specdd-universal-agent-skills-for-any-agent/)
- [How to verify an agent has loaded SpecDD skills correctly](/how-to/set-up-your-agent/how-to-verify-an-agent-has-loaded-specdd-skills-correctly/)
- [How to install the VS Code extension for .sdd files](/how-to/editor-setup/how-to-install-the-vs-code-extension-for-sdd-files/)

## Related reference

- [Tools](/tools/)
- [Quickstart](/quickstart/)
