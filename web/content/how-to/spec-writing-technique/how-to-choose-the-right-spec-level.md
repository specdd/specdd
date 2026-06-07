---
title: "How to choose the right spec level"
seoDescription: "Choose the right SpecDD spec level for spec-driven development by matching each rule to the smallest useful root, module, feature, service, model, adapter, API, component, or job scope."
excerpt: "Pick the smallest SpecDD level that owns the decision: root for inherited project context, module for area boundaries, and focused specs for local behavior."
level: "Beginner"
howtoID: "1071002"
weight: 30
---

This guide shows you how to choose the right SpecDD spec level for a rule, task, or behavior in a spec-driven
development workflow.

Spec levels are practical names, not magic. Authority still comes from path resolution, inheritance, `Owns`,
`Can modify`, same-basename matching, and explicit references.

## Short answer

Put each rule in the smallest spec that owns it. Use the root spec for project-wide context, module specs for area
boundaries, feature specs for user-visible capabilities, and focused local specs for services, models, adapters, APIs,
components, jobs, events, policies, packages, libraries, or files. Skip levels that do not add useful local context.

## Decision guide

Use:

- root project spec for project-wide purpose, structure, and broad boundaries
- repository spec for monorepo-level structure and shared boundaries
- package spec for monorepo package ownership and public surface
- module spec for a directory, subsystem, or domain area
- feature spec for a user-visible or business capability
- service spec for orchestration behavior
- model spec for domain state and invariants
- adapter spec for external-system boundaries
- API spec for inbound interfaces
- component spec for UI behavior
- job spec for background or scheduled work
- event spec for message contracts
- policy spec for permission or decision rules
- library spec for reusable public API contracts

## Steps

### 1. Identify the decision

Ask what you are trying to preserve:

- project boundary
- module ownership
- feature behavior
- API contract
- model invariant
- dependency direction
- background job idempotency
- authorization decision
- public compatibility

The decision tells you the likely level.

### 2. Start with the smallest useful scope

If the rule applies only to `itinerary.js`, write or update:

```text
itinerary.sdd
```

If the rule applies to all trip-planning files, use:

```text
trips.sdd
```

If the rule applies to the whole project, use the root spec.

### 3. Use parent specs for shared constraints

Parent specs are inherited. Put shared constraints in the parent once:

```sdd
Must not:
  Purchase bookings or tickets.
```

Do not duplicate that rule in every child.

### 4. Use local specs for implementation behavior

Local behavior belongs near the code it governs:

```text
src/trips/itinerary.js
src/trips/itinerary.sdd
```

This is often the best place for `Owns`, `Can modify`, `Must`, `Must not`, `Tasks`, and `Done when` for a concrete
change.

### 5. Reference sibling context explicitly

Sibling specs are not inherited automatically.

If itinerary work needs destination search context:

```sdd
References:
  ../destinations/destination-search.sdd
```

The reference gives context. It does not grant write authority.

### 6. Skip levels that add no value

Do not create a feature, service, and model spec just because the taxonomy exists. Add a spec when it answers a local
question or prevents a real mistake.

## Common mistakes

- Treating suffixes such as `.feature.sdd` as automatic authority.
- Writing a feature spec when the behavior belongs in one same-basename file spec.
- Putting child behavior in the root spec.
- Creating every possible level before using any of them.
- Editing sibling specs without explicit authority.

## How to verify the choice

The level is right when:

- the rule is written once where it is owned
- the spec is discoverable from the target path
- inherited context is broad, not child-specific
- local behavior stays local
- no unused intermediate level exists just for taxonomy

## Related how-tos

- [How to use basic SpecDD levels](/how-to/getting-started/how-to-use-basic-specdd-levels/)
- [How to write a root project spec](/how-to/write-specs-by-level/how-to-write-a-root-project-spec/)
- [How to write a module spec](/how-to/write-specs-by-level/how-to-write-a-module-spec/)
- [How to write a feature spec](/how-to/write-specs-by-level/how-to-write-a-feature-spec/)

## Related reference

- [Language reference](/language-reference/)
