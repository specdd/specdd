---
title: "How to run a SpecDD pilot"
seoDescription: "Run a spec-driven development pilot with one team, one repository, one active area, clear success criteria, lightweight review, and a decision about whether to expand."
excerpt: "Test SpecDD adoption with a focused pilot: pick one team and one active module, define success signals, run real work, and review the results."
level: "Intermediate"
howtoID: "1111007"
weight: 40
---

This guide shows you how to run a spec-driven development pilot in an existing project.

A good pilot is small enough to finish and real enough to teach the team something. Use one team, one repository or
subproject, one active area, and a few practical success signals.

## Short answer

Run the pilot around real work. Define the question you want the pilot to answer, choose one active module or workflow,
set success criteria, initialize or verify the setup, write and review a minimal root spec plus one local spec, complete
one to three real changes, then decide whether to expand, adjust, or stop.

## When to use this guide

Use this guide when:

- a team wants evidence before broader adoption
- leadership wants a low-risk rollout
- agent-assisted development needs stronger boundaries
- review quality is inconsistent in one area
- a legacy module needs a safer next change

## Steps

### 1. Define the pilot question

Use one clear question:

- Does SpecDD reduce wrong-file edits in itinerary work?
- Does SpecDD make review of storage changes more concrete?
- Does SpecDD help agents complete small tasks with fewer corrections?
- Does SpecDD help new contributors understand one module faster?

Do not ask the pilot to prove every possible benefit.

### 2. Choose the pilot scope

Keep the scope tight:

- one team
- one repository or subproject
- one active folder, module, service, workflow, or documentation area
- one to three real changes
- one review path

Avoid choosing a pilot area that has no upcoming work. SpecDD value appears during implementation and review.

### 3. Set success criteria

Choose practical signals:

- changed files stayed inside authority
- reviewers used the spec in comments
- fewer agent correction prompts were needed
- tasks and `Done when` matched checks
- spec and code stayed aligned after merge
- contributors understood the local boundary faster
- no delivery pause was required

Write the criteria before the pilot starts.

### 4. Prepare the setup

If the repository is not initialized, use:

```bash
specdd init
```

Then create:

- a minimal root spec
- one local spec for the pilot area
- a short review checklist
- any project-wide commands or conventions in `.specdd/bootstrap.project.md`

Do not spend the pilot building a full spec catalog.

### 5. Train on one workflow

Show the team the loop:

1. Update or review the local spec.
2. Implement one task.
3. Run checks.
4. Update task status after verification.
5. Review the diff against the spec.

Use one concrete example from the pilot area. Do not start with every SpecDD section.

### 6. Run real changes

Good pilot tasks:

- a narrow bug fix
- a small validation rule
- a local refactor with clear boundaries
- a documentation or automation update with completion criteria
- a change where an agent previously overreached

Use prompts that name the work:

```text
Plan the Itinerary validation change.
```

```text
Implement the approved Itinerary validation task.
```

### 7. Review the pilot

After the changes, ask:

- Did specs clarify ownership?
- Did `Must not` or `Forbids` prevent a likely mistake?
- Did reviewers find the spec useful?
- Did tasks stay local?
- Did `Done when` match verification?
- Did any generated spec need substantial correction?
- What was slower than expected?
- What should change before expansion?

Capture actual examples, not general impressions.

### 8. Decide what to expand

Use one of three outcomes:

- **Expand:** add specs to the next active related area.
- **Adjust:** revise conventions, review checklist, or spec granularity.
- **Stop:** the pilot area did not benefit enough to justify more rollout yet.

Expansion should follow the next area where context matters.

## Pilot plan template

```md
## SpecDD pilot

Question:
  Can SpecDD reduce wrong-file edits in itinerary work?

Scope:
  Trips team, travel-planner repo, itinerary module.

Initial specs:
  travel-planner.sdd
  src/trips/itinerary.sdd

Success signals:
  Changed files stay inside authority.
  Review comments cite specs.
  Validation task is completed with a check.

Pilot work:
  Missing-place validation.
  Itinerary ordering regression check.

Decision date:
  After the second pilot pull request.
```

## Common mistakes

- Piloting on fake work instead of a real change.
- Choosing a scope too broad to finish.
- Adding too many process rules before the first pull request.
- Measuring only spec count.
- Letting generated specs bypass review.
- Expanding before reviewing what the pilot taught.

## How to verify the pilot

The pilot is complete when:

- at least one real change ran through the SpecDD loop
- the team reviewed specs and code together
- success criteria were checked against actual evidence
- friction was recorded and addressed
- the team decided whether to expand, adjust, or stop

## Related how-tos

- [How to introduce SpecDD without slowing delivery](/how-to/adopt-specdd-on-existing-projects/how-to-introduce-specdd-without-slowing-delivery/)
- [How to roll out SpecDD across an engineering team](/how-to/teams-and-process/how-to-roll-out-specdd-across-an-engineering-team/)
- [How to create a SpecDD review checklist](/how-to/code-review-and-governance/how-to-create-a-specdd-review-checklist/)
- [How to measure whether SpecDD is helping](/how-to/adopt-specdd-on-existing-projects/how-to-measure-whether-specdd-is-helping/)

## Related reference

- [Quickstart](/quickstart/)
