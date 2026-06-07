---
title: "How to recover from spec-code drift"
seoDescription: "Recover from SpecDD spec-code drift in a spec-driven development workflow by pausing new edits, comparing specs to implementation, choosing the intended contract, and updating code, tests, and specs."
excerpt: "Fix spec-code drift by identifying the disagreement, choosing the intended source of truth, and realigning specs, code, tasks, and checks together."
level: "Intermediate"
howtoID: "1081004"
weight: 50
---

This guide shows you how to recover when SpecDD specs and implementation have drifted apart in a spec-driven
development workflow.

Drift means the repository has two competing stories: the `.sdd` spec says one thing, while code, tests, docs, or task
status say another. The recovery goal is not to make the diff quiet. The goal is to decide what should be true and make
the spec, code, checks, and tasks agree again.

## Short answer

Pause new behavior, compare the effective spec chain with the current implementation, classify the disagreement, decide
whether the spec or code is wrong, then update code, specs, tasks, and checks in the same reviewed change. Do not let an
agent or contributor silently choose the new contract when the behavior is ambiguous.

## When to use this guide

Use this guide when:

- a spec describes behavior that code no longer has
- code implements behavior that no spec authorizes
- tests prove behavior that conflicts with `Must`, `Must not`, or `Forbids`
- task status says work is done but checks or code disagree
- a referenced spec was treated as writable authority
- reviewers no longer trust the local `.sdd` file

## Steps

### 1. Stop adding new behavior

Do not build more on top of drift. First get the local contract back into a trustworthy state.

Use a narrow prompt if an agent is helping:

```text
Compare the Itinerary behavior with its spec.
```

Then, after reviewing the comparison:

```text
Draft a drift recovery plan for Itinerary.
```

Keep comparison, planning, and implementation as separate steps. If the contract is already unclear, combining those
actions makes the disagreement harder to review.

### 2. Identify the drift type

Most drift falls into one of these groups:

- **Spec stale:** code changed intentionally, but the spec was not updated
- **Code wrong:** code violates a current `Must`, `Must not`, `Forbids`, or boundary rule
- **Task stale:** `Tasks` status no longer matches implemented and checked work
- **Check stale:** tests or checks prove old behavior while the spec describes new behavior
- **Authority drift:** files changed outside `Can modify` or `Owns`
- **Reference drift:** a referenced spec was read as context but treated as editable authority

Name the drift before fixing it. Different drift types need different corrections.

### 3. Compare the spec chain to the code

Do not compare only the nearest file. SpecDD uses inherited context.

For example, work on:

```text
src/trips/itinerary.js
```

might inherit:

```text
travel-planner.sdd
src/trips/trips.sdd
src/trips/itinerary.sdd
```

Check:

- parent `Must not` and `Forbids`
- local `Owns` or `Can modify`
- local `Must` rules
- scenarios and examples
- task status
- explicit `References` that affect behavior

If a child spec appears to loosen a parent rule, treat that as a conflict. Parent constraints remain active unless the
operator explicitly resolves the change safely.

### 4. Choose the intended contract

For each disagreement, decide which side should change:

- update the code when the spec is correct
- update the spec when the code reflects an approved behavior change
- update both when the intended behavior is different from both
- mark a task `[?]` or `[!]` when no safe decision exists yet

Do not preserve accidental behavior just because it exists. Do not delete a spec rule just because the code violates it.
The recovery decision should come from product, design, architecture, security, or ownership review as appropriate.

### 5. Update code or specs deliberately

If code is wrong, make the smallest implementation change that restores the spec contract.

If the spec is stale, update the durable sections:

```sdd
Must:
  Reject itinerary items without a place name.

Done when:
  Missing-place validation is covered by a check.

Scenario: missing place name
  Given the place name is empty
  When the person adds the itinerary item
  Then validation fails
```

If the issue is authority drift, move the change back inside the authorized boundary or create a reviewed spec change
that grants the needed authority.

### 6. Add checks for the recovered behavior

Drift often returns when the recovered behavior is not checked. Add or update tests, validation, linting, documentation
checks, or review gates that prove the selected contract.

Checks should cover:

- the behavior that drifted
- any negative boundary that was violated
- the task or scenario that was stale
- the files or dependencies that should remain untouched

### 7. Prevent the drift from returning

After recovery, improve the local workflow:

- add missing `Done when` criteria
- add a scenario for the recovered behavior
- move broad rules to the owning parent spec instead of copying them
- make writable scope explicit with `Can modify`
- use `Can read` or `References` for outside context
- require spec and code changes in the same pull request when behavior changes

Drift prevention is usually a small spec improvement, not a large process change.

## Example

Drift:

```sdd
Must not:
  Change destination search behavior.

Tasks:
  [x] Add missing-place validation.
```

But the implementation changed:

```text
src/destinations/destination-search.js
```

Recovery:

- revert or adjust the destination search edit unless a separate reviewed spec authorizes it
- keep the validation change inside itinerary files
- run itinerary checks and any affected destination checks
- leave the task `[x]` only if validation is complete and destination behavior is preserved

## Common mistakes

- Letting the person or agent who caused the drift silently decide the new contract.
- Updating the spec to match code without checking whether the code was intended.
- Fixing code but leaving stale task status or scenarios behind.
- Ignoring inherited parent rules during drift recovery.
- Treating drift recovery as a broad cleanup pass.

## How to verify the result

Drift has been recovered when:

- the intended contract is explicit in the governing spec chain
- code behavior matches that contract
- changed files are inside authorized scope
- stale task states have been corrected
- checks prove the recovered behavior
- reviewers can explain why the spec, code, and tests now agree

## Related how-tos

- [How to keep specs in sync with code changes](/how-to/spec-driven-workflows/how-to-keep-specs-in-sync-with-code-changes/)
- [How to resolve conflicts between specs](/how-to/spec-driven-workflows/how-to-resolve-conflicts-between-specs/)
- [How to review an agent plan against a spec](/how-to/agent-workflows/how-to-review-an-agent-plan-against-a-spec/)
- [How to change a spec safely after code already exists](/how-to/spec-driven-workflows/how-to-change-a-spec-safely-after-code-already-exists/)

## Related reference

- [Quickstart](/quickstart/)
- [Language reference](/language-reference/)
