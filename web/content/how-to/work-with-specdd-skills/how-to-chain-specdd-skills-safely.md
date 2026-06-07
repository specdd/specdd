---
title: "How to chain SpecDD skills safely"
seoDescription: "Chain SpecDD skills safely in a spec-driven development workflow by separating orientation, planning, authoring, implementation, testing, review, and tracing into clear phases with checkpoints."
excerpt: "Use SpecDD skills in short, phase-based sequences so agents do not carry stale authority, skip review, or mix read-only and editing work."
level: "Intermediate"
howtoID: "1091014"
weight: 20
---

This guide shows you how to chain SpecDD skills safely in a spec-driven development workflow without turning them into
one giant agent workflow.

SpecDD skills are phase tools. The safest chain separates orientation, explanation, risk, planning, authoring,
implementation, testing, review, tracing, debugging, and refactoring into checkpoints.

## Short answer

Chain skills by phase. Start with orientation, explanation, risk, or planning when context is unclear. Use authoring
before implementation when specs need work. Use implementation only after authority is clear. Use testing, review, and
trace as separate verification steps. When the target changes, rerun target-specific spec-chain resolution instead of
reusing stale context.

## When to use this guide

Use this guide when:

- a change needs more than one SpecDD skill
- an agent keeps mixing planning and implementation
- implementation depends on a new or revised spec
- a risky change needs checkpoints
- several agents or sessions will work on one feature
- review needs trace or test follow-up

## Steps

### 1. Start with the current phase

Do not always start from the same skill. Choose the first skill based on what is missing.

Examples:

- unfamiliar project: `specdd-orient`
- unclear behavior: `specdd-explain`
- unclear scope: `specdd-plan`
- unclear risk: `specdd-risk`
- missing spec: `specdd-author`
- ready implementation task: `specdd-do`
- existing diff: `specdd-review`

The first skill should reduce uncertainty.

### 2. Use one prompt per action

Good:

```text
Plan the Itinerary validation change.
```

Then:

```text
Implement the approved Itinerary validation plan.
```

Then:

```text
Review the Itinerary validation diff.
```

Avoid combining those into one prompt. Separate prompts give you a chance to catch wrong assumptions before files
change.

### 3. Checkpoint before editing

Before any editing skill such as `specdd-author`, `specdd-do`, `specdd-test`, `specdd-debug`, or `specdd-refactor`, the
agent should know:

- target scope
- applicable spec chain
- write authority
- relevant `Must`, `Must not`, and `Forbids`
- tasks and `Done when`
- verification expected
- blockers or unresolved decisions

If any of these are unclear and the ambiguity affects scope, authority, public behavior, or risk, stop and resolve that
before editing.

### 4. Verify after implementation

After `specdd-do`, `specdd-debug`, `specdd-test`, or `specdd-refactor`, use verification:

- focused tests
- existing project checks
- `specdd lint` for edited `.sdd` files
- documentation build for docs changes
- manual review for behavior that cannot be automated

Then update task status only after verification.

### 5. Review before the next phase

Use `specdd-review` after a meaningful diff:

```text
Review the Itinerary validation diff.
```

Use `specdd-trace` when you need coverage mapping:

```text
Trace the Itinerary validation change to tests.
```

Review and trace are different. Review judges a diff. Trace explains relationships and gaps.

### 6. Rerun resolution when the target changes

Do not carry write authority from one target to another.

If the work moves from Itinerary to TripStorage, the agent should resolve the TripStorage spec chain. Orientation or a
previous implementation plan is not enough.

This is especially important when:

- a referenced spec becomes the next edit target
- a refactor moves files across boundaries
- a bug fix touches a dependency
- a task changes from local behavior to cross-module behavior

## Example chains

For a small implementation:

```text
Plan the Itinerary validation change.
```

```text
Implement the approved Itinerary validation plan.
```

```text
Review the Itinerary validation diff.
```

For missing spec context:

```text
Author the Itinerary validation spec.
```

```text
Implement the Itinerary validation task.
```

```text
Trace the Itinerary validation behavior to tests.
```

For a risky bug:

```text
Assess risk for the Itinerary storage failure.
```

```text
Debug the Itinerary storage failure.
```

```text
Review the Itinerary storage fix.
```

## Common mistakes

- Building one prompt that asks for orientation, planning, implementation, tests, review, and trace.
- Letting a read-only skill silently become an editing step.
- Reusing orientation context as write authority.
- Skipping review after a generated implementation.
- Marking tasks done before verification.
- Continuing under the old spec chain after the target changes.

## How to verify the result

The skill chain worked when:

- each prompt had one action
- each phase produced the expected artifact
- editing started only after authority was clear
- checks ran before task completion
- review or trace happened after meaningful changes
- target changes triggered fresh spec-chain resolution
- unresolved decisions remained visible instead of being guessed

## Related how-tos

- [How to choose the right SpecDD skill](/how-to/work-with-specdd-skills/how-to-choose-the-right-specdd-skill/)
- [How to orient an agent in a SpecDD project](/how-to/work-with-specdd-skills/how-to-orient-an-agent-in-a-specdd-project-specdd-orient/)
- [How to explain a spec (specdd-explain)](/how-to/work-with-specdd-skills/how-to-explain-a-spec-specdd-explain/)
- [How to plan a change under spec authority (specdd-plan)](/how-to/work-with-specdd-skills/how-to-plan-a-change-under-spec-authority-specdd-plan/)
- [How to implement under spec authority](/how-to/work-with-specdd-skills/how-to-implement-under-spec-authority-specdd-do/)
- [How to review a diff against specs](/how-to/work-with-specdd-skills/how-to-review-a-diff-against-specs-specdd-review/)

## Related reference

- [Tools](/tools/)
- [Language reference](/language-reference/)
