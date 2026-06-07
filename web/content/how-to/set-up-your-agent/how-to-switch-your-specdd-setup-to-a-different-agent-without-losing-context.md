---
title: "How to switch your SpecDD setup to a different agent without losing context"
seoDescription: "Switch spec-driven development from one coding agent to another without losing context by keeping specs in Git, installing the new agent path, and verifying resolution."
excerpt: "Move from one agent to another by preserving .sdd specs and bootstrap files, installing the right plugin or Agent Skills path, and verifying spec-aware behavior."
level: "Beginner"
howtoID: "1021012"
weight: 130
---

This guide shows you how to switch a SpecDD project from one agent to another without losing the useful context.

SpecDD is agent-agnostic. The durable context lives in Git as `.sdd` specs and bootstrap files, not in a hosted memory
silo or one vendor's plugin format.

## Short answer

Do not migrate the project context into a new prompt. Keep `AGENTS.md`, `.specdd/`, and `.sdd` files in the repository.
Then install the new agent's dedicated plugin, universal Agent Skills, or file-aware setup and verify that it can orient
from the same specs.

## Steps

### 1. Check the project source of truth

Before switching agents, make sure the repository contains:

```text
AGENTS.md
.specdd/
  bootstrap.md
  bootstrap.project.md
<root-name>.sdd
```

Also check that local specs exist near the areas you expect the new agent to work on.

### 2. Keep personal bootstrap local

Shared project conventions belong in:

```text
.specdd/bootstrap.project.md
```

Personal or machine-specific preferences belong in:

```text
.specdd/bootstrap.local.md
```

Do not move durable project rules into an agent-specific prompt while switching tools.

### 3. Choose the new setup path

Use a dedicated plugin for:

- Codex
- Claude Code
- GitHub Copilot
- Antigravity
- Junie
- Cline

Use universal Agent Skills for Agent Skills-compatible clients such as Cursor, Windsurf, Gemini CLI, OpenCode, and other
supported clients.

Use file-aware setup when the agent can read project files but does not support skills.

### 4. Install the new agent path

For universal Agent Skills:

```bash
specdd agentskills deploy
```

To deploy into another project directory:

```bash
specdd agentskills deploy path/to/project
```

For user-level universal skills:

```bash
specdd agentskills deploy --user
```

For manual installation, clone the universal Agent Skills package and copy the `specdd-*` skill directories into the
target client's skills directory.

For dedicated plugins, follow the setup guide for the target agent.

### 5. Open the same content root

Open the same project root or selected content root you used with the previous agent.

Changing the root can change how `/` paths, root specs, and inherited spec chains are resolved.

### 6. Verify the new agent

Use:

```text
Orient in this SpecDD project.
```

Then test one known spec:

```text
Explain the Itinerary spec.
```

Compare the answer to the previous agent's understanding. The exact wording can differ, but the relevant constraints
and local authority should match.

## Common mistakes

- Opening a different folder and accidentally changing the selected content root.
- Assuming a successful plugin install means the agent has found the project specs.
- Installing the new agent path but leaving the old agent's project-local skills as the only configured skills.
- Comparing agents with different target specs or different repository roots.

## How to verify the result

The switch worked when:

- the same `.sdd` files govern the work
- the new agent can orient from the project files
- plans identify the same allowed paths and constraints
- implementation does not depend on the previous agent's conversation history

## Related how-tos

- [How to choose between a dedicated plugin and universal Agent Skills](/how-to/set-up-your-agent/how-to-choose-between-a-dedicated-plugin-and-universal-agent-skills/)
- [How to install SpecDD universal Agent Skills for any agent](/how-to/set-up-your-agent/how-to-install-specdd-universal-agent-skills-for-any-agent/)
- [How to use spec-driven development with humans and agents](/how-to/getting-started/how-to-use-spec-driven-development-with-humans-and-agents/)

## Related reference

- [Tools](/tools/)
- [Quickstart](/quickstart/)
