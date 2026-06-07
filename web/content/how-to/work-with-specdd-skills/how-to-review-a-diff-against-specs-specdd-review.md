---
title: "How to review a diff against specs (specdd-review)"
seoDescription: "Review a diff against SpecDD specs in a spec-driven development workflow with specdd-review by comparing changed files to Must, Must not, Forbids, Scenario, Tasks, Done when, and write authority."
excerpt: "Use specdd-review for findings-first review against active SpecDD contracts, focusing on violations, behavioral regressions, missing verification, and underspecified risk."
level: "Intermediate"
howtoID: "1091003"
weight: 100
---

This guide shows you how to use `specdd-review` to review a diff against active SpecDD specs in a spec-driven
development workflow.

Use this skill when there is already a change to judge. It should not edit files unless you explicitly ask for fixes.
Its job is to find contract violations, regression risks, missing verification, and unresolved questions.

## Short answer

Use `specdd-review` after a diff exists. The agent should resolve the applicable spec chain for the changed files,
compare the diff against `Must`, `Must not`, `Forbids`, `Scenario`, `Tasks`, `Done when`, and write authority, then lead
with concrete findings ordered by severity.

## When to use this guide

Use this guide when:

- an agent or human has produced a patch
- a pull request should be checked against local specs
- changed files may be outside allowed scope
- tests may not cover specified scenarios
- a task was marked done and needs verification
- behavior is underspecified and review should call that out

## Steps

### 1. Use review mode after a diff exists

Use a review prompt:

```text
Review the Itinerary validation change.
```

Do not ask for review and fixes in the same prompt unless you want the agent to edit after reporting findings. A clean
review report is easier to inspect.

### 2. Compare changed files to authority

For each changed file, the agent should identify why it is in scope:

- nearest local `Can modify`
- nearest local `Owns`
- explicitly requested spec edit
- test file authorized by the governing spec
- documentation file authorized by the task

Referenced files remain read context unless the active spec chain grants modification authority.

### 3. Check behavior and boundaries

Review against:

- `Must` for required behavior
- `Must not` for forbidden behavior and non-goals
- `Forbids` for blocked dependencies, paths, modules, or access
- `Scenario` for behavior examples that should still hold
- `Tasks` for current work scope
- `Done when` for completion criteria

The review should not invent new requirements beyond the active specs. If the spec does not say enough, call that an
uncertainty.

### 4. Check verification depth

Verification should match risk.

Ask:

- Are specified scenarios tested or otherwise checked?
- Were negative constraints protected where practical?
- Did changed public behavior receive enough coverage?
- Did task status change only after verification?
- Were skipped checks explained?

Missing checks can be a finding when the spec requires verifiable behavior or the risk is high.

### 5. Separate violations from underspecification

Violation:

> The diff edits destination search files, but the Itinerary spec says destination behavior must not change.

Underspecification:

> The spec does not say what should happen when storage fails, so the new error behavior cannot be judged as a
> violation.

Both are useful, but they are different. Review should not turn speculation into a failed contract.

### 6. Lead with findings

The output should lead with findings ordered by severity. Each finding should include:

- file and line when available
- violated or risky SpecDD contract
- concrete behavior or regression risk
- smallest likely fix

If there are no findings, the report should say that clearly and mention any residual test or spec coverage gap.

## Example review prompt

```text
Review the Itinerary validation diff.
```

Good output starts with findings, not a long summary:

> Finding: `src/trips/itinerary.js` changes destination search fallback behavior, but the Itinerary spec says
> destination search behavior must not change. Keep validation local to itinerary input or move destination work into a
> separate spec-driven change.

## Common mistakes

- Reviewing only code style while ignoring spec authority.
- Treating underspecified behavior as a violation.
- Accepting task completion without checking `Done when`.
- Letting referenced specs authorize edits.
- Hiding findings after a long change summary.

## How to verify the result

The review worked when:

- findings are concrete and ordered by severity
- each finding ties to a spec contract or clear risk
- changed files are checked against write authority
- verification gaps are named
- underspecified behavior is labeled as uncertainty
- no files were edited unless fixes were explicitly requested

## Related how-tos

- [How to review an agent plan against a spec](/how-to/agent-workflows/how-to-review-an-agent-plan-against-a-spec/)
- [How to implement under spec authority](/how-to/work-with-specdd-skills/how-to-implement-under-spec-authority-specdd-do/)
- [How to trace specs to code, tests, and gaps](/how-to/work-with-specdd-skills/how-to-trace-specs-to-code-tests-and-gaps-specdd-trace/)
- [How to keep agents from changing the wrong files](/how-to/agent-workflows/how-to-keep-agents-from-changing-the-wrong-files/)

## Related reference

- [Tools](/tools/)
- [Language reference](/language-reference/)
