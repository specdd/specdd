---
title: "How to use SpecDD with TDD"
seoDescription: "Use spec-driven development with TDD by reviewing the governing spec, deriving a failing test from it, implementing inside spec authority, and keeping specs and tests aligned."
excerpt: "Combine SpecDD's source-of-truth contracts with TDD's executable feedback loop so tests prove the behavior the spec defines."
level: "Intermediate"
howtoID: "1131000"
weight: 10
---

This guide shows you how to use SpecDD with test-driven development.

TDD is strongest when the behavior being tested is already clear. SpecDD gives that clarity by defining the durable
contract: what the subject owns, what it must do, what it must not do, and what counts as done. TDD then turns part of
that contract into executable feedback.

The combined workflow is simple: review the spec, derive one test, make it pass, refactor inside the boundary, and keep
the spec, task status, and tests aligned.

## Short answer

Start from a reviewed spec, not from a vague prompt. Pick one `Must`, `Scenario`, `Handles`, `Raises`, `Returns`, or
`Done when` entry. Write a failing test that proves that behavior. Implement only enough code to pass while staying
inside `Owns` or `Can modify` and respecting `Must not` and `Forbids`. Then refactor, rerun checks, and update local
tasks only after verification passes.

## When to use this guide

Use this guide when:

- a spec describes behavior that is not yet implemented
- a bug fix needs a regression check
- a task has `Done when` criteria that should become tests
- a scenario is clear enough to drive implementation
- the team wants TDD feedback without losing SpecDD boundaries
- an agent can write tests but needs a durable behavior source

## The workflow

### 1. Review the spec first

Before writing a test, confirm the spec is ready:

- the subject is local
- behavior is observable
- write authority includes the relevant test file
- `Must not` and `Forbids` do not conflict with the intended implementation
- `Done when` identifies the checks that should exist

Example:

```sdd
Spec: Itinerary Validation

Purpose:
  Decide whether an itinerary item can be saved.

Owns:
  ./itinerary-validation.js
  ./itinerary-validation.test.js

Must:
  Reject itinerary items without a place name.
  Preserve existing itinerary items when validation fails.

Must not:
  Save itinerary items directly.

Scenario: missing place name
  Given the place name is empty
  When the person adds the itinerary item
  Then validation fails
  And no itinerary item is stored

Done when:
  Missing-place validation is covered by a check.
```

This is a good TDD source because it names the unit, the behavior, the forbidden effect, and the needed check.

### 2. Choose one behavior

Do not start by testing the whole spec. Pick one behavior:

```text
Missing place name is rejected and the itinerary remains unchanged.
```

This keeps the TDD loop small and makes failures easier to interpret.

### 3. Write the failing test

The test should prove behavior, not spec wording:

```text
Rejects an itinerary item without a place name and leaves existing items unchanged.
```

Avoid tests that assert implementation detail:

```text
Uses validatePlaceName before saveItinerary.
```

That may over-constrain the implementation unless the call order is part of the spec.

### 4. Implement inside spec authority

Make the smallest implementation change that satisfies the test and the spec.

Check:

- Are edits inside `Owns` or `Can modify`?
- Is the implementation avoiding forbidden behavior?
- Is it adding only the selected behavior?
- Is it preserving parent constraints?

Passing the test is not enough if the code violates `Must not` or `Forbids`.

### 5. Refactor without crossing boundaries

After the test passes, refactor if needed. The refactor must still preserve:

- the test result
- the `Must` behavior
- the `Must not` and `Forbids` boundaries
- the local write authority

If refactoring requires moving behavior to another owner, stop and update or add the owning spec first.

### 6. Update tasks after checks pass

If the spec contains:

```sdd
Tasks:
  [ ] Add missing-place validation.
```

mark it done only after:

- code implements the behavior
- the derived test passes
- relevant quality gates pass
- no spec boundaries were violated

Tasks are not done because code was written. They are done because specified behavior has been implemented and checked.

## Working with an agent

Useful focused prompts:

```text
Write the failing test for missing-place itinerary validation.
```

```text
Implement the missing-place itinerary validation behavior.
```

```text
Review the Itinerary Validation change against its spec and tests.
```

Keep each prompt to one action. Review the output before moving to the next step.

## Common mistakes

- Writing tests before reviewing whether the spec is correct.
- Testing implementation details not required by the spec.
- Making a test pass by editing outside spec authority.
- Ignoring `Must not` because the happy-path test passes.
- Marking a task done before running checks.
- Letting a failing test redefine the spec instead of updating the spec intentionally.

## How to verify the result

SpecDD and TDD are working together when:

- each test traces to a concrete spec entry
- the implementation stays inside local authority
- forbidden behavior is still prevented
- refactoring preserves both tests and specs
- tasks are updated only after checks pass
- spec changes and test changes stay in sync when behavior changes

## Related how-tos

- [How to compare spec-driven development vs TDD](/how-to/software-design-practices/how-to-compare-spec-driven-development-vs-tdd/)
- [How to derive tests from a spec](/how-to/work-with-specdd-skills/how-to-derive-tests-from-a-spec-specdd-test/)
- [How to write Scenario blocks](/how-to/use-spec-sections/how-to-write-scenario-blocks/)
- [How to run the spec-first loop](/how-to/spec-driven-workflows/how-to-run-the-spec-first-loop/)

## Related reference

- [Language reference](/language-reference/)
