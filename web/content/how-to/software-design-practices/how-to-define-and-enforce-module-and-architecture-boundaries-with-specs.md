---
title: "How to define and enforce module and architecture boundaries with specs"
seoDescription: "Define and enforce module and architecture boundaries with spec-driven development by using ownership, allowed dependencies, forbidden access, inherited constraints, and review checks."
excerpt: "Use SpecDD specs as architecture guardrails: module specs define responsibility, local specs narrow behavior, and Forbids and Must not keep changes inside the intended boundary."
level: "Intermediate"
howtoID: "1101002"
weight: 30
---

This guide shows you how to define and enforce module and architecture boundaries with SpecDD in a spec-driven development workflow.

Architecture boundaries fail when they live only in diagrams, old design docs, or someone's memory. A contributor makes
a local change, reaches across a layer because it is convenient, and the architecture gets a little harder to reason
about. The change may even pass tests while still weakening the design.

SpecDD helps by putting the boundary near the code it protects. A module spec can state the module's responsibility,
owned files, allowed collaborators, and forbidden access. Child specs inherit those constraints and add local behavior
without silently loosening the architecture.

## Short answer

Write boundary rules in the spec that owns the boundary. Use a module, package, repository, or root spec for broad
architecture constraints. Use local specs for service, model, adapter, API, component, job, event, or policy behavior.
Use `Owns`, `Can modify`, `Depends on`, `Must not`, and `Forbids` so implementation and review can check whether the
change stayed inside the intended architecture.

## When to use this guide

Use this guide when:

- a module is starting to reach into sibling modules
- layer rules are known but not enforced in review
- agents edit files outside the intended area
- architecture decisions are accepted in review but not encoded near code
- local tasks need clear write authority
- a refactor might weaken dependency direction

## The design idea

Architecture boundaries are not only about folders. A folder can look organized while code inside it still imports the
wrong layer, owns too much behavior, or bypasses a public interface. A useful boundary answers four questions:

- What does this area own?
- What may it depend on?
- What must it not do?
- What files may a change modify?

SpecDD answers those questions in a form that is readable by humans and usable by agents during implementation.

## Steps

### 1. Name the boundary

Use a subject name that describes the architectural unit:

```sdd
Spec: Trips Module
```

or:

```sdd
Spec: Billing Package
```

or:

```sdd
Spec: Public API Layer
```

The name should help reviewers understand what boundary is being protected.

### 2. Place the boundary spec

Place broad boundary specs at the level that owns the rule:

```text
src/trips/module.sdd
packages/billing/package.sdd
services/api/api-layer.sdd
```

Do not copy the same module rule into every child spec. Parent constraints are inherited. Child specs should add local
behavior or narrow rules, not duplicate the architecture statement.

### 3. Define ownership

For a module:

```sdd
Spec: Trips Module

Purpose:
  Provide the part of the app where people plan trips.

Owns:
  ./src/trips/*
```

For a package:

```sdd
Spec: Billing Package

Purpose:
  Provide billing calculations and public billing service entry points.

Owns:
  ./packages/billing/*
```

Ownership describes what the spec governs. If a task needs narrower write authority, add `Can modify` in the local spec
that owns the task.

### 4. State allowed dependencies

Use `Depends on` for important collaborators:

```sdd
Depends on:
  TripStorage
  DestinationSearch
```

Do not list every import. List dependencies that matter for architecture, review, testing, or future maintenance.

### 5. Forbid boundary violations

Use `Must not` for forbidden behavior:

```sdd
Must not:
  Purchase bookings or tickets.
  Manage destination search results.
```

Use `Forbids` for hard dependency or access boundaries:

```sdd
Forbids:
  ../billing/*
  direct booking API access
```

`Forbids` is stronger than a task or dependency request. If a child task asks to use a forbidden dependency, the task is
invalid until the owning boundary is reviewed and changed.

### 6. Let child specs narrow the boundary

Parent:

```sdd
Spec: Trips Module

Must not:
  Purchase bookings or tickets.
```

Child:

```sdd
Spec: Itinerary Behavior

Must:
  Reject itinerary items without a place name.

Must not:
  Change destination search behavior.
```

The child adds local behavior and local boundaries. It does not need to restate the booking rule, and it cannot weaken
it.

### 7. Review changes against the boundary

During review, check:

- Did the change stay inside the nearest `Owns` or `Can modify` boundary?
- Did it introduce an import, call, path, or tool blocked by `Forbids`?
- Did it move behavior into a module that should not own it?
- Did it require editing another module because the boundary is wrong or because the implementation is wrong?
- Did the spec update happen at the owner of the boundary?

This is where SpecDD becomes architecture enforcement without requiring every small pull request to reopen a broad
architecture discussion.

## Example module boundary

```sdd
Spec: Trips Module

Purpose:
  Provide the part of the app where people plan trips.

Owns:
  ./src/trips/*

Must:
  Trips have a destination and date range.
  Places can be added to a trip itinerary.
  Itinerary items remain grouped by day.
  Changes are saved through trip storage.

Must not:
  Purchase bookings or tickets.
  Manage destination search results.

Forbids:
  ../booking/*
  direct booking API access
```

This spec does not describe every trips implementation detail. It defines the module's architectural role and the
boundaries that later local specs inherit.

## Common mistakes

- Putting broad architecture rules in a child spec where siblings will not inherit them.
- Copying parent `Must not` rules into every child spec.
- Using `Depends on` as permission to ignore `Forbids`.
- Treating `Owns` as permission for every child task to edit the whole module.
- Encoding architecture decisions only in prose outside the repository.
- Removing a boundary because one implementation would be easier without it.

## How to verify the result

The boundary is working when:

- the owning spec states the module or architecture role
- owned paths match the actual boundary
- allowed dependencies are visible
- forbidden dependencies or access patterns are explicit
- child specs add local behavior without weakening parent rules
- pull requests can be reviewed against concrete boundary sections

## Related how-tos

- [How to write a module spec](/how-to/write-specs-by-level/how-to-write-a-module-spec/)
- [How to use the Forbids section](/how-to/use-spec-sections/how-to-use-the-forbids-section/)
- [How to define write authority for agents](/how-to/code-review-and-governance/how-to-define-write-authority-for-agents/)
- [How to use SpecDD in architecture reviews](/how-to/code-review-and-governance/how-to-use-specdd-in-architecture-reviews/)

## Related reference

- [Language reference](/language-reference/)
