# Domain & Solution Design Plugin for SpecDD (DSD)

DSD maintains Domain Definitions and Solution Designs alongside the SpecDD specifications and implementation they
inform. Domain Definitions and Solution Designs occupy the two abstraction levels above source-adjacent specifications:

```text
Domain Definition -> Solution Design -> SpecDD specifications -> Implementation
```

## Activation and Scope

Discover and load this plugin through the applicable bootstrap's Plugins procedure. Once enabled, resolve the DSD
library as described below. Apply this plugin when that library exists or the Operator explicitly requests DSD, Domain
Definition, or Solution Design work.

Read and obey the applicable SpecDD bootstrap first. Apply both sets of rules where they address different concerns.
The bootstrap governs SpecDD behavior when this plugin makes an incompatible claim; report that incompatibility.

DSD documents remain outside SpecDD path inheritance, ownership, and modification-authority resolution. Their
implementation relationships follow Realization by SpecDD.

## DSD Library and Document Identity

Resolve the DSD library as `./dsd` relative to the applicable SpecDD selected content root unless explicitly instructed
otherwise. Each content root has its own independent library. In the paths below, `dsd/` denotes the selected library
location.

Use exactly two DSD document types and hierarchy levels: Domain Definition followed by Solution Design. Concepts such
as Theme, Area, Capability, Epic, System, Subsystem, Module, and Sub-solution MAY appear within their content.

A Solution MUST belong to exactly one Domain: the Domain responsible for the problem the Solution primarily addresses.
A Domain MAY contain zero or more Solutions.

The normative filesystem structure is:

```text
dsd/
|-- <domain>.md
`-- <domain>/
    `-- <solution>.md
```

| Placement | Document type | Required first content heading | Canonical document ID |
| --- | --- | --- | --- |
| `dsd/<domain>.md` | Domain Definition | `# Domain Definition: <display name>` | `<domain>` |
| `dsd/<domain>/<solution>.md` | Solution Design | `# Solution Design: <display name>` | `<domain>/<solution>` |

The `<domain>` directory is a namespace for Solutions, and MUST have a matching Domain Definition. A Domain without
Solutions needs no namespace directory. For example, `dsd/trip-planning/itinerary.md` requires `dsd/trip-planning.md`.

A heading type that disagrees with placement is invalid regardless of document prose. Placement determines canonical
identity; the heading provides the human-facing name, which may change independently of that identity.

Store unrelated Markdown, plugin instructions, README files, templates, and supporting documents outside placements
classified as DSD documents. Put necessary supporting material outside the DSD namespace or at an explicitly selected
project location consistent with this placement rule, and reference it.

Unless an existing governing convention defines another stable scheme, use lowercase ASCII kebab-case for new filename
components, such as `trip-planning` and `saved-trips`. Canonical IDs MUST uniquely identify one active document within
the content root; Solution slugs may repeat across Domains because their complete IDs differ.

Preserve established canonical IDs unless an explicitly requested migration changes them. During that migration:

* A Domain rename also renames its namespace directory when present and changes every contained Solution's canonical ID.
* Moving a Solution to another Domain changes its canonical ID.
* Update every affected DSD and SpecDD reference in the same task.

## Content Identifiers

Assign stable document-scoped identifiers to material content when stable reference or traceability is useful. Use
positive decimal integers beginning at `1`, without leading zeros, in these forms:

```text
BO-<number>     business objective
BR-<number>     business requirement
FR-<number>     functional requirement
NFR-<number>    non-functional or quality requirement
CON-<number>    constraint
DEC-<number>    domain, architecture, or design decision
AC-<number>     acceptance criterion
```

Each identifier MUST be unique within its owning document and MAY appear in another document. For example,
`trip-planning#BR-1` and `trip-planning/itinerary#BR-1` identify different items.

Preserve existing identifiers. Change their format only through an explicitly requested migration. Retired identifiers
MUST NOT be reused after removal or deprecation. Retained historical entries follow
Lifecycle and Deletion.

## DSD References

Use these plain-text reference forms:

* Within the owning document: the local item identifier, such as `BR-4` or `DEC-2`.
* An item in another document: `<canonical-document-id>#<identifier>`, such as `trip-planning#BR-4`.
* A whole document: its canonical ID, such as `trip-planning` or `trip-planning/itinerary`.
* A materially necessary section reference without a stable item identifier: the section name, prefixed by the canonical
  document ID when referring to another document, such as `trip-planning, section Business Objectives`.

