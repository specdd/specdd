---
title: "How to review whether a spec is testable"
seoDescription: "Review whether a SpecDD spec is testable in a spec-driven development workflow by checking observable behavior, deterministic outcomes, concrete scenarios, measurable Done when, and reviewable constraints."
excerpt: "Use a practical testability review to catch vague specs before implementation starts and make behavior easier to verify."
level: "Intermediate"
howtoID: "1131007"
weight: 80
---

This guide shows you how to review whether a SpecDD spec is testable in a spec-driven development workflow.

A spec can look clear in prose and still be hard to verify. It may use subjective language, hide important inputs,
combine several responsibilities, omit expected outcomes, or define `Done when` criteria that do not name actual
evidence.

Testability review catches those problems before implementation starts. The goal is not to force every spec entry into a
unit test. The goal is to make sure important behavior and constraints can be observed, checked, reviewed, or traced.

## Short answer

A testable spec has a local subject, observable behavior, deterministic outcomes, concrete examples, practical negative
constraints, and measurable `Done when` criteria. If a reviewer cannot say how a `Must`, `Scenario`, `Must not`, or
`Done when` entry would be verified, revise the spec before using it for implementation.

## When to use this guide

Use this guide when:

- a draft spec will guide implementation
- generated specs need review before becoming authority
- `Must` entries use vague quality language
- scenarios do not have clear outcomes
- `Done when` says "works" or "tests pass"
- tests derived from the spec keep becoming too broad
- reviewers cannot tell whether a change satisfies the spec

## Testable does not always mean unit-testable

Some entries are best verified by:

- unit tests
- integration tests
- end-to-end tests
- contract tests
- static checks
- lint rules
- benchmark checks
- manual review evidence

The review question is not "can every line become a unit test?" The question is "can the important behavior or
constraint be checked with appropriate evidence?"

## Steps

### 1. Check the subject

Testability starts with scope:

```sdd
Spec: Itinerary Validation
```

is easier to verify than:

```sdd
Spec: Trip Improvements
```

If the subject is broad, tests will likely need broad setup. Split the spec or narrow the subject before implementation.

### 2. Check observable behavior

Good:

```sdd
Must:
  Reject itinerary items without a place name.
  Preserve existing itinerary items when validation fails.
```

Weak:

```sdd
Must:
  Handle bad input gracefully.
```

Observable behavior has inputs and outcomes a test or review can see.

### 3. Check deterministic outcomes

Ask:

- Given the same input, should the result be the same?
- If behavior depends on time, randomness, external services, permissions, or state, does the spec say how?
- Are retries, timeouts, and failure cases bounded?
- Does the spec name what happens on success and failure?

If behavior is intentionally nondeterministic, specify the stable contract around it.

### 4. Check scenarios

A good scenario has concrete setup, action, and expected result:

```sdd
Scenario: missing place name
  Given the place name is empty
  When the person adds the itinerary item
  Then validation fails
  And no itinerary item is stored
```

Weak:

```sdd
Scenario: invalid input
  Given invalid input
  When it is handled
  Then it works correctly
```

Scenarios should not hide the important condition or outcome.

### 5. Check negative constraints

`Must not` and `Forbids` can be testable, but the evidence may vary.

Behavior boundary:

```sdd
Must not:
  Save itinerary items after validation fails.
```

Possible evidence: regression test.

Dependency boundary:

```sdd
Forbids:
  UI importing ../adapters/*
```

Possible evidence: static import check or code review.

If a negative rule is important and likely to regress, decide what evidence is appropriate.

### 6. Check Done when

Strong:

```sdd
Done when:
  Missing-place validation is covered by a check.
  Validation failure preserves existing itinerary items.
  UI components do not import trip storage adapters.
```

Weak:

```sdd
Done when:
  Tests pass.
  It is complete.
```

`Done when` should identify the behavior, boundary, or evidence that proves completion.

### 7. Revise vague entries before testing

Do not ask implementers to "figure out the tests" from a vague spec. First revise the spec:

```sdd
Must:
  Show a validation message beside the place name input when the place name is missing.
```

is better than:

```sdd
Must:
  Show a nice validation experience.
```

The revised rule can be checked.

## Testability checklist

Use this checklist before implementation:

- The spec subject is local.
- `Purpose` names one responsibility.
- `Must` rules describe observable behavior.
- Inputs and outputs are clear where needed.
- Failure behavior is specified when important.
- Scenarios have concrete given, when, and then steps.
- `Must not` rules prevent plausible wrong work.
- `Forbids` rules identify blocked paths, dependencies, or access patterns.
- `Done when` names checks or review evidence.
- Tasks can be completed inside local authority.

## Common mistakes

- Accepting vague `Must` rules because the team "knows what it means."
- Treating every negative constraint as a unit test requirement.
- Writing scenarios without expected outcomes.
- Adding `Done when` criteria that do not name evidence.
- Testing through an end-to-end path because the spec subject is too broad.
- Reviewing grammar but not observability, determinism, and verification.

## How to verify the result

The spec is testable when:

- reviewers can name the appropriate evidence for each important entry
- scenarios can become concrete checks
- negative constraints have a practical verification path
- `Done when` is measurable
- ambiguous or subjective criteria have been rewritten
- implementation can start without guessing how completion will be judged

## Related how-tos

- [How to design testable code with specs](/how-to/software-design-practices/how-to-design-testable-code-with-specs/)
- [How to review a draft spec before using it](/how-to/spec-writing-technique/how-to-review-a-draft-spec-before-using-it/)
- [How to write Done when](/how-to/use-spec-sections/how-to-write-done-when/)
- [How to write Scenario blocks](/how-to/use-spec-sections/how-to-write-scenario-blocks/)

## Related reference

- [Language reference](/language-reference/)
