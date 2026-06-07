---
title: "How to structure a SpecDD project layout"
seoDescription: "Structure a spec-driven development project with bootstrap files, agent entrypoints, a root spec, directory specs, and colocated same-basename .sdd files."
excerpt: "Place SpecDD bootstrap files, agent entrypoints, the root spec, directory specs, and local same-basename specs so humans and agents can resolve context reliably."
level: "Beginner"
howtoID: "1011005"
weight: 60
---

This guide shows the current SpecDD project layout and where each setup file belongs.

SpecDD works because specs are local, inherited, and explicit. A clean layout makes it easier for humans and agents to
find the right source of truth before changing files.

## Short answer

Put generated bootstrap files in `.specdd/`, keep agent entrypoints at the selected content root, create one root spec
named after that root directory, and colocate smaller `.sdd` specs beside the files or directories they govern.

## Current layout

A minimal initialized project looks like this:

```text
travel-planner/
  AGENTS.md
  CLAUDE.md
  .specdd/
    bootstrap.md
    bootstrap.project.md
    bootstrap.local.md
    .gitignore
  travel-planner.sdd
```

As the project grows, local specs live beside the things they describe:

```text
travel-planner/
  travel-planner.sdd
  src/
    trips/
      trips.sdd
      itinerary.js
      itinerary.sdd
      trip-storage.js
      trip-storage.sdd
```

## Steps

### 1. Identify the content root

The content root is the highest directory SpecDD should govern. In most projects, it is the repository root.

Use one content root when possible. In a monorepo, choose deliberately: initialize at the monorepo root when specs should
cover shared boundaries, or initialize a package directory when the package is independently governed.

### 2. Keep framework rules in .specdd

The bootstrap directory contains the operating rules agents read before they work:

```text
.specdd/
  bootstrap.md
  bootstrap.project.md
  bootstrap.local.md
  .gitignore
```

Load order is:

```text
.specdd/bootstrap.md
-> .specdd/bootstrap.project.md
-> .specdd/bootstrap.local.md
```

Use the files this way:

- `.specdd/bootstrap.md`: official SpecDD framework behavior
- `.specdd/bootstrap.project.md`: shared project-specific conventions
- `.specdd/bootstrap.local.md`: personal or machine-specific preferences
- `.specdd/.gitignore`: ignores `bootstrap.local.md`

### 3. Keep agent entrypoints at the content root

The generated entrypoints are:

```text
AGENTS.md
CLAUDE.md
```

`AGENTS.md` is the normal entrypoint for agents. `CLAUDE.md` points Claude-style workflows to
`AGENTS.md`.

If your project already has agent instruction files, preserve useful existing content and add the SpecDD bootstrap
instruction to the appropriate place.

### 4. Name the root spec after the content root

If the content root directory is:

```text
travel-planner/
```

the root spec is:

```text
travel-planner.sdd
```

The root spec describes project-level purpose, structure, constraints, and boundaries. It should not list every file.

### 5. Use directory specs for inherited local context

A directory spec describes a project area:

```text
src/trips/trips.sdd
```

Use directory specs for rules that apply to descendants, such as:

- module responsibilities
- feature boundaries
- allowed dependencies
- shared local scenarios
- area-specific tasks

### 6. Use same-basename specs for files

When a file has a same-basename `.sdd` file beside it, that spec is the local spec for the file:

```text
src/trips/itinerary.js
src/trips/itinerary.sdd
```

This is the most useful pattern for implementation work because it makes local authority easy to find.

### 7. Use explicit references for sibling context

Parent specs are inherited automatically. Sibling specs are not.

If one local spec needs another area's context, reference it explicitly:

```sdd
References:
  ../storage/trip-storage.sdd
```

References provide context. They do not automatically grant permission to modify the referenced area.

### 8. Keep local preferences out of Git

Put personal preferences in:

```text
.specdd/bootstrap.local.md
```

The generated `.specdd/.gitignore` ignores that file:

```text
bootstrap.local.md
```

Shared conventions belong in `.specdd/bootstrap.project.md` instead.

## Common mistakes

- Naming the root spec after the product title instead of the directory basename.
- Treating sibling specs as automatically inherited.
- Putting team conventions in a local `.sdd` file instead of `.specdd/bootstrap.project.md`.
- Writing one central spec that tries to govern every implementation detail.
- Committing `.specdd/bootstrap.local.md`.

## Related how-tos

- [How to initialize SpecDD in a new project](/how-to/install-and-setup/how-to-initialize-specdd-in-a-new-project/)
- [How to add SpecDD to an existing project](/how-to/install-and-setup/how-to-add-specdd-to-an-existing-project/)
- [How to use basic SpecDD levels](/how-to/getting-started/how-to-use-basic-specdd-levels/)

## Related reference

- [Quickstart](/quickstart/)
- [Language reference](/language-reference/)
