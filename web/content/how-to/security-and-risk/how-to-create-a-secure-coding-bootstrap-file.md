---
title: "How to create a secure coding bootstrap file"
seoDescription: "Create secure coding bootstrap rules for spec-driven development in .specdd/bootstrap.project.md with shared security review expectations, commands, dependency policy, secrets rules, and risk gates."
excerpt: "Use .specdd/bootstrap.project.md for shared secure coding defaults while keeping local security behavior in local .sdd specs."
level: "Intermediate"
howtoID: "1161007"
weight: 80
---

This guide shows you how to create a secure coding bootstrap file for a SpecDD project practicing spec-driven
development.

Use `.specdd/bootstrap.project.md` for shared secure coding conventions that apply across the repository. Use local
`.sdd` specs for the actual security behavior, ownership, write authority, and module-specific constraints.

## Short answer

Put project-wide secure coding defaults in `.specdd/bootstrap.project.md`: security review triggers, required commands,
dependency policy, secrets rules, logging expectations, and risk classification conventions. Do not use the bootstrap
file as a replacement for local `.sdd` specs that govern authentication, privacy, payment, audit, or rate-limit
behavior.

## When to use this guide

Use this guide when:

- agents need repeated security instructions in prompts
- reviewers want a shared risk rubric
- security-sensitive commands and CI gates are scattered
- the team has project-wide dependency or secrets rules
- existing security docs need to be discoverable from SpecDD workflows
- contributors disagree about what counts as high-risk work

## What belongs in bootstrap.project.md

Good secure bootstrap content:

- project-wide risk classification rules
- commands for tests, linting, dependency checks, and security scans
- security review triggers
- secrets handling defaults
- logging and audit logging conventions
- dependency approval rules
- locations of existing security docs, threat models, runbooks, or data classifications
- instructions that `.specdd/bootstrap.local.md` must not weaken shared security rules

Keep these out of `.specdd/bootstrap.project.md`:

- local feature behavior
- route-specific authentication rules
- module ownership
- per-file write authority
- concrete payment state machine behavior
- one-off exceptions for a single task
- personal machine paths or shell aliases

## Steps

### 1. Identify shared secure defaults

Collect rules that apply broadly.

Examples:

```text
Auth, authorization, secrets, privacy, payments, audit logging, migrations, and public API changes are high risk.
Run the security-relevant test suite before marking high-risk tasks complete.
Never commit secrets, production tokens, or generated credentials.
Review changes to Must not and Forbids that affect security behavior.
```

If a rule describes what one module must do, put it in that module's `.sdd` spec instead.

### 2. Edit `.specdd/bootstrap.project.md`

Create or update:

```text
.specdd/bootstrap.project.md
```

Example:

```md
# Project Security Rules

## Risk Classification

- Treat changes to authentication, authorization, secrets, privacy, payments, audit logging, rate limiting, migrations,
  destructive actions, and public APIs as high risk unless the governing specs and reviewers classify them otherwise.
- Do not implement high-risk work until the governing spec identifies required verification.

## Required Commands

- Run unit tests with `pnpm test`.
- Run linting with `pnpm lint`.
- Run import-boundary checks with `pnpm check:imports`.
- Run security checks with `pnpm check:security` when dependencies, secrets handling, auth, or payments change.

## Secrets

- Do not commit secrets, tokens, keys, certificates, or generated credentials.
- Do not add real secret values to tests, fixtures, screenshots, logs, snapshots, or documentation.
- Use the project secret-loading abstraction named in the governing spec.

## Review Gates

- Review changes to `Must not` and `Forbids` as governance changes.
- Require security-owner review when a change weakens auth, privacy, secrets, payment, audit, or rate-limit constraints.
- Do not mark security-sensitive `Tasks` entries `[x]` until required tests or review evidence exist.

## Existing Security Docs

- Data classification guidance lives in `docs/security/data-classification.md`.
- Incident response runbooks live in `docs/runbooks/security/`.
- Dependency approval process lives in `docs/security/dependencies.md`.
```

Use your real command names and document locations.

### 3. Keep local behavior in local specs

Do not put this only in the bootstrap file:

```text
Password reset must not reveal whether an account exists.
```

Put it near the password reset code:

```sdd
Spec: Password Reset Request

Must not:
  Reveal account existence through response text, response code, timing-sensitive branches, or audit output.
```

The bootstrap tells contributors the shared workflow. The local spec owns the local behavior.

### 4. Add security commands and evidence expectations

Project bootstrap is a good place to document shared commands.

```md
## Verification

- Run `pnpm test` for normal implementation changes.
- Run `pnpm test:auth` for authentication or authorization changes.
- Run `pnpm check:imports` when dependency boundaries change.
- Run `pnpm check:secrets` before committing generated files, logs, fixtures, or snapshots.
```

Local specs should still use `Done when` to name the evidence for a specific behavior.

### 5. Document dependency and secrets defaults

Use bootstrap for shared rules such as:

```md
## Dependency Policy

- Do not add runtime dependencies for security-sensitive code without review.
- Prefer existing project abstractions for payment providers, secret loading, audit logging, and rate limiting.
- Use local `.sdd` `Forbids` entries for area-specific blocked dependencies.
```

This tells agents and humans how to behave across the repository without replacing local `Forbids` entries.

### 6. Protect bootstrap.local.md from weakening security

`.specdd/bootstrap.local.md` is for personal or machine-local preferences. It should not weaken shared security rules.

Add a project rule:

```md
## Local Bootstrap Limits

- `.specdd/bootstrap.local.md` may add local command hints or environment notes.
- It must not weaken security rules, dependency policy, review gates, or verification requirements from this file.
```

This is useful because local bootstrap files are not a place to create private security exceptions.

### 7. Verify the bootstrap is usable

Ask for a read-only summary:

```text
Explain the project security rules.
```

Check that the answer names:

- high-risk change types
- required commands
- dependency and secrets defaults
- review gates
- where local behavior belongs
- existing security docs

If the answer is vague, tighten the bootstrap wording.

## Common mistakes

- Putting route-specific auth behavior in `.specdd/bootstrap.project.md`.
- Recording project-wide security conventions in a root spec instead of the project bootstrap.
- Adding security exceptions to `.specdd/bootstrap.local.md`.
- Listing security commands without saying when to run them.
- Writing bootstrap rules that conflict with local `Must not` or `Forbids` constraints.
- Copying an entire security handbook into the bootstrap instead of linking its location.

## How to verify the result

The secure bootstrap is working when:

- shared security conventions are in `.specdd/bootstrap.project.md`
- local behavior and ownership remain in `.sdd` specs
- high-risk change types and review gates are explicit
- security-relevant commands are named
- agents can summarize the rules without repeated prompt instructions
- local bootstrap files do not weaken shared rules

## Related how-tos

- [How to configure team rules in bootstrap.project.md](/how-to/spec-driven-workflows/how-to-configure-team-rules-in-bootstrap-project-md/)
- [How to use SpecDD for risk classification](/how-to/security-and-risk/how-to-use-specdd-for-risk-classification/)
- [How to review changes to Must not and Forbids](/how-to/code-review-and-governance/how-to-review-changes-to-must-not-and-forbids/)
- [How to spec secrets handling](/how-to/security-and-risk/how-to-spec-secrets-handling/)

## Related reference

- [Quickstart](/quickstart/)
- [Tools](/tools/)
