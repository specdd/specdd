---
title: "How to configure personal preferences in bootstrap.local.md"
seoDescription: "Configure personal spec-driven development preferences in .specdd/bootstrap.local.md without weakening shared project rules, committing local settings, or changing spec authority."
excerpt: "Use .specdd/bootstrap.local.md for local operator or machine preferences while keeping shared team rules in bootstrap.project.md and durable behavior in .sdd specs."
level: "Beginner"
howtoID: "1081006"
weight: 70
---

This guide shows you how to use `.specdd/bootstrap.local.md` for personal or machine-specific spec-driven development preferences without
changing the shared project contract.

The local bootstrap file is useful because not every working preference belongs in Git. It is also risky if it starts
overriding team rules, product behavior, or write authority. Keep it local, narrow, and non-authoritative over shared
contracts.

## Short answer

Put personal and machine-specific preferences in `.specdd/bootstrap.local.md`. Use it for local workflow notes, local
tool paths, or personal reporting preferences. Do not use it for team conventions, durable product behavior, security
exceptions, or broader edit authority. Keep it out of shared commits.

## When to use this guide

Use this guide when:

- you want local agent preferences without changing team rules
- your machine has a different command path or environment note
- you prefer a local reporting style from agents
- a generated SpecDD setup created `.specdd/bootstrap.local.md`
- you need to check that local preferences are not leaking into Git

## Background

The bootstrap load order is:

```text
.specdd/bootstrap.md
-> .specdd/bootstrap.project.md
-> .specdd/bootstrap.local.md
```

Later files may add local context or narrow behavior, but they must not silently weaken project contracts, inherited
constraints, or write authority. That rule matters most for `bootstrap.local.md` because it is personal to one operator
or environment.

## Steps

### 1. Check that bootstrap.local.md is local

The file path is:

```text
.specdd/bootstrap.local.md
```

SpecDD setups normally ignore this file so local preferences stay local. Confirm your repository ignores it:

```text
.specdd/.gitignore
```

should include:

```gitignore
bootstrap.local.md
```

If the file is already tracked, remove it from the shared commit process before adding personal preferences.

### 2. Add only personal preferences

Good local entries are about your machine or your interaction style:

```md
# Local Preferences

## Reporting

- When reporting completed work, include changed files and checks run.
- If a check is skipped, explain the local reason.

## Local Environment

- Prefer local test output paths under `/tmp/specdd-checks`.
- My local preview command uses port 1314 when 1313 is occupied.
```

These preferences affect how work is reported or run locally. They do not redefine product behavior.

### 3. Avoid weakening project rules

Do not write local overrides like:

```md
- Ignore failing tests when the change looks correct.
- You may edit files outside `Can modify` if needed.
- Skip security review for local changes.
```

Those weaken shared contracts and should not be in a local bootstrap file. If a shared rule is wrong, change the shared
rule through project review. If a spec boundary is wrong, update the owning `.sdd` spec through the normal spec-driven
workflow.

### 4. Keep shared conventions elsewhere

Team conventions belong in:

```text
.specdd/bootstrap.project.md
```

Durable behavior belongs in local `.sdd` specs:

```text
src/trips/itinerary.sdd
```

Use `bootstrap.local.md` only for local preferences. If another contributor should follow the rule too, it is probably
not local.

### 5. Verify the file is not committed

Before committing, check status:

```sh
git status --short
```

You should not see `.specdd/bootstrap.local.md` staged for commit. If your team intentionally tracks a local bootstrap
template, keep personal machine details out of it and use a separate ignored file for actual local preferences.

## Example

Good:

```md
# SpecDD user-local overrides

## Local shell

- Use `pnpm test -- --runInBand` when local parallel tests are unstable on this machine.

## Reporting

- Include the exact command used for local verification.
```

Bad:

```md
# SpecDD user-local overrides

- Ignore the billing spec during local work.
- Agents may modify sibling modules when convenient.
- Treat destination search references as writable.
```

The bad example changes authority and weakens shared constraints. That is not a personal preference.

## Common mistakes

- Committing `.specdd/bootstrap.local.md` with machine-specific paths.
- Putting team-wide command conventions in the local bootstrap file.
- Using local preferences to bypass failing checks.
- Granting broader write authority locally than the governing `.sdd` spec allows.
- Recording feature decisions in the local bootstrap file instead of the owning spec.

## How to verify the result

Your local bootstrap is configured correctly when:

- `.specdd/bootstrap.local.md` contains only personal or machine-specific preferences
- shared conventions remain in `.specdd/bootstrap.project.md`
- local specs still define product behavior and write authority
- the local bootstrap does not weaken inherited constraints
- the file is not staged or committed with personal content

## Related how-tos

- [How to configure team rules in bootstrap.project.md](/how-to/spec-driven-workflows/how-to-configure-team-rules-in-bootstrap-project-md/)
- [How to verify your SpecDD setup is correct](/how-to/install-and-setup/how-to-verify-your-specdd-setup-is-correct/)
- [How to switch your SpecDD setup to a different agent without losing context](/how-to/set-up-your-agent/how-to-switch-your-specdd-setup-to-a-different-agent-without-losing-context/)
- [How to structure a SpecDD project layout](/how-to/install-and-setup/how-to-structure-a-specdd-project-layout/)

## Related reference

- [Quickstart](/quickstart/)
- [Tools](/tools/)
