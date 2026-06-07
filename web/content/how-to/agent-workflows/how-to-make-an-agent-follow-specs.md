---
title: "How to make an agent follow specs"
seoDescription: "Make an agent follow SpecDD specs in a spec-driven development workflow by verifying setup, opening the right root, explaining the target spec, planning under authority, and reviewing the diff."
excerpt: "Use a file-aware coding agent with SpecDD by verifying spec-aware behavior, prompting one bounded task, reviewing the plan, and checking the diff."
level: "Beginner"
howtoID: "1041010"
weight: 15
---

This guide shows you how to make a coding agent follow SpecDD specs during normal work in a spec-driven development
workflow.

The exact setup path depends on the agent, but the workflow is the same: make the project context discoverable, verify
the agent can explain the target spec, review a plan before broad edits, and accept only changes that match the local
contract.

## Short answer

Use an agent that can read repository files, install the relevant SpecDD plugin or Agent Skills when available, open the
selected content root, and start with a simple explanation prompt:

```text
Explain the Itinerary spec.
```

If the explanation is correct, ask for a plan. If the plan is inside authority, ask for implementation. Review the final
diff against `Can modify` or `Owns`, `Must`, `Must not`, `Forbids`, `Tasks`, and `Done when`.

## Prerequisites

Before you start, make sure:

- your agent can read repository files
- the agent has the relevant SpecDD plugin, Agent Skills package, or file-aware setup
- the project has SpecDD bootstrap files
- the work area has a root or local `.sdd` spec

For setup commands, start with the setup guide for your agent or the universal Agent Skills guide.

## Steps

### 1. Confirm the agent can use SpecDD context

Do not start with implementation. First confirm that the agent can see the project entrypoint files:

```text
AGENTS.md
.specdd/
  bootstrap.md
  bootstrap.project.md
<root-name>.sdd
```

Use:

```text
Orient in this SpecDD project.
```

A useful response should mention SpecDD context and describe what the agent inspected. If the response is generic,
verify the agent setup before asking for code changes.

### 2. Open the selected content root

Start the agent from the repository or configured SpecDD content root.

The selected content root affects:

- root spec naming
- `/` path resolution
- inherited spec chains
- related-spec lookup
- which files the agent can inspect

Opening a nested folder can make the same prompt resolve a different context.

### 3. Ask the agent to explain the target spec

Use:

```text
Explain the Itinerary spec.
```

The explanation should summarize:

- purpose
- writable scope
- read-only context
- required behavior
- prohibited behavior
- open tasks
- completion criteria

If the explanation misses an important rule, fix the spec or setup before continuing.

### 4. Review a plan before implementation

Use:

```text
Plan the Itinerary validation change.
```

The plan should name likely files, constraints, checks, and unresolved decisions. It should not propose edits outside
local authority. In particular:

- `Can modify` defines writable files when present
- `Owns` is the writable boundary when `Can modify` is absent
- `Can read` and `References` provide context, not edit permission
- inherited `Must not` and `Forbids` remain binding

If the plan is too broad, revise it before implementation:

```text
Narrow the Itinerary validation plan.
```

### 5. Review the result against the spec

After plan review, use:

```text
Implement the approved Itinerary validation plan.
```

After a diff exists, use:

```text
Review this change against the Itinerary spec.
```

Then check the diff yourself. A good final result:

- changes only authorized files
- satisfies relevant `Must` rules
- preserves `Must not` and `Forbids`
- runs useful checks or explains skipped checks
- updates `Tasks` only after verification
- reports uncertainty instead of hiding it

## Generic prompt sequence

Use one prompt per phase:

```text
Orient in this SpecDD project.
```

```text
Explain the Itinerary spec.
```

```text
Plan the Itinerary validation change.
```

```text
Implement the approved Itinerary validation plan.
```

```text
Review this change against the Itinerary spec.
```

## Best practices

- Use a dedicated plugin or Agent Skills package when your agent supports one.
- Start the agent from the same content root every time.
- Use explanation prompts when entering an unfamiliar spec.
- Use planning prompts before broad or risky implementation.
- Keep each prompt to one instruction.
- Put durable decisions in specs, not agent conversation history.
- Review task status changes as carefully as code changes.

## Common mistakes

- Installing an integration but opening a nested folder with no SpecDD root files.
- Skipping orientation after setup.
- Asking the agent to implement a broad area instead of a local spec task.
- Accepting a plan that treats referenced context as writable.
- Leaving newly discovered rules in chat instead of updating the spec.
- Marking a task complete before checks prove the behavior.

## How to verify the result

The agent is following specs when:

- orientation and explanation requests mention SpecDD context
- plans identify writable files and constraints
- implementation stays inside local authority
- `Must not` and `Forbids` are preserved
- checks run or skipped checks are explained
- task status reflects verified work

## Related how-tos

- [How to verify an agent has loaded SpecDD skills correctly](/how-to/set-up-your-agent/how-to-verify-an-agent-has-loaded-specdd-skills-correctly/)
- [How to prompt an agent with SpecDD](/how-to/agent-workflows/how-to-prompt-an-agent-with-specdd/)
- [How to ask an agent to explain a spec before implementation](/how-to/agent-workflows/how-to-ask-an-agent-to-explain-a-spec-before-implementation/)

## Related reference

- [Tools](/tools/)

## Per-agent notes

### Claude Code

Use the dedicated Claude Code plugin when possible. Open the selected content root, then verify with:

```text
Orient in this SpecDD project.
```

Claude-specific setup details belong in the Claude setup guide. The workflow prompts should still name the spec, feature,
task, or behavior rather than repeating bootstrap instructions.

### Codex

Use the dedicated Codex plugin when possible. For integration setup, use the Codex setup guide rather than replacing the
plugin workflow with a long custom prompt.

Start Codex from the repository or configured SpecDD content root so the working directory matches the root that contains
`AGENTS.md`, `.specdd/bootstrap.md`, and the root `.sdd` file.

After integration setup, verify with:

```text
Orient in this SpecDD project.
```

When you want a constraints-only checkpoint before planning, use:

```text
Summarize the Itinerary constraints.
```

The summary should distinguish writable authority, read-only context, required behavior, forbidden behavior, open tasks,
and checks.

### GitHub Copilot

Copilot-specific SpecDD skills are installed one at a time with GitHub CLI. For example:

```bash
gh skill install specdd/plugin-copilot specdd-orient
```

Repeat the command for the other skill IDs you need, such as planning, implementation, review, testing, or task
management skills. If you use universal Agent Skills instead, verify which skills path Copilot is actually loading.

In editor workflows, choose the mode that matches the task. Edit mode is useful when you want to choose the files Copilot
may change. Agent mode is useful when the task needs multi-step autonomous work. If your editor context is limited to
visible or selected files, make sure the target `.sdd` spec and the relevant source files are available to Copilot before
asking for a plan.

For Copilot-created pull requests, review the PR thoroughly before merging. Ask Copilot for follow-up changes through PR
comments only after checking the diff against the governing spec.
