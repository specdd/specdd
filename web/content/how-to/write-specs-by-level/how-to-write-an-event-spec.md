---
title: "How to write an event spec"
seoDescription: "Write a SpecDD event spec for spec-driven development with emitted or consumed events, message payloads, producers, consumers, handlers, and compatibility boundaries."
excerpt: "Use event specs to make message contracts explicit: event name, payload, producers, consumers, handled cases, and forbidden side effects."
level: "Intermediate"
howtoID: "1051009"
weight: 100
---

This guide shows you how to write a SpecDD event spec for a spec-driven development workflow.

An event spec describes emitted or consumed event and message contracts: domain events, integration events, pub/sub
messages, webhook payloads, queue messages, or local event bus entries.

## Short answer

Use an event spec for one event or small event family. Define the event name, who emits or consumes it, accepted payload
shape, returned or emitted outcome when relevant, handled cases, compatibility expectations, and side effects the event
must not trigger.

## When to use this guide

Use this guide when:

- an event payload is shared across modules or services
- producers and consumers need a stable contract
- event handling failures are subtle
- agents keep changing message shape accidentally
- compatibility matters during rollout

## Steps

### 1. Identify the event

Examples:

```text
trip-created.sdd
trip-created.event.sdd
itinerary-updated.event.sdd
```

Use one spec per important event unless several events are intentionally one small family.

### 2. Name the event surface

```sdd
Exposes:
  trip.created event
```

If the spec is for a consumer, use `Handles`:

```sdd
Handles:
  trip.created event
```

### 3. Describe the payload

```sdd
Accepts:
  tripId
  destination
  createdAt
```

or:

```sdd
Returns:
  trip.created event payload
```

Use the section that matches whether the spec consumes or emits the event.

### 4. Name producers and consumers as context

```sdd
Depends on:
  TripCreationService

References:
  ../notifications/trip-notification.sdd
```

References provide context. They do not grant write authority over consumers.

### 5. Protect compatibility

```sdd
Must:
  Include tripId in every emitted event.
  Preserve existing payload fields unless a reviewed compatibility change is approved.

Must not:
  Emit booking purchase data.
```

Event specs should make compatibility risks visible.

### 6. Add examples

```sdd
Example: trip created
  event: trip.created
  tripId: trip_123
  destination: Paris
```

Examples are useful for payload shape.

## Complete example

```sdd
Spec: Trip Created Event

Purpose:
  Notify local consumers that a trip was created.

Owns:
  ./trip-created.event.ts
  ./trip-created.event.test.ts

Exposes:
  trip.created event

Accepts:
  tripId
  destination
  createdAt

Must:
  Include tripId in every emitted event.
  Preserve existing payload fields unless a reviewed compatibility change is approved.

Must not:
  Emit booking purchase data.

Depends on:
  TripCreationService

Example: trip created
  event: trip.created
  tripId: trip_123
  destination: Paris
```

## Common mistakes

- Changing event payload shape without updating the spec.
- Treating a consumer spec as permission to edit the producer.
- Omitting required identifiers such as event ID or entity ID.
- Mixing several unrelated events in one spec.
- Hiding compatibility changes in implementation.

## How to verify the result

The event spec is useful when:

- event name and payload are clear
- producer and consumer context is explicit
- compatibility expectations are visible
- examples clarify payload shape
- review can detect unauthorized event changes

## Related how-tos

- [How to use the Exposes section](/how-to/use-spec-sections/how-to-use-the-exposes-section/)
- [How to use the Accepts section](/how-to/use-spec-sections/how-to-use-the-accepts-section/)
- [How to use the Example section](/how-to/use-spec-sections/how-to-use-the-example-section/)

## Related reference

- [Language reference](/language-reference/)
