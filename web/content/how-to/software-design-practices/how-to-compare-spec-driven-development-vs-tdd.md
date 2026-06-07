---
title: "How to compare spec-driven development vs TDD"
seoDescription: "Compare Spec-driven development and test-driven development, understand where specs and tests differ, and learn how to combine SpecDD with TDD."
excerpt: "SpecDD defines durable behavior, ownership, and boundaries; TDD drives implementation through tests. Used together, specs explain why and tests prove what works."
level: "Beginner"
howtoID: "1101013"
weight: 140
---

This guide shows you how to compare spec-driven development with test-driven development.

TDD and SpecDD both improve design by making intended behavior explicit before or during implementation. They operate at
different levels. TDD uses tests to drive and prove behavior. SpecDD uses source-adjacent specs to define the durable
contract: purpose, ownership, boundaries, dependencies, required behavior, non-goals, tasks, and completion criteria.

The strongest workflow often uses both. The spec explains what belongs here and why. The tests prove the behavior works.

## Short answer

Use SpecDD to define the behavior, authority, and design boundaries. Use TDD to write executable checks that guide
implementation and prove the behavior. Specs are not tests, and tests are not specs. Specs preserve intent and scope;
tests verify behavior.

## When to use this guide

Use this guide when:

- your team already practices TDD and wants to add SpecDD
- someone asks whether specs replace tests
- tests exist but design intent is unclear
- agents can make tests pass while crossing architecture boundaries
- reviewers need to check both behavior and ownership
- scenarios in specs need to become test cases

## The difference

TDD usually starts with a failing test, then implementation, then refactoring. The test is executable. It proves whether
behavior works in the tested case.

SpecDD starts with a spec or spec update. The spec is not executable in the same way. It tells humans and agents what the
subject owns, what behavior matters, what must not happen, what dependencies matter, and what completion looks like.

That means a test can fail or pass, but a spec can authorize or reject a design direction.

## What SpecDD is better at

SpecDD is useful for:

- ownership and write authority
- architecture boundaries
- non-goals
- dependency direction
- task scope
- public contracts
- source-of-truth behavior
- explaining why behavior belongs in a specific place

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

Must not:
  Save itinerary items directly.
  Render UI feedback.

Done when:
  Missing-place validation is covered by a check.
```

The spec says where validation belongs and what it must not absorb. A test alone usually does not communicate that
design boundary.

## What TDD is better at

TDD is useful for:

- executable feedback
- precise examples
- regression protection
- implementation pressure toward smaller units
- confidence during refactoring
- confirming edge cases

A test derived from the spec might check:

```text
Given the place name is empty, validation fails and no itinerary item is saved.
```

The test proves the behavior. The spec explains why validation belongs in this unit and why saving must stay elsewhere.

## How to combine SpecDD and TDD

### 1. Write or update the spec

Start with durable behavior and boundaries:

```sdd
Must:
  Reject itinerary items without a place name.

Must not:
  Save itinerary items directly.
```

### 2. Review the spec

Before writing tests, check:

- Is the behavior intended?
- Does the spec own it?
- Are non-goals clear?
- Are dependencies visible?
- Is the behavior testable?

### 3. Derive tests from the spec

Use `Must`, `Must not`, `Scenario`, `Example`, `Handles`, `Raises`, and `Done when` to choose tests.

Good test sources:

- required behavior in `Must`
- forbidden behavior in `Must not`
- input/output examples
- error behavior in `Raises`
- concrete `Scenario` blocks
- completion criteria in `Done when`

### 4. Implement with TDD if useful

Write a failing test for one specified behavior, implement the smallest change that passes, then refactor while staying
inside the spec boundary.

### 5. Review both

During review, ask:

- Do tests cover the specified behavior?
- Did implementation stay inside `Owns` or `Can modify`?
- Did it avoid `Must not` and `Forbids` violations?
- Did tests accidentally depend on private implementation detail?
- Did implementation reveal a missing spec rule?

## Example workflow

Spec:

```sdd
Scenario: missing place name
  Given the place name is empty
  When the person adds the itinerary item
  Then validation fails
  And no itinerary item is stored
```

TDD step:

```text
Write a failing test for missing-place itinerary validation.
```

Implementation step:

```text
Implement the missing-place itinerary validation behavior.
```

Review step:

```text
Review the Itinerary Validation change against its spec and checks.
```

Each prompt names the work in human terms and keeps the action focused.

## Common mistakes

- Treating specs as a replacement for tests.
- Treating tests as a replacement for ownership, boundaries, and source-of-truth intent.
- Writing tests from a vague spec without reviewing the spec first.
- Making tests pass by violating `Must not` or `Forbids`.
- Keeping tests updated while letting specs drift.
- Writing specs that restate test code instead of explaining durable behavior.

## How to verify the result

SpecDD and TDD are working together when:

- specs define intended behavior and boundaries
- tests prove specified behavior
- scenarios become useful test inputs
- implementation stays inside spec authority
- refactoring preserves both test results and spec constraints
- behavior changes update specs and tests together

## Related how-tos

- [How to design testable code with specs](/how-to/software-design-practices/how-to-design-testable-code-with-specs/)
- [How to write Scenario blocks](/how-to/use-spec-sections/how-to-write-scenario-blocks/)
- [How to run the spec-first loop](/how-to/spec-driven-workflows/how-to-run-the-spec-first-loop/)
- [How to write Done when](/how-to/use-spec-sections/how-to-write-done-when/)

## Related reference

- [Language reference](/language-reference/)
