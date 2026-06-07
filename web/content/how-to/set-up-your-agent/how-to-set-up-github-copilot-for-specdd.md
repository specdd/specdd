---
title: "How to set up GitHub Copilot for SpecDD"
seoDescription: "Set up GitHub Copilot for spec-driven development by installing SpecDD skills with GitHub CLI and verifying Copilot can work from local .sdd contracts."
excerpt: "Install the SpecDD GitHub Copilot skills one at a time with GitHub CLI, or use universal Agent Skills as the documented alternative."
level: "Beginner"
howtoID: "1021002"
weight: 50
---

This guide shows you how to set up GitHub Copilot for SpecDD so Copilot cloud agent or Copilot agent mode can work from
local `.sdd` contracts.

GitHub CLI installs SpecDD skills one at a time for Copilot. The documented alternative is the universal Agent Skills
package.

## Prerequisites

Before you start, make sure you have:

- GitHub Copilot with an agent workflow that can use installed skills
- GitHub CLI available
- a project initialized with SpecDD

## Steps

### 1. Check the SpecDD project files

In the repository root, confirm that these files exist:

```text
AGENTS.md
.specdd/
  bootstrap.md
  bootstrap.project.md
```

If the project is not initialized yet, run:

```bash
specdd init
```

### 2. Choose the skills to install

Start with `specdd-orient` so Copilot can inspect a SpecDD project before work starts.

Common next skills are:

- `specdd-plan` for planning under specs
- `specdd-do` for implementation under local authority
- `specdd-review` for reviewing diffs against specs
- `specdd-test` for deriving focused tests
- `specdd-task` for managing `Tasks`

The available skill IDs are:

```text
specdd-adopt
specdd-author
specdd-cli
specdd-debug
specdd-do
specdd-docs
specdd-explain
specdd-orient
specdd-plan
specdd-refactor
specdd-review
specdd-risk
specdd-task
specdd-test
specdd-trace
```

### 3. Install each skill with GitHub CLI

Source and install details: [github.com/specdd/plugin-copilot](https://github.com/specdd/plugin-copilot)

Install one skill at a time:

```bash
gh skill install specdd/plugin-copilot specdd-orient
```

Repeat the command with the other skill IDs you want to use.

### 4. Use universal Agent Skills instead

The SpecDD tools reference also documents universal Agent Skills as an alternative installation method for GitHub
Copilot.

Install project-local Agent Skills:

```bash
specdd agentskills deploy
```

Install into another project directory:

```bash
specdd agentskills deploy path/to/project
```

Install user-level Agent Skills:

```bash
specdd agentskills deploy --user
```

For manual installation, clone the universal Agent Skills package and copy the `specdd-*` skill directories into the
skills directory your Copilot setup reads.

Use one install path deliberately. If you install both Copilot-specific skills and universal Agent Skills, verify which
set Copilot is loading.

### 5. Verify Copilot can use SpecDD skills

Use a small request:

```text
Orient in this SpecDD project.
```

Then try a spec explanation request:

```text
Explain the Itinerary spec.
```

Copilot should describe the relevant SpecDD context instead of treating the request as a generic repository summary.

### 6. Use focused Copilot requests

Good task prompts name the work:

```text
Plan the Itinerary validation change.
```

```text
Review this change against the Itinerary spec.
```

Keep setup and workflow instructions in project files and installed skills. Keep prompts about the task.

## Common mistakes

- Installing only one skill, then expecting every SpecDD workflow to be available.
- Running `gh skill install` against the wrong plugin repository.
- Installing both Copilot-specific skills and universal Agent Skills without checking which path Copilot uses.
- Testing in a repository that has no SpecDD bootstrap files.

## How to verify the result

GitHub Copilot is ready for SpecDD when:

- the desired skill IDs have been installed
- the repository has `AGENTS.md` and `.specdd/bootstrap.md`
- orientation and explanation requests produce SpecDD-specific output
- implementation plans mention local authority and verification

## Related how-tos

- [How to choose between a dedicated plugin and universal Agent Skills](/how-to/set-up-your-agent/how-to-choose-between-a-dedicated-plugin-and-universal-agent-skills/)
- [How to verify an agent has loaded SpecDD skills correctly](/how-to/set-up-your-agent/how-to-verify-an-agent-has-loaded-specdd-skills-correctly/)
- [How to use spec-driven development with humans and agents](/how-to/getting-started/how-to-use-spec-driven-development-with-humans-and-agents/)

## Related reference

- [Tools](/tools/)
