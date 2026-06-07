---
title: "How to split large features into small safe changes"
seoDescription: "Split large features into small safe changes with spec-driven development by decomposing behavior into local specs, sequencing tasks, and verifying each boundary."
excerpt: "Use SpecDD to turn a large feature into bounded, reviewable changes: one local spec at a time, with clear ownership, dependencies, and Done when checks."
level: "Intermediate"
howtoID: "1101009"
weight: 100
---

This guide shows you how to split a large feature into small safe changes with SpecDD in a spec-driven development workflow.

Large features are risky when they are implemented as one broad change. Reviewers see UI, domain rules, persistence,
API behavior, tests, and cleanup all at once. Agents have more room to overreach. Humans lose track of which part of the
feature is intended behavior and which part is incidental implementation.

SpecDD gives you a better shape: decompose the feature into local specs and implement one bounded slice at a time. Each
slice has its own authority, behavior, non-goals, tasks, and checks.

## Short answer

Break the feature into concerns, then create or update the local specs that own those concerns. Keep each task inside
one spec's `Owns` or `Can modify` boundary when possible. Use `Depends on` and `References` for relationships, `Must
not` for out-of-scope behavior, and `Done when` to make each slice reviewable before moving to the next.

## When to use this guide

Use this guide when:

- a feature touches several modules or layers
- one pull request would be too large to review well
- the implementation order is unclear
- agents keep trying to implement the entire feature at once
- parts of the feature are decided but others are still ambiguous
- compatibility, migration, or rollout concerns make the change risky

## The design idea

A large feature usually contains several smaller design decisions. Treating those decisions as one unit makes the work
feel simpler at first, but it hides risk. SpecDD makes each decision explicit and local.

The goal is not to create unnecessary process. The goal is to turn "build the whole feature" into a sequence of changes
where each change has a clear owner and a concrete verification point.

## Steps

### 1. Find the feature concerns

For "shared itinerary editing", the concerns might include:

- data model for shared editors
- permission policy for who can edit
- API for inviting collaborators
- UI for showing collaborator state
- storage migration for existing trips
- notification event when access changes

These concerns should not all be owned by one feature spec unless the feature spec is only coordinating them.

### 2. Create or update local specs

Write specs at the level that owns each behavior:

```text
trip-collaborator.model.sdd
trip-edit-access.policy.sdd
invite-collaborator.api.sdd
collaborator-list.component.sdd
trip-collaboration-migration.job.sdd
trip-access-changed.event.sdd
```

You may also keep a small feature spec for user-visible behavior:

```sdd
Spec: Shared Itinerary Editing

Purpose:
  Let invited collaborators edit the same trip itinerary.

Must:
  Invited collaborators can edit itinerary items when they have edit access.
  People without edit access cannot change itinerary items.

Must not:
  Change booking or ticket purchase behavior.
```

The feature spec states the product behavior. Local specs own the implementation contracts.

### 3. Define dependencies between slices

Use `Depends on` when one slice needs another:

```sdd
Spec: Invite Collaborator API

Depends on:
  TripEditAccess
  TripCollaborator
```

This helps reviewers see implementation order. It also keeps one slice from copying another slice's rules.

### 4. Sequence small tasks

Start with the safest durable foundation:

```sdd
Tasks:
  [ ] Define trip collaborator model invariants.
  [ ] Add edit access policy.
  [ ] Add invite collaborator API.
  [ ] Add collaborator list UI.
```

Each task should live in the spec that owns it. If a task needs multiple owners, split it or create a coordinating task
that points to local tasks.

### 5. Use Done when to stop each slice

For the policy slice:

```sdd
Done when:
  Owner edit access is covered by a check.
  Collaborator edit access is covered by a check.
  Denied access is covered by a check.
```

Do not let one slice continue until it starts implementing the next slice by convenience.

### 6. Keep ambiguity visible

If part of the feature is unresolved, mark it:

```sdd
Tasks:
  [?] Confirm whether collaborators can invite other collaborators.
```

You can still implement safe decided slices while leaving unresolved decisions out of scope.

### 7. Keep specs and code in sync

When a slice changes behavior, update the owning spec with the code. Do not complete slice one with stale specs while
planning to "clean up specs later." The next slice will inherit or reference the wrong context.

## Suggested sequencing pattern

For a large feature, this order often works:

1. Domain model or policy rule.
2. Storage or migration boundary.
3. Service or application workflow.
4. API or event contract.
5. UI component behavior.
6. Observability, compatibility, and cleanup tasks.

This is not a universal order. The right order is the one that keeps each change reviewable and avoids depending on
unreviewed behavior.

## Common mistakes

- Writing one broad task that spans UI, API, domain, storage, and migration.
- Using a feature spec as permission to edit every local owner.
- Duplicating policy rules across API, UI, and job specs.
- Starting UI work before the contract it depends on is reviewed.
- Marking unresolved decisions as implemented behavior.
- Leaving spec updates until the end of the large feature.

## How to verify the result

The feature is split safely when:

- each slice has a local owner
- tasks are small enough to review
- dependencies between slices are explicit
- unresolved decisions are visible
- each slice has `Done when` checks
- code and specs stay aligned after every slice
- the feature can ship or pause at a coherent checkpoint

## Related how-tos

- [How to implement one spec at a time](/how-to/spec-driven-workflows/how-to-implement-one-spec-at-a-time/)
- [How to convert a feature idea into a spec](/how-to/spec-writing-technique/how-to-convert-a-feature-idea-into-a-spec/)
- [How to write Tasks](/how-to/use-spec-sections/how-to-write-tasks/)
- [How to write Done when](/how-to/use-spec-sections/how-to-write-done-when/)

## Related reference

- [Language reference](/language-reference/)
