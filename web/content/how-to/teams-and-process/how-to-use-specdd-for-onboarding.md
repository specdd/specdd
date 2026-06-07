---
title: "How to use SpecDD for onboarding"
seoDescription: "Use spec-driven development for onboarding by giving new contributors local specs, ownership boundaries, behavior rules, tasks, and review criteria near the code they will change."
excerpt: "Onboard developers and agents with SpecDD by starting from the root spec, reading the local spec for one first change, and reviewing implementation against clear local contracts."
level: "Beginner"
howtoID: "1171002"
weight: 30
---

This guide shows you how to use spec-driven development for onboarding new contributors, including developers, technical leads, and
agents.

Onboarding works better when new contributors can learn the area they are touching without reading every historical
ticket, chat thread, and architecture conversation. SpecDD makes that possible by keeping intent and boundaries near the
work.

## Short answer

Use SpecDD onboarding around one real first change. Start with the root project spec, then read the local spec for the
target area. Explain what the area owns, what it may modify, what it may read, what it must do, what it must not do, and
what `Done when` means. Then implement a small task and review the diff against the spec.

## When to use this guide

Use this guide when:

- a new teammate is joining a project
- a team is adding agents to an existing workflow
- a contributor needs context for one module quickly
- ownership boundaries are hard to infer from code alone
- onboarding docs are stale or too broad for the first task

## Steps

### 1. Start with the root context

Show the new contributor the root spec first:

```text
travel-planner.sdd
```

The root spec should explain the big picture: purpose, major structure, global constraints, and project-level non-goals.
Keep this introduction short. The goal is orientation, not full system mastery.

### 2. Choose one first change

Pick a small task in one local area:

```text
Add missing-place validation to Itinerary.
```

Avoid first tasks that span multiple modules, migrations, security-sensitive behavior, or unclear ownership.

### 3. Read the local spec

For a target like:

```text
src/trips/itinerary.js
```

use:

```text
src/trips/itinerary.sdd
```

Walk through:

- `Purpose`
- `Owns` or `Can modify`
- `Can read` and `References`
- `Must`
- `Must not` and `Forbids`
- `Tasks`
- `Done when`
- scenarios or examples

This is the local contract for the first change.

### 4. Explain boundaries and tasks

Ask the contributor to summarize:

- what this area owns
- which files are writable
- which context is read-only
- what behavior must remain true
- what behavior is out of scope
- what proves the task is complete

This helps them learn the project through the same lens reviewers will use.

### 5. Pair on one spec-driven change

Use a task-focused prompt or human work packet:

```text
Implement the Itinerary validation task.
```

Keep the first change small. The goal is to learn the loop: spec, implementation, checks, task status, review.

### 6. Use review as reinforcement

In review, compare the diff to the spec:

- Did changed files stay inside authority?
- Did the implementation satisfy `Must`?
- Did it preserve `Must not` and `Forbids`?
- Did checks cover `Done when` or scenarios?
- Was task status updated only after verification?

This teaches the review process and the codebase at the same time.

## Example onboarding path

```text
Day 1:
- Read travel-planner.sdd.
- Read src/trips/itinerary.sdd.
- Explain Itinerary ownership and boundaries.
- Plan the missing-place validation task.

Day 2:
- Implement the task.
- Run checks.
- Review the diff against the spec.
```

## Common mistakes

- Giving the new contributor a broad architecture tour before one local task.
- Using tickets as the only source of onboarding context.
- Letting a first task cross several spec boundaries.
- Skipping `Must not` and `Forbids` during onboarding.
- Treating onboarding specs as documentation only instead of active contracts.

## How to verify the result

Onboarding with SpecDD worked when the new contributor can:

- find the root and local spec
- explain local ownership and writable scope
- identify read-only referenced context
- complete one small task inside authority
- run or name the relevant checks
- review their diff against the spec

## Related how-tos

- [How to use basic SpecDD levels](/how-to/getting-started/how-to-use-basic-specdd-levels/)
- [How to orient an agent in a SpecDD project](/how-to/work-with-specdd-skills/how-to-orient-an-agent-in-a-specdd-project-specdd-orient/)
- [How to run your first spec-driven change end to end](/how-to/getting-started/how-to-run-your-first-spec-driven-change-end-to-end/)
- [How to assign ownership for specs](/how-to/teams-and-process/how-to-assign-ownership-for-specs/)

## Related reference

- [Quickstart](/quickstart/)
- [Language reference](/language-reference/)
