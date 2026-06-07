---
title: "How to use SpecDD with multiple agents on one repo"
seoDescription: "Use spec-driven development with multiple agents on one repository by keeping specs in Git, assigning bounded tasks, preserving local authority, and reviewing task status."
excerpt: "Coordinate multiple agents in one repo with SpecDD by using shared specs, separate bounded tasks, consistent roots, careful task status, and review against local contracts."
level: "Advanced"
howtoID: "1041008"
weight: 90
---

This guide shows you how to use spec-driven development when more than one agent works in the same repository.

Multiple agents can be useful, but they can also amplify drift if each one works from a different prompt, root, or memory
source. SpecDD keeps the durable context in repository files so different agents can work from the same contracts.

## Short answer

Initialize SpecDD once, keep specs and bootstrap files in Git, verify each agent from the same selected content root,
assign each agent a bounded spec or task, and review every plan and diff against local authority before combining work.

## When to use this guide

Use this guide when:

- one agent plans while another implements
- different agents work on different features in the same repo
- a team uses Claude Code, Codex, Copilot, Cursor, or another mix of tools
- you want agent output to remain reviewable across sessions and branches
- multiple agents might touch shared specs, tests, or tasks

## Steps

### 1. Keep one project source of truth

All agents should use the same repository files:

```text
AGENTS.md
.specdd/
  bootstrap.md
  bootstrap.project.md
<root-name>.sdd
```

Do not copy the project rules into separate agent-specific prompts. Keep shared rules in `.specdd/bootstrap.project.md`
and local behavior in `.sdd` specs.

### 2. Verify every agent setup

For each agent, verify that it can orient from the same project root:

```text
Orient in this SpecDD project.
```

Then test one known spec:

```text
Explain the Itinerary spec.
```

The wording can differ by tool, but each agent should identify the same broad constraints, local authority, open tasks,
and verification expectations.

### 3. Assign separate bounded work

Use separate specs, tasks, or branches when agents work in parallel.

Good:

```text
Plan the Itinerary validation change.
```

Good:

```text
Plan the Trip Storage save-failure change.
```

Risky:

```text
Improve the trip system.
```

The risky prompt gives two agents room to edit overlapping files without a clear contract.

### 4. Use task states honestly

SpecDD task states help preserve work status:

```sdd
Tasks:
  [ ] Add missing-place validation.
  [?] Decide duplicate-place behavior.
  [!] Confirm storage retry policy.
```

Use `[?]` when a human decision is needed. Use `[!]` when work is blocked. Use `[x]` only after implementation and checks
are complete.

If two agents may touch the same task, coordinate outside the spec as well, for example through branches, pull requests,
or your normal review workflow. A task list is not a lock manager.

### 5. Keep write authority local

When two agents work on related areas, make read and write context explicit.

```sdd
Spec: Itinerary

Can modify:
  ./itinerary.js
  ./itinerary.test.js

Can read:
  ../storage/trip-storage.sdd
```

An itinerary agent can read storage context without editing storage. A storage agent should work under the storage spec.

### 6. Review plans before parallel implementation

Ask each agent to plan first:

```text
Plan the Itinerary validation change.
```

```text
Plan the Trip Storage save-failure change.
```

Compare the plans for overlap:

- do they propose the same files?
- does one plan rely on a task the other has not completed?
- do they interpret shared specs the same way?
- are they changing the same test fixtures?
- are there unresolved decisions that should block one or both tasks?

### 7. Merge through spec review

When combining work, review:

- each changed file against its governing spec
- task status updates against completed checks
- any spec updates against actual behavior
- conflicts between parent and child specs
- whether one agent's change invalidates another agent's plan

If an implementation reveals a missing rule, update the spec before asking the next agent to continue.

## Best practices

- Give each agent one spec or task at a time.
- Use the same selected content root for all agents.
- Keep agent-specific setup separate from project rules.
- Prefer reviewed spec updates over chat-based handoffs.
- Ask agents to explain or plan before editing shared areas.
- Review task status changes with the same care as code changes.

## Common mistakes

- Letting different agents open different roots and resolve different context.
- Assigning overlapping broad prompts to multiple agents.
- Treating `Tasks` as concurrency control.
- Merging implementation without checking whether specs stayed aligned.
- Copying context from one agent chat into another instead of updating specs.

## How to verify the result

Multiple-agent work is healthy when:

- agents orient from the same project files
- each task has clear local authority
- parallel plans do not silently overlap
- spec changes are reviewed before follow-on implementation
- final diffs can be checked against the same contracts humans read

## Related how-tos

- [How to get consistent results across different agents](/how-to/agent-workflows/how-to-get-consistent-results-across-different-agents/)
- [How to use specs as agent memory](/how-to/agent-workflows/how-to-use-specs-as-agent-memory/)
- [How to switch your SpecDD setup to a different agent without losing context](/how-to/set-up-your-agent/how-to-switch-your-specdd-setup-to-a-different-agent-without-losing-context/)

## Related reference

- [Tools](/tools/)
- [Language reference](/language-reference/)
