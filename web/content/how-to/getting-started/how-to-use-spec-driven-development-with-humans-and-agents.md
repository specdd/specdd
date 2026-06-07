---
title: "How to use spec-driven development with humans and agents"
seoDescription: "Learn how to use spec-driven development with humans and agents by keeping intent, ownership, boundaries, and completion criteria in local specs."
excerpt: "Use spec-driven development with humans and agents by keeping durable rules in local specs, asking for the actual task, and reviewing the result against the contract."
level: "Beginner"
howtoID: "1001001"
weight: 20
---

Humans and agents work better when they do not have to guess the project context. Spec-driven development gives the
work a local contract before anyone plans or edits files. With SpecDD, that contract lives in `.sdd` files beside the
files, directories, workflows, or infrastructure they describe.

This guide shows the basic workflow for using spec-driven development with human contributors and agents such
as Claude Code, Codex, GitHub Copilot, Cursor, Windsurf, Gemini CLI, OpenCode, Junie, Cline, and others.

## Short answer

Put the relevant intent in a local `.sdd` file, then ask for the actual task: the spec, feature, task, or behavior you
want changed. The SpecDD project instructions handle the workflow. Requests should use human names, not full file paths.

{{< protip title="Agent workflow tip" >}}
Do not turn every task prompt into a bootstrap prompt. Put durable rules in specs, then ask for the work that needs to
be done.
{{< /protip >}}

## Why specs help

A prompt is temporary. A spec is versioned project context. When the important rules live only in chat, every new agent
session and every human handoff starts with the same risk: the next contributor may infer the wrong ownership boundary,
change nearby files because they look related, or implement a broader feature than requested.

SpecDD gives contributors a path-based way to find the relevant context:

- bootstrap files explain how work should happen in the project
- root specs provide broad project context
- directory specs define local areas
- same-basename specs define nearby file contracts
- explicit `References` add context without granting edit permission

The result is a smaller prompt and a more reviewable change.

## Prerequisites

Before you start, make sure:

- SpecDD has been initialized in the project
- the repository has an `AGENTS.md` entrypoint
- the relevant area has at least a root or local `.sdd` spec
- your agent, if you use one, can read project files

For agent-specific setup, start from the [tools page](/tools/).

## Steps

### 1. Name the spec or feature

Every contributor needs a concrete subject. A request like "improve billing" leaves too much room for inference. Prefer
a spec, feature, task, or behavior:

```text
Implement task 1 in the Itinerary spec.
```

or:

```text
Fix missing-place validation in the Itinerary feature.
```

The project instructions and specs give the durable SpecDD context. The request gives the specific work.

### 2. Prompt only the requested task

Use the shortest prompt that identifies the work:

```text
Complete the open task in the Itinerary spec.
```

If the task needs a specific outcome, include that outcome:

```text
Fix missing-place validation in the Itinerary feature.
```

### 3. Implement a small slice

Keep the request narrow:

```text
Implement the missing-place validation task.
```

SpecDD works best when contributors implement one spec or a small related group of specs at a time. Large multi-area
requests make it harder to preserve local authority.

### 4. Review the result against the spec

Review the output as a contract check:

- Did the change satisfy the relevant `Must` rules?
- Did it avoid every relevant `Must not` and `Forbids` rule?
- Did it modify only paths allowed by `Owns` or `Can modify`?
- Did it add or update tests for the scenarios?
- Did it update task status only after verification?
- Did it report any uncertainty instead of silently guessing?

If the work reveals missing context, update the spec. Do not leave the new rule buried in a chat transcript or review
comment.

## Example prompt

Use this prompt for a small implementation:

```text
Implement the open task in the Itinerary spec.
```

## SpecDD pattern

This workflow uses:

- `Owns` or `Can modify` to define what may change
- `Can read` and `References` to provide context without edit permission
- `Must` to define required behavior
- `Must not` and `Forbids` to prevent plausible boundary mistakes
- `Tasks` to create local work packets
- `Done when` and `Scenario` to guide verification

## Common mistakes

- Asking someone to "read the repo" instead of naming the spec or feature.
- Treating sibling specs as authority when they are not inherited or referenced.
- Repeating bootstrap instructions in every prompt instead of keeping prompts task-focused.
- Combining several instructions into one prompt.
- Using `References` as if it grants permission to edit another area.
- Asking for too many unrelated specs in one pass.

## How to verify the result

You are using spec-driven development with humans and agents correctly when:

- prompts identify the actual spec, feature, task, or behavior
- prompt examples use spec, feature, or task names instead of full file paths
- the change satisfies the spec without expanding the scope
- checks run or the implementer explains why they could not run
- the final report names files changed, checks, and uncertainty

## Related how-tos

- [How to move from vibe coding to spec-driven development](/how-to/getting-started/how-to-move-from-vibe-coding-to-spec-driven-development/)
- [How to use SpecDD in 10 minutes](/how-to/getting-started/how-to-use-specdd-in-10-minutes/)
- [How to run your first spec-driven change end to end](/how-to/getting-started/how-to-run-your-first-spec-driven-change-end-to-end/)

## Related reference

- [Quickstart](/quickstart/)
- [Tools](/tools/)
- [Language reference](/language-reference/)
