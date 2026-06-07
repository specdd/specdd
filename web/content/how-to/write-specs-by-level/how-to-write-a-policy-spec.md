---
title: "How to write a policy spec"
seoDescription: "Write a SpecDD policy spec for spec-driven development with authorization, permission, eligibility, or business decision rules, inputs, allowed and denied outcomes, and scenarios."
excerpt: "Use policy specs for rules that decide whether something is allowed, denied, eligible, visible, or blocked."
level: "Intermediate"
howtoID: "1051010"
weight: 110
---

This guide shows you how to write a SpecDD policy spec for a spec-driven development workflow.

A policy spec describes authorization, permission, eligibility, visibility, or business decision rules. It is for code
that decides whether something is allowed, denied, visible, required, or blocked.

## Short answer

Use a policy spec for one decision boundary. Define the inputs the policy accepts, the allowed and denied outcomes,
cases it handles, scenarios for important decisions, and side effects it must not perform. Keep enforcement and storage
behavior in the appropriate service, adapter, or API specs unless the policy owns them.

## When to use this guide

Use this guide when:

- permissions are reviewed often
- business decisions are scattered across code
- agents keep mixing policy and side effects
- allowed and denied cases need tests
- a feature needs a stable decision contract

## Steps

### 1. Name one decision

Examples:

```text
trip-access.sdd
trip-access.policy.sdd
itinerary-visibility.policy.sdd
```

Good:

```sdd
Spec: Trip Access Policy
```

Too broad:

```sdd
Spec: Authorization
```

### 2. Define inputs

```sdd
Accepts:
  user role
  trip owner id
  requested action
```

Policy inputs should be enough to explain the decision.

### 3. Write required decision behavior

```sdd
Must:
  Allow trip owners to view their trips.
  Deny non-owners unless they have shared access.
  Deny write actions for read-only shared access.
```

These rules should be precise enough to test.

### 4. Block side effects

```sdd
Must not:
  Persist access changes.
  Send notifications.
  Fetch trip records directly.
```

Policies decide. Services or adapters usually enforce, persist, or fetch.

### 5. Add scenarios

```sdd
Scenario: owner can view trip
  Given the user owns the trip
  When the user requests view access
  Then access is allowed

Scenario: read-only share cannot edit
  Given the user has read-only shared access
  When the user requests edit access
  Then access is denied
```

## Complete example

```sdd
Spec: Trip Access Policy

Purpose:
  Decide whether a user may perform an action on a trip.

Owns:
  ./trip-access.policy.ts
  ./trip-access.policy.test.ts

Accepts:
  user role
  trip owner id
  shared access level
  requested action

Returns:
  allowed or denied decision

Must:
  Allow trip owners to view and edit their trips.
  Allow read-only shared users to view trips.
  Deny write actions for read-only shared access.

Must not:
  Persist access changes.
  Send notifications.
  Fetch trip records directly.

Scenario: read-only share cannot edit
  Given the user has read-only shared access
  When the user requests edit access
  Then access is denied
```

## Common mistakes

- Mixing policy decisions with persistence.
- Writing vague rules such as "use proper authorization."
- Forgetting denied scenarios.
- Putting all application security in one broad policy spec.
- Letting a policy spec own service or adapter files.

## How to verify the result

The policy spec is useful when:

- the decision is narrow
- inputs and outcomes are clear
- allowed and denied cases are covered
- side effects are excluded
- tests can trace to policy scenarios

## Related how-tos

- [How to use the Accepts section](/how-to/use-spec-sections/how-to-use-the-accepts-section/)
- [How to use the Returns section](/how-to/use-spec-sections/how-to-use-the-returns-section/)
- [How to write Scenario blocks](/how-to/use-spec-sections/how-to-write-scenario-blocks/)

## Related reference

- [Language reference](/language-reference/)
