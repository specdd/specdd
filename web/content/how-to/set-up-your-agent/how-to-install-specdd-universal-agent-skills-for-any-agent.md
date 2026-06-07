---
title: "How to install SpecDD universal Agent Skills for any agent"
seoDescription: "Install SpecDD universal Agent Skills for spec-driven development with the CLI for Agent Skills-compatible clients, including project-local and user-level deployment."
excerpt: "Deploy SpecDD universal Agent Skills into `.agents/skills` or `~/.agents/skills`, then verify your Agent Skills-compatible client can use them."
level: "Beginner"
howtoID: "1021010"
weight: 20
---

This guide shows you how to install the SpecDD universal Agent Skills package for a spec-driven development workflow in
clients that support the open Agent Skills format.

Use this path when your agent supports Agent Skills but does not have, or does not need, a dedicated SpecDD plugin.

Source and install details: [github.com/specdd/agentskills](https://github.com/specdd/agentskills)

## Prerequisites

Before you start, make sure you have:

- an Agent Skills-compatible client
- the SpecDD CLI installed
- a SpecDD project, if you want a project-local install

The SpecDD tools reference lists many Agent Skills-compatible clients, including Cursor, Gemini CLI, OpenCode, VS Code,
Claude, OpenHands, Roo Code, Kiro, Goose, Amp, Tabnine, TRAE, and others.

## Steps

### 1. Choose project-local or user-level install

Use a project-local install when skills should live with one repository:

```text
<project>/.agents/skills
```

Use a user-level install when your client reads shared user skills:

```text
~/.agents/skills
```

The right choice depends on where your agent client looks for Agent Skills.

### 2. Deploy project-local skills

From the project root, run:

```bash
specdd agentskills deploy
```

This installs the SpecDD skills into:

```text
.agents/skills
```

### 3. Deploy into another project directory

To deploy into a project that is not the current working directory:

```bash
specdd agentskills deploy path/to/project
```

This installs into that project's Agent Skills directory:

```text
path/to/project/.agents/skills
```

### 4. Deploy user-level skills

For a global user install:

```bash
specdd agentskills deploy --user
```

This installs into:

```text
~/.agents/skills
```

Use this when your client loads user Agent Skills across projects.

### 5. Install manually

For manual installation, clone the universal Agent Skills package and copy the `specdd-*` skill directories into the
target client's skills directory.

```bash
git clone https://github.com/specdd/agentskills.git /tmp/specdd-agentskills
cp -R /tmp/specdd-agentskills/specdd-* path/to/target-skills-dir/
```

Use this path only when the CLI deployment path does not match how your client reads skills.

### 6. Confirm the project has SpecDD bootstrap files

Agent Skills give the agent procedural knowledge. The project still needs SpecDD framework files and specs.

In a SpecDD project, you should have:

```text
AGENTS.md
.specdd/bootstrap.md
<root-name>.sdd
```

If the project has not been initialized yet:

```bash
specdd init
```

### 7. Verify the skills

Use:

```text
Orient in this SpecDD project.
```

Then ask for a small explanation:

```text
Explain the Itinerary spec.
```

The agent should respond with SpecDD-specific context rather than generic repository advice.

## Common mistakes

- Installing Agent Skills into `.agents/skills` when the client reads only `~/.agents/skills`.
- Installing skills without initializing the project.
- Manually copying the wrong directory instead of the `specdd-*` skill directories.
- Assuming universal Agent Skills replace dedicated plugins for every agent.
- Skipping the orientation check after deployment.

## How to verify the result

Universal Agent Skills are installed correctly when:

- the `specdd-*` skills are present in the directory your client reads
- the project contains `.specdd/bootstrap.md`
- orientation requests trigger SpecDD-specific behavior
- implementation plans mention specs, authority, constraints, and verification

## Related how-tos

- [How to choose between a dedicated plugin and universal Agent Skills](/how-to/set-up-your-agent/how-to-choose-between-a-dedicated-plugin-and-universal-agent-skills/)
- [How to verify an agent has loaded SpecDD skills correctly](/how-to/set-up-your-agent/how-to-verify-an-agent-has-loaded-specdd-skills-correctly/)
- [How to use SpecDD with agents that do not support skills](/how-to/set-up-your-agent/how-to-use-specdd-with-agents-that-do-not-support-skills/)

## Related reference

- [Tools](/tools/)
