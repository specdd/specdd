---
title: "How to write specs for edge cases"
seoDescription: "Write SpecDD specs for edge cases in a spec-driven development workflow, including validation failures, empty states, retries, concurrency, time zones, rate limits, permissions, and degraded services."
excerpt: "Capture important edge cases in specs with explicit behavior, scenarios, handlers, errors, boundaries, and completion criteria without listing every impossible case."
level: "Intermediate"
howtoID: "1071012"
weight: 130
---

This guide shows you how to write SpecDD specs for edge cases in a spec-driven development workflow.

Edge cases belong in specs when they define durable behavior or prevent recurring mistakes. The goal is not to list every
theoretical possibility. The goal is to make important failure modes, boundary conditions, and degraded states explicit
enough to implement and verify.

## Short answer

Write edge cases as specific behavior. Use `Must` for required handling, `Must not` for unsafe fallback behavior,
`Handles` for events or conditions the subject is responsible for, `Raises` for errors or signals, `Scenario` for
concrete examples, and `Done when` to require checks.

## When to use this guide

Use this guide when a spec needs to define behavior for:

- validation failures
- empty states
- retries
- concurrency
- partial failures
- time zones
- rate limits
- permission failures
- missing external services
- duplicate input
- stale data
- malformed data

## Steps

### 1. Choose edge cases that matter

Start from real risk:

- Has this failed before?
- Is the behavior user-visible?
- Could an agent reasonably choose the wrong fallback?
- Does the edge case protect data, compatibility, or money movement?
- Does another system depend on the exact response?

Do not fill a spec with unrelated edge cases just because they are imaginable.

### 2. State expected behavior

Use concrete `Must` rules:

```sdd
Must:
  Reject itinerary items without a place name.
  Treat an empty itinerary as a valid trip state.
  Retry destination lookups only when the lookup fails with a retryable network error.
```

Avoid:

```sdd
Must:
  Handle all edge cases gracefully.
```

That rule does not tell implementers or reviewers what behavior is expected.

### 3. Use scenarios for examples

Scenarios are useful when the edge case has multiple conditions:

```sdd
Scenario: Empty itinerary
  Given a trip with no itinerary items
  When the itinerary is opened
  Then the trip is shown without an error
  And no placeholder item is created
```

The scenario can later guide a test, but it also makes the intended behavior readable.

### 4. Use Handles and Raises when appropriate

Use `Handles` for conditions the subject is responsible for:

```sdd
Handles:
  validation failure for missing place name
  retryable destination lookup failure
  expired edit permission
```

Use `Raises` for errors, events, or signals the subject emits:

```sdd
Raises:
  ItineraryValidationError when a place name is missing
  PermissionDenied when the user cannot edit the trip
```

These sections are especially useful for services, APIs, jobs, adapters, and event handlers.

### 5. Add boundaries for unsafe behavior

Use `Must not` for fallbacks that would be harmful:

```sdd
Must not:
  Save a partial itinerary item after validation fails.
  Retry permission failures.
  Convert an unknown time zone to the server default.
```

These boundaries prevent plausible but incorrect "helpful" behavior.

### 6. Connect edge cases to checks

Use `Done when` to make important edge cases verifiable:

```sdd
Done when:
  Missing-place validation is covered by a check.
  Empty itinerary rendering is covered by a check.
  Permission failures are not retried.
```

If an edge case matters enough to specify, it often matters enough to test.

## Edge case patterns

### Validation failure

```sdd
Must:
  Reject itinerary items without a place name.

Raises:
  ItineraryValidationError when a place name is missing

Done when:
  Missing-place validation is covered by a check.
```

### Retry behavior

```sdd
Must:
  Retry destination lookup once after a retryable network error.

Must not:
  Retry validation failures or permission failures.
```

### Time zone behavior

```sdd
Must:
  Interpret trip dates in the trip's configured time zone.

Must not:
  Fall back to the server time zone when the trip time zone is missing.
```

### Partial external failure

```sdd
Handles:
  destination lookup timeout

Must:
  Preserve the user's unsaved itinerary item when destination lookup times out.
```

## Common mistakes

- Writing "handle gracefully" instead of expected behavior.
- Listing every theoretical edge case.
- Forgetting negative behavior like "do not retry permission failures".
- Treating edge-case scenarios as a replacement for checks.
- Putting cross-system policy in a local spec that does not own it.
- Failing to update tests when an edge-case rule changes.

## How to verify the result

The edge-case spec is ready when:

- each edge case has expected behavior
- unsafe fallbacks are forbidden
- scenarios show important examples
- emitted errors or events are named when relevant
- completion criteria identify required checks
- the edge cases belong to the spec's local authority

## Related how-tos

- [How to use the Handles section](/how-to/use-spec-sections/how-to-use-the-handles-section/)
- [How to use the Raises section](/how-to/use-spec-sections/how-to-use-the-raises-section/)
- [How to write Scenario blocks](/how-to/use-spec-sections/how-to-write-scenario-blocks/)
- [How to write Done when](/how-to/use-spec-sections/how-to-write-done-when/)

## Related reference

- [Language reference](/language-reference/)
