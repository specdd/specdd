---
title: "How to handle handoffs between teams with specs"
seoDescription: "Handle team handoffs with spec-driven development by updating local specs, making ownership and boundaries explicit, marking open decisions, and using references for read-only context."
excerpt: "Use SpecDD handoffs to transfer durable implementation context: local contracts, ownership, Must and Must not rules, tasks, decisions, checks, and read-only references."
level: "Intermediate"
howtoID: "1171008"
weight: 100
---

This guide shows you how to handle handoffs between teams with SpecDD in a spec-driven development workflow.

Handoffs fail when important context lives only in tickets, meetings, chat, or one team's memory. Specs make the durable
part of that context visible in the repository, where the receiving team and any agents can use it during future work.

## Short answer

Before handing off an area, update the relevant `.sdd` specs so ownership, writable scope, required behavior, boundaries,
open tasks, `Done when`, scenarios, and references are current. Use `References` or `Can read` for outside context, not
edit permission. Review the handoff with both teams, then validate it with one small spec-driven follow-up change.

## When to use this guide

Use this guide when:

- one team is transferring a module, service, workflow, or feature
- a platform team is handing off a shared capability
- a product team is moving a feature to a maintenance team
- incident or operations knowledge needs to become durable
- agents will work in an area after the original team steps away

## Steps

### 1. Identify the handoff boundary

Name the exact area being handed off:

```text
Itinerary validation
```

or:

```text
Trip storage adapter
```

Avoid vague handoffs such as "the trips area" unless the whole area has clear directory-level specs and ownership.

### 2. Update the owning specs

The source team should update the specs that own the handed-off behavior.

Check:

- `Purpose`
- `Structure`
- `Owns`
- `Can modify`
- `Can read`
- `References`
- `Must`
- `Must not`
- `Forbids`
- `Depends on`
- `Tasks`
- `Done when`
- `Scenario`

Do not write a separate handoff document when the durable rules belong in local specs.

### 3. Mark open tasks and decisions

Make unfinished work visible:

```sdd
Tasks:
  [ ] Add retry behavior for temporary storage failures.
  [?] Confirm whether duplicate itinerary places are allowed.
  [!] Decide how failed exports should be retried after a deploy rollback.
```

Use `[?]` for decisions and `[!]` for blockers. Do not turn uncertainty into a confident `Must` rule.

### 4. Separate read context from edit authority

If the receiving team needs context from another area, reference it explicitly:

```sdd
Can read:
  ../storage/trip-storage.sdd

References:
  ../destinations/destination-search.sdd

Must not:
  Change destination search behavior.
```

Referenced specs provide context. They do not grant permission to edit the referenced area.

### 5. Review the handoff with both teams

Review the updated specs together:

- Does the source team agree the spec captures intended behavior?
- Does the receiving team know what it may modify?
- Are important non-goals explicit?
- Are dependencies and read-only references clear?
- Are open decisions visible?
- Do checks prove the most important scenarios?

This review is the actual handoff, not just a meeting.

### 6. Run one small follow-up change

Ask the receiving team to complete one small local task:

```text
Plan the Itinerary retry task.
```

or:

```text
Implement the Itinerary validation follow-up.
```

If the team can plan, implement, verify, and review one task from the specs, the handoff is usable.

## Common mistakes

- Handing off a module with stale specs.
- Using a meeting recording as the only source of handoff context.
- Treating referenced specs as editable by the receiving team.
- Hiding unresolved decisions in prose.
- Updating a ticket but not the local `.sdd` files.
- Skipping a small follow-up change to prove the handoff works.

## How to verify the result

The handoff worked when:

- the owning specs are current
- boundaries and writable scope are explicit
- open tasks, blockers, and decisions are visible
- referenced context is read-only unless separately authorized
- both teams reviewed the contract
- the receiving team can complete one small spec-driven change

## Related how-tos

- [How to use SpecDD for onboarding](/how-to/teams-and-process/how-to-use-specdd-for-onboarding/)
- [How to assign ownership for specs](/how-to/teams-and-process/how-to-assign-ownership-for-specs/)
- [How to reference another area's spec safely](/how-to/spec-driven-workflows/how-to-reference-another-areas-spec-safely/)
- [How to keep specs and tickets aligned](/how-to/teams-and-process/how-to-keep-specs-and-tickets-aligned/)

## Related reference

- [Quickstart](/quickstart/)
- [Language reference](/language-reference/)
