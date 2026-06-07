---
title: "How to reject a spec-driven change constructively"
seoDescription: "Reject a spec-driven change constructively by naming the violated spec-driven development contract, explaining the risk, and giving the smallest safe path forward."
excerpt: "Use SpecDD to make rejection precise: point to authority, behavior, boundaries, tasks, or verification gaps and suggest a narrow correction."
level: "Intermediate"
howtoID: "1141006"
weight: 70
---

This guide shows you how to reject a spec-driven change without turning review into a vague "no." in a spec-driven development workflow.

SpecDD makes rejection easier because reviewers can point to local contracts: write authority, required behavior,
`Must not`, `Forbids`, tasks, and completion criteria. A good rejection tells the contributor what contract failed and
what narrow action would make the change acceptable.

## Short answer

Reject the change by naming the specific SpecDD rule or gap, explaining the behavior or governance risk, and offering
the smallest safe next step. Do not rely on taste, broad preference, or "this feels wrong" when a concrete authority,
boundary, task, or verification issue exists.

## When to use this guide

Use this guide when:

- a pull request edits files outside authority
- implementation violates `Must not` or `Forbids`
- code and specs disagree
- task status was marked complete too early
- generated specs encode wrong assumptions
- the change might be valid but the spec is ambiguous

## Steps

### 1. Name the contract problem

Start with the reason the change cannot be accepted.

Examples:

> This edits destination search files, but the Itinerary spec only grants write authority for itinerary files.

> This imports direct browser storage access, but the Itinerary spec forbids direct storage writes from itinerary
> behavior.

> The task is marked done, but the Done when check is not shown in the pull request.

Concrete review comments are easier to act on and easier to discuss.

### 2. Separate violations from ambiguity

Violation:

> The spec says destination search behavior must not change, but this patch changes ranking.

Ambiguity:

> The spec does not say whether empty place names should be rejected or normalized, so this behavior needs a spec
> decision before implementation.

Both can block a merge, but they need different follow-up. Violations usually need code or spec correction. Ambiguity
needs a decision, often marked with `[?]` until resolved.

### 3. Explain the concrete risk

Connect the contract problem to the risk:

- unauthorized file changes make future review unreliable
- weakening `Must not` can reopen rejected behavior
- ignoring `Forbids` can introduce blocked dependencies
- completed tasks without checks create false confidence
- stale specs mislead the next human or agent
- broad generated specs can transfer ownership accidentally

Keep the risk specific to the change. Avoid generic process lectures.

### 4. Offer the smallest path forward

Good rejection includes a narrow next step.

For unauthorized files:

> Please split destination search into a separate spec-driven change or keep this pull request inside the Itinerary
> authority.

For stale specs:

> Please update the Itinerary spec for the new validation behavior in this pull request.

For a blocked dependency:

> Please route the save through the storage adapter or propose a reviewed change to the Forbids rule.

For ambiguity:

> Please mark the task `[?]` and add the decision needed for empty place names.

### 5. Handle task status honestly

If work is not complete, do not accept `[x]`.

Use:

```sdd
Tasks:
  [?] Confirm whether blank place names are rejected or normalized.
```

or:

```sdd
Tasks:
  [!] Save itinerary directly from UI components. Violates storage boundary.
```

Task status should tell the next contributor what is true, not what the pull request hoped to finish.

### 6. Keep the review actionable

Prefer:

> Request changes: keep this patch inside the Itinerary spec's writable files and leave destination search unchanged.

Avoid:

> This is too broad.

The second comment may be true, but it does not tell the contributor which boundary was crossed.

### 7. Escalate only the right decisions

Not every rejection needs architecture review.

Local fixes can often be handled by:

- narrowing the diff
- updating the owning spec
- adding a missing check
- leaving a task open
- splitting unrelated work

Escalate when the change would alter ownership, weaken a parent boundary, remove `Forbids`, change a public contract, or
affect security, data, destructive, migration, or access behavior.

## Rejection comment template

Use this shape:

> Request changes: `[specific SpecDD contract or gap]`.
>
> Risk: `[concrete behavior, authority, or verification risk]`.
>
> Path forward: `[smallest acceptable next action]`.

Example:

> Request changes: this pull request changes destination search ranking, but the Itinerary spec says destination search
> behavior must not change.
>
> Risk: the Itinerary task would silently alter another feature's behavior.
>
> Path forward: keep this change inside itinerary validation, or open a separate destination search spec change.

## Common mistakes

- Rejecting with vague preference instead of a spec contract.
- Treating ambiguity as if the contributor violated a known rule.
- Asking for a broad rewrite when a narrow spec update would fix the issue.
- Letting `[x]` stand when `Done when` was not verified.
- Escalating local corrections to architecture review unnecessarily.
- Approving a risky change because the contributor agrees to update the spec later.

## How to verify the result

The rejection was constructive when:

- the contributor can identify the failed contract or gap
- the requested change is narrow
- violations and ambiguities are labeled differently
- task status reflects reality
- the path forward stays inside SpecDD authority
- the review improves the change instead of just stopping it

## Related how-tos

- [How to review a SpecDD pull request](/how-to/code-review-and-governance/how-to-review-a-specdd-pull-request/)
- [How to resolve conflicts between specs](/how-to/spec-driven-workflows/how-to-resolve-conflicts-between-specs/)
- [How to stop an agent when the spec is ambiguous](/how-to/agent-workflows/how-to-stop-an-agent-when-the-spec-is-ambiguous/)
- [How to require spec updates in code review](/how-to/code-review-and-governance/how-to-require-spec-updates-in-code-review/)

## Related reference

- [Language reference](/language-reference/)
