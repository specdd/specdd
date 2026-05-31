# SpecDD

SpecDD™ is an open-source framework for **specification-driven development** in software, infrastructure, automation,
and documentation projects. It gives humans and AI agents a shared source of truth for intent, requirements, boundaries,
and completion criteria.

The SpecDD framework uses small, local, human-readable `.sdd` files that live beside the code, infrastructure,
workflows, or documentation they describe. These specs document intent, architecture, behavior, boundaries, and
local work tasks in a way that both human developers and AI coding agents can follow.

SpecDD gives development, product, QA, support, operations, and engineering teams a shared way to preserve intent before
AI tools or developers turn incomplete requirements into plausible but wrong software.

SpecDD works for both greenfield and existing projects. In new projects, specs can define structure before
implementation starts. In existing projects, specs can be introduced gradually around modules, services, features, or
files that are actively changing.

## How it works

SpecDD is deliberately simple. Use the CLI to add the framework bootstrap files to your project.

After initialization, place small `.sdd` specs beside the files or project areas they describe. If your AI agent does
not automatically read the SpecDD bootstrap, tell it to read `.specdd/bootstrap.md` before it starts working. The agent
then uses those specs as local source-of-truth context for implementation.

## Agent compatibility

SpecDD is agent-agnostic. It works with all major file-aware coding agents, including OpenAI Codex, Claude Code,
GitHub Copilot cloud agent and Copilot agent mode, Cursor Agent, Windsurf Cascade, Gemini CLI, Google Jules, JetBrains
Junie, Amazon Q Developer, Replit Agent, Sourcegraph Amp, Augment Code, Cline, Zed Agent, OpenCode and others.

If an agent can read repository files and follow project instructions, it can use SpecDD. There is
no plugin lock-in, hosted memory silo, or vendor-specific format. Specs live in Git, beside the project files they
describe, where both humans and agents can use them.

## Official project and community

The official SpecDD project is published at:

- Website: https://specdd.ai/
- Tools and setup guide: https://specdd.ai/tools/
- Source repository: https://github.com/specdd/specdd
- Language specification: [LANGUAGE.md](LANGUAGE.md)
- CLI source and help: https://github.com/specdd/cli
- Release downloads: https://github.com/specdd/specdd/releases

Community links:

- Reddit: https://www.reddit.com/r/specdd/
- IRC: `#specdd` on Libera.Chat

## Quickstart

