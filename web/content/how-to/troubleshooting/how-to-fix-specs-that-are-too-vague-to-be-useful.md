---
title: "How to fix specs that are too vague to be useful"
seoDescription: "Fix vague SpecDD specs by replacing generic goals with local ownership, observable Must rules, realistic Must not boundaries, scenarios, tasks, and Done when criteria."
excerpt: "Turn vague .sdd specs into useful local contracts by adding scope, ownership, observable behavior, boundaries, tasks, scenarios, and completion criteria."
level: "Beginner"
howtoID: "1191007"
weight: 80
---

This guide shows you how to fix specs that are too vague to guide implementation or review.

A vague spec makes humans and agents infer behavior. SpecDD works best when local ownership, requirements, boundaries,
tasks, and completion criteria are explicit.

## Short answer

Replace generic goals with local, observable rules. Add a clear `Purpose`, `Owns` or `Can modify`, concrete `Must`
behavior, plausible `Must not` boundaries, small `Tasks`, a useful `Done when`, and at least one scenario when behavior
needs verification.

## Steps

### 1. Find the vague lines

Vague:

```sdd
Must:
  Improve itinerary quality.
  Handle errors better.
  Make storage robust.
```

These lines do not say what should happen, where it belongs, or how to check it.

### 2. Name the local subject

Make the spec subject clear:

```sdd
Spec: Itinerary

Purpose:
  Keep a trip itinerary organized by day.
```

If the subject is still too broad, split the spec or move behavior into a nearer local spec.

### 3. Add ownership or write scope

Agents and reviewers need authority:

```sdd
Owns:
  ./itinerary.js
  ./itinerary.test.js
```

Use `Can modify` when writable scope should be narrower than ownership.

### 4. Make Must rules observable

Better:

```sdd
Must:
  Reject itinerary items without a place name.
  Keep existing itinerary items unchanged when validation fails.
```

Observable rules can become tests, checks, or review criteria.

### 5. Add realistic boundaries

Use `Must not` for plausible local mistakes:

```sdd
Must not:
  Change destination search behavior.
  Manage booking or ticket purchase behavior.
```

Do not add a long list of unrelated things the subject obviously does not do.

### 6. Add scenarios and Done when

Use scenarios for behavior examples:

```sdd
Scenario: missing place name
  Given the place name is empty
  When the person adds the itinerary item
  Then validation fails
  And no itinerary item is stored
```

Use `Done when` to define the finish line:

```sdd
Done when:
  Missing-place behavior is covered by a check.
  Existing itinerary behavior still passes.
```

### 7. Challenge the draft

Use a review prompt:

```text
Review the Itinerary spec for ambiguity.
```

The review should focus on behavior, checks, ownership, security, architecture, and assumptions.

## Before and after

Before:

```sdd
Spec: Trips

Must:
  Make trips better.

Tasks:
  [ ] Improve validation.
```

After:

```sdd
Spec: Itinerary

Purpose:
  Keep a trip itinerary organized by day.

Owns:
  ./itinerary.js
  ./itinerary.test.js

Must:
  Reject itinerary items without a place name.

Must not:
  Change destination search behavior.

Tasks:
  [ ] Add missing-place validation.

Done when:
  Missing-place behavior is covered by a check.
```

## Common causes

- Writing a spec from a broad ticket summary.
- Avoiding decisions by using generic verbs.
- Describing implementation effort instead of resulting behavior.
- Leaving ownership unstated.
- Skipping negative boundaries.
- Forgetting `Done when`.

## How to verify the fix

The spec is useful when:

- the subject is local and clear
- writable scope is discoverable
- `Must` rules are observable
- `Must not` prevents plausible wrong work
- tasks are small and local
- `Done when` tells reviewers when to stop
- an agent can plan from it without guessing

## Related how-tos

- [How to write your first .sdd spec](/how-to/getting-started/how-to-write-your-first-sdd-spec/)
- [How to draft specs automatically with AI, then review](/how-to/spec-driven-workflows/how-to-draft-specs-automatically-with-ai-then-review/)
- [How to stop an agent when the spec is ambiguous](/how-to/agent-workflows/how-to-stop-an-agent-when-the-spec-is-ambiguous/)
- [How to author and revise specs](/how-to/work-with-specdd-skills/how-to-author-and-revise-specs-specdd-author/)

## Related reference

- [Language reference](/language-reference/)
