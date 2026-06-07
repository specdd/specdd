---
title: "How to spec authentication boundaries"
seoDescription: "Specify authentication boundaries with spec-driven development by naming the identity owner, trusted inputs, failure behavior, bypass rules, dependencies, scenarios, and checks."
excerpt: "Use SpecDD to make authentication enforcement points explicit so protected code does not trust the wrong caller, token, or UI path."
level: "Intermediate"
howtoID: "1161003"
weight: 40
---

This guide shows you how to spec authentication boundaries with SpecDD in a spec-driven development workflow.

Authentication answers "who is this actor?" Authorization answers "what may this actor do?" Keep those concerns
separate when your architecture separates them, but make the handoff explicit so protected code cannot bypass identity
validation.

## Short answer

Create or update the spec that owns authentication validation. Use `Accepts`, `Returns`, `Raises`, and `Handles` to
describe the identity contract. Use `Must` for required validation behavior, `Must not` for bypasses and trust
boundaries, `Forbids` for blocked direct access, and `Done when` for allow, deny, and bypass evidence.

## When to use this guide

Use this guide when:

- adding or changing sign-in, session, token, API key, or service-account behavior
- connecting protected routes to an authentication module
- preventing callers from trusting browser-provided identity
- reviewing a change that bypasses existing middleware or guards
- splitting authentication from authorization policy code
- adding tests for unauthenticated or expired-session behavior

## Steps

### 1. Choose the authentication owner

Find the spec that owns identity validation.

```sdd
Spec: Session Authentication

Purpose:
  Validate session tokens and return trusted account identity for protected actions.

Owns:
  ./session-auth.ts
  ./session-auth.test.ts
```

If the current work is in an API route, the route may depend on the authentication owner, but it usually should not own
token parsing itself.

### 2. Define trusted identity inputs and outputs

Use contract sections to make the authentication boundary concrete.

```sdd
Accepts:
  session cookie
  request metadata

Returns:
  authenticated account context
  unauthenticated result

Raises:
  SessionExpired
  SessionInvalid

Handles:
  missing session cookie
  expired token
  unknown signing key
  disabled account
```

These entries tell contributors what the authentication unit consumes and what callers can rely on.

### 3. Write required authentication behavior

Use `Must` for positive requirements.

```sdd
Must:
  Reject missing, expired, malformed, or unverifiable session tokens.
  Load account identity from the trusted session subject.
  Return unauthenticated when the account is disabled.
  Preserve a single authentication result shape for protected callers.
```

Avoid vague rules such as "be secure." Name the exact behavior.

### 4. Write trust boundaries with `Must not`

Use `Must not` for bypass and trust mistakes.

```sdd
Must not:
  Trust account identifiers supplied in the request body for protected actions.
  Continue protected action handling after authentication returns unauthenticated.
  Treat hidden UI controls as authentication.
  Log raw session tokens.
```

These rules protect the boundary from plausible implementation shortcuts.

### 5. Block direct access with `Forbids`

Use `Forbids` when the risk is an import, path, dependency, library, tool, or access pattern.

```sdd
Forbids:
  Direct session token parsing outside ../auth/*
  Direct reads of signing keys outside ../key-management/*
  Protected routes importing token libraries directly.
```

This makes it clear that callers should use the authentication contract instead of reimplementing identity checks.

### 6. Specify protected caller behavior

A protected route or service should state its dependency on authentication.

```sdd
Spec: Account Settings API

Purpose:
  Serve account settings requests for authenticated accounts.

Depends on:
  ../auth/session-auth.sdd

Must:
  Require authenticated account context before reading or changing account settings.
  Return unauthenticated response when session authentication fails.

Must not:
  Read account id from the request body.
  Continue account settings changes after unauthenticated result.
```

This keeps authentication validation owned in one place while making caller obligations visible.

### 7. Add scenarios for denied and bypass cases

```sdd
Scenario: expired session
  Given the session token is expired
  When account settings are requested
  Then the request is rejected as unauthenticated
  And account settings are not returned

Scenario: client-supplied account id
  Given a valid session belongs to account A
  When the request body names account B
  Then account A remains the authenticated account
  And account B settings are not returned
```

Authentication specs should cover more than the happy path. Missing, malformed, expired, disabled, and mismatched
identity cases are often the important cases.

### 8. Put evidence in `Done when`

```sdd
Done when:
  Missing-session and expired-session cases are covered by tests.
  Protected account settings changes stop when authentication fails.
  Client-supplied account ids are ignored for authenticated identity.
  Raw session tokens are absent from logs.
```

These checks make the boundary reviewable.

## Common mistakes

- Mixing authentication and authorization rules without naming the handoff.
- Trusting account ids, roles, or tenant ids supplied by the client after authentication.
- Testing valid sessions but not missing, expired, malformed, or disabled-account cases.
- Hiding protected controls in the UI while leaving service or API access unprotected.
- Letting each route parse tokens directly instead of depending on the authentication owner.
- Logging raw tokens in failure diagnostics.

## How to verify the result

The authentication boundary is well specified when:

- one spec owns identity validation
- protected callers depend on that owner instead of reimplementing validation
- trusted inputs, outputs, errors, and handled cases are named
- `Must not` rules block trust and bypass mistakes
- `Forbids` blocks direct token or key access where appropriate
- scenarios and tests cover denied and bypass behavior

## Related how-tos

- [How to test authorization rules from specs](/how-to/testing-and-quality/how-to-test-authorization-rules-from-specs/)
- [How to write security constraints in specs](/how-to/security-and-risk/how-to-write-security-constraints-in-specs/)
- [How to spec secrets handling](/how-to/security-and-risk/how-to-spec-secrets-handling/)
- [How to use the Handles section](/how-to/use-spec-sections/how-to-use-the-handles-section/)

## Related reference

- [Language reference](/language-reference/)
