---
title: "How to enable .sdd validation and path warnings in your editor"
seoDescription: "Enable SpecDD .sdd validation and path warnings in VS Code-compatible editors or JetBrains IDEs, understand diagnostics, and verify with specdd lint."
excerpt: "Use installed SpecDD editor support to validate .sdd files, check path warnings, fix unresolved references, and verify specs with specdd lint."
level: "Beginner"
howtoID: "1031002"
weight: 30
---

This guide shows you how to turn editor feedback for `.sdd` files into a practical validation loop.

Use it when your editor recognizes SpecDD files but you want diagnostics, unresolved path warnings, and project-wide
checks to catch mistakes before review.

## Short answer

With a SpecDD editor integration installed, open the repository or workspace root, save files with the `.sdd`
extension, and use the editor's diagnostics or inspections. For cross-editor verification, run `specdd lint` from the
project root.

## Prerequisites

Install one editor integration before you start:

- [How to install the VS Code extension for .sdd files](/how-to/editor-setup/how-to-install-the-vs-code-extension-for-sdd-files/)
- [How to install the JetBrains plugin for .sdd files](/how-to/editor-setup/how-to-install-the-jetbrains-plugin-for-sdd-files/)

For CLI verification, also install the SpecDD CLI:

- [How to install the SpecDD CLI](/how-to/install-and-setup/how-to-install-the-specdd-cli/)

## Steps

### 1. Open the correct content root

Open the repository, workspace, or monorepo root that should act as the SpecDD content root.

The content root is the boundary used for:

- resolving `/` paths
- constraining resolved paths to the project
- indexing `.sdd` files
- finding related specs and references

Do not open only `src/main/java`, `src`, or a feature folder unless that folder is intentionally an independent SpecDD
project.

### 2. Open or create a `.sdd` file

Create a small valid file if you need a test case:

```sdd
Spec: Editor Validation

Purpose:
  Verify editor diagnostics for SpecDD files.

Owns:
  ./editor-validation.sdd
```

Save the file with the `.sdd` extension.

### 3. Check structural diagnostics

Strict validation should catch `.sdd` language mistakes such as:

- unknown section labels
- likely section-name typos
- section labels missing `:`
- whitespace before `:` in section headers
- section headers that are indented
- tabs in non-comment indentation
- indentation that is not a multiple of two spaces
- a first section that is not `Spec`
- duplicate non-repeatable sections
- duplicate `Scenario` titles
- inline text on sections that do not support inline values
- missing inline values for `Spec`, `Platform`, or `Scenario`
- body lines under `Spec` or `Platform`
- non-task lines inside `Tasks`
- invalid task states
- continuation lines without a preceding body entry

For example, this is invalid because `Purpose` must not have inline text:

```sdd
Purpose: Inline text is not valid here.
```

Use:

```sdd
Purpose:
  Inline text belongs in the section body.
```

### 4. Check path warnings

SpecDD treats only explicit path prefixes as file references:

- `./`
- `../`
- `/`

Unprefixed names are ordinary text, not paths:

```sdd
Owns:
  itinerary.js
```

Use an explicit path when you want editor path behavior:

```sdd
Owns:
  ./itinerary.js
```

Missing exact paths are unresolved references, not syntax errors. Fix them by correcting the path, moving the spec,
creating the missing file, or changing the line to ordinary prose when it is not meant to be a path.

Malformed globs are warning-level unresolved glob issues, not syntax errors:

```sdd
Can read:
  ./fixtures/[*.json
```

Fix the glob or replace it with a plain description.

### 5. Use workspace validation when available

The VS Code extension includes workspace validation. If your editor exposes SpecDD commands in the command palette,
run the workspace validation command after opening the project root.

JetBrains IDEs report structural validation and unresolved path warnings through inspections while you edit.

### 6. Verify with the CLI

Run the same validation outside the editor:

```bash
specdd lint
```

To lint a specific target:

```bash
specdd lint path/to/project
specdd lint path/to/project/project.sdd
specdd lint path/to/project/src/feature.ts
```

Use this when you want editor feedback and command-line feedback to agree before a pull request.

## Common mistakes

- Opening the wrong project root, then getting incorrect `/` path warnings.
- Writing filenames without `./`, `../`, or `/` and expecting path links.
- Using tabs for indentation.
- Adding inline text after section labels such as `Must:` or `Done when:`.
- Treating unresolved paths as syntax errors. They are reference problems.
- Forgetting to run `specdd lint` in CI or before review.

## How to verify the result

Validation is set up correctly when:

- valid `.sdd` files have no diagnostics
- invalid section syntax is reported in the editor
- explicit missing paths are reported as unresolved references
- clickable links work for explicit existing paths
- `specdd lint` passes from the same project root

## Related how-tos

- [How to install the VS Code extension for .sdd files](/how-to/editor-setup/how-to-install-the-vs-code-extension-for-sdd-files/)
- [How to install the JetBrains plugin for .sdd files](/how-to/editor-setup/how-to-install-the-jetbrains-plugin-for-sdd-files/)
- [How to verify your SpecDD setup is correct](/how-to/install-and-setup/how-to-verify-your-specdd-setup-is-correct/)

## Related reference

- [Tools](/tools/)
- [Language reference](/language-reference/)
