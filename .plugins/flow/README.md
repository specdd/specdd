---
title: Flow plugin
seoDescription: "Implement complex changes efficiently and reliably with SpecDD Flow: reviewed plans, focused sub-agents, safe parallel work, and human oversight."
---

Flow is a SpecDD framework plugin that helps your coding agent organize and deliver complex changes more efficiently
and reliably. It gives the agent a repeatable framework for turning a large request into bounded assignments, reviewed
results, and a verified implementation. Your main agent coordinates the work through a temporary plan that you review
before implementation and can use to follow and steer progress.

**Ask for Flow explicitly for each task.** Installing the plugin, entering a planning mode, or approving an ordinary
plan does not start Flow automatically.

## Why use Flow

A direct prompt works well for clear, straightforward work, including many tasks of moderate size. SpecDD specs give
the agent the behavior, constraints, and local boundaries it needs.

A large request also leaves the agent to work out how to divide, sequence, and verify the work while carrying the job
through a growing conversation. Requirements, decisions, findings, and unfinished work compete for space in the context
window. As the task develops, earlier assumptions and the reasons for later steps can become harder to keep track of.

Flow makes the execution process explicit. Its working plan records stages, dependencies, decisions, and progress
outside the conversation, giving the coordinator a record to check and resume from. Focused assignments give sub-agents
manageable parts of the problem. Your designs and specs remain the sources of intended behavior.

Context follows the current decision and affected dependencies. Agents reuse reliable material and load more when a
specific need arises, rather than reading every available document or copying the full conversation into each task.
Explicit reading requirements in governing instructions still apply.

The workflow supports reliability by reviewing results before dependent tasks use them and checking the combined
implementation against the agreed outcome. It also gives you opportunities to intervene: review the proposed approach,
inspect progress, question an assumption, pause the run, or redirect work through the coordinator. You can influence the
implementation as it develops, with material changes brought back for your decision.

The efficiency comes from useful parallel work, less repeated planning, and less avoidable rework. The coordinator
assigns work, collects results, and arranges repairs, reducing the manual effort of composing follow-up prompts and
relaying findings between agents. The saved plan helps avoid reconstructing the whole task after an interruption.

Verification follows affected behavior and risk, rather than diff size. Minor wording or presentation changes normally
need inspection and focused checks. Larger logic changes use targeted regression tests during development, followed by
relevant integration and full-suite checks on the combined result. Major or cross-cutting impact, uncertainty, failures,
explicit project requirements, and your requests can justify broader runs.

Visual checks cover affected views and states, with relevant responsive, theme, and accessibility checks. Shared UI
changes call for representative checks across affected consumers, without retesting unrelated screens and features.

Workers run scoped checks, shared checks have one owner, and valid results are reused across stages and handoffs.
Comprehensive testing or 100% coverage applies to the final agreed scope, not every intermediate step. Final verification
does not automatically mean running every repository suite; project coverage boundaries, thresholds, and mandatory
checks still apply. Repairs trigger affected checks, unrelated failures do not silently expand the task, and verification
ends when the agreed outcome and required checks are satisfied.

Planning, delegation, and review also take time and consume tokens. Use your judgment about whether Flow's coordination
is likely to save more effort than it adds. Task size alone is not a reason to use it.

## When Flow helps

Consider Flow when a change has enough connected work to benefit from deliberate coordination, for example:

- A feature spans storage, services, interfaces, tests, and documentation.
- A refactor or migration needs related changes across several components.
- Repetitive investigation or preparation can be split across agents before applying consistent changes.
- The work is long enough that preserving progress between sessions would help.

## Flow, planning modes, and direct edits

| Approach                             | Use it when                                                                              | What it provides                                                                                           |
|--------------------------------------|------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------|
| Direct prompting with SpecDD         | The work is understood and inexpensive to complete with little coordination.             | An agent performs the requested work under the existing specs.                                             |
| Planning mode or a design discussion | You need to explore options, resolve requirements, or review an approach before editing. | A proposed approach you can discuss and refine.                                                            |
| Flow                                 | Assignments and dependencies need enough coordination to justify the added workflow.     | A reviewed execution plan, coordinated delegation, integration, verification, and progress you can resume. |

