---
title: "How to choose the right SpecDD skill"
seoDescription: "Choose the right SpecDD skill for spec-driven development work: orientation, explanation, planning, authoring, implementation, review, tracing, testing, risk, debugging, refactoring, tasks, CLI, and adoption."
excerpt: "Pick the SpecDD skill that matches the workflow phase so agents do not mix orientation, planning, implementation, review, testing, and adoption work."
level: "Beginner"
howtoID: "1091013"
weight: 10
---

This guide shows you how to choose the right SpecDD skill for spec-driven development work.

SpecDD skills work best when each prompt matches one workflow phase. Orientation, explanation, planning, authoring,
implementation, review, tracing, testing, debugging, refactoring, task management, CLI usage, and adoption are different
kinds of work.

## Short answer

Choose the skill by outcome. Use `specdd-orient` to get ready, `specdd-explain` to understand a contract, `specdd-plan`
to plan safely, `specdd-author` to write specs, `specdd-do` to implement, `specdd-review` to review diffs,
`specdd-trace` to map coverage, `specdd-test` to derive tests, `specdd-risk` to classify risk, `specdd-debug` to fix
bugs, `specdd-refactor` to preserve behavior while restructuring, `specdd-task` to manage tasks, `specdd-cli` for CLI
discovery or linting, and `specdd-adopt` for setup or framework updates.

## Steps

### 1. Identify the workflow phase

Ask what you want the agent to produce:

- readiness summary
- explanation
- plan
- spec edit
- implementation
- review findings
- trace map
- tests
- risk call
- bug fix
- refactor
- task update
- CLI output
- adoption plan

If the answer contains several outcomes, split it into several prompts.

### 2. Choose read-only skills before editing

Use read-only skills when you need understanding before changes:

| Need | Skill |
| --- | --- |
| Project readiness | `specdd-orient` |
| Plain-language contract explanation | `specdd-explain` |
| Safe implementation plan | `specdd-plan` |
| Risk classification | `specdd-risk` |
| Review findings | `specdd-review` |
| Spec-code-test map | `specdd-trace` |

These skills should not edit files unless the user explicitly asks for a follow-up edit.

### 3. Choose authoring or implementation deliberately

Use `specdd-author` when the spec is the artifact:

```text
Author the Itinerary validation spec.
```

Use `specdd-do` when the implementation is the artifact:

```text
Implement the Itinerary validation task.
```

Do not use implementation to silently fix missing spec authority. If the spec is unclear, author or plan first.

### 4. Choose review, trace, test, debug, or refactor by outcome

Use:

- `specdd-review` when a diff needs findings
- `specdd-trace` when you need relationships among specs, code, tests, docs, and gaps
- `specdd-test` when tests should be derived, added, updated, or assessed
- `specdd-debug` when observed behavior fails against a contract
- `specdd-refactor` when structure should change while specified behavior stays the same

These can look similar, but the output is different. A trace explains coverage. A review judges a diff. A debug task
fixes a failure. A refactor preserves behavior.

### 5. Use CLI and adoption skills only for their scope

Use `specdd-cli` for CLI-assisted discovery, inspection, linting, setup, or updates. Remember that CLI output does not
grant write authority.

Use `specdd-adopt` when adding SpecDD to a project or updating framework bootstrap files by explicit request. Do not
use it for normal spec edits in an already bootstrapped project.

### 6. Switch skills when the phase changes

Good sequence:

```text
Orient yourself in this project.
```

```text
Plan the Itinerary validation change.
```

```text
Implement the approved Itinerary validation plan.
```

```text
Review the Itinerary validation diff.
```

Each prompt asks for one action. That keeps the agent from mixing readiness, planning, editing, and review before you
can catch wrong assumptions.

## Quick decision table

| If you need to... | Use... |
| --- | --- |
| Start in an unfamiliar SpecDD repo | `specdd-orient` |
| Explain a spec or target | `specdd-explain` |
| Plan before editing | `specdd-plan` |
| Write or revise `.sdd` files | `specdd-author` |
| Implement authorized changes | `specdd-do` |
| Review a diff | `specdd-review` |
| Map specs to files and gaps | `specdd-trace` |
| Derive or assess tests | `specdd-test` |
| Classify risk | `specdd-risk` |
| Diagnose a failure | `specdd-debug` |
| Refactor without behavior change | `specdd-refactor` |
| Manage `Tasks` entries | `specdd-task` |
| Use `specdd` commands | `specdd-cli` |
| Add or update SpecDD framework files | `specdd-adopt` |

## Common mistakes

- Asking one prompt to orient, plan, implement, test, and review.
- Using `specdd-do` when the spec still needs authoring.
- Using `specdd-adopt` in an already bootstrapped project for normal work.
- Treating a review skill as a fix request.
- Treating a trace report as write authority.
- Continuing with the same skill after the workflow phase changed.

## How to verify the result

You chose the right skill when:

- the prompt asks for one action
- the output matches the expected artifact
- read-only phases do not edit files
- editing phases confirm authority
- the agent stops when authority, risk, or behavior is unclear
- follow-up work uses a new prompt for the next phase

## Related how-tos

- [How to chain SpecDD skills safely](/how-to/work-with-specdd-skills/how-to-chain-specdd-skills-safely/)
- [How to orient an agent in a SpecDD project](/how-to/work-with-specdd-skills/how-to-orient-an-agent-in-a-specdd-project-specdd-orient/)
- [How to explain a spec (specdd-explain)](/how-to/work-with-specdd-skills/how-to-explain-a-spec-specdd-explain/)
- [How to plan a change under spec authority (specdd-plan)](/how-to/work-with-specdd-skills/how-to-plan-a-change-under-spec-authority-specdd-plan/)
- [How to implement under spec authority](/how-to/work-with-specdd-skills/how-to-implement-under-spec-authority-specdd-do/)
- [How to review a diff against specs](/how-to/work-with-specdd-skills/how-to-review-a-diff-against-specs-specdd-review/)

## Related reference

- [Tools](/tools/)
