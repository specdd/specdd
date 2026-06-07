---
title: "How to use the Exposes section"
seoDescription: "Use the Exposes section in SpecDD to list public exports, endpoints, commands, components, events, interfaces, or observable capabilities."
excerpt: "Use Exposes to make the public surface of a spec visible without using it as related-spec authority."
level: "Intermediate"
howtoID: "1061012"
weight: 130
---

This guide shows you how to use the `Exposes` section in a SpecDD `.sdd` file.

`Exposes` lists public entry points, exported symbols, APIs, contracts, components, events, commands, or observable
capabilities.

## Short answer

Use `Exposes` to document the subject's public surface: what other code, users, systems, or workflows may call or rely
on. Do not use it for private helpers, and do not treat paths in `Exposes` as related-spec context for implementation
authority.

## Syntax

```sdd
Exposes:
  Itinerary.addPlace(input)
  Itinerary.movePlace(id, date)
  @ItineraryUpdateResult
```

Rules:

- `Exposes` is a mixed-entry body section.
- It may contain symbols, names, paths, key-value lines, or prose.
- It must not have inline text after `Exposes:`.
- Body entries use two spaces.

## Steps

### 1. List the public surface

Examples:

```sdd
Exposes:
  Itinerary.addPlace(input)
  Itinerary.movePlace(id, date)
```

For other systems:

```sdd
Exposes:
  POST /api/trips/:tripId/itinerary
  itinerary.updated event
  build-itinerary command
```

Use the naming style your project already uses.

### 2. Keep private implementation out

Do not list every helper function or internal class. `Exposes` should show what is externally meaningful for the
subject.

If a private helper has substantial behavior, it may need its own local spec, but it does not necessarily belong in the
parent `Exposes` section.

### 3. Pair public surface with contracts

Use nearby sections to describe the contract:

```sdd
Exposes:
  Itinerary.addPlace(input)

Accepts:
  place name
  trip date

Returns:
  updated itinerary

Raises:
  ItineraryPlaceRequired
```

This gives reviewers a usable interface contract.

### 4. Do not use `Exposes` as context expansion

Tools may index paths or symbols in `Exposes`, but related-spec relevance resolution should not follow `Exposes` to
expand implementation context. Use `References`, `Can read`, or `Depends on` when context should be followed.

## Common mistakes

- Listing internal helpers as public surface.
- Using `Exposes` instead of `Accepts` and `Returns` for detailed contracts.
- Treating `Exposes` entries as write authority.
- Using `Exposes` to pull in related specs.
- Leaving exposed entry points stale after API changes.

## How to verify the result

The `Exposes` section is useful when:

- public entry points are easy to find
- private implementation stays private
- inputs, outputs, and errors are described elsewhere when needed
- review can see when a public surface changed
- context expansion uses the right sections

## Related how-tos

- [How to use the Accepts section](/how-to/use-spec-sections/how-to-use-the-accepts-section/)
- [How to use the Returns section](/how-to/use-spec-sections/how-to-use-the-returns-section/)
- [How to use the Raises section](/how-to/use-spec-sections/how-to-use-the-raises-section/)

## Related reference

- [Language reference](/language-reference/)
