---
title: "How to verify your SpecDD setup is correct"
seoDescription: "Verify a spec-driven development setup by checking the CLI, bootstrap files, root spec naming, local gitignore, spec inspection, linting, and agent entrypoint wiring."
excerpt: "Run a practical SpecDD setup checklist covering CLI availability, generated files, bootstrap load order, root spec naming, linting, local ignores, and a smoke test."
level: "Beginner"
howtoID: "1011006"
weight: 70
---

This guide gives you a practical checklist for verifying that SpecDD is installed, initialized, and wired correctly.

Use it after a new initialization, an existing-project adoption, or a framework update.

## Steps

### 1. Check the CLI

Run:

```bash
specdd --help
```

If the command is missing and you installed with npm or Yarn, check Node.js too:

```bash
node -v
npm -v
```

Node.js must be 22 or newer for npm and Yarn CLI installs.

### 2. Check the generated files

From the SpecDD content root, verify these files exist:

```text
AGENTS.md
CLAUDE.md
.specdd/bootstrap.md
.specdd/bootstrap.project.md
.specdd/.gitignore
```

`.specdd/bootstrap.local.md` may exist on your machine, but it should not be committed.

### 3. Check bootstrap load order

The active bootstrap files are read in this order:

```text
.specdd/bootstrap.md
-> .specdd/bootstrap.project.md
-> .specdd/bootstrap.local.md
```

Check that shared team rules are in:

```text
.specdd/bootstrap.project.md
```

Check that personal preferences are in:

```text
.specdd/bootstrap.local.md
```

### 4. Check local ignore rules

The generated `.specdd/.gitignore` should ignore the local bootstrap file:

```text
bootstrap.local.md
```

Then confirm Git is not trying to commit it:

```bash
git status --short .specdd
```

If `.specdd/bootstrap.local.md` appears as a staged or unstaged tracked file, remove it from the shared commit and keep
only the local copy.

### 5. Check the root spec name

The root spec must be named after the selected content root directory.

Examples:

```text
travel-planner/
  travel-planner.sdd
```

```text
api/
  api.sdd
```

The human-facing `Spec:` name can be nicer than the filename:

```sdd
Spec: Travel Planner API
```

### 6. Inspect the specs

Run:

```bash
specdd inspect .
```

The command should find the specs under the current directory and show useful sections such as `Purpose` when present.

If you have a specific target file, resolve its context:

```bash
specdd resolve path/to/target-file
```

For ordinary files, a same-directory same-basename `.sdd` file should be included when one exists.

### 7. Lint the specs

Run:

```bash
specdd lint
```

The command lints specs for the current directory and exits with status `1` when errors are present.

To lint a specific directory, `.sdd` file, or ordinary file, pass the target:

```bash
specdd lint path/to/project
specdd lint path/to/project/project.sdd
specdd lint path/to/project/src/feature.ts
```

For ordinary files, lint checks the same-basename `.sdd` file when present and still walks upward through directory
context when no matching spec exists.

### 8. Check agent entrypoints

`AGENTS.md` should point agents to the SpecDD bootstrap:

```md
Before working on this project, read `.specdd/bootstrap.md`.

Assume the role, rules, workflow, and implementation constraints described in SpecDD. Treat SpecDD specs as
source-adjacent development contracts, not optional documentation. Adhere to SpecDD rules unless explicitly
instructed otherwise.
```

`CLAUDE.md` should point Claude-style workflows to `AGENTS.md`.

If either file already had project-specific instructions before SpecDD was added, make sure the useful existing
instructions are still present.

### 9. Run an agent smoke test

Ask your agent for one explanation, not an implementation:

```text
Explain the Travel Planner spec.
```

The agent should use the project specs and report the relevant purpose, constraints, and boundaries. If it ignores the
specs, fix the agent entrypoint wiring before asking it to change code.

## Common setup failures

- `specdd --help` fails because the CLI is not on `PATH`.
- `npm install --global specdd` fails because Node.js is older than 22.
- The project was initialized in a nested directory by mistake.
- The root spec filename does not match the content root directory.
- `.specdd/bootstrap.local.md` is staged for commit.
- Existing agent instruction files were not updated to load the SpecDD bootstrap.

## Related how-tos

- [How to install the SpecDD CLI](/how-to/install-and-setup/how-to-install-the-specdd-cli/)
- [How to initialize SpecDD in a new project](/how-to/install-and-setup/how-to-initialize-specdd-in-a-new-project/)
- [How to update your SpecDD framework files](/how-to/install-and-setup/how-to-update-your-specdd-framework-files/)

## Related reference

- [Tools](/tools/)
- [Language reference](/language-reference/)
