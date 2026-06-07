---
title: "How to set up Cline for SpecDD"
seoDescription: "Set up Cline for spec-driven development by installing the dedicated skills globally or locally, or using the documented GitHub CLI or universal Agent Skills alternatives."
excerpt: "Install the SpecDD Cline skills globally, project-locally, with GitHub CLI, or with universal Agent Skills, then verify Cline can work from local specs."
level: "Beginner"
howtoID: "1021008"
weight: 110
---

This guide shows you how to set up Cline for SpecDD.

The dedicated Cline integration packages the shared SpecDD skills for Cline's skills directory. The documented install
paths are global copy, project-local copy, GitHub CLI, and universal Agent Skills.

## Prerequisites

Before you start, make sure you have:

- Cline installed
- Git, for cloning the plugin repository
- GitHub CLI, if you use the `gh skill install` path
- the SpecDD CLI, if you use universal Agent Skills
- a project initialized with SpecDD

## Steps

### 1. Initialize SpecDD

From the selected content root:

```bash
specdd init
```

Confirm that these files exist:

```text
AGENTS.md
.specdd/
  bootstrap.md
  bootstrap.project.md
```

### 2. Install Cline skills globally

Source and install details: [github.com/specdd/plugin-cline](https://github.com/specdd/plugin-cline)

Install the dedicated Cline plugin skills into Cline's user skills directory:

```bash
git clone https://github.com/specdd/plugin-cline.git /tmp/specdd-plugin-cline
mkdir -p ~/.cline/skills
cp -R /tmp/specdd-plugin-cline/skills/* ~/.cline/skills/
```

Use a global install when you want Cline to use the SpecDD skills across multiple repositories.

### 3. Install project-locally instead

For a project-local install, copy the skills into:

```text
.cline/skills/
```

Use this path when the repository should carry its own agent skills setup.

### 4. Use GitHub CLI instead

The SpecDD tools reference also documents GitHub CLI as an alternative for Cline.

Use `gh skill install` with Cline as the target agent and user scope:

```bash
gh skill install specdd/plugin-cline specdd-orient --agent cline --scope user
```

Replace `specdd-orient` with another SpecDD skill ID when you want to install a different skill.

### 5. Use universal Agent Skills instead

Universal Agent Skills are another documented alternative for Cline.

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
skills directory your Cline setup reads.

### 6. Open the SpecDD project root

Open the folder that contains:

```text
AGENTS.md
.specdd/bootstrap.md
<root-name>.sdd
```

The root folder matters because SpecDD resolves inherited specs and `/` paths from the selected content root.

### 7. Verify Cline can use SpecDD

Use a small orientation request:

```text
Orient in this SpecDD project.
```

Then ask about a feature spec:

```text
Explain the Itinerary spec.
```

Cline should identify SpecDD context, constraints, and local authority before implementation.

## Common mistakes

- Copying the plugin repository itself instead of the skill folders inside `skills`.
- Installing skills globally when your Cline setup expects project-local skills.
- Installing through multiple paths without checking which skills Cline loads.
- Opening a nested source folder instead of the selected content root.
- Skipping the orientation check after installation.

## How to verify the result

Cline is ready for SpecDD when:

- the SpecDD skills exist in `~/.cline/skills`, `.cline/skills`, or the Agent Skills directory Cline reads
- the project contains `.specdd/bootstrap.md`
- orientation and explanation requests mention `.sdd` specs
- implementation plans describe allowed paths, constraints, and checks

## Related how-tos

- [How to choose between a dedicated plugin and universal Agent Skills](/how-to/set-up-your-agent/how-to-choose-between-a-dedicated-plugin-and-universal-agent-skills/)
- [How to verify an agent has loaded SpecDD skills correctly](/how-to/set-up-your-agent/how-to-verify-an-agent-has-loaded-specdd-skills-correctly/)
- [How to use spec-driven development with humans and agents](/how-to/getting-started/how-to-use-spec-driven-development-with-humans-and-agents/)

## Related reference

- [Tools](/tools/)
