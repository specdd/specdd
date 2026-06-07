---
title: "How to prevent agents from weakening security checks"
seoDescription: "Prevent agents from weakening security checks with spec-driven development guardrails for validation, authorization, secrets, dependency boundaries, CI gates, and review evidence."
excerpt: "Use SpecDD to make security checks hard to remove accidentally: name the protected check, forbid bypasses, require evidence, and review weakenings as governance changes."
level: "Advanced"
howtoID: "1161012"
weight: 130
---

This guide shows you how to prevent agents from weakening security checks with SpecDD in a spec-driven development workflow.

Agents sometimes make tests pass by removing validation, loosening permission checks, skipping rate limits, disabling
lint rules, or adding fallback paths that bypass the intended security control. SpecDD helps because the control can be
named directly in the local spec before the implementation changes.

## Short answer

Put the protected security check in the owning `.sdd` spec. Use `Must` to require it, `Must not` to forbid bypassing or
weakening it, `Forbids` to block dependency or path shortcuts, and `Done when` to require tests, static checks, or review
evidence. Treat changes that weaken `Must not`, `Forbids`, tests, lint rules, or CI gates as security-sensitive review
items.

## When to use this guide

Use this guide when an agent or contributor might:

- remove validation to make a failing test pass
- bypass authentication or authorization in a route, job, or service
- relax role, tenant, owner, or account checks
- skip rate limiting or abuse prevention
- expose private data in logs, exports, snapshots, or fixtures
- print secrets for debugging
- add direct provider, database, or secret-store access
- disable security tests, lint rules, import checks, or CI gates

## Steps

### 1. Name the check that must not weaken

Security checks are easier to protect when they have names.

Examples:

- session authentication before account settings changes
- TripEditAccess before itinerary edits
- password reset account-enumeration protection
- webhook signature verification
- export authorization before data export
- rate limit before password reset email send
- import boundary preventing direct provider SDK access

If the check is important enough to protect, put it in a spec.

### 2. Put the guardrail in the local spec

Use `Must` for the check and `Must not` for weakening or bypass behavior.

```sdd
Spec: Account Export API

Purpose:
  Start account data exports for authenticated and authorized accounts.

Owns:
  ./account-export-api.ts
  ./account-export-api.test.ts

Must:
  Require authenticated account context before starting an export.
  Require export authorization before creating an export job.

Must not:
  Start an export job after authentication or authorization is denied.
  Treat hidden UI controls as export authorization.
  Remove denied-export tests when export behavior changes.
```

That last rule is intentionally direct. If agents have removed denial coverage before, a local `Must not` can protect
the test as part of the behavior contract.

### 3. Forbid bypass paths and dependency shortcuts

Use `Forbids` for blocked access patterns.

```sdd
Forbids:
  Direct repository reads from the export API.
  Direct object storage writes outside ../export-storage/*
  New export bypass flags without security-owner review.
```

If a bypass is legitimate for internal maintenance, make it explicit and narrow:

```sdd
Must:
  Allow only the approved internal export maintenance caller to bypass interactive rate limits.

Must not:
  Allow client-supplied headers or query parameters to enable export bypass behavior.
```

### 4. Require evidence before tasks are complete

Use `Done when` to protect checks from being removed silently.

```sdd
Done when:
  Denied export authorization prevents export job creation.
  Direct API request without export permission returns the approved denied response.
  Export API does not import repository or object storage modules directly.
  Existing denied-export regression tests remain active.
```

If a security check is removed, changed, skipped, or replaced, the `Done when` evidence should force review.

### 5. Protect CI and static checks

Some security controls live in the test and build pipeline.

Document project-wide CI expectations in `.specdd/bootstrap.project.md`:

```md
## Security Gates

- Do not disable auth, authorization, import-boundary, secret-scan, dependency, or security tests to complete a task.
- Treat changes to security-relevant CI gates as high risk.
- Security gate changes require owner review and a replacement verification path when a gate is removed.
```

Then use local specs to name the checks that matter for a feature:

```sdd
Done when:
  Import-boundary check still prevents API routes from importing payment provider SDKs directly.
  Secret-scan check passes for changed fixtures and snapshots.
```

### 6. Use review prompts that look for weakening

Ask for review separately from implementation.

```text
Review whether the account export change weakens security checks.
```

For a specific check:

```text
Check whether the password reset change weakens account-enumeration protection.
```

These prompts steer the review toward removed tests, relaxed guards, new bypass paths, and softened negative
constraints.

### 7. Review weakenings as security changes

During review, look for:

- removed validation or authorization calls
- changed deny behavior
- new default-allow branches
- `catch` blocks that turn security failures into success
- reduced rate-limit enforcement
- new debug logs near secrets or private data
- deleted tests for denied, duplicate, invalid, or bypass cases
- disabled lint, import, dependency, secret-scan, or CI checks
- `Must not` or `Forbids` wording softened or removed

If the change intentionally replaces a check, require an equivalent or stronger check plus updated specs and evidence.

## Example

```sdd
Spec: Webhook Processing

Purpose:
  Process provider webhooks only after signature verification succeeds.

Owns:
  ./webhook-processing.ts
  ./webhook-processing.test.ts

Depends on:
  ../webhook-signature-verification/webhook-signature-verification.sdd
  ../billing-audit/billing-audit.sdd

Must:
  Verify webhook signature before processing webhook payload.
  Reject unsigned or invalid-signature webhooks.
  Record rejected webhook audit event for invalid signatures.

Must not:
  Process webhook payload after signature verification fails.
  Add debug bypasses that skip signature verification.
  Remove invalid-signature regression tests when webhook processing changes.
  Log raw webhook signing secret.

Forbids:
  Direct provider secret access outside ../webhook-signature-verification/*
  Test-only bypass flags in production webhook processing.

Done when:
  Valid signed webhook is processed.
  Invalid-signature webhook is rejected without processing payload.
  Rejected webhook audit event is recorded without raw secret values.
  Invalid-signature regression tests remain active.
```

## Common mistakes

- Protecting the production check but letting agents delete the denied-case test.
- Treating CI gate changes as build cleanup.
- Adding a temporary bypass without a spec rule, task, owner, or removal condition.
- Replacing a deny check with a default-allow fallback.
- Removing `Must not` or `Forbids` because a current task is blocked by them.
- Logging private values to understand why a check failed.
- Approving an implementation that passes happy-path tests while bypass cases disappear.

## How to verify the result

Security checks are protected when:

- each important check is named in the owning spec
- bypass and weakening behavior are forbidden
- dependency shortcuts are blocked with `Forbids`
- denial, invalid, duplicate, and bypass checks remain active
- CI and static gates cannot be weakened without review
- `Done when` evidence proves the check still works
- reviewers treat security-check removals as security changes

## Related how-tos

- [How to use SpecDD to limit agent risk](/how-to/security-and-risk/how-to-use-specdd-to-limit-agent-risk/)
- [How to review security-sensitive changes with SpecDD](/how-to/security-and-risk/how-to-review-security-sensitive-changes-with-specdd/)
- [How to test negative constraints](/how-to/testing-and-quality/how-to-test-negative-constraints/)
- [How to review changes to Must not and Forbids](/how-to/code-review-and-governance/how-to-review-changes-to-must-not-and-forbids/)

## Related reference

- [Language reference](/language-reference/)