Start with the [guided quickstart](https://specdd.ai/quickstart/) for the shortest setup path.

It walks through installing the CLI, initializing a project, adding a root spec, adding a local same-basename spec, and
giving an agent a focused change request.

## Tooling

The SpecDD CLI manages setup and framework updates. The core workflow still uses plain files and should work with any
editor, any repository, and any AI coding agent that can read project files.

Official [tools and setup instructions](https://specdd.ai/tools/) are the current inventory for the SpecDD CLI, agent
plugins, editor integrations, and any additional tooling as it becomes available.

The formal `.sdd` language specification is maintained in [LANGUAGE.md](LANGUAGE.md). It is strongly recommended to
follow the documented language closely and avoid inventing custom syntax. Future tooling will rely on the current
conventions.

## Set up a project

To start with SpecDD, install the official CLI tool. It requires Node.js 22 or newer. The
[tools and setup guide](https://specdd.ai/tools/) covers CLI, agent plugin, and editor setup options.

```bash
npm install --global specdd
```

```bash
yarn global add specdd
```

```bash
brew tap specdd/cli
brew install specdd
```

Initialize SpecDD in the current directory:

```bash
specdd init
```

Initialize SpecDD in another directory:

```bash
specdd init path/to/project
```

Or run the CLI with Docker by mounting your project at `/workspace`:

```bash
# From DockerHub
docker run --rm -v "$PWD:/workspace" specdd/cli:latest init
# From Github Container Registry
docker run --rm -v "$PWD:/workspace" ghcr.io/specdd/cli:latest init
```

For CLI update commands, version options, file-safety details, and other command behavior, run `specdd --help`,
`specdd <command> --help`, or see https://github.com/specdd/cli.

## Example

A complete working example is available in the SpecDD example repository: https://github.com/specdd/example. It
demonstrates a small Travel Planner with SpecDD bootstrap files, colocated .sdd specs, source code, tests, and agent
entrypoint files.

```sdd
Spec: Itinerary

Purpose:
  Keep a trip itinerary organized by day.

Owns:
  ./itinerary.js

Must:
  When the place name and date are present, an itinerary item exists.
  Itinerary items appear grouped by trip day.

Must not:
  Manage destination search results.

Exposes:
  Itinerary.addPlace(input)

Scenario: add place to itinerary
  Given the Paris trip has no itinerary items
  When "Louvre Museum" is added for "2026-06-12"
  Then "Louvre Museum" appears on the June 12 itinerary
```

## The problem SpecDD solves

Technical projects are hard to reason about because the relevant context is usually large, scattered, stale, or
implicit. Important decisions, constraints, and assumptions are spread across code, docs, tickets, conversations, and
individual memory. Humans feel this during handoffs, onboarding, review, maintenance, and incident response. AI agents
expose the same problem faster because they can produce implementation quickly without the project memory a human team
has built up.

SpecDD is built around a simple shift: stop treating the prompt as the source of truth. The prompt is temporary, narrow,
and easy to lose. In AI-assisted delivery, the source of truth needs to survive across sessions, tools, contributors,
reviews, and product changes.

SpecDD solves this by chunking a project into small, local specification units. Each spec gives humans and agents a
concrete source of truth for one part of the system. Instead of stuffing a huge architecture document into every prompt,
the agent resolves the relevant spec chain and works inside that bounded context.

At a business level, SpecDD turns scattered intent into a durable project asset. Reviewers can compare a patch against a
local contract instead of reconstructing the contract from memory, new contributors can learn the area they are touching
without reading every historical discussion, and teams can preserve the reasoning behind important behavior in the
repository itself.

SpecDD helps with:

- breaking large projects into small implementation areas
- giving agents and teams durable project context inside the repository
- giving AI prompts concrete local source of truth
- structuring otherwise loose design documents
- preserving architecture and ownership boundaries
- capturing business behavior near implementation
- recording local work tasks where the work happens
- improving consistency between code, tests, and intent

In private internal testing:

- SpecDD reduced observed correction loops from roughly 10-20 prompt-and-correction cycles to 1-2 cycles for comparable
  feature and service-class work on commercial code.
- Some comparable work moved from multi-day iteration to same-afternoon completion.
- In out-of-domain experiments, SpecDD reduced observed time to live by 75%-89% compared with unstructured AI-assisted
  coding workflows.
- Compared with root-level documentation workflows, SpecDD reduced observed time to deliver by 55%-67% in the same
  out-of-domain test pattern.

These are internal observations, not guarantees. While experimenting with SpecDD, software quality has generally
remained high and at times improved as specs were adopted, largely because important rules, boundaries, and expectations
became explicit.

SpecDD also tends to encourage better software design by its mere presence. To write useful specs, developers must name
responsibilities, define boundaries, state non-goals, and decide where behavior belongs.

## What SpecDD is

SpecDD is a framework and reference format for organizing file-based technical projects around source-adjacent
specification files.

A SpecDD spec describes a part of a system:

- what stable outcome or responsibility it provides
- what it owns
- what it may modify
- what it may read
- what outcomes, invariants, or behaviors must hold
- what nearby boundaries, non-goals, or forbidden behavior might otherwise be confused with it
- what it may depend on
- what behavior it must support
- what local tasks remain to satisfy its contract
- what completion criteria show the contract holds

Specs live near the files or project areas they describe.

Example:

```text
travel-planner/
  travel-planner.sdd              # Project-wide intent and rules
  src/
    trips/
      trips.sdd             # Rules for the trip planning area
      itinerary.sdd         # Rules for itinerary.js
      itinerary.js
      itinerary.test.js
      trip-storage.sdd      # Rules for saving trips
      trip-storage.js
      trip-storage.test.js
    destinations/
      destinations.sdd      # Rules for destination search
      destination-search.sdd
      destination-search.js
    ui/
      itinerary-view.sdd    # Rules for the itinerary screen
      itinerary-view.js
```

The goal is not to create large requirements documents. The goal is to create many small, useful contracts that guide
implementation.

SpecDD is useful without AI because it gives humans a shared, local, reviewable contract for intent, behavior, and
boundaries. It is especially useful with AI agents because the same contract gives them durable local context inside the
repository.

SpecDD is language-agnostic. It can be used with JavaScript, TypeScript, Python, Go, PHP, Java, C#, Rust, Ruby, shell,
Ansible, Terraform, CI pipelines, documentation projects, or other file-based technical systems. It can be used with
object-oriented, functional, procedural, service-oriented, infrastructure-as-code, automation, or mixed styles. The main
assumption is that project work is organized in files.

## Workflow

The recommended workflow is **spec-first**, similar in spirit to BDD.

Typical flow:

1. Write or update the relevant `.sdd` spec.
2. Review and edit the spec until it expresses the intended behavior and boundaries.
3. Prompt an AI agent or developer to implement the spec.
4. Run tests and checks.
5. Update tasks and specs as needed.

This works well in two modes.

First, a developer can write the spec manually and then ask an agent to implement it:

```text
Read .specdd/bootstrap.md, resolve the relevant SpecDD chain, and implement it.
```

Second, a developer can ask an agent to draft specs, review them, edit them as needed, and then ask for implementation:

```text
Create SpecDD specs for the trip planning area. Do not implement code yet.
```

After review:

```text
Implement the itinerary spec only.
```

Both workflows work well. The important part is that implementation should be driven by reviewed specs, not by vague
prompts alone.

## Basic project layout

SpecDD bootstrap instructions live in `.specdd`. The root spec must live at the selected content root and must be named
after that root directory.

Example: if the selected content root is `/home/bob/Projects/travel-planner/`, the root spec is:

```text
/home/bob/Projects/travel-planner/travel-planner.sdd
```

The examples use `Travel Planner` for human-facing names, `TravelPlanner` for code identifiers, and `travel-planner`
for directories and root spec filenames.

For a project named `travel-planner`, a minimal layout is:

```text
travel-planner/
  .specdd/
    bootstrap.md              # Global SpecDD behavior
    bootstrap.project.md      # Project-specific rules
    bootstrap.local.md        # Local operator or environment overrides (git-ignored)
  travel-planner.sdd                # Root project spec
```

Load order:

```text
.specdd/bootstrap.md
-> .specdd/bootstrap.project.md
-> .specdd/bootstrap.local.md
```

Later bootstrap files may narrow or add local context. They should not silently weaken project contracts, inherited
constraints, or write authority.

## The role of the bootstrap file

The bootstrap file explains SpecDD rules to an AI agent.

It tells the agent how to:

- resolve specs
- follow inheritance
- respect local authority
- interpret tasks
- handle conflicts
- avoid broad edits
- keep code, tests, specs, and tasks aligned

A project can include a short `CLAUDE.md`, `AGENTS.md`, or similar file that simply tells the agent to read
`.specdd/bootstrap.md`.

Example:

```md
# AGENTS.md

Before working on this project, read `.specdd/bootstrap.md`.

Assume the role, rules, workflow, and implementation constraints described in SpecDD. Treat SpecDD specs as
source-adjacent development contracts, not optional documentation. Adhere to SpecDD rules unless explicitly
instructed otherwise.
```

The bootstrap file is for agents. The `.sdd` files are for both humans and agents.

## Spec files

SpecDD specs use the `.sdd` extension.

Named specs are allowed when multiple specs exist in one directory and unsuffixed names would collide or be ambiguous.

```text
itinerary.sdd
trip-storage.sdd
itinerary-filter.sdd
itinerary.component.sdd
```

Common non-root spec names include - adapt these to your platform's naming conventions as needed, including
capitalization:

```text
module.sdd
feature.sdd
service.sdd
model.sdd
adapter.sdd
api.sdd
component.sdd
job.sdd
event.sdd
policy.sdd
workflow.sdd
operation.sdd
interface.sdd
dataset.sdd
schema.sdd
runbook.sdd
```

A good default is to omit the suffix when the directory already makes the role clear. For example:

```text
src/trips/itinerary.sdd
src/trips/itinerary.js
```

A suffix is useful when the folder does not disambiguate. For example:

```text
src/trips/itinerary.component.sdd
src/trips/itinerary.component.js
```

Spec names and locations help humans and agents navigate, but they do not create authority by themselves.
Same-directory basename matching is an explicit SpecDD rule: when a target file and a `.sdd` file live in the same
directory and share the same basename, the `.sdd` file is the matching local spec for that target. Matching is
case-insensitive, but an exact filename match is preferred when present. If several case-insensitive matches exist and
none is exact, tools should report ambiguity instead of guessing.

Directory-level specs can also use a same-basename relationship with the directory they govern. This is described in
more detail in [Directory and target resolution](#directory-and-target-resolution).

## Naming conventions for project files

Aligning spec and source file naming as closely as possible improves how reliably agents locate and apply specs.
The guidance below describes sensible defaults - if your platform, language, or team already has established naming
conventions, follow those instead and apply them consistently across the project.

When no existing convention applies, consider this priority order:

1. Follow existing project naming conventions.
2. If the folder already describes the thing, do not suffix.
3. If the folder does not describe the thing, use a descriptive suffix.

Prefer option 2 when project naming is not defined.

Examples:

```text
models/trip.js
views/itinerary.js
storage/trip-storage.js
```

Use suffixes when needed:

```text
trip.model.js
itinerary.component.js
trip-storage.adapter.js
```

## Path-based resolution

SpecDD resolution is path-based. Applicable specs come from ancestor specs, directory-level specs, explicit `References`,
and same-directory basename matches.

The selected content root is the highest relevant project boundary used for `/` paths, spec indexing, and resolution.
It is usually the repository or workspace root unless the project configures a different SpecDD root.

When working on a target path, agents should:

1. Classify the target as a directory, a `.sdd` spec file, or an ordinary file.
2. Treat a `.sdd` target as the target spec itself.
3. Include the same-directory basename spec when the target is an ordinary file and such a spec exists.
4. Walk upward through parent directories to the selected content root.
5. Collect specs whose declared governing scope applies to the target.
6. Read the inherited chain from the selected content root to target.
7. Include explicit `References` declared by included specs when they affect the task or context.

Example:

```text
travel-planner/
  travel-planner.sdd              # Project-wide rules
  src/
    trips/
      trips.sdd             # Rules for the trip planning area
      itinerary.sdd         # Rules for itinerary.js
      itinerary.js
```

For work on this target inside `travel-planner/`:

```text
src/trips/itinerary.js
```

the effective spec context is:

```text
travel-planner.sdd
src/trips/trips.sdd
src/trips/itinerary.sdd
```

This means the itinerary spec inherits rules from the trip-planning spec and the root project spec.

Do not infer the applicable spec, ownership, or write authority from similar names in other directories, symbols,
programming languages, module names, test names, or tool-specific conventions unless a project-specific spec or
configuration explicitly defines that mapping.

The core rule is:

```text
Vertical inheritance is implicit.
Other context, including horizontal references, are explicit.
```

Parent specs are automatically inherited. Sibling specs are not.

## Directory and target resolution

Most SpecDD work starts from a requested target. That target might be a directory, a `.sdd` file, or an ordinary project
file. Classifying it first keeps tools and agents from treating nearby files as authority just because they look related.

If the target is already a `.sdd` file, that file is the target spec. If the target is an ordinary file, a same-directory
same-basename `.sdd` file is the local spec when one exists. Matching is case-insensitive so projects can follow
platform conventions such as `Trip.ts` and `Trip.sdd`, but exact filename matches should win. If two case-only
matches compete and neither is exact, the correct result is ambiguity, not a guess.

Directory targets have their own convention. A directory can be described by a same-basename spec inside the directory,
or by a same-basename spec held by its parent directory.

```text
src/
  trips.sdd          # Parent-held rules for src/trips/
  trips/
    trips.sdd        # Local rules for src/trips/
    itinerary.js
    itinerary.sdd    # Rules for itinerary.js
```

For work on `src/trips/itinerary.js`, both `src/trips.sdd` and `src/trips/trips.sdd` may contribute directory
context, and `src/trips/itinerary.sdd` may be the file-level local spec. Parent-held and local directory specs are
cumulative context, not ambiguity. When both exist, read parent-held context before local context for that directory.

The same rule applies at the selected content root. If the content root directory is named `travel-planner`, the root spec
must be `travel-planner.sdd` in that directory. This is the project root spec, not a separate syntax feature.

When following explicit path references to find related specs, tools should follow links from these sections:

- `Structure`
- `Owns`
- `Can modify`
- `Can read`
- `References`
- `Depends on`

They should not use `Forbids` or `Exposes` to expand related-spec context, even though those sections may still contain
paths that generic indexes can record.

An exact path to a `.sdd` file resolves to that spec. An exact path to an ordinary file resolves to its same-basename
spec when present. An exact path to a directory resolves only to directory-level specs for that directory. A non-glob
directory path such as `../tags` should not recursively include every descendant `.sdd` file; recursive inclusion should
use an explicit glob such as `../tags/**/*.sdd`.

## Multiple hierarchies

A codebase can contain multiple spec hierarchies.

Only the target path’s ancestor tree is relevant.

Example:

```text
src/
  trips/
    module.sdd
  tags/
    module.sdd
```

When working inside `src/trips`, do not automatically load `src/tags/module.sdd`.

Use explicit references when one area needs another area’s contract.

```sdd
References:
  ../tags/tag.sdd
```

## Constraint inheritance

Parent specs provide constraints and context. Child specs add or narrow them.

A child spec may:

- add more specific rules
- narrow allowed behavior
- add local responsibilities
- add local tasks
- define local behavior

A child spec must not silently:

- loosen parent constraints
- ignore parent `Must not` rules
- use parent-forbidden dependencies
- expand modification scope beyond local authority
- contradict inherited architecture

If two specs conflict, the stricter rule wins unless the Operator explicitly resolves the conflict.

## Write authority

Inherited specs provide context and constraints. The nearest relevant local spec provides write authority.

By default, an implementation should modify only files listed in the nearest spec’s:

```sdd
Can modify:
```

or, if absent:

```sdd
Owns:
```

Example:

```sdd
Spec: Itinerary

Owns:
  ./itinerary.js
  ./itinerary.test.js
```

If `Can modify` is absent, `Owns` acts as the modification boundary.

Parent specs do not automatically grant broad edit rights. A module spec can define architectural context for a whole
module, but a service-level task should not freely edit the whole module unless the local spec allows it.

If no local spec exists but a parent spec applies, use the nearest applicable parent spec and modify only the smallest
necessary set of files. If no applicable spec can be found, ask the Operator to identify or create the relevant spec
before making changes.

## Universal spec language

All specs use the same basic language. Not every section is required for every spec.

The defined sections are grouped by purpose. Identity sections are `Spec`, `Platform`, and `Purpose`. Scope and
ownership sections are `Structure`, `Owns`, `Can modify`, `Can read`, and `References`. Requirement sections are `Must`,
`Must not`, and `Forbids`. Contract sections are `Depends on`, `Exposes`, `Accepts`, `Returns`, `Raises`, and `Handles`.
Workflow and behavior sections are `Tasks`, `Done when`, `Scenario`, and `Example`.

A spec should include only sections that add useful local information.

### Core syntax rules

- A complete `.sdd` file starts with `Spec: Name`.
- Section labels are exact and case-sensitive.
- Section headers start at column 0.
- Body entries use two spaces. Continuation lines use four or more spaces.
- Use spaces for indentation, not tabs.
- Only `Spec`, `Platform`, `Scenario`, and `Example` may put text after the colon.
- `Spec` and `Platform` are inline-only sections.
- `Tasks` accepts task lines only.

### Paths, symbols, and body entries

- Explicit paths start with `./`, `../`, or `/`.
- Unprefixed filenames are treated as text, not path references.
- Globs use the same explicit path prefixes, for example `./src/**/*.ts`.
- Symbol references use `@Name`.
- Body sections may mix prose, paths, symbols, and key-value lines.
- Key-value lines use `key: value` with a literal space after `:`. A line like `key:` is text.

### Comments

Specs may include whole-line comments prefixed with `#`.

```sdd
# This is a comment
```

Comment rules:

- A comment line begins with optional whitespace followed by `#`.
- Comments are ignored as spec content.
- Comments do not create requirements, constraints, tasks, or write authority.
- Inline trailing comments are not recognized as comments. Text after other syntax is ordinary line content.

Use comments sparingly. If a line affects required behavior, express it as `Must`, `Must not`, `Tasks`,
`Scenario`, or `Done when` instead.

## Section reference

### Spec

Names the thing being specified.

```sdd
Spec: Itinerary
```

### Platform

Describes technical platform, runtime, framework, or tool stack. Use it sparingly at the root or major area where it
adds inheritable technical context.

Labels should be concise, stack-like, and slash-separated when multiple terms are present:

```text
language[/qualifier[/qualifier]]
```

Examples:

```text
Platform: JavaScript/ES6
Platform: Python/Django/5.2
Platform: TypeScript/Node/Express
```

### Purpose

A short statement of why this part exists.

```sdd
Purpose:
  Let someone add places to a trip and review the itinerary.
```

### Structure

Describes file and directory structure for the current and descendant scope.

Common forms:

```text
explicit-path-or-glob
explicit-path-or-glob: description
prose text
```

Example:

```sdd
Structure:
  ./src: Source code
  ./src/trips: Trip planning behavior
  ./src/trips/itinerary.js: Main itinerary code
  ./tests: Test suite
```

This section helps humans and agents understand local organization without reading the whole tree.

### Owns

Files, directories, symbols, concepts, or responsibilities owned by the spec. Only one spec should own a specific item
at any given time.

```sdd
Owns:
  ./itinerary.js
  ./itinerary.test.js
```

### Can modify

Files or paths that may be changed when working under this spec.

```sdd
Can modify:
  ./itinerary.js
  ./itinerary.test.js
```

Use this when writable scope should be narrower or different from ownership.

### Can read

Files, paths, specs, or prose context that may be read for context.

```sdd
Can read:
  ../storage/trip-storage.sdd
  ../destinations/destination.sdd
```

### References

Explicit references to other specs, contracts, or context.

```sdd
References:
  ../storage/trip-storage.sdd
  ../destinations/destination.sdd
```

Use references for context outside the inherited chain. References do not create inherited authority.

### Must

Responsibilities, rules, and required behavior.

```sdd
Must:
  When the place and date are present, an itinerary item exists.
  Each itinerary item remains assigned to a trip day.
  Itinerary items appear in chronological order.
```

### Must not

Forbidden behavior, non-goals, and architectural boundaries.

```sdd
Must not:
  Delete itinerary items when trip dates change.
  Change destination search behavior.
  Mix booking purchase behavior into the itinerary.
```

### Forbids

Forbidden dependencies, paths, modules, libraries, or architectural access.

```sdd
Forbids:
  localStorage direct writes
  ../booking/*
  ../destinations/editor/*
```

### Depends on

Allowed dependencies, collaborators, modules, ports, libraries, or abstractions.

```sdd
Depends on:
  TripStorage
  DestinationSearch
```

`Depends on` does not override inherited `Forbids` or `Must not`.

### Exposes

Public exports, endpoints, commands, components, events, or interfaces.

```sdd
Exposes:
  Itinerary.addPlace(input)
  Itinerary.movePlace(id, date)
```

### Accepts

Inputs accepted by this unit.

```sdd
Accepts:
  place name
  trip date
```

### Returns

Outputs produced by this unit, such as returned values, responses, result states, generated artifacts, output files,
exit
values, or other observable results.

```sdd
Returns:
  updated itinerary
  validation message when an itinerary item cannot be added
```

### Raises

Errors this unit may raise or return.

```sdd
Raises:
  ItineraryPlaceRequired
  ItinerarySaveFailed
```

### Handles

Errors, events, messages, states, or cases this unit must handle.

```sdd
Handles:
  missing place name
  missing trip date
  save failure
  moving a missing itinerary item
```

### Tasks

A lightweight local implementation checklist.

```sdd
Tasks:
  [ ] Show a clear message for a missing place name.
  [ ] Keep itinerary items sorted after moving a place.
```

Tasks are described in more detail below.

### Done when

Completion criteria.

```sdd
Done when:
  Adding a place has a test.
  Moving a place to another day has a test.
  The itinerary does not change destination search or booking behavior.
```

### Scenario

A behavioral example written in a Gherkin-like style.

```sdd
Scenario: add a place
  Given the Paris trip has no itinerary items
  When "Louvre Museum" is added for "2026-06-12"
  Then "Louvre Museum" appears on the June 12 itinerary
  And the itinerary remains assigned to the Paris trip
```

Scenarios define behavior that should be satisfied and checked when relevant.

### Example

Small concrete examples, payloads, usage snippets, or expected transformations.

Use examples sparingly.

## Tasks

Specs may include lightweight local work tasks.

Tasks let developers control implementation order without using a separate project-management system.

Example:

```sdd
Tasks:
  [ ] Show a clear message for a missing place name.
  [ ] Keep itinerary items sorted after a date change.
  [ ] Save the itinerary after adding a place.
  [ ] Add tests for adding and moving itinerary items.
```

Allowed task states:

```text
[ ] open
[x] done
[X] done
[-] skipped
[!] blocked
[?] needs decision
```

Examples:

```sdd
Tasks:
  [x] Add a place to the itinerary.
  [ ] Show a clear message for a missing place name.
  [!] Decide what to show when saving fails.
  [?] Confirm whether the same place can appear on more than one day.
  [-] Skip hotel booking; owned by trip-booking feature.
```

Optional task IDs may be used:

```sdd
Tasks:
  [ ] #1 Show a clear message for a missing place name.
  [ ] #2 Keep itinerary items sorted after a date change.
  [ ] #3 Add tests for saving failure.
```

Task rules:

- Tasks are local to the spec where they appear.
- Tasks are work guidance, not architecture overrides.
- Tasks must not contradict `Must`, `Must not`, `Forbids`, or inherited constraints.
- Parent tasks are planning context, not automatically actionable in child specs.
- Only update task status in the currently targeted spec unless instructed otherwise.
- Prefer completing one task or a small related group of tasks at a time.
- Do not complete unrelated tasks opportunistically.
- Mark `[x]` only when the relevant change and checks are complete.
- Use `[!]` for blocked work.
- Use `[?]` for unresolved design decisions.

## Spec levels

SpecDD commonly uses the following spec levels.

You do not need every level in every project. Use the levels that add clarity.

SpecDD is adaptable to different project structures, languages, styles, and frameworks. The examples below are
illustrative, not prescriptive. Use specs and bootstrap overrides to adapt SpecDD to your project.

Important: remember that suffixes for the spec names are OPTIONAL and should be skipped when spec location implies
the spec level or component already.

### Root project spec

Defines global application context and architecture.

The filename must match the selected content root directory basename.

```text
travel-planner/
  travel-planner.sdd
```

Example:

```sdd
Spec: Travel Planner

Purpose:
  Small application for planning trips and organizing itinerary items.

Must:
  Trips can be created by a person.
  Places can be added to an itinerary.
  Keep itinerary items grouped by trip day.
  Keep trip planning behavior under `./src/trips`.

Must not:
  Purchase bookings or tickets.
  Store trip data outside the configured storage code.
```

### Module spec

Defines a bounded domain or subsystem.

Typical file:

```text
module.sdd
```

Example:

```sdd
Spec: Trips Area

Purpose:
  Provide the part of the app where people plan trips.

Owns:
  ./src/trips/*

Must:
  Trips have a destination and date range.
  Places can be added to a trip itinerary.
  Itinerary items remain grouped by day.
  Changes are saved through trip storage.

Must not:
  Purchase bookings.
  Manage destination search results.
```

### Feature spec

Defines a user-visible or business capability.

Typical file:

```text
feature.sdd
```

Example:

```sdd
Spec: Add Place To Itinerary

Purpose:
  Places can be added to a trip itinerary.

Must:
  An existing trip is required.
  A place name is required.
  When the trip and place are valid, the place appears on the selected trip day.

Must not:
  Create a new trip automatically.
  Purchase bookings or tickets.
  Change destination search results.

Scenario: trip exists
  Given a Paris trip exists
  When the person adds "Louvre Museum" for "2026-06-12"
  Then "Louvre Museum" appears on the June 12 itinerary
  And the Paris trip remains selected
```

### Service spec

Defines orchestration or application/domain service behavior.

Typical files:

```text
itinerary.sdd
itinerary.service.sdd
```

Example:

```sdd
Spec: Itinerary Behavior

Purpose:
  Keep the visible itinerary current as places are added or moved between days.

Owns:
  ./itinerary.js
  ./itinerary.test.js

Must:
  A missing place name is rejected.
  After a place is added, itinerary changes are saved.
  Itinerary items remain grouped by day.

Must not:
  Change destination search behavior.
  Purchase bookings or tickets.

Depends on:
  TripStorage
  DestinationSearch

Tasks:
  [ ] Show a clear message for a missing place name.
  [ ] Add tests for adding and moving itinerary items.

Scenario: missing place name is rejected
  Given the place name is empty
  When the person adds a place
  Then a validation message is shown
  And no itinerary item is stored
```

### Model spec

Defines domain state, entities, value objects, and invariants.

Typical files:

```text
itinerary-item.sdd
itinerary-item.model.sdd
```

Example:

```sdd
Spec: Itinerary Item

Purpose:
  Represent one planned place or activity in an itinerary.

Must:
  A nonempty place name is stored.
  The trip day is tracked for the item.
  Display order remains stable within the day.

Must not:
  Persist itself to storage.
  Purchase bookings or tickets.
```

### Adapter spec

Defines a boundary implementation for an external system.

Typical files:

```text
trip-storage.sdd
trip-storage.adapter.sdd
```

Example:

```sdd
Spec: Trip Storage

Purpose:
  Persist and retrieve trips and itinerary items.

Must:
  Trip changes are saved.
  Previously saved trips are loaded when the app starts.
  Save failures are reported in a way the itinerary can show to the person.

Must not:
  Change place names.
  Move itinerary items between days.
  Decide which itinerary items are visible.

Depends on:
  browser local storage
```

### API spec

Defines an inbound interface such as HTTP, GraphQL, RPC, CLI, or webhook.

Typical files:

```text
create-trip.sdd
create-trip.api.sdd
```

Example:

```sdd
Spec: Create Trip API

Purpose:
  Accept requests to create trips.

Must:
  A trip name is required.
  A destination is required.
  Missing required fields return a clear validation error.

Must not:
  Create itinerary items.
  Bypass trip storage.
  Purchase bookings or tickets.

Accepts:
  POST /trips
  CreateTripRequest

Returns:
  201 with TripResponse
  400 for validation failure
  500 for storage failure
```

### Component spec

Defines UI component behavior.

Typical files:

```text
itinerary.sdd
itinerary.component.sdd
```

Use for frontend or UI units.

### Job spec

Defines background or scheduled work.

Typical files:

```text
trip-summary.sdd
trip-summary.job.sdd
```

Use for queues, scheduled tasks, workers, and background processes.

### Event spec

Defines emitted or consumed event/message contracts.

Typical files:

```text
trip-created.sdd
trip-created.event.sdd
```

Use for domain events, integration events, pub/sub messages, or queue payloads.

### Policy spec

Defines authorization, permission, or business decision rules.

Typical files:

```text
trip-access.sdd
trip-access.policy.sdd
```

Use for rules that decide whether something is allowed.

## Minimum viable spec

A minimal complete spec can contain only `Spec`. A useful minimal spec usually also contains `Purpose`. SpecDD itself
does not prescribe how detailed your specs have to be. Use as many or as few sections as needed to describe the subject
of the spec.

Most implementation specs become more useful once they define ownership, key `Must` and `Must not` rules, and at least
one scenario.

The following example is a valid minimal spec.

```sdd
Spec: Itinerary Filter

Purpose:
  Filter visible itinerary items by trip day.
```

## Working with SpecDD files

After a project has been initialized, the normal workflow is:

1. Create or update the relevant `.sdd` spec.
2. Define purpose, ownership, rules, scenarios, and tasks.
3. Implement one task or behavior at a time.
4. Add or update tests.
5. Mark completed task entries as `[x]`.
6. Keep the spec aligned with the code.

For example:

```sdd
Tasks:
  [ ] Add place removal.
```

After implementing and testing it:

```sdd
Tasks:
  [x] Add place removal.
```

Do not mark a task done just because code was written. Mark it done when the behavior is implemented and checked.

## Working with AI agents and specs

A good agent prompt is short:

```text
Implement task 2 in the itinerary spec.
```

In a correct working environment, the agent should:

1. read bootstrap files
2. find the spec chain
3. read parent specs
4. read the local spec
5. obey local write authority
6. implement the requested task
7. add or update verification when needed
8. update task status only when complete

For implementation work, the agent should follow this loop:

```text
Resolve -> Read -> Authorize -> Change -> Verify -> Report
```

That means it should identify the target, read the applicable bootstrap and specs, confirm write authority before
editing, make the smallest correct change, run or explain verification, and report the specs used, files changed,
checks,
and any remaining uncertainty.

The agent should stop before editing when:

- no applicable spec exists
- write authority is unclear
- the request cannot be completed without violating `Must not` or `Forbids`
- the change would touch files outside `Can modify` or `Owns`
- requirements affect security, destructive behavior, or public contracts and are ambiguous

Best practice: prompt implementation in small chunks. Depending on spec complexity, ask for at most one to three specs
at a time. Prefer one spec at a time for best results.

## Creating a new SpecDD project

Use the setup instructions at the top of this README to initialize SpecDD first. For additional CLI options, run
`specdd init --help` or see https://github.com/specdd/cli.

A minimal setup example:

```text
travel-planner/
  .specdd/
    bootstrap.md
  travel-planner.sdd
  src/
    trips/
      trips.sdd
```

Then add local specs where useful:

```text
travel-planner/
  src/
    trips/
      trips.sdd
      itinerary.sdd
      itinerary.js
```

A minimal root spec for a project named `travel-planner`:

```sdd
Spec: Travel Planner

Platform: JavaScript/ES6

Purpose:
  Demonstrate SpecDD using a small Travel Planner.

Structure:
  ./src: Source code and colocated specs
  ./tests: Test suite

Must:
  Implementation remains simple.
  Plain JavaScript remains sufficient.
  Tests remain readable.
  Trips and itinerary items can be created.

Must not:
  Introduce frameworks unless requested.
```

A minimal local spec:

```sdd
Spec: Itinerary

Purpose:
  Keep the in-memory itinerary for one trip.

Owns:
  ./itinerary.js

Must:
  When the place name and date are present, a place exists in the itinerary.
  Keep itinerary items grouped by trip day.
  An itinerary item moves to another day when requested.
  Itinerary items appear in chronological order.

Must not:
  Persist trips to disk from this file.
  Add external dependencies.

Tasks:
  [ ] Add place creation.
  [ ] Add itinerary item moving.
  [ ] Add itinerary listing by day.

Scenario: add place
  Given the Paris trip has no itinerary items
  When "Louvre Museum" is added for "2026-06-12"
  Then "Louvre Museum" appears on the June 12 itinerary
```

## Adding SpecDD to an existing project

For an existing codebase, start with one high-change, high-risk, or high-confusion area rather than trying to specify
the whole project at once. Good starting points include a module under active change, a service with repeated review
comments, a workflow with subtle business rules, or an automation path where operational constraints matter.

Typical flow:

1. Install the SpecDD CLI and run `specdd init`.
2. Pick one area where missing context already costs time.
3. Draft a local spec from the current code or intended behavior.
4. Mark uncertain assumptions clearly.
5. Review the spec so old bugs, accidental behavior, and unclear assumptions do not become permanent contracts.
6. Tighten `Purpose`, `Owns`, `Can modify`, `Must`, `Must not`, `Depends on`, `Forbids`, `Tasks`, `Done when`, and
   `Scenario` sections as needed.
7. Implement a small slice against the reviewed spec.
8. Run relevant checks and update task status only after verification.
9. Expand SpecDD coverage incrementally around the areas where context matters most.

Useful prompt:

```text
Read this module and draft a SpecDD spec that describes what it currently does.
Mark uncertain assumptions clearly.
Do not change code.
```

## Useful prompts

Plan adoption:

```text
Read .specdd/bootstrap.md and inspect this repository.
Propose a small SpecDD adoption plan.
Do not change files yet.
```

Turn an idea into a spec:

```text
Turn this feature idea into a SpecDD spec.
Keep it implementation-neutral.
Do not invent technical architecture.
Call out ambiguity instead of resolving it silently.
```

Challenge a draft spec:

```text
Review this SpecDD spec for ambiguity, missing edge cases, and assumptions.
List only issues that would affect behavior, checks, security, ownership, or architecture.
Do not implement anything.
```

Plan before editing:

```text
Read .specdd/bootstrap.md, resolve the relevant SpecDD chain, and explain the implementation plan.
Name the files you expect to modify and the checks you expect to run.
Do not change files yet.
```

Review a change against specs:

```text
Review this change against the applicable SpecDD specs.
Focus on Must, Must not, Forbids, write authority, scenarios, checks, and Done when.
```

## Best practices and observations

### Start small and iterate

Begin with minimal specs. Just `Spec`, `Purpose`, a few local boundary rules, and a `Scenario` or two. Run the workflow,
observe what the agent gets right and wrong, then add sections to address gaps. A spec that is too thin will produce
unfocused output; a spec that is too detailed will become hard to maintain and slow to write. Iterate toward the level
of detail that produces reliable results without becoming a burden in your specific scenario. Most specs settle into a
natural balance after a few cycles.

### Prefer many small specs over large ones

Keep specs short and concise. Long specs are harder for humans to maintain and harder for agents to use reliably. Prefer
many small specs over one large spec. Local specs preserve context and reduce prompt size.

### Implement one spec at a time

Prompt implementation in small chunks. One spec at a time gives the best results. One to three related specs can work
when the task is simple and the boundaries are clear.

### Draft specs automatically with AI

It can be overwhelming to start writing specs by hand. You can ask an AI agent to draft initial SpecDD specs, then
review and edit them before implementation. Treat generated specs as a planning aid, not as final authority until you
have reviewed them.

### Be explicit

The less an agent must infer, the better the outcome. State constraints, non-goals, dependencies, and completion
criteria directly in the spec rather than relying on the agent to fill in the gaps.

### Use Must not for plausible local boundaries

Non-goals and forbidden behavior are valuable when they prevent plausible local boundary mistakes. A clear `Must not`
prevents wrong work without becoming a list of unrelated capabilities.

### Keep tasks local

A task should usually be implementable entirely inside the local spec’s `Owns` or `Can modify` boundary. Tasks that
require touching files outside the local boundary are a signal that the spec or its ownership needs review.

### Review agent output

SpecDD improves reliability and reduces the scope of what agents can change, but it does not remove the need for human
review, tests, and verification. Always inspect generated code before relying on it.

### Keep specs in sync with code changes

Stale specs are worse than no specs. They actively mislead agents and erode trust in the spec chain. Commit spec
changes in the same changeset as the code they govern. If a task changes behavior, update the spec and the code
together, not as a follow-up.

### Use Done when to avoid over-implementation

Without a clear completion signal, agents tend to either stop short or keep going. A `Done when` clause makes the
boundary explicit and gives both agents and reviewers a concrete checklist. Use it whenever the scope of a spec
might otherwise be ambiguous.

### Start with the root spec before adding local specs

Without a root spec named after the selected content root directory, child specs have no architectural context to inherit
from and agents must infer global rules. Even a minimal root spec with a handful of `Must` and `Must not` entries
establishes the foundation that all local specs build on. Add it before writing module or service specs.

### Do not duplicate parent constraints in child specs

Restating inherited rules in child specs creates silent drift. When the parent rule changes, the copy in the child
does not update automatically and will eventually contradict the parent. Write each rule once, in the spec that
owns it, and let inheritance carry it down.

### Follow platform, language and project conventions in naming

The naming examples in SpecDD, such as dot-separated suffixes, lowercase filenames, are illustrations, not rules. If
your platform, language, or team has established naming conventions, follow those instead. A Python project may prefer
`itinerary.sdd`, a Java project may use `Itinerary.sdd`. What matters is that naming is consistent
across the project, that spec files align closely with the source files and components they describe, and that the
convention is applied uniformly so both people and agents can locate specs reliably.

## Conflict handling

If specs conflict, the agent should use these rules:

1. Prefer the more restrictive rule.
2. Prefer explicit local behavior only when it does not violate parent constraints.
3. Treat `Must not` and `Forbids` as stronger than `Must`, `Depends on`, or `Tasks`.
4. Treat inherited architecture as active unless explicitly and safely narrowed.
5. Do not use a task as justification to violate a rule.
6. If a safe partial change is possible, do the safe subset.
7. If the change cannot proceed safely, mark the task `[?]` or `[!]` and explain the issue.

Example conflict:

```sdd
Must not:
  Access browser storage directly.

Tasks:
  [ ] Save trips directly to browser storage from itinerary.js.
```

The task is invalid because it violates `Must not`.

## Good specs and bad specs

Good specs are short and outcome-focused.

Good:

```sdd
Must:
  A missing place name is rejected before an itinerary item is added.
```

Bad:

```sdd
Must:
  The implementation should carefully validate every possible kind of trip input in a robust and production-quality way before it writes anything anywhere.
```

Good task:

```sdd
Tasks:
  [ ] Add validation for missing place name.
```

Bad task:

```sdd
Tasks:
  [ ] Make trips better.
```

Good specs:

- are local
- are specific
- describe behavior
- define constraints
- avoid obvious implementation details
- guide tests
- keep AI agents inside boundaries

Bad specs:

- are long
- duplicate parent rules unnecessarily
- contain vague tasks
- hide architecture decisions in prose
- ask for broad refactors without scope
- describe unrelated parts of the system

## Relationship to tests

Specs are not tests, but they should guide tests.

Scenarios are especially useful as test inputs.

Example spec fragment:

```sdd
Scenario: missing place name
  Given the place name is empty
  When the person adds the itinerary item
  Then validation fails
  And no itinerary item is stored
```

This should usually become a test.

Tests prove behavior. Specs explain why the behavior exists and where it belongs.

## Relationship to documentation

Specs are not ordinary documentation.

Documentation often explains how something works after the fact. Specs define how something should work and what
boundaries implementation must respect.

That said, specs are still readable by humans and can serve as useful project documentation. They can capture business
rules, development intent, architecture, and operational constraints in a structured way.

The difference is that specs are operational. Developers and agents use them while changing code.

## Relationship to issues and tickets

SpecDD tasks are not a replacement for project management.

Use issues or tickets for:

- planning across teams
- prioritization
- release tracking
- product management
- long-running work

Use SpecDD tasks for:

- local implementation steps
- AI-agent work packets
- unfinished work inside a spec boundary
- keeping code and spec progress aligned

A good SpecDD task should be small enough to implement locally.

## What is in the SpecDD repository

In the SpecDD repository:

- `src/.specdd/` contains SpecDD bootstrap templates and project bootstrap files.
- `src/AGENTS.md` is the agent entrypoint. It tells agents to read the bootstrap files and follow their instructions.
- `src/CLAUDE.md` is a compatibility entrypoint for Claude-style workflows. It simply points to `AGENTS.md`.

## Recommended repository files

A practical SpecDD project may include:

```text
travel-planner/
  .specdd/bootstrap.md
  .specdd/bootstrap.project.md
  .specdd/bootstrap.local.md
  AGENTS.md
  CLAUDE.md
  README.md
  travel-planner.sdd
  src/**/**/*.sdd
```

Suggested `.gitignore` entry:

```text
.specdd/bootstrap.local.md
```

Optional short `CLAUDE.md`:

```md
# CLAUDE.md

Before working on this project, read `AGENTS.md`.
```

Optional short `AGENTS.md`:

```md
# AGENTS.md

Before working on this project, read `.specdd/bootstrap.md` and any bootstrap override files.

Assume the role, rules, workflow, and implementation constraints described there. Treat SpecDD specs as source-adjacent
development contracts, not optional documentation.
```

## FAQ

### I am not technical, can I use SpecDD too?

Yes. Follow the SpecDD structure and focus on non-technical descriptions of features and purpose. It will greatly
improve the quality of your outcomes and any future technical contributors will thank you!

### Is SpecDD a programming language?

No. SpecDD is a framework and reference format for source-adjacent technical specifications.

### Is SpecDD a testing framework?

No. Specs can guide tests, but they are not tests.

### Is SpecDD only for AI?

No. Humans can use it directly. It is designed to be especially useful with AI coding agents.

### Do I need tools?

Use the SpecDD CLI to set up and update the framework files. After that, SpecDD specs are plain text files and can work
with any LLM that can read repository files. The [tools and setup guide](https://specdd.ai/tools/) has the official
setup instructions.

### Can SpecDD work with my language or framework?

Yes. SpecDD is designed to adapt to any language, platform, framework, project structure, or programming style as long
as the project work is organized in files.

### Why not just use tests?

Tests describe expected behavior. Specs also describe ownership, architecture, constraints, dependencies, non-goals, and
local work tasks.

### Why not use one big specification?

Large specs are hard to keep in context and tend to rot. SpecDD prefers many small specs close to the code they govern.

### Can a project have multiple root specs?

Usually there should be one root spec per independent SpecDD hierarchy, named after that hierarchy's selected content
root. A monorepo may have multiple independent roots when packages or applications are configured as separate SpecDD
projects.

### Should specs be reviewed?

Yes. Specs define architecture and implementation authority, so they should be reviewed just like code.

### Is SpecDD only for new projects?

No. SpecDD works well for both greenfield and existing projects. For existing codebases, start small: add specs around
the parts you are actively modifying, then expand coverage as needed.

## Legal

Copyright (c) 2026 Matīss Treinis and SpecDD contributors

SpecDD is licensed under the Apache License 2.0. SpecDD™ is a trademark of Matīss Treinis.

The Apache License 2.0 applies to the project source files and documentation. It does not grant permission to use the
SpecDD name, logo, or other brand identifiers except for reasonable reference to the official project.

You may describe a project as using the SpecDD framework when that statement is accurate. Do not use the SpecDD name for
forks, derived projects, services, or products in a way that implies official endorsement or affiliation.
