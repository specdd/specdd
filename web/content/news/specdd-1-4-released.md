---
title: "SpecDD 1.4 has been released"
date: 2026-05-31T12:00:00+02:00
seoDescription: "SpecDD 1.4 strengthens spec scope, directory resolution, root spec naming, references, syntax guidance, and tool context discovery."
---

SpecDD 1.4 has been released, focused on making specs more durable, local, and easier for agents and tools to resolve.

The release adds stronger guidance that specs should describe stable subjects and outcomes rather than tickets, prompts,
migration notes, or adoption plans. It also tightens negative requirements, encouraging `Must not` rules that prevent
real local boundary mistakes rather than broad lists of unrelated non-goals.

Directory and root-spec behavior are now more explicit. Directory specs describe local structure and immediate child
roles, substantial child behavior belongs in nearer same-basename specs, and the root `.sdd` file must live at the
selected content root with a name matching that root directory.

Spec resolution also gets clearer with directory-level rules for parent-held and local directory specs,
case-insensitive basename matching, ambiguity handling, and more precise reference language. `References` remain read
context only; they do not grant write authority.

The bootstrap now includes more agent-facing syntax guidance and tool context discovery rules, including exact path
resolution, directory links, recursive glob expansion, deduplication, and reasons for including context.

The framework changelog is available at [/changelog/](/changelog/).
