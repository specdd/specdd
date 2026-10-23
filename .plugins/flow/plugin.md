# Flow plugin for SpecDD

## Activate only on an explicit request

Use Flow only when the Operator explicitly requests it for the current task or asks to resume an existing Flow plan.
Installation, project preferences, task complexity, existing plans, and ordinary planning or implementation requests
must not activate it. Approval and continuation messages can continue an already requested run. A separate task needs
its own explicit Flow request.

Act as the coordinator for that run. Maintain its plan, assign work, review results, and complete verification and
cleanup. Keep durable requirements and decisions in their governing designs and specs; use the plan for temporary
execution coordination within SpecDD authority.

## Prepare temporary storage

Store one plan per run at `.specdd/plan/<slug>.md`, relative to the selected SpecDD content root. Use a descriptive
lowercase kebab-case slug. Preserve existing plans; reuse a file only when the Operator selects it for resumption.

Manage Flow's ignore rules only in `.specdd/.gitignore`. Before saving a plan, check whether that file already excludes
the whole `plan/` directory. If needed, create or update it with `/plan/`, preserving unrelated entries. The pattern is
relative to `.specdd/`, including when the selected SpecDD root is a repository subdirectory.

In a Git working tree, verify the effective ignore rule for the directory and chosen file. Check for tracked files
under the directory: ignoring a path does not untrack it. Resolve any tracked plan files with appropriate authorization,
preserving their working copies, before saving a plan.

If Git is unavailable or the project is not a Git working tree, still ensure `.specdd/.gitignore` contains the exclusion
and report that Git behavior could not be checked. If the required ignore setup cannot be completed, keep preparation
in the response until it is resolved.

Keep temporary coordination files in the plan directory. Prefer one plan and agent responses over additional files;
record any additional temporary files by exact path for deletion. Do not stage, commit, archive, or retain copies of
plans.

## Build the execution plan

Use the selected requirements, designs, specs, and implementation to identify the outcome, affected work, and unresolved
decisions. Record relevant source revisions and pre-existing working changes for later reconciliation.

Divide the work into stages with clear entry and exit conditions. Establish shared contracts before dependent
implementation, group independent tasks where useful, and include integration and final verification. Use only the
stages the work needs. Give tasks stable IDs and explicit dependencies without cycles.

Check the host's delegation capabilities. Record whether agents share a workspace or require integration from separate
workspaces, and choose a concurrency limit within the available capacity. If sub-agents are unavailable, disclose that
limitation and propose sequential execution by the coordinator for approval. Work that explicitly requires separate
agents or independent review remains blocked until those capabilities are available.

Use this plan structure, replacing placeholders and expanding task briefs as needed:

```markdown
# Implementation plan: <feature>

Status: awaiting-review
Revision: 1
Approved revision: none
Approval: pending

## Outcome and scope

Intended result, included work, exclusions, assumptions, and open decisions.

## Sources and starting state

Governing requirements and specs, source revisions, allowed changes, and relevant existing edits.

## Execution

Agent capabilities, execution mode, concurrency limit, workspace arrangement, shared resources,
and responsibility for applying and integrating changes.

## Stages and tasks

Ordered stages with entry and exit conditions.

### T1: <task>

- Objective and sources:
- Depends on:
- Read dependencies and shared resources:
- Write scope:
- Work mode and integration owner:
- Deliverables:
- Acceptance and checks:
- Assigned role:
- State: pending

## Verification

Checks for the combined result and their outcomes.

## Progress and decisions

Assignments, review findings, accepted results, repairs, blockers, and next actions.

## Temporary files

Exact paths of this plan and any other temporary files belonging to the run.
```

Include required spec, test, and documentation work as tasks. Distinguish read-only work, proposals prepared in isolation,
and edits to the shared implementation. For each proposed parallel group, explain how its reads, writes, and command
side effects can coexist safely. The revision identifies the planned scope and acceptance criteria; progress and
assignment updates do not by themselves create a new revision.

## Obtain approval to execute

Present the saved plan and summarize its outcome, stages, proposed parallel work, checks, and open decisions. State that
successful completion includes deleting the plan. Ask the Operator to approve execution of that revision or request
changes, and wait before starting implementation.

Record the actual approval and approved revision. Do not infer approval from a prefilled status, silence, or approval
of a different design or plan. Use existing approval of the same saved revision and scope without asking again.

After approval, set the status to `executing` and proceed through stages and routine repairs. Material changes to the
outcome, scope, shared contracts, write boundaries, execution mode, or acceptance criteria require a revised plan and
approval unless the Operator's instruction already authorizes them. Stop affected assignments while resolving the
change; independent approved work can continue.

## Assign and coordinate work

Only the coordinator edits the plan. Workers perform bounded assignments and return their results. Reviewers examine
changes and report findings; assign repairs separately. Delegated assignments belong to this run and must not create
another Flow plan or restart its approval process.

Split research, inspection, repetitive analysis, and preparation into parallel assignments where useful. For coupled
changes, prefer workers returning findings or proposed patches from isolated workspaces, with one designated agent
reconciling and applying the unified changes. Give preparation tasks their own acceptance criteria; accepting a proposal
does not establish that the implementation has been applied or verified.

