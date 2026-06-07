---
title: "How to stop an agent when the spec is ambiguous"
seoDescription: "Stop an agent when a SpecDD spec is ambiguous in a spec-driven development workflow by identifying unresolved decisions, marking tasks correctly, updating the spec, and resuming only after review."
excerpt: "Use SpecDD ambiguity handling to pause implementation, record decisions with task states, update the local spec, and prevent agents from guessing."
level: "Intermediate"
howtoID: "1041012"
weight: 150
---

This guide shows you how to stop an agent when the governing SpecDD spec is ambiguous in a spec-driven development
workflow.

Stopping is part of the workflow. If the spec does not grant enough authority or does not define the behavior, the right
move is to pause, make the missing decision visible, update the spec, and resume from the reviewed contract.

## Short answer

When an agent finds ambiguity, do not let it guess. Ask it to identify the unresolved decision, mark or add a
decision-needed task when appropriate, update the spec after human review, and resume with a separate implementation
prompt.

## When to use this guide

Use this guide when:

- two spec rules appear to conflict
- a task says what to build but not what done means
- writable authority is missing or unclear
- a referenced spec affects behavior but does not grant edit permission
- a scenario leaves an important branch undefined
- the agent proposes multiple interpretations and asks which one is intended

## Steps

### 1. Recognize ambiguity early

Ambiguity may show up as:

- no local spec for the target
- no `Can modify` or `Owns` authority for needed files
- conflicting parent and child rules
- a broad task with no `Done when`
- a `Must` rule that is not testable
- a decision-needed task marker

Example:

```sdd
Tasks:
  [?] Decide whether duplicate places are allowed on the same day.
```

The `[?]` state means implementation should not silently choose a rule.

### 2. Pause implementation

Use:

```text
List the unresolved Itinerary decisions.
```

If files have already changed, review the diff carefully and decide whether to keep, revise, or discard those edits
through your normal workflow. Do not mark the task complete while the governing decision is open.

### 3. Classify the ambiguity

The fix depends on the problem:

| Ambiguity | SpecDD response |
| --- | --- |
| missing writable authority | add or revise `Can modify` or `Owns` |
| missing behavior | add a `Must`, `Done when`, or `Scenario` |
| unclear non-goal | add `Must not` |
| forbidden dependency question | add or revise `Forbids` |
| outside context needed | add `References` or `Can read` |
| human decision required | use a `[?]` task until resolved |

### 4. Record the decision needed

If the decision is not ready, keep it in `Tasks`:

```sdd
Tasks:
  [?] Decide whether duplicate places are allowed on the same day.
```

If work is blocked on external information, use:

```sdd
Tasks:
  [!] Confirm storage retry policy.
```

These states preserve the reason implementation stopped.

### 5. Update the spec after review

Once the decision is made, update the relevant rule:

```sdd
Must:
  A place can appear only once on the same trip day.

Done when:
  Duplicate-place behavior is covered by a check.

Scenario: duplicate place on same day
  Given the itinerary already contains "Louvre Museum" for June 12
  When "Louvre Museum" is added again for June 12
  Then validation fails
  And the itinerary keeps one entry for June 12
```

Use:

```text
Update the Itinerary spec with the approved duplicate-place rule.
```

### 6. Resume with a bounded prompt

After the spec is reviewed:

```text
Plan the duplicate-place validation change.
```

Then:

```text
Implement the approved duplicate-place validation plan.
```

Do not resume from the old ambiguous instruction. Resume from the updated contract.

## Common mistakes

- Letting the agent pick one interpretation because it seems reasonable.
- Marking a decision-needed task done without adding the actual rule.
- Changing code first and hoping review will clarify the spec later.
- Treating referenced context as writable authority to get unstuck.
- Leaving the decision in a chat message instead of the local spec.

## How to verify the result

Ambiguity was handled correctly when:

- implementation stopped before unsupported edits continued
- the missing decision is visible in the spec or task state
- the updated spec is reviewed before implementation resumes
- the follow-up plan uses the new rule
- checks prove the newly specified behavior

## Related how-tos

- [How to ask an agent to update the spec after discovering missing context](/how-to/agent-workflows/how-to-ask-an-agent-to-update-the-spec-after-discovering-missing-context/)
- [How to ask an agent to explain a spec before implementation](/how-to/agent-workflows/how-to-ask-an-agent-to-explain-a-spec-before-implementation/)
- [How to review an agent plan against a spec](/how-to/agent-workflows/how-to-review-an-agent-plan-against-a-spec/)

## Related reference

- [Language reference](/language-reference/)
