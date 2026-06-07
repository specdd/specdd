---
title: "How to plan a SpecDD adoption for an existing repo"
seoDescription: "Plan spec-driven development adoption for an existing repository by choosing one high-value area, drafting reviewed specs, running one small change, and expanding gradually."
excerpt: "Start existing-repo SpecDD adoption with one active area where missing context already hurts, then grow coverage from reviewed local specs."
level: "Beginner"
howtoID: "1111000"
weight: 10
---

This guide shows you how to plan spec-driven development adoption for an existing repository without trying to specify the whole codebase
at once.

Existing projects already have code, tests, docs, tickets, bugs, and local habits. The useful adoption plan is small:
choose one area where missing context costs time, create reviewed specs around that area, run one spec-driven change,
and expand only after the team sees the workflow work.

## Short answer

Start with one high-change, high-risk, or high-confusion area. Add or verify the SpecDD setup, create a minimal root
spec, draft one local spec from intended behavior, review it so old bugs do not become permanent contracts, implement a
small task against it, then expand coverage around the next real change.

## When to use this guide

Use this guide when:

- a live repository is adding SpecDD for the first time
- a team wants adoption without pausing delivery
- agents are making plausible but wrong changes
- reviewers keep reconstructing requirements from memory
- a legacy area needs clearer boundaries before the next change

## Steps

### 1. Confirm the repository setup

If the repository is not initialized yet, use the setup guide and run:

```bash
specdd init
```

If SpecDD should govern only a subproject, initialize that subproject rather than the whole repository.

After setup, a typical project has:

```text
.specdd/
  bootstrap.md
  bootstrap.project.md
  bootstrap.local.md
AGENTS.md
<content-root-name>.sdd
```

Put project-wide commands, naming conventions, dependency policies, and team rules in `.specdd/bootstrap.project.md`.
Keep personal machine preferences in `.specdd/bootstrap.local.md`.

### 2. Pick one adoption goal

Choose the first reason for adoption. Good goals are specific:

- reduce wrong-file edits by agents
- make review of a risky module more consistent
- preserve business rules in a workflow under active change
- make onboarding to one subsystem faster
- stop drift between a large architecture doc and code
- define completion criteria for a recurring task

Avoid "spec the whole repo" as the first goal. It is too broad to verify.

### 3. Choose the first area

Pick an area with real near-term work.

Good candidates:

- a module with repeated review comments
- a service with unclear ownership
- a workflow with subtle business rules
- a folder that agents often change too broadly
- a feature about to receive a small bug fix or enhancement
- an automation path with operational constraints

Weak candidates:

- stable code nobody expects to touch
- a full architecture rewrite
- generated code you do not maintain
- a vague product idea with unresolved behavior

### 4. Draft a minimal root spec

The root spec gives inherited project context. It should be named after the selected content root directory.

For a repository named `travel-planner`, start with:

```sdd
Spec: Travel Planner

Purpose:
  Help people plan trips and keep itinerary information organized.

Structure:
  ./src: Application source
  ./tests: Project checks

Must:
  Trips can be created and reviewed.

Must not:
  Mix booking purchase behavior into trip planning.
```

Keep it short. The root spec should not become a whole-project requirements document.

### 5. Draft one local spec

Create the first local spec near the area you plan to change.

Example:

```text
src/trips/itinerary.js
src/trips/itinerary.sdd
```

Start with the contract the next change needs:

```sdd
Spec: Itinerary

Purpose:
  Keep a trip itinerary organized by day.

Owns:
  ./itinerary.js
  ./itinerary.test.js

Must:
  Itinerary items remain assigned to a trip day.

Must not:
  Change destination search behavior.

Tasks:
  [ ] Add missing-place validation.

Done when:
  Missing-place validation is covered by a check.
```

Use `Can modify` when writable scope should be narrower or different from `Owns`.

### 6. Review before implementation

Review the first specs before treating them as authority.

Check:

- Does the spec describe intended behavior, not just current behavior?
- Did it preserve an old bug as a `Must` rule?
- Is ownership local and narrow?
- Are dependencies and sibling areas read-only context?
- Are `Must not` rules plausible boundaries, not random exclusions?
- Are tasks local and checkable?
- Does `Done when` define completion?

Generated drafts are useful, but they are not final until reviewed.

### 7. Run one small change

After review, implement one task:

```text
Implement the Itinerary validation task.
```

Review the result against:

- write authority in `Can modify` or `Owns`
- required behavior in `Must`
- boundaries in `Must not` and `Forbids`
- task status
- `Done when`
- tests or other checks

Update task status only after verification.

### 8. Decide where to expand

After the first change, ask what helped:

- Did the spec prevent wrong-file edits?
- Did review comments become more concrete?
- Did the agent need fewer correction prompts?
- Did tests or checks line up with `Done when`?
- Did any rule need to move to a parent spec?
- Was the spec too broad or too thin?

Expand to the next active area, not every area. SpecDD adoption should follow work that benefits from durable local
context.

## Adoption plan template

Use this shape:

```md
## SpecDD adoption plan

Goal:
  Reduce wrong-file edits in itinerary work.

First area:
  Itinerary validation in the trips module.

Initial specs:
  Root project spec.
  Itinerary local spec.

First task:
  Add missing-place validation.

Checks:
  Unit test for missing-place validation.
  Existing itinerary ordering checks.

Expansion trigger:
  Add specs to nearby trip storage only when storage work begins.
```

## Common mistakes

- Starting by specifying the whole repository.
- Choosing stable code with no upcoming work.
- Letting generated specs become final without review.
- Creating local specs before a minimal root spec exists.
- Encoding current bugs as durable `Must` behavior.
- Measuring adoption by spec count instead of better changes and reviews.

## How to verify the plan

The adoption plan is ready when:

- the repository setup path is clear
- the first area is small and active
- initial specs are reviewable
- assumptions are visible
- the first implementation task fits inside local authority
- checks can prove the result
- expansion depends on real follow-up work

## Related how-tos

- [How to add SpecDD to an existing project](/how-to/install-and-setup/how-to-add-specdd-to-an-existing-project/)
- [How to choose your first SpecDD use case](/how-to/getting-started/how-to-choose-your-first-specdd-use-case/)
- [How to plan adoption with an agent](/how-to/work-with-specdd-skills/how-to-plan-adoption-with-an-agent-specdd-adopt/)
- [How to review agent-generated specs](/how-to/code-review-and-governance/how-to-review-agent-generated-specs/)

## Related reference

- [Quickstart](/quickstart/)
- [Tools](/tools/)
