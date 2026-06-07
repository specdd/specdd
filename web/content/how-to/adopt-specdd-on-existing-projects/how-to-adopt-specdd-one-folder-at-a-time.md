---
title: "How to adopt SpecDD one folder at a time"
seoDescription: "Adopt spec-driven development one folder at a time by starting with a root spec, adding folder-level context for active areas, and expanding local specs only as work reaches them."
excerpt: "Grow SpecDD coverage folder by folder: add context where work is happening, avoid full-tree rewrites, and keep parent and child specs at the right level."
level: "Beginner"
howtoID: "1111003"
weight: 80
---

This guide shows you how to adopt spec-driven development incrementally by adding specs around one folder at a time.

Folder-by-folder adoption works well for existing projects because it follows the code the team is already changing. It
also keeps early specs small enough for humans to review and agents to follow.

## Short answer

Create or verify the root spec first. Then choose one active folder, write a folder-level spec for its boundary and
immediate structure, add same-basename or local specs only for files with substantial behavior, run one small change,
and expand to the next folder when work reaches it.

## When to use this guide

Use this guide when:

- the repository is too large to specify all at once
- several folders have different owners or boundaries
- agents often edit sibling folders by mistake
- a team wants gradual adoption tied to active work
- a folder has enough shared context to need a parent spec

## Steps

### 1. Start with the root spec

Even folder-by-folder adoption needs a root spec. It gives child specs inherited project context.

For:

```text
travel-planner/
```

create:

```text
travel-planner.sdd
```

Keep it minimal:

```sdd
Spec: Travel Planner

Purpose:
  Help people plan and review trips.

Structure:
  ./src: Application source
  ./tests: Project checks

Must not:
  Mix booking purchase behavior into trip planning.
```

### 2. Choose the first folder

Pick a folder with near-term value:

- active feature work
- frequent review comments
- unclear ownership
- repeated agent overreach
- risky operational behavior
- subtle business rules

Do not choose a folder only because it appears first alphabetically.

### 3. Write a folder-level boundary

A folder spec should describe the folder's local concept and immediate children.

Example:

```text
src/trips/trips.sdd
```

```sdd
Spec: Trips

Purpose:
  Own trip planning behavior and the immediate trip-planning modules.

Structure:
  ./itinerary.js: Itinerary organization behavior
  ./trip-storage.js: Trip persistence boundary

Must:
  Trip planning behavior remains separate from destination search.

Must not:
  Manage booking purchase behavior.
```

Do not use the folder spec as an inventory of every nested file.

### 4. Add local specs only where needed

Add a same-basename spec when a file has substantial behavior:

```text
src/trips/itinerary.js
src/trips/itinerary.sdd
```

Add a local spec for a service, workflow, component, job, adapter, policy, or other subject when it needs its own
behavior and boundaries.

Do not create empty specs for every file. A spec should add useful authority, behavior, or context.

### 5. Keep parent and child rules separate

Parent specs provide context and constraints. Child specs add or narrow local behavior.

Good parent rule:

```sdd
Must not:
  Manage booking purchase behavior.
```

Good child rule:

```sdd
Must:
  Reject itinerary items without a place name.
```

Avoid copying the parent `Must not` into every child. Repetition creates drift when the parent rule changes.

### 6. Implement one task

Use a small local task in the folder:

```sdd
Tasks:
  [ ] Add missing-place validation.
```

Then implement:

```text
Implement the Itinerary validation task.
```

Review changed files against the local `Can modify` or `Owns` boundary.

### 7. Expand to the next active folder

Expand when:

- work moves to another folder
- review finds repeated confusion in a sibling folder
- a dependency boundary needs clearer context
- onboarding needs local documentation for a folder
- a parent rule should apply to several child areas

Leave inactive folders alone until there is value in specifying them.

## Common mistakes

- Creating specs for every folder before using any of them.
- Writing folder specs as file inventories.
- Putting child-specific behavior into the parent folder spec.
- Duplicating parent constraints in every child spec.
- Expanding to a new folder before the first folder's workflow is verified.
- Letting a folder spec grant broad write authority to all descendants by default.

## How to verify the rollout

Folder-by-folder adoption is working when:

- the root spec exists and stays short
- the first folder spec defines real shared context
- local specs exist only where behavior needs them
- parent and child responsibilities are distinct
- implementation stays inside local authority
- expansion follows active work

## Related how-tos

- [How to plan a SpecDD adoption for an existing repo](/how-to/adopt-specdd-on-existing-projects/how-to-plan-a-specdd-adoption-for-an-existing-repo/)
- [How to map an existing codebase into specs](/how-to/adopt-specdd-on-existing-projects/how-to-map-an-existing-codebase-into-specs/)
- [How to structure a SpecDD project layout](/how-to/install-and-setup/how-to-structure-a-specdd-project-layout/)
- [How to resolve conflicts between specs](/how-to/spec-driven-workflows/how-to-resolve-conflicts-between-specs/)

## Related reference

- [Quickstart](/quickstart/)
- [Language reference](/language-reference/)
