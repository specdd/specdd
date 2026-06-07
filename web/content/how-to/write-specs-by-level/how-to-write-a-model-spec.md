---
title: "How to write a model spec"
seoDescription: "Write a SpecDD model spec for spec-driven development with domain state, entities, value objects, invariants, accepted values, and model boundaries."
excerpt: "Use model specs to protect domain invariants: what state is valid, what the model exposes, and what responsibilities stay outside it."
level: "Intermediate"
howtoID: "1051004"
weight: 50
---

This guide shows you how to write a SpecDD model spec for a spec-driven development workflow.

A model spec describes domain state, entities, value objects, invariants, and local behavior around valid state. It
should protect the domain contract without absorbing service, adapter, or UI responsibilities.

## Short answer

Use a model spec for one domain entity, value object, or state model. Define the model's purpose, owned files, accepted
state, invariants in `Must`, non-responsibilities in `Must not`, exposed methods or values when useful, and examples or
scenarios for important state transitions.

## When to use this guide

Use this guide when:

- a domain model has important invariants
- validation rules are scattered across services or UI code
- a model should stay persistence-independent
- agents keep putting storage or rendering behavior into a model
- tests need a clear source for valid and invalid states

## Steps

### 1. Identify the domain subject

Examples:

```text
itinerary-item.sdd
itinerary-item.model.sdd
TripDateRange.sdd
```

Suffixes are optional. Follow the project naming convention.

### 2. Define what the model owns

```sdd
Owns:
  ./itinerary-item.ts
  ./itinerary-item.test.ts
```

If generated types or fixtures are writable, use `Can modify` deliberately.

### 3. Write invariants in `Must`

```sdd
Must:
  A nonempty place name is stored.
  The trip day is tracked for each item.
  Display order remains stable within the day.
```

Model `Must` rules should describe valid state and model behavior.

### 4. Use contract sections for state shape

```sdd
Accepts:
  place name
  trip day

Returns:
  itinerary item with stable display order
```

Use `Raises` when invalid state has named errors.

### 5. Block responsibilities that belong elsewhere

```sdd
Must not:
  Persist itself to storage.
  Render UI.
  Purchase bookings or tickets.
```

This keeps the model focused.

### 6. Add examples for edge cases

```sdd
Example: valid item
  place name: Louvre Museum
  trip day: 2026-06-12
  result: item is valid
```

Use `Scenario` when a state transition needs a behavior flow.

## Complete example

```sdd
Spec: Itinerary Item

Purpose:
  Represent one planned place or activity in an itinerary.

Owns:
  ./itinerary-item.ts
  ./itinerary-item.test.ts

Must:
  A nonempty place name is stored.
  The trip day is tracked for the item.
  Display order remains stable within the day.

Must not:
  Persist itself to storage.
  Render UI.
  Purchase bookings or tickets.

Accepts:
  place name
  trip day

Returns:
  itinerary item with stable display order

Raises:
  ItineraryPlaceRequired

Example: valid item
  place name: Louvre Museum
  trip day: 2026-06-12
  result: item is valid
```

## Common mistakes

- Putting storage behavior in the model spec.
- Describing UI rendering inside the model.
- Writing vague invariants such as "state is valid."
- Forgetting invalid-state errors or examples.
- Letting a model spec own service or adapter files.

## How to verify the result

The model spec is useful when:

- valid state is clear
- invariants are local and checkable
- persistence and UI responsibilities are excluded
- tests can trace to model rules
- service and adapter specs can depend on the model without owning it

## Related how-tos

- [How to write Must rules](/how-to/use-spec-sections/how-to-write-must-rules/)
- [How to use the Accepts section](/how-to/use-spec-sections/how-to-use-the-accepts-section/)
- [How to use the Example section](/how-to/use-spec-sections/how-to-use-the-example-section/)

## Related reference

- [Language reference](/language-reference/)
