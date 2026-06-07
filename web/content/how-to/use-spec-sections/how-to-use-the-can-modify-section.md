---
title: "How to use the Can modify section"
seoDescription: "Use the Can modify section in SpecDD to define the files or paths that may be changed under a local spec."
excerpt: "Use Can modify when writable scope should be explicit, narrower, or different from ownership, especially for safe bounded agent work."
level: "Intermediate"
howtoID: "1061005"
weight: 60
---

This guide shows you how to use the `Can modify` section in a SpecDD `.sdd` file.

`Can modify` lists files or paths that may be changed when work is performed under the spec. It is the clearest section
for bounded implementation work, especially with agents.

## Short answer

Use `Can modify` when writable scope should be explicit, narrower than ownership, or different from ownership. List only
the files or paths that may change. Put read-only context in `Can read` or `References`. During review, every changed
file should map to `Can modify`, unless the spec itself was intentionally updated.

## Syntax

```sdd
Can modify:
  ./itinerary.js
  ./itinerary.test.js
  ./fixtures/*
```

Rules:

- `Can modify` is a mixed-entry body section.
- It may contain paths, globs, symbols, key-value lines, or prose.
- It must not have inline text after `Can modify:`.
- Body entries use two spaces.

## Steps

### 1. Decide whether `Owns` is enough

If the spec owns exactly the files it may change, `Owns` may be enough:

```sdd
Owns:
  ./itinerary.js
  ./itinerary.test.js
```

When `Can modify` is absent, `Owns` acts as the modification boundary.

Add `Can modify` when:

- only a subset of owned files may change
- generated or fixture files are writable but not central ownership
- a spec owns a concept but implementation should touch specific files
- agent work needs a tight file boundary

### 2. List writable files explicitly

Good:

```sdd
Can modify:
  ./itinerary.js
  ./itinerary.test.js
```

Risky:

```sdd
Can modify:
  ../trips/*
```

Broad patterns are sometimes valid, but they should be deliberate and reviewable.

### 3. Separate context from permission

If implementation needs to inspect storage behavior:

```sdd
Can modify:
  ./itinerary.js
  ./itinerary.test.js

Can read:
  ../storage/trip-storage.sdd
```

The storage spec is read context, not writable authority.

### 4. Use `Must not` and `Forbids` for tempting overreach

If agents or contributors keep editing nearby areas, add boundaries:

```sdd
Must not:
  Change destination search behavior.

Forbids:
  ../booking/*
```

`Can modify` says what may change. `Must not` and `Forbids` protect likely mistakes.

### 5. Review every changed file

During review, ask:

- Is the file listed in `Can modify`?
- If not, is the change an intentional spec update?
- Is the file only listed in `Can read` or `References`?
- Is a broader spec change needed?
- Should the work be split?

## Common mistakes

- Using `Can modify` as a broad project-level permission list.
- Adding a file just because implementation happened to touch it.
- Listing read-only dependencies as writable.
- Forgetting that `Can modify` overrides `Owns` for writable scope.
- Widening `Can modify` to make a current patch easier to land.

## How to verify the result

The `Can modify` section is working when:

- changed files are predictable before implementation
- reviewers can reject out-of-scope edits quickly
- read-only dependencies stay read-only
- tasks can be completed inside the writable boundary
- broad authority changes receive review

## Related how-tos

- [How to define write authority for agents](/how-to/code-review-and-governance/how-to-define-write-authority-for-agents/)
- [How to use the Owns section](/how-to/use-spec-sections/how-to-use-the-owns-section/)
- [How to keep agents from changing the wrong files](/how-to/agent-workflows/how-to-keep-agents-from-changing-the-wrong-files/)

## Related reference

- [Language reference](/language-reference/)
