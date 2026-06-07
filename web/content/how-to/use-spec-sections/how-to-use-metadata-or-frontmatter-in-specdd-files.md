---
title: "How to use metadata or frontmatter in SpecDD files"
seoDescription: "Understand metadata and frontmatter in SpecDD .sdd files: frontmatter is not part of the .sdd language, so use sections, comments, or project docs instead."
excerpt: "SpecDD .sdd files do not use YAML frontmatter for contract metadata; start complete specs with Spec and put real contract data in normal sections."
level: "Beginner"
howtoID: "1061021"
weight: 220
---

This guide explains how to handle metadata or frontmatter in SpecDD `.sdd` files.

SpecDD `.sdd` files are line-oriented spec files. The language does not define YAML frontmatter or a metadata block as
part of `.sdd` syntax.

## Short answer

Do not add YAML frontmatter to `.sdd` files. A complete `.sdd` file starts with `Spec`, with only blank lines or
whole-line comments allowed before it. Put real contract information in normal sections such as `Platform`, `Purpose`,
`Owns`, `Must`, `Tasks`, or `Done when`. Put project-wide conventions in `.specdd/bootstrap.project.md`.

## What not to write

Do not write:

```sdd
---
owner: trips-team
status: draft
---

Spec: Itinerary
```

The frontmatter lines are not a supported `.sdd` metadata format.

## What to write instead

Use supported sections:

```sdd
Spec: Itinerary
Platform: TypeScript/Node

Purpose:
  Keep trip itinerary items organized by day.

Owns:
  ./itinerary.ts
  ./itinerary.test.ts

Tasks:
  [?] Confirm whether duplicate places are allowed.
```

Use `.specdd/bootstrap.project.md` for project-wide conventions, such as where team ownership, CODEOWNERS, commands, or
architecture docs live.

## When comments are acceptable

Whole-line comments are supported:

```sdd
# Draft reviewed by Trips maintainers on 2026-06-05.
Spec: Itinerary
```

Comments are ignored as spec content. They do not create requirements, constraints, tasks, references, or write
authority. Use them only for non-contract notes.

If the note affects behavior or review, put it in a real section.

## Common replacements

For human owner:

```text
Use CODEOWNERS, team docs, or project process.
```

For platform:

```sdd
Platform: TypeScript/Node
```

For status:

```sdd
Tasks:
  [?] Confirm storage failure behavior.
```

For project conventions:

```text
.specdd/bootstrap.project.md
```

For external docs:

```sdd
References:
  /docs/adr/storage-boundary.md
```

## Common mistakes

- Adding YAML frontmatter to `.sdd` files.
- Using comments as hidden requirements.
- Inventing unsupported sections such as `Owner` or `Status`.
- Putting team conventions in local specs.
- Relying on metadata instead of `Tasks`, `Done when`, or reviewed project process.

## How to verify the result

The file is correct when:

- a complete spec starts with `Spec`
- no YAML frontmatter is present
- contract information lives in supported sections
- comments are non-contract notes only
- project-wide conventions live in `.specdd/bootstrap.project.md`

## Related how-tos

- [How to write comments in .sdd files](/how-to/use-spec-sections/how-to-write-comments-in-sdd-files/)
- [How to use the Platform section](/how-to/use-spec-sections/how-to-use-the-platform-section/)
- [How to assign ownership for specs](/how-to/teams-and-process/how-to-assign-ownership-for-specs/)

## Related reference

- [Language reference](/language-reference/)
