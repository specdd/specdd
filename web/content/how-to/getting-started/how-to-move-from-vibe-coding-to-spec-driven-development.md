---
title: "How to move from vibe coding to spec-driven development"
seoDescription: "Learn how to move from vibe coding to spec-driven development by turning vague prompts into local specs, bounded changes, and reviewable implementation contracts."
excerpt: "Move from vibe coding to spec-driven development by turning rough prompts into local specs before real implementation, then using those specs for planning, boundaries, and review."
level: "Beginner"
howtoID: "1001002"
weight: 30
---

Vibe coding is useful when you are exploring. You describe what you want, let an agent or quick implementation produce something, and
iterate by feel. That can be a fast way to discover an idea. It breaks down when the work needs durable intent,
architecture boundaries, tests, or review.

Spec-driven development keeps the useful speed but changes where the project context lives. Instead of making the
prompt carry every assumption, you write a small spec that the agent and future contributors can reuse.

## Short answer

Move one workflow at a time. Keep rough prompting for exploration, but before you ask for a real implementation, turn
the intent into a local spec. Review the spec, then ask the agent to implement against that contract and verify the
result.

{{< protip title="Workflow tip" >}}
Keep exploration in chat, but move durable decisions into a spec before the work becomes real project code.
{{< /protip >}}

## When vibe coding is still fine

You do not need a spec for every experiment. Vibe coding is often fine for:

- throwaway prototypes
- one-off scripts
- visual exploration
- learning an unfamiliar API
- comparing possible approaches
- work that will not be merged or reused

The shift matters when the output becomes part of a real project. Once other people, future agents, tests, production
data, or architecture boundaries depend on the result, the prompt should stop being the only contract.

## What changes with SpecDD

In a vibe-coding loop, the agent often receives a broad prompt:

```text
Make itinerary management better.
```

That request leaves too much open. The agent may edit the wrong layer, add unrelated behavior, or invent rules that
sound reasonable but do not match the project.

In a spec-driven loop, you first write the durable contract:

```sdd
Spec: Itinerary

Purpose:
  Keep a trip itinerary organized by day.

Owns:
  ./itinerary.js

Must:
  A missing place name is rejected before an itinerary item is stored.
  Existing itinerary items remain unchanged when validation fails.

Must not:
  Manage destination search results.
  Purchase bookings or tickets.

Tasks:
  [ ] Add missing-place validation.

Done when:
  The missing-place scenario is checked.

Scenario: missing place name
  Given the place name is empty
  When the person adds the itinerary item
  Then validation fails
  And no itinerary item is stored
```

Then the implementation prompt can be much shorter:

```text
Complete the open task in the Itinerary spec.
```

The important context is now in the repository, not trapped in the chat.

## Steps

### 1. Capture the rough idea

Start with the same rough idea you would have used in a prompt:

```text
Users should not be able to add itinerary items without a place name.
```

Do not ask the agent to implement yet. First decide where this behavior belongs.

### 2. Pick the local owner

Find the smallest part of the system that should own the behavior. For example:

```text
src/trips/itinerary.js
src/trips/itinerary.sdd
```

If the behavior affects several areas, split it into smaller specs or start with the first local slice. SpecDD works best
when each spec describes a clear responsibility.

### 3. Turn the prompt into a spec

Rewrite the vague request as required behavior and boundaries:

- `Purpose`: what the subject is for
- `Owns` or `Can modify`: where changes may happen
- `Must`: what must be true
- `Must not`: what plausible wrong work is out of scope
- `Done when`: how to stop
- `Scenario`: a concrete behavior example

The spec should describe the system state you want to keep, not the conversation that created it.

### 4. Ask the agent to challenge the spec

Before implementation, use the agent for review:

```text
Check the Itinerary spec for ambiguity.
```

This keeps the agent useful during planning without letting it turn ambiguity into code.

### 5. Implement only after the spec is clear

Once the spec is good enough, ask for a bounded implementation:

```text
Implement the open validation task in the Itinerary spec.
```

If the agent reports unclear spec authority or missing context, fix that first.

## Common mistakes

- Treating the first generated result as the spec.
- Writing a spec that says "make this better" instead of naming observable behavior.
- Adding every possible future feature to the first spec.
- Forgetting negative constraints, such as what this module must not own.
- Keeping important decisions in chat after the implementation is done.

## How to verify the result

You have moved from vibe coding to spec-driven development when:

- the durable behavior is written in a `.sdd` file
- the spec lives near the part of the project it governs
- the agent prompt states only the actual work request
- prompt examples use spec or feature names instead of file paths
- review compares the diff to the spec, not only to the prompt
- future agents can reuse the same local context

## Related how-tos

- [How to start with spec-driven development](/how-to/getting-started/how-to-start-with-spec-driven-development/)
- [How to write your first .sdd spec](/how-to/getting-started/how-to-write-your-first-sdd-spec/)
- [How to know when you do not need a spec](/how-to/getting-started/how-to-know-when-you-do-not-need-a-spec/)

## Related reference

- [Quickstart](/quickstart/)
- [Language reference](/language-reference/)
