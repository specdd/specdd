---
title: "How to ask an agent to plan before coding"
seoDescription: "Ask an agent to plan before coding by using SpecDD specs in a spec-driven development workflow to identify authority, constraints, files, checks, and unresolved decisions."
excerpt: "Use a SpecDD planning prompt before implementation so the agent identifies the governing spec, allowed files, constraints, checks, and ambiguity before editing."
level: "Beginner"
howtoID: "1041001"
weight: 35
---

This guide shows you how to ask an agent for an implementation plan before it changes code in a spec-driven development workflow.

Planning is not ceremony. It is the moment when the agent proves it has found the relevant SpecDD contract, understands
what may change, and can name how the result will be checked.

## Short answer

Use a one-instruction planning prompt:

```text
Plan the Itinerary validation change.
```

Then review the plan against the spec before asking for implementation. The plan should identify the governing specs,
allowed files, required behavior, forbidden changes, verification steps, and any unresolved decisions.

## When to use this guide

Ask for a plan before coding when:

- the change touches more than one file
- the work affects user-visible behavior
- the agent might cross module, package, service, or documentation boundaries
- the spec contains `Must not`, `Forbids`, or unresolved `Tasks`
- the agent will update tests or task status
- the cost of a wrong edit is higher than the cost of a short review

For a tiny, well-specified typo or one-line documentation fix, a separate plan may be unnecessary.

## Steps

### 1. Start from a bounded task

The best plans begin with a concrete subject:

```text
Plan the Itinerary validation change.
```

This is better than:

```text
Plan improvements for trip management.
```

The first prompt has a clear spec or feature target. The second gives the agent too much room to invent scope.

### 2. Expect the plan to name authority

A useful SpecDD plan should identify the local authority for the change.

For example, if the local spec contains:

```sdd
Spec: Itinerary

Owns:
  ./itinerary.js
  ./itinerary.test.js

Must:
  Missing place names are rejected before an itinerary item is stored.

Must not:
  Change destination search behavior.
```

the plan should not propose edits to destination search files. If `Can modify` is present, it should use that writable
scope. If `Can modify` is absent, `Owns` is the default modification boundary.

### 3. Check the proposed file changes

Before approving the plan, compare each proposed path to the spec:

- files under `Can modify` are expected writable targets
- files under `Owns` are writable when `Can modify` is absent
- files under `Can read` are context, not edit permission
- files under `References` are context, not edit permission
- paths forbidden by `Forbids` are off limits

If the plan proposes a file outside authority, send it back for revision before code changes begin.

Use:

```text
Revise the Itinerary validation plan.
```

### 4. Check behavior against `Must` and `Must not`

A plan should map implementation work to required behavior.

Good:

- add missing-place validation before storing an itinerary item
- preserve existing itinerary ordering behavior
- avoid changes to destination search
- cover the missing-place scenario with a check

Weak:

- clean up itinerary code
- improve validation generally
- refactor related trip modules

The weak plan may sound useful, but it is not anchored to the spec.

### 5. Check the verification strategy

The plan should say how the work will be proven complete. The right checks depend on the project, but the plan should
connect them to `Done when` and `Scenario` when those sections exist.

Example:

```sdd
Done when:
  Missing-place behavior is covered by a check.
  Existing itinerary ordering still passes.

Scenario: missing place name
  Given the place name is empty
  When the person adds the itinerary item
  Then validation fails
  And no itinerary item is stored
```

The plan should mention a missing-place check and existing itinerary checks. If the agent cannot run checks, it should
say why instead of marking the work complete.

### 6. Approve implementation only after the plan is coherent

After the plan is correct, use a separate prompt:

```text
Implement the approved Itinerary validation plan.
```

Keeping plan and implementation separate gives you a review point before files change.

## Example plan checklist

Before accepting an agent plan, check:

- the plan names the spec, feature, or task
- proposed edits are inside `Can modify` or `Owns`
- referenced context is not treated as writable authority
- inherited `Must not` and `Forbids` rules are preserved
- the plan does not add optional behavior outside the task
- checks match `Done when`, `Scenario`, or project conventions
- unresolved choices are called out clearly

## Common mistakes

- Asking for a plan after the agent has already edited files.
- Accepting a plan that says "update related files" without naming them.
- Letting `Can read` or `References` turn into edit permission.
- Approving a plan that contains broad cleanup unrelated to the task.
- Ignoring an ambiguity because the agent used confident language.

## How to verify the result

Your planning workflow is working when:

- plans are short enough to review
- every proposed edit has spec authority
- the implementation prompt follows a reviewed plan
- final changes match the approved plan
- checks or skipped-check explanations are reported
- unresolved decisions are handled before implementation

## Related how-tos

- [How to review an agent plan against a spec](/how-to/agent-workflows/how-to-review-an-agent-plan-against-a-spec/)
- [How to stop an agent when the spec is ambiguous](/how-to/agent-workflows/how-to-stop-an-agent-when-the-spec-is-ambiguous/)
- [How to stop agents from overengineering](/how-to/agent-workflows/how-to-stop-agents-from-overengineering/)

## Related reference

- [Quickstart](/quickstart/)
- [Language reference](/language-reference/)
