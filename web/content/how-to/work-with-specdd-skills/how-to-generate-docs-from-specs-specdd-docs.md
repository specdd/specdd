---
title: "How to generate docs from specs (specdd-docs)"
seoDescription: "Generate documentation from SpecDD specs in a spec-driven development workflow with specdd-docs by explaining active contracts without expanding behavior, weakening constraints, or inventing workflows."
excerpt: "Use specdd-docs to turn reviewed SpecDD contracts into user or developer documentation while preserving Must not rules, authority boundaries, examples, and verification limits."
level: "Intermediate"
howtoID: "1091006"
weight: 150
---

This guide shows you how to use `specdd-docs` to generate or update documentation from SpecDD specs in a spec-driven
development workflow.

Docs explain the contract. They do not create new behavior, permissions, guarantees, or workflows that the specs and
implementation do not support.

## Short answer

Use `specdd-docs` when an agent should write or update user or developer documentation from active SpecDD contracts.
The agent should identify the documentation authority, resolve the relevant spec chain, explain specified behavior
without expanding it, preserve important `Must not` and operational constraints, and report any behavior that remains
underspecified.

## When to use this guide

Use this guide when:

- docs should be generated from reviewed `.sdd` specs
- a feature guide needs to match local behavior
- developer docs should explain module boundaries
- public docs changed after a spec-driven behavior change
- docs reveal a missing or ambiguous contract

## Steps

### 1. Choose the documentation target

Use a focused prompt:

```text
Document the Itinerary validation behavior.
```

or:

```text
Update the Itinerary developer docs.
```

The target can be user documentation, developer documentation, a runbook, a README section, or another documentation
file governed by the project.

### 2. Resolve the governing specs

The agent should identify:

- the docs file or docs area being edited
- the behavior or feature being explained
- the active spec chain for that behavior
- explicit references that affect the docs
- the nearest spec that grants documentation write authority

Documentation claims should come from specs and implementation, not from a CLI summary alone.

### 3. Explain behavior without expanding it

If the spec says:

```sdd
Must:
  Reject itinerary items without a place name.
```

The docs can say that a place name is required. They should not add unsupported claims such as "all itinerary fields are
validated automatically" unless the active specs and implementation support that.

### 4. Preserve constraints that affect users

Some constraints belong in user-facing or developer-facing docs because they affect safe use.

Examples:

```sdd
Must not:
  Change destination search behavior.

Forbids:
  Direct booking API access from itinerary behavior.
```

Developer docs may need to explain that itinerary validation does not own destination search or booking access. Do not
soften those boundaries into vague wording.

### 5. Keep docs aligned with tasks and tests

If a task is still open, docs should not describe the behavior as complete unless the documentation is explicitly about
planned work.

If `Done when` or scenarios exist, use them to check whether the docs match verified behavior:

```sdd
Done when:
  Missing-place behavior is covered by a check.
```

Docs should not outrun implementation and verification.

### 6. Report underspecified behavior

If docs need to explain a behavior the specs do not define, the agent should report the gap instead of inventing a rule.

Use a follow-up prompt when a spec needs to change:

```text
Revise the Itinerary validation spec.
```

Then update docs after the spec is reviewed.

## Example

Spec:

```sdd
Spec: Itinerary

Must:
  Reject itinerary items without a place name.

Must not:
  Change destination search behavior.
```

Developer doc:

```md
Itinerary validation requires a place name before an item is stored. This validation is local to itinerary behavior;
destination search behavior is outside this module.
```

The doc explains the contract without adding new requirements.

## Common mistakes

- Turning an open task into documentation that sounds complete.
- Adding behavior guarantees that are not in specs or implementation.
- Omitting `Must not` boundaries that affect developer use.
- Treating generated docs as source of truth instead of explanatory material.
- Updating docs without checking whether tests and scenarios still match.

## How to verify the result

The docs workflow worked when:

- docs changed only where authorized
- documentation claims map to active specs or implementation
- important boundaries remain visible
- open tasks are not described as complete behavior
- docs, specs, examples, and tests agree
- underspecified behavior is reported rather than invented

## Related how-tos

- [How to keep specs in sync with code changes](/how-to/spec-driven-workflows/how-to-keep-specs-in-sync-with-code-changes/)
- [How to trace specs to code, tests, and gaps](/how-to/work-with-specdd-skills/how-to-trace-specs-to-code-tests-and-gaps-specdd-trace/)
- [How to author and revise specs](/how-to/work-with-specdd-skills/how-to-author-and-revise-specs-specdd-author/)
- [How to link existing docs and content with SpecDD](/how-to/getting-started/how-to-link-existing-docs-and-content-with-specdd/)

## Related reference

- [Tools](/tools/)
- [Language reference](/language-reference/)
