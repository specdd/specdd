---
title: "How to keep agents from changing the wrong files"
seoDescription: "Keep agents from changing the wrong files by using spec-driven development Owns, Can modify, Can read, References, Must not, and Forbids correctly."
excerpt: "Use SpecDD write authority and review checks to keep agents inside the files a local spec allows and prevent edits to read-only or referenced context."
level: "Intermediate"
howtoID: "1041003"
weight: 55
---

This guide shows you how to prevent agents from editing files that look related but are outside the intended spec-driven development
boundary.

Wrong-file changes are one of the clearest places SpecDD helps. The agent does not need to infer scope from filenames,
imports, or nearby modules. It can use the nearest local spec to determine what may change.

## Short answer

Put writable paths in `Can modify`, or in `Owns` when `Can modify` is absent. Put context paths in `Can read` or
`References`. Use `Must not` and `Forbids` for tempting boundary violations. Then review plans and diffs against those
sections before accepting work.

## When to use this guide

Use this guide when:

- an agent edits sibling modules because they look related
- a change touches files listed only as context
- a feature has dependencies that should be read but not changed
- a module imports another module and the agent keeps modifying both
- you need a reviewable file boundary for agent-generated changes

## Steps

### 1. Define the writable boundary with `Can modify`

Use `Can modify` when you want an explicit edit list.

```sdd
Spec: Itinerary

Purpose:
  Keep a trip itinerary organized by day.

Can modify:
  ./itinerary.js
  ./itinerary.test.js
  ./fixtures/itinerary-validation.json

Must:
  Missing place names are rejected before an itinerary item is stored.
```

This tells the agent which files are writable for work under this spec.

Use explicit paths such as `./`, `../`, or `/`. Unprefixed filenames are plain text, not path references.

### 2. Use `Owns` when ownership and modification are the same

For small specs, `Owns` is often enough:

```sdd
Spec: Itinerary

Owns:
  ./itinerary.js
  ./itinerary.test.js
```

When `Can modify` is absent, `Owns` acts as the modification boundary. This is useful for a first local spec.

Add `Can modify` later when writable files should be narrower or different from owned responsibilities.

### 3. Put read-only context in `Can read`

If the itinerary code needs storage context, say so without granting write authority:

```sdd
Can read:
  ../storage/trip-storage.sdd
  ../storage/trip-storage.js
```

The agent can inspect those files to understand behavior. It should not edit them as part of the itinerary task unless
the storage spec also grants authority for a separate task.

### 4. Use `References` for outside contracts

Use `References` when one spec needs another contract:

```sdd
References:
  ../destinations/destination-search.sdd
```

References are explicit context. They do not create inherited write authority. This distinction matters in agent work:
the agent can read the destination search contract to avoid breaking it, but an itinerary task should not edit
destination search just because it was referenced.

### 5. Block likely wrong edits with `Must not` and `Forbids`

Use `Must not` for behavior boundaries:

```sdd
Must not:
  Change destination search ranking.
  Add booking purchase behavior.
```

Use `Forbids` for blocked dependencies, paths, modules, libraries, or architectural access:

```sdd
Forbids:
  ../booking/*
  Direct booking API access from itinerary behavior.
```

Do not list every unrelated file. Focus on paths and responsibilities an agent might plausibly touch.

### 6. Ask for a plan before editing

Use:

```text
Plan the Itinerary validation change.
```

Before implementation, check whether the plan proposes any file outside the writable boundary. If it does, revise the
spec or the plan before code changes begin.

### 7. Review the diff after implementation

After implementation, compare every changed file to the spec.

Acceptable:

- files listed in `Can modify`
- files listed in `Owns` when `Can modify` is absent
- spec updates that were explicitly requested or needed to keep the contract aligned

Suspicious:

- files listed only in `Can read`
- specs listed only in `References`
- sibling specs not inherited by the target
- files under forbidden paths
- broad generated-file or dependency changes

Use:

```text
Review this change against the Itinerary spec.
```

## Example boundary

```sdd
Spec: Itinerary

Purpose:
  Keep a trip itinerary organized by day.

Can modify:
  ./itinerary.js
  ./itinerary.test.js

Can read:
  ../storage/trip-storage.sdd
  ../storage/trip-storage.js

References:
  ../destinations/destination-search.sdd

Must:
  Missing place names are rejected before an itinerary item is stored.

Must not:
  Change destination search behavior.

Forbids:
  ../booking/*

Done when:
  Missing-place behavior is covered by a check.
  Destination search behavior is unchanged.
```

## Common mistakes

- Putting every nearby file in `Owns` just because the agent might need to read it.
- Treating `References` as permission to edit another feature.
- Forgetting that sibling specs are not inherited automatically.
- Using unprefixed filenames when you intended explicit path references.
- Letting a plan edit generated files because they changed as a side effect.

## How to verify the result

The boundary is working when:

- the plan names writable files before implementation
- changed files match `Can modify` or `Owns`
- read-only context stays read-only
- forbidden paths are untouched
- final review can explain why every changed file was allowed

## Related how-tos

- [How to review an agent plan against a spec](/how-to/agent-workflows/how-to-review-an-agent-plan-against-a-spec/)
- [How to use SpecDD to limit agent risk](/how-to/security-and-risk/how-to-use-specdd-to-limit-agent-risk/)
- [How to write your first .sdd spec](/how-to/getting-started/how-to-write-your-first-sdd-spec/)

## Related reference

- [Language reference](/language-reference/)
