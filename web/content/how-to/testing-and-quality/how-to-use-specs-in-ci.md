---
title: "How to use specs in CI"
seoDescription: "Use SpecDD specs in CI for spec-driven development by linting changed specs, running relevant project checks, protecting boundaries, and reporting spec-driven verification evidence."
excerpt: "Add SpecDD-aware CI checks that validate specs, run behavior and quality gates, protect negative constraints, and keep task completion honest."
level: "Intermediate"
howtoID: "1131005"
weight: 60
---

This guide shows you how to use SpecDD specs in continuous integration for a spec-driven development workflow.

CI should not make SpecDD heavy. Its job is to catch the problems that are cheap and reliable to catch automatically:
invalid spec syntax, missing project checks, failing tests, broken contracts, dependency-boundary violations, and stale
task completion evidence.

SpecDD adds useful context to CI because specs say what behavior and boundaries matter. CI can then run general project
checks plus targeted checks for the changed area.

## Short answer

Add CI steps that lint `.sdd` files, run the project's standard quality checks, run behavior tests related to changed
specs, and protect boundary rules where practical. Use CI as evidence for `Done when`, but do not treat CI as a full
replacement for spec review. Some constraints still require human review.

## When to use this guide

Use this guide when:

- `.sdd` files are edited in pull requests
- task status is updated before checks run
- specs describe behavior but CI only runs generic tests
- dependency boundaries should be enforced automatically
- agents submit changes without enough verification evidence
- reviewers want CI to highlight spec-driven quality gates

## What CI can enforce well

CI is strong at:

- `specdd lint`
- formatting
- linting
- type checking
- focused unit and integration tests
- contract tests
- docs builds
- import-boundary rules
- static dependency checks
- generated artifact checks
- package builds

CI is weaker at:

- deciding whether a spec describes intended behavior
- judging whether a `Must not` rule is the right boundary
- reviewing ownership changes
- evaluating ambiguous product decisions
- confirming whether manual evidence is acceptable

Keep human review in the loop for those.

## Steps

### 1. Decide what CI should enforce

Start with a practical policy:

- all edited `.sdd` files must lint
- standard project checks must pass
- changed behavior must have relevant tests
- public contracts need contract checks
- boundary rules should use static checks when practical
- skipped checks must be reported in the pull request

Document project-wide commands in `.specdd/bootstrap.project.md` so humans and agents know the same check expectations.

### 2. Lint specs

Add a CI step for SpecDD linting:

```sh
specdd lint
```

For larger repositories, you may also lint changed paths or affected directories in faster jobs. A full spec lint is a
good baseline when it is cheap enough.

### 3. Run project checks

Use the commands your project already trusts:

```sh
npm run lint
npm test
npm run typecheck
```

These are examples. Use the real commands for your project, and keep that command policy in `.specdd/bootstrap.project.md`
when it is a shared team convention.

### 4. Run targeted behavior checks

When a spec changes, ask what behavior it governs:

```sdd
Done when:
  Missing-place validation is covered by a check.
```

CI should run the test that proves that behavior. This can be:

- a focused test job for the changed package
- a test selection rule based on changed files
- a contract test suite for API specs
- an end-to-end smoke test for user-visible workflows

Start simple. You do not need perfect test selection to get value.

### 5. Protect boundary rules where practical

For rules such as:

```sdd
Forbids:
  UI importing ../adapters/*
```

CI may use:

- import-boundary linting
- dependency graph checks
- architecture tests
- package dependency checks

For behavior-level `Must not` rules, CI may use focused regression tests. For judgment-heavy boundaries, use review
checklists instead of pretending automation can decide everything.

### 6. Treat Done when as merge evidence

If a pull request marks a task `[x]`, CI should help prove that `Done when` is satisfied.

Example pull request evidence:

```text
Spec lint: passed
Validation tests: passed
Typecheck: passed
Boundary check: UI does not import adapters
Skipped: full end-to-end suite, not required for this local validation change
```

The report should say what passed and what remains unverified.

### 7. Keep CI fast enough to use

Use layers:

- fast spec lint and focused tests on every pull request
- broader package or integration checks on relevant changes
- full end-to-end or expensive checks on riskier changes or scheduled runs

Heavy CI that everyone tries to bypass is not a quality gate. It is a queue.

## Example CI shape

```yaml
name: specdd-quality

on:
  pull_request:

jobs:
  checks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: specdd lint
      - run: npm run lint
      - run: npm test
```

This is only a shape. Replace the commands with the commands your project actually uses.

For a larger project, split jobs:

```yaml
jobs:
  specs:
    steps:
      - run: specdd lint

  unit-tests:
    steps:
      - run: npm test

  contracts:
    steps:
      - run: npm run test:contracts
```

Use job names that make failures easy to interpret.

## Common mistakes

- Running project tests but never linting `.sdd` files.
- Treating CI as proof that a spec change is semantically correct.
- Making every pull request run the most expensive suite.
- Letting `[x]` task changes merge without evidence for `Done when`.
- Adding import-boundary rules to specs but not enforcing or reviewing them.
- Hard-coding outdated commands in CI while bootstrap project instructions say something else.

## How to verify the result

Specs are useful in CI when:

- `.sdd` files are linted
- standard project checks run consistently
- changed behavior has relevant executable evidence
- boundary rules are automated where practical
- expensive checks are reserved for appropriate risk
- CI output helps reviewers evaluate `Done when`
- skipped or manual checks are explicit

## Related how-tos

- [How to run quality gates after SpecDD changes](/how-to/testing-and-quality/how-to-run-quality-gates-after-specdd-changes/)
- [How to use the CLI through an agent](/how-to/work-with-specdd-skills/how-to-use-the-cli-through-an-agent-specdd-cli/)
- [How to create a SpecDD review checklist](/how-to/code-review-and-governance/how-to-create-a-specdd-review-checklist/)
- [How to configure team rules in bootstrap.project.md](/how-to/spec-driven-workflows/how-to-configure-team-rules-in-bootstrap-project-md/)

## Related reference

- [Tools](/tools/)
- [Language reference](/language-reference/)
