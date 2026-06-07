---
title: "How to define interfaces before implementation"
seoDescription: "Define interfaces before implementation with spec-driven development by specifying exposed entry points, accepted inputs, returned outputs, errors, examples, and boundaries."
excerpt: "Use SpecDD interface contracts to agree on what callers can use before deciding how the implementation will work internally."
level: "Intermediate"
howtoID: "1101007"
weight: 80
---

This guide shows you how to define interfaces before implementation with SpecDD in a spec-driven development workflow.

An interface can be an API route, CLI command, service method, package export, component prop contract, event payload, or
adapter boundary. Defining it before implementation helps teams agree on the promise callers will depend on before the
code creates accidental commitments.

SpecDD is useful here because interface contracts are written in the same source-adjacent language as the rest of the
system. The spec can define what is exposed, what is accepted, what is returned, what errors are raised, and what must
not leak through the interface.

## Short answer

Write a local spec for the interface boundary before implementing it. Use `Exposes` for public entry points, `Accepts`
for inputs, `Returns` for outputs, `Raises` for errors or signals, `Must` for stable behavior, `Must not` for non-goals
and implementation leakage, `Example` or `Scenario` for concrete cases, and `Done when` for contract checks.

## When to use this guide

Use this guide when:

- callers need to integrate before implementation is complete
- a public API or package export is changing
- UI and service work need to proceed in parallel
- a vendor or storage adapter needs a stable internal boundary
- a feature has unclear request, response, or error behavior
- you want review to approve the contract before reviewing code

## The design idea

Implementation-first development often creates accidental interfaces. A helper function becomes public because another
file imported it. An API response leaks a database shape because it was easy to serialize. A component prop carries
extra state because the caller happened to have it.

Interface-first SpecDD reverses that pressure. The spec states the interface contract first. Implementation can then
change internally as long as it satisfies the contract and respects the boundaries.

## Steps

### 1. Choose the interface boundary

Pick the boundary callers will use:

```sdd
Spec: Create Trip API
```

or:

```sdd
Spec: Trip Summary Service
```

or:

```sdd
Spec: Destination Search Adapter
```

If the interface is public to another package, service, team, or user, make the contract especially explicit.

### 2. Name exposed entry points

Use `Exposes`:

```sdd
Exposes:
  POST /trips
```

For code interfaces:

```sdd
Exposes:
  createTrip
  validateItineraryItem
```

For CLI:

```sdd
Exposes:
  trip export
```

Only list entry points callers are meant to use.

### 3. Define inputs and outputs

Use `Accepts` and `Returns`:

```sdd
Accepts:
  CreateTripRequest with name and destination

Returns:
  201 with TripResponse
  400 for validation failure
```

For a service:

```sdd
Accepts:
  trip id
  itinerary item input

Returns:
  accepted itinerary item
  validation result for rejected input
```

The goal is to define the caller-visible contract, not every internal field.

### 4. Specify errors and edge cases

Use `Raises` for stable errors, events, or signals:

```sdd
Raises:
  TripValidationError when required fields are missing
  TripStorageUnavailable when storage cannot be reached
```

Use `Scenario` for important behavior:

```sdd
Scenario: missing destination
  Given the request has no destination
  When the create trip API is called
  Then the API returns a validation failure
  And no trip is stored
```

This keeps error behavior from being invented later by implementation convenience.

### 5. Add implementation boundaries

Use `Must not` to protect the interface:

```sdd
Must not:
  Expose internal database field names in API responses.
  Require clients to provide server-generated ids.
  Bypass trip storage.
```

Use `Forbids` if a dependency or access pattern is blocked:

```sdd
Forbids:
  direct booking API access
```

These rules prevent the interface from leaking implementation or reaching across unrelated boundaries.

### 6. Review the contract before coding

Before implementation, review:

- Is the exposed surface minimal and intentional?
- Are inputs and outputs clear enough for callers?
- Are errors stable?
- Are non-goals explicit?
- Does the interface avoid implementation leakage?
- Can the contract be tested?

If this review reveals ambiguity, fix the spec before implementation hardens the wrong contract.

## Full example

```sdd
Spec: Create Trip API

Purpose:
  Accept requests to create trips.

Exposes:
  POST /trips

Accepts:
  CreateTripRequest with name and destination

Returns:
  201 with TripResponse
  400 for validation failure
  500 for storage failure

Raises:
  TripCreated event after a trip is stored

Must:
  A trip name is required.
  A destination is required.
  Missing required fields return a clear validation error.

Must not:
  Create itinerary items.
  Bypass trip storage.
  Purchase bookings or tickets.
  Expose internal storage keys in TripResponse.

Scenario: missing destination
  Given the request has no destination
  When the create trip API is called
  Then the API returns a validation failure
  And no trip is stored

Done when:
  Request validation behavior is covered by API checks.
  TripResponse contains only public response fields.
```

The spec is detailed enough for implementation, tests, and caller review, but it does not prescribe internal helper
structure.

## Common mistakes

- Letting implementation create the interface accidentally.
- Listing private helpers in `Exposes`.
- Defining inputs but not failure behavior.
- Returning raw internal models when a stable response contract is needed.
- Writing examples that depend on storage details instead of public behavior.
- Starting implementation while contract questions are still unresolved.

## How to verify the result

The interface is ready for implementation when:

- exposed entry points are named
- inputs and outputs are caller-oriented
- stable errors or events are specified
- implementation leakage is blocked
- scenarios cover important behavior
- `Done when` identifies contract checks
- callers can understand the contract without reading implementation code

## Related how-tos

- [How to use the Exposes section](/how-to/use-spec-sections/how-to-use-the-exposes-section/)
- [How to use the Accepts section](/how-to/use-spec-sections/how-to-use-the-accepts-section/)
- [How to use the Returns section](/how-to/use-spec-sections/how-to-use-the-returns-section/)
- [How to avoid leaky abstractions](/how-to/software-design-practices/how-to-avoid-leaky-abstractions/)

## Related reference

- [Language reference](/language-reference/)
