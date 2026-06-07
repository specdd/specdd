---
title: "How to install the VS Code extension for .sdd files"
seoDescription: "Install the SpecDD VS Code extension for .sdd files, including Visual Studio Marketplace, Open VSX, command-line install, and verification steps."
excerpt: "Install SpecDD support in Visual Studio Code or a compatible editor, then verify syntax highlighting, diagnostics, completions, hovers, links, and file icons."
level: "Beginner"
howtoID: "1031000"
weight: 10
---

This guide shows you how to install the SpecDD extension for Visual Studio Code and compatible editors so `.sdd` files
are recognized as SpecDD specifications.

The extension adds editor support for SpecDD files while keeping specs as plain text in your repository.

## Prerequisites

You need one of these editors:

- Visual Studio Code
- a compatible editor that supports VS Code-style extensions
- a compatible editor that uses Open VSX

You also need a project that contains `.sdd` files, or a project where you can create one for testing.

## Steps

### 1. Choose the marketplace for your editor

For Visual Studio Code, use the
[SpecDD extension on Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=specdd.specdd).

For compatible editors that use Open VSX, use the
[SpecDD extension on Open VSX](https://open-vsx.org/extension/specdd/specdd).

If your editor has its own extension gallery, open that gallery and search for `SpecDD`.

### 2. Install from the editor UI

In Visual Studio Code:

1. Open Extensions.
2. Search for `SpecDD`.
3. Select the extension published by SpecDD.
4. Click Install.

For compatible editors, use the same search term and select the SpecDD extension from the marketplace your editor uses.

### 3. Install from the command line instead

If the `code` launcher is available, install the extension with:

```bash
code --install-extension specdd.specdd
```

For compatible editors, replace `code` with that editor's launcher only when it supports VS Code-style extension
installation.

### 4. Open the project folder

Open the repository or workspace folder that contains your SpecDD files.

This matters because editor features such as document links, related-spec commands, and workspace validation need a
project boundary. For most projects, that boundary is the repository or workspace root. In a monorepo, open the root
that contains the specs that may refer to each other.

### 5. Open a `.sdd` file

Open an existing spec, or create a minimal file:

```sdd
Spec: Editor Check

Purpose:
  Verify that the editor recognizes SpecDD files.
```

Save it with the `.sdd` extension.

## How to verify the result

The extension is working when a `.sdd` file has SpecDD editor behavior:

- semantic syntax highlighting appears
- invalid structure is reported as diagnostics
- sections appear in document symbols
- folding works for sections
- completions and hovers appear while editing
- explicit path and glob references can become document links
- SpecDD file icons appear in the file tree

If the editor exposes SpecDD commands in the command palette, check that related-spec and workspace validation commands
are available there.

## Common mistakes

- Installing a similarly named extension instead of the one published by SpecDD.
- Testing in an unsaved file that does not have the `.sdd` extension.
- Opening only a nested `src` folder when `/` paths should resolve from the repository or monorepo root.
- Expecting the editor extension to initialize SpecDD project files. Use the SpecDD CLI for project setup.
- Using the Visual Studio Marketplace in an editor that expects Open VSX extensions.

## Related how-tos

- [How to install the JetBrains plugin for .sdd files](/how-to/editor-setup/how-to-install-the-jetbrains-plugin-for-sdd-files/)
- [How to enable .sdd validation and path warnings in your editor](/how-to/editor-setup/how-to-enable-sdd-validation-and-path-warnings-in-your-editor/)
- [How to get .sdd autocompletion and section hints](/how-to/editor-setup/how-to-get-sdd-autocompletion-and-section-hints/)

## Related reference

- [Tools](/tools/)
- [Language reference](/language-reference/)
