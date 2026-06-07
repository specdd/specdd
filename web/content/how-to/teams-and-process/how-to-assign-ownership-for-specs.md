---
title: "How to assign ownership for specs"
seoDescription: "Assign ownership for SpecDD specs in a spec-driven development workflow by separating human review ownership from the .sdd Owns section, documenting team responsibility, and keeping local contracts current."
excerpt: "Use SpecDD ownership safely: .sdd Owns describes what the spec governs, while human review ownership belongs in team process, CODEOWNERS, or project docs."
level: "Intermediate"
howtoID: "1171010"
weight: 50
---

This guide shows you how to assign ownership for specs without confusing human responsibility with spec-driven development write
authority.

In `.sdd` files, `Owns` describes what the spec governs. It is not a people-owner field. Human review ownership should
live in your team process, CODEOWNERS-style files, repository docs, or ticketing system.

## Short answer

Use `Owns` and `Can modify` to define what a spec governs and what files may be changed under it. Use your team process
to assign human owners or reviewers for specs. Do not invent an `Owner:` section in `.sdd` files. When ownership changes,
review both the human responsibility and the spec's governed files or responsibilities.

## When to use this guide

Use this guide when:

- teams are unsure who reviews a spec
- a module is moving between teams
- two specs appear to own the same behavior
- a spec's `Owns` section is too broad or stale
- CODEOWNERS and local specs disagree
- agents need clear write authority

## Steps

### 1. Separate spec ownership from team ownership

SpecDD ownership:

```sdd
Owns:
  ./itinerary.js
  ./itinerary.test.js
```

Human ownership:

```text
Trip Planning team reviews itinerary specs and code.
```

Keep these concepts distinct. The `.sdd` `Owns` section governs artifacts and responsibilities. Human ownership tells
reviewers who is accountable.

### 2. Assign reviewers for important specs

Use your normal repository mechanism:

- CODEOWNERS
- team docs
- review rotation
- ticket components
- repository maintainers

For example, CODEOWNERS can require a team review for:

```text
src/trips/*.sdd
src/trips/*.js
```

The spec still defines the local contract. CODEOWNERS or team process defines who reviews changes.

### 3. Keep governed files in Owns or Can modify

Use `Owns` for files or responsibilities the spec governs:

```sdd
Owns:
  ./itinerary.js
  ./itinerary.test.js
  Itinerary validation behavior.
```

Use `Can modify` when writable scope should be narrower or different from ownership:

```sdd
Can modify:
  ./itinerary.js
  ./itinerary.test.js
```

This is what agents and reviewers use to decide whether a change is inside authority.

### 4. Document team responsibility outside local behavior

If the repository needs a team ownership map, put it in a normal project document or CODEOWNERS-style file and reference
its location from `.specdd/bootstrap.project.md`.

Do not put team ownership conventions in root specs or local specs.

### 5. Review ownership changes

Ownership changes are review-worthy because they affect future work.

Review:

- does one spec own each important file or behavior?
- did writable scope change?
- did a team handoff update review ownership?
- are read-only references still read-only?
- did parent or child specs need updates?

If ownership moves across boundaries, make it explicit in the relevant specs.

### 6. Audit stale ownership

Periodically check:

- files listed in `Owns` still exist
- specs do not overlap confusingly
- CODEOWNERS or team docs match actual review practice
- tasks are in the specs that own the work
- handoff areas have current `Must not` and `References`

This is especially useful after reorganizations or major refactors.

## Common mistakes

- Treating `Owns` as a people-owner field.
- Inventing unsupported `.sdd` sections for team ownership.
- Assigning human reviewers but leaving spec `Owns` stale.
- Letting two local specs claim the same file or behavior.
- Moving a module to another team without updating review ownership.
- Using referenced specs as permission to edit another team's area.

## How to verify the result

Spec ownership is clear when:

- local specs define governed files and responsibilities
- human reviewers are assigned through team process
- project-wide ownership conventions are discoverable from `.specdd/bootstrap.project.md`
- ownership changes receive review
- agents can identify writable scope from `Owns` or `Can modify`
- handoffs update both review ownership and local contracts

## Related how-tos

- [How to handle handoffs between teams with specs](/how-to/teams-and-process/how-to-handle-handoffs-between-teams-with-specs/)
- [How to keep agents from changing the wrong files](/how-to/agent-workflows/how-to-keep-agents-from-changing-the-wrong-files/)
- [How to create team conventions for .sdd files](/how-to/teams-and-process/how-to-create-team-conventions-for-sdd-files/)
- [How to review a diff against specs](/how-to/work-with-specdd-skills/how-to-review-a-diff-against-specs-specdd-review/)

## Related reference

- [Language reference](/language-reference/)
