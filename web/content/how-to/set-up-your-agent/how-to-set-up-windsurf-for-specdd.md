---
title: "How to set up Windsurf for SpecDD"
seoDescription: "Set up Windsurf for spec-driven development by deploying universal Agent Skills, confirming bootstrap files, and verifying Cascade can work from .sdd specs."
excerpt: "Deploy SpecDD universal Agent Skills for Windsurf, open the SpecDD project root, and verify Cascade can orient and plan from local specs."
level: "Beginner"
howtoID: "1021004"
weight: 70
---

This guide shows you how to set up Windsurf for SpecDD using the universal Agent Skills package.

Agent Skills give Cascade SpecDD workflow knowledge. The project bootstrap files and `.sdd` specs remain the source of
truth for intent, constraints, local authority, and verification.

Source and install details: [github.com/specdd/agentskills](https://github.com/specdd/agentskills)

## Prerequisites

Before you start, make sure you have:

- Windsurf installed
- the SpecDD CLI installed
- a project where SpecDD is initialized or can be initialized

## Steps

### 1. Initialize SpecDD

From the project root:

```bash
specdd init
```

This creates:

```text
AGENTS.md
CLAUDE.md
.specdd/
  bootstrap.md
  bootstrap.project.md
  bootstrap.local.md
```

Add a root `.sdd` file named after the selected content root directory if one does not exist yet.

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

Use this when you are preparing a repository before opening it in Windsurf.

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
target skills directory Windsurf reads.

### 5. Open the project root in Windsurf

Open the folder that contains:

```text
AGENTS.md
.specdd/
<root-name>.sdd
```

Opening a nested folder can make `/` paths and inherited specs resolve from the wrong place.

### 6. Verify Cascade can use SpecDD

Use a small orientation request:

```text
Orient in this SpecDD project.
```

Then ask about a real spec:

```text
Explain the Itinerary spec.
```

Cascade should describe relevant specs, constraints, allowed files, and verification before changing code.

### 7. Use a small setup check

After orientation works, test one small planned change:

```text
Plan the Itinerary validation change.
```

```text
Implement the open validation task.
```

## Common mistakes

- Deploying Agent Skills to a directory Windsurf does not read.
- Skipping `specdd init` before testing SpecDD behavior.
- Opening only a nested source folder.
- Manually copying the package wrapper instead of the `specdd-*` skill directories.
- Skipping the orientation check after deployment.

## How to verify the result

Windsurf is ready for SpecDD when:

- `.agents/skills` or `~/.agents/skills` contains the SpecDD skills
- the project has `.specdd/bootstrap.md`
- orientation and explanation requests mention relevant `.sdd` specs
- planning responses identify allowed files, constraints, and checks
- implementation stays inside the paths allowed by the local spec

## Related how-tos

- [How to install SpecDD universal Agent Skills for any agent](/how-to/set-up-your-agent/how-to-install-specdd-universal-agent-skills-for-any-agent/)
- [How to verify an agent has loaded SpecDD skills correctly](/how-to/set-up-your-agent/how-to-verify-an-agent-has-loaded-specdd-skills-correctly/)
- [How to use spec-driven development with humans and agents](/how-to/getting-started/how-to-use-spec-driven-development-with-humans-and-agents/)

## Related reference

- [Tools](/tools/)
- [Quickstart](/quickstart/)
