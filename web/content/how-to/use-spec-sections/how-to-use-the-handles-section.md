---
title: "How to use the Handles section"
seoDescription: "Use the Handles section in SpecDD to document cases, events, states, branches, errors, or conditions the subject must handle."
excerpt: "Use Handles for required cases and conditions such as missing input, save failure, retries, events, or branch states."
level: "Intermediate"
howtoID: "1061016"
weight: 170
---

This guide shows you how to use the `Handles` section in a SpecDD `.sdd` file.

`Handles` lists cases, events, states, branches, errors, or conditions that the subject must handle. It is useful when
behavior depends on multiple important cases.

## Short answer

Use `Handles` to name the cases the subject must deal with, such as missing input, save failure, retry state, event
arrival, empty data, or unavailable dependencies. Keep each case local to the subject, and use `Scenario` or `Done when`
for important cases that need verification.

## Syntax

```sdd
Handles:
  missing place name
  missing trip date
  save failure
  moving a missing itinerary item
```

Rules:

- `Handles` is a mixed-entry body section.
- It may contain text, symbols, key-value lines, paths, or prose.
- It must not have inline text after `Handles:`.
- Body entries use two spaces.

## Steps

### 1. List cases that change behavior

Good:

```sdd
Handles:
  missing place name
  save failure
```

Weak:

```sdd
Handles:
  everything
```

The case should be specific enough to implement and review.

### 2. Keep cases local

For an itinerary spec:

```sdd
Handles:
  missing place name
  moving a place to another day
```

Do not list destination search ranking cases unless the itinerary spec owns that behavior.

### 3. Separate handling from errors raised

```sdd
Handles:
  storage save failure

Raises:
  ItinerarySaveFailed
```

The subject handles the storage failure and raises a local error.

### 4. Add scenarios for important cases

```sdd
Scenario: save failure
  Given trip storage rejects the save
  When the person adds a place
  Then the itinerary remains unchanged
  And a save failure is shown
```

Scenarios make complicated cases testable.

### 5. Use `Done when` for coverage expectations

```sdd
Done when:
  Missing-place and save-failure behavior are covered by checks.
```

This keeps important handled cases from being forgotten during implementation.

## Common mistakes

- Writing vague cases such as "all errors."
- Listing cases owned by another spec.
- Confusing cases handled with errors raised.
- Duplicating every `Scenario` title in `Handles` without adding value.
- Leaving important handled cases without any check or scenario.

## How to verify the result

The `Handles` section is useful when:

- each case is local and meaningful
- cases explain branches implementation must cover
- failure outputs are described in `Raises` when needed
- important cases have scenarios or checks
- reviewers can see which edge cases are intentional

## Related how-tos

- [How to use the Raises section](/how-to/use-spec-sections/how-to-use-the-raises-section/)
- [How to write Scenario blocks](/how-to/use-spec-sections/how-to-write-scenario-blocks/)
- [How to write Done when](/how-to/use-spec-sections/how-to-write-done-when/)

## Related reference

- [Language reference](/language-reference/)
