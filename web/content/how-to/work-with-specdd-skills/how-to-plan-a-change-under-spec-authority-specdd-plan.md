---
title: "How to plan a change under spec authority (specdd-plan)"
seoDescription: "Plan a spec-driven development change with specdd-plan by resolving the governing spec chain, identifying allowed scope and write authority, and producing a file-and-checks plan without editing code."
excerpt: "Use specdd-plan to produce a concrete, spec-bounded implementation plan before any files change, so the agent does not overstep authority or miss required checks."
level: "Beginner"
howtoID: "1091016"
weight: 50
---

This guide shows you how to plan a change with `specdd-plan` in a spec-driven development workflow.

`specdd-plan` is a read-only skill. It resolves the governing spec chain for a change, identifies what the spec allows
the agent to edit, and produces a concrete file-and-checks plan without touching code or spec files.

## Short answer

Use `specdd-plan` when you want a bounded implementation plan before any files change. Give the agent a target
and task. The agent resolves the spec chain, checks ownership and constraints, and returns a plan naming changed files,
verification checks, and any blockers. No files are edited.

## When to use this guide

Use this guide when:

- you want to confirm scope before implementation starts
- an agent has a history of editing files it does not own
- a task spans multiple modules or files
- spec constraints are strict and you need the agent to reason through them before acting
- a change is risky enough that you want to catch wrong assumptions before any edit

## Principle

Plan before edit.

`specdd-plan` is the boundary between understanding and change. A plan that stays within spec authority means the
following implementation step does not need to discover scope mid-edit. A plan that names blockers surfaces them
before they become incomplete work.

## Steps

### 1. Name the change to plan

Give the agent the target and task in human terms.

Examples:

```text
Plan the Itinerary validation change.
```

```text
Plan adding missing-place validation to the Itinerary module.
```

```text
Plan the TripStorage migration task.
```

### 2. Keep the request plan-only

`specdd-plan` should not edit code, update specs, or mark tasks complete. It is for planning.

Good:

```text
Plan the Itinerary validation change without making any edits.
```

Not a plan request:

```text
Plan the Itinerary validation change and implement it.
```

Split those into separate prompts.

### 3. Check that the plan is spec-bounded

A useful `specdd-plan` output names:

- the governing spec chain resolved for the target
- files the spec owns or allows editing
- files that are out of scope or explicitly forbidden
- relevant `Must`, `Must not`, and `Forbids` constraints
- active tasks from `Tasks`
- completion criteria from `Done when`
- verification checks required after implementation
- blockers or unresolved decisions that prevent implementation

If the plan claims authority over files the spec does not own, reject it and clarify scope in the spec before
proceeding.

### 4. Resolve blockers before implementing

If the plan surfaces blockers, resolve them first:

- missing task: add it to the spec's `Tasks` section
- ownership gap: update `Owns` in the relevant spec
- conflicting constraint: use `specdd-author` to update `Must`, `Must not`, or `Forbids`
- unresolved decision: use `[?]` or a decision workflow to surface it

Do not implement against a plan that names unresolved blockers.

### 5. Hand the plan to the implementation skill

After approving the plan, pass it as context to `specdd-do`:

```text
Implement the approved Itinerary validation plan.
```

The implementation skill should not need to re-derive scope from scratch if the plan already did that work.

## Common mistakes

- Asking for planning and implementation in one prompt.
- Accepting a plan that claims authority over files the spec does not own.
- Proceeding to implementation when the plan names blockers.
- Using a plan from a prior session without re-running resolution when specs have changed.
- Treating a plan as a spec update — it is not.

## How to verify the result

`specdd-plan` worked when:

- no files were edited
- the plan names the resolved spec chain
- allowed and forbidden files are clearly distinguished
- required checks are listed
- blockers are named rather than silently omitted
- the plan is consistent with the actual spec content

## Related how-tos

- [How to explain a spec (specdd-explain)](/how-to/work-with-specdd-skills/how-to-explain-a-spec-specdd-explain/)
- [How to implement under spec authority](/how-to/work-with-specdd-skills/how-to-implement-under-spec-authority-specdd-do/)
- [How to ask an agent to plan before coding](/how-to/agent-workflows/how-to-ask-an-agent-to-plan-before-coding/)
- [How to choose the right SpecDD skill](/how-to/work-with-specdd-skills/how-to-choose-the-right-specdd-skill/)
- [How to chain SpecDD skills safely](/how-to/work-with-specdd-skills/how-to-chain-specdd-skills-safely/)

## Related reference

- [Tools](/tools/)
- [Language reference](/language-reference/)
