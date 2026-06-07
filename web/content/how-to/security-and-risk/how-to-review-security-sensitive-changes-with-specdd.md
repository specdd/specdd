---
title: "How to review security-sensitive changes with SpecDD"
seoDescription: "Review security-sensitive changes with spec-driven development by checking governing specs, write authority, Must not and Forbids rules, risk, tests, logs, secrets, and audit evidence."
excerpt: "Use SpecDD as the review contract for security-sensitive changes so reviewers can compare the diff against explicit local constraints."
level: "Advanced"
howtoID: "1161005"
weight: 60
---

This guide shows you how to review security-sensitive changes with SpecDD in a spec-driven development workflow.

In a security review, the question is not only whether the code works. The reviewer must know whether the change stayed
inside the right authority, preserved inherited constraints, avoided forbidden dependencies, and produced the evidence
the spec requires.

## Short answer

Find the governing spec chain, classify the change risk, compare changed files against `Can modify` or `Owns`, check
that `Must not` and `Forbids` rules were not violated or weakened, verify `Done when` evidence, and require explicit
approval for ambiguous changes to security, data, destructive behavior, or public contracts.

## When to use this guide

Use this guide for pull requests or agent diffs that touch:

- authentication or authorization
- sessions, tokens, passwords, API keys, or secrets
- privacy, export, retention, deletion, or redaction
- payment capture, refunds, invoices, subscriptions, or billing retries
- audit logging or security events
- rate limiting, abuse prevention, lockouts, or throttling
- dependency rules around sensitive modules
- CI, lint, test, or security gates

## Steps

### 1. Classify the security surface

Start by naming what kind of security behavior changed.

Examples:

- identity validation
- permission decision
- sensitive data read or write
- secret loading
- payment state transition
- audit event emission
- rate-limit enforcement
- dependency boundary
- CI or review gate

If the pull request description does not say this, request clarification before reviewing implementation detail.

### 2. Find the governing specs

Review against the spec chain that governs the changed files. Include:

- parent specs that provide inherited constraints
- the nearest local spec that grants write authority
- referenced specs needed for the security contract
- related policy or adapter specs named in `Can read`, `References`, or `Depends on`

Do not treat every nearby spec as authority. Use the specs that actually govern or are explicitly referenced.

### 3. Check write authority

Changed files should be inside the nearest relevant spec's `Can modify`, or inside `Owns` when `Can modify` is absent.

Ask:

- Which spec grants write authority?
- Are all changed files inside that authority?
- Did the change touch a parent, sibling, adapter, or policy file without authority?
- Does the task require a spec update before implementation can continue?

For agent-generated changes, this is the first hard boundary to check.

### 4. Review `Must not` and `Forbids`

Security-sensitive diffs often hide risk in negative constraints.

Check whether the change:

- violates a `Must not` rule
- imports a path, module, library, tool, or access pattern listed in `Forbids`
- adds `Depends on` that conflicts with inherited `Forbids`
- removes, narrows, or softens a security `Must not`
- removes or broadens a `Forbids` entry
- adds a task that cannot be completed without violating a constraint

Treat removals and weakenings as governance changes. They need rationale and appropriate approval, not just passing
tests.

### 5. Verify required security behavior

Use `Must`, `Handles`, `Raises`, `Scenario`, and `Done when` to decide what evidence should exist.

For authentication and authorization:

- valid actors are allowed
- denied actors are rejected
- bypass attempts fail
- protected side effects do not happen after denial

For privacy:

- cross-account access is denied
- redaction happens before export or logging
- retention or deletion behavior follows the configured rule

For payments:

- duplicate attempts are idempotent
- failed attempts do not mark success
- authorization checks run before money movement

For rate limits:

- enforcement point is correct
- bypass rules are explicit
- limit responses do not leak sensitive state

### 6. Check logs, secrets, and audit evidence

Security regressions often appear outside the main return value.

Check:

- raw tokens, credentials, reset links, or secret values are not logged
- sensitive data is not added to analytics or telemetry accidentally
- denied actions do not produce success audit events
- required audit events contain useful identifiers without storing forbidden data
- debug output and test snapshots do not contain secrets
- generated fixtures do not include real or production-like sensitive values

If the spec says an audit event is required, the review should check event content and event timing, not only that a
logger was called.

### 7. Approve, narrow, or block

Approve when:

- write authority is clear
- security constraints are preserved
- evidence matches `Done when`
- tests and static checks cover the risky behavior
- any required security owner review is complete

Request narrowing when the implementation crosses boundaries that can be avoided.

Block when:

- authority is unclear
- a `Must not` or `Forbids` rule is violated
- a security boundary is weakened without rationale
- public, data, destructive, or security behavior is ambiguous
- sensitive evidence is missing

## Review checklist

Use this checklist for high-risk reviews:

- What security surface changed?
- Which spec grants write authority?
- Which parent constraints apply?
- Did the diff stay inside `Can modify` or `Owns`?
- Were any `Must not` or `Forbids` rules changed?
- Were denied, bypass, and side-effect cases tested?
- Are secrets and private data absent from logs and fixtures?
- Are audit events present when required and free of forbidden data?
- Do dependency changes respect `Forbids`?
- Does `Done when` evidence exist?
- Should a security owner approve before merge?

## Agent prompt

Use a focused review prompt:

```text
Review the account export change against its security constraints.
```

For risk first:

```text
Classify the security risk of the password reset change.
```

Keep review prompts separate from implementation prompts.

## Common mistakes

- Reviewing only the changed code and skipping the governing specs.
- Treating a `Must not` removal as a wording cleanup.
- Checking authentication success but not denied or bypass behavior.
- Accepting a forbidden import because the local tests pass.
- Checking that an audit logger was called without checking event content.
- Approving secret-handling changes without inspecting logs, fixtures, and failure paths.
- Letting an agent mark security tasks `[x]` before verification evidence exists.

## How to verify the result

The review is complete when:

- the governing specs were used as the review contract
- write authority and inherited constraints were checked
- `Must not` and `Forbids` changes were reviewed as governance changes
- required test, static-check, audit, and manual evidence exists
- unresolved security ambiguity is blocked or escalated
- the final review explains any residual risk

## Related how-tos

- [How to review a SpecDD pull request](/how-to/code-review-and-governance/how-to-review-a-specdd-pull-request/)
- [How to review changes to Must not and Forbids](/how-to/code-review-and-governance/how-to-review-changes-to-must-not-and-forbids/)
- [How to create a SpecDD review checklist](/how-to/code-review-and-governance/how-to-create-a-specdd-review-checklist/)
- [How to use SpecDD for risk classification](/how-to/security-and-risk/how-to-use-specdd-for-risk-classification/)

## Related reference

- [Language reference](/language-reference/)
