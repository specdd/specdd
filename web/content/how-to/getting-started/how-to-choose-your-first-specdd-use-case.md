---
title: "How to choose your first SpecDD use case"
seoDescription: "Choose your first spec-driven development use case by picking a small, valuable, local change where written intent, boundaries, and verification will reduce ambiguity."
excerpt: "Choose a first SpecDD use case by looking for a small active change where local intent, boundaries, review, or agent scope control will pay off quickly."
level: "Beginner"
howtoID: "1001006"
weight: 70
---

Your first SpecDD use case should be small enough to finish and meaningful enough to show the value of a local spec. Do
not choose the biggest architectural problem in the repository. Choose a change where missing context already costs
time, review attention, or agent correction loops.

This guide helps you pick the first area to specify.

## Short answer

Start with a small active change in a high-confusion, high-risk, or high-change area. Good first use cases include a bug
fix, a narrow feature, a module with repeated boundary mistakes, an agent workflow that often edits too much, or a
documentation or automation area where completion criteria are unclear.

{{< protip title="Selection tip" >}}
Choose a first use case where the spec prevents a mistake you have actually seen or can reasonably expect. Abstract
coverage is less valuable than one real boundary made explicit.
{{< /protip >}}

## Good first use cases

### A bug fix with clear expected behavior

Bug fixes are strong first candidates because the desired behavior is usually concrete.

Use SpecDD to capture:

- what currently fails
- what must be true after the fix
- what must not change
- what scenario should become a regression check

Example task:

```sdd
Tasks:
  [ ] Reject empty itinerary place names.

Scenario: missing place name
  Given the place name is empty
  When the person adds the itinerary item
  Then validation fails
  And no itinerary item is stored
```

### A small feature in one module

Choose a feature that mostly belongs in one local area. This makes ownership and verification easier.

Good:

```text
Add trip-day filtering to the itinerary module.
```

Risky as a first use case:

```text
Rework the whole trip planning experience.
```

### A module with repeated review comments

If reviewers repeatedly say "this does not belong here", that is a sign the boundary should be written down.

Use sections like:

- `Owns`
- `Can modify`
- `Can read`
- `Must not`
- `Forbids`

These help both humans and agents see the architecture boundary before implementation.

### A workflow that changes too much

If an agent often edits the wrong files or overbuilds the request, choose the next agent-assisted change as your first
SpecDD use case.

The useful spec usually includes:

- a clear local owner
- a short task
- one or two hard boundaries
- explicit completion criteria
- a task-focused prompt that names the work clearly

### A documentation or automation area

SpecDD is not only for application code. It can also specify documentation pages, scripts, CI workflows, infrastructure,
runbooks, or other file-based technical work.

Choose this when:

- the work has clear completion criteria
- unsafe changes need boundaries
- contributors need shared local context
- an agent needs to know what not to alter

## Decision checklist

Choose a first use case that answers yes to most of these:

- Is there one obvious local owner?
- Can the change be reviewed in one pull request?
- Can you describe success in a `Done when` section?
- Can you write at least one concrete scenario?
- Are there one or two plausible mistakes worth blocking with `Must not`?
- Will future contributors benefit from the written context?
- Can tests, checks, or review prove the result?

If the answer is mostly no, pick a smaller use case.

## Use case scoring

Use this quick scoring table:

```text
2 points: The area changes often.
2 points: Agents or developers often misunderstand it.
2 points: Wrong changes have real cost.
1 point: The behavior is easy to describe.
1 point: The work fits mostly in one directory or module.
1 point: A check or test can prove the outcome.
```

A score of 5 or more is usually a good first candidate. A score below 3 is probably too trivial or too unclear.

## What to avoid first

Avoid these as a first SpecDD use case:

- full-system architecture rewrites
- broad migrations across many areas
- vague product ideas with unresolved behavior
- generated code you do not intend to maintain
- throwaway prototypes
- changes where nobody can state what done means

Those can come later. The first use case should teach the loop.

## Example first choice

Suppose your team is working in a travel planner app. The agent keeps putting destination search behavior into the
itinerary module.

Good first SpecDD use case:

```text
Specify missing-place validation in the Itinerary feature.
```

Why it works:

- one local owner exists
- the behavior is testable
- the boundary mistake is known
- the change is small
- future work in the same module benefits from the spec

The first spec might include:

```sdd
Must not:
  Manage destination search results.

Done when:
  Missing-place behavior is covered by a check.
```

## Common mistakes

- Choosing the most complex area first because it feels most important.
- Specifying stable code that nobody is about to touch.
- Starting with a task that has no clear owner.
- Writing a spec for a whole product idea instead of a local implementation boundary.
- Ignoring documentation, automation, and infrastructure use cases where specs may help quickly.

## How to verify the choice

You chose a good first SpecDD use case when:

- the first spec can stay under one or two screens
- the change has a clear local boundary
- the implementation can be checked
- the spec prevents at least one real misunderstanding
- the result will still be useful after the immediate task is done

## Related how-tos

- [How to use SpecDD in 10 minutes](/how-to/getting-started/how-to-use-specdd-in-10-minutes/)
- [How to write your first .sdd spec](/how-to/getting-started/how-to-write-your-first-sdd-spec/)
- [How to know when you do not need a spec](/how-to/getting-started/how-to-know-when-you-do-not-need-a-spec/)

## Related reference

- [Quickstart](/quickstart/)
- [Tools](/tools/)
