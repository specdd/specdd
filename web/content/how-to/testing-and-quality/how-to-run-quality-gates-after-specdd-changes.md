---
title: "How to run quality gates after SpecDD changes"
seoDescription: "Run quality gates after spec-driven development changes by checking spec syntax, implementation behavior, tests, linting, type checks, docs, and review evidence."
excerpt: "Use quality gates to prove a SpecDD change is complete: lint specs, run relevant project checks, verify Done when criteria, and report skipped checks."
level: "Intermediate"
howtoID: "1131004"
weight: 50
---

This guide shows you how to run quality gates after spec-driven development changes.

Quality gates are the checks that must pass before a change is accepted. In a SpecDD workflow, those gates should cover
both sides of the contract: the `.sdd` files must be valid and the implementation must satisfy the behavior, boundaries,
tasks, and `Done when` criteria in the governing specs.

The exact commands depend on the project. SpecDD gives you the structure for deciding which checks matter.

## Short answer

After a SpecDD change, lint edited specs, run the relevant tests or checks for the behavior, run project quality checks
such as formatting, linting, type checking, docs checks, contract checks, or builds, then verify `Done when` before
marking tasks complete. If a check cannot run, report why and state what remains unverified.

## When to use this guide

Use this guide when:

- a `.sdd` file changed
- implementation changed under a spec
- task status moved to `[x]`
- `Must`, `Must not`, `Forbids`, or `Done when` changed
- a pull request needs clear verification evidence
- an agent reports work complete but does not name checks

## What belongs in project-wide check instructions

Project-wide commands such as formatter, linter, typechecker, test, build, and docs-check commands belong in
`.specdd/bootstrap.project.md`. Local specs should describe local behavior and completion criteria, not global command
conventions.

A local spec can still say what must be verified:

```sdd
Done when:
  Missing-place validation is covered by a check.
  Destination search behavior remains unchanged.
```

The project bootstrap can say which commands run those checks.

## Steps

### 1. Classify the change

Ask what changed:

- spec syntax only
- spec behavior
- implementation behavior
- tests
- public contract
- dependency boundary
- task status
- docs
- generated artifacts

The quality gate should match the risk. A typo fix does not need the same gate as a public API contract change.

### 2. Lint changed specs

Use the SpecDD CLI after editing `.sdd` files:

```sh
specdd lint path/to/spec-or-directory
```

For a single edited spec, lint that file first. If several specs changed, lint the relevant directory too.

Spec linting checks the SpecDD files. It does not prove implementation behavior.

### 3. Run behavior checks

Use the spec to choose the checks:

```sdd
Must:
  Reject itinerary items without a place name.

Scenario: missing place name
  Given the place name is empty
  When the person adds the itinerary item
  Then validation fails
  And no itinerary item is stored

Done when:
  Missing-place validation is covered by a check.
```

Run the focused test or test group that proves the scenario. If no test exists, add one or report the coverage gap.

### 4. Run boundary checks where needed

For `Must not` and `Forbids`, choose practical evidence:

```sdd
Must not:
  Save itinerary items directly from UI components.

Forbids:
  UI importing ../adapters/*
```

Possible gates:

- focused regression test
- static import-boundary check
- lint rule
- code review evidence
- architecture check

Not every negative rule needs a unit test. The gate should match the risk and the kind of constraint.

### 5. Run project quality checks

Depending on the project, this may include:

- formatter
- linter
- typechecker
- unit tests
- integration tests
- contract tests
- end-to-end tests
- docs build
- package build
- migration check
- benchmark or bundle-size check

Use the commands the project defines. Do not invent a command in the spec when the project already has a standard
bootstrap rule for checks.

### 6. Verify Done when before task status changes

If a task moves from `[ ]` to `[x]`, verify:

- implementation exists
- the specified behavior is checked
- relevant `Must not` and `Forbids` still hold
- skipped checks are explained
- the spec still matches the code

Do not mark a task complete because code was written.

### 7. Report skipped checks

When a gate cannot run, report:

- which check was skipped
- why it could not run
- what behavior remains unverified
- what evidence was available instead
- whether the task should remain open

This keeps review honest. A skipped check is not automatically a failure, but it is not the same as a passing check.

## Example gate plan

For an itinerary validation change:

```text
Spec gate:
  specdd lint src/trips/itinerary-validation.sdd

Behavior gate:
  missing-place validation test
  validation failure preserves existing itinerary items

Boundary gate:
  confirm itinerary validation does not import trip storage

Project gate:
  project lint
  focused unit test command
  typecheck if the project uses one
```

Use actual project commands in the implementation report.

## Common mistakes

- Running only `specdd lint` and treating behavior as verified.
- Running a broad test suite but not checking the spec's `Done when`.
- Marking tasks `[x]` before checks pass.
- Ignoring `Must not` and `Forbids` because happy-path tests passed.
- Putting global check commands in local specs instead of `.specdd/bootstrap.project.md`.
- Reporting "tests passed" without naming which behavior they prove.

## How to verify the result

Quality gates are working when:

- edited specs are linted
- behavior checks map to spec entries
- negative constraints have practical evidence when risk justifies it
- project-wide checks run from the project's defined commands
- task status matches verified work
- skipped checks are explicit
- reviewers can see what remains unverified

## Related how-tos

- [How to use the CLI through an agent](/how-to/work-with-specdd-skills/how-to-use-the-cli-through-an-agent-specdd-cli/)
- [How to create a SpecDD review checklist](/how-to/code-review-and-governance/how-to-create-a-specdd-review-checklist/)
- [How to define acceptance criteria for implementation](/how-to/testing-and-quality/how-to-define-acceptance-criteria-for-implementation/)
- [How to enforce and document local code style and conventions](/how-to/getting-started/how-to-enforce-and-document-local-code-style-and-conventions/)

## Related reference

- [Tools](/tools/)
- [Language reference](/language-reference/)
