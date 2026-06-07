---
title: "How to separate concerns with local specs"
seoDescription: "Separate concerns with local SpecDD specs in a spec-driven development workflow by assigning each responsibility to the nearest owning spec and preventing overlap between modules, services, adapters, and components."
excerpt: "Use local specs to keep responsibilities distinct: one spec owns behavior, sibling specs reference each other intentionally, and non-goals prevent overlap."
level: "Intermediate"
howtoID: "1101001"
weight: 20
---

This guide shows you how to separate concerns with local SpecDD specs in a spec-driven development workflow.

Separation of concerns means different parts of a system should own different kinds of decisions. A UI component should
not quietly become the domain policy. A storage adapter should not decide which data is visible. A service should not
absorb every rule just because it coordinates the workflow.

SpecDD helps because local specs let you describe each concern beside the code that owns it. Instead of relying on a
large architecture document or tribal memory, each local area has a small contract that says what belongs there and what
does not.

## Short answer

Identify the distinct concerns in the change, then give each concern a local spec at the smallest useful level. Use
`Owns` and `Can modify` for authority, `Must` for behavior that belongs there, `Must not` for adjacent behavior that
must stay out, and `References` or `Depends on` when one concern needs another without owning it.

## When to use this guide

Use this guide when:

- one feature touches UI, domain rules, persistence, and external APIs
- a module is accumulating unrelated responsibilities
- contributors are editing the wrong layer to make a change pass
- tests need too much unrelated setup
- a spec contains several groups of `Must` rules that do not belong together
- agents keep spreading one decision across several places

## The design idea

Good separation of concerns is not about creating more files for its own sake. It is about placing decisions where they
can evolve independently. If display behavior changes, UI specs should guide the change. If a business invariant
changes, a model, policy, or domain service spec should guide it. If persistence changes, an adapter spec should own it.

Local specs make this separation visible. They also make overlap reviewable. When two specs both claim the same rule,
reviewers can ask which one really owns it. When a task needs edits in several concerns, the team can split the work
instead of hiding a cross-boundary change inside one broad task.

## Steps

### 1. Map the concerns

For a feature like "add place to itinerary", the concerns might be:

- UI: capture the place name and day
- domain behavior: decide whether the itinerary item is valid
- storage: persist the changed itinerary
- search: provide destination suggestions
- API: accept or return itinerary data

These are related, but they are not the same concern.

### 2. Create one local spec per concern

Use the level that matches the concern:

```text
src/trips/itinerary/itinerary-form.component.sdd
src/trips/itinerary/itinerary-validation.sdd
src/trips/storage/trip-storage.adapter.sdd
src/trips/api/create-itinerary-item.api.sdd
```

You do not need all of these specs for every change. Start with the concern being changed, then add nearby specs only
when the boundary needs to be preserved.

### 3. Assign ownership

Each spec should own only the files or behavior for its concern:

```sdd
Spec: Itinerary Validation

Purpose:
  Decide whether an itinerary item can be saved.

Owns:
  ./itinerary-validation.js
  ./itinerary-validation.test.js

Must:
  Reject itinerary items without a place name.
  Reject itinerary items whose day is outside the trip date range.
```

This spec does not own the UI form or storage adapter.

### 4. Use references for context, not control

If validation needs the date-range contract, reference it:

```sdd
References:
  ../dates/date-range.sdd
```

If a service depends on validation and storage, say so:

```sdd
Depends on:
  ItineraryValidation
  TripStorage
```

`References` and `Depends on` do not grant permission to edit the referenced concern. They make the relationship visible
without merging ownership.

### 5. Block overlap with non-goals

Use `Must not` to stop a concern from absorbing adjacent work:

```sdd
Spec: Itinerary Form

Purpose:
  Capture itinerary item input and show validation feedback.

Must:
  Show a validation message when itinerary validation fails.

Must not:
  Decide whether an itinerary item is valid.
  Save itinerary items directly to storage.
```

The component can show validation feedback. It should not become the validation authority.

### 6. Review tasks for boundary creep

A local task should usually fit inside the local boundary:

```sdd
Tasks:
  [ ] Show the missing-place validation message in the form.
```

If the task says this instead:

```sdd
Tasks:
  [ ] Add validation, save behavior, and UI feedback for itinerary items.
```

split it. That is not one local concern.

## Example concern split

UI component spec:

```sdd
Spec: Itinerary Form

Purpose:
  Capture itinerary item input and show validation feedback.

Owns:
  ./itinerary-form.jsx
  ./itinerary-form.test.jsx

Must:
  Submit place name and day to itinerary behavior.
  Show validation feedback returned by itinerary behavior.

Must not:
  Persist itinerary items directly.
  Decide itinerary validation rules.
```

Domain behavior spec:

```sdd
Spec: Itinerary Validation

Purpose:
  Decide whether an itinerary item can be saved.

Owns:
  ./itinerary-validation.js
  ./itinerary-validation.test.js

Must:
  Reject itinerary items without a place name.
  Reject itinerary items outside the trip date range.

Must not:
  Render UI.
  Persist itinerary items.
```

Storage adapter spec:

```sdd
Spec: Trip Storage

Purpose:
  Persist and retrieve trips and itinerary items.

Must:
  Save accepted itinerary changes.

Must not:
  Decide whether itinerary input is valid.
```

The concerns cooperate, but each one owns a different decision.

## Common mistakes

- Creating one feature spec that owns UI, domain, storage, and API behavior without local boundaries.
- Putting referenced files in `Owns` when they are only context.
- Letting `Depends on` become permission to edit another concern.
- Copying validation rules into UI and API specs instead of giving one spec ownership.
- Writing tasks that combine several concerns into one implementation packet.
- Treating concern separation as a folder layout issue only, instead of a responsibility and authority issue.

## How to verify the result

Concerns are separated well when:

- each local spec has one clear purpose
- each rule has an obvious owner
- sibling specs reference or depend on each other without claiming ownership
- `Must not` prevents likely responsibility leaks
- tasks are local enough to review
- tests can target each concern without exercising unrelated behavior

## Related how-tos

- [How to maintain the Single Responsibility Principle with SpecDD](/how-to/software-design-practices/how-to-maintain-the-single-responsibility-principle-with-specdd/)
- [How to use the References section](/how-to/use-spec-sections/how-to-use-the-references-section/)
- [How to use the Depends on section](/how-to/use-spec-sections/how-to-use-the-depends-on-section/)
- [How to keep specs small and maintainable](/how-to/spec-writing-technique/how-to-keep-specs-small-and-maintainable/)

## Related reference

- [Language reference](/language-reference/)
