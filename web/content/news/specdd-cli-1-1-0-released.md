---
title: "SpecDD CLI 1.1.0 has been released"
date: 2026-05-30T12:00:00+02:00
seoDescription: "SpecDD CLI 1.1.0 adds inspect, lint, and resolve commands for inspecting specs, checking syntax, and discovering relevant SpecDD context."
---

SpecDD CLI 1.1.0 has been released, adding the first inspection and validation commands for SpecDD projects.

The new `specdd inspect` command renders SpecDD sections in a tree-shaped view, making it easier to see what a spec
contains without reading every line manually.

The new `specdd lint` command reports `.sdd` syntax diagnostics in text or JSON format. This gives projects a practical
way to check indentation, section structure, task markers, and other language rules outside an editor.

The new `specdd resolve` command discovers the bounded set of specs relevant to a target path. It is intended for agents
and tools that need to find local SpecDD context before work starts.

This release also ships a Unix manual page for local command help.
