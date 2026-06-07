---
title: "How to write security constraints in specs"
seoDescription: "Write security constraints in SpecDD specs for spec-driven development using Must, Must not, Forbids, ownership, interface contracts, scenarios, and Done when evidence."
excerpt: "Put security rules near the code they protect so humans and agents know what must hold, what must never happen, and how to prove it."
level: "Intermediate"
howtoID: "1161001"
weight: 20
---

This guide shows you how to write security constraints in SpecDD specs for a spec-driven development workflow.

Security constraints are most useful when they live near the code that must enforce them. A local `.sdd` file can tell
contributors exactly which behavior must hold, which shortcuts are forbidden, which dependencies are not allowed, and
what evidence is needed before the change is complete.

## Short answer

Use `Must` for required security behavior, `Must not` for forbidden behavior and non-goals, `Forbids` for blocked
dependencies, paths, modules, libraries, tools, or access, and `Done when` for verification. Put each constraint in the
spec that owns the protected behavior, and let parent specs carry constraints that apply to an entire area.

## When to use this guide

Use this guide when you need to specify:

- authentication or authorization behavior
- data privacy requirements
- secrets handling
- audit logging
- payment or billing safety rules
- rate limits or abuse prevention
- dependency restrictions for sensitive modules
- review requirements for high-risk changes

## Steps

### 1. Choose the security rule owner

Put the rule in the spec that owns the behavior.

Good owner:

```text
src/auth/session.sdd owns session validation.
```

Weak owner:

```text
The project root spec lists every session validation edge case.
```

Use parent specs for inherited constraints that truly apply across an area. Use local specs for behavior that belongs to
one service, route, component, policy, job, or adapter.

### 2. Write positive security requirements with `Must`

Use `Must` for behavior that must happen.

```sdd
Spec: Session Validation

Purpose:
  Validate session tokens before protected account actions run.

Must:
  Reject expired session tokens.
  Reject session tokens that do not match the current signing key.
  Load the authenticated account from the trusted session subject.
  Return an unauthenticated result when validation fails.
```

Positive rules should be observable. A reviewer should be able to ask, "How do we know this happened?"

### 3. Write forbidden behavior with `Must not`

Use `Must not` for behavior that must never happen in this local context.

```sdd
Must not:
  Trust account identifiers supplied by the browser for protected actions.
  Continue a protected action after session validation fails.
  Log raw session tokens.
```

Keep `Must not` focused on plausible local mistakes. Do not turn it into a list of unrelated bad things.

### 4. Block unsafe dependencies and access with `Forbids`

Use `Forbids` when the risk is a dependency, path, module, library, tool, or access pattern.

```sdd
Forbids:
  Direct database writes from session validation.
  Direct access to ../billing/*
  Reading secrets from checked-in files.
```

Use explicit paths where possible. A path such as `../billing/*` is easier to check than a vague phrase such as
"billing stuff."

### 5. Specify interface and failure behavior

Security behavior often depends on exact inputs, outputs, and failure states. Use contract sections to make those
visible.

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
  missing cookie
  expired token
  unknown signing key
  disabled account
```

These sections help humans and agents derive tests and avoid hidden interpretation.

### 6. Add scenarios for important boundaries

Use `Scenario` when a security rule has a concrete before-and-after behavior.

```sdd
Scenario: expired session
  Given a session token has expired
  When a protected account action validates the session
  Then validation returns unauthenticated
  And the protected action does not run
```

Scenarios are especially useful for denied access, missing identity, duplicate payment attempts, privacy redaction, and
rate-limit thresholds.

### 7. Put proof in `Done when`

Security constraints need evidence.

```sdd
Done when:
  Expired-session behavior is covered by a validation test.
  Protected account actions stop when validation returns unauthenticated.
  Raw session tokens are absent from logs in success and failure tests.
  No session validation code imports billing modules.
```

Use tests where behavior is observable. Use static checks for dependency boundaries. Use targeted review evidence for
judgment-heavy constraints.

## Example

```sdd
Spec: Account Email Change

Purpose:
  Let an authenticated account owner change the account email address safely.

Owns:
  ./account-email-change.ts
  ./account-email-change.test.ts

Can modify:
  ./account-email-change.ts
  ./account-email-change.test.ts

Can read:
  ../auth/session-validation.sdd
  ../audit/account-audit.sdd

Must:
  Require an authenticated account context before changing the email address.
  Verify the new email address before it becomes the primary account email.
  Record an audit event for accepted and rejected email change attempts.

Must not:
  Trust an account id supplied by the client body.
  Change email for disabled accounts.
  Log verification tokens.

Forbids:
  Direct session token parsing outside ../auth/*
  Sending email directly outside ../mail/*

Raises:
  Unauthenticated
  AccountDisabled
  EmailVerificationRequired

Scenario: unauthenticated request
  Given no valid session exists
  When an email change is requested
  Then the request is rejected
  And the account email remains unchanged

Done when:
  Authenticated owner change is covered by a test.
  Unauthenticated requests do not update the account.
  Disabled-account rejection is covered by a test.
  Verification tokens are not logged.
```

## Best practices

- Put security behavior in the smallest spec that owns the behavior.
- Use parent specs only for inherited constraints that genuinely apply to descendants.
- Prefer precise, observable security rules over broad slogans.
- Use `Must not` for forbidden behavior and `Forbids` for forbidden dependencies or access.
- Add `Done when` criteria before asking an agent to implement.
- Review removals and weakenings of security constraints as security changes, not wording cleanup.

## Common mistakes

- Putting local security behavior in `.specdd/bootstrap.project.md` instead of a local `.sdd` spec.
- Using `Forbids` for behavior that belongs in `Must not`.
- Writing "secure this endpoint" without naming allowed and denied outcomes.
- Defining an auth rule without saying what happens on failure.
- Adding tests for allowed behavior but no denied or bypass cases.
- Letting a child spec loosen a parent security constraint silently.

## How to verify the result

Your security constraints are strong enough when:

- the owning spec is clear
- required and forbidden behavior are both explicit
- unsafe dependency or access paths are blocked
- failure states are named
- scenarios cover important boundaries
- `Done when` names concrete test, static-check, or review evidence

## Related how-tos

- [How to write Must not rules](/how-to/use-spec-sections/how-to-write-must-not-rules/)
- [How to use the Forbids section](/how-to/use-spec-sections/how-to-use-the-forbids-section/)
- [How to write Done when](/how-to/use-spec-sections/how-to-write-done-when/)
- [How to test negative constraints](/how-to/testing-and-quality/how-to-test-negative-constraints/)

## Related reference

- [Language reference](/language-reference/)
