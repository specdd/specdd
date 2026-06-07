---
title: "How to write an adapter spec"
seoDescription: "Write a SpecDD adapter spec for spec-driven development around an external-system boundary such as storage, APIs, files, queues, or browser APIs."
excerpt: "Use adapter specs to keep external-system behavior isolated: persistence, retrieval, translation, failure reporting, and dependency boundaries."
level: "Intermediate"
howtoID: "1051005"
weight: 60
---

This guide shows you how to write a SpecDD adapter spec for a spec-driven development workflow.

An adapter spec describes a boundary implementation for an external system: storage, network APIs, files, queues,
browser APIs, vendor SDKs, infrastructure tools, or other outside interfaces.

## Short answer

Use an adapter spec when code translates between your local domain and an external system. Define what the adapter owns,
what it must persist, retrieve, send, receive, or translate, which external dependency it may use, how failures are
reported, and what domain decisions it must not make.

## When to use this guide

Use this guide when:

- a module talks to an external API or SDK
- persistence behavior needs a boundary
- service code is starting to know too much about storage
- failures need a local contract
- agents keep moving domain decisions into infrastructure code

## Steps

### 1. Identify the boundary

Examples:

```text
trip-storage.sdd
trip-storage.adapter.sdd
stripe-billing.adapter.sdd
itinerary-export.adapter.sdd
```

Use the project naming convention. Suffixes are optional.

### 2. Own adapter files

```sdd
Owns:
  ./trip-storage.ts
  ./trip-storage.test.ts
```

Use `Can modify` when only specific files are writable for a task.

### 3. Describe adapter behavior

```sdd
Must:
  Save trip changes.
  Load previously saved trips when the app starts.
  Report save failures in a way itinerary behavior can show to the person.
```

Adapter behavior should focus on boundary responsibilities.

### 4. Declare allowed dependencies

```sdd
Depends on:
  browser local storage
```

or:

```sdd
Depends on:
  VendorTripApi
```

Use `Forbids` to block wrong access paths.

### 5. Block domain decisions

```sdd
Must not:
  Change place names.
  Move itinerary items between days.
  Decide which itinerary items are visible.
```

The adapter should not own business decisions.

### 6. Add failure handling

```sdd
Handles:
  storage unavailable
  malformed saved trip data

Raises:
  TripStorageSaveFailed
```

Use `Done when` for checks that matter.

## Complete example

```sdd
Spec: Trip Storage Adapter

Purpose:
  Persist and retrieve trips and itinerary items.

Owns:
  ./trip-storage.ts
  ./trip-storage.test.ts

Must:
  Save trip changes.
  Load previously saved trips when the app starts.
  Report save failures in a way itinerary behavior can show to the person.

Must not:
  Change place names.
  Move itinerary items between days.
  Decide which itinerary items are visible.

Depends on:
  browser local storage

Handles:
  storage unavailable
  malformed saved trip data

Raises:
  TripStorageSaveFailed

Done when:
  Save failure behavior is covered by a check.
```

## Common mistakes

- Letting the adapter make business decisions.
- Putting adapter dependency details in a service spec instead.
- Forgetting failure reporting.
- Giving the adapter authority over domain model files.
- Using a forbidden dependency because the adapter boundary was vague.

## How to verify the result

The adapter spec is useful when:

- the external boundary is clear
- allowed dependencies are explicit
- domain decisions remain outside the adapter
- failure behavior is named
- service specs can depend on the adapter without owning it

## Related how-tos

- [How to use the Depends on section](/how-to/use-spec-sections/how-to-use-the-depends-on-section/)
- [How to use the Handles section](/how-to/use-spec-sections/how-to-use-the-handles-section/)
- [How to use the Forbids section](/how-to/use-spec-sections/how-to-use-the-forbids-section/)

## Related reference

- [Language reference](/language-reference/)
