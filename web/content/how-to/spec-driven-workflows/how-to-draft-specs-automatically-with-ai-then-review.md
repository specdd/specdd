---
title: "How to draft specs automatically with AI, then review"
seoDescription: "Draft SpecDD specs with AI for spec-driven development by generating a first pass from code or a feature idea, marking assumptions, reviewing boundaries, and approving before implementation."
excerpt: "Use AI-generated SpecDD drafts as a starting point, then review ownership, behavior, assumptions, write authority, and completion criteria."
level: "Intermediate"
howtoID: "1081001"
weight: 20
---

This guide shows you how to use AI to draft SpecDD specs for spec-driven development without letting the generated
draft become accidental authority. The useful workflow is draft, review, edit, then implement.

AI can make the blank page easier. SpecDD keeps that useful by making the human review step explicit: the draft is not
the contract until you have checked the behavior, boundaries, assumptions, and completion criteria.

## Short answer

Ask an agent to draft a `.sdd` spec for one area, but do not let it change implementation files. Review the draft for
observed behavior, intended behavior, uncertain assumptions, ownership, write authority, `Must not` rules, and `Done
when` criteria. Only after the reviewed spec is accurate should implementation start.

## When to use this guide

Use this guide when:

- an existing module needs its first local spec
- a feature idea is clear enough to describe but not ready to implement
- a legacy area has behavior scattered across code and tests
- a team wants faster first drafts without skipping human review
- an agent would otherwise infer architecture from code alone

## Background

SpecDD supports two healthy spec-writing modes. You can write the spec manually, or you can ask an AI agent to draft
the first version and then review it. Both modes work as long as implementation is driven by reviewed specs.

The risk is treating generated text as truth. An agent can describe accidental behavior, old bugs, naming coincidences,
or inferred architecture as if they were deliberate contracts. Review exists to prevent that draft from becoming a
permanent source of truth by accident.

## Steps

### 1. Choose the draft scope

Draft one spec at the nearest useful boundary. Good targets include:

- one same-basename spec for one source file
- one directory-level spec for a small module
- one service, adapter, component, job, event, or policy
- one workflow with clear inputs and outputs

Avoid asking for a whole-repository spec draft unless you are intentionally creating only a minimal root spec. Large AI
drafts tend to mix current file inventory, inferred architecture, and unrelated future work.

### 2. Ask for a spec draft only

Use one prompt for the drafting action:

```text
Draft the Itinerary spec from current behavior.
```

For a feature idea:

```text
Draft the itinerary validation spec from this feature idea.
```

If the agent mixes implementation into the draft, stop and separate the actions. Spec authoring and implementation are
different steps in the SpecDD workflow.

### 3. Separate facts from assumptions

Read the draft and classify each meaningful statement:

- **Keep:** the statement is clearly true or intended
- **Edit:** the statement is close but too broad, vague, or implementation-heavy
- **Question:** the statement might be true but needs a decision
- **Delete:** the statement describes accidental behavior or unrelated scope

Use task markers for unresolved decisions when useful:

```sdd
Tasks:
  [?] Confirm whether duplicate itinerary places are allowed.
  [!] Decide how save failures should be shown.
```

Do not hide uncertainty in confident `Must` language. A generated assumption should stay visible until someone reviews
it.

### 4. Review ownership and write authority

Check whether the draft gives the spec too much control.

Too broad:

```sdd
Owns:
  ./trips
  ./destinations
  ./booking
```

Better for a local itinerary spec:

```sdd
Owns:
  ./itinerary.js
  ./itinerary.test.js

Can read:
  ../destinations/destination-search.sdd

Must not:
  Change destination search behavior.
  Manage booking or ticket purchase behavior.
```

`Can read` and `References` provide context. They do not grant edit permission. If the draft treats another area's
contract as writable authority, fix it before implementation.

### 5. Tighten behavior and boundaries

Replace vague goals with observable rules.

Vague:

```sdd
Must:
  Improve itinerary quality.
```

Actionable:

```sdd
Must:
  Reject itinerary items without a place name.
  Keep existing itinerary items unchanged when validation fails.
```

Add `Must not` only for plausible local boundary mistakes. Do not fill the draft with a list of every unrelated thing
the subject does not do.

### 6. Add tasks and done criteria

Generated drafts often describe the area but forget the work packet. Add local tasks and completion criteria before
implementation:

```sdd
Tasks:
  [ ] Add missing-place validation.
  [ ] Add a check for unchanged itinerary state after validation failure.

Done when:
  Missing-place behavior is covered by a check.
  Existing itinerary behavior still passes.
  No destination search or booking files are modified.
```

Tasks should usually be implementable inside the local `Owns` or `Can modify` boundary. If the task requires other
areas, either split the work or revise the spec chain deliberately.

### 7. Approve the spec before implementation

After review, the spec should be ready to act as a contract:

```sdd
Spec: Itinerary

Purpose:
  Keep a trip itinerary organized by day.

Owns:
  ./itinerary.js
  ./itinerary.test.js

Can read:
  ../destinations/destination-search.sdd

Must:
  Reject itinerary items without a place name.
  Keep existing itinerary items unchanged when validation fails.

Must not:
  Change destination search behavior.
  Manage booking or ticket purchase behavior.

Tasks:
  [ ] Add missing-place validation.

Done when:
  Missing-place behavior is covered by a check.
  No destination search or booking files are modified.

Scenario: missing place name
  Given the place name is empty
  When the person adds the itinerary item
  Then validation fails
  And no itinerary item is stored
```

Only then move to implementation:

```text
Implement the Itinerary validation task.
```

## Review checklist

Before treating an AI-drafted spec as source of truth, check:

- the spec describes the resulting subject, not the drafting task
- local ownership is narrow enough for the target
- `Can read` and `References` are not confused with edit permission
- `Must` rules state intended behavior, not accidental bugs
- `Must not` rules prevent realistic boundary mistakes
- uncertain assumptions are marked as decisions or blockers
- tasks are local and do not override inherited constraints
- `Done when` gives reviewers a clear finish line

## Common mistakes

- Asking for a whole-project draft when the next work needs one local spec.
- Accepting generated assumptions as `Must` rules without review.
- Letting the draft copy current bugs into the permanent contract.
- Using `References` to pull in sibling context and then editing that sibling area.
- Asking for draft and implementation in the same prompt.

## How to verify the result

The AI-assisted drafting workflow worked when:

- the generated spec was reviewed before implementation
- unsupported assumptions were removed, marked `[?]`, or marked `[!]`
- the final spec has clear ownership, behavior, and completion criteria
- implementation begins only after the spec is approved
- reviewers can distinguish AI draft text from reviewed contract text

## Related how-tos

- [How to write your first .sdd spec](/how-to/getting-started/how-to-write-your-first-sdd-spec/)
- [How to prompt an agent with SpecDD](/how-to/agent-workflows/how-to-prompt-an-agent-with-specdd/)
- [How to implement one spec at a time](/how-to/spec-driven-workflows/how-to-implement-one-spec-at-a-time/)
- [How to change a spec safely after code already exists](/how-to/spec-driven-workflows/how-to-change-a-spec-safely-after-code-already-exists/)

## Related reference

- [Quickstart](/quickstart/)
- [Language reference](/language-reference/)
