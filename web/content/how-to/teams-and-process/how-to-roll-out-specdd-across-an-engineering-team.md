---
title: "How to roll out SpecDD across an engineering team"
seoDescription: "Roll out spec-driven development across an engineering team by starting with one active area, defining conventions, reviewing specs, implementing small slices, and expanding coverage."
excerpt: "Adopt SpecDD across a team without slowing delivery: start small, use one active area, keep conventions in bootstrap.project.md, review specs, and expand around real work."
level: "Intermediate"
howtoID: "1171001"
weight: 20
---

This guide shows you how to roll out spec-driven development across an engineering team without trying to specify the whole codebase at
once.

The best rollout is gradual. Start where missing context already costs time, run one small spec-driven workflow, review
what helped, and expand coverage around active work.

## Short answer

Roll out SpecDD with a pilot. Pick one high-change, high-risk, or high-confusion area. Add the framework files, keep
shared conventions in `.specdd/bootstrap.project.md`, write a minimal root spec and one reviewed local spec, implement a
small change against that spec, then expand only where the team sees value.

## When to use this guide

Use this guide when:

- a team wants to adopt SpecDD beyond one developer
- agents are being used across the repository
- review context is repeatedly missing
- handoffs and onboarding depend on tribal knowledge
- a team wants process guardrails without a heavyweight documentation program

## Steps

### 1. Pick a pilot area

Choose a real area under active work. Good candidates include:

- a module with repeated review comments
- a workflow with subtle business rules
- a service where ownership is unclear
- a high-change feature
- an automation path with operational constraints

Avoid starting with the entire repository. SpecDD works through many small specs, not one large master document.

### 2. Initialize and verify setup

Make sure the project has the SpecDD bootstrap files and agent entrypoints. A practical setup includes:

```text
.specdd/bootstrap.md
.specdd/bootstrap.project.md
.specdd/bootstrap.local.md
AGENTS.md
travel-planner.sdd
```

Use the setup and verification guides if the project is not initialized yet.

### 3. Define shared team conventions

Put shared process and naming rules in:

```text
.specdd/bootstrap.project.md
```

Examples:

```md
## Commands

- Run unit tests with `pnpm test`.
- Run linting with `pnpm lint`.

## Spec Conventions

- Use same-basename `.sdd` files for file-level behavior.
- Use `Can modify` when writable scope is narrower than ownership.
- Keep task status changes in the spec that owns the task.
```

Do not put team conventions in root specs, local specs, or a separate convention spec.

### 4. Draft one root and one local spec

Start with a minimal root spec and one local spec near the pilot work.

```text
travel-planner.sdd
src/trips/itinerary.sdd
```

Review the local spec before implementation. Make sure it defines the subject, ownership, important `Must` rules,
plausible `Must not` boundaries, and `Done when` criteria.

### 5. Run one spec-driven change

Use a small task:

```text
Implement the Itinerary validation task.
```

The implementation should stay inside local authority, run relevant checks, update task status only after verification,
and report specs used.

### 6. Review and adjust the process

After the pilot change, review:

- Did the spec prevent wrong-file edits?
- Did it make review faster?
- Did the team know where to put conventions?
- Were tasks small enough?
- Did tests map to `Done when` or scenarios?
- Did any rule need to move to a parent spec?

Adjust the process from real friction, not theoretical completeness.

### 7. Expand around active work

Expand coverage incrementally:

- add local specs when an area is being changed
- add parent specs when several children need shared context
- add `Must not` rules only for plausible boundary mistakes
- keep root specs short
- avoid duplicating parent constraints in child specs

SpecDD rollout should follow the work, not pause the work.

## Best practices

- Start with one team and one active area.
- Review generated specs before using them for implementation.
- Keep specs small and local.
- Commit spec changes with code changes when behavior changes.
- Use tickets for rollout planning and specs for durable contracts.
- Track adoption gaps without forcing every old area to be specified immediately.

## Common mistakes

- Requiring full repository coverage before using SpecDD.
- Putting team conventions in local specs instead of `.specdd/bootstrap.project.md`.
- Letting generated draft specs become final without review.
- Measuring rollout by spec count instead of better implementation and review.
- Leaving stale specs after the pilot code changes.

## How to verify the result

The rollout is working when:

- the team has a verified SpecDD setup
- one pilot area has a reviewed local spec
- at least one change was implemented against the spec
- task status and checks match reality
- shared conventions live in `.specdd/bootstrap.project.md`
- the team knows where to expand next

## Related how-tos

- [How to add SpecDD to an existing project](/how-to/install-and-setup/how-to-add-specdd-to-an-existing-project/)
- [How to configure team rules in bootstrap.project.md](/how-to/spec-driven-workflows/how-to-configure-team-rules-in-bootstrap-project-md/)
- [How to run the spec-first loop](/how-to/spec-driven-workflows/how-to-run-the-spec-first-loop/)
- [How to use SpecDD for onboarding](/how-to/teams-and-process/how-to-use-specdd-for-onboarding/)

## Related reference

- [Quickstart](/quickstart/)
- [Tools](/tools/)
