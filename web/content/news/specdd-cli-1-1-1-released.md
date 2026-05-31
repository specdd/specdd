---
title: "SpecDD CLI 1.1.1 has been released"
date: 2026-05-31T12:00:00+02:00
seoDescription: "SpecDD CLI 1.1.1 improves inspect, resolve, and lint for directory targets, ordinary files, same-basename specs, and explicit directory links."
---

SpecDD CLI 1.1.1 has been released, focused on making `inspect`, `resolve`, and `lint` match the current SpecDD
resolution model more closely.

The commands can now target directories, `.sdd` files, and ordinary files. Ordinary files resolve through matching
same-basename `.sdd` specs when present, using case-insensitive matching with exact-name preference.

Directory context is clearer too. Parent-held and local directory-level specs are treated as cumulative context, and
non-glob directory links resolve only to directory-level specs. Recursive descendant inclusion now requires an explicit
glob, which prevents broad links like `./` from pulling unrelated specs into a result.

`inspect` and `lint` compact JSON output now includes resolved root and target path metadata, which should make tool and
agent integrations easier to debug.

This release also adds `--sections all` and `--section all` support for rendering every SpecDD section with `inspect`
and `resolve`.
