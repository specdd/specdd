---
title: "How to derive tests from a spec (specdd-test)"
seoDescription: "Derive tests from SpecDD specs in a spec-driven development workflow with specdd-test by mapping Must, Scenario, Handles, Returns, Raises, Tasks, and Done when entries to focused verification."
excerpt: "Use specdd-test to turn active SpecDD contracts into focused tests, regression checks, and coverage-gap reports without building broad test harnesses."
level: "Intermediate"
howtoID: "1091005"
weight: 90
---

This guide shows you how to use `specdd-test` to derive focused tests from active SpecDD specs in a spec-driven
development workflow.

Tests should prove the behavior the spec requires. They should not test the wording of the spec, and they should not
create a broad harness unless the spec or project conventions call for it.

## Short answer

Use `specdd-test` when an agent should add, update, derive, or assess tests from SpecDD contracts. The agent should
identify test authority, derive cases from `Must`, `Scenario`, `Handles`, `Returns`, `Raises`, `Tasks`, and `Done when`,
add the smallest useful checks, run the relevant project test command, and report which spec entries are covered or
still unverified.

## When to use this guide

Use this guide when:

- a spec has scenarios but no tests
- a bug fix needs a regression check
- task completion depends on `Done when`
- a review found behavior with weak verification
- an implementation changed required behavior
- forbidden behavior can regress silently

## Steps

### 1. Choose the behavior to verify

Use a focused prompt:

```text
Derive tests for Itinerary validation.
```

or:

```text
Assess test coverage for Itinerary validation.
```

Avoid asking for all tests in a large module unless that is the actual review task.

### 2. Identify test authority

The agent should confirm that tests can be edited under the nearest relevant spec.

Example:

```sdd
Owns:
  ./itinerary.js
  ./itinerary.test.js
```

If the spec requires behavior but does not grant clear authority to edit a test file, the agent should ask before
editing. Do not assume any nearby test file is writable just because it has a similar name.

### 3. Derive cases from spec entries

Useful sources include:

- `Must` for required behavior
- `Scenario` for concrete examples
- `Handles` for cases and states that must be handled
- `Returns` for observable outputs
- `Raises` for errors or failure modes
- `Tasks` for current implementation work
- `Done when` for completion criteria

Example:

```sdd
Must:
  Reject itinerary items without a place name.
  Keep existing itinerary items unchanged when validation fails.

Done when:
  Missing-place behavior is covered by a check.
```

Possible tests:

- missing place name is rejected
- no item is stored when validation fails
- existing itinerary items remain unchanged

### 4. Prefer small behavior tests

Write tests that prove observable behavior.

Good:

```text
Rejects an itinerary item without a place name and leaves the itinerary unchanged.
```

Weak:

```text
Checks that the validation function contains a condition named place.
```

The spec describes behavior and contracts. Tests should verify behavior and contracts, not implementation wording.

### 5. Cover forbidden regressions when needed

Some `Must not` and `Forbids` rules deserve checks when they can regress silently.

Example:

```sdd
Must not:
  Change destination search behavior.
```

If itinerary validation previously broke destination search, add a regression check or include the existing destination
checks in verification. If the forbidden behavior is better covered by review or architecture linting, report that.

### 6. Run the relevant test command

Use the project command named in shared conventions or local setup. The test command might be a focused unit test, a
package-level test, or a documentation check.

If tests cannot run, the report should explain why and list what remains unverified.

### 7. Report coverage and gaps

A good `specdd-test` report includes:

- spec entries covered by each test
- tests added or updated
- command run and result
- specified behavior that still lacks verification
- any unclear test authority

## Example

Spec:

```sdd
Scenario: missing place name
  Given the place name is empty
  When the person adds the itinerary item
  Then validation fails
  And no itinerary item is stored
```

Derived checks:

```text
1. Empty place name returns a validation failure.
2. The itinerary item count stays unchanged.
3. Existing itinerary items are still present after the failed add.
```

These tests prove the scenario rather than mirroring its words.

## Common mistakes

- Testing implementation details instead of specified behavior.
- Adding a large test harness for one local behavior.
- Ignoring `Done when` and testing only the happy path.
- Editing a test file without spec authority.
- Marking a task done when tests were derived but not run.

## How to verify the result

The testing workflow worked when:

- test files are authorized by the governing spec
- tests map to concrete spec entries
- regression checks cover confirmed bugs
- relevant commands ran or skipped checks are explained
- remaining verification gaps are explicit
- task status changes happen only after checks pass

## Related how-tos

- [How to trace specs to code, tests, and gaps](/how-to/work-with-specdd-skills/how-to-trace-specs-to-code-tests-and-gaps-specdd-trace/)
- [How to implement under spec authority](/how-to/work-with-specdd-skills/how-to-implement-under-spec-authority-specdd-do/)
- [How to review a diff against specs](/how-to/work-with-specdd-skills/how-to-review-a-diff-against-specs-specdd-review/)
- [How to keep specs in sync with code changes](/how-to/spec-driven-workflows/how-to-keep-specs-in-sync-with-code-changes/)

## Related reference

- [Tools](/tools/)
- [Language reference](/language-reference/)
