---
title: "How to stop agents from overengineering"
seoDescription: "Stop agents from overengineering by using spec-driven development tasks, Done when criteria, Must not boundaries, and focused review before implementation expands."
excerpt: "Use SpecDD to keep agent work small: write bounded tasks, define Done when criteria, block tempting non-goals, and reject plans that add unnecessary abstractions."
level: "Intermediate"
howtoID: "1041004"
weight: 65
---

This guide shows you how to use SpecDD in a spec-driven development workflow to keep an agent from turning a small
requested change into a broad refactor, new framework, extra abstraction, or unrelated feature expansion.

SpecDD prevents overengineering by making scope reviewable. The agent can still suggest improvements, but the spec tells
everyone what the current change is allowed to accomplish and when it should stop.

## Short answer

Use `Tasks` for the current work, `Done when` for stopping criteria, `Must` for required behavior, and `Must not` or
`Forbids` for likely wrong expansions. Ask for a plan first, reject any step that is not needed to satisfy the spec, and
accept only changes that can be tied back to the contract.

## When to use this guide

Use this guide when an agent:

- adds a new abstraction for a one-rule change
- rewrites tests broadly instead of adding focused coverage
- changes adjacent features because they import the same code
- introduces dependencies not required by the spec
- expands a bug fix into a redesign
- keeps doing cleanup after the requested behavior is complete

## Steps

### 1. Write the smallest useful task

Use a task that describes the work packet, not a broad improvement theme.

Good:

```sdd
Tasks:
  [ ] Add missing-place validation.
```

Too broad:

```sdd
Tasks:
  [ ] Improve itinerary validation and structure.
```

The first task can be implemented, checked, and marked done. The second invites redesign.

### 2. Add `Done when` criteria

`Done when` tells the agent when to stop.

```sdd
Done when:
  Missing-place behavior is covered by a check.
  Existing itinerary ordering still passes.
  No destination search behavior changes.
```

This is more useful than "make validation robust" because it gives concrete acceptance criteria and a boundary.

### 3. State the required behavior with `Must`

Use `Must` for durable outcomes:

```sdd
Must:
  Missing place names are rejected before an itinerary item is stored.
  Existing itinerary items remain unchanged when validation fails.
```

The implementation can use any appropriate local technique, but it should not invent additional behavior unless the spec
requires it.

### 4. Name non-goals with `Must not`

Add negative rules only for plausible mistakes:

```sdd
Must not:
  Change destination search behavior.
  Add booking purchase behavior.
```

These rules help agents avoid nearby responsibilities that sound related but belong elsewhere.

### 5. Use `Forbids` for dependency and architecture limits

When overengineering usually appears as a new dependency or architectural shortcut, make that explicit:

```sdd
Forbids:
  New validation framework dependency for itinerary validation.
  Direct booking API access from itinerary behavior.
```

Do this sparingly. A `Forbids` rule should protect a real boundary, dependency policy, or risk.

### 6. Ask for a plan before implementation

Use:

```text
Plan the missing-place validation change.
```

Review the plan for expansion. Watch for phrases such as:

- "create a generic validation framework"
- "refactor the entire trip module"
- "standardize all validation behavior"
- "update related destination behavior"
- "replace the storage layer"

Those may be valid future tasks, but they are not automatically part of the current spec.

### 7. Implement only the approved scope

After plan review:

```text
Implement the approved missing-place validation plan.
```

If the agent discovers a real missing rule while implementing, stop and update the spec rather than letting the code
silently grow beyond the contract.

### 8. Review the diff for unnecessary structure

Before accepting the change, ask:

- Did the agent add files not required by `Done when`?
- Did it introduce abstractions that are not needed for the specified behavior?
- Did it modify sibling features without authority?
- Did it add dependencies blocked by `Forbids` or project conventions?
- Did it leave the task open if verification did not happen?

Use:

```text
Review this change against the Itinerary spec.
```

## Example

```sdd
Spec: Itinerary

Purpose:
  Keep a trip itinerary organized by day.

Can modify:
  ./itinerary.js
  ./itinerary.test.js

Must:
  Missing place names are rejected before an itinerary item is stored.
  Existing itinerary items remain unchanged when validation fails.

Must not:
  Change destination search behavior.
  Redesign trip storage.

Forbids:
  New validation framework dependency for this change.

Tasks:
  [ ] Add missing-place validation.

Done when:
  Missing-place behavior is covered by a check.
  Existing itinerary ordering still passes.
```

## Common mistakes

- Writing `Done when` as a vague quality statement instead of a checkable stop condition.
- Asking for "clean up while implementing" during a bounded behavior change.
- Accepting a new abstraction because it sounds reusable but no spec needs it.
- Letting the agent mark a task complete before checks prove the stop conditions.
- Treating an agent's optional suggestions as part of the approved scope.

## How to verify the result

You have controlled overengineering when:

- the implementation is no broader than the task
- every new file or abstraction is justified by the spec
- `Done when` criteria are satisfied and not expanded silently
- forbidden dependencies and non-goals are untouched
- future ideas are captured as separate tasks or spec updates instead of bundled into the change

## Related how-tos

- [How to ask an agent to plan before coding](/how-to/agent-workflows/how-to-ask-an-agent-to-plan-before-coding/)
- [How to keep agents from changing the wrong files](/how-to/agent-workflows/how-to-keep-agents-from-changing-the-wrong-files/)
- [How to stop an agent when the spec is ambiguous](/how-to/agent-workflows/how-to-stop-an-agent-when-the-spec-is-ambiguous/)

## Related reference

- [Language reference](/language-reference/)
