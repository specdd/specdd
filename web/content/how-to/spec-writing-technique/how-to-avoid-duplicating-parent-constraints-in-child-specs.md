---
title: "How to avoid duplicating parent constraints in child specs"
seoDescription: "Avoid duplicating inherited SpecDD constraints in a spec-driven development workflow by writing each rule once where it is owned and relying on inherited context."
excerpt: "Write inherited constraints once in the parent spec, then let child specs add or narrow local behavior without copying shared rules."
level: "Intermediate"
howtoID: "1071007"
weight: 80
---

This guide shows you how to avoid duplicating parent constraints in child specs in a spec-driven development workflow.

Duplicated rules drift. When the parent changes, copied child rules do not update automatically. SpecDD inheritance
exists so you can write each rule once where it belongs.

## Short answer

Put shared constraints in the parent spec that owns them. Child specs inherit parent context and may add more specific
rules, narrow allowed behavior, add local responsibilities, and define local tasks. Child specs must not silently loosen
parent constraints, ignore parent `Must not`, use forbidden dependencies, or expand modification scope beyond local
authority.

## When to use this guide

Use this guide when:

- child specs repeat the same `Must not`
- parent and child rules disagree
- reviewers keep updating several copies of one rule
- a child task conflicts with inherited architecture
- a parent spec is being split or cleaned up

## Steps

### 1. Find the rule owner

Ask:

- Does this rule apply to the whole project?
- Does it apply to one module?
- Does it apply to one service or file?
- Which spec should reviewers update when the rule changes?

Write the rule at that level.

### 2. Keep shared constraints in the parent

Parent:

```sdd
Must not:
  Purchase bookings or tickets.
```

Child specs inherit that rule. They do not need to repeat it.

### 3. Let children add local detail

Child:

```sdd
Must:
  Reject itinerary items without a place name.

Must not:
  Change destination search behavior.
```

This adds local behavior and a local boundary without duplicating the parent booking rule.

### 4. Avoid reverse duplicates

Do not write the same idea both ways unless each rule adds distinct meaning:

```sdd
Must:
  Save itinerary changes through TripStorage.

Must not:
  Save itinerary changes outside TripStorage.
```

Often the `Must` rule is enough. Use `Must not` when it prevents a plausible distinct mistake.

### 5. Fix drift at the owner

If a copied child rule is stale, remove the duplicate and update the owning parent rule. If the child needs a narrower
version, write only the local narrowing.

### 6. Treat conflicts restrictively

When rules conflict, the stricter rule wins unless the conflict is explicitly resolved. `Must not` and `Forbids` are
stronger than `Must`, `Depends on`, or `Tasks`.

## Common mistakes

- Copying root `Must not` rules into every module.
- Adding a child `Must` that weakens a parent `Must not`.
- Using a child task to override inherited architecture.
- Updating a duplicate child rule while leaving the parent stale.
- Repeating the same rule in reverse without adding meaning.

## How to verify the result

The spec chain is clean when:

- shared constraints appear once
- child specs add local behavior instead of copies
- parent and child rules do not contradict each other
- tasks respect inherited constraints
- reviewers know which spec owns each rule

## Related how-tos

- [How to resolve conflicts between specs](/how-to/spec-driven-workflows/how-to-resolve-conflicts-between-specs/)
- [How to fix a spec that conflicts with a parent spec](/how-to/troubleshooting/how-to-fix-a-spec-that-conflicts-with-a-parent-spec/)
- [How to write Must not rules](/how-to/use-spec-sections/how-to-write-must-not-rules/)

## Related reference

- [Language reference](/language-reference/)
