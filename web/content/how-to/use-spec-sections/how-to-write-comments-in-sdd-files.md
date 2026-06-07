---
title: "How to write comments in .sdd files"
seoDescription: "Write comments in SpecDD .sdd files with whole-line # comments, and avoid using comments for requirements, tasks, constraints, or authority."
excerpt: "Use whole-line # comments sparingly in .sdd files; comments are ignored and do not create contract meaning."
level: "Beginner"
howtoID: "1061022"
weight: 230
---

This guide shows you how to write comments in SpecDD `.sdd` files.

Comments are supported, but they are ignored as spec content. That makes them useful for short non-contract notes and
dangerous for hidden requirements.

## Short answer

Use whole-line comments whose first non-whitespace character is `#`. Do not use inline trailing comments as comments.
Comments do not create requirements, constraints, tasks, references, or write authority. If the line affects behavior,
put it in `Must`, `Must not`, `Tasks`, `Scenario`, `Done when`, or another real section.

## Syntax

Valid comments:

```sdd
# root comment
  # section comment
      # deeply indented comment
```

Not an inline comment:

```sdd
Must:
  Validate input. # This is body text, not a comment.
```

Rules:

- A comment line begins with optional whitespace followed by `#`.
- Comments may appear before, between, and inside sections.
- Comments are ignored as spec content.
- Inline trailing comments are ordinary line content.

## Steps

### 1. Use comments for non-contract notes

Acceptable:

```sdd
# Temporary note: compare this spec with the storage ADR during review.
Spec: Itinerary
```

Better for durable context:

```sdd
References:
  /docs/adr/storage-boundary.md
```

### 2. Put requirements in sections

Do not write:

```sdd
# Must reject missing place names.
Spec: Itinerary
```

Write:

```sdd
Spec: Itinerary

Must:
  Reject itinerary items without a place name.
```

### 3. Put tasks in `Tasks`

Do not write:

```sdd
# Note: add missing-place validation later.
```

Write:

```sdd
Tasks:
  [ ] Add missing-place validation.
```

### 4. Avoid inline comments

This line is a `Must` body entry with `#` text inside it:

```sdd
Must:
  Reject empty place names. # required by support
```

If the note matters, rewrite the entry or use a separate whole-line comment.

## Common mistakes

- Using comments as hidden requirements.
- Writing inline trailing comments and assuming they are ignored.
- Putting work items in comments instead of `Tasks`.
- Using comments for write authority or constraints.
- Leaving old comments that contradict the spec body.

## How to verify the result

Comments are safe when:

- removing comments would not change the contract
- requirements and tasks are in real sections
- inline `#` text is not used as a comment
- comments do not contradict active spec entries
- comment volume stays low

## Related how-tos

- [How to write Tasks](/how-to/use-spec-sections/how-to-write-tasks/)
- [How to use metadata or frontmatter in SpecDD files](/how-to/use-spec-sections/how-to-use-metadata-or-frontmatter-in-specdd-files/)
- [How to write Must rules](/how-to/use-spec-sections/how-to-write-must-rules/)

## Related reference

- [Language reference](/language-reference/)
