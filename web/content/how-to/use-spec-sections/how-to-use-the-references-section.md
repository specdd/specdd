---
title: "How to use the References section"
seoDescription: "Use the References section in SpecDD for explicit related specs, contracts, symbols, or context without granting inherited authority."
excerpt: "Use References for explicit horizontal context outside the inherited chain; references help readers find contracts but do not grant write authority."
level: "Intermediate"
howtoID: "1061007"
weight: 80
---

This guide shows you how to use the `References` section in a SpecDD `.sdd` file.

`References` lists explicit references to other specs, contracts, symbols, or context. It is how one spec points to
important related material outside the inherited parent chain.

## Short answer

Use `References` when a local spec needs an explicit related contract or context. References provide context, not
inherited authority and not write permission. Use exact paths when possible, use globs only when you deliberately need a
set, and keep writable scope in `Can modify` or `Owns`.

## Syntax

```sdd
References:
  ../storage/trip-storage.sdd
  ../destinations/destination-search.sdd
  @TripStorage
```

Rules:

- `References` is a mixed-entry body section.
- It may contain paths, globs, symbols, key-value lines, or prose.
- It must not have inline text after `References:`.
- Body entries use two spaces.
- Reference paths should use explicit prefixes such as `./`, `../`, or `/`.

## Steps

### 1. Reference contracts the spec depends on for meaning

Use `References` when the relationship is important enough to name:

```sdd
References:
  ../storage/trip-storage.sdd
```

This tells reviewers the itinerary spec should be understood alongside the storage contract.

### 2. Do not use references as write authority

Good:

```sdd
Can modify:
  ./itinerary.js

References:
  ../destinations/destination-search.sdd

Must not:
  Change destination search behavior.
```

The destination spec is context. It is not writable under the itinerary spec.

### 3. Prefer exact references for important contracts

Good:

```sdd
References:
  ../storage/trip-storage.sdd
```

Use a glob only when the set is intentionally part of the context:

```sdd
References:
  ../policies/*.sdd
```

For a non-glob directory link, tools should not recursively include every descendant spec. Recursive inclusion should
require an explicit glob.

### 4. Use symbols when the contract is symbol-level

Symbol references use `@`:

```sdd
References:
  @TripStorage
  @TravelPlanner.DestinationSearch
```

Plain text such as `TripStorage` is dependency text, not a symbol reference.

### 5. Keep reference lists small

Do not use `References` as a bibliography. Link only material that affects implementation or review of this local
contract.

## Common mistakes

- Treating a referenced spec as inherited authority.
- Editing a referenced area without local write permission.
- Using broad globs where one exact spec would be clearer.
- Referencing every related document instead of the few that matter.
- Assuming a directory reference recursively includes all child specs.

## How to verify the result

The `References` section is useful when:

- every reference affects local interpretation
- exact paths are used for important contracts
- broad globs are intentional
- referenced files stay read-only unless separately authorized
- reviewers can tell why the context was listed

## Related how-tos

- [How to use the Can read section](/how-to/use-spec-sections/how-to-use-the-can-read-section/)
- [How to use paths in SpecDD sections](/how-to/use-spec-sections/how-to-use-paths-in-specdd-sections/)
- [How to use globs in SpecDD](/how-to/use-spec-sections/how-to-use-globs-in-specdd/)

## Related reference

- [Language reference](/language-reference/)
