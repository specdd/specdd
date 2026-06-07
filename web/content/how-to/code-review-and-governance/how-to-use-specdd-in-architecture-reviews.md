---
title: "How to use SpecDD in architecture reviews"
seoDescription: "Use spec-driven development in architecture reviews by turning accepted decisions into reviewed local specs with ownership, boundaries, dependencies, tasks, and Done when criteria."
excerpt: "Make architecture review actionable with SpecDD: discuss tradeoffs in design review, then encode accepted boundaries and authority in the owning specs."
level: "Advanced"
howtoID: "1141003"
weight: 40
---

This guide shows you how to use spec-driven development in architecture reviews without turning `.sdd` files into long design documents.

Architecture review is where teams compare options and make decisions. SpecDD is where accepted local contracts live
after the decision is made, so implementation can proceed from reviewed source-adjacent rules instead of a long thread
or RFC.

## Short answer

Use the architecture review to discuss tradeoffs, alternatives, rollout, and approval. Once a decision is accepted,
update the relevant SpecDD specs with ownership, dependencies, boundaries, `Must`, `Must not`, `Forbids`, tasks, and
`Done when`. Review those spec changes before implementation begins.

## When to use this guide

Use this guide when:

- a design decision changes module boundaries
- a dependency direction is being approved or rejected
- a public interface, command, endpoint, job, or event is changing
- teams need durable implementation authority after an RFC
- agent implementation should follow a reviewed local contract
- a rejected approach is likely to be reintroduced later

## Steps

### 1. Keep exploration in the design review

Use the design review or RFC for:

- problem statement
- alternatives
- tradeoffs
- risks
- rollout plan
- migration plan
- stakeholder approval
- open questions

Do not force all of that into `.sdd` files. Specs should describe the accepted subject contract, not the full history of
the debate.

### 2. Map decisions to owning specs

For each accepted decision, ask where it should live:

- project-level rules in the root spec or bootstrap files, depending on the rule
- module architecture in a directory or module spec
- file-level behavior in a same-basename spec
- cross-area context in `References`
- local work in the owning spec's `Tasks`

Project-wide conventions for naming, levels, syntax, commands, or team workflow belong in `.specdd/bootstrap.project.md`,
not in root specs or local specs.

### 3. Review inheritance and boundaries

SpecDD uses parent specs for inherited context and constraints. Child specs can add or narrow behavior, but they must
not silently loosen parent constraints.

During architecture review, check:

- Does the parent spec need to define a new boundary?
- Does a child spec attempt to weaken a parent `Must not`?
- Does a dependency conflict with inherited `Forbids`?
- Does the change expand local modification scope beyond authority?
- Would a stricter existing rule still win?

Resolve conflicts in the specs before implementation begins.

### 4. Define write authority

Architecture decisions often fail in implementation because authority is vague.

Use `Can modify` when the writable files should be explicit:

```sdd
Can modify:
  ./itinerary-service.js
  ./itinerary-service.test.js
```

Use `Owns` for governed files or responsibilities when ownership and modification scope are the same:

```sdd
Owns:
  Itinerary persistence behavior.
  ./itinerary-service.js
```

Use `Can read` or `References` for context that should not become writable authority.

### 5. Record rejected approaches

Architecture review usually rejects some tempting options. Preserve the important ones only when they are likely to
prevent future mistakes.

Use `Must not` for behavior or responsibility boundaries:

```sdd
Must not:
  Store itinerary state directly from UI components.
```

Use `Forbids` for dependencies, paths, modules, libraries, tools, or access:

```sdd
Forbids:
  Direct browser storage writes from itinerary components.
```

Do not list every rejected idea. Capture the boundaries that future humans or agents are likely to cross accidentally.

### 6. Approve tasks and `Done when`

Turn accepted work into local tasks:

```sdd
Tasks:
  [ ] Route itinerary saves through the storage adapter.
```

Then make completion reviewable:

```sdd
Done when:
  Itinerary saves use the storage adapter.
  Existing itinerary ordering behavior still passes.
```

Tasks should be local to the spec that owns the work. A task that requires another area may mean the ownership model or
the plan needs another reviewed spec change.

### 7. Implement from the accepted specs

After architecture review, implementation should use the approved spec changes, not the entire design discussion.

Use one implementation prompt:

```text
Implement the Itinerary Storage adapter task.
```

If the spec still contains `[?]` decisions or conflicting rules, pause implementation and resolve the contract first.

## Architecture review checklist

Before accepting the design, ask:

- Which specs change?
- Which spec owns the new behavior?
- Which parent constraints still apply?
- Does any child spec loosen a parent rule?
- Are new dependencies allowed?
- Are rejected approaches captured in `Must not` or `Forbids` where useful?
- Is writable scope explicit enough for implementation?
- Are tasks local and checkable?
- Does `Done when` define reviewable completion?

## Common mistakes

- Leaving accepted architecture decisions only in an RFC.
- Using a local spec to override a parent `Must not`.
- Adding project-wide workflow conventions to local specs.
- Treating `References` as architecture approval to edit another area.
- Writing a broad architecture spec when smaller local specs would be clearer.
- Starting implementation from unresolved `[?]` decisions.

## How to verify the result

SpecDD is working in architecture review when:

- design discussion stays in the review artifact
- accepted durable decisions are reflected in the owning specs
- inherited constraints are preserved or explicitly reviewed
- write authority is clear before implementation
- rejected high-risk approaches are blocked where needed
- agents and humans can implement from the reviewed specs

## Related how-tos

- [How to use SpecDD in RFC or design-review workflows](/how-to/teams-and-process/how-to-use-specdd-in-rfc-or-design-review-workflows/)
- [How to resolve conflicts between specs](/how-to/spec-driven-workflows/how-to-resolve-conflicts-between-specs/)
- [How to define write authority for agents](/how-to/code-review-and-governance/how-to-define-write-authority-for-agents/)
- [How to review changes to Must not and Forbids](/how-to/code-review-and-governance/how-to-review-changes-to-must-not-and-forbids/)

## Related reference

- [Language reference](/language-reference/)
