---
title: "How to link existing docs and content with SpecDD"
seoDescription: "Link existing docs, ADRs, runbooks, product notes, and content folders with spec-driven development by mapping them in bootstrap.project.md and referencing local context from .sdd specs."
excerpt: "Connect existing project docs and content to SpecDD without copying them into specs by mapping shared locations in bootstrap.project.md and using explicit local spec references."
level: "Beginner"
howtoID: "1001009"
weight: 100
---

Many projects already have useful docs: architecture notes, ADRs, product briefs, runbooks, API docs, support content,
or a documentation tree. You do not need to copy all of that into `.sdd` files to use SpecDD.

This guide shows how to link existing docs and content into a SpecDD setup so humans and agents can find the
right context before changing the project.

## Short answer

Put project-wide documentation locations in `.specdd/bootstrap.project.md`. Use local `.sdd` specs for operational
contracts: what the area owns, what must stay true, what is out of scope, and which existing docs can be read for
context. Use explicit paths in `Structure`, `Can read`, or `References` when a local spec depends on nearby docs or
content.

## When to use this guide

Use this guide when:

- your project already has useful docs you do not want to duplicate
- an agent needs to know where architecture notes, ADRs, runbooks, or product docs live
- a local spec should point to existing content for context
- you are adopting SpecDD gradually in a documentation-heavy project

## Steps

### 1. Inventory the docs worth linking

Start with the docs that affect implementation or review.

Examples:

```text
docs/architecture/
docs/adr/
docs/runbooks/
content/help/
api/openapi.yaml
README.md
```

Do not link every file just because it exists. Link the material that helps agents and reviewers make better local
decisions.

### 2. Map shared doc locations in bootstrap.project.md

Add project-wide documentation guidance to:

```text
.specdd/bootstrap.project.md
```

Example:

```md
# Project documentation

Use these existing docs as shared project context when they are relevant to the task:

- `./docs/architecture/`: architecture notes and dependency direction
- `./docs/adr/`: accepted architecture decisions
- `./docs/runbooks/`: operational behavior and incident response notes
- `./api/openapi.yaml`: public HTTP API contract
- `./content/help/`: user-facing help content

Do not treat these docs as write authority. For implementation work, resolve the governing `.sdd` spec chain and use
the nearest local spec's `Can modify` or `Owns` section for edit authority.
```

This is the best first link because `.specdd/bootstrap.project.md` is shared setup context. It tells agents where to
look without forcing every local spec to repeat the same documentation map.

{{< protip title="Setup tip" >}}
Use `.specdd/bootstrap.project.md` for team-wide documentation locations. Use `.specdd/bootstrap.local.md` only for
personal or machine-specific notes.
{{< /protip >}}

### 3. Keep specs as operational contracts

Specs are not ordinary documentation. Existing docs may explain background, history, rationale, or user-facing details.
Specs should define the contract that must guide work.

Good local spec content:

- what the area owns
- what it may modify
- what required behavior must hold
- what it must not do
- what existing docs are relevant context
- what done means for a change

Avoid copying long docs into a spec. Link them instead, then summarize only the rule that must be operational during
implementation.

### 4. Use Structure for local docs and content

Use `Structure` when docs or content belong to the current area or descendants.

Example:

```sdd
Spec: Help Content

Purpose:
  Keep user-facing help pages accurate and task-focused.

Structure:
  ./billing/: Billing help pages
  ./account/: Account management help pages
  ./style-guide.md: Help content style rules

Must:
  Help pages describe current product behavior.
  Setup steps are written as concrete user actions.

Must not:
  Document unreleased behavior as available.
```

`Structure` helps humans and agents understand local organization without reading the whole tree.

### 5. Use Can read for context without edit permission

Use `Can read` when a spec may read existing docs or content for context, but should not modify those files under this
spec.

Example:

```sdd
Spec: Billing Settings

Purpose:
  Let account admins review and update billing settings.

Owns:
  ./billing-settings.ts
  ./billing-settings.test.ts

Can read:
  /docs/adr/billing-provider.md
  /content/help/billing/

Must:
  Billing settings reflect the current billing provider rules.

Must not:
  Edit help content from this implementation spec.
```

`Can read` is context. It does not grant write permission.

### 6. Use References for explicit related docs or specs

Use `References` when the relationship is explicit and important for understanding the local contract.

Example:

```sdd
Spec: Password Reset

Purpose:
  Let users request a secure password reset email.

Owns:
  ./password-reset.ts
  ./password-reset.test.ts

References:
  /docs/adr/authentication-boundaries.md
  ../email/email-delivery.sdd

Must:
  Password reset emails are sent through the approved email delivery boundary.

Must not:
  Bypass authentication boundary decisions recorded in the ADR.
```

Use `References` for context outside the inherited spec chain. References do not create inherited authority or
permission to edit the referenced area.

### 7. Ask an agent to use the linked context

Keep the prompt focused on one action:

```text
Explain how the Billing Settings spec uses the billing docs.
```

For implementation:

```text
Implement the open billing settings task.
```

The project bootstrap and local specs should tell the agent where existing docs live and which docs matter for the
target.

### 8. Verify the links

Run:

```bash
specdd inspect .
specdd lint
```

For one target that should see linked context, run:

```bash
specdd resolve path/to/target-file
```

Check:

- shared doc locations are described in `.specdd/bootstrap.project.md`
- local specs use explicit paths such as `./`, `../`, or `/`
- docs used only for context appear in `Can read` or `References`, not `Can modify`
- the nearest local spec still controls write authority
- no stale doc is treated as stronger than the current spec

## Common mistakes

- Copying whole architecture docs into `.sdd` files.
- Linking every old document instead of the useful ones.
- Treating `Can read` or `References` as permission to edit linked docs.
- Putting team-wide doc maps in `.specdd/bootstrap.local.md`.
- Letting stale docs override the governing spec instead of updating the spec or the doc.
- Assuming sibling docs or sibling specs apply automatically without an explicit link.

## Related how-tos

- [How to use SpecDD in 10 minutes](/how-to/getting-started/how-to-use-specdd-in-10-minutes/)
- [How to use basic SpecDD levels](/how-to/getting-started/how-to-use-basic-specdd-levels/)
- [How to write your first .sdd spec](/how-to/getting-started/how-to-write-your-first-sdd-spec/)

## Related reference

- [Quickstart](/quickstart/)
- [Language reference](/language-reference/)
