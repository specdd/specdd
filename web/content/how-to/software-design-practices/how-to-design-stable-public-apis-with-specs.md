---
title: "How to design stable public APIs with specs"
seoDescription: "Design stable public APIs with spec-driven development by defining exposed endpoints, inputs, outputs, errors, compatibility rules, examples, and deprecation expectations."
excerpt: "Use SpecDD API specs to make public contracts intentional and reviewable before implementation details become client-facing commitments."
level: "Intermediate"
howtoID: "1101018"
weight: 190
---

This guide shows you how to design stable public APIs with SpecDD in a spec-driven development workflow.

A public API is any interface that callers depend on: HTTP, GraphQL, RPC, CLI, webhook, package export, event payload, or
machine-readable output. Once callers depend on it, accidental changes become compatibility problems.

SpecDD helps by writing the public contract before implementation details leak into it. The spec defines what is exposed,
what is accepted, what is returned, what errors mean, what must remain compatible, and what must not become part of the
public surface.

## Short answer

Write an API spec at the interface boundary. Use `Exposes`, `Accepts`, `Returns`, `Raises`, `Must`, `Must not`,
`Example`, `Scenario`, and `Done when` to define the public contract. Include compatibility and deprecation rules when
existing clients depend on behavior. Keep internal model, storage, and framework details out of the public contract
unless they are intentionally part of it.

## When to use this guide

Use this guide when:

- a new endpoint, command, webhook, or package export is being added
- existing clients depend on an API response shape
- an API change may break integrations
- implementation details are leaking into responses
- errors are inconsistent across callers
- deprecation needs to be intentional and reviewable

## The design idea

Stable APIs are not stable because they never change. They are stable because changes are intentional, compatible when
required, and reviewed against a contract. A spec gives that contract a home.

Without a spec, the first implementation often becomes the contract accidentally. Field names mirror database columns.
Errors mirror framework exceptions. Optional fields become required because one client used them that way. A SpecDD API
spec lets the team decide those details deliberately.

## Steps

### 1. Identify the public contract

Ask:

- Who are the callers?
- Is this public outside the module, package, service, repository, or organization?
- Which fields, errors, status codes, commands, or events are stable?
- Which behavior is internal and should not leak?
- Which existing clients need compatibility?

Then place the spec where the API is owned.

### 2. Define exposed endpoints or commands

Use `Exposes`:

```sdd
Exposes:
  GET /api/trips/:tripId/itinerary
  POST /api/trips/:tripId/itinerary/items
```

For CLI:

```sdd
Exposes:
  trip export
```

For package exports:

```sdd
Exposes:
  createTrip
  validateItineraryItem
```

Only list public entry points.

### 3. Specify inputs and outputs

Use `Accepts` and `Returns`:

```sdd
Accepts:
  AddItineraryItemRequest with placeName and day

Returns:
  201 with ItineraryItemResponse
  400 for validation failure
  404 when the trip does not exist
```

Keep this caller-oriented. Avoid internal model fields unless callers are intended to depend on them.

### 4. Define stable errors

Use `Raises` for stable errors, events, or signals:

```sdd
Raises:
  ItineraryValidationError when required fields are missing
  TripNotFound when the trip id does not exist
```

For HTTP APIs, `Returns` may carry status behavior while `Raises` names application-level signals or events. Use the
sections in whatever combination makes the contract clear.

### 5. Protect compatibility

If clients already rely on the API, write compatibility rules:

```sdd
Must:
  Continue returning id, day, placeName, and notes for existing v1 clients.
  Add new response fields in a backwards-compatible way.

Must not:
  Rename placeName in v1 responses.
  Require existing clients to send newly added optional fields.
  Expose internal storage keys in response payloads.
```

Compatibility rules should be specific enough to review.

### 6. Use examples and scenarios

Example:

```sdd
Example: validation failure response
  Missing placeName returns 400 with a validation error for placeName.
```

Scenario:

```sdd
Scenario: missing trip
  Given no trip exists for the requested trip id
  When the itinerary item API is called
  Then the response is 404
  And no itinerary item is stored
```

Examples and scenarios make the contract easier to test and discuss.

### 7. Plan deprecation

When a field, endpoint, command, or output format is going away, specify the path:

```sdd
Must:
  Keep legacy notesText available until the v2 itinerary API is released.
  Include a deprecation warning for legacy notesText.

Must not:
  Remove notesText from v1 responses.

Tasks:
  [ ] Add deprecation warning for notesText.
  [ ] Add v2 response example without notesText.
```

Do not remove public behavior just because the implementation changed.

### 8. Verify contract checks

Use `Done when`:

```sdd
Done when:
  v1 response contract checks still pass.
  Validation failure response is covered by an API check.
  Public examples match generated or tested responses.
```

For public APIs, `Done when` should identify contract evidence, not only implementation completion.

## Full example

```sdd
Spec: Add Itinerary Item API

Purpose:
  Accept requests to add itinerary items to existing trips.

Exposes:
  POST /api/trips/:tripId/itinerary/items

Accepts:
  AddItineraryItemRequest with placeName and day

Returns:
  201 with ItineraryItemResponse
  400 for validation failure
  404 when the trip does not exist

Raises:
  ItineraryItemAdded event after an item is stored

Must:
  Require placeName.
  Require day to be inside the trip date range.
  Continue returning id, day, placeName, and notes for v1 clients.

Must not:
  Create a trip automatically.
  Purchase bookings or tickets.
  Expose internal storage keys.
  Rename placeName in v1 responses.

Scenario: missing place name
  Given the request has no placeName
  When the API is called
  Then the response is 400
  And no itinerary item is stored

Done when:
  Validation failure response is covered by an API check.
  v1 response contract checks still pass.
```

This spec keeps the public API stable while leaving implementation details flexible.

## Common mistakes

- Letting database or internal model fields define the public response by accident.
- Defining happy-path output but not errors.
- Adding new required request fields without compatibility rules.
- Removing deprecated behavior without a replacement path.
- Treating examples as documentation only instead of contract evidence.
- Putting domain behavior directly in the API spec when a domain owner should own it.

## How to verify the result

The API spec is stable enough when:

- public entry points are explicit
- request and response contracts are caller-oriented
- errors are defined
- compatibility rules protect existing clients
- deprecation has a clear path
- examples and scenarios are testable
- internal implementation details are blocked from leaking

## Related how-tos

- [How to write an API spec](/how-to/write-specs-by-level/how-to-write-an-api-spec/)
- [How to write specs for backwards compatibility](/how-to/spec-writing-technique/how-to-write-specs-for-backwards-compatibility/)
- [How to deprecate behavior with SpecDD](/how-to/spec-driven-workflows/how-to-deprecate-behavior-with-specdd/)
- [How to define interfaces before implementation](/how-to/software-design-practices/how-to-define-interfaces-before-implementation/)

## Related reference

- [Language reference](/language-reference/)
