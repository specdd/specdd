---
title: "How to use the Accepts section"
seoDescription: "Use the Accepts section in SpecDD to document accepted inputs, request shapes, parameters, preconditions, or input states."
excerpt: "Use Accepts to make input expectations explicit so implementation, tests, and review share the same contract."
level: "Beginner"
howtoID: "1061013"
weight: 140
---

This guide shows you how to use the `Accepts` section in a SpecDD `.sdd` file.

`Accepts` lists accepted inputs, input types, request shapes, parameters, or preconditions for the specified subject.

## Short answer

Use `Accepts` to document what the subject receives or requires as input. Keep it concrete and local. Use `Must` for
validation behavior, `Raises` for failures, and `Returns` for outputs.

## Syntax

```sdd
Accepts:
  place name
  trip date
  AddItineraryPlaceInput
```

Rules:

- `Accepts` is a mixed-entry body section.
- It may contain text, symbols, key-value lines, paths, or prose.
- It must not have inline text after `Accepts:`.
- Body entries use two spaces.

## Steps

### 1. List important inputs

Simple:

```sdd
Accepts:
  place name
  trip date
```

Typed:

```sdd
Accepts:
  @AddItineraryPlaceInput
```

API-shaped:

```sdd
Accepts:
  tripId: existing trip identifier
  body.placeName: nonempty place name
```

### 2. Include preconditions when they affect behavior

```sdd
Accepts:
  Existing trip identifier.
  Place name and trip date from the itinerary form.
```

If the precondition becomes a behavior rule, put it in `Must` too.

### 3. Put validation failure in `Raises`

```sdd
Accepts:
  place name

Raises:
  ItineraryPlaceRequired
```

Use `Must` for required validation:

```sdd
Must:
  Reject itinerary items without a place name.
```

### 4. Avoid copying large schemas

If a schema file already exists, reference it:

```sdd
References:
  ./schemas/add-itinerary-place.schema.json

Accepts:
  AddItineraryPlaceInput from the schema.
```

Do not paste a long schema into `Accepts` unless the spec really needs the local summary.

## Common mistakes

- Mixing accepted inputs and returned outputs in one section.
- Hiding validation behavior only in `Accepts`.
- Copying a long external schema into the spec.
- Listing implementation-local variables that are not part of the contract.
- Letting `Accepts` become stale after interface changes.

## How to verify the result

The `Accepts` section is useful when:

- inputs are clear to reviewers
- validation behavior is described in `Must` or `Raises`
- outputs are separate in `Returns`
- referenced schemas or docs are linked deliberately
- tests or scenarios can use the input contract

## Related how-tos

- [How to use the Returns section](/how-to/use-spec-sections/how-to-use-the-returns-section/)
- [How to use the Raises section](/how-to/use-spec-sections/how-to-use-the-raises-section/)
- [How to write Scenario blocks](/how-to/use-spec-sections/how-to-write-scenario-blocks/)

## Related reference

- [Language reference](/language-reference/)