Prefer stable item identifiers for normative content.

## Content Gate

Create, retain, or update DSD content when omitting it could materially impair understanding of a Domain or Solution,
interpretation of documented intent, or a reasonable decision. Such decisions concern implementation planning, impact
analysis, review, traceability, verification, deployment, operation, security, privacy, compliance, audit, maintenance,
migration, ownership, or future evolution. Preserve material information during edits and omit content that fails this
test.

Apply the gate to the topics in Document Topics and any other material concern at Domain or Solution
abstraction. It also governs whether fields, decisions, external references, and realization mappings earn a place in a
document. Select affected artifacts through Synchronization.

## Placement and Ownership

Give each documented item one canonical location and each normative requirement one clear owning document. Choose the
narrowest level that correctly owns the durable intent:

* **Domain Definition:** one coherent problem domain, including its purpose, boundaries, terminology, actors,
  objectives, capabilities, business rules, information, shared processes, Domain-wide constraints, and Solution
  landscape. It SHOULD remain stable across individual implementation choices and solution-neutral where possible.
  Existing or target Solutions MAY be described through their responsibilities and relationships. Domain architecture
  or design decisions belong here only when they constrain the Domain or multiple Solutions.
* **Solution Design:** one coherent solution's requirements, behavior, architecture, components, data, interfaces,
  decisions, operational concerns, acceptance, and coordination across implementation specs. A Solution may be a
  system, subsystem, feature spanning components, integration, service group, processing capability, or bounded
  technical solution to part of the Domain problem.
* **SpecDD specification:** source-adjacent implementation contracts, local behavior, code-level interfaces, local
  component or module boundaries, dependencies and forbidden dependencies, ownership and modification authority,
  tasks, tests, scenarios, implementation constraints, and local completion criteria. Use the bootstrap for SpecDD
  semantics.

Keep implementation breakdowns and inventories of lower-level implementation artifacts at the SpecDD level. Domain and
Solution documents must explain how the relevant parts fit together within their own boundaries.

Elsewhere, reference the canonical item and add only unique local context or consequences. Contextual explanations
MUST preserve the referenced normative requirement's meaning; additional obligations need separately sourced local
requirements.

Deliberate DSD-to-SpecDD restatements follow Realization by SpecDD.

Express each obligation once, as either a positive requirement or a prohibition. A prohibition adds an independent rule
only if it can be violated while every applicable positive requirement is satisfied. Apply the same uniqueness rule to
paraphrases, requirement notes, and broad or specialized sections.

Define shared terminology in the Domain glossary or concept section. Any Solution-specific distinction in meaning must
be deliberate and explicit.

## Inheritance and Relationships

For Solution work, read the owning Domain Definition first. Its context and constraints remain active unless their
wording explicitly limits applicability, for example through an `Applies to` field naming selected Solutions.

A Solution MAY add local requirements, stricter constraints, narrower behavior, architecture, design, acceptance, and
realization consequences within that inherited contract, including its terminology, boundaries, and intended scope.
Transferring an applicable Domain requirement's ownership to a Solution requires an explicit migration. Handle
incompatible intent through Authority and Conflict Rules.

Solutions MAY depend on or interact with Solutions in the same or another Domain; represent those relationships by
reference. Circular dependencies MUST be explicit when material to architecture, deployment, failure behavior, or
ownership.

A concern spanning multiple Solutions normally belongs to the Domain when it establishes shared intent, rules,
boundaries, or constraints. For a contract exposed by one Solution and consumed by another, document the consumer's
local dependency and implications under Placement and Ownership.

A concern spanning multiple Domains MUST have one owning Domain or attributable external source. Reference external
Domain requirements when they materially constrain a Solution. Treat unclear cross-Domain rule ownership as an Open
Issue, using the recording scope in Authority and Conflict Rules.

## Authority and Conflict Rules

Domain Definitions, Solution Designs, and SpecDD specifications are authoritative for their owned content. No artifact
type has blanket precedence over another, including when named as a source.

Apply all compatible constraints. A stricter interpretation MAY be applied only when it preserves both sources'
intended ownership and meaning. Treat active authoritative claims or required outcomes as conflicting when they are
mutually incompatible, taking abstraction level and scope into account. Omitted lower-level detail and compatible
additional detail do not establish a conflict or grant implicit permission.

