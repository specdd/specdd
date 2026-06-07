---
title: "How to get .sdd autocompletion and section hints"
seoDescription: "Use SpecDD .sdd autocompletion, section hints, hovers, path completion, document symbols, and structure view support in VS Code-compatible editors and JetBrains IDEs."
excerpt: "Use SpecDD editor completions and hints to write valid section labels, complete paths, inspect section documentation, and navigate .sdd files."
level: "Beginner"
howtoID: "1031003"
weight: 40
---

This guide shows you how to use SpecDD editor assistance while writing `.sdd` files.

Completions and section hints are useful because `.sdd` syntax is intentionally strict: section labels are
case-sensitive, only some sections support inline values, and explicit paths must use `./`, `../`, or `/`.

## Prerequisites

Install one editor integration before you start:

- [How to install the VS Code extension for .sdd files](/how-to/editor-setup/how-to-install-the-vs-code-extension-for-sdd-files/)
- [How to install the JetBrains plugin for .sdd files](/how-to/editor-setup/how-to-install-the-jetbrains-plugin-for-sdd-files/)

Open the repository or workspace root before testing path completion.

## Steps

### 1. Open or create a `.sdd` file

Start with a small valid spec:

```sdd
Spec: Autocomplete Check

Purpose:
  Verify section hints and completions.
```

Save the file with the `.sdd` extension.

### 2. Use section label completion

At column 0, trigger completion and choose a canonical section label.

Valid section labels include:

```text
Spec
Platform
Purpose
Structure
Owns
Can modify
Can read
References
Must
Must not
Forbids
Depends on
Exposes
Accepts
Returns
Raises
Handles
Tasks
Done when
Scenario
Example
```

Use the exact capitalization. Unknown section labels are invalid in strict validation.

### 3. Use hints to choose the right section shape

Use editor hovers or section documentation to confirm whether a section takes an inline value or a body.

These sections use inline values:

```sdd
Spec: Itinerary
Platform: JavaScript/ES6
Scenario: missing place name
Example: missing trip date
```

Most other sections use body entries:

```sdd
Must:
  Reject itinerary items without a place name.

Done when:
  Missing-place behavior is covered by a check.
```

Invalid:

```sdd
Must: Reject missing place names.
```

### 4. Use path completion in path-bearing sections

Use path completion when a section should point at files or directories.

Common path-bearing sections are:

- `Structure`
- `Owns`
- `Can modify`
- `Can read`
- `References`
- `Depends on`
- `Forbids`
- `Exposes`

Start explicit paths with one of:

```text
./
../
/
```

Example:

```sdd
Owns:
  ./itinerary.js

Can read:
  ../storage/trip-storage.sdd
```

Unprefixed filenames are valid prose, but they are not explicit path references and should not be expected to complete
or link as paths.

### 5. Use symbols, structure view, and folding

In VS Code-compatible editors, use document symbols and folding to navigate larger specs.

In JetBrains IDEs, use the Structure view or structure popup to jump between sections.

This is useful for specs with multiple scenarios:

```sdd
Scenario: missing place name
  Given the place name is empty
  When the person adds the itinerary item
  Then validation fails

Scenario: valid place
  Given the place name is Louvre Museum
  When the person adds the itinerary item
  Then the item is stored
```

### 6. Let completions prevent syntax drift

Use completions and hints whenever you are unsure about a section name or shape.

They help avoid common invalid forms:

- `Must Not` instead of `Must not`
- `Done When` instead of `Done when`
- `Spec:` without a name
- body lines indented with tabs
- task lines outside `Tasks`
- unsupported task states such as `[todo]`
- duplicate non-repeatable sections

## How to verify the result

Autocompletion and hints are working when:

- section labels are suggested at column 0
- hovers or documentation explain known sections
- path suggestions appear after explicit path prefixes where supported
- document symbols or structure view show the spec sections
- diagnostics appear when you choose an invalid section shape

## Common mistakes

- Testing completion in a file that is not saved as `.sdd`.
- Triggering section label completion while indented inside a section body.
- Expecting path completion for unprefixed filenames.
- Opening a nested folder that hides the files you expect path completion to find.
- Ignoring section hints and adding inline text to body-only sections.

## Related how-tos

- [How to enable .sdd validation and path warnings in your editor](/how-to/editor-setup/how-to-enable-sdd-validation-and-path-warnings-in-your-editor/)
- [How to write your first .sdd spec](/how-to/getting-started/how-to-write-your-first-sdd-spec/)
- [How to verify your SpecDD setup is correct](/how-to/install-and-setup/how-to-verify-your-specdd-setup-is-correct/)

## Related reference

- [Tools](/tools/)
- [Language reference](/language-reference/)
