---
title: "How to assess change risk (specdd-risk)"
seoDescription: "Assess spec-driven development change risk with specdd-risk by checking write authority, public contracts, security boundaries, data shape, migrations, dependencies, and verification."
excerpt: "Use specdd-risk before risky work to classify a change as low, medium, or high risk and choose the smallest safe next step."
level: "Intermediate"
howtoID: "1091007"
weight: 60
---

This guide shows you how to use `specdd-risk` to classify change risk before spec-driven development work starts.

Risk assessment is read-only unless you explicitly ask for follow-up edits. It helps decide whether a change can be
implemented directly, needs a plan, needs a spec update, or should stop for a decision.

## Short answer

Use `specdd-risk` before risky work or whenever you need a risk call. The agent should identify write authority and stop
conditions, check public contracts, security boundaries, data shape, migrations, dependencies, and verification, then
classify the change as low, medium, or high risk with concrete reasons and the smallest safe next step.

## When to use this guide

Use this guide when a change:

- has unclear write authority or conflicting specs
- touches public APIs, persistent data, auth, secrets, payments, releases, or migrations
- crosses spec boundaries or changes ownership
- lacks tests for specified scenarios
- requires destructive operations or irreversible state changes
- depends on external systems, live credentials, or time-sensitive behavior

## Steps

### 1. Use risk assessment before editing

Use a focused prompt:

```text
Assess risk for the Itinerary storage change.
```

Keep this separate from implementation. If the risk call finds ambiguity, you want to know before files change.

### 2. Identify authority and stop conditions

The agent should check:

- which spec chain governs the target
- where write authority comes from
- whether `Can modify` or `Owns` includes likely files
- whether `Must not` or `Forbids` could block the change
- whether public behavior, security, or destructive behavior is ambiguous

Unclear authority raises risk immediately.

### 3. Check risk factors

Ask whether the change touches:

- public contracts
- persistent data
- authentication or authorization
- secrets
- payment or billing flows
- migrations
- releases or deployment
- dependencies
- cross-module ownership
- missing or weak verification

The more of these factors apply, the more planning and review the change needs.

### 4. Classify risk with reasons

The report should classify risk as low, medium, or high.

Example:

```text
Risk: medium.

Reasons:
- The change stays inside the Itinerary spec's writable files.
- It affects validation behavior used by storage.
- Missing-place behavior has a scenario but no regression check yet.

Smallest safe next step:
Plan the validation change and add a focused test before implementation is marked complete.
```

Risk labels are only useful when the reasons are concrete.

### 5. Choose the smallest safe next step

Possible next steps:

- proceed with `specdd-do` for low-risk, well-specified work
- use `specdd-plan` for unclear or multi-file work
- use `specdd-author` when the spec needs review first
- use `specdd-test` when verification is the main gap
- stop for a human decision when authority, public behavior, or security is ambiguous

The next step should reduce risk, not simply move faster.

### 6. Name verification needed

The risk report should say what proof is needed before completion:

- focused tests
- existing test suite
- migration dry run
- lint or type checks
- documentation build
- security review
- manual acceptance check

Without verification, a risk call is incomplete.

## Common mistakes

- Treating risk assessment as approval to edit.
- Calling a change low risk without checking write authority.
- Ignoring missing tests for specified scenarios.
- Downplaying public contract or data-shape changes.
- Ending with a risk label but no safe next step.

## How to verify the result

The risk assessment worked when:

- no files were edited
- write authority and stop conditions were identified
- risk is labeled low, medium, or high with concrete reasons
- verification requirements are named
- the next step is small and safe
- blockers are surfaced before implementation

## Related how-tos

- [How to ask an agent to plan before coding](/how-to/agent-workflows/how-to-ask-an-agent-to-plan-before-coding/)
- [How to implement under spec authority](/how-to/work-with-specdd-skills/how-to-implement-under-spec-authority-specdd-do/)
- [How to review a diff against specs](/how-to/work-with-specdd-skills/how-to-review-a-diff-against-specs-specdd-review/)
- [How to chain SpecDD skills safely](/how-to/work-with-specdd-skills/how-to-chain-specdd-skills-safely/)

## Related reference

- [Tools](/tools/)
- [Language reference](/language-reference/)
