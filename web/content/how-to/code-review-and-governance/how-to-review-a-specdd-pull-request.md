---
title: "How to review a SpecDD pull request"
seoDescription: "Review a spec-driven development pull request by checking changed files against write authority, behavior rules, Must not, Forbids, tasks, Done when, and verification."
excerpt: "Use SpecDD in pull request review by comparing the diff to the governing specs, checking local authority, and requiring aligned code, specs, tests, and tasks."
level: "Intermediate"
howtoID: "1141000"
weight: 10
---

This guide shows you how to review a pull request that uses spec-driven development.

The goal is not to add another layer of process. The goal is to make the review concrete: every meaningful code, test,
task, and spec change should line up with the local contracts that humans and agents are expected to follow later.

## Short answer

Review the pull request against the effective SpecDD specs for the changed files. Confirm that every changed file is
inside `Can modify` or `Owns`, required behavior in `Must` still holds, `Must not` and `Forbids` are not weakened by
implementation, tasks were updated only after verification, and code, specs, tests, and documentation tell the same
story.

## When to use this guide

Use this guide when:

- a pull request includes `.sdd` files
- implementation was done from a SpecDD task
- an agent generated part of the change
- changed files cross a module, team, or architecture boundary
- the pull request updates task status or `Done when`
- reviewers need a repeatable way to reject unsafe changes

## Steps

### 1. Identify the review target

Start by naming the change in human terms:

```text
Review the Itinerary validation change.
```

Then identify:

- the main feature, module, task, or behavior
- the changed files
- the nearest local spec for the changed area
- any parent specs that add inherited constraints
- any explicitly referenced specs that were used as read context

Do not rely on file proximity alone. A sibling spec is not inherited just because it looks related.

### 2. Check write authority

For each changed file, ask why the pull request was allowed to change it.

Acceptable reasons usually include:

- the file appears in the nearest local `Can modify`
- `Can modify` is absent and the file appears in `Owns`
- the pull request is intentionally updating the governing spec itself
- the file is a focused test, check, or doc file authorized by the task or local spec
- the change is the smallest necessary update under an applicable parent spec because no nearer spec exists

Suspicious reasons include:

- the file was only listed in `Can read`
- the file came from a spec listed only in `References`
- the file is in a sibling area with no write authority
- the file is under a path listed in `Forbids`
- the file changed because an agent or tool touched everything nearby

If a file is outside authority, request changes before reviewing details.

### 3. Review behavior against specs

Map the pull request to the relevant spec sections:

- `Must` for required behavior
- `Scenario` and `Example` for important cases
- contract sections such as `Accepts`, `Returns`, `Raises`, or `Handles`
- `Done when` for completion criteria
- `Tasks` for the current work slice

The implementation should not merely look plausible. It should satisfy the local contract.

If behavior changed and the spec did not, decide whether the code is wrong or the spec needs an update. Do not approve a
pull request where the spec and code disagree.

### 4. Check `Must not` and `Forbids`

Review negative constraints explicitly.

`Must not` covers forbidden behavior, non-goals, and architecture boundaries:

```sdd
Must not:
  Change destination search behavior.
```

`Forbids` covers blocked dependencies, paths, modules, libraries, tools, or access:

```sdd
Forbids:
  ../booking/*
  Direct browser storage writes from itinerary behavior.
```

These sections are stronger than a task that happens to ask for adjacent work. A task cannot authorize behavior that
`Must not` forbids or a dependency that `Forbids` blocks.

### 5. Verify spec, code, and tests are aligned

Look at the pull request as one changeset:

- specs describe the intended durable behavior
- code implements that behavior
- tests or checks provide evidence
- documentation matches user-visible behavior when documentation changed
- task status reflects completed work only
- skipped checks are explained

For low-risk wording fixes, this may be quick. For behavior, security, dependency, or public contract changes, expect
stronger evidence.

### 6. Review tasks and `Done when`

Completed task markers should be earned:

```sdd
Tasks:
  [x] Add missing-place validation.
```

Accept `[x]` only when the work is implemented and checked. Use `[?]` when the change needs a decision and `[!]` when
work is blocked by a real constraint.

`Done when` is the review checklist for completion. If it says a behavior must be covered by a check, the pull request
should show that check or explain why it could not be run.

### 7. Decide approve, revise, or stop

Use three review outcomes:

- approve when the change is authorized, aligned, and verified
- request revision when the change is mostly right but needs narrower scope, spec updates, or checks
- stop when authority is missing, specs conflict, or the request would violate `Must not` or `Forbids`

A good request for changes names the violated contract and the smallest useful correction.

## Review checklist

Before approving, ask:

- Does the pull request name the spec, task, feature, or behavior it changes?
- Are all changed files inside `Can modify` or `Owns`?
- Are read-only references still read-only?
- Are parent constraints preserved?
- Do `Must not` and `Forbids` still hold?
- Did the code implement the behavior the spec describes?
- Did the spec change when durable behavior changed?
- Are task status changes backed by verification?
- Were relevant checks run or explicitly skipped?

## Common mistakes

- Reviewing only code quality while missing an authority violation.
- Treating a referenced spec as permission to edit another area.
- Letting a completed task replace durable behavior in `Must` or `Scenario`.
- Approving code because tests pass even though the spec forbids the behavior.
- Requiring broad architecture review for a small local wording clarification.
- Skipping review of generated code because the prompt named a spec.

## How to verify the result

The pull request review worked when:

- every changed file has a clear authority reason
- findings point to concrete spec contracts or verification gaps
- code, specs, tests, and tasks are consistent
- high-risk boundary changes received appropriate scrutiny
- unresolved spec gaps were called out instead of guessed around

## Related how-tos

- [How to review a diff against specs](/how-to/work-with-specdd-skills/how-to-review-a-diff-against-specs-specdd-review/)
- [How to review an agent plan against a spec](/how-to/agent-workflows/how-to-review-an-agent-plan-against-a-spec/)
- [How to keep specs reviewed but lightweight](/how-to/teams-and-process/how-to-keep-specs-reviewed-but-lightweight/)
- [How to keep specs in sync with code changes](/how-to/spec-driven-workflows/how-to-keep-specs-in-sync-with-code-changes/)

## Related reference

- [Language reference](/language-reference/)