A pre-existing conflict discovered in active scope is blocking unless the Operator explicitly requested the change
that resolves it. When that exception does not apply:

* Identify the conflicting canonical documents and item IDs when available.
* Record the conflict under `Open Issues` in the narrowest affected DSD document already selected for editing;
  otherwise report it without adding an unrelated edit.
* Stop affected work and request explicit Operator resolution. Abstraction level, file location, recency, apparent
  completeness or reasonableness, apparent intent, and current implementation behavior cannot substitute for that
  resolution.

Investigate conflicts within the requested task scope. Apply requested intent changes through
Synchronization.

## Write Authority

An explicit Operator request or a synchronization operation selected by the Content Gate authorizes
creating, modifying, moving, renaming, or deleting affected DSD documents without SpecDD `Owns` or `Can modify` entries.
This authority is limited to DSD documents.

When synchronization requires an affected `.sdd` specification to change, the active DSD workflow selects that spec
for the bootstrap's Spec Edit Authority rules.

Implementation work must be explicitly requested. Authorize implementation and all other non-DSD edits through the
bootstrap's Operating Rules and Write Authority, including its pre-operation authority snapshot for non-`.sdd`
artifacts. DSD references and realization mappings provide context and traceability under those rules.

## Output and Self-Containment

Write DSD documents in concise, explicit technical Markdown that supports decisions and can be reviewed by humans and AI
agents. Use consistent structure. Machine-oriented schemas, schema versions, serialization formats, and mandatory
metadata blocks require an explicit request.

A Domain Definition MUST be understandable on its own for its stated scope. A Solution Design MUST be understandable
after reading its owning Domain Definition, without reconstructing its architecture from the source tree. Use
Document Topics to assess whether each document contains the information needed to make decisions at its level of
abstraction.

When an external requirement materially affects a document, include its reference, why it matters, the local concern
it affects, and any local design or verification implication.

Use stable IDs, bullets, labeled records, concise tables, diagrams, formulas, and examples when they improve precision.
Use Markdown tables only for short comparable data; use consistently labeled records or lists for hierarchical,
paragraph-heavy, or wrapping content. Delimiter-separated pseudo-tables are prohibited.

Leave blank lines around headings, lists, tables, diagrams, and fenced code blocks where needed for source readability.
Indent nested list content consistently and add a language identifier to fenced blocks when applicable.

Use meaningful, precise headings. Empty, decorative, placeholder-only, redundant, obvious, and `N/A` sections fail the
Content Gate. Generic headings such as `Other`, `Miscellaneous`, and `Additional considerations` are unsuitable; choose
a domain-specific heading for material content outside the topic menus.

Use `MUST`, `MUST NOT`, `SHOULD`, `SHOULD NOT`, and `MAY` consistently for obligation strength. Record business or delivery
priority separately when it materially affects sequencing or decisions. Deviations from `SHOULD` or `SHOULD NOT`
require a documented justification in the relevant requirement notes, decision, or Open Issue.

## Sources and Uncertainty

Base documented facts and intent on attributable material. This applies to objectives, requirements, constraints,
architecture, decisions, interfaces, thresholds, source authority, ownership, acceptance, and realization mappings.
Every normative DSD requirement MUST identify its source. Use source references a reviewer or agent can resolve.

Distinguish confirmed facts and authoritative sources from:

* Required unknowns: mark them `TBD` and state what must be determined when that is not obvious.
* Inferences: mark them `ASSUMPTION` and state their basis.
* Observations: classify observed implementation as current-state evidence; intended behavior requires a separate
  attributable basis.
* Historical material: it establishes current requirement authority only when the project explicitly uses it that way.
* Recommendations: keep proposals distinguishable from established intent.

Distinguish current, target, and transitional state where material. Resolve contradictions through
Authority and Conflict Rules.

Quantify quality requirements only with attributable thresholds, preferring supported measures to subjective terms.
Proposed thresholds MAY be presented separately as recommendations and become requirements only after explicit
approval or attribution to an authoritative source.

Source forms include:

