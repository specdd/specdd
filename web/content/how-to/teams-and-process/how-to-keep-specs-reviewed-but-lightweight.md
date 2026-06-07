---
title: "How to keep specs reviewed but lightweight"
seoDescription: "Keep spec-driven development review lightweight by reviewing behavior, ownership, Must not rules, tasks, and Done when criteria without forcing every small edit through heavy design process."
excerpt: "Review specs like code, but keep the review focused: authority, behavior, boundaries, tasks, done criteria, and the checks needed for the change."
level: "Intermediate"
howtoID: "1171011"
weight: 120
---

This guide shows you how to keep SpecDD specs reviewed in a spec-driven development workflow without making every spec
change heavy.

Specs define behavior, ownership, and implementation authority, so they should be reviewed like code. The review can
still stay focused and lightweight.

## Short answer

Review `.sdd` changes when they affect behavior, ownership, write authority, dependencies, `Must not`, `Forbids`, tasks,
or `Done when`. Use a short checklist, scale review to risk, and keep local changes local. Small clarifications may need
one reviewer. Cross-boundary, security-sensitive, or public contract changes need stronger review.

## When to use this guide

Use this guide when:

- the team agrees specs need review but fears process overhead
- spec-only pull requests are becoming too large
- agents generate draft specs that need human approval
- small local changes are blocked by broad architecture review
- risky spec changes are not getting enough attention

## Steps

### 1. Review specs when contracts change

Review when a spec change affects:

- `Owns` or `Can modify`
- required behavior in `Must`
- non-goals in `Must not`
- forbidden dependencies or paths in `Forbids`
- public contracts
- tasks or task status
- `Done when`
- scenarios or examples used for tests

Typo fixes and formatting-only changes can use a lighter path if the team agrees.

### 2. Use a short checklist

Ask:

- Is the subject clear?
- Is ownership correct?
- Does writable scope match the intended work?
- Are `Must` rules observable?
- Are `Must not` rules specific and plausible?
- Do tasks stay inside local authority?
- Does `Done when` define completion?
- Does the change need tests or docs?

This checklist catches most useful issues without turning review into a design meeting.

### 3. Scale review to risk

Low-risk:

- local wording clarification
- adding a small task
- adding a scenario for existing behavior

Medium-risk:

- changing behavior
- changing writable paths
- adding dependencies
- marking tasks complete

High-risk:

- weakening `Must not` or `Forbids`
- changing public contracts
- moving ownership across teams
- security, data, migration, or destructive behavior

Match review depth to the highest-risk change in the spec.

### 4. Avoid committee review for local edits

Most local specs should be reviewed by the people who own or work in that area. Do not require broad architecture review
for every local `Done when` or task update.

Broad review is useful when the spec changes inherited architecture, cross-team boundaries, public behavior, or
security-sensitive rules.

### 5. Require stronger review for boundaries

Pay close attention to changes that:

- broaden `Can modify`
- remove `Must not`
- loosen `Forbids`
- add a dependency across layers
- move a responsibility to another spec
- make a referenced spec writable in practice

These changes affect future implementation authority.

### 6. Keep the final spec concise

Review should remove noise as well as catch missing rules.

Prefer:

```sdd
Must not:
  Change destination search behavior.
```

Avoid long lists of unrelated things the subject obviously does not do.

## Common mistakes

- Skipping review because a change is "only a spec."
- Requiring architecture review for every local task update.
- Reviewing grammar while ignoring write authority.
- Accepting generated specs without checking assumptions.
- Letting broad `Must not` lists make specs hard to maintain.
- Weakening boundaries without stronger review.

## How to verify the result

Spec review is lightweight and effective when:

- local spec changes are reviewed by the right owners
- risky boundary changes receive stronger review
- reviews focus on behavior and authority
- generated specs are checked before implementation
- specs stay short after review
- implementation can proceed from the reviewed contract

## Related how-tos

- [How to review a diff against specs](/how-to/work-with-specdd-skills/how-to-review-a-diff-against-specs-specdd-review/)
- [How to draft specs automatically with AI, then review](/how-to/spec-driven-workflows/how-to-draft-specs-automatically-with-ai-then-review/)
- [How to run a spec-first development process](/how-to/teams-and-process/how-to-run-a-spec-first-development-process/)
- [How to assign ownership for specs](/how-to/teams-and-process/how-to-assign-ownership-for-specs/)

## Related reference

- [Language reference](/language-reference/)
