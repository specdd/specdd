---
title: "How to fix an agent that ignores your specs"
seoDescription: "Fix an agent that ignores SpecDD specs by checking bootstrap setup, agent entrypoint wiring, plugin or skills installation, working directory, content root, and prompt scope."
excerpt: "Troubleshoot agents that ignore SpecDD by verifying setup files, plugin or skill loading, the correct project root, local spec placement, and task-focused prompts."
level: "Beginner"
howtoID: "1191000"
weight: 10
---

This guide shows you how to fix an agent that ignores your SpecDD specs.

Most failures come from setup or scope: the agent did not load project instructions, started in the wrong directory,
could not discover the local spec, or received a prompt that pulled it away from the reviewed contract.

## Short answer

Verify that the project has SpecDD bootstrap files, the agent can see its entrypoint, the plugin or Agent Skills package
is installed when applicable, the agent is running from the correct content root, and the target has a discoverable
local spec. Then use a short prompt that names the spec, feature, or task.

## Steps

### 1. Check the project is initialized

Confirm the project has:

```text
.specdd/bootstrap.md
.specdd/bootstrap.project.md
AGENTS.md
```

If these files are missing, initialize or add SpecDD before expecting an agent to follow specs.

### 2. Verify the agent entrypoint

Check that the agent-specific setup points to the shared SpecDD instructions. For example, Claude-style workflows often
use `CLAUDE.md`, and general file-aware agents often use `AGENTS.md`.

The exact mechanism depends on the agent, but the result should be the same: the agent knows this is a SpecDD project
before it edits files.

### 3. Confirm plugin or skills loading

If you use a dedicated SpecDD plugin or universal Agent Skills, confirm the agent can discover them.

Use a smoke-test prompt:

```text
Explain the Itinerary spec.
```

The answer should mention the relevant spec context, boundaries, and open questions. If the agent gives a generic answer
without local spec details, troubleshoot the plugin, skills path, or project scope.

### 4. Open the correct content root

SpecDD resolution depends on the selected content root. Open the repository or workspace root that contains the root
spec and `.specdd/` directory.

Do not start the agent from a nested source folder unless that folder is intentionally an independent SpecDD project.

### 5. Check local spec placement

For a target like:

```text
src/trips/itinerary.js
```

the local same-basename spec should be:

```text
src/trips/itinerary.sdd
```

If the spec is in a sibling folder, has a mismatched name, or is not referenced from the applicable chain, the agent may
not find it.

### 6. Use a task-focused prompt

Good:

```text
Plan the Itinerary validation change.
```

Good:

```text
Implement the Itinerary validation task.
```

Avoid broad prompts such as "fix trips" when the work belongs to one local spec.

## Common causes

- SpecDD was not initialized in the project.
- The agent started from the wrong directory.
- The dedicated plugin or Agent Skills package is not installed or loaded.
- The local spec name does not match the target file.
- The task prompt names a broad area instead of the target spec or task.
- A referenced spec was expected to grant write authority.

## How to verify the fix

The agent is using specs when:

- it can explain the relevant local spec
- it names writable files from `Can modify` or `Owns`
- it preserves `Must not` and `Forbids`
- it plans before broad changes
- it reports specs used, files changed, checks run, and uncertainty

## Related how-tos

- [How to make an agent follow specs](/how-to/agent-workflows/how-to-make-an-agent-follow-specs/)
- [How to verify an agent has loaded SpecDD skills correctly](/how-to/set-up-your-agent/how-to-verify-an-agent-has-loaded-specdd-skills-correctly/)
- [How to prompt an agent with SpecDD](/how-to/agent-workflows/how-to-prompt-an-agent-with-specdd/)
- [How to fix an agent that cannot find the right local spec](/how-to/troubleshooting/how-to-fix-an-agent-that-cannot-find-the-right-local-spec/)

## Related reference

- [Quickstart](/quickstart/)
- [Tools](/tools/)