```text
Source: trip-planning#BR-4
Source: trip-planning/itinerary#FR-7
Source: trip-planning
Source: trip-planning, section Business Objectives
Source: SpecDD /src/trips/itinerary.sdd
Source: user instruction, YYYY-MM-DD
Source: ISSUE-482
Source: RFC-17 section 3.2
Source: contract-v4.pdf section 8.1
Source: ASSUMPTION: <statement or assumption ID>
Observed in: src/trips/itinerary.js:<line or symbol>
Historical source: trip-planning#BR-4
Historical source: trip-planning, section Business Objectives
```

## Requirements and Traceability

Each normative requirement MUST express one material, unambiguous obligation that is verifiable in principle. Identify
actors, triggers, conditions, behavior, outputs, and failures when material. Use one requirement per independently
changeable obligation, keeping an inseparable obligation together.

Confirm feasibility when evidence supports it. Preserve requirements whose feasibility is uncertain or whose
implementation appears difficult, and record a `TBD`, assumption, feasibility concern, or Open Issue as appropriate.

Record real dependency and realization relationships, linking:

* objectives to requirements;
* Domain requirements to applicable Solution requirements or consequences when material;
* requirements to applicable decisions;
* requirements to acceptance criteria;
* Solution requirements to implementing SpecDD specifications when the mapping is material.

Use Content Identifiers for traceable requirements. A compact entry is:

```markdown
- **FR-1 - MUST:** <atomic verifiable requirement>
    - **Source:** <source>
    - **Realized by:** <DSD or SpecDD references when material>
    - **Verified by:** `AC-1`
```

Include optional fields such as `Realized by`, `Priority`, `Applies to`, and `Rationale` only when they add unique
material information.

## Realization by SpecDD

SpecDD specifications are realization artifacts in the source tree, separate from the DSD filesystem hierarchy. All
DSD-to-SpecDD realization relationships are explicit. A Solution MAY be realized by specifications in different parts of
the source tree. A spec may contribute to multiple Solutions when the shared responsibility is intentional and
explicitly traceable.

Reference each known SpecDD specification by its exact `.sdd` path relative to the applicable content root. Prefer
root-relative prose notation, such as `SpecDD /src/trips/itinerary.sdd`. A directory or glob is appropriate only when the
relationship is genuinely defined by a variable set; its membership must be explicit. A name-based project mapping
also requires an explicit project rule or reference.

When Domain or Solution intent materially constrains implementation, the applicable SpecDD specification SHOULD state
the local consequences so implementation work respects that intent. Prefer the local consequence over verbatim
duplication. For example, a Domain rule preserving itinerary items after trip-date changes may yield a local rule
keeping out-of-range items for reassignment.

When local safety requires restating a DSD rule in SpecDD, scope it to the implementation boundary and explicitly
reference the DSD document when SpecDD language and project conventions permit. This is deliberate overlap subject to
Synchronization.

The Minimal Solution Design Example demonstrates realization mappings with local
responsibilities.

## Decisions

Give each material Domain, architecture, or design decision a `DEC` identifier from
Content Identifiers. A decision records a choice that constrains future work, selects among
meaningful alternatives, explains a non-obvious choice, or establishes a boundary future changes must preserve.
Implementation facts and requirements retain their own content roles.

Use this compact labeled form:

```markdown
- **DEC-1 - <decision title>**
    - **Context:** <why the decision is needed>
    - **Decision:** <selected approach>
    - **Alternatives:** <material alternatives considered>
    - **Consequences:** <material effects and trade-offs>
    - **Source:** <source>
```

`Decision` and `Source` are required for an identified decision. Include the other fields when they have material
content. Add a status field to a decision entry only when supported by an existing convention or an Operator request.

## Acceptance and Verification

Give acceptance criteria `AC` identifiers from Content Identifiers. They SHOULD verify
requirements at the same abstraction level:

* Domain acceptance may concern business outcomes, Domain-wide invariants, cross-Solution behavior, compliance, and
  end-to-end capability.
* Solution acceptance may concern externally observable behavior, integration outcomes, architecture-significant
  qualities, end-to-end scenarios, and operational behavior.

An acceptance criterion MAY be verified by several SpecDD scenarios or tests. Maintain a credible verification path
for material DSD requirements, or record why verification is inapplicable. Requirement references in acceptance criteria
must resolve to existing requirements. Implementation-local test detail follows Placement and Ownership.

## Documentation Security

DSD documents MUST exclude credentials, private keys, access tokens, secret values, authentication secrets, and
equivalent sensitive material. Permitted references include approved secret locations, configuration keys, secret
identifiers, classifications, and external controlled documents.

