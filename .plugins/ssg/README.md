---
title: SpecDD Style Guide Plugin
seoDescription: "Use the SpecDD Style Guide (SSG) plugin to write clear specs, DSD documents, and other SpecDD artifacts while preserving their meaning and format."
---

SpecDD Style Guide (SSG) helps humans and agents write clear, useful SpecDD artifacts. It adapts SpecDD's technical
writing guidance to specs, design documents, and other SpecDD content while preserving their requirements and native formats.

Its central principle is: **be concise while preserving what readers need to understand and act.** SSG considers the
audience and purpose of each passage, preserving useful detail and deliberate voice.

SSG is a SpecDD framework plugin. It applies by default to SpecDD artifacts; applying it to other project writing requires
an explicit request.

## Install

You need the SpecDD command-line interface (CLI) and an initialized project. See the
[plugin installation prerequisites](../../PLUGINS.md#install-a-plugin) for setup and Git access requirements.
The command below uses GitHub over SSH.

From your project's SpecDD root, the directory containing `.specdd/bootstrap.md`, run:

```bash
specdd plugin add @specdd/specdd ssg
```

This installs SSG's instructions and registers the plugin in `.specdd/plugins.json`. Check that the list includes SSG:

```bash
specdd plugin list
```

When your agent loads the enabled plugins through the SpecDD bootstrap, it applies SSG to relevant writing in the current
task. To try it, ask for a [review of a spec](#review-a-spec). A review reports findings without editing files.

## What SSG covers

SSG applies according to the purpose of the content:

| Content | Default application |
| --- | --- |
| `.sdd` specs and spec excerpts | Improve prose while preserving native syntax and contract meaning. |
| Domain Definitions and Solution Designs | Apply writing guidance alongside the DSD plugin's document and authority rules. |
| Other SpecDD document types defined by enabled plugins | Preserve the defining plugin's required structure and meaning. |
| SpecDD bootstrap instructions, plugin instructions, and documentation about SpecDD | Apply guidance when the content is selected for authorized work. |
| SpecDD plans, reviews, explanations, and completion reports | Apply to those task deliverables, including agent responses. |
| Ordinary project documentation, product copy, and code comments | Apply only when you explicitly request SSG for them. |

A user guide for your application stays outside SSG's default scope even if a spec owns it or an agent generates it from
specs. A guide explaining how your team uses SpecDD is in scope. In a document containing both, SSG applies only to the
SpecDD-specific material selected by the task.

Installing SSG does not start a cleanup or authorize additional edits. The requested task and applicable SpecDD rules
continue to determine what the agent may change.

## What the guidance changes

SSG helps writers put the main point first, organize information around readers' tasks, explain unfamiliar terminology,
and provide usable instructions and examples. It favors connected prose, precise claims, meaningful headings, and
formatting suited to the artifact.

A style edit preserves requirement strength, conditions, exceptions, values, identifiers, paths, and verification meaning.
When unclear wording requires a decision about intended behavior, the agent raises that issue through the applicable
SpecDD workflow. A style preference cannot decide the behavior.

For example, these excerpts from a fictional `src/trips/itinerary.sdd` express the same requirement.

Before:

```sdd
Must:
  When the place name is empty, it is necessary for validation to fail and for no itinerary item to be stored.
```

After:

```sdd
Must:
  When the place name is empty, validation fails and no itinerary item is stored.
```

The shorter wording keeps the trigger and both required outcomes. Native labels such as `Must` retain their exact
spelling. SSG follows the active bootstrap's syntax rules; see the [language reference](../../LANGUAGE.md) for the format.

## Use SSG with DSD

SSG can be used on its own or alongside [Domain & Solution Design (DSD)](../dsd/README.md). DSD defines the design document
types, ownership, sources, and relationships; SSG guides the writing within those rules.

Follow the recommended design sequence: Domain Definition, Solution Design, then implementation specs. SSG applies to
each as you draft or review it, including before any implementation exists. It preserves DSD's required headings, stable
IDs, requirement strength, and references. For example, a sentence-case preference does not rename
`# Domain Definition: Trip Planning` or `BR-1`.

## Work with an agent

Name the deliverable and target. The examples use fictional project paths; substitute your own.

### Review a spec

```text
Review src/trips/itinerary.sdd using the enabled SpecDD Style Guide plugin.
Identify writing problems that make its requirements, tasks, or completion
criteria harder to understand. Preserve the distinction between style issues
and unresolved behavior decisions. Report findings without changing files.
```

### Improve a Solution Design

```text
Apply the SpecDD Style Guide to dsd/trip-planning/itinerary.md.
Improve organization and wording while preserving its requirements, sources,
decisions, identifiers, and realization mappings. Follow the DSD plugin's rules.
Do not change implementation.
```

### Apply SSG to other writing

To extend SSG beyond SpecDD artifacts, explicitly name that scope. For example:

```text
For this task, apply the SpecDD Style Guide to docs/user-guide.md, even though
it is application documentation. Improve its instructions and examples while
preserving the documented behavior and deliberate voice.
```

That request covers the named document for the task. It does not extend SSG to all project writing or grant permission
to edit other files. You can also explicitly request a continuing scope extension in your project instructions; state
which content it covers.

## Relationship to the writing style guide

SSG is derived from this repository's `STYLE-GUIDE.md`, with scope and format rules for SpecDD artifacts. Its
installed `plugin.md` contains the guidance the agent needs; consuming projects do not need a copy of the source guide.

See the [plugin guide](../../PLUGINS.md) for installation, updates, and how framework plugins load.
