---
title: "How to start with spec-driven development"
seoDescription: "Learn how to start with spec-driven development by writing intent before implementation, keeping specs near the work, and reviewing changes against a local contract."
excerpt: "Start spec-driven development with one small change: write intent before implementation, keep the spec near the work, implement, test, and review."
level: "Beginner"
howtoID: "1001000"
weight: 10
---

Spec-driven development starts by making intent explicit before implementation. Instead of asking a developer or AI
contributor or agent to infer requirements from a vague prompt, ticket, or existing code, you write a small specification that
states what should be true, where the work belongs, and how you will know the change is complete.

SpecDD is an amazing way to do this. It keeps small `.sdd` files beside the code, documentation, workflows, or
infrastructure they govern so humans and agents can use the same source of truth.

## Short answer

Start with one small change. Write or update the nearest useful spec first, then implement only what the spec describes.
After the change, review the code, tests, and spec together. The goal is not to create a giant requirements document.
The goal is to make the next implementation decision easier, safer, and easier to review.

{{< protip title="First spec tip" >}}
Start with the next change you are actually going to make. A spec for active work is easier to verify than a broad spec
for a system you are not touching yet.
{{< /protip >}}

## When to use this guide

Use this guide when:

- you are new to spec-driven development
- you want generated changes to stay inside clearer boundaries
- implementation keeps drifting beyond the request
- repeated review comments show that important context is not written down
- you want a lightweight workflow before adopting a larger team process

## Steps

### 1. Choose one concrete change

Do not start by specifying the whole project. Pick a change that is small enough to review but important enough that
missing context would matter.

Good first targets include:

- a bug fix with clear expected behavior
- a small feature in one module
- a service with repeated boundary mistakes
- a UI component with confusing states
- an automation script where unsafe changes would be costly

Avoid starting with a full-system rewrite, a large migration, or a vague idea that has not been shaped yet.

### 2. Write intent before implementation

Before changing code, write down the outcome. A useful first spec answers a few questions:

- What is this part of the system for?
- What files, behavior, or responsibility does it own?
- What must be true after the change?
- What nearby behavior is out of scope?
- How will you know the work is done?

In SpecDD, those answers usually become sections such as `Purpose`, `Owns`, `Must`, `Must not`, `Tasks`, `Done when`,
and `Scenario`.

### 3. Put the spec near the work

Specs work best when they are close to the files they describe. If a file already exists, a same-basename `.sdd` file is
often the easiest starting point.

```text
src/trips/itinerary.js
src/trips/itinerary.sdd
```

For a directory or module, use a directory-level spec that describes the local boundary.

```text
src/trips/
  trips.sdd
  itinerary.js
  itinerary.sdd
```

The local spec should describe the nearest useful boundary, not the entire system.

### 4. Keep the first spec small

Start with the smallest useful contract:

```sdd
Spec: Itinerary

Purpose:
  Keep a trip itinerary organized by day.

Owns:
  ./itinerary.js

Must:
  Valid itinerary items are stored with a place name and trip date.
  Itinerary items appear grouped by trip day.

Must not:
  Manage destination search results.

Done when:
  The add-place behavior is covered by a check.

Scenario: add place
  Given the Paris trip has no itinerary items
  When "Louvre Museum" is added for "2026-06-12"
  Then "Louvre Museum" appears on the June 12 itinerary
```

This is enough to guide implementation. You can add more detail when the work actually needs it.

### 5. Implement against the spec

Once the spec is reviewed, implement only the behavior it describes. If you use an agent, keep the prompt
focused on the work:

```text
Implement the add-place behavior in the Itinerary spec.
```

The important habit is separating intent from implementation. The project instructions and local specs provide the
SpecDD workflow; your prompt should state one task that needs doing.

### 6. Review code, tests, and spec together

After implementation, compare the change to the spec:

- Did the implementation satisfy the `Must` rules?
- Did it avoid the `Must not` rules?
- Did it stay inside `Owns` or `Can modify`?
- Did the tests or checks prove the scenario that matters?
- Did the work reveal a missing rule that should be added to the spec?

When behavior changes, update the spec and code in the same change. A stale spec is worse than no spec because it gives
future contributors and agents the wrong contract.

## Common mistakes

- Writing one large spec for the whole project before trying the workflow.
- Treating the spec as a task description instead of the durable contract that remains after the task.
- Describing only what to build and forgetting what is out of scope.
- Keeping important implementation constraints only in the prompt instead of the spec.
- Marking a task done before the behavior has been implemented and checked.

## How to verify the result

You have started spec-driven development successfully when:

- the intended behavior is written before implementation
- the spec lives near the files or directory it governs
- the implementation can be reviewed against the spec
- checks or tests cover the important behavior
- the spec still matches the code after the change

## Related how-tos

- [How to use spec-driven development with humans and agents](/how-to/getting-started/how-to-use-spec-driven-development-with-humans-and-agents/)
- [How to write your first .sdd spec](/how-to/getting-started/how-to-write-your-first-sdd-spec/)
- [How to run your first spec-driven change end to end](/how-to/getting-started/how-to-run-your-first-spec-driven-change-end-to-end/)

## Related reference

- [Quickstart](/quickstart/)
- [Tools](/tools/)
- [Language reference](/language-reference/)
