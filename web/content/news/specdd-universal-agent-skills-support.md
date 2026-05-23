---
title: "SpecDD adds universal Agent Skills support"
date: 2026-05-24T01:35:51+02:00
seoDescription: "SpecDD now publishes universal Agent Skills, giving many compatible agents access to the SpecDD workflow through CLI or GitHub installation."
---

SpecDD now supports the [Agent Skills](https://agentskills.io/home) standard. That means agents and tools that understand
Agent Skills can use SpecDD's project workflow even when they do not have a dedicated SpecDD plugin.

The universal Agent Skills package gives compatible agents the same SpecDD skills used by the dedicated integrations:
orientation, explanation, planning, implementation, review, testing, tracing, task handling, documentation, refactoring,
debugging, risk assessment, and SpecDD adoption work.

The skills help an agent read the active `.specdd/bootstrap.md` chain, resolve local `.sdd` authority, and stay aligned
with the project's own specs while it works.

There are two supported ways to install them.

The recommended path is the SpecDD CLI:

```bash
specdd agentskills deploy
```

That installs the latest signed SpecDD Agent Skills release into the current project's `.agents/skills` directory. You
can also deploy into another project path, install into `~/.agents/skills` with `--user`, or pin a release with
`--version`.

The GitHub method is useful when you want to inspect the package first, test it locally, or install in an environment
where the CLI is not available:

```bash
git clone https://github.com/specdd/agentskills.git /tmp/specdd-agentskills
CLIENT_SKILLS_DIR=/path/to/client/skills
mkdir -p "$CLIENT_SKILLS_DIR"
cp -R /tmp/specdd-agentskills/specdd-* "$CLIENT_SKILLS_DIR"/
```

The universal package is published from [github.com/specdd/agentskills](https://github.com/specdd/agentskills). It is
generated from the same shared SpecDD skills as the dedicated agent plugins, so the behavior stays aligned across both
paths.

Setup instructions are available on the [Tools page](/tools/).
