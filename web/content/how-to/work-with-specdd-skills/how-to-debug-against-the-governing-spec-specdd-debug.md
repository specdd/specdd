---
title: "How to debug against the governing spec (specdd-debug)"
seoDescription: "Debug against the governing SpecDD spec in a spec-driven development workflow with specdd-debug by reproducing the failure, comparing behavior to the contract, fixing root cause, and adding regression checks."
excerpt: "Use specdd-debug to diagnose failures against active SpecDD contracts without changing specs to match broken behavior."
level: "Intermediate"
howtoID: "1091008"
weight: 120
---

This guide shows you how to use `specdd-debug` to diagnose and fix bugs against the governing SpecDD spec in a
spec-driven development workflow.

Debugging with SpecDD starts from a simple question: what does the active contract say should happen, and how does the
observed behavior differ?

## Short answer

Use `specdd-debug` when a failure should be diagnosed against active specs. The agent should reproduce or inspect the
failure when practical, compare observed behavior with `Must`, `Must not`, `Scenario`, `Handles`, `Returns`, and
`Raises`, identify whether the issue is implementation drift, test drift, spec ambiguity, or missing spec coverage, fix
the smallest root cause inside write authority, and add focused regression verification when appropriate.

## When to use this guide

Use this guide when:

- a test fails and the expected behavior should come from a spec
- production or QA behavior conflicts with a local contract
- an agent changed code and introduced a regression
- a bug report reveals missing edge-case coverage
- code, tests, and specs disagree about the intended behavior

## Steps

### 1. Start from the failure

Use a focused prompt:

```text
Debug the Itinerary validation failure.
```

The agent should reproduce the failure when practical, or inspect available logs, tests, screenshots, or reports. It
should not edit code before understanding the observed behavior.

### 2. Compare behavior to the spec

The agent should compare the failure with relevant spec entries:

- `Must` for required outcomes
- `Must not` for forbidden behavior
- `Scenario` for concrete examples
- `Handles` for cases that must be handled
- `Returns` for outputs
- `Raises` for errors or failure states

Example:

```sdd
Must:
  Reject itinerary items without a place name.

Scenario: missing place name
  Given the place name is empty
  When the person adds the itinerary item
  Then validation fails
```

If code accepts an empty place name, the code has drifted from the contract.

### 3. Classify the problem

Common categories:

- **implementation drift:** code no longer satisfies the spec
- **test drift:** tests expect behavior the spec does not support
- **spec ambiguity:** the spec does not define the disputed behavior
- **missing spec coverage:** the behavior matters but no governing spec covers it

The fix depends on the category. Do not change specs to match broken behavior unless the user asks for a spec change.

### 4. Fix the smallest root cause

If the bug is implementation drift, fix the smallest root cause inside write authority.

Do not broaden error handling, add dependencies, or change public behavior beyond the governing spec. If the fix would
violate `Must not`, `Forbids`, write authority, or public contracts, stop and ask for direction.

### 5. Add regression verification

When appropriate, add or update a focused test so the bug cannot return silently.

Regression checks should map to the spec:

```text
Missing place name fails validation and does not store an item.
```

If test authority is unclear, ask before editing test files.

### 6. Report the contract and result

A good `specdd-debug` report includes:

- contract used
- observed failure
- root cause
- files changed
- regression verification added or updated
- checks run
- remaining uncertainty

## Common mistakes

- Fixing the symptom before comparing the behavior to the spec.
- Updating the spec to match broken behavior without approval.
- Treating ambiguous behavior as implementation drift.
- Adding broad error handling that changes public behavior.
- Fixing code but skipping a regression check for a confirmed bug.

## How to verify the result

Debugging worked when:

- observed behavior was compared to the governing spec
- the issue category is clear
- the fix stayed inside write authority
- no `Must not` or `Forbids` boundary was weakened
- regression verification covers the bug when practical
- the final report names the contract, root cause, files, and checks

## Related how-tos

- [How to recover from spec-code drift](/how-to/spec-driven-workflows/how-to-recover-from-spec-code-drift/)
- [How to derive tests from a spec](/how-to/work-with-specdd-skills/how-to-derive-tests-from-a-spec-specdd-test/)
- [How to implement under spec authority](/how-to/work-with-specdd-skills/how-to-implement-under-spec-authority-specdd-do/)
- [How to trace specs to code, tests, and gaps](/how-to/work-with-specdd-skills/how-to-trace-specs-to-code-tests-and-gaps-specdd-trace/)

## Related reference

- [Tools](/tools/)
- [Language reference](/language-reference/)
