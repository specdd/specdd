---
title: "How to review agent-generated specs"
seoDescription: "Review agent-generated SpecDD specs for spec-driven development by checking assumptions, local authority, old behavior, Must not, Forbids, tasks, Done when, and syntax before implementation."
excerpt: "Treat agent-generated specs as drafts until reviewed: confirm the boundary, remove inferred behavior, tighten authority, and approve only useful local contracts."
level: "Intermediate"
howtoID: "1141002"
weight: 30
---

This guide shows you how to review specs drafted by an agent before they become implementation authority in a spec-driven development workflow.

Agent-generated specs can be an efficient starting point, especially in an existing project. They still need human
review. A generated spec can preserve accidental behavior, invent constraints, broaden write authority, or miss the
boundary that actually matters.

## Short answer

Treat generated specs as planning drafts, not final authority. Review the subject, ownership, writable scope, required
behavior, `Must not`, `Forbids`, tasks, and `Done when` before implementation. Remove assumptions the agent inferred
from nearby code, old bugs, naming similarity, or tests that do not represent the intended contract.

## When to use this guide

Use this guide when:

- an agent drafted initial `.sdd` files for an existing project
- a generated spec will guide implementation
- the draft was created from code with known bugs
- the spec lists broad ownership or too many files
- the draft includes tasks that cross boundaries
- reviewers need to approve the spec before code changes begin

## Steps

### 1. Treat the generated spec as a draft

Use a review prompt when helpful:

```text
Review the Itinerary draft spec.
```

Do not let implementation start from a generated spec until the team has accepted it. SpecDD is valuable because specs
are local, reviewable contracts. An unreviewed draft is not yet that contract.

### 2. Check the subject and boundary

Ask:

- What subject is this spec actually about?
- Is the subject local enough to be useful?
- Does the spec describe the thing that should remain after the work?
- Is it describing a ticket, prompt, or temporary migration instead of a durable subject?
- Should some details move to a nearer same-basename or child spec?
- Should a broad rule live in a parent spec instead?

A generated spec that tries to describe an entire module often becomes vague. Prefer the smallest subject that owns the
behavior being changed.

### 3. Remove inferred or accidental behavior

Generated specs often turn observed code into permanent contract.

Review carefully for:

- bugs captured as required behavior
- outdated behavior kept because tests currently expect it
- implementation details mistaken for user-visible rules
- broad "must handle everything" language
- assumptions based on imports or filenames
- comments treated as binding requirements

If old behavior is not intended, do not preserve it in `Must`. Use a task or decision marker when the team still needs
to choose the desired behavior.

### 4. Review authority sections

Check `Owns`, `Can modify`, `Can read`, and `References`.

Good generated authority is narrow:

```sdd
Owns:
  ./itinerary.js
  ./itinerary.test.js

Can read:
  ../storage/trip-storage.sdd
```

Risky generated authority:

```sdd
Owns:
  ../trips/*
  ../storage/*
  ../destinations/*
```

The agent may have included files because they import each other or appear in one call graph. That does not mean one
spec should own them.

Use `Can read` or `References` for context. They do not grant edit permission.

### 5. Review required and forbidden behavior

For `Must`, check that each rule is:

- observable or reviewable
- local to the subject
- durable after the current task ends
- not just a restated implementation detail
- not duplicated from a parent spec

For `Must not`, check that each rule blocks a plausible local mistake:

```sdd
Must not:
  Change destination search behavior.
```

Do not accept long lists of unrelated non-goals. Those make specs hard to maintain.

For `Forbids`, check that each entry is a real blocked dependency, path, tool, library, module, or access pattern:

```sdd
Forbids:
  ../booking/*
```

### 6. Check tasks and `Done when`

Tasks should be local to the spec and implementable inside `Can modify` or `Owns`.

Risky task:

```sdd
Tasks:
  [ ] Update itinerary validation and destination search ranking.
```

Better:

```sdd
Tasks:
  [ ] Add missing-place validation.
```

If a task needs another area, split it or update the correct owning spec through review.

Use `Done when` to make completion reviewable:

```sdd
Done when:
  Missing-place validation is covered by a check.
  Destination search behavior is unchanged.
```

### 7. Check syntax and section fit

Before approval, confirm:

- section labels are valid
- body entries use two-space indentation
- task markers appear only in `Tasks`
- unsupported task states were not invented
- paths use explicit `./`, `../`, or `/` prefixes when meant as paths
- comments are not used for requirements
- project-wide conventions were not placed in local specs

Project-wide naming, syntax, command, and team conventions belong in `.specdd/bootstrap.project.md`.

### 8. Approve before implementation

After review, either approve the spec or ask for a focused revision.

Use separate prompts for separate actions:

```text
Revise the Itinerary draft spec.
```

```text
Implement the approved Itinerary validation task.
```

This keeps draft review distinct from code editing.

## Common mistakes

- Treating generated specs as final because they are syntactically valid.
- Letting an agent encode an existing bug as `Must`.
- Accepting broad `Owns` sections copied from an import graph.
- Putting read-only context in `Can modify`.
- Allowing tasks that require another spec's authority.
- Keeping long `Must not` lists that describe unrelated work no one would plausibly do.
- Implementing before the draft has been reviewed.

## How to verify the result

The generated spec is ready when:

- reviewers can name the subject and boundary
- authority sections are narrow and explicit
- required behavior is intended, not merely observed
- forbidden behavior protects plausible mistakes
- tasks are local and checkable
- `Done when` gives reviewers a completion signal
- syntax passes the available SpecDD checks

## Related how-tos

- [How to draft specs automatically with AI, then review](/how-to/spec-driven-workflows/how-to-draft-specs-automatically-with-ai-then-review/)
- [How to author and revise specs](/how-to/work-with-specdd-skills/how-to-author-and-revise-specs-specdd-author/)
- [How to review a spec-only pull request](/how-to/code-review-and-governance/how-to-review-a-spec-only-pull-request/)
- [How to keep specs reviewed but lightweight](/how-to/teams-and-process/how-to-keep-specs-reviewed-but-lightweight/)

## Related reference

- [Quickstart](/quickstart/)
- [Language reference](/language-reference/)
