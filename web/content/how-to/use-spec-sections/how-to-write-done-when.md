---
title: "How to write Done when"
seoDescription: "Write SpecDD Done when criteria that define concrete completion signals for implementation, review, and verification."
excerpt: "Use Done when to prevent under-implementation and over-implementation by making completion concrete and checkable."
level: "Beginner"
howtoID: "1061018"
weight: 190
---

This guide shows you how to write the `Done when` section in a SpecDD `.sdd` file.

`Done when` lists completion criteria. It tells humans and agents when the work is finished, which prevents both
stopping too early and continuing into unrelated work.

## Short answer

Use `Done when` for concrete, reviewable completion criteria: tests, checks, preserved behavior, unchanged boundaries,
docs updates, or operational evidence. Do not put inline text after `Done when:`. Keep criteria local to the spec and
update them when the contract changes.

## Syntax

```sdd
Done when:
  Missing-place behavior is covered by a check.
  Existing itinerary ordering behavior still passes.
  Destination search behavior is unchanged.
```

Rules:

- `Done when` is a mixed-entry body section.
- It must not have inline text after `Done when:`.
- Body entries use two spaces.
- It may contain prose, paths, key-value lines, symbols, or other normal mixed entries.

## Steps

### 1. Name concrete evidence

Weak:

```sdd
Done when:
  It works.
```

Better:

```sdd
Done when:
  Missing-place validation is covered by a check.
```

### 2. Cover required behavior

If `Must` says:

```sdd
Must:
  Reject itinerary items without a place name.
```

`Done when` can say:

```sdd
Done when:
  Missing-place rejection is covered by a test or equivalent check.
```

The completion criterion should point to evidence.

### 3. Include important negative boundaries

For risky nearby behavior:

```sdd
Must not:
  Change destination search behavior.

Done when:
  Destination search files are unchanged.
```

This helps reviewers catch overreach.

### 4. Keep criteria local

Do not require completion criteria owned by another spec unless this spec has authority for that work. Cross-area
criteria may signal that the task should be split.

### 5. Update stale criteria

When behavior changes, update `Done when` in the same review path. Stale completion criteria mislead future work.

## Common mistakes

- Writing vague criteria such as "done when complete."
- Using `Done when` as a task list.
- Forgetting negative boundaries that prevent overreach.
- Requiring checks for behavior owned by another spec.
- Leaving criteria stale after implementation changes.

## How to verify the result

`Done when` is useful when:

- reviewers can decide whether work is complete
- criteria map to behavior, boundaries, or checks
- tasks are not marked done before criteria are satisfied
- criteria do not invite unrelated work
- stale criteria are updated during spec-code alignment

## Related how-tos

- [How to write Tasks](/how-to/use-spec-sections/how-to-write-tasks/)
- [How to write Scenario blocks](/how-to/use-spec-sections/how-to-write-scenario-blocks/)
- [How to fix stale Done when criteria](/how-to/troubleshooting/how-to-fix-stale-done-when-criteria/)

## Related reference

- [Language reference](/language-reference/)
