---
title: "How to review a draft spec before using it"
seoDescription: "Review a draft SpecDD spec before implementation in a spec-driven development workflow by checking correctness, scope, authority, ambiguity, testability, and inherited constraints."
excerpt: "A draft spec should become authority only after review confirms the intended behavior, ownership, boundaries, ambiguity, and testability."
level: "Intermediate"
howtoID: "1071011"
weight: 120
---

This guide shows you how to review a draft SpecDD spec before using it to guide implementation in a spec-driven
development workflow.

Draft specs can come from a human, an agent, a migrated document, or existing code. They are useful, but they should not
be treated as project authority until someone checks whether they describe the intended behavior correctly.

## Short answer

Review a draft spec for the right level, local ownership, correct intended behavior, explicit boundaries, inherited
constraints, unresolved ambiguity, and testability. Accept the draft only when it is clear enough for humans and agents
to implement and review without guessing.

## When to use this guide

Use this guide when:

- an agent generated a spec from existing code or a feature idea
- a spec-only pull request proposes new behavior
- a legacy document has been split into local specs
- a team member drafted a spec before implementation
- a spec looks useful but may encode accidental current behavior

## Steps

### 1. Check the subject and level

Ask:

- Does the `Spec` name one local subject?
- Is the level appropriate: root, module, feature, service, model, adapter, component, API, job, event, policy, package, library, or repository?
- Would a smaller spec be clearer?
- Is this spec trying to own several unrelated things?

If the draft is too broad, split it before implementation starts.

### 2. Check intended behavior

Read each `Must`, `Must not`, `Handles`, `Raises`, `Returns`, `Scenario`, and `Example`.

Ask:

- Is this behavior intended, or just how the current code happens to work?
- Does the rule describe an outcome?
- Can a reviewer tell whether a diff satisfies it?
- Does the rule avoid unnecessary implementation detail?

Rewrite vague rules before they guide work.

### 3. Check authority and ownership

Look for:

```sdd
Owns:
  ./itinerary-validation.js

Can modify:
  ./itinerary-validation.js
  ./itinerary-validation.test.js
```

Ask:

- Are owned paths local to the spec?
- Is writable scope clear?
- Does the spec try to modify paths owned by another area?
- Are read-only relationships represented with `Can read` or `References` instead of edit authority?

Authority mistakes are easiest to fix before code changes.

### 4. Check boundaries

Good drafts say what not to do:

```sdd
Must not:
  Change destination search behavior.

Forbids:
  ../booking/*
```

Ask:

- What plausible wrong change should this spec prevent?
- Are non-goals visible in `Must not`?
- Are blocked dependencies, paths, libraries, tools, or access represented in `Forbids`?
- Is the spec listing every unrelated thing instead of only meaningful local boundaries?

### 5. Check inherited constraints

Compare the draft against its parent context.

The draft must not:

- weaken parent `Must not` rules
- use dependencies blocked by parent `Forbids`
- expand modification authority beyond the local scope
- copy parent constraints unnecessarily
- use tasks to justify violating inherited architecture

If a conflict exists, resolve the spec conflict before implementation.

### 6. Check ambiguity

Mark unresolved questions explicitly:

```sdd
Tasks:
  [?] Confirm whether blank place names are rejected or auto-filled from recent destinations.
```

Do not let a draft hide product, compatibility, security, performance, or ownership uncertainty inside confident
language.

### 7. Check testability

Ask:

- Which `Must` rules need checks?
- Which `Must not` rules need regression coverage?
- Which `Scenario` entries should become test cases?
- Does `Done when` define reviewable completion?
- Are observability, compatibility, or performance rules measurable enough to verify?

If there is no reasonable way to check the behavior, revise the spec.

### 8. Decide whether it is ready

Use one of three outcomes:

- Accept the spec and use it for implementation.
- Revise the spec and review it again.
- Split or defer the spec because scope or decisions are not ready.

Do not implement against a draft that still contains blocking ambiguity.

## Review checklist

- The subject is local and named clearly.
- The level is appropriate.
- Intended behavior is separated from accidental current behavior.
- Ownership and writable scope are explicit where needed.
- Non-goals and forbidden work are visible.
- Dependencies and references are intentional.
- Parent constraints are respected.
- Open questions are marked.
- Tasks are local.
- `Done when` makes completion checkable.

## Common mistakes

- Treating generated specs as authority without review.
- Preserving accidental legacy behavior as intended behavior.
- Accepting vague rules because the implementation seems obvious.
- Skipping parent-context checks.
- Reviewing grammar but not ownership, behavior, and testability.

## How to verify the result

The draft is ready when a reviewer can explain:

- what the spec governs
- what behavior must hold
- what must not change
- what may be edited
- what remains uncertain
- how implementation will be checked

## Related how-tos

- [How to review agent-generated specs](/how-to/code-review-and-governance/how-to-review-agent-generated-specs/)
- [How to review a spec-only pull request](/how-to/code-review-and-governance/how-to-review-a-spec-only-pull-request/)
- [How to choose the right spec level](/how-to/spec-writing-technique/how-to-choose-the-right-spec-level/)
- [How to split a large spec](/how-to/spec-writing-technique/how-to-split-a-large-spec/)

## Related reference

- [Language reference](/language-reference/)
