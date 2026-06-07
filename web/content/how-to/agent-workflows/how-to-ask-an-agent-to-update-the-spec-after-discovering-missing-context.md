---
title: "How to ask an agent to update the spec after discovering missing context"
seoDescription: "Ask an agent to update a SpecDD spec in a spec-driven development workflow after missing context is discovered by proposing, reviewing, applying, and verifying a contract change before coding."
excerpt: "When implementation reveals missing context, use SpecDD to stop guessing, draft a spec update, review it, apply the approved rule, and resume from the updated contract."
level: "Intermediate"
howtoID: "1041013"
weight: 160
---

This guide shows you how to ask an agent to update a spec after implementation reveals missing context in a spec-driven development workflow.

Missing context is not a prompt failure by itself. It is a signal that a durable rule may be absent from the local
contract. SpecDD gives you a clean way to turn that discovery into reviewed project context before code grows around a
guess.

## Short answer

Pause implementation, ask the agent to propose a spec update for the missing behavior or boundary, review the proposal,
apply only the approved rule, then resume implementation from the updated spec.

## When to use this guide

Use this guide when the agent discovers:

- required behavior that is not in `Must`
- a non-goal that is not in `Must not`
- a dependency or path that should be forbidden
- a file that must be edited but lacks authority
- a scenario that exposes an undefined edge case
- a task that needs a human decision before implementation

## Steps

### 1. Stop implementation before guessing

If the agent reports missing context, do not approve a best-effort implementation.

Use:

```text
List the missing Itinerary context.
```

Review whether the missing context is actually durable. If it only affects the current conversation, it may not belong in
a spec. If it should guide future humans and agents, update the spec.

### 2. Identify the right spec to update

Update the nearest spec that owns the behavior.

For itinerary validation, that might be:

```text
src/trips/itinerary.sdd
```

Do not put local behavior in a root spec just because the root spec is easy to find. Root specs should carry broad
project intent and constraints. Local behavior belongs close to the files it governs.

### 3. Ask for a proposal, not direct implementation

Use:

```text
Propose an Itinerary spec update for save-failure behavior.
```

The proposal should describe what section changes are needed and why. It should not immediately broaden code changes.

### 4. Review the proposal

Check whether the proposed update:

- belongs in the selected spec
- uses valid SpecDD sections
- states durable behavior, not a one-off task instruction
- preserves inherited constraints
- avoids granting unnecessary write authority
- adds `Done when` or a scenario when verification needs clarification

For example:

```sdd
Must:
  Save failures return a validation result without storing a partial itinerary item.

Done when:
  Save-failure behavior is covered by a check.

Scenario: save failure
  Given itinerary storage fails
  When the person adds a valid itinerary item
  Then the operation reports a save failure
  And no partial itinerary item is stored
```

### 5. Apply the approved update

After review:

```text
Update the Itinerary spec with the approved save-failure rule.
```

If the update creates a new task, keep task status accurate:

```sdd
Tasks:
  [ ] Add save-failure handling.
```

Do not mark the task done as part of the spec update unless implementation and checks are already complete.

### 6. Resume implementation from the updated contract

Use:

```text
Plan the save-failure handling change.
```

After plan review:

```text
Implement the approved save-failure handling plan.
```

The implementation should now follow the updated spec instead of the original ambiguous prompt.

## Best practices

- Treat spec updates as contract changes, not cleanup.
- Keep new rules local to the area they govern.
- Review agent-drafted specs before implementation.
- Add scenarios when the missing context is an edge case.
- Use `[?]` tasks for unresolved decisions.
- Keep prompts separate: propose, update, plan, implement.

## Common mistakes

- Letting the agent update code and spec at the same time before the new rule is reviewed.
- Putting a local behavior rule in `.specdd/bootstrap.project.md`.
- Adding broad write authority because one file was missing.
- Recording a decision in chat but not in the spec.
- Marking a new task complete during the spec update.

## How to verify the result

The spec update workflow worked when:

- implementation paused before the agent guessed
- the approved rule appears in the right `.sdd` file
- the update uses valid SpecDD sections and indentation
- the follow-up plan references the new rule
- implementation and checks satisfy the updated contract

## Related how-tos

- [How to stop an agent when the spec is ambiguous](/how-to/agent-workflows/how-to-stop-an-agent-when-the-spec-is-ambiguous/)
- [How to use specs as agent memory](/how-to/agent-workflows/how-to-use-specs-as-agent-memory/)
- [How to run your first spec-driven change end to end](/how-to/getting-started/how-to-run-your-first-spec-driven-change-end-to-end/)

## Related reference

- [Language reference](/language-reference/)
