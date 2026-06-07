---
title: "How to author and revise specs (specdd-author)"
seoDescription: "Author and revise SpecDD .sdd specs for spec-driven development with specdd-author by finding the smallest useful boundary, preserving inherited authority, and writing local behavioral contracts."
excerpt: "Use specdd-author to create or revise SpecDD specs without changing implementation files, inventing authority, or turning uncertain observations into contracts."
level: "Intermediate"
howtoID: "1091001"
weight: 70
---

This guide shows you how to use `specdd-author` to create or revise SpecDD `.sdd` specs for spec-driven development in
an existing project.

Use this skill when the work is the spec itself: adding a local contract, tightening behavior, improving write
authority, or revising tasks and completion criteria. Do not use it as a shortcut for implementation.

## Short answer

Use `specdd-author` when an agent should create or update `.sdd` files only. The agent should resolve the relevant
SpecDD context, identify the smallest useful boundary, write short local behavioral specs, avoid changing
implementation files, and report the specs changed plus any unresolved decisions.

## When to use this guide

Use this guide when:

- a project area needs its first local spec
- a spec needs clearer `Owns`, `Can modify`, or `References`
- a feature idea needs to become a reviewed SpecDD contract
- a draft spec needs to be narrowed or corrected
- implementation revealed missing context but code should not change yet

## Steps

### 1. Choose spec authoring, not implementation

Use one prompt for one authoring action:

```text
Author the Itinerary spec.
```

or:

```text
Revise the Itinerary validation spec.
```

Do not combine authoring and implementation unless you explicitly want both phases and are ready to review both.

### 2. Find the smallest useful boundary

The agent should not create a broad spec when a local spec is enough.

Good target:

```text
Itinerary validation
```

Too broad for one authoring pass:

```text
The whole travel planner app
```

The smallest useful boundary is the nearest subject that owns the behavior: a feature, module, service, component,
adapter, job, policy, or file-level behavior.

### 3. Read ancestor context

Before adding a new spec, the agent should understand parent constraints and the nearest existing spec authority.

That matters because child specs may add or narrow behavior, but they must not silently:

- loosen parent constraints
- ignore inherited `Must not` rules
- use forbidden dependencies
- expand modification scope beyond local authority
- contradict inherited architecture

If there is no applicable root or area spec, the agent should report the gap instead of inventing project authority.

### 4. Write local authority and behavior

A useful implementation-facing spec often includes:

```sdd
Spec: Itinerary

Purpose:
  Keep a trip itinerary organized by day.

Owns:
  ./itinerary.js
  ./itinerary.test.js

Can read:
  ../storage/trip-storage.sdd

Must:
  Reject itinerary items without a place name.

Must not:
  Change destination search behavior.

Tasks:
  [ ] Add missing-place validation.

Done when:
  Missing-place behavior is covered by a check.
```

Use only the sections that add real local information. Do not copy the full SpecDD framework rules into project specs.

### 5. Mark uncertainty clearly

An agent may discover behavior that appears likely but is not confirmed. Do not turn that into `Must` language.

Use task states when useful:

```sdd
Tasks:
  [?] Confirm whether duplicate itinerary places are allowed.
  [!] Decide how save failures should be handled.
```

Uncertain observations are not durable contracts until reviewed.

### 6. Report the governing scope

A good final report from `specdd-author` includes:

- bootstrap files and specs used
- specs created or changed
- intended governing scope
- relevant write authority
- unresolved authoring decisions
- any behavior that remains underspecified

That report helps reviewers confirm that the new spec belongs where it was written.

## Common mistakes

- Asking the agent to author a spec and change code in the same unreviewed step.
- Creating a child spec before checking ancestor constraints.
- Copying parent rules into a child spec instead of relying on inheritance.
- Turning current code behavior into a `Must` rule without deciding whether it is intended.
- Writing broad `Owns` entries that grant more authority than the task needs.

## How to verify the result

The authoring workflow worked when:

- only intended `.sdd` specs changed
- the spec has a clear local subject
- write authority is discoverable through `Owns` or `Can modify`
- outside context uses `Can read` or `References`
- uncertain assumptions are marked
- implementation can be requested later from a reviewed contract

## Related how-tos

- [How to draft specs automatically with AI, then review](/how-to/spec-driven-workflows/how-to-draft-specs-automatically-with-ai-then-review/)
- [How to write your first .sdd spec](/how-to/getting-started/how-to-write-your-first-sdd-spec/)
- [How to implement under spec authority](/how-to/work-with-specdd-skills/how-to-implement-under-spec-authority-specdd-do/)
- [How to choose the right SpecDD skill](/how-to/work-with-specdd-skills/how-to-choose-the-right-specdd-skill/)

## Related reference

- [Tools](/tools/)
- [Language reference](/language-reference/)
