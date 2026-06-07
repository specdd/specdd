---
title: "How to spec rate limiting and abuse prevention"
seoDescription: "Specify rate limiting and abuse prevention with spec-driven development by defining enforcement points, limit keys, responses, bypass rules, observability, scenarios, and tests."
excerpt: "Use SpecDD to make rate limits and abuse-prevention behavior explicit before implementation spreads across routes, UI, workers, and middleware."
level: "Intermediate"
howtoID: "1161010"
weight: 110
---

This guide shows you how to spec rate limiting and abuse prevention with SpecDD in a spec-driven development workflow.

Rate limiting is easy to implement in the wrong place. A UI-only throttle, a route-only guard, or an unreviewed bypass
can look correct while leaving another path open. A local spec makes the enforcement point, limit key, response, bypass
rules, and checks explicit.

## Short answer

Put the rate-limit rule in the spec that owns enforcement. Use `Must` for limit behavior, `Must not` for bypasses and
unsafe responses, `Forbids` for blocked direct access or unapproved overrides, `Handles` for limit states, and
`Done when` for tests, observability, and review evidence.

## When to use this guide

Use this guide when code:

- limits sign-in, password reset, verification, invitations, exports, or payment attempts
- protects an expensive API, search, report, or generation endpoint
- blocks abuse from anonymous, authenticated, tenant, account, or IP-based actors
- adds a bypass, allowlist, internal override, or admin tool
- changes lockout, throttling, retry, or abuse-detection behavior
- records rate-limit metrics or audit events

## Steps

### 1. Choose the enforcement owner

Name the component that decides whether the action may continue.

```sdd
Spec: Password Reset Rate Limit

Purpose:
  Limit password reset requests to reduce account enumeration and email abuse.

Owns:
  ./password-reset-rate-limit.ts
  ./password-reset-rate-limit.test.ts
```

Callers should depend on this owner instead of each route inventing its own logic.

### 2. Define the protected action and limit key

Use project-approved terms and configuration names. Do not invent numbers if the product or security owner has not
chosen them.

```sdd
Accepts:
  password reset request metadata
  normalized email address
  requester network key

Returns:
  allow
  limited

Must:
  Apply the configured reset-request limit per normalized email address.
  Apply the configured network limit per requester network key.
```

The limit key matters. A limit keyed only by account id may not protect anonymous flows. A limit keyed only by IP may
not fit all products. Spec the approved rule.

### 3. Specify allowed and limited behavior

```sdd
Must:
  Allow reset requests that are under the configured limits.
  Return the approved limited response when a configured limit is exceeded.
  Record limit decisions for operational metrics.

Must not:
  Reveal whether the email address belongs to an account through the limited response.
  Send reset email after the rate limit returns limited.
```

Make sure limited behavior stops protected side effects.

### 4. Write bypass and override rules

Bypasses are high-risk. If they are allowed, specify them clearly.

```sdd
Must:
  Allow only the approved internal maintenance caller to bypass the reset-request limit.

Must not:
  Allow client-supplied headers to disable rate limiting.
  Treat hidden UI controls as abuse prevention.
```

Use `Forbids` for blocked access paths:

```sdd
Forbids:
  Direct writes to rate-limit counters outside ../rate-limit-store/*
  Unreviewed allowlist files.
```

### 5. Specify observability and audit behavior

Rate limits need enough visibility to debug and operate safely.

```sdd
Must:
  Emit rate-limit metrics for allow and limited decisions.
  Record an audit event when an administrator changes a rate-limit override.

Must not:
  Include raw reset tokens, passwords, or secret values in rate-limit logs.
```

Use audit logging for security-sensitive override or administrative behavior. Use metrics for operational visibility.

### 6. Add scenarios for threshold and bypass cases

```sdd
Scenario: reset limit exceeded
  Given the normalized email address has reached the configured reset-request limit
  When another password reset request is submitted
  Then the request returns the approved limited response
  And no reset email is sent

Scenario: client attempts bypass
  Given a client sends a header that claims rate limiting is disabled
  When the password reset request is submitted
  Then the normal rate limit still applies
```

Use named configured limits instead of hard-coded numbers unless the number is part of the approved product contract.

### 7. Put checks in `Done when`

```sdd
Done when:
  Under-limit reset request is allowed.
  Exceeded email limit returns the approved limited response without sending email.
  Client-supplied bypass headers do not disable rate limiting.
  Allow and limited decisions emit operational metrics without secrets.
```

Tests should cover allow, limited, side-effect suppression, and bypass cases.

## Example

```sdd
Spec: Account Export Rate Limit

Purpose:
  Limit account export requests to protect private data exports and backend capacity.

Owns:
  ./account-export-rate-limit.ts
  ./account-export-rate-limit.test.ts

Accepts:
  authenticated account id
  export request metadata

Returns:
  allow
  limited

Must:
  Apply the configured export limit per authenticated account.
  Return the approved limited response when the export limit is exceeded.
  Emit operational metrics for allow and limited decisions.

Must not:
  Start a new export job when the limit returns limited.
  Allow client-supplied headers or query parameters to bypass the limit.
  Log raw export contents.

Forbids:
  Direct writes to export limit counters outside ../rate-limit-store/*

Done when:
  Under-limit account export request is allowed.
  Exceeded export limit prevents export job creation.
  Client-supplied bypass attempts do not disable the limit.
  Metrics do not include raw export contents.
```

## Common mistakes

- Specifying a UI throttle while API, worker, or service paths remain unlimited.
- Hard-coding limits in specs before the product or security owner has approved them.
- Testing the limited response but not whether the protected side effect stopped.
- Allowing bypass through client-supplied headers, query parameters, or hidden UI state.
- Logging sensitive data in rate-limit diagnostics.
- Adding allowlists without owner review or audit behavior.

## How to verify the result

Rate limiting is well specified when:

- the enforcement owner is clear
- protected actions and limit keys are explicit
- allowed and limited outcomes are both specified
- bypass and override rules are narrow
- forbidden access paths are blocked with `Forbids`
- scenarios cover threshold, side effect, and bypass behavior
- `Done when` names tests, metrics, audit, or review evidence

## Related how-tos

- [How to spec authentication boundaries](/how-to/security-and-risk/how-to-spec-authentication-boundaries/)
- [How to spec audit logging](/how-to/security-and-risk/how-to-spec-audit-logging/)
- [How to test negative constraints](/how-to/testing-and-quality/how-to-test-negative-constraints/)
- [How to write Scenario blocks](/how-to/use-spec-sections/how-to-write-scenario-blocks/)

## Related reference

- [Language reference](/language-reference/)
