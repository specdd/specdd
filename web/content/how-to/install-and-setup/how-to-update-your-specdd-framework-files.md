---
title: "How to update your SpecDD framework files"
seoDescription: "Update SpecDD framework files for spec-driven development with specdd check-update and specdd update, review the bootstrap diff, and preserve project-local setup files."
excerpt: "Check whether a SpecDD framework update is available, run `specdd update`, and review the bootstrap changes while preserving local project files."
level: "Beginner"
howtoID: "1011004"
weight: 50
---

This guide shows how to update the SpecDD framework files in an initialized project.

The important safety rule is simple: `specdd update` updates the framework bootstrap. It preserves project-local files
such as `bootstrap.project.md`, `bootstrap.local.md`, `AGENTS.md`, and `CLAUDE.md`.

## Prerequisites

Before you start, make sure you have:

- an initialized SpecDD project
- `.specdd/bootstrap.md` in the current directory
- the SpecDD CLI installed
- a Git diff you can review

## Steps

### 1. Start from the SpecDD content root

Run update from the directory that contains:

```text
.specdd/bootstrap.md
```

Check your current diff first:

```bash
git status --short
```

Do not mix a framework update with unrelated implementation work if you can avoid it.

### 2. Check whether an update is available

Run:

```bash
specdd check-update
```

The command prints the local SpecDD version when `.specdd/bootstrap.md` exists, resolves the latest release version, and
exits with:

- `0` when no update is needed
- `1` when an update is available

### 3. Run the update

Run:

```bash
specdd update
```

When the local bootstrap version is already current or newer, the CLI does nothing.

To install a specific release, pass the numeric version:

```bash
specdd update --version 1.4
```

Do not include a leading `v` in the version.

### 4. Know what update changes

During update, the CLI may write or overwrite:

```text
.specdd/bootstrap.md
```

It leaves existing non-bootstrap files unchanged, including:

```text
AGENTS.md
CLAUDE.md
.specdd/bootstrap.project.md
.specdd/bootstrap.local.md
.specdd/.gitignore
```

It also does not recreate missing non-bootstrap files during update. If you intentionally deleted `AGENTS.md`,
`CLAUDE.md`, or `bootstrap.project.md`, restore those separately instead of expecting `specdd update` to rebuild them.

### 5. Review the bootstrap diff

Review the changed bootstrap:

```bash
git diff -- .specdd/bootstrap.md
```

When an update is applied, the CLI prints the changelog link from the updated bootstrap file. Read it before committing
the change so the team knows what framework behavior changed.

### 6. Run setup checks

Run:

```bash
specdd inspect .
```

Then verify:

- `.specdd/bootstrap.md` has the expected version
- `.specdd/bootstrap.project.md` still contains your project rules
- `.specdd/bootstrap.local.md` was not committed
- agent entrypoint files still point to the bootstrap

### 7. Commit the update

Commit the framework update separately when practical:

```bash
git add .specdd/bootstrap.md
git commit -m "Update SpecDD framework files"
```

If the update required project-rule adjustments, include `.specdd/bootstrap.project.md` in the same review so the team
can see why the local rule changed.

## Common mistakes

- Running `specdd update` from a nested directory without `.specdd/bootstrap.md`.
- Expecting update to recreate deleted agent entrypoint files.
- Committing `.specdd/bootstrap.local.md`.
- Ignoring the bootstrap diff because it is "just generated."
- Combining framework updates with broad implementation changes.

## Related how-tos

- [How to verify your SpecDD setup is correct](/how-to/install-and-setup/how-to-verify-your-specdd-setup-is-correct/)
- [How to upgrade from an older SpecDD project layout](/how-to/install-and-setup/how-to-upgrade-from-an-older-specdd-project-layout/)
- [How to add SpecDD to an existing project](/how-to/install-and-setup/how-to-add-specdd-to-an-existing-project/)

## Related reference

- [Tools](/tools/)
