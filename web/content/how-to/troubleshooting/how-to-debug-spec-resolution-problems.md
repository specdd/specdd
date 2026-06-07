---
title: "How to debug spec resolution problems"
seoDescription: "Debug SpecDD resolution problems by tracing the selected content root, ancestor specs, directory specs, same-basename matching, references, globs, and CLI resolve output."
excerpt: "Fix spec resolution by walking from the content root to the target, checking directory and same-basename specs, explicit references, globs, and write authority."
level: "Intermediate"
howtoID: "1191006"
weight: 70
---

This guide shows you how to debug SpecDD resolution problems when the wrong specs appear to apply, expected specs are
missing, or an agent cannot explain the governing context.

SpecDD resolution is path-based. Parent specs are inherited automatically. Sibling specs are not inherited unless a
governing spec references them.

## Short answer

Start from the concrete target path. Confirm the selected content root, walk ancestor specs from root to target, include
directory-level specs, include same-directory same-basename specs, follow explicit `References`, `Can read`, or other
relevance links only where appropriate, then compare your expectation with `specdd resolve` output.

## Steps

### 1. Identify the target

Resolution starts from a target:

```text
src/trips/itinerary.js
```

Do not start from a vague feature name if the problem is path resolution. Pick the file, directory, or `.sdd` target
that should be governed.

### 2. Confirm the content root

The selected content root controls:

- `/` paths
- root spec naming
- ancestor traversal
- spec indexing
- what counts as inside the project

For a project named:

```text
travel-planner/
```

the root spec should be:

```text
travel-planner/travel-planner.sdd
```

If the agent or editor opens only `src/`, the root chain may be wrong.

### 3. Walk ancestor specs

For:

```text
travel-planner/src/trips/itinerary.js
```

the expected chain might be:

```text
travel-planner.sdd
src/trips.sdd
src/trips/trips.sdd
src/trips/itinerary.sdd
```

Parent-held and local directory specs are cumulative context, not alternatives.

### 4. Check directory specs

A directory can be described by a same-basename spec inside the directory or by a parent-held spec:

```text
src/trips.sdd
src/trips/trips.sdd
```

If a directory-level rule is missing, check whether the spec is in the expected place and has the expected name.

### 5. Check same-basename matching

For an ordinary file:

```text
itinerary.js
```

the local same-basename spec is:

```text
itinerary.sdd
```

Same-basename matching is explicit SpecDD behavior. Similar names in other directories, symbols in code, or test names
do not create authority.

### 6. Check explicit references and globs

Sibling specs need explicit references:

```sdd
References:
  ../storage/trip-storage.sdd
```

Non-glob directory links should not recursively include every descendant spec. Use a deliberate glob only when broad
recursive context is needed:

```sdd
References:
  ../storage/**/*.sdd
```

### 7. Use specdd resolve

Run:

```sh
specdd resolve src/trips/itinerary.js --sections Spec,Purpose,Owns,Can modify,Can read,References,Must,Must not,Tasks
```

Use the output to see which specs are included. Then read the exact spec files when authority or wording matters.

## Common causes

- Agent or editor started from the wrong root.
- Root spec is missing or misnamed.
- Directory spec is in the wrong location.
- Local spec does not share the target basename.
- Sibling specs were expected to apply automatically.
- References use unprefixed filenames.
- A broad glob or parent reference makes output noisy.

## How to verify the fix

Resolution is fixed when:

- the selected content root is correct
- the root and ancestor specs appear as expected
- same-basename local specs match the target
- explicit references bring in only intended outside context
- `specdd resolve` output matches the expected chain
- the nearest local spec grants clear write authority

## Related how-tos

- [How to fix an agent that cannot find the right local spec](/how-to/troubleshooting/how-to-fix-an-agent-that-cannot-find-the-right-local-spec/)
- [How to resolve ambiguous spec match warnings](/how-to/troubleshooting/how-to-resolve-ambiguous-spec-match-warnings/)
- [How to fix path references that do not resolve](/how-to/troubleshooting/how-to-fix-path-references-that-do-not-resolve/)
- [How to manage context for agents](/how-to/agent-workflows/how-to-manage-context-for-agents/)

## Related reference

- [Language reference](/language-reference/)
