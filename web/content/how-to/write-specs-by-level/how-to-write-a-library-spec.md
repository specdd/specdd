---
title: "How to write a library spec"
seoDescription: "Write a SpecDD library spec for spec-driven development with internal or public library APIs, compatibility, examples, boundaries, and documentation expectations."
excerpt: "Use library specs to protect public API behavior, compatibility expectations, examples, and implementation boundaries."
level: "Intermediate"
howtoID: "1051012"
weight: 130
---

This guide shows you how to write a SpecDD library spec for a spec-driven development workflow.

A library spec describes an internal or public library's contract: public API, compatibility expectations, examples,
implementation boundaries, and documentation or check criteria.

## Short answer

Use a library spec when code is consumed as a reusable API by other code or external users. Define the public surface in
`Exposes`, inputs in `Accepts`, outputs in `Returns`, errors in `Raises`, compatibility expectations in `Must`, and
implementation leakage in `Must not` or `Forbids`.

## When to use this guide

Use this guide when:

- a reusable library has public exports
- compatibility changes need review
- consumers rely on examples or docs
- implementation details keep leaking into callers
- agents need to preserve API shape during refactors

## Steps

### 1. Define the library subject

Examples:

```text
trip-date.sdd
trip-date.library.sdd
packages/trip-core/trip-core.sdd
```

Use package specs for package-level boundaries and library specs for reusable API contracts. In small libraries, one
spec may do both.

### 2. List public API

```sdd
Exposes:
  parseTripDate(input)
  formatTripDate(date)
  @TripDate
```

Keep private helpers out of `Exposes`.

### 3. Write compatibility expectations

```sdd
Must:
  Preserve public function names unless a reviewed compatibility change is approved.
  Keep date parsing deterministic for supported input formats.
```

Avoid unsupported metadata fields for versioning. Use normal sections and project release process.

### 4. Define inputs, outputs, and errors

```sdd
Accepts:
  ISO date string
  TripDate

Returns:
  normalized trip date
  formatted date string

Raises:
  TripDateInvalid
```

This makes the library contract reviewable.

### 5. Add examples

```sdd
Example: parse ISO date
  input: 2026-06-12
  result: TripDate for June 12, 2026
```

Examples are especially useful for library consumers.

### 6. Block implementation leakage

```sdd
Must not:
  Expose internal parser state.
  Require callers to know storage or UI details.

Forbids:
  Browser-only APIs in the core date library.
```

## Complete example

```sdd
Spec: Trip Date Library

Purpose:
  Provide reusable trip date parsing and formatting behavior.

Owns:
  ./trip-date.ts
  ./trip-date.test.ts
  ./README.md

Exposes:
  parseTripDate(input)
  formatTripDate(date)
  @TripDate

Accepts:
  ISO date string
  TripDate

Returns:
  normalized trip date
  formatted date string

Raises:
  TripDateInvalid

Must:
  Preserve public function names unless a reviewed compatibility change is approved.
  Keep date parsing deterministic for supported input formats.

Must not:
  Expose internal parser state.
  Require callers to know storage or UI details.

Example: parse ISO date
  input: 2026-06-12
  result: TripDate for June 12, 2026

Done when:
  Public examples match implementation behavior.
```

## Common mistakes

- Listing internal helpers as public API.
- Changing compatibility behavior without updating the spec.
- Using metadata or frontmatter for versioning expectations.
- Forgetting examples for tricky inputs.
- Letting library code depend on app-specific UI or storage.

## How to verify the result

The library spec is useful when:

- public API is explicit
- inputs, outputs, and errors are clear
- compatibility expectations are reviewable
- examples stay aligned with code
- implementation details remain hidden from consumers

## Related how-tos

- [How to use the Exposes section](/how-to/use-spec-sections/how-to-use-the-exposes-section/)
- [How to use the Example section](/how-to/use-spec-sections/how-to-use-the-example-section/)
- [How to write a package spec](/how-to/write-specs-by-level/how-to-write-a-package-spec/)

## Related reference

- [Language reference](/language-reference/)
