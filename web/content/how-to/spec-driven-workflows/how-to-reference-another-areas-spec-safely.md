---
title: "How to reference another area's spec safely"
seoDescription: "Reference another spec-driven development area's spec safely by using explicit References or Can read entries for context while preserving local write authority and sibling boundaries."
excerpt: "Use explicit SpecDD references for outside context without granting edit permission, inheriting sibling specs accidentally, or blurring local ownership boundaries."
level: "Intermediate"
howtoID: "1081008"
weight: 90
---

This guide shows you how to reference another area's SpecDD spec safely in a spec-driven development workflow when one
part of the system needs context from another part.

SpecDD is local and path-based. Parent specs are inherited, but sibling specs are not. That is a feature: it keeps local
authority clear. When one area needs another area's contract, make the relationship explicit without turning that other
area into writable scope.

## Short answer

Use `References` or `Can read` with explicit paths such as `../storage/trip-storage.sdd` when a spec needs outside
context. Treat the referenced spec as read context unless the target's own local spec grants write authority. Do not use
references to bypass `Owns`, `Can modify`, `Must not`, or `Forbids`.

## When to use this guide

Use this guide when:

- one module depends on another module's contract
- an implementation needs context from a sibling area
- an agent plan wants to edit a referenced file
- a spec uses vague prose such as "use the storage layer" without naming the contract
- a path reference is intended to be machine-resolvable

## Background

SpecDD's core context rule is:

```text
Vertical inheritance is implicit.
Other context is explicit.
```

That means an itinerary spec can inherit the root project spec and the trip module spec. It does not automatically
inherit destination search or storage specs just because those folders are nearby. If itinerary behavior needs storage
context, the itinerary spec should name that relationship.

## Steps

### 1. Decide why outside context is needed

Add a reference only when it affects behavior, dependency rules, allowed inputs, outputs, errors, or review.

Good reason:

> Itinerary must save changes through TripStorage and must not write browser storage directly.

Weak reason:

> The storage folder is nearby and might be useful.

References should reduce ambiguity, not expand context without purpose.

### 2. Use explicit path references

SpecDD path references use explicit prefixes:

- `./` relative to the current spec file directory
- `../` relative to the current spec file directory
- `/` relative to the selected content root

Good:

```sdd
References:
  ../storage/trip-storage.sdd
```

Not explicit:

```sdd
References:
  trip-storage.sdd
```

Unprefixed filenames are valid prose, but they are not explicit path references.

### 3. Choose References or Can read

Use `References` when another spec or contract is part of the local contract:

```sdd
References:
  ../storage/trip-storage.sdd
```

Use `Can read` when the local work may read files, paths, specs, or context without gaining edit authority:

```sdd
Can read:
  ../storage/trip-storage.sdd
  ../storage/trip-storage.js
```

Both sections provide context. Neither grants permission to edit the referenced area.

### 4. Preserve local write authority

Make the writable boundary explicit:

```sdd
Spec: Itinerary

Owns:
  ./itinerary.js
  ./itinerary.test.js

References:
  ../storage/trip-storage.sdd

Can read:
  ../storage/trip-storage.js

Must:
  Save itinerary changes through TripStorage.

Must not:
  Write browser storage directly.
  Modify trip storage behavior.
```

The spec can depend on storage behavior without owning storage behavior.

### 5. Avoid accidental recursive scope

An exact directory path should not mean "read every descendant spec." If a spec truly needs recursive context, use an
explicit glob and be prepared to review the broader scope.

Narrow:

```sdd
References:
  ../storage/trip-storage.sdd
```

Broad and deliberate:

```sdd
References:
  ../storage/**/*.sdd
```

Prefer narrow references. Broad references make review harder and can hide ownership mistakes.

### 6. Review the change boundary

When implementation begins, check that referenced context stayed read-only.

A safe diff might include:

```text
src/trips/itinerary.js
src/trips/itinerary.test.js
src/trips/itinerary.sdd
```

A suspicious diff includes:

```text
src/storage/trip-storage.js
```

That storage file may need its own spec-driven change. Do not let an itinerary task edit it just because itinerary
references storage.

## Agent prompt

Use one prompt when you want a context explanation:

```text
Explain how Itinerary depends on TripStorage.
```

Use a separate prompt when you want implementation:

```text
Implement the Itinerary storage integration task.
```

## Best practices

- Reference only outside contracts that affect the local work.
- Use explicit path prefixes for path references.
- Keep references narrow unless a broad glob is intentionally reviewed.
- Add `Must not` rules when a referenced area is a plausible edit target.
- Use the referenced spec for context, not as local write authority.
- Create a separate spec-driven change when the referenced area also needs edits.

## Common mistakes

- Assuming sibling specs are inherited automatically.
- Using unprefixed filenames when an explicit path was intended.
- Referencing a whole directory when one contract spec is enough.
- Letting `References` or `Can read` authorize edits to another area.
- Adding a dependency reference without a local `Must not` for the boundary it creates.

## How to verify the result

The reference is safe when:

- the outside contract is listed with an explicit path
- the local spec still defines its own `Owns` or `Can modify`
- referenced files remain read-only during implementation
- no inherited `Must not` or `Forbids` rule is weakened
- reviewers can explain why the outside context is needed

## Related how-tos

- [How to manage context for agents](/how-to/agent-workflows/how-to-manage-context-for-agents/)
- [How to keep agents from changing the wrong files](/how-to/agent-workflows/how-to-keep-agents-from-changing-the-wrong-files/)
- [How to resolve conflicts between specs](/how-to/spec-driven-workflows/how-to-resolve-conflicts-between-specs/)
- [How to link existing docs and content with SpecDD](/how-to/getting-started/how-to-link-existing-docs-and-content-with-specdd/)

## Related reference

- [Language reference](/language-reference/)
