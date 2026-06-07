---
title: "How to fix broken SpecDD plugin or skill installs"
seoDescription: "Fix broken SpecDD plugin or Agent Skills installs by checking install paths, universal skills deployment, scope, reloads, discovery, and smoke-test prompts."
excerpt: "Troubleshoot SpecDD plugins and universal Agent Skills by checking the install method, target scope, skill directory, reload behavior, and whether the agent can use a SpecDD skill."
level: "Intermediate"
howtoID: "1191011"
weight: 120
---

This guide shows you how to fix broken SpecDD dedicated plugin or universal Agent Skills installs.

SpecDD works with file-aware agents even without a plugin, but plugins and skills make the workflow easier by packaging
SpecDD procedures for orientation, authoring, implementation, review, tracing, testing, debugging, refactoring, tasks,
CLI use, and adoption.

## Short answer

First identify whether you installed a dedicated agent plugin or universal Agent Skills. Check the correct user or
project scope, confirm the skill files exist in the expected location, reload the agent, and run a small smoke-test
prompt. If the agent still cannot load skills, use normal file-aware SpecDD instructions while fixing the install.

## Steps

### 1. Identify the install path

SpecDD has two common paths:

- dedicated plugins for supported agents
- universal Agent Skills for clients that support the portable skills format

Use the install path your agent actually supports. Do not mix commands from different agents.

### 2. Check user vs project scope

Some agents support global user skills, project-local skills, or both.

Make sure you installed to the scope the agent is reading. A project-local install may not affect another repository. A
user install may not be available in a sandboxed or remote workspace.

### 3. Verify skill files exist

For universal Agent Skills deployed by the SpecDD CLI, project-local skills usually live under:

```text
.agents/skills
```

User-level skills usually live under:

```text
~/.agents/skills
```

For dedicated plugins, check the agent's plugin or skill list using that agent's normal tooling.

### 4. Reload the agent

After installing or updating a plugin or skills package:

- restart the agent process
- reload the editor window if the agent runs inside an editor
- open a new terminal for CLI-based agents
- clear or refresh plugin caches if the agent provides that command

Many "broken install" issues are stale discovery state.

### 5. Run a smoke test

Use a simple prompt:

```text
Orient yourself in this project.
```

or:

```text
Explain the Itinerary spec.
```

The answer should show SpecDD-specific behavior such as bootstrap awareness, local spec context, write authority, or
read-only orientation boundaries.

### 6. Fall back to file-aware instructions

If skills are still unavailable, SpecDD can still work with an agent that can read repository files and follow project
instructions. Use the project setup and local `.sdd` specs while you fix the plugin or skills install.

Do not let the agent make broad edits because the skill install failed.

## Common causes

- Installed the wrong plugin for the agent.
- Installed skills globally but the agent reads project-local skills only.
- Installed project-local skills in a different repository.
- The agent was not restarted after install.
- Plugin cache still points at an older version.
- Universal Agent Skills are installed but the client does not support that format.
- The project itself is not initialized with SpecDD.

## How to verify the fix

The install is fixed when:

- the agent lists or discovers SpecDD skills
- a smoke-test prompt triggers SpecDD behavior
- the agent can explain a local spec
- implementation prompts respect `Can modify` or `Owns`
- review prompts produce spec-aware findings
- fallback file-aware instructions are no longer needed for normal work

## Related how-tos

- [How to install SpecDD universal Agent Skills for any agent](/how-to/set-up-your-agent/how-to-install-specdd-universal-agent-skills-for-any-agent/)
- [How to verify an agent has loaded SpecDD skills correctly](/how-to/set-up-your-agent/how-to-verify-an-agent-has-loaded-specdd-skills-correctly/)
- [How to choose between a dedicated plugin and universal Agent Skills](/how-to/set-up-your-agent/how-to-choose-between-a-dedicated-plugin-and-universal-agent-skills/)
- [How to use SpecDD with agents that do not support skills](/how-to/set-up-your-agent/how-to-use-specdd-with-agents-that-do-not-support-skills/)

## Related reference

- [Tools](/tools/)
