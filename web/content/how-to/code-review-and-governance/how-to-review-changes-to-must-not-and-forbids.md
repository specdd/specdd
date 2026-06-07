---
title: "How to review changes to Must not and Forbids"
seoDescription: "Review spec-driven development changes to Must not and Forbids by checking boundary risk, dependency risk, inherited constraints, rationale, alternatives, and verification."
excerpt: "Treat Must not and Forbids changes as governance changes: they alter what future humans and agents are allowed to do."
level: "Advanced"
howtoID: "1141007"
weight: 80
---

This guide shows you how to review changes to `Must not` and `Forbids` in SpecDD specs for a spec-driven development
workflow.

These sections are high leverage. They do not just describe current code. They shape what future humans and agents are
allowed to do, which dependencies they may introduce, and which boundaries must stay protected.

## Short answer

Review `Must not` and `Forbids` changes as governance changes. Ask what boundary is being added, removed, narrowed, or
weakened; whether parent constraints still apply; what behavior or dependency risk changes; whether the rationale is
clear; and what verification proves the new rule is safe.

## When to use this guide

Use this guide when a pull request:

- removes a `Must not` rule
- weakens a `Must not` rule with softer wording
- adds or removes a `Forbids` entry
- changes a forbidden path, dependency, tool, library, or access pattern
- moves a boundary between parent and child specs
- introduces behavior previously rejected in architecture review
- changes a rule an agent relies on to avoid wrong files

## Background

`Must not` lists forbidden behavior, non-goals, and architectural boundaries.

`Forbids` lists forbidden dependencies, paths, modules, libraries, tools, or access.

In SpecDD conflict handling, `Must not` and `Forbids` are stronger than `Must`, `Depends on`, or `Tasks`. That means a
task cannot justify violating them. Changing these rules changes what future work may do.

## Steps

### 1. Classify the boundary change

First decide what kind of change it is.

Adding a boundary:

```sdd
Must not:
  Write browser storage directly from itinerary behavior.
```

Narrowing a boundary:

```sdd
Must not:
  Write browser storage directly from itinerary UI components.
```

Weakening or removing a boundary:

```diff
-  Write browser storage directly from itinerary behavior.
```

Adding a forbidden dependency:

```sdd
Forbids:
  ../booking/*
```

Removing a forbidden dependency:

```diff
-  ../booking/*
```

Removals and weakenings usually deserve the strongest review.

### 2. Review why the rule is changing

Require a concrete reason:

- a design decision changed
- ownership moved
- the old boundary was too broad
- a safer dependency path now exists
- a rejected approach is now approved
- a parent spec now owns the rule instead

Weak reasons:

- implementation was easier without the rule
- tests passed after ignoring it
- an agent needed to touch the blocked path
- the rule felt annoying
- no one remembers why it exists

If the rationale is missing, request it before approving.

### 3. Check inherited constraints

A child spec cannot silently loosen a parent `Must not` or use a parent-forbidden dependency.

Before approving, ask:

- Does a parent spec still forbid this behavior?
- Does another local spec own the blocked dependency or path?
- Is the rule being moved upward or downward deliberately?
- Would the stricter inherited rule still win?
- Does this create a conflict with a task or `Depends on`?

If the parent still forbids the behavior, changing the child spec does not make the behavior allowed.

### 4. Evaluate behavior and dependency risk

For `Must not`, ask:

- What behavior becomes allowed?
- What non-goal is being removed?
- Which users, data, workflows, or public contracts are affected?
- Could the change reintroduce a repeated mistake?
- Should the rule be narrowed instead of removed?

For `Forbids`, ask:

- What dependency, path, module, tool, library, or access becomes allowed?
- Does that change architecture direction?
- Does it affect security, data, build, runtime, or deployment risk?
- Is there a safer adapter, interface, or boundary?
- Should the forbidden entry move to a parent spec instead?

### 5. Require evidence and alternatives

For low-risk additions, review may be simple. Adding a specific `Must not` to protect a known local boundary is usually
straightforward.

For removals or weakenings, require evidence:

- design review or owner approval when boundaries move
- tests or checks for behavior that becomes allowed
- migration plan when callers are affected
- dependency review when new imports or access patterns become allowed
- updated tasks and `Done when`
- explanation of rejected alternatives

If the safer option is to narrow the rule, request narrowing instead of removal.

### 6. Approve, narrow, or reject

Approve when the new rule is clear, locally owned, consistent with parent constraints, and backed by appropriate
evidence.

Request narrowing when the old rule is too broad but the pull request removes too much protection.

Reject when the change:

- violates a parent constraint
- allows a dependency still blocked elsewhere
- lacks rationale
- hides a behavior change in wording
- weakens a boundary to make an implementation pass
- affects security, data, destructive behavior, or public contracts without review

## Review checklist

Ask:

- Is this adding, narrowing, weakening, or removing a rule?
- What future behavior becomes allowed or forbidden?
- Does a parent spec still apply?
- Is another spec's ownership affected?
- Does this conflict with `Depends on` or `Tasks`?
- Is the rationale clear?
- Are checks or owner approvals appropriate for the risk?
- Could the rule be narrower and safer?

## Common mistakes

- Treating `Must not` removal as a wording cleanup.
- Removing `Forbids` because one implementation wanted a shortcut.
- Weakening a child rule while the parent still forbids the behavior.
- Adding broad negative rules that list unrelated things.
- Moving a boundary without updating tasks and `Done when`.
- Approving dependency access without checking architecture direction.

## How to verify the result

The review succeeded when:

- the new boundary is explicit
- inherited constraints still make sense
- removals and weakenings have clear rationale
- dependency and access risk were checked
- tasks and checks match the new rule
- future humans and agents can tell what is allowed

## Related how-tos

- [How to resolve conflicts between specs](/how-to/spec-driven-workflows/how-to-resolve-conflicts-between-specs/)
- [How to use SpecDD in architecture reviews](/how-to/code-review-and-governance/how-to-use-specdd-in-architecture-reviews/)
- [How to create a SpecDD review checklist](/how-to/code-review-and-governance/how-to-create-a-specdd-review-checklist/)
- [How to keep specs reviewed but lightweight](/how-to/teams-and-process/how-to-keep-specs-reviewed-but-lightweight/)

## Related reference

- [Language reference](/language-reference/)
