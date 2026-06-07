---
title: "How to fix .sdd files not being recognized or highlighted"
seoDescription: "Fix .sdd files not being recognized or highlighted by checking editor plugins, file associations, workspace trust, filename extensions, reloads, and conflicting extensions."
excerpt: "Troubleshoot .sdd highlighting in VS Code-compatible editors and JetBrains IDEs by checking installation, enablement, associations, trust, reloads, and extension."
level: "Beginner"
howtoID: "1191001"
weight: 20
---

This guide shows you how to fix `.sdd` files that are not recognized, highlighted, or validated in your editor.

The most common causes are a missing editor integration, a disabled plugin, opening the wrong workspace, or saving the
file with a similar but wrong extension.

## Short answer

Make sure the file is saved as `.sdd`, install and enable the SpecDD editor integration for your editor, open the
project root, trust or reload the workspace if needed, and check whether another extension has claimed the file
association.

## Steps

### 1. Check the file extension

The file must end in:

```text
.sdd
```

These will not be recognized as SpecDD files:

```text
itinerary.sdd.md
itinerary.spec
itinerary.txt
```

Rename the file if needed.

### 2. Confirm editor support is installed

Install the matching editor support:

- VS Code-compatible editor: SpecDD VS Code extension
- JetBrains IDE: SpecDD JetBrains plugin

If you do not have an editor integration installed, `.sdd` files are still plain text, but you will not get syntax
highlighting, validation, path warnings, or section hints from the editor.

### 3. Enable the extension or plugin

Check that the extension or plugin is enabled for the current editor profile or project.

Some editors allow extensions to be disabled per workspace. If the integration appears installed but inactive, enable it
for the current workspace and reopen the file.

### 4. Open the right workspace

Open the repository or workspace root that contains the `.specdd/` directory and root spec. Editor features such as path
warnings and workspace validation depend on the correct content root.

Opening only a nested folder can make `/` paths and references appear wrong.

### 5. Reload the editor

After installing or enabling editor support, reload the window or restart the IDE. Then reopen a `.sdd` file.

For a quick recognition test, create:

```sdd
Spec: Editor Check

Purpose:
  Confirm this editor recognizes SpecDD files.
```

If `Spec`, `Purpose`, and section formatting are highlighted, recognition is working.

### 6. Check conflicting associations

If another extension owns `.sdd`, update file associations so `.sdd` maps to SpecDD.

Also check workspace trust or restricted mode in editors that disable language features for untrusted folders.

## Common causes

- File saved with `.sdd.md` instead of `.sdd`.
- Editor integration is not installed.
- Extension or plugin is disabled.
- Workspace is not trusted.
- The editor was not restarted after install.
- Another extension claimed `.sdd`.
- The project root is not open, so path features look broken.

## How to verify the fix

Recognition is fixed when:

- `.sdd` files show SpecDD syntax highlighting
- section labels autocomplete or receive hints when supported
- invalid syntax is reported
- explicit existing paths are clickable when supported
- missing explicit paths produce warnings
- `specdd lint` agrees with editor validation

## Related how-tos

- [How to install the VS Code extension for .sdd files](/how-to/editor-setup/how-to-install-the-vs-code-extension-for-sdd-files/)
- [How to install the JetBrains plugin for .sdd files](/how-to/editor-setup/how-to-install-the-jetbrains-plugin-for-sdd-files/)
- [How to enable .sdd validation and path warnings in your editor](/how-to/editor-setup/how-to-enable-sdd-validation-and-path-warnings-in-your-editor/)
- [How to fix path references that do not resolve](/how-to/troubleshooting/how-to-fix-path-references-that-do-not-resolve/)

## Related reference

- [Tools](/tools/)
- [Language reference](/language-reference/)
