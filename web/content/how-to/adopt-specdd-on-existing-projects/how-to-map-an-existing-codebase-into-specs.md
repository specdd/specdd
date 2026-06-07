---
title: "How to map an existing codebase into specs"
seoDescription: "Map an existing codebase into SpecDD specs for spec-driven development by surveying roots, modules, ownership boundaries, active work, existing docs, and local behavior before writing .sdd files."
excerpt: "Turn a live codebase into a SpecDD map gradually: identify roots, parent specs, local specs, read context, and adoption order."
level: "Intermediate"
howtoID: "1111001"
weight: 50
---

This guide shows you how to map an existing codebase into SpecDD specs for spec-driven development before writing too
many files.

The goal is not to create an inventory of every source file. The goal is to decide where specs belong, which areas need
parent context, which files deserve same-basename specs, and where adoption should start.

## Short answer

Map the repository from the selected content root down to active local areas. Create a minimal root spec, add parent
specs only where shared context is useful, add same-basename or local specs where behavior changes, and use `Can read`
or `References` for context outside the writable boundary. Sequence the map around active work, risk, and confusion.

## When to use this guide

Use this guide when:

- you are adding SpecDD to a large existing repository
- there are many modules and no obvious first spec
- a monorepo or multi-service repo needs clear content roots
- old architecture docs do not match the source tree
- agents need boundaries before implementation starts

## Steps

### 1. Choose the content root

SpecDD applies from a selected content root. In a normal single-project repository, that may be the repository root.

In a monorepo, it may be one package, app, service, or documentation tree:

```text
repo/
  apps/
    travel-planner/
      travel-planner.sdd
  packages/
    trip-core/
      trip-core.sdd
```

The root spec is named after the selected content root directory. Do not use a product name or package identifier if it
does not match the directory basename.

### 2. Inventory the repository shape

Do a shallow survey:

- top-level directories
- manifests and build files
- test directories
- major entry points
- existing docs, ADRs, runbooks, or API contracts
- generated and vendored files
- high-change areas from recent work
- areas with repeated review comments

Avoid reading every file at this stage. Mapping is about boundaries and sequence.

### 3. Identify natural boundaries

Look for areas that already behave like subjects:

- modules
- services
- adapters
- components
- workflows
- jobs
- policies
- APIs
- documentation sections
- automation scripts

For each area, ask:

- What does this area own?
- What behavior must remain true?
- What nearby behavior is often confused with it?
- Which dependencies are allowed?
- Which files should be writable under this local contract?
- Which files are read-only context?

### 4. Choose spec levels

Use the smallest useful level.

Root spec:

```text
travel-planner.sdd
```

Directory or module spec:

```text
src/trips/trips.sdd
```

Same-basename local spec:

```text
src/trips/itinerary.js
src/trips/itinerary.sdd
```

Same-basename specs are useful when one file, service, component, job, adapter, workflow, operation, interface, policy,
or asset has substantial behavior. Directory specs should describe the local boundary and immediate structure, not every
nested descendant.

### 5. Separate ownership from read context

When mapping existing code, imports and call graphs can be misleading. A module may need to read another module without
owning it.

Use `Owns` or `Can modify` for write authority:

```sdd
Can modify:
  ./itinerary.js
  ./itinerary.test.js
```

Use `Can read` or `References` for context:

```sdd
Can read:
  ../storage/trip-storage.sdd

References:
  ../destinations/destination-search.sdd
```

Read context does not grant edit permission.

### 6. Prioritize active areas

Do not map every folder at once. Rank candidates by practical value:

```text
2 points: changes often
2 points: agents or contributors often misunderstand it
2 points: wrong changes are costly
1 point: behavior is easy to describe
1 point: one local owner is clear
1 point: checks can prove behavior
```

Start where the score is highest and near-term work exists.

### 7. Write a mapping plan

Keep the map short:

```md
## Initial SpecDD map

Root:
  travel-planner.sdd

Parent specs:
  src/trips/trips.sdd - trip planning boundary and child roles

First local specs:
  src/trips/itinerary.sdd - itinerary behavior under active change
  src/trips/trip-storage.sdd - storage boundary when storage work begins

Read context:
  docs/adr/storage-boundary.md
  src/destinations/destination-search.sdd

Do not specify yet:
  src/admin - no active work
  generated API clients - generated output
```

This plan gives reviewers and agents a map without pretending all coverage exists.

## Common mistakes

- Mapping the repository as a file inventory.
- Creating parent specs full of child-specific behavior.
- Treating imports as ownership.
- Adding specs for stable areas nobody will touch.
- Using one root spec as a giant architecture document.
- Forgetting existing docs that should become read context.

## How to verify the map

The map is useful when:

- the content root is clear
- each proposed spec has a local subject
- write authority and read context are separate
- parent specs provide context without swallowing child behavior
- the first local specs match active work
- ignored areas are intentionally deferred

## Related how-tos

- [How to structure a SpecDD project layout](/how-to/install-and-setup/how-to-structure-a-specdd-project-layout/)
- [How to write your first .sdd spec](/how-to/getting-started/how-to-write-your-first-sdd-spec/)
- [How to reference another area's spec safely](/how-to/spec-driven-workflows/how-to-reference-another-areas-spec-safely/)
- [How to link existing docs and content with SpecDD](/how-to/getting-started/how-to-link-existing-docs-and-content-with-specdd/)

## Related reference

- [Language reference](/language-reference/)
