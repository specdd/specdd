---
title: "How to ask an agent to explain a spec before implementation"
seoDescription: "Ask an agent to explain a SpecDD spec before implementation in a spec-driven development workflow so you can confirm purpose, authority, constraints, tasks, and checks before coding."
excerpt: "Use a spec explanation prompt before implementation to catch missing context, wrong authority, ambiguous tasks, and misunderstood completion criteria early."
level: "Beginner"
howtoID: "1041011"
weight: 140
---

This guide shows you how to ask an agent to explain a SpecDD spec before implementation in a spec-driven development
workflow.

Explanation is a low-cost checkpoint. If the agent cannot explain the local contract correctly, it is not ready to edit
files under that contract.

## Short answer

Before implementation, use:

```text
Explain the Itinerary spec.
```

Then compare the explanation to the spec. It should cover purpose, writable authority, read-only context, required
behavior, prohibited behavior, tasks, completion criteria, scenarios, and ambiguity.

## When to use this guide

Use this guide when:

- the agent is entering an unfamiliar feature
- a spec has important `Must not` or `Forbids` rules
- several specs may affect the target
- the task is ambiguous
- the change is risky enough that a wrong edit would be expensive
- you are verifying a newly installed plugin or Agent Skills setup

## Steps

### 1. Choose a concrete spec or feature

Use a human-readable target:

```text
Explain the Itinerary spec.
```

Avoid asking for a broad repository explanation when one local spec is enough. The goal is to verify the contract that
will govern the next change.

### 2. Check the purpose

The explanation should state why the subject exists.

For:

```sdd
Purpose:
  Keep a trip itinerary organized by day.
```

a good explanation should not describe the itinerary as a destination search feature, booking system, or storage module.

### 3. Check writable authority

The explanation should distinguish editable files from read-only context.

```sdd
Can modify:
  ./itinerary.js
  ./itinerary.test.js

Can read:
  ../storage/trip-storage.sdd
```

The agent should understand that storage is context, not an edit target for the itinerary task.

### 4. Check required and prohibited behavior

The explanation should summarize `Must`, `Must not`, and `Forbids`.

```sdd
Must:
  Missing place names are rejected before an itinerary item is stored.

Must not:
  Change destination search behavior.

Forbids:
  ../booking/*
```

If the agent misses a forbidden behavior or treats it as optional, stop and clarify before implementation.

### 5. Check tasks and completion criteria

The explanation should connect open tasks to `Done when`:

```sdd
Tasks:
  [ ] Add missing-place validation.

Done when:
  Missing-place behavior is covered by a check.
```

If the agent says the task is complete because code can be written, correct it. A task is done only after the behavior is
implemented and checked.

### 6. Look for ambiguity

The explanation should identify unresolved decisions instead of hiding them.

Example:

```sdd
Tasks:
  [?] Decide whether duplicate places are allowed on the same day.
```

Before implementation, resolve that decision or keep the work scoped away from it.

### 7. Continue with a plan or implementation

If the explanation is correct, use a separate prompt:

```text
Plan the Itinerary validation change.
```

For very small, fully specified work:

```text
Implement the missing-place validation task.
```

## Review checklist

A useful explanation includes:

- selected spec or feature
- purpose
- inherited context that affects the work
- allowed modification scope
- read-only context
- required behavior
- prohibited behavior
- open, blocked, or decision-needed tasks
- completion criteria and scenarios
- uncertainty

## Common mistakes

- Treating a confident explanation as correct without comparing it to the spec.
- Asking for a whole-repo summary instead of the target spec.
- Ignoring missing `Must not` or `Forbids` rules in the explanation.
- Letting the agent proceed when it reports a decision-needed task.
- Accepting implementation before the agent understands writable authority.

## How to verify the result

The explanation checkpoint worked when:

- the agent's explanation matches the spec
- wrong assumptions are caught before edits
- ambiguity is resolved or explicitly deferred
- the follow-up plan uses the same authority and constraints
- implementation stays inside the explained boundary

## Related how-tos

- [How to ask an agent to plan before coding](/how-to/agent-workflows/how-to-ask-an-agent-to-plan-before-coding/)
- [How to stop an agent when the spec is ambiguous](/how-to/agent-workflows/how-to-stop-an-agent-when-the-spec-is-ambiguous/)
- [How to verify an agent has loaded SpecDD skills correctly](/how-to/set-up-your-agent/how-to-verify-an-agent-has-loaded-specdd-skills-correctly/)

## Related reference

- [Language reference](/language-reference/)
