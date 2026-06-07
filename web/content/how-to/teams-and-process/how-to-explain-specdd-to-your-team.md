---
title: "How to explain SpecDD to your team"
seoDescription: "Explain spec-driven development to your team as source-adjacent specs that preserve intent, boundaries, requirements, and completion criteria for humans and agents."
excerpt: "Explain SpecDD as local contracts in Git that make intent, ownership, constraints, tasks, and done criteria visible during implementation and review."
level: "Beginner"
howtoID: "1171000"
weight: 10
---

This guide shows you how to explain SpecDD to an engineering team without turning it into a theory session.

SpecDD is an amazing way to make intent durable because specs live in the repository near the files they govern. Humans
and agents can use the same source of truth for behavior, ownership, boundaries, local tasks, and completion criteria.

## Short answer

Explain SpecDD as small, source-adjacent `.sdd` contracts. A spec says what a part of the project owns, what must remain
true, what must not happen, what work remains, and how the team knows the work is done. Tickets still handle planning
and prioritization. Tests still prove behavior. Specs preserve intent and authority near the work.

## When to use this guide

Use this guide when:

- your team is new to SpecDD
- people think specs are just another documentation format
- agents are changing code without enough project context
- reviewers reconstruct requirements from tickets and memory
- onboarding and handoffs depend on scattered conversations

## Steps

### 1. Start with the problem

Use the team's existing pain:

- requirements are spread across tickets, docs, code, and chat
- reviewers have to remember why a behavior exists
- agents can implement quickly but miss local boundaries
- new contributors do not know which files own which decisions
- old decisions disappear after the ticket closes

SpecDD exists to keep that context durable and close to the implementation.

### 2. Explain what a spec is

A `.sdd` file is a local contract for a project area.

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

Done when:
  Missing-place behavior is covered by a check.
```

This is not a long requirements document. It is the local source of truth for one subject.

### 3. Show where specs live

Show the repository shape:

```text
travel-planner/
  travel-planner.sdd
  src/
    trips/
      trips.sdd
      itinerary.js
      itinerary.sdd
```

The root spec gives project context. Parent specs add area context. Local specs define the nearest useful boundary.
Same-basename specs can govern matching files in the same directory.

### 4. Separate specs from tickets and tests

Use simple distinctions:

- **Tickets:** planning, priority, ownership of delivery, release tracking, coordination
- **Specs:** durable behavior, boundaries, constraints, local tasks, completion criteria
- **Tests:** evidence that behavior works
- **Docs:** explanation for users or developers

The ticket may say why the work is scheduled. The spec says what must remain true after implementation.

### 5. Show the team workflow

Use the SpecDD loop:

1. Write or update the relevant `.sdd` spec.
2. Review the spec until behavior and boundaries are clear.
3. Implement one spec or task at a time.
4. Run tests and checks.
5. Update task status and specs as needed.
6. Review the diff against the spec.

The important rule is that implementation should be driven by reviewed specs, not by vague prompts or memory alone.

### 6. Start with one example

Pick one high-change or high-confusion area. Do not start by asking the team to spec the whole repository.

Good first examples:

- a module with repeated review comments
- a workflow with subtle business rules
- an area where agents often edit the wrong files
- a service with unclear ownership
- a feature currently being changed

Run one small spec-driven change so the team sees the loop in practice.

## Talking points

- SpecDD is useful for humans and agents.
- Specs live in Git, beside the work they describe.
- Specs are reviewed because they define behavior and authority.
- A spec should describe the resulting subject, not the ticket that created it.
- Local specs reduce prompt size and review ambiguity.
- Start small and expand where context matters.

## Common mistakes

- Presenting SpecDD as an agent-only workflow.
- Describing specs as replacement tickets.
- Starting with a giant root-level requirements document.
- Explaining every `.sdd` section before showing a useful example.
- Asking the whole team to adopt it everywhere before one workflow proves value.

## How to verify the result

The explanation worked when teammates can say:

- where specs live
- what kind of information belongs in a spec
- what remains in tickets
- why specs should be reviewed
- how a small spec-driven change flows from spec to code to checks
- where the first team example will be tried

## Related how-tos

- [How to start with spec-driven development](/how-to/getting-started/how-to-start-with-spec-driven-development/)
- [How to use spec-driven development with humans and agents](/how-to/getting-started/how-to-use-spec-driven-development-with-humans-and-agents/)
- [How to roll out SpecDD across an engineering team](/how-to/teams-and-process/how-to-roll-out-specdd-across-an-engineering-team/)
- [How to decide what belongs in a ticket vs a spec](/how-to/teams-and-process/how-to-decide-what-belongs-in-a-ticket-vs-a-spec/)

## Related reference

- [Quickstart](/quickstart/)
- [Language reference](/language-reference/)
