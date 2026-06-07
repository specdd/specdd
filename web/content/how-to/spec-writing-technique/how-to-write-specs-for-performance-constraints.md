---
title: "How to write specs for performance constraints"
seoDescription: "Write spec-driven development performance constraints for latency, memory, throughput, query count, bundle size, build time, and resource usage without premature over-specification."
excerpt: "Use specs to capture real performance constraints as measurable, reviewable behavior while avoiding brittle premature implementation rules."
level: "Intermediate"
howtoID: "1071014"
weight: 150
---

This guide shows you how to write SpecDD specs for performance constraints in a spec-driven development workflow.

Performance belongs in a spec when it is part of the durable contract for a module, service, API, job, component, build,
or workflow. The point is not to optimize everything early. The point is to preserve performance requirements that
matter.

## Short answer

Specify performance only when the constraint is real enough to guide design and review. Make it measurable, state the
workload, avoid brittle implementation detail, define unsafe regressions with `Must not`, and use `Done when` to require
the checks or evidence reviewers should expect.

## When to use this guide

Use this guide when performance affects:

- user-visible latency
- API response time
- background job duration
- memory usage
- throughput
- query count
- bundle size
- build time
- startup time
- cache behavior
- resource limits

Skip performance rules when you do not yet know the workload, limit, or business reason. A vague rule can create false
precision and unnecessary churn.

## Steps

### 1. Decide whether performance is part of the contract

Ask:

- Would a regression here affect users, operations, cost, or developer workflow?
- Is there an existing limit, service objective, platform limit, or benchmark?
- Will future contributors be tempted to trade this away?
- Can the requirement be checked?

If the answer is no, leave performance out for now.

### 2. Choose measurable constraints

Prefer measurable rules:

```sdd
Must:
  Render the itinerary list without issuing more than one trip-items query.
  Keep the compressed itinerary editor bundle under 80 KB.
  Complete nightly trip reminder generation within 10 minutes for 100,000 active trips.
```

Avoid:

```sdd
Must:
  Be fast and lightweight.
```

"Fast" does not tell reviewers what changed or what failed.

### 3. State the workload

A performance limit needs context:

```sdd
Must:
  Return the itinerary summary within 200 ms at p95 for trips with up to 500 itinerary items.
```

Without the workload, a number can be misleading. Include the relevant input size, concurrency, environment, or traffic
shape when it matters.

### 4. Avoid premature implementation detail

Do not specify implementation unless the implementation choice is the contract:

```sdd
Must:
  Use Redis for itinerary summary caching.
```

Better, if callers only care about behavior:

```sdd
Must:
  Reuse cached itinerary summaries when the trip has not changed.
```

If the architecture requires a specific cache, dependency, or query strategy, make that explicit. Otherwise, leave room
for a simpler implementation.

### 5. Add failure boundaries

Use `Must not` for known regressions:

```sdd
Must not:
  Introduce per-item database queries while rendering the itinerary list.
  Load destination images before the itinerary editor becomes interactive.
  Increase the default export job memory limit.
```

These rules are useful when a known bad pattern keeps recurring.

### 6. Connect constraints to verification

Use `Done when` to state the evidence:

```sdd
Done when:
  Query count coverage verifies one trip-items query for itinerary list rendering.
  Bundle size output stays below the itinerary editor limit.
  The reminder job benchmark completes within the specified duration.
```

If the project does not have an automated check yet, require the most concrete available review evidence:

```sdd
Done when:
  The pull request includes benchmark output for 100,000 active trips.
```

## Performance constraint examples

### Latency

```sdd
Must:
  Return itinerary summaries within 200 ms at p95 for trips with up to 500 itinerary items.
```

### Query count

```sdd
Must:
  Fetch itinerary items for the list view with one query.

Must not:
  Add per-item destination lookups during list rendering.
```

### Bundle size

```sdd
Must:
  Keep the compressed itinerary editor bundle under 80 KB.

Done when:
  Bundle analysis confirms the editor stays under the limit.
```

### Build time

```sdd
Must:
  Keep generated API client validation from increasing the default build by more than 30 seconds.
```

## Common mistakes

- Adding vague "must be fast" rules.
- Setting numbers without a workload.
- Specifying a technology when the contract is actually latency or resource use.
- Writing performance rules for every feature by default.
- Forgetting to require checks or evidence.
- Keeping obsolete limits after architecture changes.

## How to verify the result

The performance spec is ready when:

- each constraint has a reason
- each limit is measurable
- the workload is stated when needed
- implementation detail is intentional
- forbidden regressions are concrete
- `Done when` identifies the check, benchmark, or review evidence

## Related how-tos

- [How to write Done when](/how-to/use-spec-sections/how-to-write-done-when/)
- [How to write Must rules](/how-to/use-spec-sections/how-to-write-must-rules/)
- [How to write Must not rules](/how-to/use-spec-sections/how-to-write-must-not-rules/)
- [How to review a draft spec before using it](/how-to/spec-writing-technique/how-to-review-a-draft-spec-before-using-it/)

## Related reference

- [Language reference](/language-reference/)
