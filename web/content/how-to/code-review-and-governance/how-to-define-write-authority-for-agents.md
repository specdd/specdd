---
title: "How to define write authority for agents"
seoDescription: "Define spec-driven development write authority for agents with Can modify, Owns, Can read, References, Must not, and Forbids so changes stay inside the intended boundary."
excerpt: "Use SpecDD write authority to tell agents exactly what may change, what may only be read, and which dependencies or paths remain off limits."
level: "Intermediate"
howtoID: "1141004"
weight: 50
---

This guide shows you how to define write authority for agents with SpecDD in a spec-driven development workflow.

Write authority is the answer to a simple review question: under this spec, which files may change? SpecDD is useful
here because it turns vague scope into a local, reviewable contract.

## Short answer

Use `Can modify` to list files or paths an agent may change. If `Can modify` is absent, `Owns` acts as the modification
boundary. Use `Can read` and `References` for context that may be read but not edited. Use `Must not` and `Forbids` to
block plausible wrong changes, dependencies, paths, modules, tools, libraries, or access.

## When to use this guide

Use this guide when:

- agents edit files that look related but are outside scope
- a feature needs context from another module without changing it
- reviewers cannot tell why a file changed
- a task should be completed inside one local boundary
- teams need a consistent rule for accepting or rejecting agent changes

## Steps

### 1. Choose the local subject

Write authority starts with a useful subject.

Good subject:

```sdd
Spec: Itinerary
```

Weak subject:

```sdd
Spec: Trip Stuff
```

The subject should be local enough that its writable files are obvious and reviewable. If a spec needs to list half the
repository in authority sections, the subject is probably too broad.

### 2. Use `Can modify` for explicit writable files

Use `Can modify` when the agent should change only a specific set of files:

```sdd
Spec: Itinerary

Can modify:
  ./itinerary.js
  ./itinerary.test.js
  ./fixtures/itinerary-validation.json
```

This is the clearest way to govern agent edits. During review, every changed file should map back to this list unless
there is another explicitly reviewed reason.

Use explicit path prefixes such as `./`, `../`, or `/` when you mean paths.

### 3. Use `Owns` when ownership and writing match

For small specs, `Owns` can be enough:

```sdd
Spec: Itinerary

Owns:
  ./itinerary.js
  ./itinerary.test.js
```

When `Can modify` is absent, `Owns` is the modification boundary. Add `Can modify` later if writable scope should be
narrower or different from ownership.

Do not list files in `Owns` only because the agent might need to inspect them. That makes authority too broad.

### 4. Separate read context from edit authority

Use `Can read` when the agent may inspect context:

```sdd
Can read:
  ../storage/trip-storage.sdd
  ../storage/trip-storage.js
```

Use `References` when the spec needs another contract or context:

```sdd
References:
  ../destinations/destination-search.sdd
```

Both are read context. Neither grants edit permission.

This distinction is important in code review. A pull request that edits destination search because the itinerary spec
references it should be rejected or split into a separately authorized change.

### 5. Block tempting wrong edits

Use `Must not` for behavior boundaries:

```sdd
Must not:
  Change destination search behavior.
  Add booking purchase behavior.
```

Use `Forbids` for blocked dependencies, paths, modules, libraries, tools, or access:

```sdd
Forbids:
  ../booking/*
  Direct browser storage writes from itinerary behavior.
```

Focus on plausible mistakes. Do not list every unrelated system in the repository.

### 6. Keep tasks inside authority

A task should usually be implementable inside the local `Can modify` or `Owns` boundary.

Good task:

```sdd
Tasks:
  [ ] Add missing-place validation.
```

Risky task:

```sdd
Tasks:
  [ ] Add missing-place validation and update destination ranking.
```

If the task needs another area, create or update the correct owning spec through review, or split the task.

### 7. Review plans and diffs against authority

Before implementation:

```text
Plan the Itinerary validation change.
```

After implementation:

```text
Review the Itinerary validation diff.
```

For both reviews, ask:

- Which files does the agent plan to change?
- Are they in `Can modify`?
- If not, are they in `Owns` and no `Can modify` exists?
- Are any files listed only as read context?
- Are any paths forbidden?
- Did the agent add unrelated cleanup because it saw nearby code?

## Common mistakes

- Treating `References` as permission to edit another spec's area.
- Putting dependency files in `Owns` when they are only read context.
- Letting parent specs grant broad write access to child work.
- Using broad globs in `Can modify` because it is faster than naming the real boundary.
- Writing tasks that cannot be completed inside local authority.
- Forgetting that a task cannot override `Must not` or `Forbids`.

## How to verify the result

Write authority is clear when:

- every intended writable file appears in `Can modify` or `Owns`
- read-only context appears in `Can read` or `References`
- forbidden paths and dependencies are explicit where useful
- tasks can be completed locally
- agent plans name only authorized files
- pull request review can explain every changed file

## Related how-tos

- [How to keep agents from changing the wrong files](/how-to/agent-workflows/how-to-keep-agents-from-changing-the-wrong-files/)
- [How to review an agent plan against a spec](/how-to/agent-workflows/how-to-review-an-agent-plan-against-a-spec/)
- [How to review a SpecDD pull request](/how-to/code-review-and-governance/how-to-review-a-specdd-pull-request/)
- [How to assign ownership for specs](/how-to/teams-and-process/how-to-assign-ownership-for-specs/)

## Related reference

- [Language reference](/language-reference/)
