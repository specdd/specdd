---
title: "How to set up Claude Code for SpecDD"
seoDescription: "Set up Claude Code for spec-driven development by installing the dedicated plugin, checking project bootstrap files, and verifying that Claude can use SpecDD skills."
excerpt: "Install the Claude Code SpecDD plugin, confirm the project has SpecDD bootstrap files, and verify Claude can orient, plan, implement, and review against specs."
level: "Beginner"
howtoID: "1021000"
weight: 30
---

This guide shows you how to set up Claude Code for SpecDD so Claude can use the same `.sdd` contracts that humans
review in the repository.

The dedicated Claude Code plugin packages the shared SpecDD skills for Claude's plugin system. In the SpecDD tools
reference, this is the documented Claude Code install path.

## Prerequisites

Before you start, make sure you have:

- Claude Code installed
- a project initialized with SpecDD, or the SpecDD CLI available so you can initialize one
- Git, if you plan to commit the generated SpecDD setup files

## Steps

### 1. Check that SpecDD is initialized

In the project root, check for the normal SpecDD entrypoint files:

```text
AGENTS.md
CLAUDE.md
.specdd/
  bootstrap.md
  bootstrap.project.md
```

If the project is not initialized yet, run:

```bash
specdd init
```

`CLAUDE.md` points Claude-style workflows to `AGENTS.md`. The bootstrap files explain how agents resolve specs, inherit
constraints, and stay inside local authority.

### 2. Install the Claude Code plugin

Source and install details: [github.com/specdd/plugin-claude](https://github.com/specdd/plugin-claude)

Install the SpecDD plugin from the SpecDD marketplace:

```bash
claude plugin marketplace add specdd/specdd
claude plugin install specdd@specdd
```

This installs the SpecDD skills generated for Claude Code from the shared SpecDD agent plugin source.

### 3. Open the SpecDD project

Start Claude Code from the project root, or open the repository folder that contains the SpecDD bootstrap files.

The project root matters because SpecDD resolves `/` paths from the selected content root, and the root `.sdd` file must
be named after that content root directory.

### 4. Verify the plugin is available

Use a small orientation request:

```text
Orient in this SpecDD project.
```

Claude should be able to explain the active project context, mention the bootstrap chain, and describe the local specs
it used for the target or task. For a project with a real feature spec, you can also ask:

```text
Explain the Itinerary spec.
```

### 5. Use short task prompts

After setup, keep prompts focused on the actual work:

```text
Plan the Itinerary validation change.
```

```text
Implement the open validation task.
```

The plugin and project files carry the SpecDD workflow. The prompt should name the spec, feature, or task in human
terms.

## Common mistakes

- Installing the plugin before initializing the project, then testing in a folder with no `.specdd/bootstrap.md`.
- Starting Claude Code from a nested folder when the project root is the selected content root.
- Confusing the Claude Code plugin install with `specdd init`; the project still needs bootstrap files.
- Skipping the orientation check after plugin installation.

## How to verify the result

Claude Code is ready for SpecDD when:

- the plugin install commands complete successfully
- the project contains `AGENTS.md`, `CLAUDE.md`, and `.specdd/bootstrap.md`
- an orientation request produces a SpecDD-aware explanation
- implementation plans mention relevant specs, allowed paths, constraints, and checks

## Related how-tos

- [How to set up OpenAI Codex for SpecDD](/how-to/set-up-your-agent/how-to-set-up-openai-codex-for-specdd/)
- [How to verify an agent has loaded SpecDD skills correctly](/how-to/set-up-your-agent/how-to-verify-an-agent-has-loaded-specdd-skills-correctly/)
- [How to use spec-driven development with humans and agents](/how-to/getting-started/how-to-use-spec-driven-development-with-humans-and-agents/)

## Related reference

- [Tools](/tools/)
- [Quickstart](/quickstart/)