Allow parallel implementation edits only when the coordinator can establish all of the following:

- Write scopes do not overlap, including new files, renames, deletions, generated files, and command side effects.
  Different sections of the same file still require one writer.
- Shared interfaces and relevant read dependencies are stable or isolated. One task's edits must not invalidate another
  task's inputs or assumptions while it runs.
- Commands do not compete for mutable state such as lockfiles, build outputs, test fixtures, databases, or a shared Git
  index. Include formatters, generators, dependency tools, and checks in the write assessment.
- Workspace isolation and integration responsibilities are clear, and the combined changes can be checked together.

File separation alone does not establish independence. If safety is uncertain, serialize edits and parallelize only
independent preparation. Reducing concurrency to avoid a conflict is a scheduling adjustment within the approved scope.

Before dispatching a task:

1. Confirm that its dependencies have been accepted and their outputs are available.
2. Check reads and writes against active assignments, other plans, and existing user changes. Record the assigned writer
   for each writable scope and shared resource. Keep research and review on stable inputs while relevant writers run.
3. Provide the task brief, approved revision, governing sources, workspace, required checks, and expected return format.
   Workers must consult the relevant original instructions and specs, not rely solely on a summary.
4. Require the result to identify the task, starting revision or snapshot, changed or proposed paths, delivered behavior,
   checks and outcomes, and unresolved findings or blockers.

Run eligible tasks within the recorded concurrency limit. If a worker discovers a shared edit or dependency outside its
assignment, it must stop that part and report it. Reassign the change to the designated writer or serialize the affected
tasks. Confirm the previous writer has stopped, including any running commands, before transferring ownership or
dispatching a replacement. Further delegation must be explicitly assigned and preserve these boundaries.

Before applying proposals or integrating isolated changes, stop overlapping writers and re-read the affected current
files. Compare them with the workers' starting state, reconcile conflicting assumptions and intervening edits, and have
one assigned agent apply the coordinated changes. Do not blindly apply stale patches or overwrite newer files. A clean
textual merge does not establish compatibility between changes.

Use task states `pending`, `running`, `review`, `accepted`, and `blocked`. A worker's completion report moves its task
to `review`; only the coordinator can accept the result. Release dependent work after acceptance.

## Review and verify results

Inspect actual changes against the task's requirements, write scope, and acceptance criteria. Use a reviewer separate
from the worker when the approved execution mode supports it. Evaluate the findings and verification evidence before
accepting the task; a favorable summary alone is insufficient.

Return concrete findings as repair assignments and review the repaired result. After two unsuccessful repair attempts
for the same finding, mark the task blocked and reassess the approach. Continue unaffected work when its dependencies
allow it. Reopen accepted tasks and recheck dependents when later changes invalidate their results.

After integration, set the plan status to `verifying`. Run the required integration, acceptance, and project checks on
the combined changes while relevant writers are stopped and check resources are isolated or serialized. Individual
task checks do not establish that the integrated result works. If relevant files change during verification, invalidate
the affected results and rerun those checks on a stable state. Repair integration findings and repeat the affected
checks. A failed or unavailable required check prevents completion; record the blocker and resolve it without weakening
the agreed acceptance criteria.

Record lasting decisions in the appropriate authorized project artifacts. Replace any references introduced by this
run to its temporary plan with durable sources, so the finished work remains understandable after deletion.

## Delete the plan before reporting completion

After implementation and required verification succeed:

1. Collect the outcome, changes, checks, and material limitations for the final response.
2. Confirm that all assignments have finished or stopped and cannot recreate the run's temporary files.
3. Set the plan status to `cleanup-pending`. Delete the plan and its recorded temporary files using their exact paths.
   Preserve other plans and unrelated files; never recursively delete the shared plan directory.
4. Verify that the plan and its recorded temporary files are gone. Keep `.specdd/.gitignore` and its plan exclusion for
   future runs.
5. Report the result, verification, and completed plan deletion in the final response.

Deletion is part of the requested workflow and needs no separate approval gate. Do not retain completed plans for
review, archive them, copy them elsewhere, create replacement completion documents, or defer cleanup to another task.
If deletion fails, report the remaining paths and reason, keep cleanup pending, and treat the workflow as incomplete
until cleanup succeeds.

## Recover interrupted work

Retain the plan while awaiting approval, executing, paused, blocked, or awaiting cleanup. Record progress, active
assignments, blockers, and the next action before an orderly interruption. Set the status to `blocked` when no approved
work can proceed, or `paused` when the Operator requests a pause.

On an explicit request to resume, reconcile the plan with current sources, files, approval, and available capabilities.
Recheck ignore coverage and any agents that may still be running before issuing replacements. Revalidate affected
results; a saved task status alone does not establish completion. Valid approval of unchanged scope remains usable.
If only cleanup remains and the verified result is still valid, complete deletion without repeating implementation.

If the Operator abandons the run, stop its assignments, report partial work, and delete its temporary files. Preserve
implementation and unrelated working changes. A missing plan after interruption is insufficient evidence of success;
reconcile the actual work before claiming completion or preparing another plan.
