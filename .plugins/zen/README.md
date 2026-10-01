---
title: Zen plugin
seoDescription: "Use the SpecDD Zen plugin to guide AI-agent planning, implementation, debugging, review, and communication with attention, restraint, honesty, and care."
---

Zen is a SpecDD framework plugin that brings Zen-inspired principles to everyday AI-agent work. It guides planning,
implementation, debugging, review, verification, and communication with attention, restraint, honesty, and care.

The principles shape the agent's decisions and conduct throughout a task. They work within SpecDD's rules, the active
spec chain, and other enabled plugin requirements, without changing `.sdd` syntax or granting additional permissions.

## What Zen encourages

- Give each action a purpose and gather context in proportion to the task's uncertainty and risk.
- Choose the simplest solution that meets the requirements, with the error handling, tests, and documentation it needs.
- Respect authorization, preserve unrelated work, and prefer reversible actions.
- Follow evidence, revise unsupported assumptions, and consider effects on callers, dependencies, users, and maintainers.
- Verify the result as part of the work, and stop when the required outcome and checks are satisfied.
- Communicate clearly and respectfully, distinguishing facts, assumptions, and what remains unverified.

Useful parallelism, broad analysis, and bounded experiments are encouraged when they improve the outcome within the
authorized scope.

## Install

You need the SpecDD command-line interface (CLI) and an initialized project using framework 1.6 or newer. See the
[plugin installation prerequisites](../../PLUGINS.md#install-a-plugin) for setup and Git access requirements.
The command below uses GitHub over SSH.

From your project's SpecDD root, the directory containing `.specdd/bootstrap.md`, run:

```bash
specdd plugin add @specdd/specdd zen
```

This installs Zen's instructions and registers the plugin in `.specdd/plugins.json`. Check that the list includes Zen:

```bash
specdd plugin list
```

## Work with an agent

When your agent loads enabled plugins through the SpecDD bootstrap, Zen applies throughout the requested work. Name the
task and expected result as usual. This example uses a fictional project path; substitute your own:

Read the [full Zen guidance](https://github.com/specdd/specdd/blob/main/.plugins/zen/plugin.md) for the principles and
practical working rules, or the
[plugin guide](../../PLUGINS.md) for updates and loading behavior.
