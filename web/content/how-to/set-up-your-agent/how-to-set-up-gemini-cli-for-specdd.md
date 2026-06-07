---
title: "How to set up Gemini CLI for SpecDD"
seoDescription: "Set up Gemini CLI for spec-driven development by deploying universal Agent Skills, opening a SpecDD project root, and verifying spec-aware planning."
excerpt: "Deploy SpecDD universal Agent Skills for Gemini CLI, confirm bootstrap files are present, and verify Gemini can orient and plan against local specs."
level: "Beginner"
howtoID: "1021005"
weight: 80
---

This guide shows you how to set up Gemini CLI for SpecDD using universal Agent Skills.

Gemini CLI is listed as an Agent Skills-compatible client in the SpecDD tools reference, so the portable Agent Skills
package is the right setup path.

Source and install details: [github.com/specdd/agentskills](https://github.com/specdd/agentskills)

## Prerequisites

Before you start, make sure you have:

- Gemini CLI installed
- the SpecDD CLI installed
- a project initialized with SpecDD, or a project where you can initialize it

## Steps

### 1. Initialize the project

From the selected content root:

```bash
specdd init
```

Then create or confirm the root `.sdd` file named after that directory.

### 2. Deploy SpecDD Agent Skills

Install skills into the current project's Agent Skills directory:

```bash
specdd agentskills deploy
```

The skills are installed into:

```text
.agents/skills
```

### 3. Deploy into another project directory

Install into another project path:

```bash
specdd agentskills deploy path/to/project
```

Use this when you are preparing a repository before starting Gemini CLI there.

### 4. Use user-level or manual install

For a user-level install:

```bash
specdd agentskills deploy --user
```

That installs into:

```text
~/.agents/skills
```

Use the install location your Gemini CLI setup reads.

For manual installation, clone the universal Agent Skills package and copy the `specdd-*` skill directories into the
target skills directory Gemini CLI reads.

### 5. Start Gemini CLI in the project root

Run Gemini CLI from the folder that contains `.specdd/bootstrap.md`.

SpecDD inheritance depends on the target path and selected content root. Starting in the wrong folder makes it easier
for an agent to miss the root spec or resolve paths incorrectly.

### 6. Verify orientation

Use a small request:

```text
Orient in this SpecDD project.
```

Then ask about a real local spec:

```text
Explain the Itinerary spec.
```

The response should describe relevant specs and constraints, not only summarize files.

### 7. Use narrow implementation prompts

Use one task at a time:

```text
Plan the Itinerary validation change.
```

```text
Implement the open validation task.
```

## Common mistakes

- Deploying skills to `.agents/skills` when your Gemini CLI setup only reads user-level skills.
- Manually copying the wrong directory instead of the `specdd-*` skills.
- Starting Gemini CLI outside the selected content root.
- Skipping the orientation check after deployment.

## How to verify the result

Gemini CLI is ready for SpecDD when:

- the SpecDD skills are installed in the skills directory Gemini CLI reads
- the project contains `.specdd/bootstrap.md`
- orientation names the active SpecDD context
- implementation plans identify authority, constraints, and checks

## Related how-tos

- [How to install SpecDD universal Agent Skills for any agent](/how-to/set-up-your-agent/how-to-install-specdd-universal-agent-skills-for-any-agent/)
- [How to verify an agent has loaded SpecDD skills correctly](/how-to/set-up-your-agent/how-to-verify-an-agent-has-loaded-specdd-skills-correctly/)
- [How to use spec-driven development with humans and agents](/how-to/getting-started/how-to-use-spec-driven-development-with-humans-and-agents/)

## Related reference

- [Tools](/tools/)
