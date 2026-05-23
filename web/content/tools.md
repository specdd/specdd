---
title: Tools
seoDescription: "SpecDD tools, CLI setup, agent plugin and skill installation, and JetBrains IDE plugin setup."
---

SpecDD works as plain files first. The CLI handles project setup and framework updates. The agent plugins help Codex,
Claude Code, GitHub Copilot, Antigravity, Junie, and Cline follow the same SpecDD project-contract workflows. The
JetBrains plugin adds editor support for `.sdd` files.

## SpecDD CLI

Use the CLI to initialize SpecDD in a project, update an existing SpecDD setup, and check whether the local framework
files are current.

Source and help: [github.com/specdd/cli](https://github.com/specdd/cli)

Install with npm:

```bash
npm install --global specdd
```

Install with Yarn:

```bash
yarn global add specdd
```

Install with Homebrew:

```bash
brew tap specdd/cli
brew install specdd
```

Run with Docker:

```bash
docker run --rm specdd/cli:latest --help
docker run --rm ghcr.io/specdd/cli:latest --help
```

Initialize SpecDD in the current directory:

```bash
specdd init
```

Initialize SpecDD in another directory:

```bash
specdd init path/to/project
```

Update an existing SpecDD setup:

```bash
specdd update
```

Check whether an update is available:

```bash
specdd check-update
```

The npm and Yarn installs require Node.js 22 or newer. For all command options, run `specdd --help` or
`specdd <command> --help`.

## Agent Plugins

Use the agent plugins and skill packages when you want an AI coding agent to apply SpecDD-specific workflows inside
SpecDD-enabled projects. The Codex, Claude Code, GitHub Copilot, Antigravity, Junie, and Cline integrations are
generated from the same shared source repository and expose the same SpecDD skills.

Source repository: [github.com/specdd/agent-plugins](https://github.com/specdd/agent-plugins)

The shared skills help agents:

- Read a target project's active `.specdd/bootstrap.md` chain.
- Resolve local `.sdd` spec authority before editing.
- Orient themselves in a SpecDD project before work starts.
- Explain specs in concise human language.
- Plan changes under existing specs.
- Implement code, docs, tests, tasks, or spec changes under authority.
- Review diffs against active SpecDD contracts.
- Find, add, organize, and verify SpecDD tasks.
- Trace specs to code, tests, docs, changed files, and coverage gaps.
- Derive focused tests from governing specs.
- Refactor while preserving specified behavior.
- Debug by comparing failures to the governing contract.
- Turn specs into user or developer documentation.
- Classify change risk before work starts.

### Codex

Source and install details: [github.com/specdd/plugin-codex](https://github.com/specdd/plugin-codex)

Install from the SpecDD marketplace:

```bash
codex plugin marketplace add specdd/specdd --ref main
codex plugin add specdd@specdd
```

### Claude Code

Source and install details: [github.com/specdd/plugin-claude](https://github.com/specdd/plugin-claude)

Install from the SpecDD marketplace:

```bash
claude plugin marketplace add specdd/specdd
claude plugin install specdd@specdd
```

### GitHub Copilot

Source and install details: [github.com/specdd/plugin-copilot](https://github.com/specdd/plugin-copilot)

Install each desired SpecDD skill separately with GitHub CLI.

#### GitHub CLI Skill Installs

GitHub CLI installs one skill at a time. Replace `specdd-orient` with any skill ID from the list below. See the
[gh skill install manual](https://cli.github.com/manual/gh_skill_install) for command options.

Available skill IDs:

- `specdd-adopt`
- `specdd-debug`
- `specdd-do`
- `specdd-docs`
- `specdd-explain`
- `specdd-orient`
- `specdd-plan`
- `specdd-refactor`
- `specdd-review`
- `specdd-risk`
- `specdd-task`
- `specdd-test`
- `specdd-trace`

```bash
gh skill install specdd/plugin-copilot specdd-orient
```

### Antigravity

Source and install details: [github.com/specdd/plugin-antigravity](https://github.com/specdd/plugin-antigravity)

Install from the plugin repository:

```bash
agy plugin install https://github.com/specdd/plugin-antigravity.git
```

### Junie

Source and install details: [github.com/specdd/plugin-junie](https://github.com/specdd/plugin-junie)

Install globally by copying the skills into Junie's user skills directory:

```bash
git clone https://github.com/specdd/plugin-junie.git /tmp/specdd-plugin-junie
mkdir -p ~/.junie/skills
cp -R /tmp/specdd-plugin-junie/skills/* ~/.junie/skills/
```

For a project-local install, copy the skills into `.junie/skills/` instead.

Alternatively, use `gh skill install` with `--agent junie --scope user`; see the
[gh skill install manual](https://cli.github.com/manual/gh_skill_install).

### Cline

Source and install details: [github.com/specdd/plugin-cline](https://github.com/specdd/plugin-cline)

Install globally by copying the skills into Cline's user skills directory:

```bash
git clone https://github.com/specdd/plugin-cline.git /tmp/specdd-plugin-cline
mkdir -p ~/.cline/skills
cp -R /tmp/specdd-plugin-cline/skills/* ~/.cline/skills/
```

For a project-local install, copy the skills into `.cline/skills/` instead.

Alternatively, use `gh skill install` with `--agent cline --scope user`; see the
[gh skill install manual](https://cli.github.com/manual/gh_skill_install).

## JetBrains Plugin

Use the JetBrains plugin for IDE support while editing `.sdd` specification files. It provides syntax highlighting,
structural validation, section documentation, structure view entries, section and path completion, clickable project
file references, unresolved path warnings, and create-file quick fixes.

Marketplace page: [plugins.jetbrains.com/plugin/31808-specdd](https://plugins.jetbrains.com/plugin/31808-specdd/)

Install from the IDE:

1. Open Settings.
2. Select Plugins.
3. Open the Marketplace tab.
4. Search for `SpecDD`.
5. Click Install and restart the IDE if prompted.

Install from the command line with the plugin ID:

```bash
idea installPlugins ai.specdd.idea
```

Depending on your JetBrains IDE and launcher setup, the command may be `idea`, `idea.sh`, or a product-specific
launcher generated by JetBrains Toolbox.
