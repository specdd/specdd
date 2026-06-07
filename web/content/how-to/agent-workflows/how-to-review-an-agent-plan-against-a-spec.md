---
title: "How to review an agent plan against a spec"
seoDescription: "Review an agent plan against a SpecDD spec in a spec-driven development workflow by checking authority, required behavior, prohibited behavior, verification, and unresolved decisions."
excerpt: "Use a SpecDD review checklist before implementation so an agent plan stays inside authority, satisfies the spec, avoids forbidden work, and names checks."
level: "Intermediate"
howtoID: "1041002"
weight: 45
---

This guide shows you how to review an agent's plan before implementation in a spec-driven development workflow.

The goal is not to make the plan longer. The goal is to catch wrong authority, missing requirements, broad edits, and
ambiguous decisions while the work is still cheap to change.

## Short answer

Compare the plan to the governing SpecDD contract. Approve only when the plan names the relevant spec, proposes edits
inside `Can modify` or `Owns`, preserves inherited `Must not` and `Forbids`, satisfies `Must`, uses `Done when` or
scenarios for checks, and calls out unresolved decisions.

## When to use this guide

Use this guide when:

- an agent has produced a plan but has not edited files yet
- a change touches behavior, tests, dependencies, or architecture boundaries
- multiple specs may affect the target
- a reviewer needs a quick way to reject or revise a plan
- the plan sounds plausible but you need to verify it against local authority

## Steps

### 1. Identify the plan's target

The plan should have a clear subject:

```text
Plan the Itinerary validation change.
```

When reviewing, ask: which spec, feature, task, or behavior is this plan actually about?

If the plan cannot answer that, it is not ready. A plan for "the trip area" may include too much. A plan for "the
missing-place validation task" can be checked against a local contract.

### 2. Check the writable scope

Look for `Can modify` first. If `Can modify` is absent, use `Owns` as the modification boundary.

```sdd
Spec: Itinerary

Owns:
  ./itinerary.js
  ./itinerary.test.js

Can read:
  ../storage/trip-storage.sdd
```

A correct plan can propose edits to `itinerary.js` and `itinerary.test.js`. It can read the storage spec for context.
It should not edit storage files unless another applicable local spec grants authority.

Reject or revise the plan if it proposes:

- sibling modules with no explicit authority
- files listed only as `Can read`
- referenced specs as writable targets
- paths blocked by `Forbids`
- generated or external files the project conventions prohibit editing

### 3. Check parent and local constraints together

SpecDD uses vertical inheritance. Parent specs provide context and constraints. Child specs add or narrow them.

This means a plan must preserve:

- root project rules
- directory-level architecture boundaries
- local feature requirements
- local `Must not` and `Forbids`

If a parent says the trip area must not manage bookings, an itinerary-level plan cannot add booking behavior even if the
local itinerary spec does not repeat that rule.

### 4. Map plan steps to required behavior

Every meaningful implementation step should connect to a spec rule, task, scenario, or completion criterion.

Useful plan step:

```text
Add validation so a missing place name fails before the itinerary item is stored.
```

Weak plan step:

```text
Improve itinerary validation.
```

The first is reviewable against `Must`. The second leaves room for extra behavior.

### 5. Look for overreach

Plans often go wrong by adding work that sounds adjacent:

- "while here" refactors
- new dependencies
- new abstractions
- UI changes for a backend rule
- updates to another feature because it imports the same module
- broad test rewrites instead of focused coverage

SpecDD plans should be small enough that a reviewer can compare them to the spec. If the plan adds scope, ask for a
narrower revision:

```text
Narrow the Itinerary validation plan.
```

### 6. Check verification

The plan should name the checks that prove completion.

When a spec has:

```sdd
Done when:
  Missing-place behavior is covered by a check.
  Existing itinerary ordering still passes.
```

the plan should include a missing-place check and an ordering regression check, or explain why one cannot be run.

Do not accept "run tests" as enough if the spec names a particular behavior and the plan never says how that behavior is
covered.

### 7. Decide approve, revise, or stop

Use three outcomes:

- approve when the plan is scoped, authorized, and checkable
- revise when the plan is mostly correct but vague or too broad
- stop when the spec is missing, contradictory, or does not grant authority

For approval:

```text
Implement the approved Itinerary validation plan.
```

For revision:

```text
Revise the Itinerary validation plan.
```

For ambiguity:

```text
Pause the Itinerary change and list the unresolved decisions.
```

## Review checklist

Before implementation, ask:

- Does the plan name the actual spec, feature, task, or behavior?
- Are proposed edits inside the nearest local authority?
- Are parent constraints preserved?
- Are `Must not` and `Forbids` treated as blockers?
- Does the plan avoid broad cleanup and unrelated refactors?
- Do checks match `Done when` and scenarios?
- Does the plan identify ambiguity instead of guessing?

## Common mistakes

- Reviewing the plan for plausibility instead of authority.
- Treating a referenced spec as if it grants write permission.
- Letting a broad test rewrite hide unauthorized behavior changes.
- Approving a plan that says "update related modules" without naming local authority.
- Skipping plan review because the agent has usually been right before.

## How to verify the result

You reviewed the plan effectively when:

- the implementation matches the approved plan
- changed files match allowed paths
- no forbidden boundaries were crossed
- the final report names checks and any skipped checks
- any spec ambiguity was resolved before implementation

## Related how-tos

- [How to ask an agent to plan before coding](/how-to/agent-workflows/how-to-ask-an-agent-to-plan-before-coding/)
- [How to keep agents from changing the wrong files](/how-to/agent-workflows/how-to-keep-agents-from-changing-the-wrong-files/)
- [How to stop agents from overengineering](/how-to/agent-workflows/how-to-stop-agents-from-overengineering/)

## Related reference

- [Language reference](/language-reference/)
