---
title: "How to spec payment or billing safety rules"
seoDescription: "Specify payment and billing safety rules with spec-driven development for authorization, idempotency, double-charge prevention, refunds, rollback behavior, audit logs, and review."
excerpt: "Use SpecDD to make payment and billing constraints explicit before a change can double-charge, bypass authorization, lose audit evidence, or call providers directly."
level: "Advanced"
howtoID: "1161011"
weight: 120
---

This guide shows you how to spec payment or billing safety rules with SpecDD in a spec-driven development workflow.

Payment and billing changes are high risk because small implementation shortcuts can charge the wrong account, double
charge, issue the wrong refund, create inconsistent state, or lose audit evidence. SpecDD gives reviewers a local
contract for the operation before implementation begins.

## Short answer

Put billing safety rules in the spec that owns the billing operation. Use `Must` for authorization, idempotency, state
transition, audit, and failure behavior. Use `Must not` for double-charge, unauthorized movement, success-on-failure,
and sensitive-data exposure rules. Use `Forbids` for direct provider SDK access or blocked billing paths. Use
`Scenario` and `Done when` for success, duplicate, denied, provider-failure, and audit evidence.

## When to use this guide

Use this guide when code:

- captures, charges, refunds, voids, invoices, credits, discounts, or retries payment operations
- changes subscription, plan, entitlement, or billing-state transitions
- handles provider webhooks
- reconciles provider state with local state
- changes idempotency keys or retry behavior
- changes audit logging for money movement
- adds or removes a payment provider dependency

## Steps

### 1. Choose the billing operation owner

Name the operation precisely.

```sdd
Spec: Charge Capture

Purpose:
  Capture an authorized charge exactly once and record the capture result.

Owns:
  ./charge-capture.ts
  ./charge-capture.test.ts
```

Avoid one giant "billing security" spec. Payment authorization, capture, refund, invoice generation, webhook handling,
and subscription changes often deserve separate local specs.

### 2. Specify authorization and state transitions

Use `Must` for required checks and state changes.

```sdd
Must:
  Require billing authorization before capture.
  Capture only charges in authorized state.
  Record captured state only after provider capture succeeds.
  Preserve the original authorized amount during capture.
```

Use `Must not` for forbidden transitions.

```sdd
Must not:
  Capture a charge without billing authorization.
  Mark a charge captured when provider capture fails.
  Change the capture amount from client-supplied input after authorization.
```

State transition wording should match the project's billing model.

### 3. Specify idempotency and duplicate handling

Payment retries are normal. Duplicate money movement is not.

```sdd
Must:
  Use the approved idempotency key for provider capture requests.
  Return the existing capture result for duplicate capture attempts.
  Avoid calling the provider again when a local capture result already exists.

Must not:
  Capture the same authorization more than once.
```

If idempotency is owned by an adapter or provider layer, reference that spec and state the local obligation.

### 4. Block provider shortcuts

Use `Depends on` for approved billing abstractions and `Forbids` for direct provider access.

```sdd
Depends on:
  ../payment-provider/payment-provider-port.sdd
  ../billing-audit/billing-audit.sdd

Forbids:
  Direct use of the payment provider SDK outside ../payment-provider/*
  Direct writes to refund state from charge capture.
  Reading provider credentials outside ../payment-provider/*
```

This prevents agents from calling the provider directly from the operation just because it is convenient.

### 5. Specify failure and reconciliation behavior

Payment operations need explicit failure behavior.

```sdd
Handles:
  provider capture success
  provider capture failure
  duplicate capture request
  local state write failure

Must:
  Record failed capture attempt when provider capture fails.
  Preserve authorized state when provider capture fails before money movement.
  Surface reconciliation-required state when local state cannot confirm provider outcome.
```

Do not promise rollback that the provider or payment method cannot actually perform. Use the project's approved
compensation, reconciliation, retry, or manual-review behavior.

### 6. Add audit and review requirements

