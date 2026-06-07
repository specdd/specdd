---
title: "How to install the JetBrains plugin for .sdd files"
seoDescription: "Install the SpecDD JetBrains plugin for .sdd files from Marketplace or the command line, then verify highlighting, validation, completions, and path support."
excerpt: "Install SpecDD support in JetBrains IDEs, then verify .sdd highlighting, validation, section docs, structure view, completions, path links, warnings, and quick fixes."
level: "Beginner"
howtoID: "1031001"
weight: 20
---

This guide shows you how to install the SpecDD JetBrains plugin so JetBrains IDEs recognize and assist with `.sdd`
specification files.

The plugin adds IDE support for writing, navigating, and validating SpecDD files.

## Prerequisites

You need:

- a JetBrains IDE
- a project that contains `.sdd` files, or a project where you can create one for testing

## Steps

### 1. Install from the IDE

In your JetBrains IDE:

1. Open Settings.
2. Select Plugins.
3. Open the Marketplace tab.
4. Search for `SpecDD`.
5. Install the SpecDD plugin.
6. Restart the IDE if prompted.

The plugin is published on
[JetBrains Marketplace](https://plugins.jetbrains.com/plugin/31808-specdd/).

### 2. Install from the command line instead

If your JetBrains launcher is available, install the plugin by ID:

```bash
idea installPlugins ai.specdd.idea
```

Depending on your IDE and JetBrains Toolbox setup, the command may be `idea`, `idea.sh`, or a product-specific launcher.

### 3. Open the correct project root

Open the repository, workspace, or monorepo root that contains the SpecDD files you want the IDE to understand.

This gives path completion, clickable file references, unresolved path warnings, and structure-aware features the
right project boundary.

### 4. Open a `.sdd` file

Open an existing spec or create a minimal file:

```sdd
Spec: Editor Check

Purpose:
  Verify that the IDE recognizes SpecDD files.
```

Save it with the `.sdd` extension.

### 5. Check the SpecDD IDE features

The JetBrains plugin provides:

- syntax highlighting
- structural validation
- section documentation
- structure view entries
- section and path completion
- clickable project file references
- unresolved path warnings
- create-file quick fixes

## How to verify the result

The plugin is working when:

- `.sdd` files are highlighted as SpecDD files
- sections appear in the Structure tool window or structure popup
- invalid section structure is reported by inspections
- completion suggests section labels and project paths
- explicit file references are clickable
- missing explicit paths are reported as unresolved references

## Common mistakes

- Installing SpecDD agent skills instead of the JetBrains IDE plugin.
- Running `idea installPlugins` with a launcher that opens a different JetBrains IDE than the one you use.
- Forgetting to restart after the plugin installation.
- Opening a nested module when project-root paths should resolve from the repository or monorepo root.
- Expecting the plugin to initialize SpecDD framework files. Use the SpecDD CLI for project initialization.

## Related how-tos

- [How to install the VS Code extension for .sdd files](/how-to/editor-setup/how-to-install-the-vs-code-extension-for-sdd-files/)
- [How to enable .sdd validation and path warnings in your editor](/how-to/editor-setup/how-to-enable-sdd-validation-and-path-warnings-in-your-editor/)
- [How to get .sdd autocompletion and section hints](/how-to/editor-setup/how-to-get-sdd-autocompletion-and-section-hints/)

## Related reference

- [Tools](/tools/)
- [Language reference](/language-reference/)
