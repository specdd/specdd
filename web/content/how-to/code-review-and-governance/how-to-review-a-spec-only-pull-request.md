---
title: "How to review a spec-only pull request"
seoDescription: "Review a spec-only spec-driven development pull request by treating .sdd changes as authority changes, checking scope, behavior, tasks, conflicts, and future implementation risk."
excerpt: "Spec-only pull requests are not harmless docs by default: review them as changes to future implementation authority."
level: "Intermediate"
howtoID: "1141008"
weight: 90
---

This guide shows you how to review a pull request that changes only SpecDD specs in a spec-driven development workflow.

A spec-only pull request may look like documentation, but it can change future implementation authority. Review it with
the same care you would use for a code change that alters behavior, ownership, dependencies, or public contracts.

## Short answer

Review a spec-only pull request as a contract change. Confirm the intended outcome, the owning spec, writable scope,
behavior, `Must not`, `Forbids`, tasks, `Done when`, and conflicts with existing code or parent specs. If the spec
describes future behavior that is not implemented yet, keep the work visible with open tasks or decision markers.

## When to use this guide

Use this guide when:

- a pull request adds initial `.sdd` files
- a design review updates specs before implementation
- a team wants to change write authority
- a spec-only change adds or removes tasks
- generated specs are submitted for review
- specs are being corrected after drift was discovered

## Steps

### 1. Treat specs as authority

Do not dismiss a spec-only pull request as "docs only."

Specs define:

- local ownership
- write authority
- read context
- required behavior
- forbidden behavior
- forbidden dependencies or paths
- local tasks
- completion criteria

Changing those sections changes how future humans and agents will work.

### 2. Identify the intended outcome

Ask what kind of spec-only change this is:

- documenting existing intended behavior
- correcting stale specs
- approving future behavior before implementation
- changing ownership or writable scope
- capturing an architecture decision
- adding tasks for later work
- blocking a risky dependency or behavior

The review standard depends on the answer. Correcting a typo is not the same as changing `Can modify`.

### 3. Check scope and ownership

Review `Owns` and `Can modify` carefully.

Ask:

- Is the subject local enough?
- Does only one spec own each important file or behavior?
- Is writable scope explicit where needed?
- Does `Can modify` include only files that should be editable?
- Are dependencies and sibling areas listed as read context instead of authority?
- Does a parent spec grant context without broad child edit rights?

Spec-only changes to authority can alter many future pull requests, so review them deliberately.

### 4. Review behavior and boundaries

Check that durable behavior belongs in durable sections:

- `Must`
- `Must not`
- `Forbids`
- contract sections
- `Scenario`
- `Example`
- `Done when`

Do not hide durable behavior only in a task.

For `Must not` and `Forbids`, ask whether the rule blocks a plausible local mistake. Avoid broad lists of unrelated
non-goals, but do not remove useful boundaries just to make the spec shorter.

### 5. Check tasks and future work

If the spec describes future behavior that is not implemented yet, keep the state honest:

```sdd
Tasks:
  [ ] Add missing-place validation.
```

Do not mark `[x]` in a spec-only pull request unless the work was already implemented and verified elsewhere.

Use `[?]` for decisions:

```sdd
Tasks:
  [?] Confirm whether blank place names are rejected or normalized.
```

Use `[!]` for blocked work:

```sdd
Tasks:
  [!] Save itinerary directly from UI components. Violates storage boundary.
```

### 6. Look for code drift

If the spec claims to document existing behavior, compare it to the code and tests enough to avoid creating false
authority.

Watch for:

- specs that promise behavior code does not provide
- specs that preserve known bugs as requirements
- tests that prove different behavior than the spec describes
- completed tasks without evidence
- `Done when` criteria that are already false

If the spec intentionally describes future behavior, the pull request should say that clearly and leave tasks open.

### 7. Check conflicts

Look for conflicts with:

- parent specs
- same-directory same-basename specs
- referenced specs
- existing `Must not` and `Forbids`
- team review ownership
- current architecture decisions

When rules conflict, the stricter rule wins unless the operator or team explicitly resolves the conflict through review.

### 8. Run available checks

At minimum, run the available spec syntax or documentation checks for the repository.

Useful checks may include:

- `specdd lint`
- documentation build
- link checks
- targeted tests when the spec claims existing behavior
- review by the owner of the affected area

If checks cannot be run, the pull request should say why.

## Review checklist

Before approving a spec-only pull request, ask:

- Is this documenting existing behavior or approving future behavior?
- Is the owning spec correct?
- Did authority change?
- Did `Must not` or `Forbids` change?
- Are tasks local and honestly marked?
- Does `Done when` make completion reviewable?
- Is any current code/spec drift introduced or exposed?
- Are syntax and links valid?
- Does the right owner need to review?

## Common mistakes

- Approving spec-only changes without checking future write authority.
- Marking future implementation tasks done.
- Capturing existing bugs as intended behavior.
- Adding broad `Can modify` paths because no code changed yet.
- Removing `Must not` or `Forbids` as if it were a harmless wording edit.
- Letting generated specs merge before human review.

## How to verify the result

The spec-only review worked when:

- reviewers understand what future authority changed
- behavior and ownership are local and precise
- incomplete future work remains visible in `Tasks`
- conflicts with parent specs were resolved or called out
- checks were run or explicitly skipped
- implementation can proceed from the approved specs without guessing

## Related how-tos

- [How to review agent-generated specs](/how-to/code-review-and-governance/how-to-review-agent-generated-specs/)
- [How to require spec updates in code review](/how-to/code-review-and-governance/how-to-require-spec-updates-in-code-review/)
- [How to change a spec safely after code already exists](/how-to/spec-driven-workflows/how-to-change-a-spec-safely-after-code-already-exists/)
- [How to resolve conflicts between specs](/how-to/spec-driven-workflows/how-to-resolve-conflicts-between-specs/)

## Related reference

- [Language reference](/language-reference/)
