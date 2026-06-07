---
title: "How to test authorization rules from specs"
seoDescription: "Test authorization rules from SpecDD specs in a spec-driven development workflow by deriving checks for roles, permissions, allowed and denied actions, bypass attempts, and boundary cases."
excerpt: "Use SpecDD policy and API specs to turn authorization rules into focused tests for allow, deny, bypass, and edge-case behavior."
level: "Intermediate"
howtoID: "1131010"
weight: 110
---

This guide shows you how to test authorization rules from SpecDD specs in a spec-driven development workflow.

Authorization rules decide who may do what. They are high-value test targets because a single missing denial can expose
data, allow destructive actions, or let callers bypass intended workflow. SpecDD helps by giving authorization rules an
explicit owner, usually a policy spec, API spec, service spec, or module-level constraint.

Good authorization tests cover both allow and deny behavior. They also check bypass attempts and boundary conditions,
not only the happy path.

## Short answer

Find the spec that owns the authorization rule. Derive tests from `Accepts`, `Returns`, `Raises`, `Must`, `Must not`,
`Scenario`, and `Done when`. Cover allowed roles, denied roles, missing permissions, resource ownership boundaries,
bypass attempts, and caller behavior. Keep the rule tests at the policy or owner level, and test API or UI layers for
how they use the result.

## When to use this guide

Use this guide when:

- a policy spec defines allow or deny behavior
- an API route must enforce permissions
- UI hides actions based on access
- jobs or event handlers must not bypass authorization
- a bug involved unauthorized access
- roles, teams, owners, or collaborators affect behavior
- a spec has `Must not` rules about bypassing access checks

## The design idea

Authorization should usually have one rule owner. Other layers can ask the owner for a decision and respond to the
result. If UI, API, jobs, and services each reimplement the rule, they will drift.

Tests should follow that ownership. Test detailed allow and deny cases at the owner. Test callers for integration:
whether they call the owner, block denied actions, return the right error, or show the right message.

## Steps

### 1. Find the authorization owner

Policy spec example:

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
```

This spec owns the rule. Tests for the matrix of roles and permissions should live near this owner when possible.

### 2. List actors, resources, and actions

From the spec, identify:

- actors: owner, editor, viewer, anonymous user, administrator, service account
- resource states: active trip, archived trip, deleted trip, shared trip
- actions: view, edit, invite, export, delete
- permissions: edit access, view-only access, ownership, elevated access
- outcomes: allow, deny, error, audit event, no side effect

Do not invent roles that the spec does not define. If a role matters but is missing, update the spec first.

### 3. Test allowed outcomes

From:

```sdd
Must:
  Allow the trip owner to edit itinerary items.
  Allow collaborators with edit access to edit itinerary items.
```

Derived checks:

```text
Trip owner is allowed to edit itinerary items.
Collaborator with edit access is allowed to edit itinerary items.
```

Allowed tests prove legitimate access still works.

### 4. Test denied outcomes

From:

```sdd
Must:
  Deny collaborators with view-only access.

Must not:
  Allow anonymous users to edit itinerary items.
```

Derived checks:

```text
View-only collaborator is denied edit access.
Anonymous user is denied edit access.
```

Denied tests are as important as allowed tests. A policy that only tests allow cases is not well covered.

### 5. Test bypass attempts

Bypass attempts are cases where callers try to avoid the intended rule:

```sdd
Must not:
  Update itinerary items without TripEditAccess approval.
  Treat hidden UI controls as authorization.
```

Derived checks:

```text
Direct API request without edit access is denied.
Service call does not update itinerary when TripEditAccess denies.
Hidden edit button is not the only authorization enforcement.
```

Bypass checks are often better at the API or service boundary than in the UI.

### 6. Test boundary conditions

Authorization often fails at boundaries:

- owner leaves a shared trip
- collaborator permission changes during edit
- archived trip is read-only
- deleted trip id is requested
- invitation is expired
- user belongs to two teams
- administrator has audit-only access
- resource ownership changes

Write scenarios for the boundary cases that matter:

```sdd
Scenario: view-only collaborator
  Given a collaborator has view-only access
  When the collaborator changes an itinerary item
  Then the edit is denied
  And the itinerary remains unchanged
```

### 7. Check caller behavior

API spec:

```sdd
Depends on:
  TripEditAccess

Must:
  Return 403 when TripEditAccess denies the requested edit.

Must not:
  Decide edit access rules directly.
```

API tests should check:

- denied policy result returns 403
- no itinerary update happens after denial
- response does not expose data the denied caller should not see

UI tests should check:

- denied feedback is shown
- privileged controls are not offered when the user lacks access
- UI does not replace server-side or service-side authorization

### 8. Include side effects and audit behavior when specified

If the spec says:

```sdd
Raises:
  TripEditDenied audit event when an edit is denied

Must not:
  Emit TripEdited after a denied edit
```

derive checks:

```text
Denied edit records TripEditDenied.
Denied edit does not emit TripEdited.
```

Side effects are often where authorization regressions hide.

## Example authorization spec and test map

```sdd
Spec: Trip Edit Access

Purpose:
  Decide whether a person may edit a trip itinerary.

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
  Deny edits to archived trips.

Must not:
  Allow anonymous users to edit itinerary items.
  Treat hidden UI controls as authorization.

Scenario: archived trip
  Given a trip is archived
  When the trip owner edits an itinerary item
  Then the edit is denied
  And the itinerary remains unchanged

Done when:
  Owner allow behavior is covered by a policy check.
  View-only collaborator denial is covered by a policy check.
  Archived trip denial is covered by a policy check.
  API denied-edit behavior returns 403 without updating the itinerary.
```

Test map:

```text
Policy tests:
  owner allowed
  editor collaborator allowed
  view-only collaborator denied
  anonymous user denied
  archived trip denied

API tests:
  denied policy result returns 403
  denied edit does not update itinerary

UI tests:
  denied feedback is displayed
  edit control is not shown for view-only collaborator
```

This map keeps rule ownership and caller behavior separate.

## Common mistakes

- Testing only allowed roles.
- Hiding authorization only in UI controls.
- Duplicating policy rules in API, UI, jobs, and services.
- Forgetting resource-state boundaries such as archived or deleted records.
- Testing denial responses but not forbidden side effects.
- Adding roles in tests that are not defined by the spec.
- Letting caller tests become the only proof of the policy rule.

## How to verify the result

Authorization testing is strong when:

- the rule owner has focused allow and deny tests
- bypass attempts are tested at service or API boundaries
- important resource-state boundaries are covered
- callers test their response to allow or deny results
- forbidden side effects are checked when specified
- tests and specs use the same roles, permissions, and outcomes
- authorization changes update the owning spec and tests together

## Related how-tos

- [How to write a policy spec](/how-to/write-specs-by-level/how-to-write-a-policy-spec/)
- [How to keep business rules in the domain layer](/how-to/software-design-practices/how-to-keep-business-rules-in-the-domain-layer/)
- [How to test negative constraints](/how-to/testing-and-quality/how-to-test-negative-constraints/)
- [How to write Scenario blocks](/how-to/use-spec-sections/how-to-write-scenario-blocks/)

## Related reference

- [Language reference](/language-reference/)
