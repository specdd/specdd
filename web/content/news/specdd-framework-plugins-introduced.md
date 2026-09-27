---
title: "SpecDD introduces a plugin system and two official plugins"
date: 2026-09-27T14:08:40+02:00
seoDescription: "SpecDD 1.6 introduces a framework plugin system with two official plugins: Domain & Solution Design and SpecDD Style Guide."
---

SpecDD 1.6 introduces a framework plugin system for extending a project's document types, design practices, and
workflows. Plugins are reusable Markdown instruction files that agents load through the SpecDD bootstrap.

Plugins can come from SpecDD, third-party maintainers, or your own team. Publish them in public or private Git
repositories and use the CLI to install, discover, and update them.

The plugin system launches with two official plugins:

**[Domain & Solution Design](/plugins/official/dsd/)** adds Domain Definitions and Solution Designs above local `.sdd`
implementation contracts. It documents shared business rules, requirements, architecture, decisions, and acceptance
criteria, with explicit references to the specs that realize them. Its workflow keeps affected designs and specs
synchronized as intent changes.

**[SpecDD Style Guide](/plugins/official/ssg/)** helps humans and agents write and review specs, design documents,
instructions, and other SpecDD artifacts. It guides clear, concise writing while preserving requirements, decisions,
and native document formats. You can use it on its own or alongside Domain & Solution Design.

Framework plugins require SpecDD framework 1.6 or newer. To install both official plugins, run these commands from an
initialized project's SpecDD root:

```bash
specdd plugin add @specdd/specdd dsd
specdd plugin add @specdd/specdd ssg
specdd plugin list
```

See the [plugin guide](/plugins/) for prerequisites, version selection, updates, and publishing your own plugins.
