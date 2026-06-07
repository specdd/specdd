---
title: "How to define acceptance criteria for implementation"
seoDescription: "Define implementation acceptance criteria with spec-driven development by turning behavior, boundaries, scenarios, and Done when entries into testable review targets."
excerpt: "Use SpecDD to write acceptance criteria that are behavioral, local, testable, and clear enough for humans and agents to implement and review."
level: "Beginner"
howtoID: "1131002"
weight: 30
---

This guide shows you how to define acceptance criteria for implementation with SpecDD in a spec-driven development workflow.

Acceptance criteria should tell a contributor what behavior must be true when the work is complete. In SpecDD, those
criteria should not live only in a ticket, chat thread, or pull request description. Durable behavior belongs in the
local spec that owns it.

Good SpecDD acceptance criteria are behavioral, local, observable, and reviewable. They guide implementation, testing,
and code review without turning the spec into a long requirements document.

## Short answer

Use `Must` for required behavior, `Must not` for boundaries and non-goals, `Scenario` for concrete examples, and
`Done when` for completion criteria. Keep acceptance criteria tied to the spec's local subject. If a criterion cannot be
observed, tested, or reviewed, rewrite it before implementation starts.

## When to use this guide

Use this guide when:

- a ticket has vague acceptance criteria
- an agent needs a precise implementation target
- reviewers disagree about whether a task is done
- `Done when` says only "tests pass"
- scenarios are missing for important behavior
- acceptance criteria mix behavior, planning, and implementation instructions

## The design idea

Acceptance criteria are not a checklist of activities. They are a statement of the resulting behavior and constraints.

Weak activity-based criterion:

```text
Add itinerary validation.
```

Stronger behavior-based criterion:

```sdd
Must:
  Reject itinerary items without a place name.

Done when:
  Missing-place validation is covered by a check.
```

The stronger version says what must be true and how the team will know.

## Steps

### 1. Start with intended behavior

Turn feature text into behavior:

```text
Users should not be able to save blank itinerary items.
```

Spec form:

```sdd
Must:
  Reject itinerary items without a place name.
```

Avoid acceptance criteria like:

```sdd
Must:
  Add robust validation logic.
```

That does not say which behavior is accepted.

### 2. Separate acceptance from planning

Tickets can track:

- priority
- assignee
- sprint
- release
- discussion
- cross-team coordination

Specs should keep:

- durable behavior
- local boundaries
- scenarios
- local tasks
- completion criteria

Do not put sprint timing, story points, or assignment details in `.sdd` files.

### 3. Write observable criteria

Acceptance criteria should be visible through output, state, error, event, response, log, metric, or some other
reviewable effect:

```sdd
Must:
  Preserve existing itinerary items when validation fails.
  Return a validation error when the place name is missing.
```

If the criterion is subjective, make it concrete:

Weak:

```sdd
Must:
  Show a helpful error.
```

Better:

```sdd
Must:
  Show a validation message beside the place name input when the place name is missing.
```

### 4. Add scenarios for important examples

Use `Scenario` when examples clarify the behavior:

```sdd
Scenario: missing place name
  Given the place name is empty
  When the person adds the itinerary item
  Then validation fails
  And no itinerary item is stored
```

Scenarios are especially helpful when acceptance depends on several conditions.

### 5. Add boundaries

Acceptance criteria should include what must not change when that risk is plausible:

```sdd
Must not:
  Change destination search behavior.
  Save itinerary items directly from UI components.
```

These boundaries prevent a change from satisfying the happy path while doing wrong adjacent work.

### 6. Define Done when

`Done when` connects acceptance criteria to verification:

```sdd
Done when:
  Missing-place validation is covered by a check.
  Validation failure preserves existing itinerary items.
  Destination search behavior remains unchanged.
```

Do not write only:

```sdd
Done when:
  Tests pass.
```

That is too generic. Name the checks or review evidence that matter for this behavior.

### 7. Review testability

Before implementation, ask:

- Can each criterion be observed?
- Does each criterion belong to this local spec?
- Does any criterion require another spec owner?
- Are negative boundaries clear?
- Do scenarios cover important examples?
- Does `Done when` say how completion will be checked?

If not, revise the spec before implementation.

## Weak vs strong example

Weak:

```sdd
Spec: Itinerary Improvements

Purpose:
  Make itinerary editing better.

Must:
  Improve validation.
  Show good errors.

Done when:
  It works.
```

Strong:

```sdd
Spec: Itinerary Validation

Purpose:
  Prevent incomplete itinerary items from being saved.

Must:
  Reject itinerary items without a place name.
  Preserve existing itinerary items when validation fails.

Must not:
  Change destination search behavior.

Scenario: missing place name
  Given the place name is empty
  When the person adds the itinerary item
  Then validation fails
  And no itinerary item is stored

Done when:
  Missing-place validation is covered by a check.
  Existing itinerary items remain unchanged after validation failure.
```

The strong version is implementable, testable, and reviewable.

## Common mistakes

- Keeping durable acceptance criteria only in a ticket.
- Writing activity-based criteria instead of behavior-based criteria.
- Using subjective words without observable outcomes.
- Forgetting boundaries that prevent wrong adjacent work.
- Treating `Done when: Tests pass` as enough detail.
- Adding criteria that require edits outside the spec's ownership without reviewing authority.

## How to verify the result

Acceptance criteria are ready when:

- required behavior is written in `Must`
- important negative scope is written in `Must not` or `Forbids`
- scenarios describe concrete examples
- completion criteria identify checks or review evidence
- criteria belong to the local spec owner
- contributors can implement without guessing what "done" means

## Related how-tos

- [How to write Done when](/how-to/use-spec-sections/how-to-write-done-when/)
- [How to write Scenario blocks](/how-to/use-spec-sections/how-to-write-scenario-blocks/)
- [How to write Must rules](/how-to/use-spec-sections/how-to-write-must-rules/)
- [How to decide what belongs in a ticket vs a spec](/how-to/teams-and-process/how-to-decide-what-belongs-in-a-ticket-vs-a-spec/)

## Related reference

- [Language reference](/language-reference/)
