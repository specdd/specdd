---
title: "How to uninstall SpecDD from a project"
seoDescription: "Remove spec-driven development from a project by reviewing .sdd files, deleting bootstrap and agent setup files, cleaning project-local skills, and verifying the Git diff."
excerpt: "Remove SpecDD project setup cleanly while deciding whether existing .sdd files still contain useful project knowledge worth preserving."
level: "Beginner"
howtoID: "1011007"
weight: 80
---

This guide shows how to remove SpecDD from a project cleanly.

There is no project-level `specdd uninstall` command. Uninstalling from a project is a manual Git change: remove the
framework setup files, decide what to do with `.sdd` specs, and verify that no agent entrypoint still points to the
removed bootstrap.

## Steps

### 1. Review the current setup

Start by listing the SpecDD files:

```bash
git status --short
find . -name '*.sdd' -print
find . -path './.specdd/*' -print
```

Also check for project-local Agent Skills:

```bash
find .agents/skills -maxdepth 1 -type d -name 'specdd-*' -print
```

If a command prints paths that matter to your project outside SpecDD, review before deleting anything.

### 2. Decide what to do with .sdd files

Spec files often contain useful project knowledge even when a team stops using SpecDD.

Choose one path:

- Keep `.sdd` files as plain reference material for now.
- Convert important rules into another durable project document.
- Remove `.sdd` files when the team no longer wants them in the repository.

Do not delete specs just because they are no longer executable setup files. Read them first.

### 3. Remove bootstrap files

Remove the generated bootstrap directory when you are fully removing SpecDD:

```bash
git rm -r .specdd
```

If `.specdd/bootstrap.local.md` was ignored and never tracked, remove the local file separately from your working tree.

### 4. Remove or edit agent entrypoints

If `AGENTS.md` and `CLAUDE.md` were created only for SpecDD, remove them:

```bash
git rm AGENTS.md CLAUDE.md
```

If those files contain other project instructions, keep the files and remove only the SpecDD bootstrap instruction.

After editing, search for remaining bootstrap references:

```bash
rg "\\.specdd/bootstrap\\.md|SpecDD" AGENTS.md CLAUDE.md . 2>/dev/null
```

Review the matches. Some remaining mentions may be useful historical or documentation references.

### 5. Remove project-local Agent Skills

If you deployed universal SpecDD Agent Skills into the project, remove only the SpecDD skill directories:

```bash
git rm -r .agents/skills/specdd-*
```

Do not remove non-SpecDD skill directories.

### 6. Optionally uninstall the CLI from your machine

If you no longer need the CLI anywhere, remove it with the same tool you used to install it.

For npm:

```bash
npm uninstall --global specdd
```

For Yarn:

```bash
yarn global remove specdd
```

For Linux Homebrew:

```bash
brew uninstall specdd
brew untap specdd/cli
```

Docker-based use does not install a CLI binary into the project.

### 7. Verify the final diff

Run:

```bash
git status --short
git diff
```

Check:

- no remaining agent entrypoint points to `.specdd/bootstrap.md`
- no tracked `.specdd` files remain if you intended a full uninstall
- `.sdd` files are either intentionally kept, converted, or removed
- only SpecDD-related Agent Skills were removed

## Common mistakes

- Removing `.specdd/` but leaving `AGENTS.md` pointing to `.specdd/bootstrap.md`.
- Deleting `.sdd` files without checking whether they contain useful project constraints.
- Removing all `.agents/skills` instead of only `specdd-*` skill directories.
- Uninstalling the global CLI when other repositories still use it.

## Related how-tos

- [How to verify your SpecDD setup is correct](/how-to/install-and-setup/how-to-verify-your-specdd-setup-is-correct/)
- [How to add SpecDD to an existing project](/how-to/install-and-setup/how-to-add-specdd-to-an-existing-project/)

## Related reference

- [Tools](/tools/)