```sdd
Must:
  Record billing audit event for accepted, denied, failed, and duplicate capture attempts.

Must not:
  Include full payment card data, provider credentials, or raw provider secrets in audit events.

Done when:
  Billing owner review is complete for changes to capture state transitions.
```

For high-risk billing changes, owner review is evidence, not bureaucracy.

### 7. Add scenarios for success, denied, duplicate, and failure paths

```sdd
Scenario: successful capture
  Given a charge is authorized
  When capture succeeds at the provider
  Then the charge is recorded as captured
  And a capture accepted audit event is recorded

Scenario: duplicate capture request
  Given a charge already has a capture result
  When capture is requested again
  Then the existing capture result is returned
  And the provider is not called again

Scenario: denied capture
  Given billing authorization is denied
  When capture is requested
  Then provider capture is not called
  And a capture denied audit event is recorded
```

Billing specs should cover denied and duplicate paths, not only success.

### 8. Put proof in `Done when`

```sdd
Done when:
  Authorized successful capture is covered by a test.
  Duplicate capture returns existing result without provider call.
  Denied capture does not call the provider.
  Provider failure does not mark the charge captured.
  Billing audit events are checked for accepted, denied, failed, and duplicate attempts.
  Changed code does not import the payment provider SDK directly.
```

Use provider fakes, contract tests, static import checks, or manual review according to the project's existing testing
style.

## Example

```sdd
Spec: Subscription Plan Change

Purpose:
  Change a subscription plan through the approved billing workflow.

Owns:
  ./subscription-plan-change.ts
  ./subscription-plan-change.test.ts

Depends on:
  ../billing-authorization/billing-authorization.sdd
  ../payment-provider/payment-provider-port.sdd
  ../billing-audit/billing-audit.sdd

Must:
  Require billing authorization before changing the subscription plan.
  Apply the approved proration policy for plan changes.
  Record plan change audit event after the billing state is updated.
  Return the existing result for duplicate plan change requests.

Must not:
  Change entitlements before the billing state update succeeds.
  Apply client-supplied prices directly.
  Mark the plan changed when provider update fails.
  Include provider credentials or full payment data in audit events.

Forbids:
  Direct use of the payment provider SDK outside ../payment-provider/*
  Direct entitlement writes outside ../entitlements/*

Done when:
  Authorized plan change is covered by a test.
  Duplicate plan change returns existing result.
  Provider failure does not change entitlements.
  Audit event content is checked.
  Provider SDK is not imported directly.
```

## Common mistakes

- Testing payment success while ignoring duplicate, denied, and provider-failure cases.
- Marking local billing state successful before provider success is known.
- Calling provider SDKs directly from feature code instead of the approved adapter.
- Trusting client-supplied amounts, prices, plan ids, or account ids without the approved validation path.
- Promising rollback behavior the provider flow cannot actually guarantee.
- Emitting success audit events for denied or failed money movement.
- Treating billing state transition changes as low risk because the diff is small.

## How to verify the result

Payment or billing safety is well specified when:

- the billing operation owner is clear
- authorization, idempotency, state transitions, and duplicate handling are explicit
- forbidden provider shortcuts are in `Forbids`
- failure and reconciliation behavior match the project's actual capabilities
- audit logging covers accepted, denied, failed, and duplicate attempts
- scenarios cover success, duplicate, denied, and failure paths
- `Done when` names tests, static checks, and required owner review

## Related how-tos

- [How to spec audit logging](/how-to/security-and-risk/how-to-spec-audit-logging/)
- [How to prevent agents from adding forbidden dependencies](/how-to/security-and-risk/how-to-prevent-agents-from-adding-forbidden-dependencies/)
- [How to review security-sensitive changes with SpecDD](/how-to/security-and-risk/how-to-review-security-sensitive-changes-with-specdd/)
- [How to test negative constraints](/how-to/testing-and-quality/how-to-test-negative-constraints/)

## Related reference

- [Language reference](/language-reference/)
