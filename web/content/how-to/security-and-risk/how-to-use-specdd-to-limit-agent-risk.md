---
title: "How to use SpecDD to limit agent risk"
seoDescription: "Limit AI coding agent risk with spec-driven development by defining write authority, readable context, Must not rules, Forbids entries, review gates, and verification evidence."
excerpt: "Use SpecDD to give agents narrow local authority, explicit forbidden behavior, and concrete completion checks before security-sensitive edits happen."
level: "Intermediate"
howtoID: "1161000"
weight: 10
---

This guide shows you how to use spec-driven development to limit the risk of AI coding agent changes.

The goal is not to make agents automatically safe. The goal is to give humans and agents the same durable boundaries before
editing starts: what the change is allowed to touch, what it must preserve, which access patterns are forbidden, and
what evidence is required before the work can be considered complete.

## Short answer

Use the nearest relevant local spec to define agent authority. Put writable scope in `Can modify` or `Owns`, readable
context in `Can read` and `References`, required security behavior in `Must`, forbidden behavior in `Must not`, blocked
dependencies or access in `Forbids`, and proof requirements in `Done when`. For security-sensitive work, ask for risk
assessment and a plan before implementation.

## When to use this guide

Use this guide when:

- an agent will change authentication, authorization, secrets, payments, billing, audit logs, privacy behavior, or
  rate limiting
- a previous agent edit touched too many files
- a feature has security rules scattered across code review comments or tickets
- an implementation task could cross ownership boundaries
- reviewers need a clear contract for what the agent was allowed to do

## Principle

Agent risk drops when authority is narrow, local, and reviewable.

A broad prompt such as "fix billing" gives the agent too much room to infer. A local spec can say which files are in
scope, which dependencies are allowed, which shortcuts are forbidden, and which checks must pass. SpecDD is especially
useful here because the same files that guide the agent are also visible to human reviewers in Git.

Specs do not replace repository permissions, code review, tests, or security review. They make those controls easier to
apply because the intended boundary is written down before the change happens.

## Steps

### 1. Classify the request before editing

Before implementation, decide whether the request touches high-risk behavior.

High-risk examples:

- sign-in, sessions, tokens, or identity
- permission checks or role decisions
- secrets, credentials, API keys, or environment variables
- payment capture, refunds, invoices, subscriptions, or billing retries
- audit logs or compliance evidence
- data export, deletion, retention, or privacy rules
- rate limiting, abuse prevention, or account lockout

If the request is ambiguous and touches one of these areas, do not let implementation begin from a vague prompt. Ask for
a risk assessment or a spec update first.

Good prompt:

```text
Assess risk for the charge capture retry change.
```

Good follow-up prompt:

```text
Plan the charge capture retry change.
```

Keep planning and implementation separate when the change is security-sensitive.

### 2. Define local write authority

Use the nearest relevant local `.sdd` spec to say what the agent may modify.

```sdd
Spec: Charge Capture

Purpose:
  Capture authorized payments exactly once and record the capture result.

Owns:
  ./charge-capture.ts
  ./charge-capture.test.ts

Can modify:
  ./charge-capture.ts
  ./charge-capture.test.ts
```

`Can modify` is the clearest way to narrow writable scope. If `Can modify` is absent, `Owns` acts as the modification
boundary.

Do not rely on the prompt alone for write scope. Prompts disappear. Specs remain reviewable.

### 3. Limit context without widening authority

Security-sensitive code often needs context from nearby modules, but context is not permission to edit those modules.

```sdd
Can read:
  ../payment-gateway/payment-gateway.sdd
  ../audit/billing-audit.sdd

References:
  ../payment-gateway/payment-gateway.sdd
  ../audit/billing-audit.sdd
```

Use `Can read` and `References` to identify useful context. Keep the write boundary in `Can modify` or `Owns`.

### 4. Write forbidden behavior and access rules

Use `Must not` for forbidden behavior:

```sdd
Must not:
  Capture the same authorization more than once.
  Treat a client-provided amount as trusted after authorization.
  Skip audit logging for failed capture attempts.
```

Use `Forbids` for blocked dependencies, paths, libraries, tools, or access:

```sdd
Forbids:
  Direct use of the payment provider SDK outside ../payment-gateway/*
  ../refunds/*
  Reading secrets from files in the repository.
```

