---
title: "How to use basic SpecDD levels"
seoDescription: "Learn how to use basic SpecDD levels for spec-driven development, such as root, module, feature, model, component, and policy specs, without turning level names into rigid rules."
excerpt: "Use basic SpecDD levels to decide where intent belongs: root specs for project context, module specs for areas, and focused specs for local behavior."
level: "Beginner"
howtoID: "1001008"
weight: 90
---

SpecDD levels are an amazing way to keep intent at the right size. Instead of writing one giant specification for an
entire project, you can use a few practical levels: a root spec for project-wide context, module specs for areas,
feature specs for capabilities, and smaller specs for models, components, services, policies, adapters, jobs, or other
local subjects.

The names are useful conventions, not a rigid hierarchy. SpecDD cares most about local authority, path-based resolution,
same-basename matching, and explicit references. Use level names to help people and agents navigate the project, but do
not treat a suffix like `.feature.sdd` or `.module.sdd` as magic.

{{< protip title="Naming tip" >}}
Suffix naming is optional. If the directory already explains the role, prefer the simple same-basename spec:
`models/models.sdd`, not `models/models.models.sdd`.
{{< /protip >}}

## Short answer

Use the nearest level that matches the decision you need to preserve. Put project-wide rules in the root spec, local
area rules in a module or directory spec, user-visible behavior in a feature spec, and narrow implementation behavior in
a same-basename spec beside the file or subject it governs. If a named spec is not a same-basename match, reference it
from an applicable basename or directory spec so it becomes discoverable context.

{{< protip title="Level design tip" >}}
Spec level names help humans navigate. Authority still comes from path resolution, ownership sections, same-basename
matching, directory context, and explicit references.
{{< /protip >}}

## When to use this guide

Use this guide when:

- you are unsure whether to write a root, module, feature, or local spec
- a folder contains several kinds of behavior
- you want to add a `.feature.sdd`, `.component.sdd`, `.model.sdd`, or `.policy.sdd` file
- you need to explain how named specs connect to the files they govern
- your team wants its own naming convention for spec levels

## The basic levels

SpecDD does not force every project into one fixed taxonomy. The common levels are a practical vocabulary for deciding
where a rule belongs.

### Root spec

The root spec describes the selected content root. It must be named after the content root directory.

For a project named `travel-planner`, the root spec is:

```text
travel-planner.sdd
```

Use the root spec for:

- project purpose
- broad architecture rules
- major directories
- shared platform context
- project-wide `Must` and `Must not` rules

Do not use the root spec to list every file or describe every feature. Child specs should own local detail.

### Module spec

A module spec describes a directory, package, bounded area, or subsystem.

Example:

```text
src/trips/trips.sdd
```

Use a module spec for:

- what the area owns
- immediate child roles
- allowed dependencies for the area
- boundaries that apply to every child spec
- directory-level structure

A module spec can provide inherited context, but it should not become a dumping ground for file-level behavior.

### Feature spec

A feature spec describes a user-visible, business, operational, or documentation capability.

Example:

```text
travel-planning.feature.sdd
```

Use a feature spec when the capability cuts across more than one implementation file or when the feature needs a
reviewable behavior contract.

Feature specs are useful for:

- user-visible behavior
- acceptance criteria
- cross-file scenarios
- product or workflow rules
- behavior that needs review before implementation

### Focused local specs

Focused specs describe one local subject. Common examples include:

- `model.sdd`
- `service.sdd`
- `component.sdd`
- `adapter.sdd`
- `api.sdd`
- `job.sdd`
- `event.sdd`
- `policy.sdd`

These names are examples. A TypeScript project might use `itinerary.component.sdd`; a Python project might use
`itinerary_policy.sdd`; a team can invent names that fit its conventions. Do not add a suffix just to label the level
when the folder or file already makes the meaning clear.

For example, this is enough:

```text
models/
  models.sdd
```

This is usually unnecessary:

```text
models/
  models.models.sdd
```

Use focused local specs for:

- one component's rendering behavior
- one domain model's invariants
- one policy's authorization rules
- one adapter's external-system boundary
- one API endpoint or command contract

## Same-basename specs and named specs

The most direct local spec is a same-basename spec.

```text
itinerary.js
itinerary.sdd
```

In this case, `itinerary.sdd` is the local spec for `itinerary.js`.

A named spec is different:

```text
travel-planning.feature.sdd
itinerary.component.sdd
trip-access.policy.sdd
```

Named specs are useful, but their names do not automatically make them apply to every nearby file. If the named spec is
not a same-basename match for the target, connect it from an applicable basename or directory spec with `References`,
`Structure`, `Can read`, `Depends on`, or another explicit local relationship.

Example directory spec:

```sdd
Spec: Trips

Purpose:
  Own trip planning behavior and local trip-related specs.

Structure:
  ./travel-planning.feature.sdd: Trip planning feature behavior
  ./itinerary.sdd: Itinerary file behavior
  ./trip-access.policy.sdd: Trip access decisions

References:
  ./travel-planning.feature.sdd
  ./trip-access.policy.sdd
```

This makes the named specs discoverable from the directory context. Without that link, a nearby named spec may be
ordinary sibling context rather than applicable authority.

## Travel Planner example

Here is a small tree that uses several levels:

