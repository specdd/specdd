---
title: "How to write Scenario blocks"
seoDescription: "Write SpecDD Scenario blocks with named behavioral examples using Given, When, Then, And, and But steps."
excerpt: "Use Scenario blocks for concrete behavior examples that can guide implementation, review, and tests."
level: "Beginner"
howtoID: "1061019"
weight: 200
---

This guide shows you how to write `Scenario` blocks in a SpecDD `.sdd` file.

`Scenario` defines a behavioral example in a Gherkin-like form. Scenarios are especially useful when a requirement
should become a test or review case.

## Short answer

Use `Scenario: name` for concrete behavior examples. Write steps with `Given`, `When`, `Then`, `And`, or `But` after two
spaces of indentation. Keep each scenario behavioral and testable. Do not use scenarios as implementation scripts or
long prose examples.

## Syntax

```sdd
Scenario: missing place name
  Given the place name is empty
  When the person adds a place
  Then validation fails
  And no itinerary item is stored
```

Rules:

- `Scenario` must have a nonempty inline title.
- `Scenario` may repeat when each title is distinct.
- Scenario step lines start with `Given`, `When`, `Then`, `And`, or `But`.
- Scenario steps use exactly two spaces of indentation.
- The language does not enforce step ordering.

## Steps

### 1. Name one behavior

Good:

```sdd
Scenario: missing place name
```

Weak:

```sdd
Scenario: validation
```

The better title helps reviewers know what behavior is covered.

### 2. Use behavior language

Good:

```sdd
Scenario: missing place name
  Given the place name is empty
  When the person adds a place
  Then validation fails
```

Too implementation-heavy:

```sdd
Scenario: missing place name
  Given validateInput is called with an object
  When the reducer branch executes
  Then the internal flag is false
```

Implementation details may be useful in tests, but the spec scenario should capture behavior.

### 3. Keep scenarios small

One scenario should cover one important case. Split different behaviors:

```sdd
Scenario: missing place name
  Given the place name is empty
  When the person adds a place
  Then validation fails

Scenario: valid place name
  Given the place name is "Louvre Museum"
  When the person adds a place
  Then the itinerary includes "Louvre Museum"
```

### 4. Connect scenarios to checks

Use `Done when`:

```sdd
Done when:
  Missing-place and valid-place scenarios are covered by checks.
```

This makes scenarios actionable.

## Common mistakes

- Reusing the same scenario title twice.
- Writing vague scenario names.
- Turning scenarios into code-level implementation scripts.
- Covering too many behaviors in one scenario.
- Adding scenarios that contradict `Must not` or inherited constraints.

## How to verify the result

The `Scenario` blocks are useful when:

- each scenario has a distinct title
- steps describe behavior a reviewer can understand
- important cases are checkable
- scenarios support, not replace, `Must` rules
- implementation can trace tests back to scenarios

## Related how-tos

- [How to write Must rules](/how-to/use-spec-sections/how-to-write-must-rules/)
- [How to write Done when](/how-to/use-spec-sections/how-to-write-done-when/)
- [How to use the Example section](/how-to/use-spec-sections/how-to-use-the-example-section/)

## Related reference

- [Language reference](/language-reference/)
