---
title: "How to use SpecDD in agile teams"
seoDescription: "Use spec-driven development in agile teams by keeping planning and prioritization in tickets while moving durable behavior, boundaries, tasks, and done criteria into local specs."
excerpt: "Fit SpecDD into agile work by using tickets for planning and prioritization, specs for durable local contracts, and reviews to keep code, tests, and specs aligned."
level: "Intermediate"
howtoID: "1171003"
weight: 60
---

This guide shows you how to use spec-driven development in agile teams without replacing tickets, sprint planning, or delivery tracking.

SpecDD fits best when it handles durable implementation context while your agile process continues to handle priority,
capacity, sequencing, and release coordination.

## Short answer

Use tickets for planning across teams, prioritization, release tracking, product management, and long-running work. Use
SpecDD specs for durable behavior, boundaries, local tasks, and completion criteria. During refinement, convert stable
requirements into local specs. During implementation, complete one spec task at a time and review the diff against the
spec before closing the ticket.

## When to use this guide

Use this guide when:

- your team works from sprints, kanban, or backlog tickets
- acceptance criteria are lost after tickets close
- implementation details drift from story intent
- agents are used during agile delivery
- reviewers need durable context beyond the ticket description

## Steps

### 1. Keep tickets for planning

Tickets remain useful for:

- backlog priority
- sprint or kanban planning
- cross-team coordination
- product decisions
- release tracking
- stakeholder communication
- long-running work

Do not force SpecDD to become your project-management system.

### 2. Use specs for durable behavior

Move durable local behavior into `.sdd` files:

```sdd
Spec: Itinerary

Must:
  Reject itinerary items without a place name.

Must not:
  Change destination search behavior.

Done when:
  Missing-place behavior is covered by a check.
```

The ticket can close. The spec remains near the code.

### 3. Refine stories into local specs

During refinement, ask:

- Which local area owns this behavior?
- Is there already a spec?
- What `Must` rules are stable enough to keep?
- What `Must not` boundaries prevent likely wrong work?
- What `Done when` criteria prove completion?
- What assumptions need a decision?

If the story is still uncertain, keep uncertainty visible with `[?]` tasks or ticket notes. Do not turn unresolved
questions into permanent spec rules.

### 4. Implement one spec task at a time

Use local `Tasks` entries for small work packets:

```sdd
Tasks:
  [ ] Add missing-place validation.
```

Then implement:

```text
Implement the Itinerary validation task.
```

The ticket may contain several tasks. The implementation should still move through one local spec or small related group
at a time.

### 5. Review against the spec

Pull request review should check:

- changed files are inside `Owns` or `Can modify`
- `Must` behavior is satisfied
- `Must not` and `Forbids` are preserved
- tests or checks cover `Done when`
- task status is updated only after verification
- ticket scope and spec scope still match

This keeps agile delivery from becoming detached from the durable contract.

### 6. Close tickets with aligned specs

Before closing the ticket:

- completed spec tasks are marked `[x]`
- unfinished spec tasks remain open, blocked, or undecided
- behavior changes are reflected in specs
- tests or checks support the done criteria
- ticket links point to the relevant spec or pull request

Do not close the ticket by leaving the spec stale for later.

## Example

Ticket:

```text
As a trip planner, I want itinerary items without a place name to be rejected.
```

Spec:

```sdd
Must:
  Reject itinerary items without a place name.

Tasks:
  [ ] Add missing-place validation.

Done when:
  Missing-place behavior is covered by a check.
```

The ticket tracks delivery. The spec preserves the behavior and review contract.

## Common mistakes

- Replacing tickets with SpecDD tasks.
- Keeping acceptance criteria only in tickets after behavior ships.
- Writing one broad spec for an entire sprint.
- Marking ticket done while spec tasks remain inaccurate.
- Letting agent prompts carry story context instead of putting stable behavior in specs.

## How to verify the result

SpecDD is fitting the agile process when:

- tickets still handle planning and priority
- specs hold durable behavior and boundaries
- refinement produces local spec updates when needed
- implementation follows reviewed specs
- checks prove `Done when`
- ticket closure leaves specs, code, tests, and task status aligned

## Related how-tos

- [How to decide what belongs in a ticket vs a spec](/how-to/teams-and-process/how-to-decide-what-belongs-in-a-ticket-vs-a-spec/)
- [How to keep specs and tickets aligned](/how-to/teams-and-process/how-to-keep-specs-and-tickets-aligned/)
- [How to run a spec-first development process](/how-to/teams-and-process/how-to-run-a-spec-first-development-process/)
- [How to keep specs in sync with code changes](/how-to/spec-driven-workflows/how-to-keep-specs-in-sync-with-code-changes/)

## Related reference

- [Quickstart](/quickstart/)
- [Language reference](/language-reference/)
