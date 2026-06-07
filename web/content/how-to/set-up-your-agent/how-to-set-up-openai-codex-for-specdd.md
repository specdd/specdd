---
title: "How to set up OpenAI Codex for SpecDD"
seoDescription: "Set up OpenAI Codex for spec-driven development by installing the dedicated Codex plugin, checking bootstrap files, and verifying SpecDD skills."
excerpt: "Install the SpecDD Codex plugin from the marketplace, open a SpecDD project, and verify Codex can orient, plan, implement, and review against local specs."
level: "Beginner"
howtoID: "1021001"
weight: 40
---

This guide shows you how to set up OpenAI Codex for SpecDD so Codex can work from local `.sdd` contracts instead of
relying on long prompts.

The dedicated Codex plugin packages the shared SpecDD skills for Codex's plugin system. In the SpecDD tools reference,
this is the documented Codex install path.

## Prerequisites

Before you start, make sure you have:

- Codex installed
- a SpecDD project, or the SpecDD CLI available to initialize one
- access to install Codex plugins

## Steps

### 1. Check the project setup

From the project root, confirm that SpecDD has been initialized:

```text
AGENTS.md
CLAUDE.md
.specdd/
  bootstrap.md
  bootstrap.project.md
```

If those files are missing, initialize the project:

```bash
specdd init
```

Then add or confirm the root `.sdd` file named after the selected content root directory.

### 2. Install the Codex plugin

Source and install details: [github.com/specdd/plugin-codex](https://github.com/specdd/plugin-codex)

Install the SpecDD marketplace and plugin:

```bash
codex plugin marketplace add specdd/specdd --ref main
codex plugin add specdd@specdd
```

The plugin exposes the shared SpecDD skills for orientation, planning, implementation, review, tests, docs, tracing,
task management, risk assessment, refactoring, debugging, and CLI-assisted setup work.

### 3. Open the project in Codex

Start Codex in the repository root or selected content root.

SpecDD is path-based. The root matters because bootstrap files, root specs, and `/` paths are resolved from that
selected content root.

### 4. Verify SpecDD skill behavior

Use a small request:

```text
Orient in this SpecDD project.
```

For a project with an existing feature spec, ask:

```text
Explain the Itinerary spec.
```

Codex should report the relevant bootstrap/spec context, describe the authority it found, and avoid jumping straight to
unrequested edits.

### 5. Use task-focused prompts

After setup, keep prompts short:

```text
Plan the Itinerary validation change.
```

```text
Implement the open validation task.
```

SpecDD is an amazing way to keep these prompts small because the durable context lives in Git beside the code.

## Common mistakes

- Installing the plugin but testing outside a SpecDD-initialized project.
- Running the marketplace command but not adding the plugin afterward.
- Starting Codex from a nested folder instead of the selected content root.
- Skipping the orientation check after plugin installation.

## How to verify the result

Codex is ready for SpecDD when:

- the plugin install commands complete
- the project contains `.specdd/bootstrap.md`
- orientation and explanation requests mention SpecDD context
- plans identify allowed files, inherited constraints, and verification steps

## Related how-tos

- [How to install SpecDD universal Agent Skills for any agent](/how-to/set-up-your-agent/how-to-install-specdd-universal-agent-skills-for-any-agent/)
- [How to choose between a dedicated plugin and universal Agent Skills](/how-to/set-up-your-agent/how-to-choose-between-a-dedicated-plugin-and-universal-agent-skills/)
- [How to use spec-driven development with humans and agents](/how-to/getting-started/how-to-use-spec-driven-development-with-humans-and-agents/)

## Related reference

- [Tools](/tools/)
- [Quickstart](/quickstart/)
