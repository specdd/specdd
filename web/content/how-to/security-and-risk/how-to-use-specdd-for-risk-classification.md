---
title: "How to use SpecDD for risk classification"
seoDescription: "Use spec-driven development for change risk classification by checking authority, constraints, security surfaces, data impact, dependencies, verification, and review needs."
excerpt: "Classify SpecDD work as low, medium, or high risk before editing so risky changes get the right planning, checks, and review."
level: "Intermediate"
howtoID: "1161006"
weight: 70
---

This guide shows you how to use spec-driven development for risk classification.

Risk classification helps teams decide whether a change can proceed directly, needs a plan, needs a spec update, needs
security review, or should stop until a human decision is made. SpecDD makes the classification concrete because the
reviewer can inspect write authority, inherited constraints, forbidden dependencies, scenarios, and completion criteria.

## Short answer

Classify risk before implementation. Check the governing specs, `Can modify` or `Owns`, inherited `Must not` and
`Forbids`, public contracts, security surfaces, data impact, dependency changes, and verification. Label the change low,
medium, or high risk with concrete reasons and the smallest safe next step.

## When to use this guide

Use this guide when a change:

- touches authentication, authorization, privacy, secrets, payments, audit logs, or rate limiting
- changes public APIs, persistent data, migrations, or destructive behavior
- crosses spec boundaries or ownership areas
- requires a forbidden dependency to be changed
- has missing tests for important scenarios
- depends on live credentials, external systems, or time-sensitive behavior
- is being handed to an agent and the safe scope is unclear

## Steps

### 1. Classify before implementation

Risk classification should happen before files are edited.

Prompt:

```text
Classify risk for the account deletion task.
```

Do not combine this with implementation. The point is to identify stop conditions while the repository is still
unchanged.

### 2. Check authority and constraints

Inspect:

- the governing parent specs
- the nearest local spec
- `Can modify` or `Owns`
- `Can read` and `References`
- inherited `Must not`
- inherited `Forbids`
- local `Tasks` and `Done when`

Unclear write authority raises risk. A task that violates `Must not` or `Forbids` is not low risk just because the code
change looks small.

### 3. Identify risk factors

Use this list as a starting point:

- auth or permission behavior
- secrets or credentials
- private data read, write, export, deletion, or logging
- payment or billing state
- audit logging or compliance evidence
- public API, event, command, or data contract
- persistent schema, migration, or data backfill
- destructive or irreversible operation
- dependency direction or new package
- release, deployment, or CI gate
- missing tests for a specified scenario
- ambiguous requirement from the prompt or task

The classification should name the specific factors that apply.

### 4. Assign a risk level with reasons

Use a simple rubric unless your team already has one.

Low risk:

- clear local spec authority
- changed files stay inside `Can modify` or `Owns`
- no security, data, public contract, migration, or destructive behavior
- relevant tests or checks already exist
- no `Must not` or `Forbids` changes

Medium risk:

- multiple files or related specs are involved
- behavior changes but authority is clear
- tests need to be added or updated
- dependency direction needs review
- user-visible behavior changes without sensitive data or destructive impact

High risk:

- authentication, authorization, secrets, privacy, payments, audit logs, or rate limits change
- destructive or irreversible state is involved
- public contracts, persistent data, or migrations change
- write authority is unclear
- the task conflicts with `Must not` or `Forbids`
- required evidence is missing or expensive

Example report:

```text
Risk: high.

Reasons:
- The task changes account deletion behavior.
- The local spec requires audit logging and retention checks.
- The requested shortcut would bypass the deletion policy owner.

Smallest safe next step:
Update the account deletion spec and request security review before implementation.
```

### 5. Choose the next workflow

Risk classification should end with a next step.

Possible next steps:

- implement directly for low-risk, well-specified work
- plan first for medium-risk work
- update the spec before implementation when requirements are unclear
- add tests first when verification is the main gap
- request security review for high-risk behavior
- stop when the task conflicts with `Must not` or `Forbids`

The next step should reduce risk, not just continue momentum.

### 6. Record required evidence

For medium and high risk, name the evidence needed before completion.

```sdd
Done when:
  Account deletion requires authenticated owner approval.
  Deleted account data is excluded from future exports.
  Deletion audit event includes account id and actor id without private payload data.
  Existing account export and retention checks pass.
```

Evidence may include focused tests, static checks, migration dry runs, manual review, audit inspection, or CI gates.

### 7. Put team-wide risk rules in bootstrap.project.md

If your team uses a shared risk rubric, keep the project-wide convention in `.specdd/bootstrap.project.md`.

Good bootstrap rule:

```md
## Risk Classification

- Treat auth, authorization, secrets, privacy, payments, audit logs, migrations, and public API changes as high risk
  unless the governing spec says otherwise and the security owner agrees.
- Do not implement high-risk work until the governing spec names required verification.
```

Local behavior still belongs in local `.sdd` specs. The bootstrap file describes the shared workflow.

## Common mistakes

- Classifying risk after implementation is already done.
- Calling a change low risk because the diff is small while it touches auth or data deletion.
- Ignoring inherited `Must not` and `Forbids`.
- Producing a risk label without reasons or a next step.
- Treating risk assessment as approval to edit.
- Putting local high-risk behavior only in the team bootstrap file.

## How to verify the result

Risk classification worked when:

- no implementation files changed during classification
- authority and inherited constraints were checked
- the risk label includes concrete reasons
- security, data, dependency, and verification factors were considered
- the next step is explicit
- high-risk work has named review and evidence requirements

## Related how-tos

- [How to assess change risk (specdd-risk)](/how-to/work-with-specdd-skills/how-to-assess-change-risk-specdd-risk/)
- [How to ask an agent to plan before coding](/how-to/agent-workflows/how-to-ask-an-agent-to-plan-before-coding/)
- [How to create a SpecDD review checklist](/how-to/code-review-and-governance/how-to-create-a-specdd-review-checklist/)
- [How to review security-sensitive changes with SpecDD](/how-to/security-and-risk/how-to-review-security-sensitive-changes-with-specdd/)

## Related reference

- [Tools](/tools/)
- [Language reference](/language-reference/)
