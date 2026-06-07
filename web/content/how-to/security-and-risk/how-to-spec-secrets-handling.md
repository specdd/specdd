---
title: "How to spec secrets handling"
seoDescription: "Specify secrets handling with spec-driven development by documenting secret loading, storage, passing, rotation expectations, logging rules, forbidden access, and verification."
excerpt: "Use SpecDD to make secrets handling explicit: where secrets come from, who may access them, how they must not be logged or committed, and what checks prove it."
level: "Intermediate"
howtoID: "1161008"
weight: 90
---

This guide shows you how to spec secrets handling with SpecDD in a spec-driven development workflow.

Secrets include credentials, API keys, signing keys, tokens, certificates, webhook secrets, encryption keys, and
anything else your project treats as secret material. SpecDD helps by making the handling contract explicit near the
code that loads, passes, stores, rotates, or uses those secrets.

## Short answer

Put secrets handling rules in the spec that owns the secret-loading or secret-using behavior. Use `Must` for required
loading, storage, passing, rotation, and failure behavior. Use `Must not` for logging, committing, exposing, or
persisting raw secret values. Use `Forbids` for blocked direct access to secret stores, files, paths, libraries, or
provider SDKs. Use `Done when` for tests, secret-scan checks, log checks, and review evidence.

## When to use this guide

Use this guide when code:

- loads secrets from environment, secret managers, key management systems, or configuration
- signs or verifies tokens, webhooks, sessions, or messages
- calls payment, email, analytics, storage, or identity providers
- rotates or reloads credentials
- writes logs, snapshots, fixtures, or diagnostics near secret values
- adds tests that need fake secret material
- changes CI, deployment, or runtime secret injection

## Steps

### 1. Name the secret and owner

Do not put actual secret values in specs. Name the secret by purpose.

```sdd
Spec: Webhook Signature Verification

Purpose:
  Verify inbound payment webhooks using the configured webhook signing secret.

Owns:
  ./webhook-signature-verification.ts
  ./webhook-signature-verification.test.ts
```

The owner may be a secret-loading adapter, a verifier, a provider adapter, or a runtime configuration module.

### 2. Specify how the secret is loaded

Use `Must` to describe the approved source and behavior.

```sdd
Must:
  Load the webhook signing secret through the project secret provider.
  Reject webhook verification when the signing secret is unavailable.
  Use test-only fake secret values in tests.
```

Avoid specifying actual environment variable values, keys, tokens, or credentials.

### 3. Block direct secret access

Use `Forbids` for blocked paths, stores, libraries, tools, or access patterns.

```sdd
Forbids:
  Reading webhook secrets from checked-in files.
  Direct secret manager access outside ../secrets/*
  Direct provider SDK access outside ../payment-provider/*
```

This prevents agents from adding a shortcut when a local test needs a secret-like value.

### 4. Write logging and commit rules with `Must not`

Use `Must not` for forbidden behavior.

```sdd
Must not:
  Log raw webhook signing secrets.
  Include secrets in test snapshots, fixtures, error messages, or documentation.
  Continue verification after the signing secret is missing.
  Store secret values in application database records.
```

Failure paths matter. Many leaks happen in diagnostics, exception messages, snapshots, or generated files rather than
the main success path.

### 5. Specify passing and storage boundaries

If a secret must be passed to another unit, name the approved boundary.

```sdd
Depends on:
  ../secrets/secret-provider.sdd
  ../payment-provider/payment-provider-port.sdd

Must:
  Pass the webhook signing secret only to the signature verifier.
  Keep raw secret values out of audit event payloads.
```

If a secret must be stored, specify the approved storage behavior. If it must not be stored, say that explicitly.

### 6. Handle rotation, reload, and missing secret behavior

Only write rotation rules your project actually supports or intends to support.

```sdd
Handles:
  missing webhook signing secret
  invalid webhook signature
  rotated webhook signing secret

Must:
  Use the currently configured signing secret for new verification attempts.
  Return verification failure when the configured secret is unavailable.
```

If rotation is owned elsewhere, reference that owner instead of duplicating the rule.

### 7. Add evidence in `Done when`

```sdd
Done when:
  Missing signing secret returns verification failure.
  Invalid signature behavior is covered by a test using fake secret material.
  Logs for verification failure do not include raw secret values.
  Secret scan passes for fixtures, snapshots, and generated files.
  The verifier does not read checked-in secret files.
```

Use project scanning tools when available. Use targeted review when logs or generated artifacts need inspection.

## Example

```sdd
Spec: Email Provider Credentials

Purpose:
  Provide email provider credentials to the email adapter without exposing raw secret values elsewhere.

Owns:
  ./email-provider-credentials.ts
  ./email-provider-credentials.test.ts

Can modify:
  ./email-provider-credentials.ts
  ./email-provider-credentials.test.ts

Depends on:
  ../secrets/secret-provider.sdd

Must:
  Load provider credentials through the project secret provider.
  Return a missing-credentials error when required credentials are unavailable.
  Use fake credential values in tests.

Must not:
  Log raw provider credentials.
  Store provider credentials in application database records.
  Include provider credentials in snapshots, fixtures, or documentation.

Forbids:
  Reading provider credentials from checked-in files.
  Direct secret manager access outside ../secrets/*

Raises:
  EmailCredentialsMissing

Done when:
  Missing credential behavior is covered by a test.
  Test fixtures use fake credential values only.
  Secret scan passes for changed files.
  Failure logs do not include raw credential values.
```

## Agent-specific guardrails

For secret-adjacent work, add direct rules that prevent common agent shortcuts:

```sdd
Must not:
  Create realistic-looking production credentials for examples or tests.
  Copy secret values from logs into fixtures.
  Add debugging output that prints raw secret values.
```

These are useful when agents generate tests, snapshots, seed data, or documentation.

## Common mistakes

- Putting actual secret values in specs, tests, docs, fixtures, or screenshots.
- Testing with realistic production-like credentials instead of fake values.
- Protecting success paths but leaking secrets in error messages.
- Letting feature code access the secret manager directly instead of using the approved secret provider.
- Storing raw secrets in application database records.
- Forgetting generated files, snapshots, and logs in the verification plan.

## How to verify the result

Secrets handling is well specified when:

- secret values are never written into specs
- the owner and approved loading path are clear
- direct access shortcuts are blocked with `Forbids`
- logging, fixtures, snapshots, and error messages have `Must not` rules
- missing, invalid, and rotation-related cases are handled where applicable
- `Done when` names tests, scans, log checks, or review evidence

## Related how-tos

- [How to write security constraints in specs](/how-to/security-and-risk/how-to-write-security-constraints-in-specs/)
- [How to spec authentication boundaries](/how-to/security-and-risk/how-to-spec-authentication-boundaries/)
- [How to prevent agents from adding forbidden dependencies](/how-to/security-and-risk/how-to-prevent-agents-from-adding-forbidden-dependencies/)
- [How to test negative constraints](/how-to/testing-and-quality/how-to-test-negative-constraints/)

## Related reference

- [Language reference](/language-reference/)
