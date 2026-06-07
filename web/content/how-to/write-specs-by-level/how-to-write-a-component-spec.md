---
title: "How to write a component spec"
seoDescription: "Write a SpecDD component spec for spec-driven development with UI component behavior, props, state expectations, interactions, rendering boundaries, and scenarios."
excerpt: "Use component specs for UI behavior: accepted props, visible output, interaction scenarios, state handling, and boundaries that keep components focused."
level: "Intermediate"
howtoID: "1051007"
weight: 80
---

This guide shows you how to write a SpecDD component spec for a spec-driven development workflow.

A component spec describes UI component behavior: inputs, rendered output, interactions, local state, events, and
boundaries. It should keep UI responsibilities clear without turning the component into a full feature spec.

## Short answer

Use a component spec for one UI component or small local component family. Define what the component owns, what props or
state it accepts, what it renders or exposes, which interactions it handles, what it must not do, and which scenarios
or checks prove important behavior.

## When to use this guide

Use this guide when:

- a component has meaningful behavior
- props and state are misunderstood
- UI changes keep leaking data or service logic into the component
- interaction behavior needs review
- agents overbuild component changes

## Steps

### 1. Choose one component boundary

Examples:

```text
itinerary-card.sdd
itinerary-card.component.sdd
TripDayList.sdd
```

Use suffixes only when they clarify the role.

### 2. Own the component and checks

```sdd
Owns:
  ./itinerary-card.tsx
  ./itinerary-card.test.tsx
```

If visual fixtures or stories are writable, list them in `Can modify` or `Owns` deliberately.

### 3. Define accepted props or state

```sdd
Accepts:
  itinerary item with place name and trip day
  selected state
  move-place callback
```

Use the project's real prop names or symbols when useful.

### 4. Describe visible behavior

```sdd
Must:
  Show the place name.
  Show the trip day.
  Call the move-place callback when the person chooses another day.
```

Keep component rules observable.

### 5. Block non-component responsibilities

```sdd
Must not:
  Persist itinerary changes directly.
  Fetch destination search results.
  Decide booking availability.
```

Components can display or request actions without owning service and adapter behavior.

### 6. Add interaction scenarios

```sdd
Scenario: move place
  Given the itinerary card shows "Louvre Museum"
  When the person moves it to June 13
  Then the move-place callback receives June 13
```

This guides implementation and tests.

## Complete example

```sdd
Spec: Itinerary Card

Purpose:
  Show one itinerary item and let the person request local item actions.

Owns:
  ./itinerary-card.tsx
  ./itinerary-card.test.tsx

Accepts:
  itinerary item with place name and trip day
  selected state
  move-place callback

Returns:
  visible itinerary card state

Must:
  Show the place name.
  Show the trip day.
  Call the move-place callback when the person chooses another day.

Must not:
  Persist itinerary changes directly.
  Fetch destination search results.
  Decide booking availability.

Scenario: move place
  Given the itinerary card shows "Louvre Museum"
  When the person moves it to June 13
  Then the move-place callback receives June 13
```

## Common mistakes

- Putting feature-wide behavior in one component spec.
- Letting the component fetch or persist data directly when a service owns that.
- Describing CSS implementation details instead of visible behavior.
- Forgetting interaction scenarios for user actions.
- Listing parent or child components as owned when they are only rendered or read.

## How to verify the result

The component spec is useful when:

- props or inputs are clear
- visible behavior is reviewable
- interactions have scenarios
- service, storage, and feature responsibilities stay outside the component
- component tests can trace to the spec

## Related how-tos

- [How to use the Accepts section](/how-to/use-spec-sections/how-to-use-the-accepts-section/)
- [How to use the Returns section](/how-to/use-spec-sections/how-to-use-the-returns-section/)
- [How to write Scenario blocks](/how-to/use-spec-sections/how-to-write-scenario-blocks/)

## Related reference

- [Language reference](/language-reference/)
