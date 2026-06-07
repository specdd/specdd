---
title: "How to find test coverage gaps from specs"
seoDescription: "Find test coverage gaps from SpecDD specs in a spec-driven development workflow by tracing Must, Scenario, Handles, Raises, Returns, Must not, and Done when entries to actual checks."
excerpt: "Use specs as a coverage map: trace required behavior and boundaries to tests, identify missing checks, and decide what needs verification next."
level: "Intermediate"
howtoID: "1131003"
weight: 40
---

This guide shows you how to find test coverage gaps from SpecDD specs in a spec-driven development workflow.

Spec coverage is not the same as line coverage. A code coverage report can tell you which lines ran. A spec coverage
review asks a different question: does the project have checks for the behavior and boundaries the spec says must be
true?

SpecDD is an amazing way to do this because specs already name the intended behavior. You can work from `Must`,
`Scenario`, `Handles`, `Raises`, `Returns`, `Must not`, `Forbids`, and `Done when` entries to identify what should be
verified.

## Short answer

Pick a local spec, list the entries that imply verification, and map each entry to an existing test, static check,
contract check, review step, or known gap. Use `specdd-trace` when you want an agent to report the mapping. Add focused
follow-up tasks for important gaps, but do not treat every untested line as a spec coverage failure.

## When to use this guide

Use this guide when:

- a scenario has no obvious test
- `Done when` says behavior is covered but no check exists
- a bug fix needs a regression test
- a reviewer asks what proves a spec entry
- a spec was generated from existing code and needs verification review
- a risky `Must not` or `Forbids` rule may need a guard

## What counts as a coverage gap

A gap exists when a spec entry describes behavior or a boundary that matters, but there is no reasonable verification
evidence for it.

Verification evidence can include:

- unit tests
- integration tests
- end-to-end tests
- contract tests
- snapshot tests
- static import or dependency checks
- lint rules
- benchmark checks
- manual review evidence when automation is not practical

Do not force every spec entry into the same test type. Choose evidence that matches the risk.

## Steps

### 1. Choose the target spec

Keep the trace narrow:

```text
Trace the Itinerary Validation coverage.
```

Avoid broad targets like "trace all trip tests" unless you are doing a planned audit. Coverage review is more useful
when it stays close to one local spec or behavior.

### 2. List test-relevant entries

From this spec:

```sdd
Spec: Itinerary Validation

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

Test-relevant entries include:

- missing place name is rejected
- existing items remain unchanged
- no storage write happens directly
- the missing-place scenario is covered
- the `Done when` check exists

### 3. Map entries to existing checks

Create a simple map:

```text
Spec entry: Reject itinerary items without a place name.
Evidence: itinerary-validation.test.js covers empty place name.

Spec entry: Preserve existing itinerary items when validation fails.
Evidence: no current check.
Gap: add regression test.
```

The mapping should mention behavior, not just file names.

### 4. Classify gaps

Not every gap has the same urgency.

Classify gaps as:

- missing required behavior check
- missing regression check for a known bug
- missing negative-boundary check
- missing contract check
- missing static dependency guard
- acceptable manual-review-only item
- unclear spec entry that needs revision before testing

This prevents coverage work from becoming a vague demand for more tests.

### 5. Use specdd-trace when useful

Ask for a trace when you want a structured report:

```text
Trace Itinerary Validation to code and tests.
```

A useful trace should report:

- which spec entries were considered
- what implementation or test evidence exists
- which scenarios are covered
- which entries are unverified
- whether any tests prove stale or accidental behavior

Tracing should be read-only unless you ask for edits.

### 6. Turn important gaps into local tasks

For an important gap:

```sdd
Tasks:
  [ ] Add a regression check that validation failure preserves existing itinerary items.
```

Keep tasks inside the spec's `Owns` or `Can modify` authority. If the missing check belongs in another spec, add the
task there.

## Coverage map example

```text
Spec: Itinerary Validation

Entry: Reject itinerary items without a place name.
Evidence: missing-place validation test.
Status: covered.

Entry: Preserve existing itinerary items when validation fails.
Evidence: none.
Status: gap, add regression check.

Entry: Must not save itinerary items directly.
Evidence: no direct storage dependency in validation code; no static guard.
Status: review-covered now, consider import-boundary check if this regresses.
```

This gives reviewers a practical next step instead of a vague "coverage is low" comment.

## Common mistakes

- Equating line coverage with spec coverage.
- Calling a scenario covered when the test checks only the first assertion.
- Treating every `Must not` as requiring a unit test when a static check or review may be better.
- Adding tests in a file not covered by spec write authority.
- Ignoring stale tests that prove old behavior.
- Producing a file list instead of mapping spec entries to evidence.

## How to verify the result

The coverage review is useful when:

- each important spec entry has evidence or a named gap
- scenarios are mapped to actual checks
- negative constraints are classified by practical verification type
- important gaps become local tasks
- stale or accidental tests are called out
- reviewers know what to add, update, or accept as manual evidence

## Related how-tos

- [How to trace specs to code, tests, and gaps](/how-to/work-with-specdd-skills/how-to-trace-specs-to-code-tests-and-gaps-specdd-trace/)
- [How to derive tests from a spec](/how-to/work-with-specdd-skills/how-to-derive-tests-from-a-spec-specdd-test/)
- [How to define acceptance criteria for implementation](/how-to/testing-and-quality/how-to-define-acceptance-criteria-for-implementation/)
- [How to write Done when](/how-to/use-spec-sections/how-to-write-done-when/)

## Related reference

- [Tools](/tools/)
- [Language reference](/language-reference/)
