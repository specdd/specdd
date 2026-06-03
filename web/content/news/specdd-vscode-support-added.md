---
title: "SpecDD adds support for Visual Studio Code and compatible editors"
date: 2026-06-04T01:15:00+02:00
seoDescription: "SpecDD now has an extension for Visual Studio Code and compatible editors, with .sdd language support, diagnostics, navigation, and completions."
---

SpecDD now has dedicated support for Visual Studio Code and compatible editors through the new `specdd.specdd`
extension.

The extension registers `.sdd` files as SpecDD documents and adds semantic syntax highlighting for section groups,
comments, task states, scenario steps, key-value entries, paths, globs, symbol references, and inline code spans.

It also brings parser-backed editor help into Visual Studio Code and compatible editors: diagnostics for SpecDD language
rules, document symbols, folding ranges, completions for section headers and task syntax, hovers for section labels and
references, and document links for resolvable path and glob references.

The first release includes commands for opening related specs, creating matching specs, validating the workspace, and
showing the selected content root. Workspace settings let teams choose a content root, toggle diagnostics, validate
references, and tune glob result limits.

The extension is available from the
[Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=specdd.specdd) for Visual Studio Code
and from [Open VSX](https://open-vsx.org/extension/specdd/specdd) for compatible editors.

Source code and issues are available at
[github.com/specdd/vscode-plugin](https://github.com/specdd/vscode-plugin).
