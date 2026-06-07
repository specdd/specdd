---
title: "How to prompt an agent with SpecDD"
seoDescription: "Prompt an agent with spec-driven development by naming the spec, feature, task, or behavior while durable project context stays in local .sdd files."
excerpt: "Use short task prompts with SpecDD by naming the real work, keeping each prompt to one instruction, and reviewing the result against the governing spec."
level: "Beginner"
howtoID: "1041000"
weight: 10
---

This guide shows you how to prompt an agent in a spec-driven development project without turning every request into a long setup prompt.

SpecDD is an amazing way to make prompts smaller because the durable context lives in `.sdd` files, bootstrap files, and
Git. Your prompt should identify the work. The project files should carry the rules, boundaries, and completion criteria.

## Short answer

Use a short prompt that names the spec, feature, task, or behavior you want changed. Keep each prompt to one instruction.
For non-trivial work, ask for a plan first, review the plan against the spec, then ask for implementation.

Good:

```text
Plan the Itinerary validation change.
```

Good:

```text
Implement the open validation task.
```

Avoid prompts that combine setup, planning, implementation, testing, and reporting into one large instruction. Those
details belong in project instructions, specs, and review habits.

## Prerequisites

Before you start, make sure:

- SpecDD has been initialized in the project
- the agent can read repository files
- the relevant area has a root, directory, or local `.sdd` spec
- the agent-specific plugin, Agent Skills package, or file-aware setup has been verified

## Principle

A prompt is a request. A spec is the contract.

When the prompt carries all context, the agent has to reconstruct ownership, requirements, forbidden behavior, and
completion criteria from one temporary message. That is fragile. In SpecDD, the prompt can stay small because the agent
works from a path-based spec chain: root context, inherited parent specs, local same-basename specs, and explicit
references when the spec names them.

The result is easier to review. Instead of asking whether the agent understood a long prompt, you can ask whether the
change satisfied `Must`, avoided `Must not` and `Forbids`, stayed inside `Can modify` or `Owns`, and completed the
listed `Done when` criteria.

## Steps

### 1. Confirm the work has a spec

For a small feature, the repository might contain:

```text
src/trips/itinerary.js
src/trips/itinerary.sdd
```

The local spec should state what the itinerary owns, what behavior must hold, and what the current task is.

```sdd
Spec: Itinerary

Purpose:
  Keep a trip itinerary organized by day.

Owns:
  ./itinerary.js
  ./itinerary.test.js

Must:
  Itinerary items require a place name before they are stored.

Must not:
  Change destination search behavior.

Tasks:
  [ ] Add missing-place validation.

Done when:
  Missing-place behavior is covered by a check.
```

If there is no useful spec yet, write or review the spec before asking for implementation. The agent can help draft it,
but implementation should be driven by reviewed context.

### 2. Name the spec, feature, task, or behavior

Use human names:

```text
Explain the Itinerary spec.
```

```text
Plan the Itinerary validation change.
```

```text
Implement the missing-place validation task.
```

The prompt should be searchable and understandable to a human reviewer. Avoid using a vague product area such as
"improve trips" when the real work is one itinerary validation rule.

### 3. Keep each prompt to one instruction

One prompt should ask for one action:

```text
Plan the Itinerary validation change.
```

After reviewing the plan, use a separate implementation prompt:

```text
Implement the Itinerary validation plan.
```

After implementation, use a separate review prompt when needed:

```text
Review the Itinerary change against the spec.
```

This keeps the agent from mixing analysis, editing, and review before you have a chance to catch wrong assumptions.

### 4. Ask for planning before risky or broad work

Planning is useful when the change touches more than one file, crosses boundaries, affects tests, or could be interpreted
in several ways.

Use:

```text
Plan the Itinerary validation change.
```

A good plan should mention:

- the relevant spec or feature
- likely files to change
- behavior that must remain true
- boundaries that must not be crossed
- checks that should prove the result
- any ambiguity or missing authority

### 5. Use tasks for small implementation packets

When a spec has `Tasks`, prompt the task rather than restating the whole feature:

```text
Complete the open Itinerary validation task.
```

The task is the work packet. The surrounding spec is the contract. Do not ask the agent to mark the task done unless the
result has been implemented and checked.

### 6. Review the output as a contract check

After the agent responds, review:

- did it identify the right spec, feature, or task?
- did it stay inside `Can modify` or `Owns`?
- did it satisfy each relevant `Must` rule?
- did it preserve `Must not` and `Forbids`?
- did it run or name appropriate checks?
- did it report uncertainty instead of guessing?

If the answer is no, fix the spec or ask for a narrower follow-up before accepting implementation.

## Prompt patterns

Use explanation prompts before implementation:

```text
Explain the Itinerary spec.
```

Use planning prompts for non-trivial work:

```text
Plan the missing-place validation change.
```

Use implementation prompts after review:

```text
Implement the approved Itinerary validation plan.
```

Use review prompts after a diff exists:

```text
Review this change against the Itinerary spec.
```

## SpecDD pattern

This workflow uses:

- `Owns` or `Can modify` to define writable scope
- `Can read` and `References` to provide context without edit permission
- `Must` to state required outcomes
- `Must not` and `Forbids` to prevent plausible wrong changes
- `Tasks` to name current work
- `Done when` and `Scenario` to define completion and verification

## Common mistakes

- Asking for a broad area such as "improve billing" when the intended work is one local task.
- Combining plan, implementation, test updates, task status changes, and review in one prompt.
- Using a full file path as the prompt subject when the spec or feature has a clearer human name.
- Repeating bootstrap instructions in every prompt instead of keeping prompts task-focused.
- Accepting implementation when the agent never names the spec or task it used.

## How to verify the result

Your prompting workflow is working when:

- prompts are short and name the real work
- each prompt contains one instruction
- plans and final reports mention the relevant spec context
- file changes stay inside local authority
- task status changes only after verification
- reviewers can compare the result directly against the spec

## Related how-tos

- [How to ask an agent to plan before coding](/how-to/agent-workflows/how-to-ask-an-agent-to-plan-before-coding/)
- [How to review an agent plan against a spec](/how-to/agent-workflows/how-to-review-an-agent-plan-against-a-spec/)
- [How to keep agent prompts short with SpecDD](/how-to/agent-workflows/how-to-keep-agent-prompts-short-with-specdd/)

## Related reference

- [Quickstart](/quickstart/)
- [Tools](/tools/)
- [Language reference](/language-reference/)
