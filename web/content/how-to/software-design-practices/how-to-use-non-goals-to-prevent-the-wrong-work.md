---
title: "How to use non-goals to prevent the wrong work"
seoDescription: "Use spec-driven development non-goals to prevent wrong work by writing focused Must not rules for plausible boundary mistakes, overreach, and responsibility leaks."
excerpt: "Write non-goals as practical Must not rules that stop likely overreach while keeping specs short, local, and maintainable."
level: "Beginner"
howtoID: "1101012"
weight: 130
---

This guide shows you how to use non-goals to prevent the wrong work with SpecDD in a spec-driven development workflow.

Non-goals are one of SpecDD's most practical design tools. A good non-goal blocks a mistake that a reasonable human or
agent might make while implementing the spec. It keeps work from spreading into adjacent behavior, dependencies, layers,
or product decisions.

In SpecDD, most non-goals belong in `Must not`. Use them to say what the subject must not do, even if that work looks
nearby or tempting.

## Short answer

Write non-goals as specific `Must not` rules for plausible local mistakes. Use `Forbids` instead when the boundary is a
blocked dependency, path, tool, library, module, or access pattern. Keep non-goals short and meaningful. Do not list
every unrelated thing the subject does not do.

## When to use this guide

Use this guide when:

- an implementation might overreach into adjacent behavior
- a feature idea says "do not touch" another area
- a local spec has a clear responsibility but weak boundaries
- a previous change crossed the wrong boundary
- a component, service, adapter, or job keeps absorbing extra work
- reviewers want an objective way to reject out-of-scope changes

## The design idea

Required behavior says what the unit should do. Non-goals say where it should stop. Both are design information.

Without non-goals, an implementation can satisfy every `Must` rule and still do the wrong work. For example, a UI
component can show validation feedback while also duplicating validation rules. A storage adapter can save trips while
also deciding which itinerary items are visible. A feature can add itinerary behavior while also changing booking flow.

Non-goals prevent those nearby mistakes.

## Steps

### 1. Identify plausible wrong work

Ask:

- What adjacent behavior might someone change by convenience?
- What layer might someone reach into?
- What responsibility might this unit accidentally absorb?
- What product decision is explicitly out of scope?
- What old bug should not be reintroduced?

Only write non-goals for mistakes that are plausible in this local context.

### 2. Write focused Must not rules

Good:

```sdd
Must not:
  Change destination search ranking.
  Persist itinerary items directly from UI components.
  Purchase bookings or tickets.
```

Weak:

```sdd
Must not:
  Break anything.
  Do unrelated work.
  Make bad architecture choices.
```

The good rules are reviewable. The weak rules are just anxiety in spec form.

### 3. Separate behavior from dependency bans

Use `Must not` for behavior:

```sdd
Must not:
  Decide whether itinerary input is valid.
```

Use `Forbids` for blocked access or dependencies:

```sdd
Forbids:
  ../adapters/*
  direct browser storage access
```

This distinction helps reviewers understand whether the rule blocks a behavior or an implementation path.

### 4. Avoid unrelated negative lists

Bad:

```sdd
Must not:
  Send email.
  Process payments.
  Render charts.
  Manage authentication.
  Start background jobs.
```

If none of those mistakes are plausible for the local subject, the list adds noise. A noisy spec becomes harder to
maintain and easier to ignore.

### 5. Use non-goals to preserve ownership

For a storage adapter:

```sdd
Must not:
  Change place names.
  Move itinerary items between days.
  Decide which itinerary items are visible.
```

These non-goals keep storage focused on persistence.

For a component:

```sdd
Must not:
  Decide itinerary validation rules.
  Persist itinerary items directly.
```

These non-goals keep UI focused on presentation and interaction.

### 6. Review non-goals before implementation

Before code changes, ask:

- Is each non-goal relevant to this local spec?
- Does each one prevent a plausible wrong change?
- Should any rule be a parent boundary instead?
- Should any dependency ban move to `Forbids`?
- Is a non-goal hiding an unresolved product decision?

Good non-goals protect the work. Bad non-goals make the spec noisy.

### 7. Update non-goals when boundaries change

Removing or weakening a non-goal changes future implementation authority. Treat it as a design change. If a component is
now allowed to own a decision it previously did not own, reviewers should understand why the boundary moved.

## Example

```sdd
Spec: Itinerary Form

Purpose:
  Capture itinerary item input and show validation feedback.

Owns:
  ./itinerary-form.jsx
  ./itinerary-form.test.jsx

Must:
  Submit place name and trip day to itinerary behavior.
  Show validation feedback returned by itinerary behavior.

Must not:
  Decide whether an itinerary item is valid.
  Persist itinerary items directly.
  Fetch destination search results directly.

Forbids:
  ../adapters/*
  direct browser storage access

Done when:
  The component shows validation feedback.
  The component does not import storage adapters.
```

This spec gives the component enough authority to implement UI behavior and enough limits to prevent wrong work.

## Common mistakes

- Writing broad non-goals that apply to every file in the project.
- Listing impossible unrelated work just to make the spec look safer.
- Using `Must not` for dependency paths that belong in `Forbids`.
- Omitting non-goals for the exact adjacent behavior contributors keep changing.
- Removing a non-goal without reviewing what authority changed.
- Duplicating parent non-goals in child specs.

## How to verify the result

The non-goals are useful when:

- each rule prevents a plausible local mistake
- behavior boundaries are in `Must not`
- dependency and access boundaries are in `Forbids`
- the list is short enough to maintain
- reviewers can reject wrong work by pointing to a specific rule
- child specs do not duplicate parent non-goals unnecessarily

## Related how-tos

- [How to write Must not rules](/how-to/use-spec-sections/how-to-write-must-not-rules/)
- [How to use the Forbids section](/how-to/use-spec-sections/how-to-use-the-forbids-section/)
- [How to write specs that prevent technical debt](/how-to/software-design-practices/how-to-write-specs-that-prevent-technical-debt/)
- [How to avoid duplicating parent constraints in child specs](/how-to/spec-writing-technique/how-to-avoid-duplicating-parent-constraints-in-child-specs/)

## Related reference

- [Language reference](/language-reference/)
