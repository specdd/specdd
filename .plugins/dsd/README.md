---
title: Domain & Solution Design Plugin
seoDescription: "Use the SpecDD DSD plugin to document domains, design solutions, and connect business rules and design decisions to implementation specs."
---

Domain & Solution Design (DSD) gives your project a place for the business rules and design decisions that span
individual implementation specs.
It adds Domain Definitions and Solution Designs as Markdown files in a `dsd/` directory, alongside the `.sdd` files that
describe each part of the implementation.

The recommended workflow is to define the Domain, design its Solutions, then create or update the implementation specs:

```text
Domain Definition -> Solution Design -> SpecDD specifications -> Implementation
```

| Layer                | Responsibility                                                                                |
|----------------------|-----------------------------------------------------------------------------------------------|
| Domain Definition    | Problem space, shared language, objectives, rules, boundaries, and Solution landscape.        |
| Solution Design      | One Solution's requirements, architecture, interfaces, decisions, operations, and acceptance. |
| SpecDD specification | Local behavior, dependencies, file ownership, tasks, and tests.                               |

## Why DSD

A local specification is good at answering questions such as:

* What does this component do?
* What behavior must hold?
* What may this code change?
* What does this module depend on?
* When is this implementation complete?

Larger systems also need answers to questions such as:

* What problem domain are we working in?
* Which business concepts and rules apply across the system?
* Where does one solution end and another begin?
* Which requirements span several implementation areas?
* What architecture connects those areas?
* Why was a solution designed this way?
* Which specs together realize the solution?

Putting all of that into local `.sdd` files makes those specs too broad.

Keeping it only in prompts, tickets, diagrams, or old design documents makes it difficult for humans and agents to
reliably find the current intent.

DSD keeps that context in Git, in a small structure with explicit ownership.

## Install

