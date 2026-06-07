---
title: "How to trace specs to code, tests, and gaps (specdd-trace)"
seoDescription: "Trace SpecDD specs to code, tests, docs, changed files, and coverage gaps in a spec-driven development workflow with specdd-trace without expanding write authority."
excerpt: "Use specdd-trace to map why specs and files are included, what constraints they contribute, what code or tests satisfy them, and where gaps remain."
level: "Intermediate"
howtoID: "1091004"
weight: 110
---

This guide shows you how to use `specdd-trace` to connect spec-driven development contracts to code, tests, docs, changed files, and
coverage gaps.

Tracing is useful when you need to understand whether the repository actually satisfies the specs. It is not a write
authority expansion. Referenced files remain read context unless another active spec grants modification authority.

## Short answer

Use `specdd-trace` when you need a map from specs to implementation and verification. The agent should identify why
each spec, file, test, or doc was included, what constraints it contributes, what code or tests satisfy those
constraints, and where gaps, stale specs, unclear authority, or missing checks remain.

## When to use this guide

Use this guide when:

- a reviewer asks how a spec is covered by code and tests
- a scenario may be untested
- changed files need to be tied back to governing specs
- a spec may be stale
- a module has unclear ownership
- documentation should be checked against implementation behavior

## Steps

### 1. Choose the trace target

Use a focused prompt:

```text
Trace the Itinerary validation behavior.
```

or:

```text
Trace the Itinerary change to tests.
```

The target can be a spec, feature, behavior, changed file, or review concern. Keep it narrow enough that the trace is
useful.

### 2. Map why each item is included

For every relevant item, the trace should say why it is included:

- bootstrap context
- ancestor spec
- nearest local spec
- same-basename spec
- explicit reference
- requested file
- changed file
- test or doc related to the specified behavior

This prevents nearby files from becoming relevant just because they have similar names.

### 3. Connect constraints to implementation

For each important spec entry, map the implementation evidence.

Example:

```text
Spec entry: Itinerary must reject missing place names.
Implementation: itinerary validation checks place name before storing an item.
Gap: no check covers unchanged itinerary state after validation failure.
```

The trace should connect behavior, not merely list files.

### 4. Connect scenarios to verification

SpecDD scenarios are good trace anchors:

```sdd
Scenario: missing place name
  Given the place name is empty
  When the person adds the itinerary item
  Then validation fails
  And no itinerary item is stored
```

The trace should identify whether a test, check, or review step covers the scenario. If not, it should name that as a
coverage gap.

### 5. Name gaps and stale links

A useful trace can reveal:

- specified behavior with no implementation
- implementation with no spec authority
- scenarios with no tests
- tests that prove old behavior
- docs that describe stale behavior
- referenced specs treated as writable authority
- unclear ownership across specs

Do not hide gaps by stretching the interpretation of a spec entry.

### 6. Keep trace read-only unless edits are requested

`specdd-trace` should explain relationships. It should not edit files unless you explicitly ask for follow-up changes.

Use a separate prompt after reviewing the trace:

```text
Add the missing Itinerary validation test.
```

or:

```text
Update the Itinerary spec for the reviewed behavior.
```

## Example trace shape

```text
Item: src/trips/itinerary.sdd
Why included: nearest local spec for Itinerary behavior.
Contributes: missing-place validation rule, destination-search boundary, Done when criteria.
Satisfied by: itinerary validation code and missing-place test.
Gap: no regression check for unchanged itinerary state after validation failure.
```

## Common mistakes

- Treating a trace as permission to edit every file it mentions.
- Listing files without explaining the contract each file satisfies.
- Ignoring stale tests because the implementation currently passes.
- Calling a scenario covered when only part of it is checked.
- Following sibling specs that are neither inherited nor explicitly referenced.

## How to verify the result

The trace worked when:

- every listed item has a reason for inclusion
- active constraints are connected to code, tests, docs, or tasks
- gaps are named clearly
- referenced context remains read-only
- stale specs or tests are identified without silently changing them
- the report gives a practical next step

## Related how-tos

- [How to review a diff against specs](/how-to/work-with-specdd-skills/how-to-review-a-diff-against-specs-specdd-review/)
- [How to derive tests from a spec](/how-to/work-with-specdd-skills/how-to-derive-tests-from-a-spec-specdd-test/)
- [How to keep specs in sync with code changes](/how-to/spec-driven-workflows/how-to-keep-specs-in-sync-with-code-changes/)
- [How to recover from spec-code drift](/how-to/spec-driven-workflows/how-to-recover-from-spec-code-drift/)

## Related reference

- [Tools](/tools/)
- [Language reference](/language-reference/)
