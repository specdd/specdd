---
title: "How to set up JetBrains Junie for SpecDD"
seoDescription: "Set up JetBrains Junie for spec-driven development by installing the dedicated skills globally or locally, or using the documented GitHub CLI or universal Agent Skills alternatives."
excerpt: "Install the SpecDD Junie skills globally, project-locally, with GitHub CLI, or with universal Agent Skills, then verify Junie can use local specs."
level: "Beginner"
howtoID: "1021007"
weight: 100
---

This guide shows you how to set up JetBrains Junie for spec-driven development.

The dedicated Junie integration packages the shared SpecDD skills for Junie's skills directory. The documented install
paths are global copy, project-local copy, GitHub CLI, and universal Agent Skills.

## Prerequisites

Before you start, make sure you have:

- JetBrains Junie available
- Git, for cloning the plugin repository
- GitHub CLI, if you use the `gh skill install` path
- the SpecDD CLI, if you use universal Agent Skills
- a project initialized with SpecDD

## Steps

### 1. Initialize SpecDD in the project

From the selected content root:

```bash
specdd init
```

Confirm that the project contains:

```text
AGENTS.md
.specdd/
  bootstrap.md
  bootstrap.project.md
```

### 2. Install Junie skills globally

Source and install details: [github.com/specdd/plugin-junie](https://github.com/specdd/plugin-junie)

Install the dedicated Junie plugin skills into Junie's user skills directory:

```bash
git clone https://github.com/specdd/plugin-junie.git /tmp/specdd-plugin-junie
mkdir -p ~/.junie/skills
cp -R /tmp/specdd-plugin-junie/skills/* ~/.junie/skills/
```

Use a global install when you want Junie to use SpecDD skills across multiple projects.

### 3. Install project-locally instead

For a project-local install, copy the skills into:

```text
.junie/skills/
```

Use a project-local install when you want the skills version to travel with a specific repository or team setup.

### 4. Use GitHub CLI instead

The SpecDD tools reference also documents GitHub CLI as an alternative for Junie.

Use `gh skill install` with Junie as the target agent and user scope:

```bash
gh skill install specdd/plugin-junie specdd-orient --agent junie --scope user
```

Replace `specdd-orient` with another SpecDD skill ID when you want to install a different skill.

### 5. Use universal Agent Skills instead

Universal Agent Skills are another documented alternative for Junie.

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
skills directory your Junie setup reads.

### 6. Open the SpecDD project

Open the folder that contains `.specdd/bootstrap.md` and the root `.sdd` file.

If you also use the JetBrains `.sdd` editor plugin, it can provide syntax highlighting, structural validation, path
completion, document links, and create-file quick fixes while you write specs.

### 7. Verify Junie can use SpecDD

Use:

```text
Orient in this SpecDD project.
```

Then ask about a real spec:

```text
Explain the Itinerary spec.
```

Junie should describe local SpecDD context before planning or implementation.

## Common mistakes

- Copying the wrong folder instead of the contents of the plugin `skills` directory.
- Installing globally when the agent client is configured to read project-local skills only.
- Installing through multiple paths without checking which skills Junie loads.
- Opening a nested module instead of the selected content root.
- Confusing the JetBrains editor plugin for `.sdd` files with the Junie agent skills.

## How to verify the result

Junie is ready for SpecDD when:

- the SpecDD skills are present in `~/.junie/skills`, `.junie/skills`, or the Agent Skills directory Junie reads
- the project contains `.specdd/bootstrap.md`
- orientation identifies the active SpecDD context
- plans name relevant specs, authority, constraints, and checks

## Related how-tos

- [How to install the JetBrains plugin for .sdd files](/how-to/editor-setup/how-to-install-the-jetbrains-plugin-for-sdd-files/)
- [How to choose between a dedicated plugin and universal Agent Skills](/how-to/set-up-your-agent/how-to-choose-between-a-dedicated-plugin-and-universal-agent-skills/)
- [How to verify an agent has loaded SpecDD skills correctly](/how-to/set-up-your-agent/how-to-verify-an-agent-has-loaded-specdd-skills-correctly/)

## Related reference

- [Tools](/tools/)
