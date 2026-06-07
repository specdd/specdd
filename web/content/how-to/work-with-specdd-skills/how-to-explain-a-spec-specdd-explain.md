---
title: "How to explain a spec (specdd-explain)"
seoDescription: "Explain a SpecDD spec for spec-driven development in plain language with specdd-explain by resolving the governing contract, summarizing ownership and constraints, and naming what may and may not change."
excerpt: "Use specdd-explain to get a plain-language summary of any spec or target before planning or implementation, without editing files."
level: "Beginner"
howtoID: "1091015"
weight: 40
---

This guide shows you how to explain a spec or target with `specdd-explain` in a spec-driven development workflow.

`specdd-explain` is a read-only skill. It resolves the governing contract for a spec, file, or directory and
summarizes what the agent found in plain language: purpose, ownership, allowed edits, forbidden edits, active tasks,
and completion criteria.

## Short answer

Use `specdd-explain` when you need to understand a spec before planning or implementing. Give the agent a spec name,
file, or area. The agent resolves the governing chain, then explains what the contract allows, forbids, owns, and
requires. No files are edited.

## When to use this guide

Use this guide when:

- a spec is unfamiliar before you start a task
- an agent is about to implement something and you want to check its understanding first
- a reviewer needs a plain-language summary of a contract
- you want to confirm which rules actually govern a change before asking for a plan
- a spec has been updated and you want to verify the new meaning

## Principle

Understanding before editing.

`specdd-explain` puts the contract into words before any code changes. If the explanation is wrong, fix the spec or
correct the agent before implementation begins. It is cheaper to catch a misunderstanding in a plain-language summary
than in a diff review.

## Steps

### 1. Identify the target to explain

Pick a spec, file, or area you want the agent to explain.

Examples:

```text
Explain the Itinerary spec.
```

```text
Explain what governs src/trips/itinerary.js.
```

```text
Explain the validation rules for the Itinerary module.
```

### 2. Keep the request read-only

`specdd-explain` should not plan, implement, or edit. It is for understanding.

Good:

```text
Explain the Itinerary spec without making any changes.
```

Not an explanation request:

```text
Explain the Itinerary spec and fix the validation task.
```

Split those into separate prompts.

### 3. Check the explanation report

A useful `specdd-explain` report names:

- what the spec governs (purpose and subject)
- what the spec or parent specs own
- what is allowed to change and what is not
- active tasks and their state
- completion criteria in `Done when`
- constraints from `Must` and `Must not`
- dependencies from `Depends on` and `Forbids`
- anything the spec says is explicitly out of scope

If the report misidentifies ownership, scope, or constraints, update the spec before proceeding.

### 4. Use the explanation as a checkpoint

After the explanation, decide what to do next:

- If understanding is sufficient, move to `specdd-plan` or `specdd-do`.
- If the spec is unclear, use `specdd-author` to revise it before planning.
- If the scope is wrong, update `Owns`, `Must`, or `Must not` first.

## Common mistakes

- Asking for explanation and implementation in one prompt.
- Treating a summary as write authority.
- Skipping the explanation step and going straight to implementation when a spec is unfamiliar.
- Accepting an explanation report that silently broadens or narrows the spec's scope.

## How to verify the result

`specdd-explain` worked when:

- no files were edited
- the report names purpose, ownership, and key constraints in plain terms
- allowed and forbidden edits are clearly distinguished
- active tasks and `Done when` are mentioned if present
- the explanation is consistent with the actual spec content

## Related how-tos

- [How to orient an agent in a SpecDD project](/how-to/work-with-specdd-skills/how-to-orient-an-agent-in-a-specdd-project-specdd-orient/)
- [How to plan a change under spec authority](/how-to/work-with-specdd-skills/how-to-plan-a-change-under-spec-authority-specdd-plan/)
- [How to ask an agent to explain a spec before implementation](/how-to/agent-workflows/how-to-ask-an-agent-to-explain-a-spec-before-implementation/)
- [How to choose the right SpecDD skill](/how-to/work-with-specdd-skills/how-to-choose-the-right-specdd-skill/)

## Related reference

- [Tools](/tools/)
- [Language reference](/language-reference/)
