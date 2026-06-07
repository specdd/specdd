---
title: "How to use SpecDD with agents that do not support skills"
seoDescription: "Use spec-driven development with agents that do not support skills by relying on repository bootstrap files, local .sdd specs, focused prompts, and careful verification."
excerpt: "Set up a file-aware agent without skills by initializing SpecDD, keeping bootstrap files in the repository, opening the correct root, and verifying spec-aware behavior."
level: "Beginner"
howtoID: "1021014"
weight: 150
---

This guide shows you how to use SpecDD with an agent that does not support dedicated plugins or Agent Skills.

SpecDD still works when an agent can read repository files and follow project instructions. Skills improve the workflow,
but the source of truth remains the bootstrap files and `.sdd` specs in Git.

## Prerequisites

Before you start, make sure:

- the agent can read files in your repository
- the project has SpecDD initialized
- the work area has a root or local `.sdd` spec

## Steps

### 1. Initialize SpecDD

From the selected content root:

```bash
specdd init
```

This creates:

```text
AGENTS.md
CLAUDE.md
.specdd/
  bootstrap.md
  bootstrap.project.md
  bootstrap.local.md
```

The generated `AGENTS.md` is the normal agent entrypoint. It points to the SpecDD bootstrap rules.

### 2. Keep project conventions in bootstrap.project.md

Put shared project rules in:

```text
.specdd/bootstrap.project.md
```

Use it for command conventions, code style, local syntax choices, and team rules.

Do not scatter these conventions across root specs, module specs, or chat prompts. Keeping them in the project
bootstrap makes the setup more portable across agents.

### 3. Open the selected content root

Start the agent from the folder that contains:

```text
AGENTS.md
.specdd/bootstrap.md
<root-name>.sdd
```

If your agent has project-level instruction settings, point those settings at the same repository instructions rather
than duplicating a long custom prompt.

### 4. Use small spec-named prompts

Use prompts that name the work:

```text
Explain the Itinerary spec.
```

```text
Plan the Itinerary validation change.
```

```text
Implement the open validation task.
```

The more limited the agent support is, the more important it is to keep each request narrow.

### 5. Verify every result against the spec

Before accepting changes, check:

- the agent found the relevant spec
- modified files are allowed by `Can modify` or `Owns`
- required behavior in `Must` is satisfied
- `Must not` and `Forbids` are preserved
- checks ran or the agent explained why they did not
- task status changed only after verification

## Common mistakes

- Starting the agent outside the folder that contains `AGENTS.md` and `.specdd/bootstrap.md`.
- Testing with a project that has no root or local `.sdd` spec yet.
- Using an agent mode that cannot read repository files.
- Skipping the orientation or explanation check after setup.

## How to verify the result

The setup is working when:

- the agent can explain a local spec in concrete terms
- plans mention allowed files and prohibited changes
- implementation stays inside local authority
- final reports include changed files, checks, and uncertainty

## Related how-tos

- [How to choose between a dedicated plugin and universal Agent Skills](/how-to/set-up-your-agent/how-to-choose-between-a-dedicated-plugin-and-universal-agent-skills/)
- [How to switch your SpecDD setup to a different agent without losing context](/how-to/set-up-your-agent/how-to-switch-your-specdd-setup-to-a-different-agent-without-losing-context/)
- [How to use spec-driven development with humans and agents](/how-to/getting-started/how-to-use-spec-driven-development-with-humans-and-agents/)

## Related reference

- [Quickstart](/quickstart/)
- [Tools](/tools/)
