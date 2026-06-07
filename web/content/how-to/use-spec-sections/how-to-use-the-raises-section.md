---
title: "How to use the Raises section"
seoDescription: "Use the Raises section in SpecDD to document errors, exceptions, rejected states, or failure conditions a subject may raise or return."
excerpt: "Use Raises to make failure contracts explicit, then pair them with Handles, Scenario, or Done when when behavior must be verified."
level: "Intermediate"
howtoID: "1061015"
weight: 160
---

This guide shows you how to use the `Raises` section in a SpecDD `.sdd` file.

`Raises` lists errors, exceptions, rejected states, or failure conditions the subject may raise or return.

## Short answer

Use `Raises` to document failure states that are part of the local contract. Use `Handles` for cases the subject must
handle, `Must` for required validation behavior, and `Scenario` or `Done when` for important checks.

## Syntax

```sdd
Raises:
  ItineraryPlaceRequired
  ItinerarySaveFailed
```

Rules:

- `Raises` is a mixed-entry body section.
- It may contain text, symbols, key-value lines, paths, or prose.
- It must not have inline text after `Raises:`.
- Body entries use two spaces.

## Steps

### 1. List named errors when they exist

```sdd
Raises:
  ItineraryPlaceRequired
  ItinerarySaveFailed
```

Use the names your code or API exposes.

### 2. Use prose for failure conditions

```sdd
Raises:
  Validation failure when the place name is empty.
  Save failure when trip storage rejects the update.
```

This is useful when the project does not have stable error class names.

### 3. Separate `Raises` from `Handles`

`Raises` says what failure states may be produced:

```sdd
Raises:
  ItinerarySaveFailed
```

`Handles` says what cases the subject must deal with:

```sdd
Handles:
  storage save failure
```

A subject may handle a dependency failure and raise a local error.

### 4. Connect validation behavior to `Must`

```sdd
Must:
  Reject itinerary items without a place name.

Raises:
  ItineraryPlaceRequired
```

`Must` captures the required behavior. `Raises` names the failure contract.

### 5. Verify important failures

For high-value failure behavior:

```sdd
Done when:
  Missing-place failure is covered by a check.
```

or:

```sdd
Scenario: missing place name
  Given the place name is empty
  When the person adds the itinerary item
  Then validation fails
```

## Common mistakes

- Listing handled input cases in `Raises` when no failure is produced.
- Hiding required validation only in an error name.
- Mixing success result states and failures in one section.
- Forgetting failure contracts when public APIs change.
- Leaving old errors listed after implementation removes them.

## How to verify the result

The `Raises` section is useful when:

- failure conditions are clear
- error names match the public or local contract
- validation behavior is described elsewhere when required
- important failures have tests, scenarios, or review checks
- success outputs remain in `Returns`

## Related how-tos

- [How to use the Handles section](/how-to/use-spec-sections/how-to-use-the-handles-section/)
- [How to use the Returns section](/how-to/use-spec-sections/how-to-use-the-returns-section/)
- [How to write Scenario blocks](/how-to/use-spec-sections/how-to-write-scenario-blocks/)

## Related reference

- [Language reference](/language-reference/)
