---
title: "How to compare SpecDD specs vs architecture docs"
seoDescription: "Compare SpecDD specs and architecture docs for spec-driven development, decide what belongs in each, and use source-adjacent specs to make architecture operational during code changes."
excerpt: "Architecture docs explain broad decisions; SpecDD specs place durable behavior, ownership, and boundaries beside the code that must follow them."
level: "Beginner"
howtoID: "1101015"
weight: 160
---

This guide shows you how to compare SpecDD specs with architecture docs for a spec-driven development workflow.

Architecture docs are useful for explaining broad decisions, tradeoffs, diagrams, migration plans, and historical
context. SpecDD specs are useful for making accepted behavior and boundaries operational near the code. They serve
different purposes, and a mature project can use both.

The failure mode is duplication. If the architecture doc says one thing and the local spec says another, humans and
agents have to guess which source to trust. The practical pattern is: discuss broadly in architecture docs or design
reviews, then encode durable implementation rules in the specs that own them.

## Short answer

Use architecture docs for narrative context, tradeoffs, diagrams, and decision history. Use SpecDD specs for durable
source-adjacent contracts: ownership, behavior, non-goals, dependencies, forbidden access, tasks, and completion
criteria. When an architecture decision is accepted, update the owning specs so future implementation can follow it.

## When to use this guide

Use this guide when:

- your project already has architecture docs or ADRs
- broad design decisions are not affecting day-to-day implementation
- local specs and docs disagree
- agents need operational boundaries, not just explanation
- reviewers are unsure whether a rule belongs in an architecture doc or a spec
- a design review accepted a boundary that now needs to guide code changes

## What architecture docs are good at

Use architecture docs for:

- high-level system diagrams
- tradeoff discussion
- alternatives considered
- migration plans
- rationale and decision history
- cross-team context
- large design proposals
- long-form explanations

Architecture docs are good at explaining why a decision was made.

## What SpecDD specs are good at

Use specs for:

- local ownership
- write authority
- required behavior
- non-goals
- forbidden dependencies
- dependency direction
- public contracts
- local tasks
- completion criteria
- behavior that humans and agents should follow while changing code

Specs are good at making accepted decisions enforceable during implementation.

## Steps

### 1. Use architecture docs for broad context

An architecture doc might say:

> Trip planning should keep domain rules independent of UI and storage so future clients can reuse the same behavior.

That is useful context. It explains the design motivation.

### 2. Use specs for local authority

The accepted rule should also appear in the owning spec:

```sdd
Spec: Trips Module Architecture

Purpose:
  Keep trip planning behavior separated across UI, services, domain rules, and adapters.

Must:
  Domain rules remain independent of UI, API, and storage frameworks.

Forbids:
  domain importing ./ui/*
  domain importing ./adapters/*
```

Now the decision can guide implementation and review.

### 3. Move accepted decisions into owning specs

After a design review, ask:

- Which spec owns the accepted boundary?
- Which local specs need new `Must`, `Must not`, `Forbids`, or `Depends on` entries?
- Which tasks or `Done when` checks make the decision actionable?
- Does a parent spec need the rule so children inherit it?

Do not leave accepted architecture only in meeting notes or an RFC.

### 4. Avoid duplicating documents

Do not copy a full architecture document into `.sdd` files. Specs should be concise and operational.

Bad spec content:

```sdd
Purpose:
  This module exists because after evaluating four alternatives in a multi-quarter migration plan, the team decided...
```

Better:

```sdd
Purpose:
  Keep trip planning behavior separated across UI, services, domain rules, and adapters.
```

The architecture doc can keep the long rationale. The spec carries the rule that implementation must follow.

### 5. Link or reference context intentionally

If a spec needs to point to background material, use `References`:

```sdd
References:
  /docs/adr/trip-layering.md
```

`References` provides context. It does not grant broad write authority and should not replace local behavior rules.

### 6. Review drift

When docs and specs disagree, decide which one is stale. Then update it.

Common drift examples:

- architecture doc says a layer is forbidden, but specs allow it
- specs forbid a dependency that the latest architecture review approved
- docs describe a migration as complete, but specs still carry temporary tasks
- code follows a new design, but specs still describe the old boundary

Drift is dangerous because it makes the source of truth ambiguous.

## Decision guide

Put it in an architecture doc when:

- the reader needs rationale, tradeoffs, or diagrams
- the decision spans several teams or systems
- the content is mostly explanatory
- the plan may evolve before becoming implementation authority

Put it in a SpecDD spec when:

- the rule should guide code changes
- a local owner must be clear
- a dependency is allowed or forbidden
- behavior must be preserved
- review needs a concrete checklist
- a task or completion criterion belongs near the code

## Common mistakes

- Treating architecture docs as enough to enforce local boundaries.
- Copying long rationale into specs instead of writing operational rules.
- Leaving accepted design-review decisions out of owning specs.
- Using `References` as permission to edit another area.
- Letting docs and specs drift without choosing a source of truth.
- Writing a broad architecture spec when smaller local specs would be clearer.

## How to verify the result

Architecture docs and specs are working together when:

- docs explain context and rationale
- specs define source-adjacent implementation authority
- accepted decisions appear in owning specs
- references provide context without replacing local rules
- reviewers can check code against specs
- docs and specs do not contradict each other

## Related how-tos

- [How to use SpecDD in architecture reviews](/how-to/code-review-and-governance/how-to-use-specdd-in-architecture-reviews/)
- [How to use SpecDD in RFC or design review workflows](/how-to/teams-and-process/how-to-use-specdd-in-rfc-or-design-review-workflows/)
- [How to use specs as a source of truth](/how-to/spec-writing-technique/how-to-use-specs-as-a-source-of-truth/)
- [How to write a repository spec](/how-to/write-specs-by-level/how-to-write-a-repository-spec/)

## Related reference

- [Language reference](/language-reference/)
