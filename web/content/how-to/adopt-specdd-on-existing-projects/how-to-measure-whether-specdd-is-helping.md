---
title: "How to measure whether SpecDD is helping"
seoDescription: "Measure whether spec-driven development is helping by tracking correction loops, wrong-file edits, review clarity, spec-code drift, onboarding, task completion, and verification quality."
excerpt: "Evaluate SpecDD adoption with practical signals from real work, not spec counts: fewer corrections, clearer review, better boundaries, and less drift."
level: "Intermediate"
howtoID: "1111008"
weight: 100
---

This guide shows you how to measure whether spec-driven development is helping in an existing project.

SpecDD should make real work clearer: fewer wrong-file edits, more concrete reviews, better handoffs, less spec-code
drift, and more reliable task completion. Counting `.sdd` files is not enough.

## Short answer

Measure SpecDD by comparing real work before and after adoption. Track correction loops, unauthorized file edits,
review comments tied to specs, task completion accuracy, checks that match `Done when`, onboarding time, and drift
between code and contracts. Use the results to adjust scope and process.

## When to use this guide

Use this guide when:

- a pilot needs success criteria
- leadership asks whether adoption is worth continuing
- the team added specs but is unsure they help
- agents still need many correction prompts
- review quality feels better but needs evidence

## Steps

### 1. Choose the adoption question

Pick one or two questions:

- Are agents changing fewer wrong files?
- Are pull request reviews more concrete?
- Are behavior-changing changes updating specs?
- Are tasks completed with checks?
- Are new contributors finding local context faster?
- Are repeated review comments decreasing?

Do not try to measure everything at once.

### 2. Capture a baseline

Before or early in adoption, capture examples from recent work:

- number of agent correction prompts on a change
- files changed outside the intended area
- review comments asking for missing context
- behavior changes without spec or doc updates
- test changes that did not match the stated intent
- onboarding questions about ownership or boundaries

The baseline can be lightweight. A short review of a few recent pull requests is often enough.

### 3. Track review and agent signals

Useful signals:

- fewer wrong-file edits
- fewer "this belongs elsewhere" review comments
- reviewers cite `Must`, `Must not`, `Forbids`, or `Done when`
- plans name the correct local spec or task
- generated specs are revised before implementation
- changes stay inside `Can modify` or `Owns`
- fewer broad cleanup changes appear in small tasks

These are strong indicators because SpecDD is meant to make authority and intent reviewable.

### 4. Track drift and verification

Watch whether specs remain trustworthy.

Track:

- behavior-changing code changes that include spec updates
- completed tasks backed by checks
- `Done when` criteria that match verification
- spec-only changes that receive review
- stale specs found during later work
- conflicts between parent and child specs
- old bugs prevented from becoming `Must` rules

If drift increases, adoption may need clearer review rules rather than more specs.

### 5. Track onboarding and handoffs

SpecDD can help humans as much as agents.

Look for:

- new contributor time to identify the owning files
- fewer handoff questions about local boundaries
- easier review after a team handoff
- clearer ownership during incidents or maintenance
- fewer repeated explanations in chat or tickets

Use small qualitative notes when exact numbers are not available.

### 6. Avoid vanity metrics

Do not use these as primary success measures:

- number of specs created
- lines of `.sdd`
- percentage of folders with specs
- number of sections used
- number of agent prompts run

Those may describe activity, but they do not prove better implementation or review.

### 7. Decide what to change

Use the evidence:

- If wrong-file edits remain high, tighten `Can modify`, `Can read`, `References`, `Must not`, and `Forbids`.
- If reviews are slow, shorten specs and checklists.
- If drift appears, require spec updates with behavior changes.
- If generated specs are weak, improve the draft review checklist.
- If specs are unused, move adoption to active work or stop adding specs in inactive areas.

Measurement should improve the workflow, not become a reporting exercise.

## Measurement template

```md
## SpecDD adoption review

Pilot area:
  Itinerary module

Question:
  Did SpecDD reduce wrong-file edits and make review clearer?

Baseline:
  Recent itinerary changes often touched destination search files.

Observed after adoption:
  Two itinerary pull requests stayed inside itinerary authority.
  Review comments cited `Must not` and `Done when`.
  One generated draft spec needed ownership narrowing.

Decision:
  Continue in itinerary; add storage specs when storage work begins.
```

## Common mistakes

- Measuring success by spec count.
- Ignoring whether specs are used in review.
- Counting generated specs before they are reviewed.
- Treating one slow first draft as proof the workflow is too heavy.
- Failing to record wrong-file edits before adoption.
- Expanding coverage even when the first area showed no value.

## How to verify the measurement

The measurement is useful when:

- it compares real work before and after adoption
- it includes both human and agent workflows
- it distinguishes activity from outcomes
- it points to specific process changes
- it helps decide whether to expand, adjust, or pause

## Related how-tos

- [How to run a SpecDD pilot](/how-to/adopt-specdd-on-existing-projects/how-to-run-a-specdd-pilot/)
- [How to review a SpecDD pull request](/how-to/code-review-and-governance/how-to-review-a-specdd-pull-request/)
- [How to keep specs reviewed but lightweight](/how-to/teams-and-process/how-to-keep-specs-reviewed-but-lightweight/)
- [How to assess change risk](/how-to/work-with-specdd-skills/how-to-assess-change-risk-specdd-risk/)

## Related reference

- [Quickstart](/quickstart/)
