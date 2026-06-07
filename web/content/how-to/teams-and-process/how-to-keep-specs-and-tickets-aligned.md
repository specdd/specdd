---
title: "How to keep specs and tickets aligned"
seoDescription: "Keep tickets aligned with SpecDD specs in a spec-driven development workflow by linking planning work to local specs, moving durable behavior into .sdd files, and updating specs with code changes."
excerpt: "Use tickets for coordination and specs for contracts, then keep them aligned through refinement, implementation, review, and ticket closure."
level: "Intermediate"
howtoID: "1171005"
weight: 80
---

This guide shows you how to keep tickets aligned with SpecDD specs in a spec-driven development workflow without
duplicating every detail.

Alignment matters because tickets are temporary delivery containers while specs are durable repository contracts. If
they disagree, contributors and agents have to guess which one is true.

## Short answer

Keep tickets and specs aligned by linking tickets to the relevant spec, moving stable behavior and acceptance criteria
into `.sdd` files, tracking local implementation work in `Tasks`, updating specs in the same changeset as code when
behavior changes, and checking alignment before closing the ticket.

## When to use this guide

Use this guide when:

- tickets and specs describe different behavior
- implementation changed scope during a ticket
- a task is done in the ticket but still open in the spec
- a spec was updated but the ticket was not
- product acceptance criteria should become durable behavior

## Steps

### 1. Link the ticket to the local spec

In the ticket, name the relevant spec in human terms:

```text
Relevant spec: Itinerary
```

If your tracker supports links, link the spec file or pull request. Keep the ticket summary short; the detailed local
contract belongs in the spec.

### 2. Move stable behavior into the spec

If acceptance criteria should guide future implementation, put them in `.sdd` form.

Ticket:

```text
Reject an itinerary item when the place name is missing.
```

Spec:

```sdd
Must:
  Reject itinerary items without a place name.

Scenario: missing place name
  Given the place name is empty
  When the person adds the itinerary item
  Then validation fails
```

Do not leave durable behavior only in a closed ticket.

### 3. Track local work in spec tasks

Use `Tasks` for local implementation work:

```sdd
Tasks:
  [ ] Add missing-place validation.
  [ ] Cover missing-place validation in a test.
```

The ticket can track broader delivery. The local spec tracks the implementation packets that should stay near the
behavior.

### 4. Update specs with code

When code changes behavior, update the spec in the same changeset.

Check for:

- new or changed `Must` rules
- new `Must not` boundaries
- updated ownership or writable paths
- changed scenarios
- changed `Done when`
- task status changes after verification

Do not leave spec updates as a follow-up after the ticket closes.

### 5. Review alignment before closing

Before closing a ticket, ask:

- Does the ticket outcome match the spec?
- Are completed spec tasks marked `[x]` only after checks?
- Are unfinished tasks still visible?
- Do tests or checks support `Done when`?
- Did changed scope create another ticket or spec task?
- Does the pull request include necessary spec updates?

This review prevents the ticket from saying "done" while the spec says something else.

### 6. Handle changed scope explicitly

If the work changes during implementation, update one or both systems:

- ticket scope changes belong in the ticket
- durable behavior changes belong in the spec
- local task changes belong in `Tasks`
- cross-team follow-up belongs in a ticket
- unresolved behavior belongs in `[?]` or a decision workflow

Do not silently use implementation as the source of truth.

## Common mistakes

- Copying the whole spec into the ticket.
- Leaving acceptance criteria only in tickets after code ships.
- Marking spec tasks done because the ticket moved to done.
- Updating tickets but not specs after scope changes.
- Adding ticket metadata to `.sdd` files.
- Letting agents implement from ticket text when the spec is stale.

## How to verify the result

Specs and tickets are aligned when:

- the ticket names the relevant spec
- durable behavior lives in `.sdd` files
- local implementation tasks are in the owning spec
- spec updates ship with code updates
- ticket closure checks spec task status and verification
- unresolved scope has a visible ticket, task, or decision marker

## Related how-tos

- [How to decide what belongs in a ticket vs a spec](/how-to/teams-and-process/how-to-decide-what-belongs-in-a-ticket-vs-a-spec/)
- [How to use SpecDD in agile teams](/how-to/teams-and-process/how-to-use-specdd-in-agile-teams/)
- [How to keep specs in sync with code changes](/how-to/spec-driven-workflows/how-to-keep-specs-in-sync-with-code-changes/)
- [How to manage tasks across specs](/how-to/work-with-specdd-skills/how-to-manage-tasks-across-specs-specdd-task/)

## Related reference

- [Quickstart](/quickstart/)
- [Language reference](/language-reference/)
