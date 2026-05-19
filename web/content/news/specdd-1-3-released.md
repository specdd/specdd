---
title: "SpecDD 1.3 has been released"
date: 2026-05-19T13:00:00+02:00
seoDescription: "SpecDD 1.3 formalizes the .sdd language rules, making syntax, section bodies, tasks, comments, references, paths, and formatting behavior more explicit."
---

SpecDD 1.3 has been released, focused on making the `.sdd` language itself more explicit.

The previous release tightened the agent workflow around spec resolution and write authority. Version 1.3 continues in
that direction at a lower level by formalizing the language rules that specs are written in, so humans, agents,
validators, editors, and future tooling have a clearer shared understanding of what a valid SpecDD file looks like.

The release makes `.sdd` syntax more precise across section headers, section bodies, continuation lines, task markers,
comments, inline code spans, paths, glob-like path patterns, and `@` symbol references.

That matters because SpecDD is deliberately plain text, but plain text still needs stable rules if people and tools are
going to rely on it. Humans can often infer what a loosely written spec means. Tools cannot, and agents are most likely
to drift in exactly the edge cases where ambiguity is expensive.

The practical result is a better foundation for tooling. Validators can be stricter, syntax highlighting can be more
accurate, editors can eventually give better feedback, and agents can treat malformed task states, invalid indentation,
unsupported inline comments, and ambiguous body lines as concrete issues rather than soft prose problems.

A full language reference is now available at [/language-reference/](/language-reference/). It describes the `.sdd` file
format, line model, indentation rules, comments, sections, task states, scenarios, examples, path syntax, basename
matching, and implementation guidance for parsers and validators.
