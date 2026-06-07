---
title: "How to maintain the Single Responsibility Principle with SpecDD"
seoDescription: "Maintain the Single Responsibility Principle with spec-driven development by writing local specs that define one purpose, owned files, required behavior, and explicit non-goals."
excerpt: "Use Purpose, Owns, Must, Must not, and local tasks to keep each module, service, model, adapter, or component responsible for one coherent thing."
level: "Intermediate"
howtoID: "1101000"
weight: 10
---

This guide shows you how to use spec-driven development to maintain the Single Responsibility Principle.

The Single Responsibility Principle is often summarized as "one reason to change." In practice, that means a module,
service, model, adapter, component, or job should have one coherent responsibility, not a collection of unrelated
decisions that happened to accumulate in the same file.

SpecDD is an amazing way to make this principle operational because the responsibility is not just a guideline in a
style guide. It becomes a local, source-adjacent contract that humans and agents consult while changing code.

## Short answer

Use `Purpose` to name the unit's responsibility, `Owns` and `Can modify` to define the local boundary, `Must` to state
the behavior that belongs there, and `Must not` to block responsibilities that should stay elsewhere. Keep `Tasks`
small enough to complete inside the local boundary. During review, reject changes that add a second unrelated reason
for the unit to change.

## When to use this guide

Use this guide when:

- a file or module keeps collecting unrelated behavior
- a service is starting to coordinate too many workflows
- a UI component contains domain rules
- an adapter is making business decisions
- tests are hard to write because one unit has too many responsibilities
- agents keep adding "just one more" behavior to the nearest file

## The design idea

SRP is not a rule that every file must be tiny. A unit can be substantial if all of its behavior supports one coherent
responsibility. The problem starts when a unit needs to change for unrelated reasons: storage changes, validation
changes, UI layout changes, policy changes, API compatibility changes, and reporting changes all pushing on the same
place.

Specs help because they force a naming decision. If the `Purpose` line cannot explain the unit without using "and" for
unrelated concerns, the unit may already have more than one responsibility. If the `Must` rules describe different kinds
of work, the spec is showing you where to split.

## Steps

### 1. Choose the unit

Pick the smallest useful unit whose responsibility you want to protect:

- a model that owns domain state
- a service that coordinates one workflow
- an adapter that talks to one external system
- a component that renders and captures UI interaction
- a job that performs one background process
- a module directory that owns one subsystem

Do not start with the whole product area unless the responsibility is truly module-wide.

### 2. Write one clear purpose

Good:

```sdd
Spec: Trip Storage

Purpose:
  Persist and retrieve trips and itinerary items.
```

Weak:

```sdd
Spec: Trip Storage

Purpose:
  Save trips, validate itinerary rules, manage display order, and decide which trips are visible.
```

The weak purpose mixes persistence, validation, ordering, and visibility policy. Those may all matter to trip behavior,
but they are different reasons to change.

### 3. Define owned files and behavior

Use `Owns` to make the local boundary concrete:

```sdd
Owns:
  ./trip-storage.js
  ./trip-storage.test.js
```

Then use `Must` for behavior that belongs inside the responsibility:

```sdd
Must:
  Trip changes are saved.
  Previously saved trips are loaded when the app starts.
  Save failures are reported in a way the itinerary can show to the person.
```

These rules are cohesive. They all describe storage behavior.

### 4. Add non-goals

Use `Must not` for responsibilities that are plausible mistakes:

```sdd
Must not:
  Change place names.
  Move itinerary items between days.
  Decide which itinerary items are visible.
```

This is where SpecDD turns SRP from advice into a guardrail. The spec does not merely say what storage does. It also
says which tempting adjacent decisions storage must not absorb.

### 5. Keep tasks inside the responsibility

Good:

```sdd
Tasks:
  [ ] Report save failures to itinerary behavior.
  [ ] Add a check for loading previously saved trips.
```

Wrong for this spec:

```sdd
Tasks:
  [ ] Add itinerary validation for missing place names.
```

That task may be important, but it belongs in the itinerary validation spec, not the storage spec. A task that requires
touching unrelated files is a sign that the task or the spec boundary needs review.

### 6. Review changes against the responsibility

During code review, ask:

- Does the change support the spec's `Purpose`?
- Does it stay inside `Owns` or `Can modify`?
- Does it add behavior that belongs in another spec?
- Does it violate `Must not`?
- Did a new responsibility appear because it was convenient to implement here?

This review is especially useful for agent-generated code because the nearest file is often not the right design home.

## Full example

```sdd
Spec: Trip Storage

Purpose:
  Persist and retrieve trips and itinerary items.

Owns:
  ./trip-storage.js
  ./trip-storage.test.js

Must:
  Trip changes are saved.
  Previously saved trips are loaded when the app starts.
  Save failures are reported in a way the itinerary can show to the person.

Must not:
  Change place names.
  Move itinerary items between days.
  Decide which itinerary items are visible.

Depends on:
  browser local storage

Tasks:
  [ ] Add failure reporting for save errors.

Done when:
  Save failure behavior is covered by a check.
  Itinerary validation behavior remains outside trip storage.
```

This spec gives the storage unit one reason to change: persistence behavior. It can change when storage changes. It
should not change because the team wants a new itinerary validation rule or a new display policy.

## Common mistakes

- Writing a broad `Purpose` that combines persistence, validation, UI, and policy.
- Using `Owns` to claim every file a feature might touch instead of the files the unit governs.
- Adding `Must` rules for behavior that belongs in a child or sibling spec.
- Forgetting `Must not` rules for likely responsibility leaks.
- Marking a task local even though it requires edits outside the responsibility.
- Treating SRP as "small files" instead of one coherent reason to change.

## How to verify the result

The unit is respecting SRP when:

- its `Purpose` names one coherent responsibility
- its `Must` rules all support that responsibility
- adjacent responsibilities are blocked with `Must not`
- tasks can usually be completed inside `Owns` or `Can modify`
- reviewers can explain why the unit should change
- tests map cleanly to the unit's behavior instead of requiring broad setup across unrelated areas

## Related how-tos

- [How to write the Purpose section](/how-to/use-spec-sections/how-to-write-the-purpose-section/)
- [How to use the Owns section](/how-to/use-spec-sections/how-to-use-the-owns-section/)
- [How to write Must not rules](/how-to/use-spec-sections/how-to-write-must-not-rules/)
- [How to write a service spec](/how-to/write-specs-by-level/how-to-write-a-service-spec/)

## Related reference

- [Language reference](/language-reference/)
