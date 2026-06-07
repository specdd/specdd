---
title: "How to write specs for backwards compatibility"
seoDescription: "Write spec-driven development compatibility constraints for APIs, libraries, migrations, data contracts, CLI output, and user-facing behavior."
excerpt: "Use specs to preserve backwards compatibility by naming stable contracts, allowed changes, forbidden breakage, versioning, deprecation, and test expectations."
level: "Intermediate"
howtoID: "1071013"
weight: 140
---

This guide shows you how to write SpecDD specs for backwards compatibility in a spec-driven development workflow.

Compatibility rules matter when other code, users, clients, scripts, data, or teams rely on existing behavior. A good
compatibility spec makes the stable contract visible so later changes do not break it accidentally.

## Short answer

Write compatibility constraints at the level that owns the public contract. Use `Exposes`, `Accepts`, `Returns`,
`Raises`, `Must`, `Must not`, `Example`, `Scenario`, and `Done when` to describe what must remain stable, what may
change, what is deprecated, and how compatibility is checked.

## When to use this guide

Use this guide for:

- APIs
- libraries and packages
- CLI commands
- database migrations
- data contracts
- event payloads
- configuration files
- saved user data
- user-facing workflows
- integrations with external systems

## Steps

### 1. Identify the stable contract

Ask what callers or users rely on:

- endpoint path and method
- request shape
- response shape
- error codes
- event name and payload
- CLI flags and output format
- configuration key
- persisted data format
- visible user behavior

Place the rule in the spec that owns that contract.

### 2. Name compatible behavior

For an API:

```sdd
Spec: Trip itinerary API

Exposes:
  GET /api/trips/:tripId/itinerary

Returns:
  200 with itinerary items ordered by day
  404 when the trip does not exist

Must:
  Continue returning the item id, day, placeName, and notes fields for existing clients.
```

For a CLI:

```sdd
Spec: Export command

Exposes:
  trip export

Must:
  Keep --format json as a supported flag.
  Preserve the top-level trips array in JSON output.
```

### 3. Forbid breaking changes

Use `Must not` for breakage that looks tempting during refactors:

```sdd
Must not:
  Rename placeName in version 1 responses.
  Remove --format json before a replacement is released.
  Change the default export sort order.
```

Compatibility specs should make unsafe changes obvious in review.

### 4. Specify versioning or deprecation

If the contract can evolve, say how:

```sdd
Must:
  Add new response fields in a backwards-compatible way.
  Keep deprecated fields available until the v2 itinerary API is released.

Must not:
  Require existing clients to send newly added optional fields.
```

For deprecation work, keep tasks local and checkable:

```sdd
Tasks:
  [ ] Add a deprecation warning for legacy export output.
  [ ] Document the replacement output format.

Done when:
  Existing JSON export tests still pass.
  Deprecated output includes the warning.
```

### 5. Cover migrations and data contracts

For persisted data, compatibility often means old data can still be read:

```sdd
Spec: Trip note migration

Must:
  Read trip notes saved before the note metadata migration.
  Preserve note text during migration.

Must not:
  Drop unknown note metadata keys during migration.

Scenario: Legacy trip note
  Given a trip note without metadata
  When the migration runs
  Then the note text is preserved
  And default metadata is added
```

This kind of spec protects migration behavior from later cleanup work.

### 6. Require compatibility checks

Use `Done when` to require tests, snapshots, contract checks, or manual verification:

```sdd
Done when:
  Existing v1 response contract checks pass.
  Legacy fixture data can still be read.
  CLI JSON output preserves the documented top-level shape.
```

Avoid vague criteria like "compatibility is maintained" unless the project has a specific command or process that
defines it.

## Common compatibility targets

- API routes: paths, methods, request fields, response fields, status codes.
- Libraries: exported symbols, function signatures, error types, package entrypoints.
- Migrations: ability to read old data and preserve unknown fields when required.
- Events: event names, payload fields, ordering guarantees, idempotency expectations.
- CLI tools: flags, exit codes, stdout/stderr format, machine-readable output.
- User behavior: saved preferences, visible defaults, old links, existing workflows.

## Common mistakes

- Saying "keep backwards compatibility" without naming the contract.
- Treating internal refactor boundaries as public compatibility rules.
- Forgetting machine consumers of CLI output.
- Removing deprecated behavior without a specified replacement path.
- Updating response examples without updating compatibility tests.
- Putting compatibility rules in a spec that does not own the interface.

## How to verify the result

The compatibility spec is ready when:

- the stable contract is named
- allowed evolution is clear
- breaking changes are forbidden
- versioning or deprecation expectations are explicit
- old data or clients are represented when relevant
- compatibility checks appear in `Done when`

## Related how-tos

- [How to write an API spec](/how-to/write-specs-by-level/how-to-write-an-api-spec/)
- [How to write a library spec](/how-to/write-specs-by-level/how-to-write-a-library-spec/)
- [How to deprecate behavior with SpecDD](/how-to/spec-driven-workflows/how-to-deprecate-behavior-with-specdd/)
- [How to use the Example section](/how-to/use-spec-sections/how-to-use-the-example-section/)

## Related reference

- [Language reference](/language-reference/)
