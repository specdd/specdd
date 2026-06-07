---
title: "How to extract a module with SpecDD"
seoDescription: "Extract a module with spec-driven development by defining target ownership, preserving behavior, moving tests, updating dependencies, and keeping specs and code aligned."
excerpt: "Use SpecDD to turn module extraction into a reviewed sequence: capture behavior, define the new owner, move code and tests, and preserve contracts."
level: "Advanced"
howtoID: "1151006"
weight: 70
---

This guide shows you how to extract a module with SpecDD in a spec-driven development workflow.

Module extraction is more than moving files. It creates a new owner, changes dependency direction, updates tests, and
may affect public contracts. SpecDD makes those decisions explicit before the extraction becomes a broad, hard-to-review
diff.

The safest extraction starts by capturing current behavior, then defining the target module spec, then moving code in
small steps while preserving the old contract.

## Short answer

Before extraction, write or review the source spec so current behavior is explicit. Create a target module spec with
`Purpose`, `Owns`, `Must`, `Must not`, and dependency rules. Move code and tests under the new owner, update parent and
source specs, preserve public contracts or add a compatibility layer, and run checks that prove behavior did not change.

## When to use this guide

Use this guide when:

- a large module needs a smaller reusable module
- domain rules should move out of UI, API, or infrastructure code
- a package or service boundary is being created
- tests should move with extracted behavior
- imports need a new allowed direction
- an agent needs a safe plan for extraction

## Steps

### 1. Capture current behavior

Before extraction, make sure the source behavior is specified:

```sdd
Spec: Trip Edit Access

Purpose:
  Decide whether a person may edit a trip itinerary.

Must:
  Allow the trip owner to edit itinerary items.
  Deny collaborators with view-only access.
```

If the current behavior is accidental or unclear, resolve that before moving code.

### 2. Define the target module

Create the target module spec:

```sdd
Spec: Trip Access Module

Purpose:
  Provide reusable trip access policy decisions.

Owns:
  ./trip-access/*

Must:
  Decide whether a person may view or edit a trip.

Must not:
  Render UI for denied access.
  Persist audit events directly.
```

The target spec should own the extracted responsibility, not every file touched by the extraction.

### 3. Plan dependency direction

Decide how the source will depend on the target:

```sdd
Depends on:
  TripAccess

Forbids:
  TripAccess importing ../ui/*
  TripAccess importing ../adapters/*
```

This prevents the extracted module from depending back on its old host.

### 4. Move code and tests together

Move behavior and its checks under the new owner:

```text
src/trips/access/trip-access.js
src/trips/access/trip-access.test.js
src/trips/access/trip-access.sdd
```

If tests stay behind, make sure the source spec still has authority to own them or update ownership accordingly.

### 5. Preserve the old public contract

If other callers use the old path or symbol, decide whether to:

- keep a compatibility wrapper
- update callers in the same change
- deprecate the old entry point
- make a reviewed breaking change

Do not silently break public `Exposes`, `Returns`, or package contracts during extraction.

### 6. Update source and parent specs

The old source spec may need:

```sdd
Depends on:
  TripAccess

Must not:
  Own trip access policy rules.
```

The parent module spec may need `Structure` updates and shared boundary rules.

### 7. Verify extraction

Run checks for:

- extracted module behavior
- source module integration
- public contract compatibility
- import direction
- moved tests
- spec lint

If the extraction is staged across multiple pull requests, keep each stage in a coherent, checked state.

## Common mistakes

- Extracting code before deciding the new module's responsibility.
- Moving helpers but leaving the behavior spec in the old module.
- Creating circular dependencies between source and target modules.
- Breaking public imports accidentally.
- Moving tests without updating spec ownership.
- Treating extraction as permission to redesign behavior.

## How to verify the result

The module extraction is safe when:

- source behavior was specified before the move
- the target module has clear ownership
- dependency direction is explicit
- tests moved or still run under correct authority
- public contracts are preserved or intentionally changed
- old specs no longer claim behavior they do not own
- spec lint and relevant checks pass

## Related how-tos

- [How to split modules with local specs](/how-to/refactoring-and-maintenance/how-to-split-modules-with-local-specs/)
- [How to manage dependency direction with specs](/how-to/software-design-practices/how-to-manage-dependency-direction-with-specs/)
- [How to design stable public APIs with specs](/how-to/software-design-practices/how-to-design-stable-public-apis-with-specs/)
- [How to write a module spec](/how-to/write-specs-by-level/how-to-write-a-module-spec/)

## Related reference

- [Language reference](/language-reference/)
