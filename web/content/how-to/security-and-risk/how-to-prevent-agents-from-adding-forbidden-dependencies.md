---
title: "How to prevent agents from adding forbidden dependencies"
seoDescription: "Prevent AI agents from adding forbidden dependencies with spec-driven development Forbids entries, dependency direction rules, static checks, review gates, and focused prompts."
excerpt: "Use Forbids to make blocked libraries, modules, paths, tools, and access patterns explicit before humans or agents implement a shortcut."
level: "Intermediate"
howtoID: "1161002"
weight: 30
---

This guide shows you how to prevent agents from adding forbidden dependencies with SpecDD in a spec-driven development workflow.

Agents often solve the local problem they see. If the fastest path is importing a convenient module, calling a provider
SDK directly, or reading a sensitive file, they may choose it unless the boundary is explicit. `Forbids` turns that
boundary into a durable spec rule.

## Short answer

Use `Forbids` to block dependencies, paths, modules, libraries, tools, or access patterns. Write allowed dependencies in
`Depends on`, but remember that `Depends on` does not override inherited `Forbids` or `Must not`. Add static checks or
review evidence in `Done when` for important dependency boundaries.

## When to use this guide

Use this guide when:

- an agent keeps importing from the wrong layer
- a sensitive SDK must only be used behind an adapter
- UI code must not call infrastructure directly
- domain code must not depend on framework or database modules
- a package, tool, path, or runtime access pattern is forbidden
- dependency direction matters for security review

## Steps

### 1. Identify the dependency risk

Name the shortcut you want to prevent.

Examples:

- route handlers importing a payment provider SDK directly
- UI components reading secrets or environment variables
- domain code importing database adapters
- test helpers reaching into production secrets
- one bounded context importing another bounded context's private files
- agents adding a new package that bypasses an approved abstraction

Be specific. A precise `Forbids` entry is easier to enforce than a broad warning.

### 2. Write explicit `Forbids` entries

Use `Forbids` for blocked dependencies, paths, modules, libraries, tools, or access.

```sdd
Spec: Billing API

Owns:
  ./billing-api.ts
  ./billing-api.test.ts

Forbids:
  Direct use of the payment provider SDK outside ../payment-provider/*
  Direct database writes outside ../billing-repository/*
  Reading secrets from checked-in files.
```

Use explicit paths when a path boundary matters:

```sdd
Forbids:
  ../payment-provider/private/*
  ../../secrets/*
```

`Forbids` may contain prose as well as paths, but paths make review and automation easier.

### 3. Pair forbidden dependencies with allowed dependencies

Blocking a shortcut is clearer when the approved path is also visible.

```sdd
Depends on:
  ../payment-provider/payment-provider-port.sdd
  BillingRepository

Forbids:
  Direct use of the payment provider SDK outside ../payment-provider/*
  Direct writes to billing tables outside BillingRepository.
```

This tells humans and agents both what not to do and what to use instead.

### 4. Put broad rules at the right level

If a dependency rule applies to every file in an area, put it in the parent spec for that area.

```sdd
Spec: Domain Layer

Purpose:
  Keep business rules independent from infrastructure and UI frameworks.

Forbids:
  ../adapters/*
  ../ui/*
  Framework-specific request or response objects.
```

Child specs inherit the parent constraint. A child task cannot bypass it by adding a conflicting `Depends on` entry.

### 5. Add static or review evidence

Dependency boundaries are usually better checked statically than with unit tests.

```sdd
Done when:
  Import-boundary check passes for domain-to-adapter rules.
  No billing API file imports the payment provider SDK directly.
  Dependency changes are reviewed against the Billing API spec.
```

Possible evidence:

- import-boundary lint rule
- dependency graph check
- package policy check
- architecture test
- targeted review of changed imports
- CI job that rejects blocked paths

Use whatever fits the project's normal tooling. The spec should name the evidence, not invent a separate test framework.

### 6. Review dependency changes before approving

When a pull request changes imports, packages, or `Forbids`, ask:

- Does this dependency violate a local or inherited `Forbids` rule?
- Does an allowed adapter or port already exist?
- Is `Depends on` being used to justify something still forbidden?
- Does the change introduce runtime, security, privacy, or licensing risk?
- Should the rule be narrowed, moved to a parent spec, or kept as-is?

Removing a `Forbids` entry because the current implementation wants it is usually a design review, not a small cleanup.

## Example

```sdd
Spec: Account Export API

Purpose:
  Serve authenticated account export requests through the approved export service.

Owns:
  ./account-export-api.ts
  ./account-export-api.test.ts

Can modify:
  ./account-export-api.ts
  ./account-export-api.test.ts

Depends on:
  ../account-export/account-export-service.sdd
  ../auth/session-validation.sdd

Must:
  Require authenticated account context before starting an export.
  Return the approved export job identifier when the request is accepted.

Must not:
  Read account data directly from persistence.
  Expose export data in the immediate API response.

Forbids:
  ../repositories/*
  Direct object storage access from the API route.
  New export-specific package dependencies without review.

Done when:
  Account export API imports only approved service and auth contracts.
  Direct repository and object storage imports are absent.
  Existing API authorization checks pass.
```

Prompt for review:

```text
Check whether the account export API change introduces forbidden dependencies.
```

## Common mistakes

- Using `Must not` for an import boundary that belongs in `Forbids`.
- Writing vague entries such as "avoid risky dependencies" instead of naming the blocked dependency.
- Adding `Depends on` without checking inherited `Forbids`.
- Blocking a dependency without documenting the approved adapter or port.
- Relying only on unit tests to prove an import cannot be added later.
- Letting an agent remove a forbidden dependency rule as part of implementation.

## How to verify the result

Forbidden dependencies are controlled when:

- blocked dependencies, paths, libraries, tools, or access patterns are in `Forbids`
- approved collaborators are visible in `Depends on`
- inherited `Forbids` entries are still respected
- important boundaries have static checks or targeted review evidence
- dependency-rule changes receive review before implementation depends on them

## Related how-tos

- [How to use the Forbids section](/how-to/use-spec-sections/how-to-use-the-forbids-section/)
- [How to use the Depends on section](/how-to/use-spec-sections/how-to-use-the-depends-on-section/)
- [How to manage dependency direction with specs](/how-to/software-design-practices/how-to-manage-dependency-direction-with-specs/)
- [How to test negative constraints](/how-to/testing-and-quality/how-to-test-negative-constraints/)

## Related reference

- [Language reference](/language-reference/)