`Must not` and `Forbids` are stronger than `Tasks`, `Depends on`, or a convenient implementation shortcut. If the task
requires violating one of them, the task needs review or the spec needs an explicit approved change.

### 5. Add completion and review evidence

Use `Done when` to define the proof reviewers should expect.

```sdd
Done when:
  Duplicate capture attempts return the existing capture result without calling the provider again.
  Failed capture attempts record a billing audit event without logging card or secret data.
  The charge capture tests cover success, duplicate retry, provider failure, and denied authorization.
  The implementation does not import the payment provider SDK directly.
```

This gives the agent a finish line and gives reviewers concrete evidence to check.

### 6. Keep implementation prompts narrow

After risk assessment and planning, make the implementation request specific.

```text
Implement the approved charge capture retry task.
```

Avoid combining several security-sensitive requests into one broad prompt. One spec or one task at a time is easier to
review and less likely to cross boundaries.

### 7. Review the diff against the governing specs

For the review, check:

- changed files are inside `Can modify` or `Owns`
- no `Must not` rule is violated
- no `Forbids` entry is bypassed
- `Depends on` entries do not conflict with inherited `Forbids`
- high-risk `Must not` and `Forbids` changes have explicit rationale
- `Done when` evidence is present
- open tasks are not marked `[x]` until implementation and checks are complete

If a safe subset was completed but the risky part remains blocked, the task should stay open or use a blocked marker
according to the team's task workflow.

## Example

```sdd
Spec: Password Reset Request

Purpose:
  Start a password reset flow without revealing whether an account exists.

Owns:
  ./password-reset-request.ts
  ./password-reset-request.test.ts

Can modify:
  ./password-reset-request.ts
  ./password-reset-request.test.ts

Can read:
  ../mail/password-reset-mail.sdd
  ../audit/auth-audit.sdd

Must:
  Return the same public response for known and unknown email addresses.
  Create reset tokens only for active accounts.
  Record an audit event for each accepted reset request.

Must not:
  Reveal account existence through response text, response code, timing-sensitive branches, or audit output.
  Send reset email for inactive, locked, or missing accounts.
  Log reset tokens.

Forbids:
  Direct email sending outside ../mail/*
  Storing reset tokens in plaintext.

Done when:
  Known and unknown email requests return the same public response.
  Missing-account requests do not send email.
  Reset tokens are not logged in success or failure paths.
  Existing auth audit checks pass.
```

This spec narrows the agent's work to one flow, states the high-risk boundary, and gives reviewers concrete checks.

## SpecDD pattern

This pattern uses:

- `Can modify` to limit edit scope
- `Can read` and `References` to provide context without broad write authority
- `Must` for required security behavior
- `Must not` for forbidden behavior and non-goals
- `Forbids` for blocked dependencies, paths, tools, libraries, or access
- `Done when` for review and verification evidence

## Common mistakes

- Asking an agent to "fix security" without a local spec or target.
- Listing sensitive modules in `Can read` and treating that as permission to edit them.
- Using `Depends on` to justify a dependency that a parent spec forbids.
- Letting an agent remove a `Must not` or `Forbids` rule because it blocks the implementation.
- Marking security tasks complete before tests, static checks, or manual review evidence exist.
- Combining auth, billing, logging, and refactoring changes in one agent request.

## How to verify the result

Agent risk is better controlled when:

- every security-sensitive task has a governing local spec
- write scope is explicit
- forbidden behavior and access are written down
- high-risk completion criteria are testable or reviewable
- the agent's changed files match the spec authority
- reviewers can compare the patch against the spec without reconstructing intent from memory

## Related how-tos

- [How to assess change risk (specdd-risk)](/how-to/work-with-specdd-skills/how-to-assess-change-risk-specdd-risk/)
- [How to define write authority for agents](/how-to/code-review-and-governance/how-to-define-write-authority-for-agents/)
- [How to review a diff against specs](/how-to/work-with-specdd-skills/how-to-review-a-diff-against-specs-specdd-review/)
- [How to review changes to Must not and Forbids](/how-to/code-review-and-governance/how-to-review-changes-to-must-not-and-forbids/)

## Related reference

- [Language reference](/language-reference/)
- [Tools](/tools/)
