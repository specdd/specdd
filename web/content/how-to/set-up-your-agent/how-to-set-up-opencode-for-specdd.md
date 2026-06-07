---
title: "How to set up OpenCode for SpecDD"
seoDescription: "Set up OpenCode for spec-driven development by deploying universal Agent Skills, confirming bootstrap files, and verifying OpenCode can use local .sdd specs."
excerpt: "Deploy SpecDD universal Agent Skills for OpenCode, open the project root, and verify OpenCode can orient, plan, and implement from local specs."
level: "Beginner"
howtoID: "1021006"
weight: 90
---

This guide shows you how to set up OpenCode for spec-driven development using the universal Agent Skills package.

OpenCode is listed as an Agent Skills-compatible client in the SpecDD tools reference, so use the portable Agent Skills
install path.

Source and install details: [github.com/specdd/agentskills](https://github.com/specdd/agentskills)

## Prerequisites

Before you start, make sure you have:

- OpenCode installed
- the SpecDD CLI installed
- a project with SpecDD initialized

## Steps

### 1. Initialize SpecDD

From the project root:

```bash
specdd init
```

Initialization creates the bootstrap files and agent entrypoints:

```text
AGENTS.md
CLAUDE.md
.specdd/
  bootstrap.md
  bootstrap.project.md
  bootstrap.local.md
```

### 2. Deploy universal Agent Skills

Install skills into the current project's Agent Skills directory:

```bash
specdd agentskills deploy
```

This creates:

```text
.agents/skills
```

### 3. Deploy into another project directory

Install into another project path:

```bash
specdd agentskills deploy path/to/project
```

Use this when you want to prepare a repository before opening it in OpenCode.

### 4. Use user-level or manual install

If OpenCode reads user-level Agent Skills in your environment, install there instead:

```bash
specdd agentskills deploy --user
```

For manual installation, clone the universal Agent Skills package and copy the `specdd-*` skill directories into the
target skills directory OpenCode reads.

### 5. Open the project root in OpenCode

Open or start OpenCode from the folder that contains the SpecDD bootstrap files and the root `.sdd` file.

This gives OpenCode the correct project boundary for path-based spec resolution.

### 6. Verify orientation

Use:

```text
Orient in this SpecDD project.
```

Then try:

```text
Explain the Itinerary spec.
```

OpenCode should describe the relevant SpecDD contract and identify useful constraints before implementation.

### 7. Run a small planned change

Start with a planning prompt:

```text
Plan the Itinerary validation change.
```

After the plan is right, ask for implementation:

```text
Implement the open validation task.
```

SpecDD helps keep this efficient because the local spec states the behavior, authority, and completion criteria.

## Common mistakes

- Installing Agent Skills in a directory OpenCode does not read.
- Manually copying the package wrapper instead of the `specdd-*` skills.
- Starting OpenCode from a nested package instead of the selected content root.
- Skipping the orientation check after deployment.

## How to verify the result

OpenCode is ready for SpecDD when:

- the SpecDD skills are installed in the appropriate Agent Skills directory
- `.specdd/bootstrap.md` exists in the project
- orientation and explanation requests mention `.sdd` specs
- implementation stays inside `Can modify` or `Owns`

## Related how-tos

- [How to install SpecDD universal Agent Skills for any agent](/how-to/set-up-your-agent/how-to-install-specdd-universal-agent-skills-for-any-agent/)
- [How to verify an agent has loaded SpecDD skills correctly](/how-to/set-up-your-agent/how-to-verify-an-agent-has-loaded-specdd-skills-correctly/)
- [How to use SpecDD with agents that do not support skills](/how-to/set-up-your-agent/how-to-use-specdd-with-agents-that-do-not-support-skills/)

## Related reference

- [Tools](/tools/)
