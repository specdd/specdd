---
title: "How to write a job spec"
seoDescription: "Write a SpecDD job spec for spec-driven development with background, scheduled, queue, worker, or batch-work triggers, idempotency, failure handling, and checks."
excerpt: "Use job specs for background work: triggers, inputs, idempotency, side effects, failure handling, retry boundaries, and completion evidence."
level: "Intermediate"
howtoID: "1051008"
weight: 90
---

This guide shows you how to write a SpecDD job spec for a spec-driven development workflow.

A job spec describes background or scheduled work: queues, scheduled tasks, workers, batch processes, maintenance jobs,
and other code that runs outside a direct user request.

## Short answer

Use a job spec for one background or scheduled unit. Define what triggers it, what inputs it accepts, what side effects
it produces, what idempotency or retry behavior must hold, what failures it handles, and what it must not touch.

## When to use this guide

Use this guide when:

- a scheduled job has operational constraints
- a queue worker needs idempotency rules
- retry behavior is important
- the job writes data with blast radius
- agents need clear boundaries before changing automation

## Steps

### 1. Identify the job

Examples:

```text
trip-summary.sdd
trip-summary.job.sdd
nightly-cleanup.job.sdd
```

Use a suffix when it helps distinguish the job from service or API specs.

### 2. Define ownership

```sdd
Owns:
  ./trip-summary-job.ts
  ./trip-summary-job.test.ts
```

Use `Can modify` for a narrow task boundary when needed.

### 3. Describe triggers and inputs

```sdd
Handles:
  nightly schedule
  trip-summary queue message

Accepts:
  trip id
  summary generation date
```

`Handles` works well for triggers, events, states, and cases.

### 4. Write idempotency and side-effect rules

```sdd
Must:
  Generate at most one summary per trip and date.
  Re-running the job with the same input keeps the same visible summary.
  Save generated summaries through TripSummaryStorage.
```

Background jobs often need explicit repeat and side-effect rules.

### 5. Add failure handling

```sdd
Handles:
  missing trip
  storage failure

Raises:
  TripSummaryFailed
```

Use `Done when` for retry or failure checks if they matter.

### 6. Block unsafe work

```sdd
Must not:
  Delete trips.
  Send booking emails.

Forbids:
  Direct writes outside TripSummaryStorage.
```

Jobs can have broad impact, so explicit boundaries matter.

## Complete example

```sdd
Spec: Trip Summary Job

Purpose:
  Generate daily trip summaries in the background.

Owns:
  ./trip-summary-job.ts
  ./trip-summary-job.test.ts

Accepts:
  trip id
  summary generation date

Handles:
  nightly schedule
  missing trip
  storage failure

Must:
  Generate at most one summary per trip and date.
  Re-running the job with the same input keeps the same visible summary.
  Save generated summaries through TripSummaryStorage.

Must not:
  Delete trips.
  Send booking emails.

Depends on:
  TripSummaryStorage

Done when:
  Idempotent rerun behavior is covered by a check.
  Storage failure behavior is covered by a check.
```

## Common mistakes

- Omitting idempotency for retryable jobs.
- Hiding operational side effects in code only.
- Letting a job bypass storage or service boundaries.
- Combining several background workflows in one spec.
- Marking a job task done without checking failure behavior.

## How to verify the result

The job spec is useful when:

- triggers and inputs are clear
- side effects are bounded
- idempotency and retry behavior are explicit when needed
- failure handling is reviewable
- checks cover high-risk behavior

## Related how-tos

- [How to use the Handles section](/how-to/use-spec-sections/how-to-use-the-handles-section/)
- [How to write Done when](/how-to/use-spec-sections/how-to-write-done-when/)
- [How to use the Forbids section](/how-to/use-spec-sections/how-to-use-the-forbids-section/)

## Related reference

- [Language reference](/language-reference/)
