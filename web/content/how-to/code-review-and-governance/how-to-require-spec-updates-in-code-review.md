---
title: "How to require spec updates in code review"
seoDescription: "Require SpecDD spec updates in code review for spec-driven development when behavior, ownership, dependencies, public contracts, tasks, or completion criteria change."
excerpt: "Keep SpecDD trustworthy by requiring .sdd updates in the same pull request when implementation changes the durable contract."
level: "Intermediate"
howtoID: "1141001"
weight: 20
---

This guide shows you how to decide when code review should require a SpecDD spec update in a spec-driven development
workflow.

SpecDD works because specs stay close to the code they govern. If implementation changes behavior but the `.sdd` file
does not change, the next human or agent will work from stale authority.

## Short answer

Require a spec update when a pull request changes durable behavior, ownership, write authority, dependencies, public
contracts, inputs, outputs, errors, scenarios, tasks, or completion criteria. Do not require a spec update for pure
formatting, mechanical cleanup, or internal implementation changes when the existing spec still describes the result
accurately.

## When to use this guide

Use this guide when:

- code review keeps finding stale specs
- contributors are unsure whether a `.sdd` file must change
- a pull request changes tests but not the spec
- task status changes without evidence
- reviewers want a consistent rule that is strict without being bureaucratic

## Steps

### 1. Decide whether the contract changed

Require a spec update when the pull request changes:

- required behavior in `Must`
- non-goals or boundaries in `Must not`
- forbidden dependencies, paths, tools, libraries, or access in `Forbids`
- ownership or writable files in `Owns` or `Can modify`
- read context in `Can read` or `References`
- public exports, commands, endpoints, events, jobs, or interfaces
- accepted inputs, return values, raised errors, or handled cases
- scenarios or examples used by tests and reviewers
- tasks or task status
- `Done when` criteria

If the code changes what future contributors should rely on, the spec should change.

### 2. Do not require updates for unchanged contracts

SpecDD review should stay practical.

You usually do not need a spec update for:

- formatting
- a mechanical rename inside the same authority boundary
- local cleanup that preserves behavior
- a test refactor that proves the same behavior
- typo fixes in non-contract prose
- generated artifacts that are not owned by a spec

The test is simple: would the existing spec still guide the next change correctly? If yes, do not add churn.

### 3. Identify the owning spec

Put the update in the spec that owns the behavior or boundary.

For a file-level rule, the owning spec is often the same-directory same-basename spec:

```text
itinerary.js
itinerary.sdd
```

For a module-wide boundary, update the parent or directory-level spec that owns that boundary. Do not copy a parent rule
into every child spec just because several children are affected.

### 4. Require durable rules, not only completed tasks

A completed task records work. It does not replace the durable contract.

Weak update:

```sdd
Tasks:
  [x] Add missing-place validation.
```

Better update:

```sdd
Must:
  Reject itinerary items without a place name.

Tasks:
  [x] Add missing-place validation.
```

If the behavior should remain true after this pull request, put it in `Must`, `Must not`, a contract section,
`Scenario`, `Example`, or `Done when`, not only in `Tasks`.

### 5. Review task status carefully

Task markers are reviewable.

Use:

- `[ ]` for open work
- `[x]` or `[X]` for done work
- `[-]` for intentionally skipped work
- `[!]` for blocked work
- `[?]` for work that needs a decision

Require evidence before accepting `[x]`. If checks were not run, the pull request should say why.

### 6. Keep the update in the same changeset

Spec updates should usually land with the code they govern.

Separate pull requests are useful when:

- the team is reviewing a design before implementation
- a spec-only pull request intentionally changes future authority
- a large behavior change needs an approved contract before code starts

For normal implementation, avoid "update the spec later." Later creates stale authority.

### 7. Write a clear review request

Useful review comment:

> This changes itinerary validation behavior, but the Itinerary spec still describes the old accepted input. Please
> update the owning spec in this pull request.

For task status:

> The task is marked done, but the Done when check is not shown. Please add the check or leave the task open.

The comment should name the contract gap and the action needed.

## Review rule of thumb

Require a spec update when the pull request changes what future work should assume.

Do not require one when the pull request only changes how the same contract is implemented.

## Common mistakes

- Requiring `.sdd` edits for every small refactor.
- Letting behavior changes merge with "spec follow-up" left for later.
- Updating `Tasks` but not the durable behavior sections.
- Changing tests to match new behavior while leaving the spec stale.
- Updating a child spec to override a parent boundary instead of reviewing the parent rule.
- Accepting broad `Can modify` changes without asking why the writable boundary changed.

## How to verify the result

Your review rule is working when:

- behavior-changing pull requests update the owning specs
- low-risk internal cleanup does not create spec churn
- completed tasks are backed by implementation and checks
- reviewers can explain why a spec update was or was not required
- merged specs remain useful for the next human or agent change

## Related how-tos

- [How to keep specs in sync with code changes](/how-to/spec-driven-workflows/how-to-keep-specs-in-sync-with-code-changes/)
- [How to review a SpecDD pull request](/how-to/code-review-and-governance/how-to-review-a-specdd-pull-request/)
- [How to change a spec safely after code already exists](/how-to/spec-driven-workflows/how-to-change-a-spec-safely-after-code-already-exists/)
- [How to keep specs reviewed but lightweight](/how-to/teams-and-process/how-to-keep-specs-reviewed-but-lightweight/)

## Related reference

- [Language reference](/language-reference/)
