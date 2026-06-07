---
title: "How to write specs for observability"
seoDescription: "Write spec-driven development observability requirements for logs, metrics, traces, alerts, audit events, dashboards, and sensitive data boundaries."
excerpt: "Use specs to define useful observability behavior, including what to log, measure, trace, alert on, audit, and never record."
level: "Intermediate"
howtoID: "1071015"
weight: 160
---

This guide shows you how to write SpecDD specs for observability in a spec-driven development workflow.

Observability rules belong in specs when logs, metrics, traces, audit events, alerts, or dashboards are part of the
durable behavior of a system. Good observability specs help implementers add the right signal without leaking sensitive
data or creating noisy instrumentation.

## Short answer

Write observability as behavior. Use `Must` for required logs, metrics, traces, audit events, dashboards, or alerts.
Use `Must not` and `Forbids` for sensitive data and noisy or unsafe instrumentation. Use `Handles`, `Raises`, and
`Done when` to connect observability to failure paths and review checks.

## When to use this guide

Use this guide when a spec needs to define:

- logs for important lifecycle events
- metrics for operations or product behavior
- tracing spans across services
- audit events for user or administrator actions
- alerts for degraded service behavior
- dashboards for ongoing review
- data that must not be logged or exported

## Steps

### 1. Choose observable outcomes

Start with what someone needs to know:

- Did the job run?
- Did an external dependency fail?
- Which user-visible operation failed?
- Did retry behavior exhaust?
- Did an administrator perform a sensitive action?
- Is latency or throughput outside the expected range?

Do not add observability only because a code path exists. Instrument behavior that helps operate, debug, audit, or
review the system.

### 2. Specify logs and metrics

Use concrete rules:

```sdd
Must:
  Log a warning when destination lookup retries are exhausted.
  Emit a trip_itinerary_validation_failed metric tagged by validation reason.
```

Avoid:

```sdd
Must:
  Add good logging and metrics.
```

Name the event, condition, or dimension that matters.

### 3. Add tracing or audit events when needed

For distributed work:

```sdd
Must:
  Include a tracing span for destination lookup inside itinerary save.
  Propagate the request correlation id to destination lookup calls.
```

For auditable actions:

```sdd
Must:
  Record an audit event when an administrator exports a user's trip data.

Raises:
  TripDataExported audit event
```

Use the spec that owns the workflow or interface. Do not scatter the same audit rule across every implementation file.

### 4. State what must not be recorded

Observability specs should include data boundaries:

```sdd
Must not:
  Log full trip note text.
  Include access tokens in traces.
  Emit user email addresses as metric labels.
```

Use `Forbids` for blocked sinks, tools, or destinations:

```sdd
Forbids:
  sending audit events to non-audit log sinks
```

This prevents useful instrumentation from becoming unsafe.

### 5. Define alert and dashboard expectations

If operations relies on an alert or dashboard, write the expectation:

```sdd
Must:
  Alert when destination lookup retry exhaustion exceeds the configured threshold for 10 minutes.
  Show itinerary validation failure rate on the trip operations dashboard.
```

Keep the rule at the level that owns the operational contract. A feature spec can require a metric; a service or
operations spec may own the alerting policy.

### 6. Connect observability to checks

Use `Done when`:

```sdd
Done when:
  Retry exhaustion logging is covered by a check.
  Validation failure metric emission is covered by a check.
  The review confirms no full trip note text is logged.
```

Some observability checks can be automated. Others may need review evidence, dashboard screenshots, or deployment
configuration review, depending on the project.

## Observability patterns

### Failure path

```sdd
Handles:
  destination lookup timeout

Must:
  Log a warning when destination lookup retries are exhausted.
  Emit a destination_lookup_retry_exhausted metric.

Must not:
  Log the full destination search query when it includes user-entered notes.
```

### Audit path

```sdd
Must:
  Record an audit event when an administrator exports trip data.

Raises:
  TripDataExported audit event

Done when:
  Audit event emission is covered by a check.
```

### Performance signal

```sdd
Must:
  Emit itinerary_summary_latency_ms for itinerary summary generation.
  Include success and failure status labels.

Must not:
  Use high-cardinality trip ids as metric labels.
```

## Common mistakes

- Saying "add logging" without naming events or conditions.
- Emitting sensitive data in logs, traces, metrics, or audit events.
- Using high-cardinality values as metric labels.
- Adding noisy logs that do not help operations or debugging.
- Repeating the same observability rule in every child spec.
- Forgetting to verify instrumentation in tests or review.

## How to verify the result

The observability spec is ready when:

- required signals are named
- failure paths are covered when relevant
- sensitive data boundaries are explicit
- alert or dashboard expectations are owned at the right level
- checks or review evidence are included in `Done when`
- observability rules do not duplicate parent policy unnecessarily

## Related how-tos

- [How to use the Handles section](/how-to/use-spec-sections/how-to-use-the-handles-section/)
- [How to use the Raises section](/how-to/use-spec-sections/how-to-use-the-raises-section/)
- [How to use the Forbids section](/how-to/use-spec-sections/how-to-use-the-forbids-section/)
- [How to write Done when](/how-to/use-spec-sections/how-to-write-done-when/)

## Related reference

- [Language reference](/language-reference/)
