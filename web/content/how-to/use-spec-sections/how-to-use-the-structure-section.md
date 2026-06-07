---
title: "How to use the Structure section"
seoDescription: "Use the Structure section in SpecDD to describe local files and directories at a useful level without turning specs into full inventories."
excerpt: "Use Structure for local layout and immediate child roles, with explicit paths and short descriptions; keep detailed behavior in nearer specs."
level: "Beginner"
howtoID: "1061003"
weight: 40
---

This guide shows you how to use the `Structure` section in a SpecDD `.sdd` file.

`Structure` describes files and directories in the current or descendant scope. It helps humans and agents understand
local organization without reading the whole tree.

## Short answer

Use `Structure` to name important local files, directories, or immediate child areas and give short descriptions. Use
explicit paths such as `./src`, `../shared`, or `/docs`. Do not turn `Structure` into a full file inventory or a place
for detailed child behavior.

## Syntax

Common forms:

```sdd
Structure:
  ./src: Source code
  ./tests: Test suite
  ./docs
  Generated files are not committed.
```

Rules:

- `Structure` is a mixed-entry body section.
- It may contain explicit paths, globs, key-value lines, and prose.
- It must not have inline text after `Structure:`.
- Body entries use two spaces.

## Steps

### 1. Describe the current local scope

Use `Structure` in root, directory, and module specs when layout helps review:

```sdd
Structure:
  ./src: Application source
  ./tests: Project checks
  ./docs: Developer documentation
```

For a directory spec:

```sdd
Structure:
  ./itinerary.js: Itinerary behavior
  ./trip-storage.js: Trip persistence boundary
```

### 2. Use explicit paths

Use explicit path prefixes:

- `./` relative to the current `.sdd` file directory
- `../` relative to the current `.sdd` file directory
- `/` relative to the selected content root

Good:

```sdd
Structure:
  ./src/trips: Trip planning source
```

Weak:

```sdd
Structure:
  src/trips
```

Unprefixed filenames and paths are treated as text, not explicit path references.

### 3. Keep descriptions short

Good:

```sdd
Structure:
  ./storage: Trip storage adapters
```

Too much:

```sdd
Structure:
  ./storage: This directory implements all storage behavior, handles retries, serializes every entity, and coordinates every save workflow.
```

Detailed behavior belongs in `Must`, `Handles`, `Depends on`, `Scenario`, or a nearer local spec.

### 4. Avoid full inventories

Do not list every nested file just because it exists. Use `Structure` for:

- immediate child roles
- important local folders
- non-obvious files
- generated or special directories when relevant
- areas that help readers find the right local spec

If a child file has substantial behavior, give it its own spec.

### 5. Do not use `Structure` as write authority

`Structure` helps readers understand layout. It is not the primary write boundary.

Use:

- `Owns` for owned files, concepts, or responsibilities
- `Can modify` for writable paths
- `Can read` for read-only context
- `References` for explicit related specs or docs

## Common mistakes

- Listing the entire directory tree.
- Putting child-specific behavior in a parent `Structure` entry.
- Using unprefixed paths when explicit paths were intended.
- Treating `Structure` entries as permission to edit files.
- Letting `Structure` duplicate what a nearer spec should own.

## How to verify the result

The `Structure` section is useful when:

- it helps readers orient quickly
- paths are explicit where they should be resolved
- descriptions are short
- behavior and authority live in the right sections
- child details are delegated to child specs where needed

## Related how-tos

- [How to use paths in SpecDD sections](/how-to/use-spec-sections/how-to-use-paths-in-specdd-sections/)
- [How to use globs in SpecDD](/how-to/use-spec-sections/how-to-use-globs-in-specdd/)
- [How to adopt SpecDD one folder at a time](/how-to/adopt-specdd-on-existing-projects/how-to-adopt-specdd-one-folder-at-a-time/)

## Related reference

- [Language reference](/language-reference/)