You need the SpecDD command-line interface (CLI) and an initialized project. See the
[plugin installation prerequisites](../../PLUGINS.md#install-a-plugin) for setup and Git access requirements.
The command below uses GitHub over SSH.

From your project's SpecDD root, the directory containing `.specdd/bootstrap.md`, run:

```bash
specdd plugin add @specdd/specdd dsd
```

This installs DSD's instructions and registers the plugin in `.specdd/plugins.json`. Check that the list includes DSD:

```bash
specdd plugin list
```

## Start with a Domain and Solution

Start with one problem area and gather its requirements and agreed decisions. If code or specs already exist, include
them to understand current behavior, documented requirements, and gaps. In an existing project, a feature spread across
modules or an integration with recurring design questions can be a useful starting point.

Follow the same order whether or not code or specs exist:

1. Define the Domain. Ask your agent to [draft a Domain Definition](#draft-a-domain-definition), then review its
   boundaries, shared language, and rules with the people responsible for the product and implementation.
2. Design one Solution within that Domain. [Draft a Solution Design](#draft-a-solution-design) and review its
   requirements, architecture, decisions, and acceptance criteria before turning them into specs.
3. Create or update the SpecDD specs from the reviewed design. Record their exact paths and responsibilities in the
   Solution Design as described in [Connecting designs to implementation](#connecting-designs-to-implementation).
4. Implement a selected spec task and check its completion criteria.

Your first useful result is a reviewed Domain Definition and Solution Design that can guide spec work. You can reach
that point before any code or specs exist. Mark unresolved questions as `TBD` and assumptions as `ASSUMPTION`, with their
supporting evidence. Add implementation mappings as the specs are created.

The agent can create the `dsd/` directory with its first draft.

The usual location is `dsd/` under the SpecDD root. If you want another location, specify it in your project
instructions.
Projects with several SpecDD roots have a separate DSD library for each.

After designs and specs have been added, a small project might look like:

```text
travel-planner/
|-- .specdd/
|   |-- bootstrap.md
|   `-- ...
|-- travel-planner.sdd
|-- dsd/
|   |-- trip-planning.md
|   `-- trip-planning/
|       `-- itinerary.md
`-- src/
    `-- ...
```

## The basic model

Each Domain groups the Solutions that address its problem space:

```text
Trip Planning                     Domain
|-- Itinerary Planning            Solution
`-- Saved Trips                   Solution
```

DSD documents and the SpecDD specifications that realize them occupy separate trees:

```text
dsd/
|-- trip-planning.md
`-- trip-planning/
    |-- itinerary.md
    `-- saved-trips.md

src/
|-- trips/
|   |-- itinerary.sdd
|   `-- trip-storage.sdd
`-- ui/
    `-- itinerary-view.sdd
```

The DSD tree follows the problem and Solution structure; the SpecDD tree follows implementation boundaries.

The `trip-planning/` folder holds that Domain's Solution Designs, with `trip-planning.md` introducing their shared
context. You can begin with just the Domain file and add its folder when you have a Solution to describe.

These locations are reserved for Domain Definitions and Solution Designs. Keep general notes, templates, and
supporting material elsewhere.

## Domain Definitions

A Domain Definition lives directly under `dsd/` as `dsd/<domain>.md`.

For example: `dsd/trip-planning.md` or `dsd/destinations.md`.

Begin the document with its type and name: `# Domain Definition: Trip Planning`.

A Domain Definition describes the problem space and the rules shared by its Solutions.

Typical content includes:

* purpose and problem space
* scope and boundaries
* business objectives
* actors and stakeholders
* terminology and domain concepts
* business and domain rules
* capabilities
* domain-wide requirements
* quality or compliance constraints
* relationships with other domains
* the solutions that exist inside the domain
* cross-solution concerns
* shared design choices, such as a common trip model used by several Solutions
* unresolved domain-level questions

Focus on the ideas and rules that stay useful as individual implementation choices change.

The following fictional Travel Planner example uses `BO-1` for a business objective, `BR-1` for a business requirement,
and `AC-1` for an acceptance criterion. `Source` identifies the basis of the intent, and `Verified by` points to its
acceptance criterion. `MUST` marks required behavior. See [Requirements and decisions](#requirements-and-decisions) for
the complete conventions. The product requirements document referenced in the example is also fictional.

```markdown
# Domain Definition: Trip Planning

## Purpose

The Trip Planning domain covers organizing places and activities into daily itineraries and preserving trip plans for
later use.

## Scope

Trip Planning begins when a person creates a trip with a destination and date range.

Destination search and purchasing bookings or tickets are outside this domain.

## Business Objectives

- **BO-1:** People can organize trips by day and return to saved plans without losing itinerary changes.
    - **Source:** `docs/product-requirements.md`, section Saved trip planning

## Business Requirements

- **BR-1 - MUST:** Itinerary items remain assigned to a trip and trip day.
    - **Source:** BO-1
    - **Verified by:** `AC-1`

- **BR-2 - MUST:** Saved trips preserve itinerary items and their day assignments when reopened.
    - **Source:** BO-1
    - **Verified by:** `AC-2`

## Solutions

- `trip-planning/itinerary`: Day-by-day itinerary planning.
- `trip-planning/saved-trips`: Saving and reopening trip plans.

## Acceptance Criteria

- **AC-1:** Adding `Louvre Museum` to the Paris trip for `2026-06-12` assigns it to that trip and day.
- **AC-2:** Reopening the saved Paris trip restores `Louvre Museum` on the June 12 itinerary.
```

Choose the sections that help someone understand the Domain or make a decision about it. A small Domain may need only a
purpose, a few rules, and a description of its Solutions.

## Solution Designs

A Solution Design lives in its Domain's folder, at `dsd/<domain>/<solution>.md`.

For example: `dsd/trip-planning/itinerary.md`, `dsd/trip-planning/saved-trips.md`, or `dsd/destinations/search.md`.

Begin the document with its type and name: `# Solution Design: Itinerary Planning`.

A Solution can be a service, integration, subsystem, or feature spanning several components. Give it one home: the
Domain responsible for the main problem it solves.

A Solution Design typically covers:

* the problem being solved
* scope and non-goals
* applicable Domain requirements
* Solution-specific requirements
* important behavior and workflows
* architecture
* components and responsibilities
* interfaces and integrations
* data handling
* quality attributes
* security, privacy, or compliance concerns
* design decisions
* deployment and operational concerns
* migration or compatibility
* acceptance criteria
* the SpecDD specifications that realize the Solution

In the example below, `FR-1` identifies a functional requirement and `DEC-1` a design decision. `trip-planning#BR-1`
refers to `BR-1` in `dsd/trip-planning.md`; see [document and requirement references](#referring-to-documents-and-requirements).
This example shows the design after its implementing specs have been created. During initial design, describe the
intended implementation responsibilities and mark unresolved mappings as `TBD`; add exact references when the specs exist.

```markdown
# Solution Design: Itinerary Planning

## Objective

Let a person add places to a trip, move them between days, and review the saved itinerary.

## Scope

This Solution owns itinerary editing and presentation, using Saved Trips for persistence.

Shared trip and day-assignment rules remain defined by the `trip-planning` Domain.

## Applicable Domain Requirements

`trip-planning#BR-1` requires each itinerary item to remain assigned to a trip and trip day.

`trip-planning#BR-2` requires saved trips to preserve itinerary items and their day assignments when reopened.

## Functional Requirements

- **FR-1 - MUST:** Adding a named place to an existing trip assigns it to the selected day and saves the updated
  itinerary through trip storage.
    - **Source:** trip-planning#BR-1, trip-planning#BR-2
    - **Realized by:** SpecDD /src/trips/itinerary.sdd, SpecDD /src/trips/trip-storage.sdd
    - **Verified by:** `AC-1`

- **FR-2 - MUST:** Reopening a saved trip loads its itinerary through trip storage and displays the restored items
  grouped by their saved trip days.
    - **Source:** trip-planning#BR-2
    - **Realized by:** SpecDD /src/trips/trip-storage.sdd, SpecDD /src/ui/itinerary-view.sdd
    - **Verified by:** `AC-2`

## Design Decisions

- **DEC-1 - Keep itinerary editing separate from persistence**
    - **Context:** Itinerary editing and saving trip data have different responsibilities.
    - **Decision:** Itinerary changes are saved through the trip storage boundary used by Saved Trips.
    - **Consequences:** Itinerary behavior and presentation do not access browser storage directly.
    - **Source:** trip-planning#BR-2

## SpecDD Realization

- `SpecDD /src/trips/itinerary.sdd`
    - Handles adding places and moving them between trip days.
- `SpecDD /src/ui/itinerary-view.sdd`
    - Presents itinerary items grouped by day and reports validation or save failures.
- `SpecDD /src/trips/trip-storage.sdd`
    - Saves and restores trips and itinerary items; also realizes Saved Trips.

## Acceptance Criteria

- **AC-1:** After adding `Louvre Museum` to the Paris trip for `2026-06-12`, it appears on the June 12 itinerary and
  remains there when the saved trip is reopened.
- **AC-2:** Reopening a trip with places saved on different days displays every place under its original trip day.
```

## Connecting designs to implementation

Create or update implementation specs from the reviewed Domain Definition and Solution Design. Then record the
relationships so readers can follow the intended behavior to the specs responsible for implementing it.
In the example above, itinerary behavior, presentation, and persistence live in different parts of the source tree.
The SpecDD Realization section brings those responsibilities together in one view.

Each known spec is referenced by its exact path from the SpecDD root, such as `SpecDD /src/trips/itinerary.sdd`.
A short explanation beside the path tells a reader what that spec contributes. This makes it easier to find the work
behind a requirement and review the effects of a design change.

Several Solutions can intentionally share a spec. Trip storage, for example, contributes to both Itinerary Planning
and Saved Trips. Recording that shared responsibility helps both designs stay accurate when storage changes.

A directory or glob is useful when a relationship covers a changing set of specs; explain how membership is
determined. If your project uses names instead of paths, document the mapping so readers can resolve them.

The local specs also explain how broader rules affect their own behavior. A Domain rule about preserving itinerary
items might become a local requirement to keep out-of-range items available for reassignment. When a rule needs to be
repeated locally for safe implementation, its DSD reference keeps the two descriptions connected during later edits.

## Referring to documents and requirements

DSD references use names derived from the document's location. `dsd/trip-planning.md` is `trip-planning`, and
`dsd/trip-planning/itinerary.md` is `trip-planning/itinerary`. The heading provides the display name, which can change
without changing those references; its Domain or Solution type still needs to match the file's location.

The reference forms are plain text:

| Referenced content               | Example                                                                               |
|----------------------------------|---------------------------------------------------------------------------------------|
| Item in the same document        | `BR-2`                                                                                |
| Item in another document         | `trip-planning#BR-2`                                                                  |
| Whole document                   | `trip-planning/itinerary`                                                             |
| Section without a stable item ID | `Business Objectives` locally; `trip-planning, section Business Objectives` elsewhere |

Item IDs make requirements easy to discuss in reviews and connect to acceptance criteria. They belong to their own
document, so `trip-planning#BR-1` and `trip-planning/itinerary#BR-1` refer to different requirements.

For new filenames, DSD uses lowercase kebab-case such as `trip-planning`, unless your project already has a stable
naming convention. Keeping filenames stable keeps references stable too. Treat a rename or move as a deliberate
migration: renaming a Domain also changes its Solution folder and all contained Solution IDs, while moving a Solution
to another Domain changes that Solution's ID. Include the affected DSD and SpecDD references in the same change.

## Where information belongs

Use a **Domain Definition** when the information applies to the problem domain or several Solutions.

Examples:

* itinerary items belong to a trip and trip day
* saved trips preserve itinerary items and their day assignments
* itinerary planning and saved trips use the same meaning of a trip day
* destination discovery and itinerary planning are distinct problem spaces
* trip planning excludes purchasing bookings or tickets

Use a **Solution Design** when the information belongs to one coherent solution, including coordination across
implementation areas when needed.

Examples:

* itinerary editing uses trip storage to save changes
* the itinerary view groups places by trip day
* Saved Trips restores previously saved plans when the application starts
* save failures pass from trip storage through itinerary behavior to the view
* several trip storage specs participate in one saved-trip format migration

Use **SpecDD** when the information is local to an implementation boundary.

Examples:

* the trip storage adapter depends on `@localStorage`
* the itinerary module owns `./itinerary.js`
* the create-trip API rejects a missing destination
* the itinerary module rejects an empty place name
* the itinerary spec has an incomplete task for moving items between days

Define each rule once. Other documents can refer to it and explain their own consequences. If a Solution adds an
obligation, give that addition its own requirement and source.

Shared terms belong in the Domain glossary. If a Solution uses a term more narrowly, explain that distinction where a
reader will encounter it.

## Shared rules and Solution behavior

The Domain Definition provides the context for each of its Solutions. Its rules apply throughout the Domain unless a
rule states a narrower scope, such as a particular set of Solutions. This lets you explain a shared rule once and then
show how each Solution puts it into practice.

For example, the Trip Planning Domain might say:

```markdown
- **BR-4 - MUST:** Changing trip dates preserves existing itinerary items.
    - **Source:** BO-1
```

The Itinerary Planning Solution can explain what that means for its interface:

```markdown
- **FR-3 - MUST:** After a trip date change, the itinerary view keeps items outside the new date range visible for
  reassignment.
    - **Source:** trip-planning#BR-4
```

The Domain describes what must remain true; the Solution describes an additional local obligation that preserves it.
Moving a Domain rule into a Solution changes its ownership and scope. Make that change explicit and update the affected
references.

## Resolving conflicting requirements

A Domain rule, Solution design, and local spec describe different parts of the same intended behavior. A more detailed
requirement can refine a shared rule, as the itinerary example shows. If two documents require incompatible outcomes,
their position in the hierarchy does not decide which outcome is correct.

When an agent encounters an existing contradiction during your task, expect it to identify the conflicting documents
and pause the affected work for your decision. A clear request to change the intended behavior can supply that decision.
Specify the intended behavior and any change to the rule's scope or ownership so the affected designs and specs can be
updated together.

## How changes affect your documents

Review the Domain rules first, then the dependent Solution Designs, before changing the implementation specs they guide.
Keep updates to the affected designs and specs together in the same task.

For example, suppose Trip Planning begins supporting itinerary items without an assigned day. That changes a shared
Domain rule, with consequences for the Itinerary Planning and Saved Trips designs and their implementation contracts.

A change to one Solution can also affect another that depends on it. Replacing trip storage, for example, may change how
Itinerary Planning saves data or handles failures. The Domain Definition needs attention if that redesign changes a
shared rule or the Domain's boundary.

A request can name a local spec, too. If you ask for saved trips to expire after a retention period in `trip-storage.sdd`,
review and update the affected Domain rules about preserving plans and the Saved Trips design before changing that spec.

Moving `trip-storage.sdd` calls for updating its references. An internal refactor that leaves the documented behavior,
design, and spec locations intact can leave the DSD documents as they are.

## Evolving or retiring a design

DSD documents describe the current design. Git history preserves earlier designs and decisions.

When a Solution is retired, remove its document and update the designs and specs that refer to it. If you want
historical
documentation retained in the project, make that choice explicit. Before retiring a Domain, decide whether each of its
Solutions will also be removed or moved to another Domain.

An individual requirement or decision can remain as a deprecated entry when readers still need to trace it. Naming its
replacement helps someone following an old reference understand what changed.

## Cross-domain systems

A Solution keeps one owning Domain even when it integrates with another. For example, `trip-planning/itinerary` might
rely on `destinations#BR-6` for the destination information available when selecting a place. Its design can reference
that requirement and explain which information it consumes and how that affects the itinerary workflow.

For a rule shared across Domains, agree on one owning Domain or an external source that both can reference. If ownership
is unclear, an Open Issue makes that question visible for review. When Solutions depend on each other in both
directions,
explain any consequences for deployment, failure handling, or responsibility so a developer can plan changes safely.

## Requirements and decisions

DSD uses these ID prefixes, with numbers starting at `1` and no leading zeros:

```text
BO-1       Business objective
BR-1       Business requirement
FR-1       Functional requirement
NFR-1      Non-functional or quality requirement
CON-1      Constraint
DEC-1      Domain, architecture, or design decision
AC-1       Acceptance criterion
```

Each ID is unique within its document. Keep the IDs when reorganizing content; gaps are harmless, and retired IDs stay
reserved so old references keep their meaning. Changing an established ID format is a deliberate migration that includes
its references.

### Write requirements that can be reviewed

A useful requirement describes one obligation that someone can understand, discuss, and check. Its `Source` explains
where the intent comes from, such as a product requirement, a Domain rule, or an agreed decision. Separate obligations
that could change independently so a reviewer can see precisely what a change affects.

Sources can also be tickets, RFCs, contracts, or other external documents. A contractual retention period, for example,
affects when Saved Trips expires data and what its acceptance criteria need to verify. Record the reference alongside
those design consequences.

`MUST`, `MUST NOT`, `SHOULD`, `SHOULD NOT`, and `MAY` describe how binding a requirement is. Delivery priority is a
separate
choice. If the design departs from a `SHOULD` or `SHOULD NOT`, record the reason so later readers can evaluate it.

Quality targets need the same grounding as functional requirements. For example, a response-time target should point to
the agreed service objective behind it. A proposed target can be useful for discussion, with approval or an
authoritative
source establishing it as a requirement. If feasibility is uncertain, keep the requirement visible and explain what
still needs investigation.

### Make uncertainty visible

`TBD` marks information you still need, with a note about what would resolve it. `ASSUMPTION` marks an inference and
records the evidence behind it. These labels help a reviewer focus on the decisions needed before relying on a draft.

Existing code tells you what the system currently does. Product requirements, agreed decisions, or another explicit
source establish what it is intended to do. Historical documents can serve that role when your project still treats
them as current requirements. Make current behavior, target behavior, and transitional arrangements clear where they
differ, and keep recommendations distinguishable from agreed design.

### Explain important design choices

A `DEC` entry records a choice future developers will need to understand. `Decision` states the chosen approach, and
`Source` records its basis. Context, alternatives, and consequences help explain a choice when the reasoning would
otherwise be lost. The itinerary example shows how a short decision record can explain a boundary between editing and
persistence.

### Describe how you will know it works

Acceptance criteria connect the requirements to observable results. Domain criteria usually describe business outcomes
or shared rules; Solution criteria describe the behavior and qualities of that Solution. One criterion may be covered
by several scenarios or tests in the implementing specs.

For each important requirement, make the verification approach clear, or explain why verification is inapplicable.
The `Verified by` references in the examples let a reviewer follow a requirement to its acceptance criterion, while the
local `.sdd` files hold the implementation-level test detail.

## Working with an agent

Make the deliverable clear: a draft design, a review, an update to existing documents, or an implementation change.
Include the problem you want to solve, the relevant sources, and any decisions you have already made.

A design update can include related DSD documents and `.sdd` specs that need to change with it. Update the affected Domain
Definitions, then Solution Designs, before the specs. Ask explicitly when you also want implementation changes. If you
want to understand the impact first, ask for a review or plan before requesting edits.

The prompts below use the fictional Travel Planner project. Substitute your project's names and sources.

### Draft a Domain Definition

```text
Using the enabled DSD plugin, read the available requirements and agreed
decisions for the Trip Planning area of Travel Planner. If relevant code or
SpecDD specs exist, inspect them for current behavior and documented constraints.

Draft a Domain Definition for Trip Planning.

Focus on the problem space, boundaries, terminology, business rules,
cross-solution requirements, and solution landscape.

Distinguish current behavior from intended behavior. Mark assumptions and
unknowns explicitly.

Do not create or change specs or implementation yet.
```

### Draft a Solution Design

```text
Read the Trip Planning Domain Definition and relevant requirements and decisions.
If code or SpecDD specs already exist, inspect the relevant ones for context.

Draft a Solution Design for Itinerary Planning.

Keep domain-owned requirements as references instead of duplicating them.
Document solution-specific requirements, architecture, decisions, acceptance,
and intended implementation responsibilities. Reference existing specs where
they materially realize the solution; mark unresolved mappings as TBD.

Do not create or change specs or implementation yet.
```

### Review a Domain

```text
Review the Trip Planning Domain Definition.

Look for unclear boundaries, duplicated solution-level detail, unsupported
requirements, ambiguous terminology, missing cross-solution constraints,
and requirements that appear to belong to one Solution instead.

Report findings without changing files.
```

### Review a Solution

```text
Review the Itinerary Planning Solution Design against its Domain Definition.
If implementing SpecDD specs exist, include them in the review.

Identify contradictions, stale architecture, missing requirements,
unclear ownership, and unsupported assumptions. Check mappings to existing
specs for missing or stale references.

Report findings without changing files.
```

### Review the DSD library

```text
Review the DSD library against the current SpecDD specs.

Can I follow the important requirements from their sources through the designs
and implementing specs to the acceptance criteria?
Identify missing documents, broken references, verification gaps, and designs
that no longer describe the intended behavior.

Report findings without changing files.
```

### Trace a requirement

```text
Trace trip-planning#BR-2 through the affected Solution Designs and SpecDD specs.

Explain where the requirement is refined, realized, and verified.
Do not change files.
```

### Plan a change

```text
The Trip Planning domain must now support duplicating a saved trip with all of its itinerary items.

Read the applicable Domain Definition, then Solution Designs, and any existing
SpecDD specs.

Explain which artifacts are affected and why.
Do not make changes yet.
```

### Implement a reviewed change

```text
Apply the reviewed saved-trip duplication change.

Review and update the affected Domain Definitions, then Solution Designs.
Create or update the SpecDD specs from those designs, keeping their references
synchronized. Then implement the selected spec work and run the relevant checks.
```

## FAQ

### Does every Domain need a Solution?

A Domain may have zero or more Solutions. Its definition can be written before any Solution is designed.

### Can a Solution belong to several Domains?

Each Solution belongs to the Domain that owns its primary responsibility. It can still reference requirements and
interact with Solutions in other Domains.

### Can a Solution contain another Solution?

DSD has two hierarchy levels: Domain and Solution. Further implementation decomposition belongs in SpecDD.

### Does the `dsd/` tree need to match `src/`?

The `dsd/` tree follows Domain and Solution boundaries, while the source and SpecDD trees follow implementation
boundaries. Explicit references connect them, allowing one Solution to be realized by specs in several directories.

### Should every SpecDD spec be listed in a Solution?

List the specs whose connection to the Solution helps someone understand its design, plan implementation, review a
change, or verify its behavior. The list gives readers a route into the relevant implementation areas.

### What happens when Domain and Solution requirements disagree?

The disagreement needs a decision about the intended behavior. An agent will raise an existing conflict with you unless
your request already resolves it.

### Can an agent create DSD documents from existing code?

An agent can use code to draft a description of the current system. Review that draft against product requirements and
agreed decisions to establish the intended design. Inferences appear as `ASSUMPTION` entries with their supporting
evidence. Use the reviewed Domain and Solution designs to guide subsequent spec changes.
