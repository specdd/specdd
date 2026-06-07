---
title: "How to use SpecDD in RFC or design-review workflows"
seoDescription: "Use spec-driven development in RFC and design-review workflows by keeping tradeoffs and approval in the RFC while moving accepted durable behavior and boundaries into local specs."
excerpt: "Connect RFCs and design reviews to SpecDD: discuss alternatives in the RFC, then turn accepted decisions into reviewed local specs before implementation."
level: "Advanced"
howtoID: "1171012"
weight: 130
---

This guide shows you how to use spec-driven development in RFC or design-review workflows.

RFCs are good for alternatives, tradeoffs, approval, and broad design discussion. SpecDD specs are good for the durable
local contracts that implementation and review should follow after the decision is accepted.

## Short answer

Keep design exploration in the RFC. When a decision becomes actionable, update the relevant `.sdd` specs with accepted
behavior, ownership, dependencies, boundaries, tasks, and `Done when` criteria. Review those specs before implementation.
The RFC can link to specs, but implementation should be driven by reviewed local specs, not by a long design document.

## When to use this guide

Use this guide when:

- a change needs architecture or product design review
- an RFC contains decisions that affect code ownership
- design approval should become implementation guidance
- agents need local context after a broad design discussion
- teams want RFCs to produce durable repository contracts

## Steps

### 1. Use RFCs for decisions and tradeoffs

Keep the RFC responsible for:

- problem statement
- alternatives considered
- tradeoffs
- rejected approaches
- rollout plan
- stakeholder approval
- cross-team impact
- open questions

These are valuable design-review artifacts, but they are often too broad to serve as day-to-day implementation
authority.

### 2. Use specs for accepted local contracts

After a decision is accepted, express durable local rules in `.sdd` specs:

```sdd
Spec: Itinerary Storage

Purpose:
  Persist itinerary changes through the trip storage boundary.

Owns:
  ./trip-storage.js
  ./trip-storage.test.js

Must:
  Save itinerary changes through the storage adapter.

Must not:
  Write browser storage directly from itinerary behavior.

Done when:
  Storage adapter behavior is covered by a check.
```

The spec is the implementation contract. The RFC explains why the team chose it.

### 3. Draft specs during design review

For major changes, include draft spec snippets in the RFC or design review:

- root or parent spec changes
- local spec changes
- new `Must not` boundaries
- dependency decisions
- task breakdown
- `Done when` criteria

Reviewers can catch missing authority and boundary problems before implementation starts.

### 4. Review authority and boundaries

Before accepting the design, check:

- Which spec owns the new behavior?
- Does a parent spec need a new constraint?
- Does a child spec need a local task?
- Does any spec need `Can modify` narrowed or expanded?
- Are referenced specs read-only?
- Do `Must not` or `Forbids` protect rejected approaches?
- What checks prove completion?

This turns design review into actionable implementation guidance.

### 5. Link RFCs and specs deliberately

The RFC should link to the relevant specs or pull requests.

Specs may reference durable external context when needed, but avoid making the RFC the only place where implementation
rules live. If a rule must guide future code, put the rule in the owning spec.

Use `.specdd/bootstrap.project.md` to describe where RFCs or design documents live for the project.

### 6. Implement from accepted specs

After approval, use implementation prompts that name the work:

```text
Implement the Itinerary Storage adapter task.
```

Do not ask agents to implement from the entire RFC when the accepted behavior can be captured in local specs.

## Common mistakes

- Treating the RFC as the permanent implementation contract.
- Leaving accepted decisions only in comments or tickets.
- Adding design-process conventions to root specs instead of `.specdd/bootstrap.project.md`.
- Implementing from draft specs before design approval.
- Forgetting to encode rejected approaches as `Must not` or `Forbids` when they are likely mistakes.
- Linking to an RFC but not updating local specs.

## How to verify the result

The RFC-to-SpecDD workflow worked when:

- the RFC records tradeoffs and approval
- accepted durable behavior appears in local specs
- ownership and writable scope are clear
- rejected approaches are protected where needed
- tasks and `Done when` guide implementation
- agents and humans can implement from specs without rereading the whole RFC

## Related how-tos

- [How to run a spec-first development process](/how-to/teams-and-process/how-to-run-a-spec-first-development-process/)
- [How to author and revise specs](/how-to/work-with-specdd-skills/how-to-author-and-revise-specs-specdd-author/)
- [How to keep specs reviewed but lightweight](/how-to/teams-and-process/how-to-keep-specs-reviewed-but-lightweight/)
- [How to link existing docs and content with SpecDD](/how-to/getting-started/how-to-link-existing-docs-and-content-with-specdd/)

## Related reference

- [Language reference](/language-reference/)
