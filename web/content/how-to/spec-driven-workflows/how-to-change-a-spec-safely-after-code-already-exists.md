---
title: "How to change a spec safely after code already exists"
seoDescription: "Change an existing SpecDD spec safely in a spec-driven development workflow by comparing current code, deciding intended behavior, updating the owning spec, and aligning implementation, checks, and task status."
excerpt: "Update a SpecDD spec after code exists without codifying bugs, creating drift, or changing write authority accidentally."
level: "Intermediate"
howtoID: "1081009"
weight: 100
---

This guide shows you how to change a SpecDD spec safely after code already exists in a spec-driven development workflow.

Changing a spec is changing the local contract. That may be a normal part of spec-first development, or it may be a
sign that the code and spec have drifted. The safe workflow is to decide which behavior is intended, update the owning
spec deliberately, and align code, tests, tasks, and docs in the same review path.

## Short answer

Before changing an existing spec, identify whether you are documenting current behavior, changing intended behavior, or
recovering from drift. Compare the current code and checks with the governing spec chain, update the owning `.sdd` file,
add tasks and `Done when` criteria for unfinished work, and keep implementation and verification aligned.

## When to use this guide

Use this guide when:

- code already exists and the spec needs a behavior update
- a review finds the spec is too vague or too broad
- implementation revealed a missing edge case
- an existing behavior should become an explicit contract
- an old rule needs to be narrowed or replaced
- a spec change could affect public behavior, security, or architecture

## Steps

### 1. Identify why the spec is changing

Name the change type before editing:

- **Document current behavior:** code already does this and the behavior is intended
- **Change intended behavior:** code must be updated after the spec changes
- **Recover drift:** spec and code disagree and one side is wrong
- **Narrow authority:** the spec currently allows too much
- **Broaden authority:** a reviewed change needs more writable scope

This classification affects the rest of the workflow. A spec-only documentation update is different from a behavior
change that must be implemented.

### 2. Find the owning spec

Edit the spec that owns the behavior or boundary.

For:

```text
src/trips/itinerary.js
```

the owning local spec might be:

```text
src/trips/itinerary.sdd
```

If the rule applies to the whole trip module, update the trip module spec instead. Do not duplicate the same parent
constraint in several child specs.

### 3. Compare current behavior

Before editing, compare:

- current code
- current tests or checks
- the nearest local spec
- inherited parent specs
- explicit references that affect the behavior
- task status

Do not assume the code is correct just because it exists. Existing behavior might be intentional, accidental, obsolete,
or a bug.

### 4. Decide the intended contract

Choose one of these outcomes:

- keep the spec and fix code
- keep the code and update the spec
- change both code and spec
- mark the decision `[?]` when ownership or behavior is unresolved
- mark the work `[!]` when implementation is blocked by a conflict or missing authority

When behavior affects security, destructive operations, access control, public contracts, or migrations, get the
decision reviewed before implementation.

### 5. Edit the spec deliberately

Update durable behavior in durable sections:

```sdd
Must:
  Reject itinerary items without a place name.
  Keep existing itinerary items unchanged when validation fails.

Done when:
  Missing-place validation is covered by a check.

Scenario: missing place name
  Given the place name is empty
  When the person adds the itinerary item
  Then validation fails
  And no itinerary item is stored
```

If the code does not satisfy the new contract yet, add an open task:

```sdd
Tasks:
  [ ] Implement missing-place validation.
```

That makes the gap visible instead of pretending the new contract is already complete.

### 6. Align code and checks

If the spec change requires implementation, complete the change through the normal loop:

```text
Implement the Itinerary validation task.
```

Then run checks and update task status only after verification.

If the spec change documents behavior that already exists, still verify it. Existing tests, examples, or manual checks
should support the claim.

### 7. Review the contract change

Review the spec diff as carefully as the code diff:

- Did the spec change broaden write authority?
- Did it weaken a `Must not` or `Forbids` rule?
- Did it move behavior to the right owner?
- Does it describe intended behavior rather than current accidental behavior?
- Are tasks open when code does not yet satisfy the new rule?
- Do checks prove the behavior that changed?

Spec changes are not harmless text edits. They are changes to how future humans and agents will work in that area.

## Example

Before:

```sdd
Spec: Itinerary

Purpose:
  Keep a trip itinerary organized by day.

Owns:
  ./itinerary.js

Must:
  Store itinerary items with a place name and trip date.
```

After discovering the code currently accepts empty place names, the intended contract is tightened:

```sdd
Spec: Itinerary

Purpose:
  Keep a trip itinerary organized by day.

Owns:
  ./itinerary.js
  ./itinerary.test.js

Must:
  Reject itinerary items without a place name.
  Store valid itinerary items with a place name and trip date.

Tasks:
  [ ] Implement missing-place validation.

Done when:
  Missing-place validation is covered by a check.
```

The open task makes the difference between intended behavior and current implementation visible.

## Agent prompt

Use one prompt for planning:

```text
Plan the Itinerary spec change.
```

Use a separate prompt after review:

```text
Implement the approved Itinerary spec change.
```

## Common mistakes

- Changing a spec to match code without deciding whether the code is intended.
- Adding a new `Must` rule while leaving no task for code that does not satisfy it.
- Broadening `Can modify` to make a current patch easier to land.
- Weakening `Must not` or `Forbids` without reviewing the inherited architecture impact.
- Treating a spec-only pull request as low risk when it changes future implementation authority.

## How to verify the result

The spec change is safe when:

- the owning spec was updated
- current code and checks were compared before the edit
- any code/spec gap is visible through tasks or implementation changes
- security, destructive, or public-contract changes were reviewed
- task status, checks, and scenarios match the new contract
- future contributors can tell what changed and why

## Related how-tos

- [How to keep specs in sync with code changes](/how-to/spec-driven-workflows/how-to-keep-specs-in-sync-with-code-changes/)
- [How to recover from spec-code drift](/how-to/spec-driven-workflows/how-to-recover-from-spec-code-drift/)
- [How to deprecate behavior with SpecDD](/how-to/spec-driven-workflows/how-to-deprecate-behavior-with-specdd/)
- [How to ask an agent to update the spec after discovering missing context](/how-to/agent-workflows/how-to-ask-an-agent-to-update-the-spec-after-discovering-missing-context/)

## Related reference

- [Language reference](/language-reference/)
