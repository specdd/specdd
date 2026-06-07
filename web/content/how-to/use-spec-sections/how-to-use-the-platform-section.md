---
title: "How to use the Platform section"
seoDescription: "Use the Platform section in SpecDD when language, runtime, framework, or environment context materially affects implementation or review."
excerpt: "Use Platform sparingly for useful technical context such as JavaScript/ES6 or Python/Django/5.2; keep detailed conventions in bootstrap.project.md."
level: "Beginner"
howtoID: "1061001"
weight: 20
---

This guide shows you how to use the `Platform` section in a SpecDD `.sdd` file.

`Platform` describes implementation language, runtime, framework, tool stack, or environment when that information helps
people and agents interpret the local contract.

## Short answer

Use `Platform` only when platform context changes how the spec should be implemented or reviewed. Write it as a single
inline value, usually with concise slash-separated labels such as `Platform: TypeScript/Node/Express`. Do not use
`Platform` for project-wide commands, naming rules, or team conventions.

## Syntax

Valid:

```sdd
Spec: Itinerary Service
Platform: TypeScript/Node/Express
```

Invalid:

```sdd
Platform:
  TypeScript
```

Rules:

- `Platform` is optional.
- When present, it must have a nonempty inline value.
- It must not have body lines.
- It may appear after `Spec`.
- The inline value should be concise.

## Steps

### 1. Use it when platform affects work

Good uses:

```sdd
Platform: JavaScript/ES6
```

```sdd
Platform: Python/Django/5.2
```

```sdd
Platform: TypeScript/Node/Express
```

This is useful when the spec governs an area where language, framework, runtime, or environment matters.

### 2. Omit it when it adds no local value

You do not need `Platform` in every file. If the project is already obviously one stack and the local spec does not need
additional context, omit it.

SpecDD specs should include only sections that add useful local information.

### 3. Keep detailed conventions out of `Platform`

Do not use `Platform` for:

- test commands
- formatting rules
- naming conventions
- preferred libraries
- team workflow rules
- local shell or editor preferences

Put shared project-wide conventions in `.specdd/bootstrap.project.md`. Put personal working preferences in
`.specdd/bootstrap.local.md`.

### 4. Avoid over-specific labels

Too noisy:

```sdd
Platform: TypeScript/Node/Express/Jest/ESLint/Prettier/PostgreSQL/Docker/Linux
```

Better:

```sdd
Platform: TypeScript/Node/Express
```

If a database, tool, or runtime matters as a dependency or boundary, use sections such as `Depends on`, `Forbids`,
`Accepts`, `Returns`, or `Handles` instead.

## Common mistakes

- Adding `Platform` to every spec by default.
- Putting body lines under `Platform`.
- Using `Platform` for project conventions that belong in `.specdd/bootstrap.project.md`.
- Treating `Platform` as dependency permission. Use `Depends on` for allowed collaborators and dependencies.
- Hiding important runtime constraints in a long slash-separated label.

## How to verify the result

The `Platform` section is useful when:

- it has one inline value
- the value helps implementation or review
- detailed rules live in the right sections or bootstrap file
- removing it would lose meaningful local context

## Related how-tos

- [How to use the Depends on section](/how-to/use-spec-sections/how-to-use-the-depends-on-section/)
- [How to use the Forbids section](/how-to/use-spec-sections/how-to-use-the-forbids-section/)
- [How to configure team rules in bootstrap.project.md](/how-to/spec-driven-workflows/how-to-configure-team-rules-in-bootstrap-project-md/)

## Related reference

- [Language reference](/language-reference/)
