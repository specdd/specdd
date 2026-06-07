---
title: "How to generate draft specs from existing code"
seoDescription: "Generate draft SpecDD specs for spec-driven development from existing code safely by limiting scope, separating observed behavior from intent, reviewing assumptions, and approving before implementation."
excerpt: "Use agents to draft specs from existing code, but keep generated specs as drafts until humans review behavior, authority, assumptions, and boundaries."
level: "Intermediate"
howtoID: "1111004"
weight: 60
---

This guide shows you how to generate draft SpecDD specs for spec-driven development from existing code without turning
generated text into accidental authority.

Generating a draft is useful because the agent can summarize current code quickly. The review step is still essential:
current code may include old bugs, temporary workarounds, unclear ownership, or behavior the team does not want to
preserve.

## Short answer

Ask for a draft spec for one module, file, service, workflow, or folder. Keep the request limited to spec drafting.
Review the draft for assumptions, ownership, write authority, intended behavior, accidental behavior, `Must not`,
`Forbids`, tasks, and `Done when`. Approve the spec before implementation starts.

## When to use this guide

Use this guide when:

- an existing area needs its first `.sdd` spec
- code behavior is scattered across files and tests
- a team wants a faster first draft
- a legacy area has unclear intent
- an agent should help describe current behavior without editing code

## Steps

### 1. Choose one draft target

Good targets:

- one source file with substantial behavior
- one service, adapter, component, job, policy, or workflow
- one small folder with a clear local boundary
- one documentation or automation area

Avoid:

- the whole repository
- many unrelated modules
- generated code
- areas with unresolved product decisions

Large drafts tend to mix inventory, behavior, implementation details, and guesses.

### 2. Ask for a draft only

Use one prompt:

```text
Draft the Itinerary spec from current behavior.
```

If the result should include uncertainty, use a focused prompt:

```text
Mark uncertain Itinerary assumptions.
```

Keep implementation as a separate step after review.

### 3. Label assumptions

Generated drafts should not present guesses as facts.

Review lines and classify them:

- **Observed:** current code appears to do this
- **Intended:** reviewers confirm this should remain true
- **Assumption:** likely but not confirmed
- **Bug:** observed but not intended
- **Out of scope:** belongs to another spec

Represent uncertainty with tasks when useful:

```sdd
Tasks:
  [?] Confirm whether duplicate itinerary places are allowed.
```

### 4. Review ownership and authority

Generated drafts often make authority too broad.

Good:

```sdd
Owns:
  ./itinerary.js
  ./itinerary.test.js

Can read:
  ../storage/trip-storage.sdd
```

Too broad:

```sdd
Owns:
  ../trips/*
  ../storage/*
  ../destinations/*
```

Use `Can read` or `References` for context outside the owned area. They do not grant edit permission.

### 5. Remove accidental behavior

Look for:

- old bugs encoded as `Must`
- implementation details written as behavior
- broad claims such as "handles all errors"
- duplicated parent rules
- comments treated as requirements
- test-only behavior treated as product intent
- sibling module behavior captured in the wrong spec

When the intended behavior is different from current behavior, describe the intended contract and leave an open task for
implementation.

### 6. Add tasks and `Done when`

A useful generated spec should lead to reviewable work.

Example:

```sdd
Tasks:
  [ ] Add missing-place validation.

Done when:
  Missing-place behavior is covered by a check.
  Existing itinerary ordering behavior still passes.
```

Tasks should be local. If a draft task requires another area's files, split the work or update the owning spec through
review.

### 7. Approve before use

Only treat the spec as authority after review.

Use separate prompts:

```text
Revise the Itinerary draft spec.
```

```text
Implement the approved Itinerary validation task.
```

This keeps draft generation, review, and implementation distinct.

## Review checklist

Before approving a generated draft, ask:

- Is the subject local enough?
- Does it describe intended durable behavior?
- Are assumptions visible?
- Are old bugs removed or marked for correction?
- Is writable scope narrow?
- Are read-only references still read-only?
- Do `Must not` and `Forbids` protect plausible mistakes?
- Are tasks local and checkable?
- Does syntax follow the SpecDD language rules?

## Common mistakes

- Asking for a whole-repository draft.
- Treating generated text as reviewed authority.
- Accepting broad `Owns` sections from import analysis.
- Letting current bugs become `Must` rules.
- Combining draft generation and implementation in one request.
- Leaving uncertain behavior in confident language.

## How to verify the result

The draft is useful when:

- it covers one clear subject
- reviewers can separate observed and intended behavior
- authority is narrow
- assumptions are visible
- tasks are small enough to implement safely
- the approved spec can guide one concrete change

## Related how-tos

- [How to draft specs automatically with AI, then review](/how-to/spec-driven-workflows/how-to-draft-specs-automatically-with-ai-then-review/)
- [How to review agent-generated specs](/how-to/code-review-and-governance/how-to-review-agent-generated-specs/)
- [How to spec a legacy module safely](/how-to/adopt-specdd-on-existing-projects/how-to-spec-a-legacy-module-safely/)
- [How to review a spec-only pull request](/how-to/code-review-and-governance/how-to-review-a-spec-only-pull-request/)

## Related reference

- [Language reference](/language-reference/)
