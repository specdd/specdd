---
title: "How to write a repository spec"
seoDescription: "Write a SpecDD repository spec for spec-driven development with monorepo or repository content-root structure, shared boundaries, package roles, and global constraints."
excerpt: "Use repository specs for repository-level architecture and boundaries, while keeping commands and conventions in bootstrap.project.md."
level: "Advanced"
howtoID: "1051013"
weight: 140
---

This guide shows you how to write a SpecDD repository spec for a spec-driven development workflow.

A repository spec is usually the root spec for a repository or monorepo content root. It describes repository-level
architecture and boundaries above apps, packages, services, or documentation trees.

## Short answer

If the repository is the selected content root, write the repository spec as the root spec named after the repository
directory. Use it for top-level purpose, structure, shared architecture boundaries, package or app roles, and broad
constraints. Put build commands, naming conventions, syntax rules, and team process in `.specdd/bootstrap.project.md`.

## When to use this guide

Use this guide when:

- a monorepo has apps and packages that need shared context
- repository-level boundaries are repeatedly missed
- packages should not depend on apps
- shared docs or automation need top-level context
- teams are unsure how repository specs differ from package specs

## Steps

### 1. Identify the content root

For a repository named:

```text
travel-platform/
```

the root repository spec is:

```text
travel-platform.sdd
```

When packages or apps are configured as independent SpecDD projects, they may have their own root specs. Otherwise, the
repository root spec provides inherited context for the hierarchy.

### 2. Describe repository purpose

```sdd
Spec: Travel Platform

Purpose:
  Host travel planning applications, shared packages, and repository-level automation.
```

Keep it repository-level.

### 3. Describe top-level structure

```sdd
Structure:
  ./apps: Deployable applications
  ./packages: Shared packages
  ./docs: Repository documentation
  ./tools: Repository automation
```

This helps humans and agents find the right local specs.

### 4. Define broad architecture boundaries

```sdd
Must:
  Shared packages remain reusable by apps.
  Apps own product-specific wiring.

Must not:
  Shared packages depend on app UI code.
  Repository automation change application behavior directly.

Forbids:
  ./packages/* importing ./apps/*
```

Use top-level rules only when they should apply broadly.

### 5. Keep conventions in bootstrap.project.md

Do not put these in the repository spec:

- command names
- lint rules
- formatting rules
- naming conventions
- review process
- team ownership process

Put them in:

```text
.specdd/bootstrap.project.md
```

The repository spec is for durable repository architecture and behavior, not project instruction boilerplate.

### 6. Delegate local behavior

Use child specs for:

- app root behavior
- package public surfaces
- service orchestration
- API contracts
- job behavior
- documentation sections

Do not put every package's local behavior in the repository spec.

## Complete example

```sdd
Spec: Travel Platform

Purpose:
  Host travel planning applications, shared packages, and repository-level automation.

Structure:
  ./apps: Deployable applications
  ./packages: Shared packages
  ./docs: Repository documentation
  ./tools: Repository automation

Must:
  Shared packages remain reusable by apps.
  Apps own product-specific wiring.
  Repository-level automation stays separate from application behavior.

Must not:
  Shared packages depend on app UI code.
  Repository automation change application behavior directly.

Forbids:
  ./packages/* importing ./apps/*
```

## Common mistakes

- Confusing the repository spec with `.specdd/bootstrap.project.md`.
- Putting build commands and naming conventions in the spec.
- Describing every package's behavior in the root repository spec.
- Assuming each package is an independent root without configuration.
- Using repository-level `Owns` to grant broad write access across the monorepo.

## How to verify the result

The repository spec is useful when:

- it is named after the selected content root
- it explains top-level structure
- broad boundaries apply across children
- package and app details are delegated
- project conventions live in `.specdd/bootstrap.project.md`
- child specs can inherit useful context

## Related how-tos

- [How to write a root project spec](/how-to/write-specs-by-level/how-to-write-a-root-project-spec/)
- [How to write a package spec](/how-to/write-specs-by-level/how-to-write-a-package-spec/)
- [How to structure a SpecDD project layout](/how-to/install-and-setup/how-to-structure-a-specdd-project-layout/)
- [How to configure team rules in bootstrap.project.md](/how-to/spec-driven-workflows/how-to-configure-team-rules-in-bootstrap-project-md/)

## Related reference

- [Language reference](/language-reference/)
