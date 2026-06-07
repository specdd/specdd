---
title: "How to write an API spec"
seoDescription: "Write a SpecDD API spec for spec-driven development with HTTP, GraphQL, RPC, CLI, webhook, or other inbound-interface inputs, outputs, errors, and validation."
excerpt: "Use API specs to define inbound interface contracts: exposed endpoints or commands, accepted inputs, returned outputs, errors, and boundary rules."
level: "Intermediate"
howtoID: "1051006"
weight: 70
---

This guide shows you how to write a SpecDD API spec for a spec-driven development workflow.

An API spec describes an inbound interface such as HTTP, GraphQL, RPC, CLI, webhook, event receiver, or any other
contract external callers use to enter your system.

## Short answer

Use an API spec for one inbound contract or a small related set of contracts. Use `Exposes` for endpoints or commands,
`Accepts` for request shape or inputs, `Returns` for responses or result states, `Raises` for errors, `Handles` for
important cases, and `Must not` or `Forbids` for boundary rules.

## When to use this guide

Use this guide when:

- an endpoint, command, webhook, or RPC method needs a local contract
- validation behavior is important
- response and error behavior are reviewed often
- public behavior changed and specs need to stay aligned
- agents need to avoid bypassing service or storage boundaries

## Steps

### 1. Identify the interface

Examples:

```text
create-trip.sdd
create-trip.api.sdd
build-itinerary.api.sdd
trip-webhook.sdd
```

Use a suffix only when it clarifies the role.

### 2. List what the API exposes

```sdd
Exposes:
  POST /trips
```

For a CLI:

```sdd
Exposes:
  build-itinerary command
```

### 3. Define accepted input

```sdd
Accepts:
  POST /trips
  CreateTripRequest
  trip name
  destination
```

Use a referenced schema when the shape is large.

### 4. Define returned output

```sdd
Returns:
  201 with TripResponse
  400 for validation failure
  500 for storage failure
```

If your project treats failures as raised errors, put them in `Raises`.

### 5. Define validation and errors

```sdd
Must:
  A trip name is required.
  A destination is required.
  Missing required fields return a clear validation error.

Raises:
  TripNameRequired
  DestinationRequired
```

### 6. Protect architecture boundaries

```sdd
Must not:
  Create itinerary items.
  Bypass trip storage.
  Purchase bookings or tickets.
```

Inbound APIs should usually delegate domain behavior instead of owning every internal decision.

## Complete example

```sdd
Spec: Create Trip API

Purpose:
  Accept requests to create trips.

Exposes:
  POST /trips

Accepts:
  CreateTripRequest
  trip name
  destination

Returns:
  201 with TripResponse
  400 for validation failure
  500 for storage failure

Must:
  A trip name is required.
  A destination is required.
  Missing required fields return a clear validation error.

Must not:
  Create itinerary items.
  Bypass trip storage.
  Purchase bookings or tickets.

Depends on:
  TripCreationService

Done when:
  Required-field validation is covered by a check.
```

## Common mistakes

- Putting internal service behavior directly in the API spec.
- Leaving error responses unspecified.
- Copying a large schema instead of referencing it.
- Forgetting `Must not` rules that prevent bypassing lower layers.
- Treating an API spec as authorization to edit every downstream dependency.

## How to verify the result

The API spec is useful when:

- exposed entry points are visible
- inputs, outputs, and errors are reviewable
- validation behavior is explicit
- implementation stays inside allowed boundaries
- tests can trace to the API contract

## Related how-tos

- [How to use the Exposes section](/how-to/use-spec-sections/how-to-use-the-exposes-section/)
- [How to use the Accepts section](/how-to/use-spec-sections/how-to-use-the-accepts-section/)
- [How to use the Returns section](/how-to/use-spec-sections/how-to-use-the-returns-section/)
- [How to use the Raises section](/how-to/use-spec-sections/how-to-use-the-raises-section/)

## Related reference

- [Language reference](/language-reference/)