Exclude unnecessary personal data and production-data samples containing sensitive information. Restricted
implementation or infrastructure detail requires a repository approved to contain it.

Preserve only the minimum sensitive context needed for requirements, design, implementation, verification, operation,
or compliance.

## Document Topics

Use the following topic menus to select the smallest set of sections that makes each document self-contained and
provides the information needed to make decisions at its level of abstraction. A topic may be represented as a section,
subsection, paragraph, list, table, diagram, or identified record. Extend the menus with precise domain-specific topics
when material content requires them.

### Domain Definition topics

#### Document orientation

1. Executive summary

#### Domain context

1. Purpose and problem space
2. Business objectives and success measures
3. Scope, non-goals, and Domain boundary
4. Stakeholders, users, and actors
5. Current state and target state
6. Assumptions, constraints, and dependencies

#### Domain model

1. Terminology and glossary
2. Concepts, entities, and information
3. Capabilities
4. Business processes and workflows
5. Business and Domain rules

#### Domain requirements

1. Business requirements
2. Cross-Solution functional requirements
3. Quality attributes and non-functional requirements, including cost, licensing, and maintainability
4. Security, privacy, safety, and compliance
5. Data and information governance

#### Solution landscape

1. Solutions and responsibilities
2. Cross-Solution relationships
3. External Domains and systems
4. Domain-wide interfaces and dependencies
5. Cross-cutting constraints and policies

#### Domain evolution and assurance

1. Domain decisions
2. Transition and migration context
3. Acceptance and success verification
4. Risks and mitigations
5. Traceability
6. Open Issues
7. References

### Solution Design topics

#### Document orientation

1. Executive summary

#### Solution context

1. Problem and objective
2. Scope and non-goals
3. Applicable Domain context
4. Stakeholders, users, and actors
5. Current state and target state
6. Assumptions, constraints, and dependencies

#### Requirements and behavior

1. Applicable Domain requirements
2. Functional requirements
3. Quality attributes and non-functional requirements, including cost, licensing, and maintainability
4. Use cases, workflows, states, and scenarios
5. Business and Domain rule implications
6. Security, privacy, safety, and compliance

#### Solution design

1. Solution strategy and architecture overview
2. Static structure: components, responsibilities, and boundaries
3. Runtime behavior and interactions
4. Data model, lifecycle, and governance
5. Interfaces and integrations
6. Deployment architecture and runtime environment
7. Cross-cutting design concepts and policies
8. Architecture and design decisions

#### Realization and evolution

1. SpecDD realization
2. Compatibility and migration
3. Rollout and decommissioning
4. Operations, observability, resilience, recovery, and support

#### Assurance and unresolved matters

1. Acceptance criteria and verification
2. Risks, technical debt, and mitigations
3. Traceability
4. Open Issues
5. References

## Minimal Domain Definition Example

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
    - **Source:** product requirements

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

## Minimal Solution Design Example

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

Examples illustrate structure only.

Do not copy their requirements, architecture, terminology, or identifiers into another project unless supported by that
project's sources.

## Synchronization

When requested work passes the Content Gate, identify every materially affected Domain Definition,
Solution Design, SpecDD specification, and implementation artifact within Write Authority.
Synchronize all selected authoritative DSD and SpecDD artifacts in the same task.

Evaluate change propagation as follows:

* **Domain change:** affected Solutions in that Domain, explicitly dependent Solutions in other Domains, and affected
  SpecDD specifications.
* **Solution change:** its owning Domain when shared rules or Domain boundaries may have changed, dependent Solutions,
  and affected SpecDD specifications.
* **SpecDD change:** DSD documents whose documented Domain or Solution intent materially changes. If a referenced spec
  moves or is renamed, update its realization mappings while the relationships remain active.
* **Implementation refactoring:** DSD documents only when realization mappings or other documented DSD content materially
  change. Assess any newly observed behavior through Sources and Uncertainty.

An explicit Operator request that unambiguously changes intent selects all affected authoritative artifacts for this
synchronization. Temporary inconsistency while applying that single change is permitted until task completion and is
distinct from a pre-existing conflict.

Keep edits within the selected scope, following the bootstrap's Working Procedure for avoiding unrelated restructuring,
cleanup, renaming, or wholesale rewriting. With unchanged inputs, repeating the same requested update must not create
duplicate records or unnecessary changes.

