---
title: "How to keep agent prompts short with SpecDD"
seoDescription: "Keep agent prompts short with spec-driven development by moving durable context into specs, naming the task, using one instruction, and reviewing output against the contract."
excerpt: "Use SpecDD to replace long repeated agent prompts with local specs, short task names, separate planning and implementation requests, and contract-based review."
level: "Beginner"
howtoID: "1041014"
weight: 170
---

This guide shows you how to keep agent prompts short while preserving the context an agent needs to do correct work in a spec-driven development workflow.

Short prompts are not vague when the project has good specs. With SpecDD, the prompt names the work and the repository
files provide intent, authority, boundaries, tasks, and checks.

## Short answer

Write durable context into `.sdd` specs and bootstrap files. Then prompt the specific action:

```text
Plan the Itinerary validation change.
```

or:

```text
Implement the open validation task.
```

Keep each prompt to one instruction. Use separate prompts for explanation, planning, implementation, and review.

## Why this works

Long prompts often try to carry too many jobs:

- explain project rules
- identify the target
- define ownership
- list forbidden files
- describe behavior
- request implementation
- request tests
- request reporting

SpecDD moves most of that durable context into files. The agent can use bootstrap files for workflow rules, root specs
for broad intent, local specs for behavior and authority, and tasks for current work. The prompt can stay focused.

## Steps

### 1. Move repeated prompt context into specs

If you keep typing a rule, write it where it belongs.

Local behavior:

```sdd
Must:
  Missing place names are rejected before an itinerary item is stored.
```

Local boundary:

```sdd
Must not:
  Change destination search behavior.
```

Writable scope:

```sdd
Can modify:
  ./itinerary.js
  ./itinerary.test.js
```

Shared project conventions belong in:

```text
.specdd/bootstrap.project.md
```

Do not use a long prompt as a substitute for missing project context.

### 2. Name the work in human terms

Good prompt:

```text
Implement the missing-place validation task.
```

This identifies the task. The spec supplies the rest.

Vague prompt:

```text
Improve trip validation.
```

This invites scope expansion.

### 3. Use one instruction per prompt

Use separate prompts for separate phases:

```text
Explain the Itinerary spec.
```

```text
Plan the Itinerary validation change.
```

```text
Implement the approved Itinerary validation plan.
```

```text
Review this change against the Itinerary spec.
```

This gives you a review point between understanding, planning, implementation, and review.

### 4. Avoid bundling optional work

A short prompt should not hide extra scope.

Too broad:

```text
Implement the validation task, refactor related code, update nearby tests, close all open tasks, and clean up the module.
```

Better:

```text
Implement the missing-place validation task.
```

If related cleanup is truly needed, create a separate task or spec update.

### 5. Use tasks to make short prompts precise

Tasks let short prompts refer to a durable local work packet:

```sdd
Tasks:
  [ ] Add missing-place validation.
```

Then:

```text
Complete the open Itinerary validation task.
```

The task should be specific enough that the agent does not have to infer the work from a vague prompt.

### 6. Use `Done when` to keep short prompts safe

Completion criteria prevent short prompts from becoming under-specified:

```sdd
Done when:
  Missing-place behavior is covered by a check.
  Existing itinerary ordering still passes.
```

The prompt can be short because "done" is defined in the spec.

### 7. Review the result against the contract

Short prompts need strong review. Check:

- changed files are allowed
- required behavior is satisfied
- prohibited behavior is preserved
- checks match `Done when`
- tasks are marked done only after verification
- missing context is added to specs

## Prompt examples

For orientation:

```text
Orient in this SpecDD project.
```

For explanation:

```text
Explain the Itinerary spec.
```

For planning:

```text
Plan the Itinerary validation change.
```

For implementation:

```text
Implement the approved Itinerary validation plan.
```

For review:

```text
Review this change against the Itinerary spec.
```

## Common mistakes

- Shortening prompts before the relevant spec exists.
- Packing several instructions into one "short" prompt.
- Using vague names that do not point to a spec, task, feature, or behavior.
- Repeating project conventions in prompts instead of `.specdd/bootstrap.project.md`.
- Letting short prompts bypass plan review for risky work.

## How to verify the result

Your prompts are short in the right way when:

- durable context lives in specs and bootstrap files
- prompts identify one action
- the agent can explain the target spec before work
- plans stay within local authority
- final changes satisfy `Done when`
- reviewers do not need chat history to understand the work

## Related how-tos

- [How to prompt an agent with SpecDD](/how-to/agent-workflows/how-to-prompt-an-agent-with-specdd/)
- [How to use specs as agent memory](/how-to/agent-workflows/how-to-use-specs-as-agent-memory/)
- [How to manage context for agents](/how-to/agent-workflows/how-to-manage-context-for-agents/)

## Related reference

- [Quickstart](/quickstart/)
- [Language reference](/language-reference/)
