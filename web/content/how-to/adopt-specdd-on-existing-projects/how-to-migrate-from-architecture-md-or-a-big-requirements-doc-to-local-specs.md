---
title: "How to migrate from ARCHITECTURE.md or a big requirements doc to local specs"
seoDescription: "Migrate from ARCHITECTURE.md or big requirements documents to local SpecDD specs for spec-driven development by extracting durable rules, mapping them to owners, and leaving rationale in docs."
excerpt: "Break large architecture and requirements docs into local SpecDD contracts while keeping background, rationale, and broad product context in ordinary docs."
level: "Intermediate"
howtoID: "1111005"
weight: 90
---

This guide shows you how to migrate useful material from `ARCHITECTURE.md`, a large requirements document, or similar
central docs into local SpecDD specs for a spec-driven development workflow.

The goal is not to delete every old document. Large docs are often good for history, rationale, product context, and
cross-team decisions. SpecDD local specs are better for the durable contracts that should guide implementation and
review near the code.

## Short answer

Classify the large document into durable local rules, background, rationale, open questions, and outdated material. Move
durable behavior, ownership, boundaries, dependencies, tasks, and completion criteria into the specs that own them.
Keep broad explanation and decision history in ordinary docs, and link those docs as context instead of copying them
wholesale into `.sdd` files.

## When to use this guide

Use this guide when:

- one architecture doc contains rules for many modules
- requirements are hard to find during code review
- agents miss constraints buried in long documents
- old docs no longer match code
- a team wants source-adjacent contracts without losing design rationale

## Steps

### 1. Inventory the large document

Read the document for structure, not prose polish.

Mark sections as:

- project-wide convention
- architecture rationale
- durable local behavior
- module ownership
- dependency direction
- forbidden approach
- public contract
- open question
- obsolete claim
- background explanation

This classification decides where each piece belongs.

### 2. Keep project-wide conventions in bootstrap.project.md

Rules for the whole project belong in:

```text
.specdd/bootstrap.project.md
```

Examples:

- build and test commands
- naming conventions
- syntax or formatting rules
- dependency policies
- generated-file rules
- where ADRs, runbooks, or product docs live
- team workflow conventions

Do not put project-wide conventions in root specs, local specs, or a separate convention spec.

### 3. Choose owning specs

For each durable rule, choose the spec that owns it.

Examples:

```text
ARCHITECTURE.md rule:
  Itinerary behavior must not write directly to browser storage.

Owning spec:
  src/trips/itinerary.sdd or src/trips/trips.sdd
```

If a rule applies across several child areas, put it in the parent spec that owns the boundary. If a rule applies to one
file or service, use the nearer local or same-basename spec.

Avoid copying the same rule into many children.

### 4. Move durable local rules

Translate large-doc statements into SpecDD sections.

Architecture doc:

```md
Itinerary code should never manipulate destination ranking. Destination search is owned by the destination module.
```

Local spec:

```sdd
Must not:
  Change destination search ranking.

References:
  ../destinations/destination-search.sdd
```

Use:

- `Purpose` for the subject's reason to exist
- `Structure` for local organization and immediate children
- `Owns` and `Can modify` for authority
- `Can read` and `References` for context
- `Must` for required behavior
- `Must not` for non-goals and boundaries
- `Forbids` for blocked dependencies, paths, tools, libraries, modules, or access
- `Tasks` and `Done when` for local work and completion

### 5. Keep rationale in ordinary docs

Do not force all rationale into `.sdd` files.

Keep these in `ARCHITECTURE.md`, ADRs, RFCs, product docs, or team docs:

- alternatives considered
- historical discussion
- stakeholder decisions
- rollout plans
- product background
- diagrams that explain the system broadly
- research notes

Specs should include only the local rule that must guide future work.

### 6. Link context deliberately

Use existing docs as context when they remain useful.

Project-wide doc locations belong in `.specdd/bootstrap.project.md`:

```md
## Project documentation

- `./docs/architecture/`: architecture rationale and diagrams
- `./docs/adr/`: accepted architecture decisions
- `./docs/runbooks/`: operational notes
```

Local specs can point to specific docs:

```sdd
Can read:
  /docs/adr/storage-boundary.md
```

or:

```sdd
References:
  /docs/architecture/trip-planning.md
```

These links provide context. They do not grant write authority.

### 7. Review and retire stale claims

When a large doc is old, migration is also cleanup.

For each moved rule, decide:

- true and intended
- true but implementation detail
- false because code changed
- false because the doc was wrong
- unknown and needs a decision

Do not move stale claims into specs just because they were in a respected document.

### 8. Update the old document

After migration, the old doc should not compete with local specs.

Options:

- keep a short overview and link to local specs
- mark migrated sections as superseded
- remove stale implementation rules
- keep diagrams and rationale
- add a note that local `.sdd` specs govern implementation authority

The final state should make it obvious where reviewers should look for local contracts.

## Common mistakes

- Copying a whole requirements document into one root spec.
- Moving rationale and tradeoffs into local specs.
- Duplicating the same architecture rule in several child specs.
- Keeping stale claims because the old document sounded authoritative.
- Using `References` as permission to edit another area.
- Putting project-wide conventions in local specs.

## How to verify the migration

The migration worked when:

- durable local rules live near the code they govern
- broad rationale remains in appropriate docs
- project-wide conventions are in `.specdd/bootstrap.project.md`
- old docs no longer conflict with local specs
- stale claims were removed or marked for decision
- implementation and review can proceed from the owning specs

## Related how-tos

- [How to link existing docs and content with SpecDD](/how-to/getting-started/how-to-link-existing-docs-and-content-with-specdd/)
- [How to use SpecDD in RFC or design-review workflows](/how-to/teams-and-process/how-to-use-specdd-in-rfc-or-design-review-workflows/)
- [How to map an existing codebase into specs](/how-to/adopt-specdd-on-existing-projects/how-to-map-an-existing-codebase-into-specs/)
- [How to review a spec-only pull request](/how-to/code-review-and-governance/how-to-review-a-spec-only-pull-request/)

## Related reference

- [Language reference](/language-reference/)