## Lifecycle and Deletion

Repository history is the document lifecycle and change history, including decision history. In the current work tree,
current document contents are active, including uncommitted changes. Outside that tree, use the target branch's
committed state; changes on other branches or merge requests remain proposed until incorporated into the target state.

Parallel DSD approval, archive, workflow-status, or lifecycle systems require an explicit Operator request.

Remove a whole Domain Definition or Solution Design when it is no longer active, unless the Operator explicitly
requires retained historical documentation. An explicit Operator request may also remove an active document.

Before deleting either document type, update active DSD and SpecDD references and realization mappings. Before deleting
a Domain Definition, resolve every Solution beneath it and determine whether each is removed, migrated, or reassigned.
Leave the active library valid under DSD Library and Document Identity.

When an identified item must remain historically traceable after removal or supersession, retain it as deprecated and
identify its replacement when applicable. Its identifier remains subject to Content Identifiers.

## Workflow

For every DSD task:

1. Resolve the SpecDD selected content root and read its bootstrap chain. Select the library and classify relevant
   documents under DSD Library and Document Identity.
2. Determine the requested scope: Domain-only, Solution-only, DSD synchronization, SpecDD synchronization, or
   implementation work.
3. Read DSD context under Inheritance and Relationships. Read other DSD documents only
   when explicitly referenced or materially necessary for dependencies or shared constraints. Read relevant SpecDD
   specifications and attributable source material when the task crosses into implementation intent or traceability.
4. Extract material facts, objectives, requirements, constraints, decisions, acceptance, relationships, and mappings
   using Sources and Uncertainty and the Content Gate.
5. Assess the existing documents against Validation for omissions, ambiguity, duplicate or misplaced
   content, contradictions, orphaned references, invalid hierarchy, and stale mappings. Handle blocking conflicts
   through Authority and Conflict Rules.
6. Select affected artifacts through Synchronization, establish Write Authority,
   and apply the requested change under the relevant content rules.
7. Perform the checks specified in Validation.
8. Report as specified in Change Reporting, including when the task is interrupted.

## Validation

Before completion, verify all applicable rules in these canonical sections:

* DSD Library and Document Identity: selected root and library, placement, headings,
  hierarchy, unique canonical IDs, and complete reference migration after moves or renames.
* Content Identifiers and Lifecycle and Deletion: format, uniqueness,
  preservation, retirement, replacements, and active document relationships.
* Placement and Ownership and Inheritance and Relationships:
  owning abstraction, canonical content, independent local consequences, active Domain constraints, and terminology.
* Authority and Conflict Rules: compatibility of changed DSD and affected SpecDD,
  correctly classified differences, and explicit handling of discovered blockers.
* Sources and Uncertainty and DSD References: attribution, canonical
  references, source resolution where access is available, and explicit uncertainty and state distinctions.
* Requirements and Traceability, Decisions, and
  Acceptance and Verification: independent obligations, unambiguous records, actual
  relationships, and credible verification coverage.
* Realization by SpecDD: explicit material relationships and current references at the required
  precision.
* Content Gate, Output and Self-Containment, and
  Document Topics: material completeness, unique content, readable Markdown, and appropriate
  structure.
* Documentation Security: secrets, personal and production data, restricted details, and
  minimum sensitive context.
* Write Authority and Synchronization: authorized scope, completed propagation,
  and a repeat update that creates no unnecessary changes.

## Change Reporting

After each completed or interrupted task, report concisely:

* Domain Definition and Solution Design files created, modified, moved, renamed, or deleted;
* canonical document IDs added or changed, and content identifiers added, changed, deprecated, or replaced;
* material objective, requirement, Domain, architecture, design, or acceptance changes;
* Domain-to-Solution relationships and DSD-to-SpecDD realization mappings changed;
* SpecDD specifications synchronized;
* implementation files changed, or explicitly that none changed;
* assumptions, `TBD`s, Open Issues, conflicts, and inaccessible required sources;
* validation results and remaining blockers.

Report any blocking `TBD`, unresolved ambiguity, inaccessible required source, unresolved conflict, orphaned Solution,
or failed validation check, and mark the affected work incomplete while blocked.

Treat formatting edits as material only when they affect document identity, interpretation, or validation.
