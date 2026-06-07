---
title: "How to use the Example section"
seoDescription: "Use the Example section in SpecDD for concrete payloads, snippets, values, transformations, or expected states that clarify a local contract."
excerpt: "Use Example sparingly for concrete values or transformations that make a spec easier to implement and review."
level: "Beginner"
howtoID: "1061020"
weight: 210
---

This guide shows you how to use the `Example` section in a SpecDD `.sdd` file.

`Example` provides concrete examples, payloads, usage snippets, or expected transformations. It is useful when a small
piece of concrete data makes an abstract rule easier to apply.

## Short answer

Use `Example` for small concrete values, payloads, snippets, or transformations. `Example` may have an inline title, or
it may be titleless. Use `Scenario` for behavior flow and `Must` for required rules. Keep examples short enough to
review.

## Syntax

Both forms are valid:

```sdd
Example:
  input place name: Louvre Museum
  input trip date: 2026-06-12
  result itinerary status: updated
```

```sdd
Example: missing trip date
  input place name: Louvre Museum
  result error: missing trip date
```

Rules:

- `Example` may have an inline title.
- `Example` may repeat.
- Example body entries are normal mixed-entry body entries.
- Body entries use two spaces.

## Steps

### 1. Use examples to clarify values

```sdd
Example: valid itinerary item
  place name: Louvre Museum
  trip date: 2026-06-12
  result: itinerary item is accepted
```

This helps reviewers and implementers understand shape and expectation.

### 2. Use scenarios for behavior flow

If the important part is a sequence, use `Scenario`:

```sdd
Scenario: missing place name
  Given the place name is empty
  When the person adds a place
  Then validation fails
```

Use `Example` for concrete data that supports that behavior.

### 3. Keep examples small

Do not paste large payloads or long code files into a spec. Reference the file instead:

```sdd
References:
  ./fixtures/missing-place.json

Example: missing place fixture
  Uses the missing-place fixture.
```

### 4. Avoid using examples as requirements by accident

If a behavior is required, write it in `Must`:

```sdd
Must:
  Reject itinerary items without a place name.

Example: missing place name
  input place name: empty
  result: validation failure
```

The example illustrates the rule; it should not be the only place the rule appears.

## Common mistakes

- Using `Example` as the only statement of required behavior.
- Pasting large fixtures into the spec.
- Writing behavior flows that belong in `Scenario`.
- Leaving example values stale after contracts change.
- Adding many examples when one precise one would be enough.

## How to verify the result

The `Example` section is useful when:

- the example clarifies a rule or contract
- it stays small
- required behavior appears in `Must`, contract sections, or scenarios
- large artifacts are referenced instead of pasted
- examples remain easy to update

## Related how-tos

- [How to write Scenario blocks](/how-to/use-spec-sections/how-to-write-scenario-blocks/)
- [How to use the References section](/how-to/use-spec-sections/how-to-use-the-references-section/)
- [How to use paths in SpecDD sections](/how-to/use-spec-sections/how-to-use-paths-in-specdd-sections/)

## Related reference

- [Language reference](/language-reference/)
