---
title: "How to keep UI components focused"
seoDescription: "Keep UI components focused with SpecDD component specs for spec-driven development that define rendering, interaction, state, accessibility, and boundaries from domain and persistence logic."
excerpt: "Use component specs to keep UI code responsible for presentation and interaction while domain rules, persistence, and API behavior stay in their owning specs."
level: "Intermediate"
howtoID: "1101004"
weight: 50
---

This guide shows you how to keep UI components focused with SpecDD in a spec-driven development workflow.

UI components often become the easiest place to put everything: formatting, validation, data fetching, permission
checks, persistence, analytics, and business decisions. The component still renders, but it also becomes a hidden domain
service and a hidden adapter. That makes the component harder to test and harder to reuse.

A component spec keeps the boundary visible. It says what the component renders, what interaction it owns, what state it
manages locally, and which decisions belong somewhere else.

## Short answer

Write a component spec for one UI component or a small cohesive component group. Use `Purpose` for the visible
responsibility, `Owns` for component and test files, `Must` for rendering and interaction behavior, `Must not` for
domain, persistence, and cross-layer responsibilities, and `Scenario` for important user flows. Use `Depends on` or
`References` for services, models, or specs the component relies on without owning.

## When to use this guide

Use this guide when:

- a component contains validation rules that belong to the domain
- UI code imports storage, adapters, or API clients directly
- a component is hard to test without a full application setup
- several unrelated workflows are handled in one component
- agents keep adding logic to the component because it is the visible entry point
- component specs are too vague to protect UI boundaries

## The design idea

A focused component owns presentation and interaction. It may collect input, show state, call a handler or service,
display returned errors, and preserve accessibility behavior. It should not own durable domain rules unless the
component is truly the product surface for that rule.

This distinction matters because UI changes are frequent. If every UI change risks changing validation, persistence, or
authorization, the system becomes brittle. A component spec lets reviewers ask whether a diff changed UI behavior or
quietly moved business behavior into the UI layer.

## Steps

### 1. Choose the component boundary

Choose one component or a tightly related group:

```sdd
Spec: Itinerary Form
```

Avoid vague subjects:

```sdd
Spec: Trip UI
```

If a screen contains several independent concerns, write smaller specs for the important component boundaries.

### 2. Write a UI-focused purpose

Good:

```sdd
Purpose:
  Capture itinerary item input and show validation feedback.
```

Weak:

```sdd
Purpose:
  Manage itinerary creation, validation, saving, and search.
```

The weak purpose turns the component into a workflow owner. The stronger purpose keeps the component focused on UI
interaction.

### 3. Specify visible behavior

Use `Must` for behavior the user can observe or interact with:

```sdd
Must:
  Render place name and trip day inputs.
  Submit place name and trip day to itinerary behavior.
  Show validation feedback returned by itinerary behavior.
  Keep keyboard focus on the first invalid field after validation fails.
```

These rules describe component behavior without making the component own validation rules.

### 4. Separate domain decisions

Use `Must not` for domain behavior that should stay elsewhere:

```sdd
Must not:
  Decide whether an itinerary item is valid.
  Decide whether the user may edit the trip.
  Reorder itinerary items after save.
```

If the component needs validation feedback, it can depend on the service or behavior that returns it:

```sdd
Depends on:
  ItineraryBehavior
```

The component may display the result. It should not duplicate the rule.

### 5. Block persistence and external access

Use `Forbids` when the component must not directly access lower layers:

```sdd
Forbids:
  ../adapters/*
  direct browser storage access
  direct booking API access
```

This protects the component from becoming a persistence boundary.

### 6. Use scenarios for user interaction

Scenarios make component behavior concrete:

```sdd
Scenario: validation feedback
  Given the place name is empty
  When the person submits the itinerary form
  Then the form shows the validation message returned by itinerary behavior
  And focus moves to the place name input
```

This scenario is UI-specific. The validation rule itself should still belong to the domain or service spec that owns
it.

### 7. Keep tasks UI-local

Good:

```sdd
Tasks:
  [ ] Show returned validation feedback beside the place name input.
```

Wrong for a component spec:

```sdd
Tasks:
  [ ] Add missing-place validation to the itinerary domain.
```

That task belongs in the validation or domain spec.

## Full example

```sdd
Spec: Itinerary Form

Purpose:
  Capture itinerary item input and show validation feedback.

Owns:
  ./itinerary-form.jsx
  ./itinerary-form.test.jsx

Must:
  Render place name and trip day inputs.
  Submit place name and trip day to itinerary behavior.
  Show validation feedback returned by itinerary behavior.
  Keep keyboard focus on the first invalid field after validation fails.

Must not:
  Decide whether an itinerary item is valid.
  Persist itinerary items directly.
  Fetch destination search results directly.

Depends on:
  ItineraryBehavior

Forbids:
  ../adapters/*
  direct browser storage access

Scenario: validation feedback
  Given the place name is empty
  When the person submits the itinerary form
  Then the form shows the validation message returned by itinerary behavior
  And focus moves to the place name input

Done when:
  Validation feedback rendering is covered by a component check.
  The component does not import storage adapters.
```

This spec lets the component be rich and useful without becoming the owner of every trip rule.

## Common mistakes

- Putting domain validation rules directly in the component spec.
- Letting the component import storage because the form is where the save begins.
- Writing a component spec for an entire page when several components own distinct behavior.
- Omitting accessibility-relevant behavior that the component truly owns.
- Testing the component only through full-stack workflows.
- Using `Depends on` as permission to edit the service or adapter.

## How to verify the result

The component is focused when:

- its purpose describes UI behavior
- `Must` rules are visible or interaction-oriented
- domain decisions are in another owning spec
- persistence and external access are forbidden when inappropriate
- scenarios describe user interaction
- component checks do not require unrelated infrastructure

## Related how-tos

- [How to write a component spec](/how-to/write-specs-by-level/how-to-write-a-component-spec/)
- [How to prevent cross-layer coupling](/how-to/software-design-practices/how-to-prevent-cross-layer-coupling/)
- [How to write Scenario blocks](/how-to/use-spec-sections/how-to-write-scenario-blocks/)
- [How to use the Forbids section](/how-to/use-spec-sections/how-to-use-the-forbids-section/)

## Related reference

- [Language reference](/language-reference/)
