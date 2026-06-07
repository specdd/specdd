---
title: "How to orient an agent in a SpecDD project (specdd-orient)"
seoDescription: "Orient an agent in a spec-driven development project with specdd-orient by loading the bootstrap chain, reading top-level project context, checking repository shape, and making no edits."
excerpt: "Use specdd-orient as a read-only first step so an agent understands the project bootstrap, root authority, top-level specs, repository shape, and git status."
level: "Beginner"
howtoID: "1091000"
weight: 30
---

This guide shows you how to orient an agent in a spec-driven development project with `specdd-orient`.

Orientation is a read-only readiness step. It helps the agent understand the bootstrap files, root project authority,
major repository shape, and current worktree state before you ask for planning, implementation, review, or refactoring.

## Short answer

Use `specdd-orient` before later work when the agent needs project context but does not yet have a concrete target. The
agent should read the active bootstrap chain, inspect the root or main project spec, look lightly at top-level structure
and relevant specs, check git status, and report readiness without editing files.

## When to use this guide

Use this guide when:

- an agent is starting work in a SpecDD project for the first time
- you want a short project orientation before asking for a plan
- the next task is not yet tied to one target path
- you need the agent to notice existing worktree changes before editing
- you want confidence that the agent understands this is a SpecDD project

## Principle

Orientation is not authorization.

`specdd-orient` intentionally uses a lighter scope than normal SpecDD spec-chain resolution. It may read the bootstrap
chain, the root project spec, immediately relevant top-level specs, and explicitly requested files, but that context
does not grant write authority for future work.

For any later concrete task, the agent still needs normal SpecDD resolution for the target path, task, behavior, or
changed files.

## Steps

### 1. Use orientation before concrete work

Start with orientation when the agent needs project context before a task is selected.

```text
Orient yourself in this project.
```

Keep the prompt short. Project instructions and the skill define the workflow.

### 2. Keep the request read-only

`specdd-orient` should not edit files, plan implementation, review a diff, or refactor code. It is for readiness.

Good:

```text
Summarize the project orientation.
```

Not orientation:

```text
Orient yourself and implement the itinerary task.
```

If you need implementation, use a later prompt after orientation is complete.

### 3. Ask for lightweight project context

A useful orientation report should mention:

- bootstrap files read
- root or main project spec found
- top-level project authority or major boundaries
- major directories or relevant spec areas
- current git status
- blockers to accepting follow-up work

It should not deeply analyze every spec in the repository unless you ask for that separately.

### 4. Check the orientation report

Review whether the report is ready for follow-up work:

- Did the agent identify the active bootstrap chain?
- Did it find the root or main project spec?
- Did it avoid treating sibling specs as authority?
- Did it avoid editing files?
- Did it mention existing dirty worktree changes?
- Did it keep conclusions scoped to orientation?

If the report makes broad authority claims, correct that before asking for implementation.

### 5. Resolve the exact spec chain later

After orientation, use a target-specific prompt for the next phase:

```text
Plan the Itinerary validation change.
```

or:

```text
Implement the Itinerary validation task.
```

The next skill should resolve the governing spec chain for that concrete target. Do not reuse orientation context as
write authority.

## SpecDD pattern

This workflow uses:

- bootstrap files for framework and project context
- root specs for high-level authority
- top-level specs for light repository orientation
- git status to distinguish existing work from new changes
- later target-specific resolution for actual work

## Common mistakes

- Asking for orientation and implementation in one prompt.
- Treating an orientation report as permission to edit files later.
- Expecting the agent to inspect every local spec during orientation.
- Skipping target-specific spec resolution after orientation.
- Ignoring existing worktree changes reported during orientation.

## How to verify the result

Orientation worked when:

- no files were edited
- the agent reports bootstrap and root spec context
- repository shape is summarized briefly
- git status was checked
- blockers or missing bootstrap files are called out
- the next concrete task still requires its own spec-chain resolution

## Related how-tos

- [How to choose the right SpecDD skill](/how-to/work-with-specdd-skills/how-to-choose-the-right-specdd-skill/)
- [How to ask an agent to explain a spec before implementation](/how-to/agent-workflows/how-to-ask-an-agent-to-explain-a-spec-before-implementation/)
- [How to ask an agent to plan before coding](/how-to/agent-workflows/how-to-ask-an-agent-to-plan-before-coding/)
- [How to chain SpecDD skills safely](/how-to/work-with-specdd-skills/how-to-chain-specdd-skills-safely/)

## Related reference

- [Tools](/tools/)
- [Language reference](/language-reference/)
