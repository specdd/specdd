---
title: "How to keep business rules in the domain layer"
seoDescription: "Keep business rules in the domain layer with spec-driven development by assigning rule ownership, forbidding leakage into UI, controllers, jobs, and adapters, and reviewing checks."
excerpt: "Use domain, model, policy, and service specs to own business rules while UI, API, jobs, and infrastructure delegate instead of duplicating decisions."
level: "Intermediate"
howtoID: "1101016"
weight: 170
---

This guide shows you how to keep business rules in the domain layer with SpecDD in a spec-driven development workflow.

Business rules are durable decisions about what the product or domain allows. Examples include whether a trip date is
valid, who can edit an itinerary, when a booking is allowed, how a discount is calculated, or which state transitions
are legal.

These rules often leak into UI components, controllers, API handlers, jobs, adapters, and migrations because those are
the places where inputs arrive. SpecDD helps by giving each rule an owner and making other layers delegate to that owner
instead of copying the rule.

## Short answer

Put business rules in the spec that owns the domain concept: usually a model, policy, domain service, or module spec.
Use `Must` and `Scenario` to define the rule, `Must not` and `Forbids` to keep the rule out of UI, controllers, jobs,
and adapters, and `Depends on` or `References` so other layers can use the rule without owning it.

## When to use this guide

Use this guide when:

- UI components duplicate validation or authorization rules
- API handlers decide domain policy directly
- jobs contain business rules that differ from interactive workflows
- adapters decide whether domain input is valid
- tests for one rule are repeated across several layers
- a domain rule changed but some callers still use the old copy

## The design idea

A business rule should have one durable owner. Other layers can present the rule, call the rule, persist the result, or
translate errors, but they should not become independent rule owners.

This matters because business rules change. If the rule is copied across UI, API, job, and adapter code, every change
becomes a hunt. Worse, one copy may stay stale while tests still pass for another path.

SpecDD makes the rule owner explicit.

## Steps

### 1. Identify the business rule

Write the rule in plain behavior language:

```text
Only trip owners and collaborators with edit access can change itinerary items.
```

Then ask:

- Is this a domain decision?
- Which concept owns it?
- Which layers need to call it?
- Which layers must not reimplement it?

### 2. Choose the domain owner

Good owners include:

- model spec for invariants and state transitions
- policy spec for allow/deny decisions
- domain service spec for orchestration inside the domain
- module spec for broad domain constraints

For edit access, a policy spec is a good fit:

```sdd
Spec: Trip Edit Access
```

### 3. Write the domain spec

```sdd
Spec: Trip Edit Access

Purpose:
  Decide whether a person may edit a trip itinerary.

Owns:
  ./trip-edit-access.policy.js
  ./trip-edit-access.policy.test.js

Accepts:
  person
  trip
  requested edit action

Returns:
  allow or deny

Must:
  Allow the trip owner to edit itinerary items.
  Allow collaborators with edit access to edit itinerary items.
  Deny collaborators with view-only access.

Scenario: view-only collaborator
  Given a collaborator has view-only access
  When the collaborator edits an itinerary item
  Then the edit is denied
```

This spec owns the rule.

### 4. Forbid rule leakage

In UI, API, job, or adapter specs, block duplicated decisions:

```sdd
Must not:
  Decide trip edit access rules.
  Duplicate Trip Edit Access policy logic.
```

For hard layer boundaries:

```sdd
Forbids:
  UI importing policy internals
  adapters importing UI authorization helpers
```

The other layer may call the stable policy contract. It must not reimplement the rule.

### 5. Reference the domain rule from other layers

API spec:

```sdd
Spec: Update Itinerary Item API

Depends on:
  TripEditAccess

Must:
  Reject itinerary updates when TripEditAccess denies the requested edit.

Must not:
  Decide edit access rules directly.
```

UI component spec:

```sdd
Spec: Itinerary Editor

Must:
  Show denied-access feedback returned by itinerary behavior.

Must not:
  Decide whether the person may edit the trip.
```

This keeps behavior consistent across entry points.

### 6. Review tests and changes

Tests should prove the rule at the owner. Other layers can test that they call or respond to the rule, but they should
not duplicate every rule case unless that layer owns user-visible behavior around the result.

During review, ask:

- Did the rule change in the domain owner?
- Did other layers duplicate the rule?
- Are callers using the stable domain contract?
- Did tests move with the rule owner?
- Did any layer bypass `Must not` or `Forbids`?

## Common rule owners

Use a model spec for:

- invariants
- state transitions
- value object validation
- domain calculations tied to an entity

Use a policy spec for:

- authorization
- allow/deny business decisions
- eligibility decisions

Use a service spec for:

- orchestration that coordinates several domain rules
- sequencing domain behavior with adapters or events

Use an adapter spec for:

- external translation
- persistence and retrieval
- failure reporting from external systems

Adapters should not own domain decisions unless the external system is itself the domain authority.

## Common mistakes

- Adding the same validation rule to UI, API, and jobs.
- Treating an API handler as the business rule owner because the request arrives there.
- Letting storage adapters reject input based on product policy.
- Testing the rule only through a UI workflow.
- Referencing a domain spec but still copying its logic.
- Forgetting to add `Must not` rules in layers that keep leaking the rule.

## How to verify the result

Business rules are staying in the domain layer when:

- each rule has one domain owner
- other layers depend on or reference the owner
- UI, API, jobs, and adapters do not duplicate the rule
- `Must not` blocks likely rule leakage
- tests cover the rule at the owner
- behavior changes update the owning spec and its checks first

## Related how-tos

- [How to write a model spec](/how-to/write-specs-by-level/how-to-write-a-model-spec/)
- [How to write a policy spec](/how-to/write-specs-by-level/how-to-write-a-policy-spec/)
- [How to keep UI components focused](/how-to/software-design-practices/how-to-keep-ui-components-focused/)
- [How to prevent cross-layer coupling](/how-to/software-design-practices/how-to-prevent-cross-layer-coupling/)

## Related reference

- [Language reference](/language-reference/)
