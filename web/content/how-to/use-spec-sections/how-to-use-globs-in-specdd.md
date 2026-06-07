---
title: "How to use globs in SpecDD"
seoDescription: "Use globs in SpecDD with explicit ./, ../, or / prefixes, supported wildcard syntax, and careful review of recursive or broad matches."
excerpt: "Use SpecDD globs when a section needs a deliberate file set, but keep authority and recursive expansion narrow enough to review."
level: "Intermediate"
howtoID: "1061024"
weight: 250
---

This guide shows you how to use globs in SpecDD `.sdd` files.

Globs are path candidates that contain wildcard metacharacters. They are useful when a spec needs to describe a
deliberate set of files, but broad globs can also make authority harder to review.

## Short answer

Use globs with explicit path prefixes: `./`, `../`, or `/`. Keep patterns narrow, especially in `Can modify`, `Owns`,
and `Forbids`. Use recursive `**` only when recursive coverage is intentional. Malformed glob patterns are treated as
warning-level unresolved glob issues, not syntax errors.

## Supported glob constructs

Glob metacharacters:

```text
*
?
[
]
{
}
```

Supported constructs:

```text
*       zero or more characters within one path segment
?       exactly one character within one path segment
[abc]   character class
{a,b}   alternatives
**      zero or more characters across directory boundaries
**/     zero or more directories
```

Examples:

```sdd
Can modify:
  ./fixtures/*.json

Can read:
  ../policies/**/*.sdd

Forbids:
  ../booking/*
```

## Steps

### 1. Start with an explicit path prefix

Good:

```sdd
Structure:
  ./src/**/*.ts
```

Weak:

```sdd
Structure:
  src/**/*.ts
```

Unprefixed entries are text, not explicit path candidates.

### 2. Keep writable globs narrow

Acceptable when intentional:

```sdd
Can modify:
  ./fixtures/*.json
```

Risky:

```sdd
Can modify:
  ./**/*
```

Broad writable globs can authorize too much. Prefer exact files when the set is small.

### 3. Use recursive globs deliberately

A non-glob directory reference such as:

```sdd
References:
  ../policies
```

should not recursively include every descendant spec. If recursive inclusion is intended, use an explicit glob:

```sdd
References:
  ../policies/**/*.sdd
```

### 4. Match the section intent

Use globs by meaning:

- `Structure` for layout
- `Owns` for owned file sets
- `Can modify` for writable file sets
- `Can read` for readable context sets
- `References` for related spec or doc sets
- `Forbids` for blocked file sets

A glob in `Can read` is not writable authority. A glob in `Forbids` blocks matching paths.

### 5. Review glob changes carefully

Changing:

```sdd
Can modify:
  ./fixtures/*.json
```

to:

```sdd
Can modify:
  ./**/*.json
```

may expand write authority substantially. Treat broadening changes as review-worthy.

## Common mistakes

- Using globs without `./`, `../`, or `/`.
- Using recursive `**` when a shallow pattern would be enough.
- Adding broad writable globs to avoid naming files.
- Assuming malformed globs are hard syntax errors.
- Treating a directory link as a recursive glob.
- Forgetting that glob meaning depends on the section.

## How to verify the result

Glob usage is safe when:

- each pattern has an explicit prefix
- each broad or recursive match is intentional
- writable globs are narrow enough to review
- forbidden globs match the intended blocked paths
- reviewers can tell which files are likely covered

## Related how-tos

- [How to use paths in SpecDD sections](/how-to/use-spec-sections/how-to-use-paths-in-specdd-sections/)
- [How to use the Can modify section](/how-to/use-spec-sections/how-to-use-the-can-modify-section/)
- [How to use the Forbids section](/how-to/use-spec-sections/how-to-use-the-forbids-section/)

## Related reference

- [Language reference](/language-reference/)
