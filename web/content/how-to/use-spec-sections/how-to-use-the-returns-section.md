---
title: "How to use the Returns section"
seoDescription: "Use the Returns section in SpecDD to document returned values, response shapes, result states, generated files, exit codes, or other observable outputs."
excerpt: "Use Returns for observable outputs so reviewers can compare implementation, tests, and user-visible results against one contract."
level: "Beginner"
howtoID: "1061014"
weight: 150
---

This guide shows you how to use the `Returns` section in a SpecDD `.sdd` file.

`Returns` lists return values, output types, response shapes, result states, generated artifacts, output files, exit
values, or other observable results.

## Short answer

Use `Returns` for what the subject produces when it succeeds or completes. Keep failure conditions in `Raises`, inputs
in `Accepts`, and side-effect or handling behavior in `Must` or `Handles` when needed.

## Syntax

```sdd
Returns:
  updated itinerary
  validation message when an itinerary item cannot be added
```

Rules:

- `Returns` is a mixed-entry body section.
- It may contain text, symbols, paths, key-value lines, or prose.
- It must not have inline text after `Returns:`.
- Body entries use two spaces.

## Steps

### 1. List outputs people can observe

Examples:

```sdd
Returns:
  updated itinerary
  ItineraryUpdateResult
```

For a CLI:

```sdd
Returns:
  exit code 0 when checks pass
  generated report file
```

For an API:

```sdd
Returns:
  200 response with updated itinerary
  400 response for validation failure
```

If your project treats error responses as raised failure states, put those in `Raises` instead.

### 2. Use result states when values vary

```sdd
Returns:
  saved state when the itinerary item is valid
  unchanged state when validation fails
```

This helps tests and review focus on observable behavior.

### 3. Separate failure behavior

```sdd
Returns:
  updated itinerary

Raises:
  ItineraryPlaceRequired
  ItinerarySaveFailed
```

This keeps success outputs and failure conditions easy to scan.

### 4. Pair with `Accepts`

Together:

```sdd
Accepts:
  place name
  trip date

Returns:
  updated itinerary
```

The pair describes a small interface contract.

## Common mistakes

- Listing input fields in `Returns`.
- Hiding error conditions in a success output line.
- Describing implementation internals rather than observable output.
- Leaving generated files or exit codes unspecified for automation specs.
- Updating code output without updating `Returns`.

## How to verify the result

The `Returns` section is useful when:

- outputs are observable
- success and failure are separated clearly
- tests or scenarios can check important outputs
- generated artifacts and exit codes are included when relevant
- output changes are visible in review

## Related how-tos

- [How to use the Accepts section](/how-to/use-spec-sections/how-to-use-the-accepts-section/)
- [How to use the Raises section](/how-to/use-spec-sections/how-to-use-the-raises-section/)
- [How to write Done when](/how-to/use-spec-sections/how-to-write-done-when/)

## Related reference

- [Language reference](/language-reference/)
