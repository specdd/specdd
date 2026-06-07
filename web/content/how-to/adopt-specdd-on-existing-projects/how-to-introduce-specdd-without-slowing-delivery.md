---
title: "How to introduce SpecDD without slowing delivery"
seoDescription: "Introduce spec-driven development without slowing delivery by adding specs only around active work, keeping drafts small, reviewing quickly, and measuring practical signals."
excerpt: "Adopt SpecDD in the path of delivery: start with one active change, keep specs small, avoid full coverage mandates, and use review evidence to expand."
level: "Beginner"
howtoID: "1111006"
weight: 30
---

This guide shows you how to introduce spec-driven development in a live project without turning adoption into a delivery freeze.

SpecDD adoption should reduce ambiguity and rework. If the rollout asks the team to pause normal work and document the
whole repository first, it is solving the wrong problem.

## Short answer

Introduce SpecDD inside one active change. Write the smallest useful root and local specs, review them, implement a
small task, and measure whether review and implementation improved. Do not require full-repository coverage, long spec
templates, or process changes that are not needed for the first workflow.

## When to use this guide

Use this guide when:

- delivery pressure is high
- the team worries SpecDD means more documentation work
- a repository is too large for broad upfront adoption
- agents are useful but require repeated correction
- reviewers want better context without a heavy approval process

## Steps

### 1. Start in the delivery path

Choose work that is already planned:

- a bug fix
- a small feature
- a review hotspot
- a risky but narrow refactor
- a documentation or automation update

Do not create an adoption-only project that competes with delivery. The first spec should help the next pull request.

### 2. Use one small spec

For the first delivery change, aim for:

- a minimal root spec
- one local spec near the work
- one open task
- one or two important boundaries
- one `Done when` check

Example:

```sdd
Spec: Itinerary

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

This is enough to run the loop.

### 3. Limit adoption rules

Keep early process rules simple:

- specs are reviewed when they change behavior or authority
- behavior-changing code changes update specs in the same pull request
- tasks are marked done only after checks
- generated specs require review
- project-wide conventions go in `.specdd/bootstrap.project.md`

Avoid starting with a large governance document.

### 4. Review quickly

Use a short checklist:

- Is the subject clear?
- Are changed files inside `Can modify` or `Owns`?
- Is required behavior observable?
- Do `Must not` and `Forbids` protect real boundaries?
- Are tasks local?
- Does `Done when` say how to finish?

Most first specs should be reviewable in minutes.

### 5. Avoid coverage mandates

Do not require:

- every folder to have a spec
- every function to be described
- every old requirement to be migrated immediately
- every PR to add a spec
- architecture review for small local task updates

Spec coverage should grow where context improves work.

### 6. Use specs to reduce rework

SpecDD pays off when it prevents corrections:

- agent edits the intended files
- reviewer points to a written boundary
- behavior change includes the spec update
- tests align with `Done when`
- ambiguous decisions are marked before coding
- onboarding context lives near the code

If the first spec does not reduce rework, make the next one smaller or more focused.

### 7. Expand from evidence

After the first pull request, decide:

- keep using SpecDD in that area
- add a parent spec because multiple children need shared context
- add specs to the next active folder
- improve the prompt or review checklist
- stop adding specs to areas with no adoption value yet

The rollout should become more useful, not heavier.

## Common mistakes

- Blocking delivery until the whole repository is specified.
- Creating long first specs that reviewers cannot scan.
- Measuring success by number of `.sdd` files.
- Requiring spec updates for pure formatting or internal cleanup.
- Letting generated specs bypass review because they save time.
- Adding team conventions to local specs instead of `.specdd/bootstrap.project.md`.

## How to verify the rollout

SpecDD is not slowing delivery when:

- the first spec supports an active pull request
- review time is focused on behavior and authority
- fewer correction loops are needed
- checks map to `Done when`
- contributors know when a spec update is required
- expansion follows visible value

## Related how-tos

- [How to choose your first SpecDD use case](/how-to/getting-started/how-to-choose-your-first-specdd-use-case/)
- [How to run your first spec-driven change end-to-end](/how-to/getting-started/how-to-run-your-first-spec-driven-change-end-to-end/)
- [How to require spec updates in code review](/how-to/code-review-and-governance/how-to-require-spec-updates-in-code-review/)
- [How to keep specs reviewed but lightweight](/how-to/teams-and-process/how-to-keep-specs-reviewed-but-lightweight/)

## Related reference

- [Quickstart](/quickstart/)
