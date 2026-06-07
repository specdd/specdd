---
title: "How to write a package spec"
seoDescription: "Write a SpecDD package spec for spec-driven development with monorepo or package-level ownership, public surface, dependency rules, tests, and release expectations."
excerpt: "Use package specs to define a package's local contract: what it owns, exposes, depends on, must preserve, and must not reach across."
level: "Intermediate"
howtoID: "1051011"
weight: 120
---

This guide shows you how to write a SpecDD package spec for a spec-driven development workflow.

A package spec is useful in a monorepo or library-style project where one package has its own source, tests, public
surface, dependency rules, and release expectations.

## Short answer

First decide whether the package is an independent SpecDD content root or a package inside a larger repository root. If
it is independent, its root spec is named after the package directory. If it is part of a larger hierarchy, write a
directory or package-level spec near the package. Use it for package purpose, structure, public surface, dependency
rules, boundaries, and completion criteria.

## When to use this guide

Use this guide when:

- a monorepo package needs its own boundary
- cross-package dependencies need review
- a package exposes a public API to other packages
- package tests or release behavior need local completion criteria
- agents need to avoid editing sibling packages

## Steps

### 1. Decide whether this package is an independent root

If the package is its own SpecDD project:

```text
packages/trip-core/
  trip-core.sdd
```

If the monorepo root governs all packages:

```text
packages/trip-core/
  trip-core.sdd
```

The filename may look the same, but the meaning depends on content-root configuration. In a monorepo, do not assume
each package root is an independent content root unless configured that way.

### 2. Define package purpose and structure

```sdd
Spec: Trip Core Package

Purpose:
  Provide shared trip planning domain behavior for applications in this repository.

Structure:
  ./src: Package source
  ./tests: Package checks
  ./README.md: Package usage notes
```

### 3. Define public surface

```sdd
Exposes:
  @Trip
  @ItineraryItem
  createTrip(input)
```

Keep private helpers out of `Exposes`.

### 4. Set dependency boundaries

```sdd
Depends on:
  shared date utilities

Forbids:
  ../web-app/*
  Direct browser API access from this package.
```

This protects package independence.

### 5. Define package behavior and release expectations

```sdd
Must:
  Public exports remain stable unless a reviewed compatibility change is approved.
  Package tests cover public trip and itinerary behavior.

Done when:
  Package checks pass.
  Public API documentation reflects exposed symbols.
```

Put command names and team conventions in `.specdd/bootstrap.project.md`, not in the package spec.

## Complete example

```sdd
Spec: Trip Core Package

Purpose:
  Provide shared trip planning domain behavior for applications in this repository.

Structure:
  ./src: Package source
  ./tests: Package checks
  ./README.md: Package usage notes

Owns:
  ./src
  ./tests
  Trip and itinerary domain behavior exported by this package.

Exposes:
  @Trip
  @ItineraryItem
  createTrip(input)

Must:
  Public exports remain stable unless a reviewed compatibility change is approved.
  Package tests cover public trip and itinerary behavior.

Must not:
  Depend on application UI packages.
  Access browser APIs directly.

Forbids:
  ../web-app/*

Done when:
  Package checks pass.
  Public API documentation reflects exposed symbols.
```

## Common mistakes

- Treating every package directory as an independent SpecDD root without configuration.
- Putting package build commands in the spec instead of `.specdd/bootstrap.project.md`.
- Letting package specs own sibling packages.
- Listing private helpers in `Exposes`.
- Forgetting dependency boundaries between packages.

## How to verify the result

The package spec is useful when:

- its content-root role is clear
- public surface is visible
- cross-package dependency rules are explicit
- sibling packages stay outside authority
- release or check criteria are reviewable

## Related how-tos

- [How to write a repository spec](/how-to/write-specs-by-level/how-to-write-a-repository-spec/)
- [How to use the Exposes section](/how-to/use-spec-sections/how-to-use-the-exposes-section/)
- [How to map an existing codebase into specs](/how-to/adopt-specdd-on-existing-projects/how-to-map-an-existing-codebase-into-specs/)

## Related reference

- [Language reference](/language-reference/)
