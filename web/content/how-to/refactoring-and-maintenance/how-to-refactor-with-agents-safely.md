---
title: "How to refactor with agents safely"
seoDescription: "Refactor with agents safely by constraining scope, reviewing the plan, preserving spec-driven development behavior, running checks, and rejecting boundary-crossing changes."
excerpt: "Use SpecDD to keep agent-assisted refactors small, behavior-preserving, authorized, and verifiable."
level: "Intermediate"
howtoID: "1151001"
weight: 20
---

This guide shows you how to refactor with agents safely in a spec-driven development workflow.

Agents are useful at mechanical refactors, but they can also make confident structural changes that quietly alter
behavior, widen dependencies, or touch files outside the intended boundary. SpecDD gives the agent and the reviewer a
shared contract for what must be preserved.

The safest pattern is to keep the agent focused: one target, one refactor goal, a reviewed plan, small steps, and checks
that prove behavior stayed the same.

## Short answer

Ask the agent to refactor a named subject, not a broad area. Review its plan before edits when the refactor is risky.
Require preservation of `Must`, `Must not`, `Forbids`, scenarios, public contracts, and write authority. Keep prompts
small, run checks, and reject changes that move behavior or ownership without a reviewed spec update.

## When to use this guide

Use this guide when:

- an agent will split, move, rename, or reorganize code
- behavior must remain unchanged
- the refactor touches several files
- public contracts or tests must be preserved
- previous agent edits changed too much
- reviewers need a clear way to evaluate the agent's diff

## Steps

### 1. Name the refactor target

Good:

```text
Refactor the Itinerary validation internals.
```

Weak:

```text
Clean up the trips area.
```

The first prompt names a human subject. The second invites broad edits.

### 2. Ask for a preservation plan

For anything beyond a tiny cleanup, ask for the plan first:

```text
Plan the Itinerary validation refactor.
```

Review whether the plan preserves:

- required behavior
- negative boundaries
- public contracts
- write authority
- tests
- dependency direction

If the plan includes behavior changes, split the work.

### 3. Limit write scope

The agent should edit only files authorized by `Can modify` or `Owns`.

If the refactor needs another area, decide why:

- the spec authority is stale and needs an update
- the refactor target is too broad
- the implementation plan is crossing a boundary
- a separate local refactor task is needed

Do not treat referenced context as editable scope.

### 4. Refactor one step at a time

Useful prompts:

```text
Extract the Itinerary validation result builder.
```

```text
Move the Itinerary validation tests with the renamed helper.
```

```text
Update the Itinerary validation spec paths after the file move.
```

Each prompt asks for one action. Review between steps when the refactor is risky.

### 5. Preserve behavior explicitly

Before accepting the result, compare the diff against:

- `Must` entries
- `Scenario` examples
- `Done when`
- public `Exposes`, `Accepts`, `Returns`, and `Raises`
- `Must not`
- `Forbids`

A refactor that makes tests pass by changing expected behavior is not safe.

### 6. Run checks

Run:

- focused tests for the refactored subject
- relevant package or module tests
- static boundary checks when dependency rules matter
- `specdd lint` if specs changed
- project quality gates defined by the project

If checks cannot run, keep that uncertainty visible.

### 7. Review the agent's final report

The report should name:

- files changed
- behavior preserved
- specs updated, if any
- checks run
- checks skipped
- remaining risks or questions

Do not accept a vague "done" report for a structural change.

## Common mistakes

- Asking an agent to "clean up" a broad module without a target.
- Letting the agent combine refactoring and feature work.
- Skipping plan review for a large move.
- Accepting edits outside `Can modify` because the code compiles.
- Letting tests be rewritten to match changed behavior.
- Forgetting to lint specs after moved paths are updated.

## How to verify the result

The agent-assisted refactor is safe when:

- the target was narrow
- the plan preserved the governing spec contract
- edits stayed inside authority
- behavior and public contracts are unchanged
- structure-related spec paths were updated
- checks ran or skipped checks are explained
- reviewers can reject any boundary crossing by pointing to a specific spec rule

## Related how-tos

- [How to refactor with SpecDD](/how-to/refactoring-and-maintenance/how-to-refactor-with-specdd/)
- [How to review a diff against specs](/how-to/work-with-specdd-skills/how-to-review-a-diff-against-specs-specdd-review/)
- [How to define write authority for agents](/how-to/code-review-and-governance/how-to-define-write-authority-for-agents/)
- [How to chain SpecDD skills safely](/how-to/work-with-specdd-skills/how-to-chain-specdd-skills-safely/)

## Related reference

- [Language reference](/language-reference/)
