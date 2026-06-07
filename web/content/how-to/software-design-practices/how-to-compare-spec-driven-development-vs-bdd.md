---
title: "How to compare spec-driven development vs BDD"
seoDescription: "Compare Spec-driven development and behavior-driven development, understand how scenarios overlap, and learn how SpecDD adds ownership and boundaries."
excerpt: "BDD centers shared behavior examples; SpecDD can include scenarios but also defines source-adjacent ownership, authority, non-goals, dependencies, and tasks."
level: "Beginner"
howtoID: "1101014"
weight: 150
---

This guide shows you how to compare spec-driven development with behavior-driven development.

BDD and SpecDD both value clear behavior. They also both benefit from examples written in language that product,
engineering, and review participants can understand. The overlap is strongest around scenarios: concrete examples of
what should happen.

SpecDD goes further than scenarios. A SpecDD spec can also define ownership, write authority, non-goals, forbidden
dependencies, public contracts, tasks, and completion criteria. That makes it useful not only for describing behavior,
but also for preserving design boundaries while humans and agents change code.

## Short answer

Use BDD-style scenarios when concrete examples help align behavior. Use SpecDD specs to place those scenarios inside a
local source-of-truth contract that also defines what the subject owns, what it must not do, what it depends on, and how
implementation will be reviewed.

## When to use this guide

Use this guide when:

- your team already uses BDD scenarios or Gherkin-like examples
- behavior examples exist but ownership is unclear
- scenarios are useful but agents still cross design boundaries
- feature discussions need durable repository context
- tests cover behavior but do not explain where it belongs
- reviewers need to evaluate both product behavior and architecture constraints

## The difference

BDD usually focuses on shared understanding of behavior through examples. A scenario says what should happen from the
perspective of a user, actor, system interaction, or business rule.

SpecDD can include scenarios, but it is not limited to them. A spec also answers design and workflow questions:

- What subject does this govern?
- What files or responsibilities does it own?
- What behavior is required?
- What behavior is explicitly out of scope?
- What dependencies are allowed or forbidden?
- What tasks remain?
- What checks make the work done?

That extra context matters when implementation begins.

## Scenario overlap

BDD-style:

```text
Scenario: missing place name
  Given the place name is empty
  When the person adds the itinerary item
  Then validation fails
  And no itinerary item is stored
```

SpecDD scenario:

```sdd
Scenario: missing place name
  Given the place name is empty
  When the person adds the itinerary item
  Then validation fails
  And no itinerary item is stored
```

The scenario shape is similar. The difference is the surrounding SpecDD context.

## SpecDD context around a scenario

```sdd
Spec: Itinerary Validation

Purpose:
  Decide whether an itinerary item can be saved.

Owns:
  ./itinerary-validation.js
  ./itinerary-validation.test.js

Must:
  Reject itinerary items without a place name.

Must not:
  Save itinerary items directly.
  Render UI feedback.

Scenario: missing place name
  Given the place name is empty
  When the person adds the itinerary item
  Then validation fails
  And no itinerary item is stored

Done when:
  Missing-place validation is covered by a check.
```

The scenario describes behavior. The rest of the spec says where that behavior belongs and what implementation must not
do.

## How to combine SpecDD and BDD

### 1. Use scenarios for shared examples

Write scenarios when examples clarify behavior:

```sdd
Scenario: collaborator without edit access
  Given a collaborator has view-only access
  When the collaborator changes an itinerary item
  Then the change is rejected
  And the itinerary remains unchanged
```

### 2. Add spec sections for design context

Add the sections BDD scenarios do not usually carry:

```sdd
Owns:
  ./trip-edit-access.policy.js
  ./trip-edit-access.policy.test.js

Must not:
  Decide UI rendering for denied access.
  Persist audit events directly.
```

This keeps the scenario from becoming a broad implementation request.

### 3. Derive tests from scenarios

Scenarios are useful test inputs. They should usually become checks when the behavior is important.

Use `Done when` to make that expectation visible:

```sdd
Done when:
  View-only collaborator denial is covered by a policy check.
```

### 4. Keep business language precise

Good:

```text
Then the change is rejected
And the itinerary remains unchanged
```

Weak:

```text
Then the system handles the collaborator correctly
```

Behavior language should be understandable and checkable.

### 5. Review the full spec, not only scenarios

During review, ask:

- Are scenarios correct?
- Does the spec own the behavior in the scenarios?
- Are `Must not` rules protecting adjacent work?
- Are dependencies and write authority clear?
- Do scenarios need tests?
- Did implementation satisfy scenarios while violating boundaries?

## Common mistakes

- Treating scenarios as the whole spec when ownership and boundaries matter.
- Writing scenarios so vague that they cannot guide tests.
- Putting implementation details in scenario steps.
- Passing scenario tests while violating `Must not` or `Forbids`.
- Copying the same business scenario into several specs instead of choosing an owner.
- Leaving scenarios in tickets instead of moving durable behavior into the local spec.

## How to verify the result

SpecDD and BDD ideas are working together when:

- scenarios capture important behavior examples
- scenarios are surrounded by ownership and boundary context
- tests can trace back to scenarios
- implementation stays inside spec authority
- product language is clear enough for review
- scenarios do not duplicate rules owned elsewhere

## Related how-tos

- [How to write Scenario blocks](/how-to/use-spec-sections/how-to-write-scenario-blocks/)
- [How to compare spec-driven development vs TDD](/how-to/software-design-practices/how-to-compare-spec-driven-development-vs-tdd/)
- [How to use specs as a source of truth](/how-to/spec-writing-technique/how-to-use-specs-as-a-source-of-truth/)
- [How to review a draft spec before using it](/how-to/spec-writing-technique/how-to-review-a-draft-spec-before-using-it/)

## Related reference

- [Language reference](/language-reference/)
