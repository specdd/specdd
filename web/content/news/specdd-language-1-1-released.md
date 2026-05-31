---
title: "SpecDD Language 1.1 has been released"
date: 2026-05-30T12:00:00+02:00
seoDescription: "SpecDD Language 1.1 adds tool guidance for target resolution, selected content root paths, malformed globs, and explicit references."
---

SpecDD Language 1.1 has been released, focused on making the formal `.sdd` language reference more useful for tools.

The language specification now explicitly includes implementation guidance for parsers, validators, indexers,
highlighters, and related tooling. That guidance covers target classification, same-basename file specs,
directory-level specs, parent-held directory specs, and how those pieces combine into directory context.

This release also tightens path and reference behavior. Paths and globs that begin with `/` now resolve from the
selected content root, malformed glob patterns are treated as valid `.sdd` text with warning-level unresolved glob
issues, and `References` are described as explicit references rather than horizontal references.

Relevance resolution guidance is also clearer: tools can distinguish followed sections from indexed sections, avoid
expanding non-glob directory links recursively, and use explicit recursive globs when broad descendant inclusion is
intended.

The full language reference is available at [/language-reference/](/language-reference/).
