---
title: "How to spec a legacy module safely"
seoDescription: "Spec a legacy module safely with spec-driven development by separating intended behavior from accidental behavior, marking assumptions, narrowing authority, and changing one slice at a time."
excerpt: "Use SpecDD around legacy code without freezing old bugs: draft current behavior, review intent, mark uncertainty, and add small local tasks."
level: "Intermediate"
howtoID: "1111002"
weight: 70
---

This guide shows you how to add a SpecDD spec around a legacy module for a spec-driven development workflow without
turning every old behavior into a permanent contract.

Legacy code often contains intended behavior, accidental behavior, obsolete behavior, and bugs in the same file. SpecDD
helps only if the review step separates those categories before implementation.

## Short answer

Start with one legacy module or workflow under active change. Draft the spec from current behavior, then review every
meaningful rule as intended, accidental, unknown, or obsolete. Put intended durable behavior in `Must`, plausible
boundaries in `Must not` or `Forbids`, uncertainty in `[?]` tasks, and implementation work in small local tasks.

## When to use this guide

Use this guide when:

- a legacy module is about to change
- tests describe current behavior but not intent
- reviewers disagree about what the module owns
- agents keep editing adjacent legacy files
- old bugs might be encoded as requirements
- refactoring needs a safer local contract first

## Steps

### 1. Choose a narrow module slice

Do not start with the whole legacy subsystem.

Good targets:

- one file with substantial behavior
- one service or adapter
- one workflow path
- one validation rule
- one module boundary with repeated review comments

Risky targets:

- "all billing"
- "the whole legacy frontend"
- a migration with many unresolved product decisions

### 2. Collect current behavior

Look at:

- current code
- tests and fixtures
- error handling
- public interfaces
- logs or operational behavior when relevant
- recent bug reports
- existing docs or ADRs
- reviewer knowledge

You can ask for a draft:

```text
Draft the Itinerary legacy module spec from current behavior.
```

The draft should not become authority until reviewed.

### 3. Separate intended behavior from accidents

Classify each observed behavior:

- **Intended:** keep it as durable behavior
- **Accidental:** do not preserve it in `Must`
- **Unknown:** mark it as a decision
- **Obsolete:** remove or replace it through a reviewed change
- **Bug:** describe the intended fixed behavior, not the bug

Example decision task:

```sdd
Tasks:
  [?] Confirm whether duplicate itinerary places are allowed.
```

This is safer than writing a confident `Must` rule when the team is unsure.

### 4. Write narrow ownership

Use `Owns` when the spec governs the module:

```sdd
Owns:
  ./legacy-itinerary.js
  ./legacy-itinerary.test.js
```

Use `Can modify` when writable scope should be explicit or narrower:

```sdd
Can modify:
  ./legacy-itinerary.js
  ./legacy-itinerary.test.js
```

Put dependency modules in `Can read` or `References` unless this spec should be allowed to edit them.

### 5. Add protective boundaries

Legacy modules often accumulate extra responsibility. Use `Must not` for plausible boundary mistakes:

```sdd
Must not:
  Change destination search ranking.
  Add booking purchase behavior.
```

Use `Forbids` for blocked paths or access:

```sdd
Forbids:
  ../booking/*
  Direct browser storage writes from itinerary behavior.
```

Keep the list practical. The goal is to prevent likely wrong work, not to catalog the entire system.

### 6. Use tasks for safe slices

Write tasks that can be completed inside local authority:

```sdd
Tasks:
  [ ] Add missing-place validation.
  [ ] Add a regression check for itinerary ordering.
```

Avoid tasks that combine several boundaries:

```sdd
Tasks:
  [ ] Rewrite itinerary, storage, search, and booking behavior.
```

Split cross-boundary work into separately reviewed specs or tasks.

### 7. Add `Done when`

Legacy work needs clear completion criteria:

```sdd
Done when:
  Missing-place behavior is covered by a check.
  Existing itinerary ordering behavior still passes.
  Destination search files are unchanged.
```

This prevents both stopping too early and broad cleanup beyond the approved slice.

### 8. Verify before marking done

Use `[x]` only after implementation and checks:

```sdd
Tasks:
  [x] Add missing-place validation.
```

If legacy behavior is too unclear to finish safely, use `[?]` or `[!]` and explain the decision or blocker in review.

## Common mistakes

- Treating all current behavior as intended behavior.
- Writing one huge spec for the whole legacy subsystem.
- Giving the first legacy spec broad write authority.
- Hiding uncertainty in confident `Must` language.
- Using a task to override a `Must not` boundary.
- Marking cleanup tasks done without checks.

## How to verify the spec

The legacy spec is safe when:

- the subject is narrow
- intended and accidental behavior are separated
- uncertainty is visible
- writable scope is explicit
- boundaries protect likely wrong edits
- tasks are small and local
- checks can prove the first change

## Related how-tos

- [How to change a spec safely after code already exists](/how-to/spec-driven-workflows/how-to-change-a-spec-safely-after-code-already-exists/)
- [How to review agent-generated specs](/how-to/code-review-and-governance/how-to-review-agent-generated-specs/)
- [How to recover from spec-code drift](/how-to/spec-driven-workflows/how-to-recover-from-spec-code-drift/)
- [How to reject a spec-driven change constructively](/how-to/code-review-and-governance/how-to-reject-a-spec-driven-change-constructively/)

## Related reference

- [Language reference](/language-reference/)
