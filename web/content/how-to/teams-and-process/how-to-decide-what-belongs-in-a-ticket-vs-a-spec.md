---
title: "How to decide what belongs in a ticket vs a spec"
seoDescription: "Decide what belongs in tickets versus SpecDD specs in a spec-driven development workflow by keeping planning, priority, and release tracking in tickets while durable behavior and boundaries live in local .sdd files."
excerpt: "Use tickets for coordination and SpecDD specs for durable implementation contracts so requirements do not disappear when tickets close."
level: "Beginner"
howtoID: "1171004"
weight: 70
---

This guide shows you how to decide what belongs in a ticket and what belongs in a SpecDD spec for a spec-driven
development workflow.

The short version is: tickets coordinate work; specs define the durable local contract. Teams need both.

## Short answer

Use tickets for planning across teams, prioritization, release tracking, product management, and long-running work. Use
SpecDD specs for local implementation steps, behavior that must remain true, ownership, constraints, non-goals,
dependencies, scenarios, and `Done when` criteria. A ticket can point to the relevant spec, but it should not be the only
place durable behavior lives.

## When to use this guide

Use this guide when:

- acceptance criteria keep disappearing after tickets close
- specs are being used as backlog items
- tickets contain too much local implementation detail
- agents need durable context beyond a temporary issue
- reviewers are unsure whether a behavior should be in the ticket or the repo

## Steps

### 1. Use tickets for delivery coordination

Keep tickets responsible for:

- priority
- sprint or kanban planning
- cross-team dependencies
- product and stakeholder context
- release tracking
- assignments and due dates
- long-running delivery state

Tickets answer: why now, who is coordinating, what release, and what broader work stream?

### 2. Use specs for durable contracts

Use `.sdd` specs for:

- what the local subject owns
- what files may be modified
- what behavior must hold
- what behavior must not happen
- what dependencies are allowed or forbidden
- what scenarios matter
- what proves the local work is done
- what local implementation tasks remain

Specs answer: what must remain true in the repository after this work ships?

### 3. Move stable acceptance criteria into specs

Ticket acceptance criteria often become durable behavior.

Ticket:

```text
Reject itinerary items without a place name.
```

Spec:

```sdd
Must:
  Reject itinerary items without a place name.

Done when:
  Missing-place behavior is covered by a check.
```

When behavior should guide future changes, put it in the spec.

### 4. Keep local tasks in specs

SpecDD `Tasks` are local work packets:

```sdd
Tasks:
  [ ] Add missing-place validation.
  [ ] Add a regression check for unchanged itinerary state.
```

Keep broad rollout tasks in tickets. Keep local implementation tasks in the spec that owns the work.

### 5. Link tickets and specs without duplicating everything

In the ticket, link or name the relevant spec:

```text
Relevant spec: Itinerary
```

Do not copy the entire spec into the ticket. Duplication creates drift when one side changes.

In the spec, do not describe sprint timing, assignees, story points, or release labels. That belongs in the ticket.

### 6. Review both at the right time

Review tickets during planning and prioritization.

Review specs when behavior, authority, or implementation boundaries change. Specs define architecture and
implementation authority, so they deserve review like code.

## Decision table

| Information | Ticket | Spec |
| --- | --- | --- |
| Priority | yes | no |
| Release target | yes | no |
| Team coordination | yes | no |
| Local behavior | maybe summary | yes |
| Ownership and writable files | no | yes |
| `Must not` boundaries | no | yes |
| Local implementation tasks | maybe link | yes |
| Completion criteria for behavior | maybe summary | yes |
| Assignee and schedule | yes | no |

## Common mistakes

- Treating SpecDD tasks as a replacement for project management.
- Keeping durable acceptance criteria only in the ticket.
- Copying full specs into tickets and letting them drift.
- Putting sprint dates, assignees, or release labels in `.sdd` files.
- Closing tickets while the relevant spec still describes old behavior.

## How to verify the result

Your split is working when:

- tickets track coordination and priority
- specs hold durable behavior and boundaries
- ticket links point to relevant specs
- specs do not contain delivery-management metadata
- local tasks are small enough to implement inside spec authority
- future reviewers can understand behavior after the ticket closes

## Related how-tos

- [How to keep specs and tickets aligned](/how-to/teams-and-process/how-to-keep-specs-and-tickets-aligned/)
- [How to use SpecDD in agile teams](/how-to/teams-and-process/how-to-use-specdd-in-agile-teams/)
- [How to write Tasks](/how-to/work-with-specdd-skills/how-to-manage-tasks-across-specs-specdd-task/)
- [How to keep specs in sync with code changes](/how-to/spec-driven-workflows/how-to-keep-specs-in-sync-with-code-changes/)

## Related reference

- [Quickstart](/quickstart/)
- [Language reference](/language-reference/)
