---
title: "How to run a spec-first development process"
seoDescription: "Run a spec-first development process with spec-driven development by reviewing the local spec before implementation, building one bounded task, checking it, and keeping specs and code aligned."
excerpt: "Use SpecDD as a repeatable team development loop: specify, review, implement, verify, update tasks, and review the diff against the local contract."
level: "Intermediate"
howtoID: "1171007"
weight: 40
---

This guide shows you how to run a spec-first development process with spec-driven development as a team workflow.

The process is simple: define the local contract before implementation, build inside that contract, verify the result,
and keep the contract aligned with code.

## Short answer

Use a repeatable loop: choose one local target, write or update the relevant `.sdd` spec, review it until intent and
boundaries are clear, implement one task or behavior, run checks, update task status only after verification, and review
the final diff against the spec.

## When to use this guide

Use this guide when:

- a team wants a standard development workflow with SpecDD
- agents or humans need shared implementation context
- review quality depends on knowing local boundaries
- features are being implemented from vague tickets
- code and specs need to stay aligned in every pull request

## Steps

### 1. Select a local work target

Choose a target small enough to complete and review:

```text
Itinerary missing-place validation
```

Prefer one spec or one small related group of specs. Large multi-area changes should be split or planned separately.

### 2. Write or update the spec first

Create or update the local `.sdd` file:

```sdd
Spec: Itinerary

Purpose:
  Keep a trip itinerary organized by day.

Owns:
  ./itinerary.js
  ./itinerary.test.js

Must:
  Reject itinerary items without a place name.

Must not:
  Change destination search behavior.

Tasks:
  [ ] Add missing-place validation.

Done when:
  Missing-place behavior is covered by a check.
```

The spec describes the resulting contract, not the ticket or prompt.

### 3. Review the spec

Before implementation, review:

- is the subject clear?
- is write authority explicit?
- are required behaviors testable?
- are plausible wrong changes blocked?
- are tasks local?
- does `Done when` define completion?
- are unresolved assumptions marked?

Implementation should be driven by reviewed specs.

### 4. Implement one bounded task

Use a short task prompt or work packet:

```text
Implement the Itinerary validation task.
```

The implementation should stay inside `Can modify` or `Owns`. If the task needs files outside that boundary, stop and
revise the spec or split the work.

### 5. Run checks

Run checks that prove the behavior:

- focused tests
- existing area tests
- linting or type checks
- documentation checks when docs changed
- `specdd lint` when specs changed

If checks cannot run, record why.

### 6. Update tasks and specs

After verification:

```sdd
Tasks:
  [x] Add missing-place validation.
```

If implementation changed behavior beyond the original spec, update the spec in the same changeset or stop for review
when the new behavior is uncertain.

### 7. Review the diff against the spec

Review the finished work:

- changed files are authorized
- `Must` rules are satisfied
- `Must not` and `Forbids` are preserved
- scenarios or `Done when` are checked
- task status matches reality
- code, tests, and specs tell the same story

This makes the spec-first process enforceable rather than ceremonial.

## Team operating rules

- Keep project-wide conventions in `.specdd/bootstrap.project.md`.
- Keep local behavior in local `.sdd` files.
- Keep tickets for planning and specs for durable contracts.
- Review spec changes like code changes.
- Implement one spec or task at a time when possible.
- Commit spec and code changes together when behavior changes.

## Common mistakes

- Writing the spec after implementation as a summary.
- Letting a ticket replace the spec.
- Asking an agent to implement before the spec is reviewed.
- Marking tasks done before checks pass.
- Expanding one spec-first change into broad cleanup.

## How to verify the result

The process is working when:

- each change starts from a local spec or reviewed spec update
- implementation stays inside local authority
- checks prove `Done when`
- task status is accurate
- review compares the diff to the spec
- specs remain aligned with code after merge

## Related how-tos

- [How to run the spec-first loop](/how-to/spec-driven-workflows/how-to-run-the-spec-first-loop/)
- [How to implement one spec at a time](/how-to/spec-driven-workflows/how-to-implement-one-spec-at-a-time/)
- [How to keep specs reviewed but lightweight](/how-to/teams-and-process/how-to-keep-specs-reviewed-but-lightweight/)
- [How to use SpecDD in agile teams](/how-to/teams-and-process/how-to-use-specdd-in-agile-teams/)

## Related reference

- [Quickstart](/quickstart/)
- [Language reference](/language-reference/)