```text
travel-planner/
  travel-planner.sdd
  src/
    trips/
      trips.sdd
      travel-planning.feature.sdd
      itinerary.js
      itinerary.sdd
      itinerary-view.component.sdd
      trip-access.policy.sdd
```

The levels have different jobs:

- `travel-planner.sdd` describes the whole project.
- `trips.sdd` describes the trip-planning area.
- `travel-planning.feature.sdd` describes the user-visible trip-planning capability.
- `itinerary.sdd` describes the local itinerary behavior.
- `itinerary-view.component.sdd` describes the UI component behavior.
- `trip-access.policy.sdd` describes access decisions.

The feature spec and the itinerary spec can both exist. They are not duplicates if they answer different questions.

Use the feature spec for user-visible behavior:

```sdd
Spec: Travel Planning

Purpose:
  Let a person create a trip and build an itinerary for that trip.

Must:
  A trip has a destination before itinerary items are added.
  Itinerary items remain visible by trip day.

Must not:
  Purchase bookings or tickets.

Scenario: plan a trip day
  Given a Paris trip exists
  When "Louvre Museum" is added for "2026-06-12"
  Then the Paris trip shows "Louvre Museum" on the June 12 itinerary
```

Use the local itinerary spec for the smaller implementation boundary:

```sdd
Spec: Itinerary

Purpose:
  Keep itinerary items organized by trip day.

Owns:
  ./itinerary.js

Must:
  A missing place name is rejected before an itinerary item is stored.
  Itinerary items appear in chronological order.

Must not:
  Manage destination search results.
```

The feature spec says what the capability does. The itinerary spec says what the local itinerary subject owns and must
protect.

## Steps

### 1. Start with the root spec

Before adding several local levels, make sure the root spec exists and names the project-level intent. Keep it broad and
short.

Use it for rules that should apply everywhere:

- project purpose
- platform context
- major structure
- project-wide boundaries

### 2. Add module specs for areas

Add a module or directory spec when a folder needs local context that applies to its children.

Good module-level rules:

- "Trip planning owns itinerary behavior."
- "Trip planning may depend on destination search but must not purchase bookings."
- "Child specs should preserve itinerary grouping by day."

Weak module-level rules:

- detailed behavior for every file in the folder
- a list of every class or function
- repeated copies of child spec rules

### 3. Add feature specs for capabilities

Use a feature spec when the question is "what should this capability do for the user, operator, or system?"

Good feature prompt:

```text
Check the Travel Planning feature spec.
```

Good implementation prompt:

```text
Implement the Travel Planning feature spec.
```

Each prompt names the feature and contains one instruction.

### 4. Add focused specs for local behavior

Use a model, component, service, policy, adapter, job, event, API, or other focused spec when a smaller subject has its
own rules.

Examples:

- use a model spec for invariants
- use a component spec for UI states and accessibility behavior
- use a policy spec for authorization decisions
- use an adapter spec for external systems
- use an API spec for inputs, outputs, errors, and status behavior

### 5. Reference named specs from applicable specs

If you create `travel-planning.feature.sdd` and it is not a same-basename match, make it discoverable from an applicable
directory or basename spec.

Use `References` when the relationship is explicit context:

```sdd
References:
  ./travel-planning.feature.sdd
```

Use `Structure` when documenting the role of immediate local files:

```sdd
Structure:
  ./travel-planning.feature.sdd: User-visible trip planning behavior
```

Do not assume sibling specs apply just because they are nearby.

### 6. Put custom level names in bootstrap.project.md

Teams can invent names when the common ones do not fit.

For example:

```text
approval.workflow.sdd
checkout.operation.sdd
warehouse.runbook.sdd
pricing.schema.sdd
```

Document what the names mean in `.specdd/bootstrap.project.md`. Project-wide conventions belong there, always. The name
helps people navigate, but the spec still needs clear `Purpose`, ownership, references, and behavior. Prefer simple
names when the directory structure already carries the level meaning.

## Common mistakes

- Treating `.feature.sdd` or `.module.sdd` as automatic authority.
- Adding suffixes where the directory already explains the role, such as `models/models.models.sdd`.
- Creating named sibling specs without referencing them from an applicable local spec.
- Putting child behavior into the root spec.
- Writing one feature spec and expecting it to own every implementation detail.
- Using level names your team has not documented in `.specdd/bootstrap.project.md`.
- Duplicating the same rule across root, module, feature, and local specs.

## How to verify the result

You are using basic SpecDD levels correctly when:

- the root spec holds project-wide context
- module specs describe local areas without becoming inventories
- feature specs describe capabilities, not every implementation detail
- focused specs own local behavior and boundaries
- suffixes are used only when they clarify meaning
- named specs are referenced from applicable basename or directory specs
- custom level names are documented in `.specdd/bootstrap.project.md`

## Related how-tos

- [How to write your first .sdd spec](/how-to/getting-started/how-to-write-your-first-sdd-spec/)
- [How to run your first spec-driven change end to end](/how-to/getting-started/how-to-run-your-first-spec-driven-change-end-to-end/)
- [How to choose your first SpecDD use case](/how-to/getting-started/how-to-choose-your-first-specdd-use-case/)

## Related reference

- [Quickstart](/quickstart/)
- [Language reference](/language-reference/)
