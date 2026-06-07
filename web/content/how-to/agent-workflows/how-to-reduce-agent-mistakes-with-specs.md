---
title: "How to reduce agent mistakes with specs"
seoDescription: "Reduce agent mistakes with spec-driven development by making ownership, requirements, forbidden behavior, tasks, and verification explicit before implementation."
excerpt: "Use local SpecDD specs to reduce common agent mistakes: wrong files, missed requirements, broad scope, forgotten checks, and task status changes before verification."
level: "Intermediate"
howtoID: "1041007"
weight: 25
---

This guide shows you how to reduce agent mistakes by making local project context explicit before implementation in a spec-driven development workflow.

Agents often make the same mistakes humans make under unclear context: they change the wrong files, miss local
requirements, overgeneralize a task, ignore a boundary, or mark work complete too early. SpecDD gives those risks a
reviewable contract.

## Short answer

For the area being changed, write or update a local `.sdd` spec with `Owns` or `Can modify`, `Must`, `Must not`,
`Forbids`, `Tasks`, `Done when`, and scenarios where useful. Then ask the agent for one small task and review the plan
and diff against that spec.

## Common agent mistakes and SpecDD fixes

| Mistake | SpecDD fix |
| --- | --- |
| Changing related but unauthorized files | Use `Can modify` or `Owns` |
| Missing a required behavior | Add a specific `Must` rule |
| Adding behavior outside scope | Add realistic `Must not` boundaries |
| Introducing forbidden dependencies | Use `Forbids` |
| Guessing about external context | Use `References` or `Can read` |
| Stopping too early or too late | Add `Done when` |
| Forgetting tests or checks | Add scenarios and completion criteria |
| Losing work status across sessions | Use `Tasks` with accurate states |

## Steps

### 1. Identify the mistake you are trying to prevent

Start with a concrete failure mode:

- "the agent keeps editing storage during itinerary work"
- "the agent forgets that missing place names must fail"
- "the agent adds booking behavior to trip planning"
- "the agent marks tasks done before checks pass"

Do not write generic warnings just to make the spec longer. A good constraint prevents a real local mistake.

### 2. Define ownership and writable scope

Use `Can modify` when the edit set should be explicit:

```sdd
Can modify:
  ./itinerary.js
  ./itinerary.test.js
```

Use `Owns` when ownership and writable scope are the same:

```sdd
Owns:
  ./itinerary.js
  ./itinerary.test.js
```

This reduces wrong-file edits and gives reviewers a clear authority check.

### 3. State required behavior with `Must`

Write observable requirements:

```sdd
Must:
  Missing place names are rejected before an itinerary item is stored.
  Existing itinerary items remain unchanged when validation fails.
```

Avoid vague rules such as "handle validation well." A vague rule does not reduce mistakes because it cannot be checked.

### 4. Add local boundaries with `Must not`

Use `Must not` for plausible wrong behavior:

```sdd
Must not:
  Change destination search behavior.
  Add booking purchase behavior.
```

This prevents scope creep into nearby responsibilities.

### 5. Use `Forbids` for dependency and access mistakes

If the agent might introduce the wrong dependency or path access, make it explicit:

```sdd
Forbids:
  ../booking/*
  Direct booking API access from itinerary behavior.
```

`Forbids` is useful when a boundary is structural, not just behavioral.

### 6. Add checks with `Done when` and scenarios

Use completion criteria:

```sdd
Done when:
  Missing-place behavior is covered by a check.
  Existing itinerary ordering still passes.
```

Use a scenario when an example clarifies behavior:

```sdd
Scenario: missing place name
  Given the place name is empty
  When the person adds the itinerary item
  Then validation fails
  And no itinerary item is stored
```

This reduces errors where the agent writes code but cannot prove the requested behavior.

### 7. Prompt one narrow task

Use:

```text
Implement the missing-place validation task.
```

For larger changes:

```text
Plan the Itinerary validation change.
```

Small prompts work when the spec carries the context.

### 8. Review the result against the spec

After implementation, check:

- changed files are authorized
- each `Must` rule still holds
- no `Must not` or `Forbids` rule was violated
- scenarios are covered where practical
- task status matches verified work
- the final report names checks and uncertainty

## Best practices

- Add constraints where mistakes are likely, not everywhere.
- Keep specs small enough that agents and humans can review them in one pass.
- Use `Done when` to prevent both under-implementation and extra work.
- Prefer explicit paths for authority and context.
- Update the spec when a new durable rule is discovered.
- Ask for a plan before work that crosses boundaries or affects critical behavior.

## Common mistakes

- Writing broad "be careful" constraints that do not say what to preserve.
- Treating tests as a substitute for ownership and scope rules.
- Adding `Can read` context and then accepting edits to those files.
- Letting the agent close tasks without proving completion.
- Leaving newly discovered requirements in chat instead of updating the spec.

## How to verify the result

You are reducing agent mistakes when:

- recurring corrections become explicit spec rules
- agent plans become narrower and more concrete
- changed files match local authority
- checks line up with scenarios or `Done when`
- later agents can use the same context without a long prompt

## Related how-tos

- [How to keep agents from changing the wrong files](/how-to/agent-workflows/how-to-keep-agents-from-changing-the-wrong-files/)
- [How to stop agents from overengineering](/how-to/agent-workflows/how-to-stop-agents-from-overengineering/)
- [How to ask an agent to explain a spec before implementation](/how-to/agent-workflows/how-to-ask-an-agent-to-explain-a-spec-before-implementation/)

## Related reference

- [Language reference](/language-reference/)
