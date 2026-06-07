---
title: "How to use specs as agent memory"
seoDescription: "Use SpecDD specs as durable agent memory in a spec-driven development workflow by storing intent, boundaries, tasks, and completion criteria in local .sdd files instead of chat."
excerpt: "Make agent context durable by keeping project memory in local SpecDD specs, where humans and agents can review intent, ownership, constraints, and tasks across sessions."
level: "Beginner"
howtoID: "1041005"
weight: 75
---

This guide shows you how to use SpecDD specs as durable project memory for agents and humans in a spec-driven
development workflow.

SpecDD memory is not a hidden profile, private conversation, or hosted tool state. It is local, reviewable context in
Git: `.sdd` specs, bootstrap files, tasks, scenarios, and completion criteria.

## Short answer

Put durable decisions in specs, not prompts. Use local `.sdd` files for ownership, required behavior, boundaries,
allowed files, references, tasks, and done criteria. Use prompts only to request the current action.

## When to use this guide

Use this guide when:

- agents forget a rule between sessions
- different agents infer different local behavior
- important context is buried in chat history
- reviewers keep restating the same boundary
- a project has useful docs but agents do not find the local rule at the right moment

## What belongs in spec memory

Good SpecDD memory includes:

- what a project area exists to do
- what files, symbols, or responsibilities it owns
- what may be modified during work under that spec
- what context may be read
- what behavior must hold
- what behavior must not happen
- forbidden dependencies or paths
- open tasks and blocked decisions
- completion criteria and scenarios

Avoid storing:

- temporary conversation summaries
- speculative ideas that have not been reviewed
- personal preferences that belong in `.specdd/bootstrap.local.md`
- team-wide command or style conventions that belong in `.specdd/bootstrap.project.md`
- every detail of current implementation when the spec only needs the durable contract

## Steps

### 1. Identify repeated context

Look for instructions you keep giving agents:

- "do not change destination search"
- "this module owns itinerary ordering"
- "storage behavior is read-only context"
- "this task is not done until the missing-place check passes"

If the instruction should remain true after the current chat ends, it probably belongs in a spec or bootstrap file.

### 2. Put local behavior beside the work

For a local feature:

```text
src/trips/itinerary.js
src/trips/itinerary.sdd
```

Write the durable contract:

```sdd
Spec: Itinerary

Purpose:
  Keep a trip itinerary organized by day.

Owns:
  ./itinerary.js
  ./itinerary.test.js

Must:
  Itinerary items remain grouped by trip day.
  Missing place names are rejected before an itinerary item is stored.

Must not:
  Change destination search behavior.
```

Now the next agent session can find the same rule without inheriting your previous chat.

### 3. Separate project conventions from local specs

Put shared conventions in:

```text
.specdd/bootstrap.project.md
```

Examples:

- format commands
- lint commands
- test commands
- naming conventions
- generated-file policy
- team review rules

Keep local `.sdd` specs focused on behavior, ownership, boundaries, local tasks, and local completion.

### 4. Use `References` for external context

If one area needs another area's contract, reference it:

```sdd
References:
  ../storage/trip-storage.sdd
```

The reference gives the agent memory of the related contract. It does not grant permission to edit the referenced area.

### 5. Capture active work with `Tasks`

Use tasks for local work packets:

```sdd
Tasks:
  [ ] Add missing-place validation.
  [?] Decide whether duplicate places are allowed on the same day.
```

Task states preserve work status across sessions. Mark `[x]` only after implementation and checks are complete. Use
`[?]` when a decision is needed before implementation can continue.

### 6. Update memory when new context is approved

When an agent discovers missing context, do not leave it in the final chat report. Add the approved rule to the relevant
spec.

Use:

```text
Propose an Itinerary spec update for duplicate-place behavior.
```

After review:

```text
Update the Itinerary spec with the approved duplicate-place rule.
```

Then implementation can proceed from the updated contract.

## SpecDD pattern

This pattern uses:

- `.specdd/bootstrap.project.md` for shared workflow and convention memory
- root specs for broad project intent
- directory specs for inherited area context
- local specs for nearby file and feature contracts
- `References` for explicit horizontal context
- `Tasks` for durable local work status

## Common mistakes

- Treating chat history as the only place a decision exists.
- Putting team-wide command conventions in a local `.sdd` spec instead of bootstrap project rules.
- Recording speculative agent suggestions as requirements before review.
- Using `References` as if it grants edit permission.
- Marking tasks done to remember progress before checks actually pass.

## How to verify the result

Specs are working as agent memory when:

- a new session can explain the local contract without prior chat context
- agents produce similar plans from the same spec
- repeated reviewer corrections become explicit rules
- decisions are versioned in Git
- prompts stay short because durable context lives in the repository

## Related how-tos

- [How to manage context for agents](/how-to/agent-workflows/how-to-manage-context-for-agents/)
- [How to ask an agent to update the spec after discovering missing context](/how-to/agent-workflows/how-to-ask-an-agent-to-update-the-spec-after-discovering-missing-context/)
- [How to keep agent prompts short with SpecDD](/how-to/agent-workflows/how-to-keep-agent-prompts-short-with-specdd/)

## Related reference

- [Quickstart](/quickstart/)
- [Language reference](/language-reference/)
