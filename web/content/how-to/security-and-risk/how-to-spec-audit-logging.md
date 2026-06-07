---
title: "How to spec audit logging"
seoDescription: "Specify audit logging with spec-driven development by naming security-sensitive events, required fields, forbidden sensitive data, failure handling, scenarios, and verification evidence."
excerpt: "Use SpecDD to make audit logging requirements explicit for auth, payments, admin actions, permission changes, and other sensitive operations."
level: "Intermediate"
howtoID: "1161009"
weight: 100
---

This guide shows you how to spec audit logging with SpecDD in a spec-driven development workflow.

Audit logs are only useful when the right events are recorded, at the right boundary, with enough context to review what
happened, and without leaking sensitive data. SpecDD lets you keep those requirements close to the code that performs
the sensitive action.

## Short answer

Use `Must` to require audit events for sensitive behavior, `Exposes` when event names are part of the local contract,
`Must not` to forbid secrets or private payloads in audit data, `Handles` for failure cases, and `Done when` for event
content checks. Put event requirements in the spec that owns the action, not only in a central logging document.

## When to use this guide

Use this guide when code performs or denies:

- sign-in, sign-out, password reset, token rotation, or MFA changes
- permission, role, membership, or ownership changes
- admin actions
- payment capture, refunds, invoice changes, or subscription changes
- data export, deletion, retention, or privacy-sensitive access
- security configuration changes
- rate-limit overrides or abuse-prevention decisions

## Steps

### 1. Choose the audit event owner

Put audit requirements in the spec that owns the sensitive action.

```sdd
Spec: Account Role Change

Purpose:
  Change account roles through an authorized administrative action.

Owns:
  ./account-role-change.ts
  ./account-role-change.test.ts
```

A central audit adapter spec can own delivery mechanics. The action spec should still say which action requires an audit
event.

### 2. Name the auditable events

Use `Must` for required event behavior. Use `Exposes` when event names are part of the local contract.

```sdd
Exposes:
  AccountRoleChangeAccepted audit event
  AccountRoleChangeDenied audit event

Must:
  Record AccountRoleChangeAccepted after an authorized role change is committed.
  Record AccountRoleChangeDenied when a role change request is rejected.
```

Use project naming conventions for event names. If event naming is a project-wide convention, document that convention
in `.specdd/bootstrap.project.md`.

### 3. Define required fields

Write the fields needed for review and investigation.

```sdd
Must:
  Include actor account id, target account id, previous role, new role, result, and request id in role-change audit events.
  Include timestamp through the project audit sink.
```

Typical fields:

- event name
- actor id
- subject or target id
- action
- result
- reason or denial code
- request or correlation id
- timestamp from the audit sink or event system
- relevant before and after values when approved by policy

Do not include fields just because they are available. Include what the event needs and what policy allows.

### 4. Forbid sensitive payload data

Use `Must not` for sensitive fields that must not appear in audit events.

```sdd
Must not:
  Include raw passwords, session tokens, reset tokens, API keys, or secret values in audit events.
  Include full payment card data in audit events.
  Include raw export contents in audit events.
```

Audit logs often live longer and are read by more people than application logs. Keep payloads intentionally small.

### 5. Specify failure and ordering behavior

Decide what happens if audit delivery fails.

```sdd
Handles:
  audit sink unavailable
  role change denied
  role change commit failure

Must:
  Record accepted audit event only after the role change is committed.
  Record denied audit event without changing the target role.
```

Do not invent failure semantics in the spec if the audit platform already defines them. Reference the audit adapter or
runbook when delivery, buffering, retry, or fail-closed behavior is owned elsewhere.

### 6. Add scenarios

```sdd
Scenario: authorized role change
  Given an administrator may change account roles
  When the administrator changes a member role
  Then the role is changed
  And AccountRoleChangeAccepted is recorded

Scenario: denied role change
  Given a viewer may not change account roles
  When the viewer requests a role change
  Then the role change is denied
  And AccountRoleChangeDenied is recorded
```

Denied scenarios are especially important because they prove that failed attempts remain visible.

### 7. Put event checks in `Done when`

```sdd
Done when:
  Authorized role change records AccountRoleChangeAccepted with actor id, target id, previous role, new role, result, and request id.
  Denied role change records AccountRoleChangeDenied without changing the target role.
  Role-change audit events do not include session tokens or secret values.
  Existing audit adapter checks pass.
```

Reviewers should be able to inspect event content, not only the fact that a logger was called.

## Example

```sdd
Spec: Payment Refund

Purpose:
  Refund captured payments through the approved billing workflow.

Owns:
  ./payment-refund.ts
  ./payment-refund.test.ts

Depends on:
  ../billing-audit/billing-audit.sdd
  ../payment-provider/payment-provider-port.sdd

Exposes:
  PaymentRefundAccepted audit event
  PaymentRefundDenied audit event
  PaymentRefundFailed audit event

Must:
  Require refund authorization before calling the payment provider.
  Record PaymentRefundAccepted after the refund request is accepted.
  Record PaymentRefundDenied when authorization denies the refund.
  Record PaymentRefundFailed when provider refund fails after authorization.

Must not:
  Record PaymentRefundAccepted before authorization succeeds.
  Include raw payment provider credentials or full payment card data in audit events.
  Emit success audit events for denied refunds.

Done when:
  Authorized refund records PaymentRefundAccepted.
  Denied refund records PaymentRefundDenied without provider call.
  Provider failure records PaymentRefundFailed without raw provider credentials.
```

## Common mistakes

- Saying "audit this action" without naming event timing or required fields.
- Logging success events before the sensitive state change actually commits.
- Emitting no event for denied or failed attempts.
- Including raw tokens, secrets, payment data, or private payloads in audit events.
- Testing that a logger was called but not checking the event content.
- Putting every audit rule only in a central logging spec and leaving action specs silent.

## How to verify the result

Audit logging is well specified when:

- sensitive actions and denied attempts have named audit requirements
- required fields are explicit and policy-approved
- forbidden sensitive data is listed in `Must not`
- event timing and failure behavior are clear
- scenarios cover accepted and denied behavior
- `Done when` checks event content and forbidden payloads

## Related how-tos

- [How to spec data privacy requirements](/how-to/security-and-risk/how-to-spec-data-privacy-requirements/)
- [How to spec payment or billing safety rules](/how-to/security-and-risk/how-to-spec-payment-or-billing-safety-rules/)
- [How to test negative constraints](/how-to/testing-and-quality/how-to-test-negative-constraints/)
- [How to use the Exposes section](/how-to/use-spec-sections/how-to-use-the-exposes-section/)

## Related reference

- [Language reference](/language-reference/)
