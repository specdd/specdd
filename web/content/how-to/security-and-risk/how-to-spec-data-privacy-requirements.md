---
title: "How to spec data privacy requirements"
seoDescription: "Specify data privacy requirements with spec-driven development by documenting protected data, access rules, retention, redaction, deletion, logging limits, scenarios, and verification."
excerpt: "Use local SpecDD specs to make privacy-sensitive data handling explicit near the code that reads, stores, exports, logs, or deletes that data."
level: "Intermediate"
howtoID: "1161004"
weight: 50
---

This guide shows you how to spec data privacy requirements with SpecDD in a spec-driven development workflow.

Privacy requirements are risky when they live only in tickets, legal notes, or team memory. SpecDD lets you write the
operational parts near the code that reads, stores, exports, logs, redacts, or deletes sensitive data.

This guide is about expressing project requirements in specs. It is not legal advice. Use your organization's data
classification, retention, compliance, and review rules as the source for the actual privacy policy.

## Short answer

Define the protected data, put the rule in the spec that owns the data handling behavior, use `Must` for required
privacy behavior, `Must not` for forbidden exposure or retention, `Forbids` for blocked access paths, and `Done when`
for evidence such as tests, redaction checks, export checks, or reviewer confirmation.

## When to use this guide

Use this guide when code:

- stores personally identifiable information or sensitive business data
- exports, imports, syncs, or deletes user data
- logs request, account, payment, health, location, or message data
- displays private data in UI or admin tools
- sends data to analytics, support, billing, or third-party services
- implements retention, redaction, anonymization, or deletion behavior

## Steps

### 1. Define the protected data in project terms

Use names your team already uses.

Examples:

- account email
- billing address
- payment customer id
- health note
- precise location
- support transcript
- access token
- internal risk score

Avoid inventing a legal taxonomy inside one spec unless your organization already uses it. If the project has a shared
data classification document, reference its location from `.specdd/bootstrap.project.md` and use local specs to apply it
to actual code.

### 2. Choose the privacy rule owner

Put privacy behavior in the spec that owns the data operation.

```sdd
Spec: Account Data Export

Purpose:
  Produce an authenticated account data export with approved account-owned data.

Owns:
  ./account-data-export.ts
  ./account-data-export.test.ts
```

If the rule applies to a whole area, put it in the parent area spec so child specs inherit it. Do not put local export
or deletion behavior only in a bootstrap file.

### 3. Write allowed access and handling requirements

Use `Must` for required privacy behavior.

```sdd
Must:
  Require authenticated account context before generating an export.
  Include only data owned by the authenticated account.
  Redact internal risk scores from account-facing exports.
  Record an audit event when an export is requested.
```

Make each requirement observable. "Protect data" is too vague; "Include only data owned by the authenticated account" is
reviewable.

### 4. Write forbidden privacy behavior

Use `Must not` for forbidden exposure, retention, or processing.

```sdd
Must not:
  Include another account's data in the export.
  Include internal risk scores in account-facing exports.
  Log raw export contents.
  Continue export generation after authorization is denied.
```

These rules are valuable because agents and humans can accidentally produce correct-looking output with the wrong data
boundary.

### 5. Block unsafe access paths

Use `Forbids` when a privacy rule is about a path, dependency, module, tool, library, or access pattern.

```sdd
Forbids:
  Direct database reads outside ../account-data-query/*
  Direct object storage access outside ../export-storage/*
  Sending account exports to analytics or telemetry sinks.
```

Pair this with `Depends on` for the approved path.

```sdd
Depends on:
  ../account-data-query/account-data-query.sdd
  ../export-storage/export-storage.sdd
```

### 6. Specify retention, deletion, and redaction behavior

Privacy requirements often involve time or lifecycle behavior. Write the project-approved rule precisely.

```sdd
Must:
  Delete expired export files after the configured retention window.
  Redact account email before writing export failure diagnostics.

Handles:
  export file older than retention window
  deletion failure
  missing export object
```

Do not invent retention windows in the spec if the policy owner has not defined them. Use a named configuration or
project policy when that is the actual source.

### 7. Add scenarios for boundary cases

```sdd
Scenario: account-owned export
  Given account A requests an export
  When the export is generated
  Then the export contains account A data
  And the export does not contain account B data

Scenario: denied export
  Given account A is not authorized to export account B data
  When account A requests account B export
  Then the request is denied
  And no export file is created
```

Denied and mixed-ownership cases usually deserve explicit scenarios.

### 8. Put evidence in `Done when`

```sdd
Done when:
  Account-owned export behavior is covered by a test.
  Cross-account export attempts are denied without creating a file.
  Export logs do not include raw export contents.
  Expired export deletion behavior is covered by a scheduled-job check.
  Review confirms internal risk scores are excluded from account-facing exports.
```

Use tests for observable behavior. Use review evidence when the check is data-map or policy-heavy.

## Example

```sdd
Spec: Support Transcript Redaction

Purpose:
  Redact sensitive account data before support transcripts are sent to external support tooling.

Owns:
  ./support-transcript-redaction.ts
  ./support-transcript-redaction.test.ts

Can modify:
  ./support-transcript-redaction.ts
  ./support-transcript-redaction.test.ts

Must:
  Redact account email, access tokens, and payment customer ids before export.
  Preserve non-sensitive conversation text needed for support review.
  Record redaction failure as a rejected export.

Must not:
  Send unredacted transcript text to external support tooling.
  Log raw transcript content after redaction failure.
  Treat UI hiding as the redaction control.

Forbids:
  Direct external support API calls outside ../support-export-adapter/*

Scenario: token in transcript
  Given a support transcript contains an access token
  When the transcript is prepared for external support export
  Then the exported transcript contains a redaction marker
  And the access token value is absent

Done when:
  Email, token, and payment customer id redaction cases are covered by tests.
  Redaction failure prevents external export.
  Logs for redaction failure do not contain raw transcript content.
```

## Common mistakes

- Writing "handle PII carefully" without naming the data and operation.
- Putting data privacy behavior only in a ticket or bootstrap file.
- Testing export success without testing cross-account or denied export attempts.
- Logging private data in failure paths while protecting success paths.
- Letting analytics, support, or audit integrations receive more data than the spec allows.
- Inventing retention or compliance rules without the policy owner.

## How to verify the result

Privacy requirements are well specified when:

- protected data and operations are named
- the owning spec is local to the data handling code
- allowed access, forbidden exposure, and blocked access paths are explicit
- retention and deletion behavior points to the approved policy or configuration
- scenarios cover cross-account, denied, redaction, or deletion boundaries
- `Done when` names test, static-check, or review evidence

## Related how-tos

- [How to spec audit logging](/how-to/security-and-risk/how-to-spec-audit-logging/)
- [How to spec secrets handling](/how-to/security-and-risk/how-to-spec-secrets-handling/)
- [How to test negative constraints](/how-to/testing-and-quality/how-to-test-negative-constraints/)
- [How to keep specs in sync with code changes](/how-to/spec-driven-workflows/how-to-keep-specs-in-sync-with-code-changes/)

## Related reference

- [Language reference](/language-reference/)
