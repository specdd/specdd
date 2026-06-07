---
title: "How to use SpecDD with BDD"
seoDescription: "Use spec-driven development with BDD by turning reviewed Scenario blocks into behavior tests while preserving ownership, non-goals, and implementation boundaries."
excerpt: "Bridge SpecDD and BDD by writing scenarios inside source-adjacent specs, deriving executable examples, and reviewing behavior together with boundaries."
level: "Intermediate"
howtoID: "1131001"
weight: 20
---

This guide shows you how to use SpecDD with behavior-driven development.

BDD works best when examples create shared understanding. SpecDD makes those examples more useful by placing them inside
the local contract that owns the behavior. A scenario can say what happens. The surrounding spec can say where the
behavior belongs, what must not change, which dependencies matter, and how completion will be reviewed.

That combination is valuable because a BDD scenario can pass while implementation still crosses a design boundary.
SpecDD keeps the behavior example connected to authority and scope.

## Short answer

Write BDD-style examples as `Scenario` blocks in the spec that owns the behavior. Keep scenarios precise and observable.
Use `Purpose`, `Owns`, `Must`, `Must not`, `Depends on`, and `Done when` around the scenario so the executable example
does not become a broad implementation request. Derive BDD tests from reviewed scenarios, then trace the tests back to
the owning spec.

## When to use this guide

Use this guide when:

- product, QA, and engineering discuss behavior through examples
- scenarios already exist in tickets but not in local specs
- a feature needs both shared behavior language and implementation boundaries
- BDD tests pass but code keeps violating architecture constraints
- an agent needs concrete examples without losing scope
- review needs to know which spec owns each scenario

## The workflow

### 1. Review the behavior owner

Before writing a BDD-style test, decide which spec owns the behavior:

```sdd
Spec: Trip Edit Access

Purpose:
  Decide whether a person may edit a trip itinerary.
```

If the behavior is a policy, put the scenario in the policy spec. If it is UI feedback, put it in the component spec. If
it is an API response, put it in the API spec.

This avoids duplicating the same scenario across several layers.

### 2. Write precise scenarios

Good:

```sdd
Scenario: view-only collaborator
  Given a collaborator has view-only access
  When the collaborator changes an itinerary item
  Then the edit is denied
  And the itinerary remains unchanged
```

Weak:

```sdd
Scenario: collaborator behavior
  Given a collaborator exists
  When something happens
  Then the system handles it correctly
```

BDD tests need concrete conditions and observable results. So do good SpecDD scenarios.

### 3. Add boundary context

A scenario alone does not say what code may change. Surround it with ownership and non-goals:

```sdd
Owns:
  ./trip-edit-access.policy.js
  ./trip-edit-access.policy.test.js

Must:
  Deny collaborators with view-only access.

Must not:
  Decide UI rendering for denied access.
  Persist audit events directly.
```

Now the BDD example is tied to the policy owner, not to UI or persistence.

### 4. Derive executable examples

Turn the scenario into a test at the right level.

For a policy spec, the executable example might be a focused policy test:

```text
View-only collaborator is denied edit access and the itinerary remains unchanged.
```

For a UI component spec, it might be an interaction test:

```text
Denied edit access displays the returned access message.
```

The test level follows the spec owner.

### 5. Keep step definitions honest

If your BDD framework uses reusable step definitions, make sure the step does not hide broad setup or behavior that
belongs to another spec.

A step like this can be too broad:

```text
Given a fully configured editable trip with collaborators, storage, notifications, and permissions
```

Prefer steps that match the scenario's actual behavior. If setup crosses several owners, the scenario may be an
end-to-end test or the spec may need to be split.

### 6. Trace tests back to specs

Each BDD test should be able to answer:

- Which spec owns this scenario?
- Which `Must` or `Must not` entries does it cover?
- Which behavior remains untested?
- Did the implementation satisfy the scenario without violating boundaries?

This is where SpecDD prevents BDD tests from becoming detached examples.

## Full example

```sdd
Spec: Trip Edit Access

Purpose:
  Decide whether a person may edit a trip itinerary.

Owns:
  ./trip-edit-access.policy.js
  ./trip-edit-access.policy.test.js

Accepts:
  person
  trip
  requested edit action

Returns:
  allow or deny

Must:
  Allow the trip owner to edit itinerary items.
  Allow collaborators with edit access to edit itinerary items.
  Deny collaborators with view-only access.

Must not:
  Decide UI rendering for denied access.
  Persist audit events directly.

Scenario: view-only collaborator
  Given a collaborator has view-only access
  When the collaborator changes an itinerary item
  Then the edit is denied
  And the itinerary remains unchanged

Done when:
  View-only collaborator denial is covered by a policy check.
```

The scenario is suitable for BDD-style discussion, and the spec makes the implementation boundary clear.

## Working with an agent

Useful focused prompts:

```text
Convert the Trip Edit Access scenario into a behavior test.
```

```text
Review the Trip Edit Access behavior test against the policy spec.
```

Each prompt names the behavior in human terms and keeps the task narrow.

## Common mistakes

- Writing scenarios in tickets but never moving durable behavior into the owning spec.
- Putting one business scenario in UI, API, and policy specs instead of choosing an owner.
- Letting BDD step definitions hide broad cross-layer setup.
- Passing scenario tests while violating `Must not` or `Forbids`.
- Writing scenarios with vague outcomes that cannot become checks.
- Treating a BDD test as proof that ownership and write authority were respected.

## How to verify the result

SpecDD and BDD are working together when:

- scenarios live in the spec that owns the behavior
- each scenario has concrete given, when, and then conditions
- executable examples trace back to spec entries
- tests run at the level governed by the spec
- step definitions do not hide unrelated responsibilities
- implementation satisfies scenarios and respects boundaries

## Related how-tos

- [How to compare spec-driven development vs BDD](/how-to/software-design-practices/how-to-compare-spec-driven-development-vs-bdd/)
- [How to write Scenario blocks](/how-to/use-spec-sections/how-to-write-scenario-blocks/)
- [How to derive tests from a spec](/how-to/work-with-specdd-skills/how-to-derive-tests-from-a-spec-specdd-test/)
- [How to use SpecDD with TDD](/how-to/testing-and-quality/how-to-use-specdd-with-tdd/)

## Related reference

- [Language reference](/language-reference/)
