---
title: "How to fix an agent that cannot find the right local spec"
seoDescription: "Fix an agent that cannot find the right SpecDD local spec by checking working directory, content root, same-basename placement, directory specs, references, and target path."
excerpt: "Troubleshoot local spec discovery by confirming the agent starts from the right root, targets the right path, and can resolve same-basename and referenced specs."
level: "Beginner"
howtoID: "1191009"
weight: 100
---

This guide shows you how to fix an agent that cannot find the right local spec.

This is usually a resolution problem, not an agent intelligence problem. The agent may be starting from the wrong root,
targeting the wrong file, or looking for a spec that is not placed according to SpecDD rules.

## Short answer

Start from the concrete target path. Make sure the agent is running from the SpecDD content root, the local same-basename
spec exists beside the target when expected, directory specs are named and placed correctly, and sibling context is
referenced explicitly. Then ask the agent to explain the specific feature or spec.

## Steps

### 1. Confirm the target path

Use a real path:

```text
src/trips/itinerary.js
```

Avoid vague targets such as:

```text
the trips stuff
```

SpecDD resolution needs a file, directory, `.sdd` spec, feature, or task that maps to local context.

### 2. Check the agent working directory

The agent should start from the content root that contains:

```text
.specdd/bootstrap.md
travel-planner.sdd
```

If it starts inside `src/trips/`, it may miss the root project spec and parent context.

### 3. Check same-basename placement

For:

```text
src/trips/itinerary.js
```

the local same-basename spec is:

```text
src/trips/itinerary.sdd
```

If the spec is named `trip-itinerary.sdd`, placed in `docs/`, or stored in a sibling folder, the agent will not treat it
as the local same-basename spec unless the applicable chain references it.

### 4. Check directory specs

Directory context can come from:

```text
src/trips.sdd
src/trips/trips.sdd
```

Parent-held and local directory specs are cumulative. If one is missing, the local file spec may lack important inherited
context.

### 5. Check explicit references

Sibling specs are not inherited automatically.

If Itinerary needs TripStorage context, add:

```sdd
References:
  ../storage/trip-storage.sdd
```

or:

```sdd
Can read:
  ../storage/trip-storage.sdd
```

References provide context, not edit permission.

### 6. Use resolve or an explanation prompt

If the CLI is available:

```sh
specdd resolve src/trips/itinerary.js --sections Spec,Owns,Can modify,Must,Must not,Tasks
```

Without the CLI, use:

```text
Explain the Itinerary spec.
```

The response should name the local spec and relevant parent context.

## Common causes

- Agent starts in a nested folder.
- The prompt names a broad area instead of the target.
- The local spec has a mismatched basename.
- Directory specs are missing or misnamed.
- Sibling specs are expected to apply without references.
- Case-only filenames create ambiguity.
- The root spec is missing or misnamed.

## How to verify the fix

The agent found the right local spec when:

- it names the target spec
- it includes relevant parent specs
- it identifies writable scope
- it treats referenced specs as read context
- it avoids unrelated sibling specs
- it can plan the task from the local contract

## Related how-tos

- [How to debug spec resolution problems](/how-to/troubleshooting/how-to-debug-spec-resolution-problems/)
- [How to fix an agent that ignores your specs](/how-to/troubleshooting/how-to-fix-an-agent-that-ignores-your-specs/)
- [How to manage context for agents](/how-to/agent-workflows/how-to-manage-context-for-agents/)
- [How to resolve ambiguous spec match warnings](/how-to/troubleshooting/how-to-resolve-ambiguous-spec-match-warnings/)

## Related reference

- [Language reference](/language-reference/)
