---
title: "How to manage context for agents"
seoDescription: "Manage agent context with spec-driven development by choosing the right content root, relying on inherited specs, using references deliberately, and keeping prompts focused."
excerpt: "Use SpecDD to manage agent context without huge prompts: open the right root, keep specs local, inherit vertical context, and reference outside contracts explicitly."
level: "Intermediate"
howtoID: "1041006"
weight: 85
---

This guide shows you how to manage context for agents in a spec-driven development project without pasting a large architecture document
into every request.

SpecDD manages context through local files and path-based resolution. The agent should work from the selected content
root, inherit parent specs down to the target, include the nearest local spec, and use explicit references for outside
context.

## Short answer

Open the correct project root, keep specs close to the files or areas they describe, and prompt the specific work. Use
parent specs for inherited context, same-basename specs for local file contracts, and `References` or `Can read` for
outside context that should not become write authority.

## When to use this guide

Use this guide when:

- the agent loads too much of the repository
- the agent misses an important local rule
- prompts are getting long because they carry project memory
- a feature depends on another area but should not edit it
- work in a monorepo or nested project keeps resolving from the wrong root

## Steps

### 1. Open the selected content root

The selected content root is the project boundary used for `/` paths, spec indexing, and resolution. It is usually the
repository or workspace root unless the project configures a different SpecDD root.

For a project named `travel-planner`, a minimal root looks like:

```text
travel-planner/
  AGENTS.md
  .specdd/
    bootstrap.md
    bootstrap.project.md
  travel-planner.sdd
```

Start the agent from that root. Opening a nested folder can change how root specs and `/` paths are resolved.

### 2. Choose the nearest useful target

Context starts from the work target. The target might be:

- a feature name
- a spec name
- a local task
- a source file
- a directory

For example:

```text
Plan the Itinerary validation change.
```

That target is narrow enough for the agent to resolve the itinerary context instead of summarizing the whole repository.

### 3. Let parent specs provide inherited context

SpecDD inheritance is vertical. Parent specs apply down the target path.

```text
travel-planner/
  travel-planner.sdd
  src/
    trips/
      trips.sdd
      itinerary.js
      itinerary.sdd
```

For itinerary work, the relevant context can include:

```text
travel-planner.sdd
src/trips/trips.sdd
src/trips/itinerary.sdd
```

This gives the agent project-level rules, trip-area rules, and local itinerary rules without loading unrelated sibling
areas.

### 4. Use same-basename specs for local files

Same-directory basename matching makes local context easy to find:

```text
src/trips/itinerary.js
src/trips/itinerary.sdd
```

The `.sdd` file is the local spec for the matching source file. This works best when spec and source names align with
the project's naming conventions.

### 5. Use `References` for horizontal context

Sibling specs are not inherited automatically. If itinerary behavior needs destination search context, reference it:

```sdd
References:
  ../destinations/destination-search.sdd
```

This makes the outside context explicit. It also keeps authority clear: references provide context, not permission to
edit the referenced area.

### 6. Use `Can read` for read-only implementation context

If an agent may inspect files for context but should not change them, use `Can read`:

```sdd
Can read:
  ../storage/trip-storage.sdd
  ../storage/trip-storage.js
```

This is useful when implementation depends on another module's API or behavior but the current task should stay local.

### 7. Keep prompts focused

After context is in specs, the prompt can name the task:

```text
Implement the open Itinerary validation task.
```

If the agent needs to verify its understanding first:

```text
Explain the Itinerary spec.
```

Do not compensate for missing specs by adding more and more prompt context. Add durable context to the right spec and
review it.

## Context checklist

For a well-managed agent context, confirm:

- the agent starts from the selected content root
- the root spec is named after the selected content root directory
- parent specs define inherited project and area rules
- local same-basename specs define nearby contracts
- sibling context is included only through explicit references
- writable authority remains local
- prompts name the work rather than the repository

## Common mistakes

- Opening a subdirectory and accidentally changing the selected content root.
- Asking the agent to inspect the whole repository for one local task.
- Assuming sibling specs apply because they share a directory.
- Using `References` to pull in too much context for a small change.
- Adding long prompt context instead of updating the relevant `.sdd` file.

## How to verify the result

Agent context is managed well when:

- orientation and planning mention the right root and local spec
- plans do not include unrelated sibling areas
- outside contracts are read only when referenced or allowed
- prompts stay short
- new durable context is added to specs instead of chat

## Related how-tos

- [How to use specs as agent memory](/how-to/agent-workflows/how-to-use-specs-as-agent-memory/)
- [How to keep agent prompts short with SpecDD](/how-to/agent-workflows/how-to-keep-agent-prompts-short-with-specdd/)
- [How to get consistent results across different agents](/how-to/agent-workflows/how-to-get-consistent-results-across-different-agents/)

## Related reference

- [Quickstart](/quickstart/)
- [Language reference](/language-reference/)
