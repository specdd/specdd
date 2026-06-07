---
title: "How to create a SpecDD review checklist"
seoDescription: "Create a spec-driven development review checklist that covers spec chain, write authority, behavior, boundaries, tasks, verification, risk, and review outcome."
excerpt: "Build a practical SpecDD review checklist so pull requests are checked consistently without making every change heavy."
level: "Beginner"
howtoID: "1141005"
weight: 60
---

This guide shows you how to create a practical spec-driven development review checklist for pull requests, spec-only changes, and
agent-generated work.

A useful checklist keeps review focused on the contracts that matter: authority, behavior, boundaries, tasks, and
evidence. It should not make every small edit feel like architecture review.

## Short answer

Create a checklist that asks whether the correct specs were used, changed files are authorized, `Must` behavior is
satisfied, `Must not` and `Forbids` still hold, tasks and `Done when` match reality, and verification matches risk.
Keep it short enough that reviewers actually use it.

## When to use this guide

Use this guide when:

- pull request review is inconsistent
- reviewers miss spec updates or authority violations
- agent-generated changes need a standard review path
- spec-only pull requests are treated as harmless documentation
- the team wants lightweight governance without a large process

## What you will build

By the end of this guide, you will have:

- a core SpecDD review checklist
- risk-based add-ons for higher-risk changes
- a rule for when reviewers may use a lighter path
- a checklist that can be reused in pull request templates or review notes

## Steps

### 1. Choose what the checklist reviews

Decide whether the checklist is for:

- implementation pull requests
- spec-only pull requests
- agent-generated specs
- architecture review
- high-risk boundary changes

You can use one core checklist and add small risk-specific sections. Avoid separate long checklists for every workflow
unless your team really needs them.

### 2. Check spec chain and authority

Start with authority because it answers whether the change belongs in the pull request.

Checklist items:

- The pull request names the spec, feature, task, or behavior being changed.
- The reviewer can identify the governing local spec.
- Parent constraints were considered when relevant.
- Changed files are inside `Can modify`.
- If `Can modify` is absent, changed files are inside `Owns`.
- Files listed only in `Can read` or `References` were not edited.
- No changed file is under a path blocked by `Forbids`.

This section catches most wrong-file changes early.

### 3. Check behavior and boundaries

Checklist items:

- Required behavior in `Must` is implemented or preserved.
- `Scenario` and `Example` cases still describe the behavior.
- Public contracts, inputs, outputs, errors, or handled cases are aligned.
- `Must not` behavior did not appear in implementation.
- `Forbids` dependencies, paths, modules, tools, libraries, or access were not introduced.
- The change does not silently loosen a parent constraint.
- New behavior is in the owning spec, not only in code or tests.

For a low-risk documentation or wording change, this section may take seconds. For behavior changes, it is the center of
the review.

### 4. Check tasks and completion

Checklist items:

- Tasks are local to the spec where they appear.
- New tasks fit inside local write authority.
- `[x]` tasks are implemented and checked.
- `[?]` is used for unresolved decisions.
- `[!]` is used for real blockers.
- Skipped work uses `[-]` only when intentionally skipped.
- `Done when` criteria are still accurate.
- Completion criteria were not weakened to make the pull request pass.

Task markers are small, but they shape future work. Review them like other contract changes.

### 5. Check verification

Checklist items:

- The pull request ran the checks named by the spec or task.
- New or changed behavior has practical evidence.
- Negative constraints are protected where risk justifies it.
- Existing important behavior still has coverage or a check.
- Skipped checks are explained.
- Documentation builds or previews were run when documentation behavior changed.

Verification should match risk. Not every spec edit needs a full test suite, but every meaningful contract change needs
some reviewable evidence.

### 6. Scale by risk

Use a lighter path for:

- typo fixes
- local wording clarification
- task text that does not change scope
- formatting-only spec changes

Use stronger review for:

- changing `Can modify` or `Owns`
- removing or weakening `Must not`
- removing or weakening `Forbids`
- changing a public contract
- changing security, data, destructive, migration, or access behavior
- moving ownership across teams or modules
- approving agent-generated specs for implementation

The checklist should make high-risk changes visible without slowing down small safe edits.

### 7. Keep the checklist short

Prefer a checklist reviewers can scan:

```md
## SpecDD review

- [ ] Governing spec or task is named.
- [ ] Changed files are inside `Can modify` or `Owns`.
- [ ] `Can read` and `References` stayed read-only.
- [ ] `Must` behavior is satisfied or preserved.
- [ ] `Must not` and `Forbids` still hold.
- [ ] Spec updates are included when durable behavior changed.
- [ ] Task status and `Done when` match the evidence.
- [ ] Checks were run or skipped with explanation.
```

Add high-risk prompts only when they apply.

## High-risk add-on

For boundary or authority changes, add:

```md
## High-risk SpecDD review

- [ ] Why is authority changing?
- [ ] Which parent or sibling specs are affected?
- [ ] Does this weaken a previous `Must not` or `Forbids`?
- [ ] Are rejected approaches still blocked where needed?
- [ ] Do owners of affected areas agree?
- [ ] What checks prove the new boundary is safe?
```

Use this add-on for the highest-risk changes, not every pull request.

## Common mistakes

- Building a checklist so long reviewers ignore it.
- Checking syntax while missing authority.
- Treating spec-only changes as low-risk by default.
- Asking for the same review depth on typo fixes and boundary changes.
- Forgetting to review task status changes.
- Omitting read-only context from the checklist.

## How to verify the result

The checklist is working when:

- reviewers use it without being reminded
- authority violations are caught before merge
- spec updates happen with behavior changes
- high-risk boundary changes get stronger review
- small local changes still move quickly
- review comments refer to concrete SpecDD contracts

## Related how-tos

- [How to review a SpecDD pull request](/how-to/code-review-and-governance/how-to-review-a-specdd-pull-request/)
- [How to keep specs reviewed but lightweight](/how-to/teams-and-process/how-to-keep-specs-reviewed-but-lightweight/)
- [How to review changes to Must not and Forbids](/how-to/code-review-and-governance/how-to-review-changes-to-must-not-and-forbids/)
- [How to assess change risk (specdd-risk)](/how-to/work-with-specdd-skills/how-to-assess-change-risk-specdd-risk/)

## Related reference

- [Language reference](/language-reference/)
