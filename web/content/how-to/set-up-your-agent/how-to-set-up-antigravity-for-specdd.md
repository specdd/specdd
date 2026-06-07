---
title: "How to set up Antigravity for SpecDD"
seoDescription: "Set up Antigravity for spec-driven development by installing the dedicated plugin, checking project bootstrap files, and verifying SpecDD-aware agent behavior."
excerpt: "Install the SpecDD Antigravity plugin, open a SpecDD project root, and verify Antigravity can orient, plan, implement, and review from local specs."
level: "Beginner"
howtoID: "1021009"
weight: 120
---

This guide shows you how to set up Antigravity for spec-driven development.

The dedicated Antigravity plugin packages the shared SpecDD skills for Antigravity's plugin system. In the SpecDD tools
reference, this is the documented Antigravity install path.

## Prerequisites

Before you start, make sure you have:

- Antigravity installed
- permission to install Antigravity plugins
- a project initialized with SpecDD

## Steps

### 1. Initialize SpecDD

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

### 2. Install the Antigravity plugin

Source and install details: [github.com/specdd/plugin-antigravity](https://github.com/specdd/plugin-antigravity)

Install the SpecDD plugin from its plugin repository:

```bash
agy plugin install https://github.com/specdd/plugin-antigravity.git
```

This installs the SpecDD skills generated for Antigravity from the shared SpecDD agent plugin source.

### 3. Open the project root

Open or start Antigravity in the folder that contains the bootstrap files and root `.sdd` file.

SpecDD is local and path-based, so starting from the correct root makes spec resolution and path references more
reliable.

### 4. Verify the plugin

Use:

```text
Orient in this SpecDD project.
```

Then ask about a real spec:

```text
Explain the Itinerary spec.
```

The response should mention SpecDD context, local constraints, and authority.

### 5. Use spec-focused prompts

After setup, use short prompts:

```text
Plan the Itinerary validation change.
```

```text
Implement the open validation task.
```

The plugin handles the SpecDD workflow. The prompt should identify the work.

## Common mistakes

- Installing the plugin but opening a project that has not run `specdd init`.
- Starting in a nested folder instead of the selected content root.
- Skipping the orientation check after plugin installation.

## How to verify the result

Antigravity is ready for SpecDD when:

- the plugin install command completes
- `.specdd/bootstrap.md` exists in the project
- orientation identifies relevant specs
- plans and reviews mention allowed files, constraints, and checks

## Related how-tos

- [How to install SpecDD universal Agent Skills for any agent](/how-to/set-up-your-agent/how-to-install-specdd-universal-agent-skills-for-any-agent/)
- [How to choose between a dedicated plugin and universal Agent Skills](/how-to/set-up-your-agent/how-to-choose-between-a-dedicated-plugin-and-universal-agent-skills/)
- [How to verify an agent has loaded SpecDD skills correctly](/how-to/set-up-your-agent/how-to-verify-an-agent-has-loaded-specdd-skills-correctly/)

## Related reference

- [Tools](/tools/)
