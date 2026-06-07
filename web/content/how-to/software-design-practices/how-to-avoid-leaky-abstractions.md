---
title: "How to avoid leaky abstractions"
seoDescription: "Avoid leaky abstractions with spec-driven development by defining public contracts, hiding implementation details, forbidding dependency leakage, and reviewing callers against the spec."
excerpt: "Use SpecDD contracts to keep callers depending on stable behavior rather than storage details, vendor APIs, database shapes, or framework internals."
level: "Intermediate"
howtoID: "1101005"
weight: 60
---

This guide shows you how to avoid leaky abstractions with SpecDD in a spec-driven development workflow.

An abstraction leaks when callers must know too much about how something is implemented. A service exposes database
field names. A storage adapter forces UI code to understand browser storage details. An API response mirrors an internal
model that should be free to change. A library caller has to handle vendor-specific errors that should have been
translated at the boundary.

SpecDD helps by making the abstraction boundary explicit. The spec describes what the abstraction exposes, accepts,
returns, raises, and must not leak. Reviewers can then catch implementation details that escape into callers.

## Short answer

Write a spec for the abstraction boundary. Use `Exposes`, `Accepts`, `Returns`, and `Raises` for the public contract,
`Must` for stable behavior, `Must not` for implementation detail that must stay hidden, and `Forbids` for dependencies
callers must not touch. Keep examples focused on the contract, not the internal representation.

## When to use this guide

Use this guide when:

- callers know database column names or storage keys
- UI code handles vendor SDK errors directly
- API responses expose internal model structure accidentally
- adapter details spread into services or components
- tests depend on private implementation state
- refactors are hard because callers rely on internals

## The design idea

Abstractions are promises. The promise might be a function, service, API, adapter, event, package export, or component
interface. A good abstraction lets callers rely on a stable contract while the implementation changes behind it.

Specs are useful because they separate the public promise from the private mechanism. If the mechanism appears in the
contract section, it is no longer private. That may be intentional, but it should be reviewed as a design decision.

## Steps

### 1. Identify the abstraction boundary

Ask what callers should depend on:

- a service method
- a repository or storage adapter
- an API route
- a CLI command
- a package export
- a component prop and event interface
- an event payload

Then create the spec at that boundary.

### 2. Define the exposed contract

Use contract sections for the public surface:

```sdd
Spec: Trip Storage

Purpose:
  Persist and retrieve trips through the configured browser storage boundary.

Exposes:
  TripStorage.saveTrip
  TripStorage.loadTrips

Accepts:
  Trip

Returns:
  saved Trip
  list of saved trips
```

Callers should depend on this contract, not the implementation detail below it.

### 3. Hide implementation details

Use `Must not` to block leakage:

```sdd
Must not:
  Require callers to know browser storage key names.
  Return raw browser storage records.
  Expose vendor SDK error objects.
```

This is stronger than saying "keep it clean" in prose. It gives reviewers a concrete rule.

### 4. Forbid leaked dependencies

If callers must not reach around the abstraction, use `Forbids`:

```sdd
Forbids:
  direct browser local storage access from itinerary behavior
  importing ../adapters/trip-storage-internals/*
```

`Forbids` is useful when a shortcut would bypass the abstraction entirely.

### 5. Specify translated errors

Leaky abstractions often show up as raw implementation errors:

```sdd
Raises:
  TripStorageUnavailable when browser storage cannot be read
  TripSaveFailed when a trip cannot be persisted

Must not:
  Raise raw DOMException values to itinerary behavior.
```

The caller can handle stable domain or application errors instead of implementation-specific failures.

### 6. Use examples for the contract

Good:

```sdd
Example: saved trip
  saveTrip returns the saved trip with its stable id.
```

Weak:

```sdd
Example: saved trip
  saveTrip writes JSON to localStorage under trip:v3:active.
```

The second example leaks the storage strategy unless that key is truly part of the public contract.

### 7. Review callers against the contract

During review, check:

- Does caller code use only `Exposes` entries?
- Does caller code depend on fields listed in `Returns`, not private fields?
- Are errors translated at the boundary?
- Did a test assert an internal detail that should remain private?
- Did the change add a direct dependency that `Forbids` blocks?

This review catches abstraction leaks before they become compatibility commitments.

## Full example

```sdd
Spec: Destination Search Adapter

Purpose:
  Translate destination search requests between trip planning behavior and the external destination provider.

Owns:
  ./destination-search-adapter.js
  ./destination-search-adapter.test.js

Exposes:
  searchDestinations

Accepts:
  destination query text

Returns:
  normalized destination results

Raises:
  DestinationSearchUnavailable when the provider cannot be reached

Must:
  Normalize provider results before returning them to trip planning behavior.
  Preserve provider failure information only as stable adapter errors.

Must not:
  Expose provider response objects to callers.
  Require UI components to know provider query parameters.

Forbids:
  UI importing the destination provider SDK

Done when:
  Adapter tests cover provider error translation.
  UI callers use only normalized destination results.
```

The provider can change without forcing UI and domain code to change, because callers depend on the adapter contract.

## Common mistakes

- Listing internal helper functions in `Exposes`.
- Returning raw database, SDK, or framework objects from a boundary.
- Making tests assert private storage keys or provider fields.
- Allowing callers to import implementation internals because the public contract is missing one field.
- Treating every implementation detail in an example as part of the public contract.
- Forgetting to specify stable errors in `Raises`.

## How to verify the result

The abstraction is not leaking when:

- callers depend on the spec's exposed contract
- implementation details are absent from caller code and tests
- raw external errors are translated at the boundary
- forbidden direct dependencies are not used
- examples describe contract behavior instead of private mechanism
- implementation can change without changing unrelated callers

## Related how-tos

- [How to use the Exposes section](/how-to/use-spec-sections/how-to-use-the-exposes-section/)
- [How to use the Accepts section](/how-to/use-spec-sections/how-to-use-the-accepts-section/)
- [How to use the Returns section](/how-to/use-spec-sections/how-to-use-the-returns-section/)
- [How to write an adapter spec](/how-to/write-specs-by-level/how-to-write-an-adapter-spec/)

## Related reference

- [Language reference](/language-reference/)
