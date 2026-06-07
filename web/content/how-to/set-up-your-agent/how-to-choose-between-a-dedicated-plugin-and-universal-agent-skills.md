---
title: "How to choose between a dedicated plugin and universal Agent Skills"
seoDescription: "Choose the right spec-driven development agent setup path: a dedicated plugin for supported agents, universal Agent Skills for compatible clients, or file-aware fallback."
excerpt: "Pick a dedicated SpecDD plugin when your agent has one, universal Agent Skills for compatible clients, or plain file-aware setup when skills are unavailable."
level: "Beginner"
howtoID: "1021011"
weight: 10
---

This guide helps you choose the right SpecDD setup path for your agent: a dedicated plugin, universal Agent Skills, or
plain file-aware repository instructions.

All three paths keep the important SpecDD context in project files. The difference is how much procedural SpecDD
knowledge the agent can load automatically.

## Short answer

Use a dedicated plugin when SpecDD documents one for your agent. Use universal Agent Skills when your client supports
the Agent Skills standard and no dedicated plugin is needed. Use plain file-aware setup when the agent can read project
files but does not support skills.

## Steps

### 1. Choose a dedicated plugin when one exists

The SpecDD tools reference documents dedicated integrations for:

- Codex
- Claude Code
- GitHub Copilot
- Antigravity
- Junie
- Cline

Dedicated plugins package the same shared SpecDD skills for each supported agent's own install system. This is the best
default for those agents.

### 2. Choose universal Agent Skills for compatible clients

Use universal Agent Skills when your client supports the Agent Skills standard.

The recommended install path is:

```bash
specdd agentskills deploy
```

For user-level installation:

```bash
specdd agentskills deploy --user
```

This path is useful for clients such as Cursor, Windsurf, Gemini CLI, OpenCode, and other Agent Skills-compatible tools.

### 3. Use file-aware setup when skills are unavailable

If an agent can read repository files and follow project instructions, it can still use SpecDD.

The project should contain:

```text
AGENTS.md
.specdd/bootstrap.md
<root-name>.sdd
```

This is the most portable setup. It may require more careful verification because there is no dedicated SpecDD skill
layer helping the agent choose the right workflow.

### 4. Verify the setup you chose

Use the same verification request for any path:

```text
Orient in this SpecDD project.
```

Then use a specific spec:

```text
Explain the Itinerary spec.
```

If the response does not mention SpecDD context, local constraints, or authority, the setup is incomplete.

## Decision guide

Use a dedicated plugin when:

- your agent is Codex, Claude Code, GitHub Copilot, Antigravity, Junie, or Cline
- you want the agent's native install system
- you want the shared SpecDD skills packaged for that agent

Documented dedicated or agent-specific paths:

- Codex: install from the SpecDD marketplace with `codex plugin marketplace add specdd/specdd --ref main` and
  `codex plugin add specdd@specdd`
- Claude Code: install from the SpecDD marketplace with `claude plugin marketplace add specdd/specdd` and
  `claude plugin install specdd@specdd`
- GitHub Copilot: install each desired skill with `gh skill install specdd/plugin-copilot <skill-id>`
- Antigravity: install from the plugin repository with `agy plugin install https://github.com/specdd/plugin-antigravity.git`
- Junie: copy skills into `~/.junie/skills` or `.junie/skills/`
- Cline: copy skills into `~/.cline/skills` or `.cline/skills/`

Documented alternatives for dedicated-plugin agents:

- GitHub Copilot: universal Agent Skills are documented as an alternative installation method.
- Junie: use `gh skill install specdd/plugin-junie <skill-id> --agent junie --scope user`, or use universal Agent
  Skills.
- Cline: use `gh skill install specdd/plugin-cline <skill-id> --agent cline --scope user`, or use universal Agent
  Skills.

Use universal Agent Skills when:

- your agent supports Agent Skills
- your agent does not have a dedicated SpecDD plugin
- you want a portable project-local `.agents/skills` setup

Documented universal Agent Skills paths:

- current project: `specdd agentskills deploy`
- another project: `specdd agentskills deploy path/to/project`
- user-level: `specdd agentskills deploy --user`
- manual: clone the universal Agent Skills package and copy the `specdd-*` skill directories into the target client's
  skills directory

Use file-aware setup when:

- your agent can read repository files
- your agent does not support skills
- you can verify it follows the project bootstrap and `.sdd` specs

## Common mistakes

- Installing both a dedicated plugin and universal skills without knowing which one the agent loads.
- Choosing universal Agent Skills for an agent that does not read Agent Skills directories.
- Skipping verification because the install command completed.

## Related how-tos

- [How to install SpecDD universal Agent Skills for any agent](/how-to/set-up-your-agent/how-to-install-specdd-universal-agent-skills-for-any-agent/)
- [How to verify an agent has loaded SpecDD skills correctly](/how-to/set-up-your-agent/how-to-verify-an-agent-has-loaded-specdd-skills-correctly/)
- [How to use SpecDD with agents that do not support skills](/how-to/set-up-your-agent/how-to-use-specdd-with-agents-that-do-not-support-skills/)

## Related reference

- [Tools](/tools/)
