---
title: "How to verify an agent has loaded SpecDD skills correctly"
seoDescription: "Verify that an agent has loaded SpecDD skills for a spec-driven development workflow by checking orientation, spec explanation, planning, authority, and verification behavior."
excerpt: "Use small orientation, explanation, planning, and review requests to confirm an agent is using SpecDD skills and project specs correctly."
level: "Beginner"
howtoID: "1021013"
weight: 140
---

This guide shows you how to verify that an agent has loaded SpecDD skills for a spec-driven development workflow or is
otherwise following SpecDD project context correctly.

Do this after installing a dedicated plugin, deploying universal Agent Skills, or switching to a new agent.

## What good behavior looks like

A SpecDD-ready agent should:

- recognize the project bootstrap files
- identify relevant `.sdd` specs for a task
- distinguish read context from write authority
- plan before broad implementation work
- preserve `Must not` and `Forbids` constraints
- run useful checks or explain why it could not
- update `Tasks` only after verification

## Steps

### 1. Check the setup files

For any SpecDD project, confirm:

```text
AGENTS.md
.specdd/bootstrap.md
<root-name>.sdd
```

For universal Agent Skills, confirm that the skills exist in the directory your client reads:

```text
.agents/skills
```

or:

```text
~/.agents/skills
```

For dedicated plugins, check the agent's plugin or skills list according to that agent's install system.

### 2. Ask for orientation

Use:

```text
Orient in this SpecDD project.
```

A good answer should mention SpecDD bootstrap context and explain what it inspected.

### 3. Ask for a spec explanation

Use a real spec or feature name:

```text
Explain the Itinerary spec.
```

A good answer should summarize the spec's purpose, allowed modification scope, required behavior, prohibited behavior,
and open tasks if present.

### 4. Ask for a plan before implementation

Use:

```text
Plan the Itinerary validation change.
```

A good plan should identify:

- the governing specs
- the paths likely to change
- constraints that must be preserved
- checks to run
- uncertainty or missing authority

### 5. Check a small implementation

Use a narrow task:

```text
Implement the open validation task.
```

Review the result against the local spec. The agent should stay inside `Can modify` or `Owns`, satisfy `Must`, avoid
`Must not` and `Forbids`, and report verification.

## Warning signs

- The agent gives generic repository advice and never mentions `.sdd` specs.
- The agent treats sibling specs as automatically applicable.
- The agent edits files listed only under `Can read` or `References`.
- The agent marks a task done before running or explaining checks.
- The agent expands the work into unrelated cleanup.

## Common mistakes

- Verifying only that an install command succeeded.
- Testing with a project that has no local spec for the requested work.
- Asking for a large feature as the first verification test.
- Ignoring a vague plan because the final code happens to compile.

## Related how-tos

- [How to install SpecDD universal Agent Skills for any agent](/how-to/set-up-your-agent/how-to-install-specdd-universal-agent-skills-for-any-agent/)
- [How to choose between a dedicated plugin and universal Agent Skills](/how-to/set-up-your-agent/how-to-choose-between-a-dedicated-plugin-and-universal-agent-skills/)
- [How to run your first spec-driven change end to end](/how-to/getting-started/how-to-run-your-first-spec-driven-change-end-to-end/)

## Related reference

- [Tools](/tools/)
- [Language reference](/language-reference/)
