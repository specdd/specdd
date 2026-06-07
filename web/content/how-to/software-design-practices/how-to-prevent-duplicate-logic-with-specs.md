---
title: "How to prevent duplicate logic with specs"
seoDescription: "Prevent duplicate logic with spec-driven development by assigning one owner for validation, business rules, formatting, API behavior, and shared decisions."
excerpt: "Use SpecDD specs to make duplicated logic visible, choose the owning rule, block secondary implementations, and review callers against the owner."
level: "Intermediate"
howtoID: "1101017"
weight: 180
---

This guide shows you how to prevent duplicate logic with SpecDD in a spec-driven development workflow.

Duplicate logic usually starts as a practical shortcut. A UI component repeats a validation rule to show immediate
feedback. An API handler repeats the same rule to protect the backend. A job repeats it because it runs outside the
request path. Later, the rule changes and one copy stays wrong.

SpecDD prevents this by making rule ownership explicit. One spec owns the rule. Other specs can depend on, reference, or
call that owner, but they should not silently copy the logic.

## Short answer

When you find duplicated behavior, choose the spec that should own it. Put the durable `Must`, `Scenario`, `Example`, or
contract rule there. In other specs, use `Depends on` or `References` to point to the owner and `Must not` to block
secondary implementations. Update tests so the rule is proven at the owner and callers test their integration with it.

## When to use this guide

Use this guide when:

- validation rules appear in UI, API, and job code
- formatting rules are copied across components
- API response mapping is repeated in several handlers
- business rules differ between batch and interactive paths
- two specs contain the same `Must` rule
- tests fail inconsistently because rule copies diverged

## The design idea

The best duplicate-logic fix is not always "extract a helper." Sometimes the right design is a policy, model, service,
adapter, formatter, or API contract. The important first step is ownership: which spec owns the rule, and which specs
only use the rule?

Specs make duplication reviewable. If two specs state the same behavior, reviewers can decide whether the behavior is
truly shared parent behavior, local behavior owned by one spec, or accidental duplication that should be removed.

## Steps

### 1. Find duplicated behavior

Look for repeated rules such as:

- missing-place validation
- permission checks
- date range validation
- currency formatting
- public response field mapping
- retry decisions
- default value selection
- visibility filtering

Then search specs for duplicate `Must`, `Scenario`, or `Example` entries.

### 2. Choose one owner

Ask:

- Which domain concept owns this rule?
- Which layer should make the decision?
- Which spec should change when the rule changes?
- Which callers need to use the result?

For a business rule, the owner might be a model, policy, or domain service spec. For response shape, it might be an API
spec. For external translation, it might be an adapter spec. For presentation-only formatting, it might be a component
or UI utility spec.

### 3. Move rules to the owner

Owner:

```sdd
Spec: Itinerary Validation

Purpose:
  Decide whether an itinerary item can be saved.

Must:
  Reject itinerary items without a place name.
```

Do not keep the same rule in UI and API specs unless those specs own distinct behavior around the result.

### 4. Make callers depend on the owner

UI spec:

```sdd
Depends on:
  ItineraryValidation

Must:
  Show validation feedback returned by itinerary behavior.

Must not:
  Duplicate itinerary validation rules.
```

API spec:

```sdd
Depends on:
  ItineraryValidation

Must:
  Return a validation response when itinerary validation rejects input.

Must not:
  Reimplement itinerary validation rules.
```

The UI and API can react to the rule. They do not own the rule.

### 5. Forbid secondary implementations

Use `Must not` for behavior duplication:

```sdd
Must not:
  Duplicate missing-place validation in UI components.
```

Use `Forbids` for bypass paths:

```sdd
Forbids:
  direct access to itinerary validation internals from UI
```

This prevents callers from depending on a private implementation instead of the stable rule owner.

### 6. Adjust tests

Move detailed rule tests to the owner:

```sdd
Done when:
  Missing-place validation is covered in Itinerary Validation checks.
```

Callers should test integration:

```sdd
Done when:
  The API returns a validation response when ItineraryValidation rejects input.
  The form shows validation feedback returned by itinerary behavior.
```

This avoids copying the same rule test in every layer while still checking each caller's responsibility.

## Example duplicate-logic cleanup

Before:

```sdd
Spec: Itinerary Form

Must:
  Reject itinerary items without a place name.
```

```sdd
Spec: Add Itinerary Item API

Must:
  Reject itinerary items without a place name.
```

After:

```sdd
Spec: Itinerary Validation

Must:
  Reject itinerary items without a place name.
```

```sdd
Spec: Itinerary Form

Depends on:
  ItineraryValidation

Must:
  Show validation feedback returned by itinerary behavior.

Must not:
  Duplicate itinerary validation rules.
```

```sdd
Spec: Add Itinerary Item API

Depends on:
  ItineraryValidation

Must:
  Return a validation response when itinerary validation rejects input.

Must not:
  Reimplement itinerary validation rules.
```

The rule now has one owner and two callers.

## Common mistakes

- Extracting a helper without deciding which spec owns the rule.
- Keeping duplicate `Must` rules after creating the owner.
- Duplicating tests in every layer instead of testing rule ownership and caller integration.
- Treating UI responsiveness as a reason to own domain validation in the UI.
- Referencing the owner but still copying its logic.
- Moving shared behavior to a parent spec when only one local owner should own it.

## How to verify the result

Duplicate logic is controlled when:

- each durable rule has one owning spec
- callers depend on or reference the owner
- non-owners do not copy the rule
- tests prove the rule at the owner
- caller tests cover response or integration behavior
- future rule changes have one obvious spec to update

## Related how-tos

- [How to keep business rules in the domain layer](/how-to/software-design-practices/how-to-keep-business-rules-in-the-domain-layer/)
- [How to avoid duplicating parent constraints in child specs](/how-to/spec-writing-technique/how-to-avoid-duplicating-parent-constraints-in-child-specs/)
- [How to design for low coupling and high cohesion](/how-to/software-design-practices/how-to-design-for-low-coupling-and-high-cohesion/)
- [How to use the Depends on section](/how-to/use-spec-sections/how-to-use-the-depends-on-section/)

## Related reference

- [Language reference](/language-reference/)