For straightforward small or medium tasks that are inexpensive to implement and verify, direct prompting is usually
enough. Use planning or discussion for an explanation, design exploration, or a proposal you do not yet want
implemented.
Choose the approach that fits the work's dependencies, uncertainty, and expected coordination effort.

You can use a planning mode first, then explicitly ask Flow to implement the agreed design. Flow prepares its temporary
execution plan for your review before coordinating implementation. Its added value is the delivery workflow around
that plan: assignments, dependencies, review, and combined verification. Having a plan or saying "go ahead" alone does
not activate Flow.

## How Flow works

1. **Prepares a plan.** The coordinator uses your request, relevant designs, specs, and existing implementation to
   define the work. It saves a temporary plan with stages, assignments, dependencies, and checks, then asks you to
   review it.
2. **Works through the approved scope.** After approval, it delegates bounded tasks and runs independent work in
   parallel where safe. Work with dependencies proceeds in order. You can follow progress through the coordinator.
3. **Reviews and combines results.** The coordinator checks the actual changes, sends findings back for repair, and
   arranges integration. Separate reviewers participate when the available agent capabilities support them.
4. **Verifies and finishes.** It checks the combined implementation against the agreed outcome and required checks,
   deletes the temporary plan, and reports what changed, what passed, and any remaining limitations.

For example, a saved-trip duplication feature might need investigation of storage, interface behavior, and test
coverage. Flow can assign those investigations to separate agents. If their proposals affect shared code, one designated
agent reconciles and applies the coordinated changes. This keeps useful preparation parallel while shared edits have
one owner.

Parallel editing is allowed only when the coordinator can establish that the assignments will not interfere with one
another. Separate files can still depend on shared interfaces or tooling, so file boundaries alone are insufficient.
When safe independence is unclear, Flow serializes edits and keeps independent preparation parallel.

## Install

Run these commands from your project's SpecDD root, the directory containing `.specdd/bootstrap.md`:

```bash
specdd plugin add @specdd/specdd flow
specdd plugin list
```

The list should include Flow. The plugin works through your agent's available capabilities and does not depend on a
particular agent product or model. Delegation requires sub-agent support. If that support is unavailable, Flow can
propose a sequential approach for your approval; work that you explicitly require separate agents to perform waits for
that capability.

## Use Flow for a task

For a feature you have already discussed, ask for Flow by name:

```text
Use Flow to implement saved-trip duplication from our reviewed design.
```

The coordinator creates a plan such as `.specdd/plan/saved-trip-duplication.md` and presents it for review. Check the
scope, approach, and proposed verification, then request changes or approve execution:

```text
Approve revision 1 of the Flow plan and implement it.
```

Approval covers that scope through implementation, verification, and plan deletion. Routine progress and repairs do not
require approval at each stage. A material change to the agreed scope or acceptance criteria comes back to you for a
decision unless you have already authorized it.

## Temporary plans and interruptions

Plans live in `.specdd/plan/` under your SpecDD root. Before saving a plan, Flow ensures that `.specdd/.gitignore`
excludes the plan directory, adding `/plan/` if needed. Plan storage and changes to that ignore file need the usual
SpecDD write authority; the agent identifies any missing permission during preparation.

An interruption keeps the plan available so you can resume the work:

```text
Resume the Flow plan at .specdd/plan/saved-trip-duplication.md.
```

The coordinator compares recorded progress with the current files before continuing. If a required check fails or a
blocker remains, it reports the issue and retains the plan for recovery. Explicitly abandoning a run removes its
temporary files while preserving implementation changes for your review.

Successful completion includes deleting the plan and its temporary supporting files. Completed plans are not archived
or committed. Lasting requirements and decisions belong in your project documents, and the final response gives you the
implementation and verification summary. If cleanup fails, Flow reports it and keeps the run incomplete until cleanup
succeeds.

See the [Flow agent instructions](https://github.com/specdd/specdd/blob/main/.plugins/flow/plugin.md) for the detailed
coordination rules.
