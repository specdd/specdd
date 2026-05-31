---
title: "SpecDD Agent Skills 1.0.2 has been released"
date: 2026-05-31T13:00:00+02:00
seoDescription: "SpecDD Agent Skills 1.0.2 adds specdd-cli and specdd-author skills, clarifies adoption workflows, and improves CLI-assisted SpecDD work."
---

SpecDD Agent Skills 1.0.2 has been released, focused on making SpecDD work clearer for agents that support the Agent
Skills standard.

The main user-facing change is a cleaner split between adoption and authoring workflows. `specdd-adopt` now focuses on
CLI-centered SpecDD setup and adoption, while the new `specdd-author` skill handles authoring and revising `.sdd` specs
inside existing SpecDD projects.

This release also adds `specdd-cli`, a skill that helps agents use the SpecDD CLI for bootstrap setup, framework
updates, spec discovery, inspection, resolution, and linting when CLI assistance is useful.

The other practical improvement is less unnecessary rereading. The skills now guide agents to reuse active context and
reread only the narrowest exact bootstrap or spec text needed for the current task, instead of rereading every resolved
spec by default.

Setup instructions are available on the [Tools page](/tools/).
