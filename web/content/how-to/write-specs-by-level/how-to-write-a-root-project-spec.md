---
title: "How to write a root project spec"
seoDescription: "Write a SpecDD root project spec for spec-driven development with the content-root name, project purpose, structure, top-level rules, and boundaries."
excerpt: "Use the root project spec for inherited project context: purpose, major structure, broad Must rules, and top-level Must not boundaries."
level: "Beginner"
howtoID: "1051000"
weight: 10
---

This guide shows you how to write a SpecDD root project spec for a spec-driven development workflow.

The root spec is the first `.sdd` file child specs inherit from. It should give broad project context without becoming
a giant requirements document.

## Short answer

Create one root `.sdd` file named after the selected content root directory. Use it for project purpose, major
structure, broad `Must` rules, top-level `Must not` boundaries, and platform context when useful. Put project-wide
commands, naming conventions, and team workflow rules in `.specdd/bootstrap.project.md`, not in the root spec.

## When to use this guide

Use this guide when:

- you are initializing SpecDD in a project
- child specs need inherited architecture context
- agents are guessing global boundaries
- a project has no source-adjacent contract yet
- a monorepo needs clarity about which root governs which area

## Steps

### 1. Identify the content root

The content root is the highest relevant directory SpecDD should govern.

For a normal repository:

```text
travel-planner/
```

the root spec is:

```text
travel-planner/travel-planner.sdd
```

In a monorepo, use the configured SpecDD root. Usually that is the monorepo root when specs refer across packages,
apps, or modules. A package can have its own root only when it is configured as an independent SpecDD project.

### 2. Name the root spec after the directory basename

If the content root directory is:

```text
travel-planner/
```

the file must be:

```text
travel-planner.sdd
```

Use the directory basename, not the product title, package name, or code identifier.

### 3. Write a short project purpose

```sdd
Spec: Travel Planner

Purpose:
  Help people plan trips and keep itinerary information organized.
```

The purpose should describe the project, not the current task or release.

### 4. Describe major structure

Use `Structure` for top-level directories and important areas:

```sdd
Structure:
  ./src: Application source
  ./tests: Project checks
  ./docs: Developer documentation
```

Do not list every file. Child specs should own local detail.

### 5. Add broad `Must` rules

Use `Must` for project-level outcomes and invariants:

```sdd
Must:
  Trips can be created and reviewed.
  Itinerary items remain grouped by trip day.
  Shared behavior stays under the project source tree.
```

Keep rules broad enough to inherit, but specific enough to guide review.

### 6. Add top-level `Must not` boundaries

```sdd
Must not:
  Purchase bookings or tickets.
  Store trip data outside configured storage code.
```

Root `Must not` rules are inherited by children, so use them only for boundaries that really apply project-wide.

### 7. Keep project conventions out of the root spec

Do not put these in the root spec:

- build commands
- formatting rules
- naming conventions
- test commands
- team review process
- generated-file conventions

Put those in:

```text
.specdd/bootstrap.project.md
```

## Complete example

```sdd
Spec: Travel Planner
Platform: JavaScript/ES6

Purpose:
  Help people plan trips and keep itinerary information organized.

Structure:
  ./src: Application source and local specs
  ./tests: Project checks
  ./docs: Developer documentation

Must:
  Trips can be created and reviewed.
  Itinerary items remain grouped by trip day.
  Project behavior stays simple enough for local specs to govern.

Must not:
  Purchase bookings or tickets.
  Store trip data outside configured storage code.
```

## Common mistakes

- Naming the root spec after the product title instead of the directory basename.
- Writing a giant root spec that describes every module.
- Putting team conventions in the root spec instead of `.specdd/bootstrap.project.md`.
- Adding child-specific behavior that belongs in a module, service, or feature spec.
- Omitting a root spec and expecting child specs to have project context.

## How to verify the result

The root spec is useful when:

- it is named after the content root directory
- child specs can inherit broad project context
- major structure is visible without becoming an inventory
- top-level boundaries are clear
- local implementation details remain in local specs

## Related how-tos

- [How to structure a SpecDD project layout](/how-to/install-and-setup/how-to-structure-a-specdd-project-layout/)
- [How to use the Structure section](/how-to/use-spec-sections/how-to-use-the-structure-section/)
- [How to write Must not rules](/how-to/use-spec-sections/how-to-write-must-not-rules/)
- [How to configure team rules in bootstrap.project.md](/how-to/spec-driven-workflows/how-to-configure-team-rules-in-bootstrap-project-md/)

## Related reference

- [Quickstart](/quickstart/)
- [Language reference](/language-reference/)
