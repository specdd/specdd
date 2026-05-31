---
Version: 1.4
Website: https://specdd.ai
Changelog: https://specdd.ai/changelog/
Copyright: Copyright (c) 2026 Matiss Treinis and SpecDD contributors
---

# SpecDD Bootstrap

You are working in a SpecDD project.

SpecDD is a framework for Specification-Driven Development.

The project is guided by small `.sdd` spec files that live near the files, directories, workflows, or contracts they
describe.

Specs are source-adjacent development contracts. Treat them as binding instructions, not optional documentation.

This bootstrap file defines the base operating rules for agents working in the project. It tells you how to find specs,
how to resolve inherited constraints, and how to determine what you may read or modify.

Also read adjacent bootstrap files when they exist:

```text
.specdd/bootstrap.md
-> .specdd/bootstrap.project.md
-> .specdd/bootstrap.local.md
```

Use them in order:

- `bootstrap.md` defines the general SpecDD framework rules.
- `bootstrap.project.md` defines project-specific rules and overrides.
- `bootstrap.local.md` defines local operator or environment preferences.

Later files override earlier files when they are stricter or more specific. Local overrides must not silently weaken
project contracts, inherited constraints, or write authority.

Before editing any file, identify:

- The requested target path or task.
- The applicable bootstrap files.
- The effective spec chain.
- The nearest spec that grants write authority.

If you cannot identify write authority, stop and ask the Operator.

## Execution Contract

For implementation work, follow this loop:

```text
Resolve -> Read -> Authorize -> Change -> Verify -> Report
```

Do not skip directly to `Change`.

- `Resolve`: identify the target path or task and the applicable bootstrap/spec chain.
- `Read`: read the bootstrap files, inherited specs, and relevant explicit `References`.
- `Authorize`: confirm the nearest local spec grants the needed write authority.
- `Change`: make the smallest correct change inside that authority.
- `Verify`: run relevant checks when available, or explain why they were not run.
- `Report`: summarize specs used, files changed, verification, and any remaining uncertainty.

## Operating Rules

When making changes:

- Resolve the relevant SpecDD spec chain.
- Follow inherited constraints.
- Work only within local authority.
- Implement the smallest correct change.
- Keep changed files, artifacts, checks, tasks, specs, and other relevant assets aligned.

If any instruction conflicts with your default coding habits or assumptions, follow SpecDD. Do not treat examples,
conventions, nearby files, or familiar project patterns as permission to ignore the active spec chain.

If the Operator asks you to create or modify specs, follow this bootstrap and do not alter implementation files or
operational artifacts unless explicitly asked.

If unclear requirements affect scope, write authority, destructive changes, security, or public behavior, ask the
Operator before editing. For minor ambiguity, choose the option that best preserves inherited constraints and local
scope.

Stop and ask the Operator before editing when:

- No applicable spec exists.
- Write authority is unclear.
- Requested work cannot be completed without violating `Must not` or `Forbids`.
- The change would touch files outside `Can modify` or `Owns`.
- Requirements affect security, destructive behavior, or public contracts and are ambiguous.

## Planning Mode

If the Operator asks for a plan, do not edit files.

Instead:

- Resolve the relevant bootstrap files and spec chain.
- Summarize the target scope.
- Identify specs or files that would need changes.
- Call out unclear requirements, conflicts, and risks.
- Propose the smallest safe sequence of changes.
- Wait for the Operator to approve or revise the plan.

Use planning mode especially when the request is to apply framework or spec changes.

## Core Model

SpecDD projects are developed top-down. Operators define structure, boundaries, behavior, and implementation and work
tasks through local specs. Agents implement and work locally within those boundaries.

A spec should include only sections that add useful local authority, constraints, behavior, or context. Do not repeat
parent rules unless narrowing or clarifying them.

A spec describes the durable subject and the outcomes, invariants, boundaries, and behavior that must hold for that
subject. It is not a work order, migration note, adoption plan, ticket, prompt, or task contract.

When a task causes a spec to be created or changed, the spec should still describe the resulting subject contract, not
the task that produced it.

A local spec should stay relevant to the subject's real boundary. It should not list everything the subject obviously
does not do. Negative rules are useful only when they prevent a plausible boundary mistake, dependency inversion,
security or data risk, or repeated local confusion.

Specs are local maps, not inventories. A directory spec describes the directory concept and the roles of immediate
children. It should not describe nested descendant inventory or detailed file, class, service, job, or adapter,
artifact, component, workflow, operation, interface, policy, service, or asset behavior when a nearer spec can own it.

When a same-directory artifact, file, class, service, component, job, adapter, workflow, operation, interface, policy,
service, asset, or other subject has substantial behavior, put that behavior in a same-basename spec next to the
subject. Keep the directory spec focused on the local boundary and immediate structure.

Avoid both overreach and overcorrection: do not pull child-specific details into parent specs, and do not replace useful
immediate roles with vague labels.

A useful spec answers the local parts of these questions:

- What stable outcome or responsibility does this subject provide?
- What does it own?
- What may be modified?
- What may be read?
- What outcomes, invariants, or behaviors must hold?
- What nearby boundaries, non-goals, or forbidden behavior might otherwise be confused with this subject?
- What may it depend on?
- What behavior or examples matter?
- What local tasks remain to satisfy the subject contract?
- What completion criteria show that the subject contract holds?

Good specs are:

- Local.
- Specific.
- Short.
- Behavioral.
- Constraint-oriented.
- Easy for humans to review.
- Easy for agents to follow.

## Spec Files

Spec files use a line-oriented, section-based format and the `.sdd` extension.

The root project spec must live at the selected content root and must be named after that root directory basename.

Example:

```text
/home/alex/Projects/travel-planner/ -> /home/alex/Projects/travel-planner/travel-planner.sdd
```

Human-facing names and technical identifiers do not override this rule. For example, a project described as
`Travel Planner` with identifiers such as `TravelPlanner` still uses `travel-planner/travel-planner.sdd` when the
content root directory is named `travel-planner`.

Common non-root spec names include:

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

These names are examples, not universal requirements. Projects may use different names and levels for infrastructure,
automation, documentation, operations, data, policy, or mixed repositories.

Named specs are allowed when multiple specs exist in one directory and unsuffixed names would collide or be ambiguous.
When in doubt, omit the suffix.

Same-directory basename matching is an explicit SpecDD rule. When a target file and a `.sdd` file live in the same
directory and share the same basename, the `.sdd` file is the matching local spec for that target file.
Same-basename matching is case-insensitive. Prefer an exact filename match when present. If multiple case-insensitive
matches exist and no exact match exists, report ambiguity instead of guessing.

Examples:

```text
itinerary.js -> itinerary.sdd
trip-storage.js -> trip-storage.sdd
itinerary.test.js -> itinerary.test.sdd
travel-planner.config.js -> travel-planner.config.sdd
```

This is not a guess. It is part of spec resolution. Similar names in other directories, symbols inside files, module
names, or test names do not create a spec relationship by themselves.

Align other spec and source or artifact file naming when a project convention exists, but conventions beyond
same-directory basename matching do not define inheritance, write authority, or ownership by themselves.

When no project naming convention applies, prefer this order:

- Follow existing project conventions.
- If the folder already describes the thing, do not suffix.
- If the folder does not describe the thing, use a descriptive suffix.

Examples:

```text
itinerary.sdd
trip-storage.sdd
destination-search.adapter.sdd
```

## Common Spec Roles

Spec names and roles are project conventions, not framework requirements, except for the root project spec basename
rule. Common roles include:

- root project spec: global application, repository, or project context.
- `module.sdd`: bounded domain, subsystem, package, role, stack, or area.
- `feature.sdd`: user-visible, operational, or business capability.
- `service.sdd`: orchestration or application/domain behavior.
- `model.sdd`: domain state, data shape, entity, value object, or invariant.
- `adapter.sdd`: boundary implementation for an external system.
- `api.sdd`: inbound interface such as HTTP, GraphQL, RPC, CLI, or webhook.
- `component.sdd`: UI or reusable component behavior.
- `job.sdd`: background, scheduled, or automated work.
- `event.sdd`: emitted or consumed event/message contract.
- `policy.sdd`: authorization, permission, or decision rules.
- `workflow.sdd`: operational sequence, procedure, or coordinated work.
- `operation.sdd`: repeatable action, command, intervention, or process step.
- `interface.sdd`: boundary surface between people, systems, tools, or components.
- `dataset.sdd`: data collection, feed, table, index, or analytical source.
- `runbook.sdd`: operational procedure, recovery path, or maintenance instruction.

## Path-Based Resolution

Spec inheritance is implicit and directory-based.

Path-based resolution is the core SpecDD invariant. Applicable specs come from ancestor specs, directory-level specs,
explicit `References`, and same-directory basename matches. Do not infer the applicable spec, ownership, or write
authority from similar names in other directories, symbols, programming languages, module names, test names, or
tool-specific conventions unless a project-specific spec or configuration explicitly defines that mapping.

When working on a target path, start at that target and walk upward to the selected content root.
There can be multiple spec hierarchies in a project; only the target path's ancestor tree is relevant.

Resolution algorithm:

- Classify the target as a directory, a `.sdd` spec file, or an ordinary file.
- The target should exist before related-spec resolution begins.
- If the target is a `.sdd` file, treat that file as the target spec.
- If the target is an ordinary file, include the same-directory same-basename `.sdd` spec when it exists.
- If an ordinary file has no same-basename spec, continue resolving upward from the file's containing directory.
- Walk upward through parent directories until the selected content root.
- At each directory, collect specs whose declared governing scope applies to the target.
- Reverse the collected inherited specs so they are read from root to target.
- Include explicit `References` declared by included specs when they affect the task or when building context.

Directory-level specs are specs whose basename matches the directory they govern. Matching is case-insensitive, but exact
basename matches win. If multiple case-insensitive matches exist for the same placement and no exact match exists, report
ambiguity.

For a directory path, two directory-level spec placements are recognized:

- Parent-held: a spec in the parent directory with the same basename as the governed child directory, such as
  `src/trips.sdd` for `src/trips/`.
- Local: a spec inside the governed directory with the same basename as that directory, such as `src/trips/trips.sdd`
  for `src/trips/`.

Use parent-held specs only when the governed child path exists as a directory. Parent-held and local specs for the same
directory are cumulative context, not ambiguity. When both exist, order parent-held context before local context for that
directory.

The same basename rule applies at the selected content root. A content root whose basename is `travel-planner` must use
`travel-planner.sdd` as its root project spec. This is the root directory context spec, not new `.sdd` syntax.

Resolve vertical directory context from the selected content root down to the target directory using the directory-level
rules above. A tool that scans a directory target may also include specs recursively under that target according to that
tool's command semantics.

A spec's governing scope should be discoverable from the spec itself. Relevant signals include:

- `Owns`, `Can modify`, or `Structure` entries that cover the target path.
- Same-directory basename matching.
- Directory-level basename matching.
- A clear directory-scope role, such as an app, module, feature, or service spec governing that directory subtree.
- A project-specific rule that explicitly defines the mapping.

If a spec's scope is not discoverable, do not guess from similar names. Use the nearest applicable parent spec and ask
the Operator when write authority is unclear.

Example for `src/trips/itinerary.js`:

```text
travel-planner/
  travel-planner.sdd
  src/
    trips/
      trips.sdd
      itinerary.sdd
      itinerary.js
      itinerary.test.js
      trip-storage.sdd
      trip-storage.js
      trip-storage.test.js
    destinations/
      destinations.sdd
      destination-search.sdd
      destination-search.js
    ui/
      itinerary-view.sdd
      itinerary-view.js
```

Parent specs provide inherited context and constraints. Child specs add or narrow context and constraints.

Core rule:

```text
Vertical inheritance is implicit.
Other context references are explicit.
```

Do not automatically load sibling specs. Use sibling or cross-tree specs only when the local spec explicitly references
them, or when directly necessary to understand the active contract.

Do not infer context from symbols or nearby files. Use path inheritance, same-directory basename matching, and explicit
`References`. Nearby files are optional context, not authority.

## Constraint Inheritance

Parent constraints remain active in child specs.

A child spec may:

- Add more specific rules.
- Narrow allowed behavior.
- Add local responsibilities.
- Add local tasks.
- Define local behavior.

A child spec must not silently:

- Loosen parent constraints.
- Ignore parent `Must not` rules.
- Use parent-forbidden dependencies.
- Expand modification scope beyond local authority.
- Contradict inherited architecture.

If a local task or rule appears to conflict with a parent spec, prefer the stricter interpretation.

## Write Authority

Inherited specs provide context and constraints. The nearest relevant local spec provides write authority.

By default:

- Modify only files listed in the nearest spec's `Can modify` or `Owns`.
- If `Can modify` is absent, treat `Owns` as the modification boundary.
- Read files listed in `Can read`, `References`, or inherited context as needed.
- Treat `References` as read context only. References do not grant write authority.
- Do not edit parent-level files unless the targeted spec is a parent spec.
- Do not perform broad refactors unless the spec or Operator explicitly asks for them.
- If no local spec exists, use the nearest parent spec and modify only the smallest necessary set of files.
- If no applicable spec can be found, ask the Operator to identify or create the relevant spec before making changes.

## Universal Spec Language

This section is authoritative for `.sdd` syntax. If examples, project prose, or conventions conflict with these rules,
these rules win. Project rules may add meaning to entries, but must not redefine syntax.

When creating or editing `.sdd` files, check changed specs against this agent-facing syntax checklist before reporting
completion:

- A complete `.sdd` file starts with `Spec: Name`; only blank lines and comments may appear before it.
- Section labels are exact and case-sensitive. Unknown section labels are invalid in strict validation.
- Only `Spec`, `Platform`, `Scenario`, and `Example` may have inline values after `:`.
- `Spec`, `Platform`, and `Scenario` require nonempty inline values when present.
- `Spec` and `Platform` are bodyless.
- All known sections except `Scenario` and `Example` are non-repeatable.
- Repeated `Scenario` sections must have distinct trimmed titles.
- Body entries use exactly two spaces. Continuation lines use four or more spaces in multiples of two.
- `Tasks` accepts task lines only.
- Task markers are `[ ]`, `[x]`, `[X]`, `[-]`, `[!]`, and `[?]`.
- Explicit paths start with `./`, `../`, or `/`. Unprefixed filenames are ordinary text.
- `/` resolves from the selected content root.
- Key-value lines use `key: value` with one literal space after `:`.
- Inline trailing comments do not exist; text after other syntax is content.

### File And Line Rules

- A spec file uses the `.sdd` extension, is plain text, should be UTF-8, may use LF, CRLF, or CR line endings, and is
  line-oriented.
- `.sdd` is Markdown-adjacent, but it is not Markdown, YAML, TOML, JSON, or Gherkin.
- Each line is blank, comment, section header, body entry, continuation, or invalid text.
- Line classification precedence is: comment, known section header, continuation, task line, scenario step, key-value,
  text.
- Comments, blank lines, and section headers may appear before the first section. Other top-level text is invalid.

### Indentation And Comments

- Non-comment indentation uses spaces only. Tabs are invalid.
- Non-comment indentation width must be a multiple of two spaces.
- Section headers start at column 0.
- Body entries use exactly two spaces.
- Continuations use four or more spaces, in multiples of two, and require a preceding body entry in the same section.
- Extracted continuation text is normalized by trimming each segment, dropping empty continuation segments, and joining
  remaining segments with one ASCII space.
- A comment line is any line whose first non-whitespace character is `#`.
- Comments are ignored as spec content and create no requirements, constraints, tasks, references, or write authority.
- Inline trailing comments do not exist. Text after other syntax is ordinary content.

### Sections

Section headers use `KnownSectionLabel:` or `KnownSectionLabel: inline value`. Labels are case-sensitive. The colon must
immediately follow the label. Whitespace before the colon is invalid. If an inline value exists, at least one space must
follow the colon. Unknown section labels are invalid in strict validation.

Canonical labels and recommended order:

```text
Spec
Platform
Purpose
Structure
Owns
Can modify
Can read
References
Must
Must not
Forbids
Depends on
Exposes
Accepts
Returns
Raises
Handles
Tasks
Done when
Scenario
Example
```

Section rules:

- A complete `.sdd` file starts with `Spec`.
- Only `Spec`, `Platform`, `Scenario`, and `Example` may have inline values.
- `Spec`, `Platform` when present, and `Scenario` require nonempty inline values.
- Empty or whitespace-only required inline values are invalid.
- `Example` may have an inline value, body entries, or both.
- `Spec` and `Platform` are bodyless.
- All known sections except `Scenario` and `Example` are non-repeatable.
- Repeated `Scenario` sections must have distinct trimmed titles.
- `Example` may repeat with or without titles.

### Body Entries

- `Tasks` accepts task lines only. Continuations may follow task lines.
- Body entries and continuations require a current section.
- All known sections except `Spec`, `Platform`, and `Tasks` are mixed-entry body sections.
- Mixed-entry sections may contain prose, explicit paths, globs, symbols, references, scenario steps, and key-value
  lines.
- Section names give entries their semantic role; path-bearing section names do not make the body path-only.
- Blank lines and comments are valid anywhere.

### Inline Code And Symbols

- Inline code spans use balanced single backticks on one line. They do not change section structure or body validity.
- Paths and symbol references may still be extracted inside inline code spans.
- Symbol references start with `@` at line start, after whitespace, or after opening punctuation `(`, `[`, `{`, `<`,
  `"`, or `'`.
- The first symbol character after `@` must be an ASCII letter or `_`.
- Later symbol characters may be ASCII letters, digits, `_`, `.`, `:`, `#`, `\`, `/`, `?`, or `!`.
- A symbol ends at the first character outside that set.
- If captured symbol text ends with `.`, and the next source character is whitespace, end of line, or closing
  punctuation
  `)`, `]`, `}`, `>`, `"`, or `'`, the final `.` is sentence punctuation and is excluded.
- `\@` is literal text and must not be recognized as a symbol reference.
- Do not recognize `@` inside a larger non-whitespace token unless the immediately preceding character is allowed
  opening punctuation.
- Use `@` symbol references for code symbols that should resolve or be indexed, including classes, interfaces, methods,
  functions, constants, exceptions, and externally meaningful code contracts.
- Use inline code spans for literal strings, field names, wire values, token formats, service names, namespaces, part
  numbers, configuration keys, and path-like text that should not resolve as symbols.
- Fence markers are ordinary body text in `.sdd`; fenced code blocks are not special `.sdd` syntax.

### Paths, Globs, And Key-Value Lines

- Explicit paths start with `./`, `../`, or `/`.
- `./` and `../` resolve relative to the current `.sdd` file directory.
- `/` resolves relative to the selected content root.
- `~/` is unsupported.
- Prefer `./...` for local files and child paths.
- Use `../...` only for one parent level when that keeps the reference clear.
- For paths more than one parent away, prefer `/...` content-root paths in `Can read`, `References`, `Depends on`, and
  similar explicit path entries.
- Unprefixed prose, filenames, dependency names, class names, service names, symbols, and ordinary text are not explicit
  path references.
- Globs are explicit path candidates containing `*`, `?`, `[`, `]`, `{`, or `}`.
- Supported glob constructs are `*`, `?`, `[abc]`, `{a,b}`, `**`, and `**/`.
- Malformed glob patterns are valid text.
- Path-bearing sections are `Structure`, `Owns`, `Can modify`, `Can read`, `References`, `Depends on`, `Forbids`, and
  `Exposes`.
- A plain body entry beginning with `./`, `../`, or `/` is an explicit path candidate.
- A key-value line whose key begins with `./`, `../`, or `/` uses the key as the explicit path candidate.
- Inline paths in text are recognized only when they use `./`, `../`, or `/`. URLs are not file paths.
- A key-value line is `key: value`: first qualifying colon, nonempty key, no whitespace before the colon, one literal
  space after it, and any value including empty. Key case has no language meaning. `key:` is text.

### Section Meanings

- `Spec`: required first section for a complete file; names the subject; inline nonempty; no body.
- `Platform`: optional inherited technical platform, runtime, framework, or tool stack; inline nonempty; no body. It is
  not subject role, namespace, file type, or behavior prose.
- `Purpose`: stable outcome or responsibility the specified unit exists to provide; not the current task or change
  request.
- `Structure`: files, directories, and immediate project artifacts in current or descendant scope, described at the
  current spec's level of authority; not a deep inventory when child specs can own the detail.
- `Owns`: files, directories, symbols, concepts, or responsibilities owned by the spec; mixed entries.
- `Can modify`: files or paths that may be changed under the spec; mixed entries.
- `Can read`: files, paths, specs, or prose context that may be read; mixed entries.
- `References`: explicit references to specs, files, symbols, contracts, or context; mixed entries. References may point
  anywhere explicit paths or symbols can resolve. References are context, not write authority, and should preserve
  dependency direction.
- `Must`: required outcomes, invariants, and observable behavior; not implementation steps or work instructions.
- `Must not`: forbidden behavior, non-goals, and boundaries that are plausible for the subject or needed to prevent
  likely misuse; not arbitrary unrelated capabilities.
- `Forbids`: disallowed dependencies, paths, modules, libraries, or architectural access that could otherwise be used
  in this subject; not an exhaustive list of unrelated things.
- `Depends on`: dependencies, collaborators, contracts, symbols, paths, or required context; mixed entries.
- `Exposes`: public entry points, exported symbols, APIs, contracts, interfaces, signals, surfaces or observable
  capabilities presented by the subject; mixed entries. Parent or facade specs may list child-owned entry points only
  when the parent deliberately presents, routes, aggregates, or proxies that API surface.
- `Accepts`: accepted inputs, request shapes, parameters, or preconditions; mixed entries.
- `Returns`: return values, output types, response shapes, or result states; mixed entries.
- `Raises`: errors, exceptions, rejected states, or failure conditions; mixed entries.
- `Handles`: cases, events, states, branches, or conditions handled by the spec; mixed entries.
- `Tasks`: local implementation and work checklist for satisfying the subject contract; not a standalone task, adoption,
  migration, or ticket contract.
- `Scenario`: behavioral example; inline nonempty title; mixed body entries, commonly scenario steps.
- `Example`: concrete examples, payloads, usage snippets, or expected transformations; repeatable mixed entries.
- `Done when`: completion criteria; mixed entries; no inline value.

### Tasks, Scenarios, And Examples

Task markers are valid only inside `Tasks`, after exactly two spaces:

```text
[ ] open
[x] done
[X] done
[-] skipped
[!] blocked
[?] needs decision
```

- Unsupported bracketed states inside `Tasks` are invalid.
- Non-task body entries inside `Tasks` are invalid.
- Task ids are optional, appear after the marker, start with `#`, and require one or more digits.
- Empty hash ids such as `# blocked` are not task ids. A task id is not a comment.
- Task text is required and free-form after the marker and optional id.
- Mark `[x]` only when the relevant change and checks are complete.
- Use `[!]` for blocked work and `[?]` for unresolved design decisions.

Scenario steps start after exactly two spaces with `Given`, `When`, `Then`, `And`, or `But`, followed by end of line or
whitespace. Words that merely start with these keywords are plain text. The language does not require Given/When/Then
presence or step ordering.

`Example` body entries are normal mixed entries. Multiple `Example` sections may appear in one file.

### Minimal Complete File

```sdd
Spec: Itinerary
```

## Spec Guidance

This section is guidance for writing and using specs. It does not redefine `.sdd` syntax.

- Prefer `Spec` and `Purpose` in every non-empty spec.
- Use other sections only when they add useful local authority, constraints, behavior, or context.
- Use `Purpose` for summary, concept, project role, and reader orientation. Someone looking only at `Purpose` should be
  able to infer what subject is being specified. `Purpose` may overlap lightly with other sections when that context
  helps safe discovery.
- Write `Purpose` and `Must` as outcome statements about the subject. Put temporary work instructions in `Tasks` only
  when they belong to the local subject.
- Do not duplicate a requirement by restating it in another section with inverted wording. Use `Must` for required
  behavior, `Must not` for distinct prohibitions or non-goals, and `Forbids` for disallowed dependencies, paths,
  modules, tools, resources, or access.
- Do not create specs whose subject is the agent task being performed, such as adoption, migration, cleanup, or
  planning, unless that task is itself a durable project workflow being specified.
- Keep negative requirements local and plausible. Add `Must not` only when it separates neighboring responsibilities,
  prevents likely misuse, preserves dependency direction, or captures a real local risk.
- Do not use specs as exhaustive lists of what the subject is not. Absence of ownership or authority is enough for
  unrelated capabilities.
- If a prohibition applies broadly, put it in the nearest shared parent or policy spec instead of repeating it in every
  child spec.
- Preserve dependency direction in `References`, `Depends on`, `Purpose`, and `Handles`. Provider, runtime, framework,
  and shared service specs describe their own contracts and direct dependencies; they must not name consumers, adapters,
  mount roots, handler implementations, or frontend clients unless the provider genuinely depends on them.
- Apply deduplication pressure mainly to `Structure`, `Exposes`, `Must`, `Must not`, `Handles`, and `Done when`.
- Use `Platform` sparingly at the root or major area where it adds inheritable technical context. Child specs inherit
  the nearest useful platform unless they introduce a meaningful platform shift.
- Keep `Platform` labels concise, stack-like, and slash-separated. When multiple terms are present, separate every term
  with `/`. Put subject role, local identifier, artifact type, and behavior in `Purpose`, `Structure`, `Owns`, or
  behavioral sections instead.
- Only one spec should own a specific item at a given time.
- `Depends on` never overrides inherited `Forbids` or `Must not`.
- `Scenario` entries should be satisfied and checked when relevant.
- Use `Example` sparingly.
- Use comments sparingly. If a line affects required behavior, express it as `Must`, `Must not`, `Tasks`, `Scenario`, or
  `Done when` instead.
- Missing exact reference targets should be reported as unresolved references, not malformed `.sdd` syntax.
- A referenced spec is explicit context, not inherited authority. Its parent chain may be read when needed to understand
  that referenced contract, but it does not become inherited authority for the active target.

Task guidance:

- Tasks are local to the spec where they appear.
- Tasks are work guidance, not architecture overrides.
- Tasks must not contradict `Must`, `Must not`, `Forbids`, or inherited constraints.
- Parent tasks are planning context, not automatically actionable in child specs.
- Only update task status in the currently targeted spec unless instructed otherwise.
- Prefer completing one task or a small related group of tasks at a time.
- Do not complete unrelated tasks opportunistically.

## Working Procedure

Before changes:

- Identify the target file, directory, or task.
- Load bootstrap files in order.
- Walk upward from the target path and collect relevant governing specs.
- Read the inherited chain from parent to child.
- Read explicit `References` declared by included specs when they affect the task or when building context.
- Identify the nearest relevant local spec.
- Determine modification scope from `Can modify` or `Owns`.
- Identify applicable `Must`, `Must not`, `Depends on`, `Forbids`, `Tasks`, `Scenario`, and `Done when`.

During changes:

- Prefer local changes.
- Make the smallest change satisfying the target task or behavior.
- If asked to complete a specific task, complete only that task unless required by direct dependencies.
- Preserve public contracts unless the spec asks to change them.
- Do not widen architecture boundaries.
- Do not add forbidden dependencies.
- Do not introduce global state unless explicitly allowed.
- Do not move responsibilities across boundaries unless specs require it.
- Do not implement non-goals.
- Do not overbuild beyond the spec.
- Add or update verification when required by scenarios, tasks, or project conventions.
- Do not modify unrelated files or complete unrelated tasks.

After changes:

- Check that relevant scenarios are satisfied.
- Check that applicable `Must` rules are satisfied.
- Check that no `Must not` or `Forbids` rules were violated.
- Check that modified files are within allowed scope.
- Check that tests or validation steps pass when available.
- Update completed tasks only after the relevant change and verification are complete.

## Effective Spec Resolution

When asked to work on a path, mentally construct the effective spec.

Effective spec resolution is path-based. Use same-directory basename matching when it applies, but do not use other
filename similarity, symbol names, technical conventions, component names, or check names to decide which specs apply
unless a project-specific rule explicitly says to do so.

Example tree:

```text
travel-planner/
  travel-planner.sdd
  src/
    trips/
      trips.sdd
      itinerary.sdd
      itinerary.js
      itinerary.test.js
      trip-storage.sdd
      trip-storage.js
      trip-storage.test.js
    destinations/
      destinations.sdd
      destination-search.sdd
      destination-search.js
    ui/
      itinerary-view.sdd
      itinerary-view.js
```

Target inside `travel-planner/`:

```text
src/trips/itinerary.js
```

Effective context:

```text
travel-planner.sdd
src/trips/trips.sdd
src/trips/itinerary.sdd
```

Use all parent rules as active constraints. Use the nearest local spec for concrete change authority.

## Tool Context Discovery

Tools and agents that build context for a path should use the same path-based resolution model as humans.

By default, include:

- Bootstrap files in load order.
- Directory-level specs from the selected content root to the target directory, ordered root to target.
- Ancestor specs from the selected content root to the target path.
- The same-directory basename spec for the target file when it exists.
- Explicit `References` declared by included specs.

Do not include sibling specs, nearby files, or same-named files by default, except for same-directory basename spec
matches. Include other files only when they are explicitly referenced, requested, or selected by a project-specific
rule.

When following explicit paths for related-spec relevance, follow paths from:

- `Structure`
- `Owns`
- `Can modify`
- `Can read`
- `References`
- `Depends on`

Do not follow paths from `Forbids` or `Exposes` for relevance expansion, although generic reference indexes may still
extract and index paths from those sections.

When a relevance resolver follows an exact path:

- A linked `.sdd` file resolves to that spec.
- A linked ordinary file resolves to its same-basename `.sdd` spec when present.
- A linked directory resolves to directory-level specs for that directory only.

Non-glob directory links such as `./` or `../shared` must not recursively include every descendant `.sdd` file.
Recursive descendant inclusion requires an explicit glob such as `./**` or `./**/*.sdd`.

Deduplicate resolved specs by normalized path relative to the selected content root. Protect recursive expansion against
cycles and expose or document any depth limit used for soft-link expansion.

When a tool reports context, it should identify why each file was included. Useful reasons include:

```text
bootstrap
project override
local override
directory context
ancestor spec
nearest local spec
explicit reference
requested nearby file
```

Context discovery must not expand write authority. Referenced or nearby files remain read context unless the active
spec grants modification scope through `Can modify` or `Owns`.

## Report And Compliance Check

Before final response, check:

- Did you read the bootstrap files?
- Did you resolve the spec chain?
- Did you stay within write authority?
- Did you satisfy relevant `Must` rules?
- Did you avoid `Must not` and `Forbids`?
- Did you run or explain verification?

When reporting completed work, include:

- Specs used.
- Files changed.
- Verification run, or why verification was not run.
- Any SpecDD uncertainty, skipped check, or remaining risk.

## Conflict Handling

If specs conflict:

- Prefer the more restrictive rule.
- Prefer explicit local behavior only when it does not violate parent constraints.
- Treat `Must not` and `Forbids` as stronger than `Must`, `Depends on`, or `Tasks`.
- Treat inherited architecture as active unless explicitly and safely narrowed.
- Do not use a task as justification to violate a rule.
- If a safe partial change is possible, do the safe subset.
- If the change cannot proceed safely, mark the task `[?]` or `[!]` and explain the issue.

## Compactness Rules

Specs should stay small.

Prefer concise, direct requirements:

```sdd
Must:
  Trip storage writes require validated itinerary input.
```

Avoid:

- Long prose.
- Duplicating parent rules unnecessarily.
- Mirroring the same rule across `Must`, `Must not`, `Forbids`, `Scenario`, or `Done when` when one section already
  states the requirement.
- Task-shaped `Purpose` or `Must` entries such as "implement", "add", "update", "migrate", or "adopt" when the intended
  contract is the resulting behavior or state.
- Specs that describe the current assignment instead of the subject that will remain after the assignment is complete.
- Far-field exclusions that would be equally true for almost any subject, such as an itinerary spec saying it must not
  set hotel room temperature.
- Long `Must not` lists that inventory unrelated directories, technologies, or behaviors instead of naming the nearest
  meaningful boundary.
- Directory specs that aggregate detailed behavior from individual files, artifacts, components, workflows, operations,
  or services instead of delegating to same-basename specs.
- Parent specs that list nested descendant inventory instead of immediate child roles.
- Vague structure labels that remove useful local meaning, such as "items", "things", or "services", when the child role
  is known.
- Provider, runtime, platform, shared workflow, or infrastructure specs that describe their consumers instead of their
  own boundary.
- `Platform` entries that mix stack labels with subject role or behavior.
- Explaining obvious implementation details.
- Turning specs into project tickets.
- Large exhaustive documents.
- Vague tasks.
- Broad refactor instructions.

## Minimal Valuable Spec

```sdd
Spec: Itinerary

Purpose:
  Keep a trip itinerary organized by day.

Owns:
  ./itinerary.js
  ./itinerary.test.js

Must:
  When the place name and date are present, an itinerary item exists.
  Itinerary items remain grouped by trip day.
  Itinerary items appear in chronological order.

Must not:
  Access browser storage directly.
  Manage destination search results.

Scenario: missing place name
  Given the place name is empty
  When the person adds the itinerary item
  Then validation fails
  And no itinerary item is stored

Done when:
  All scenarios have tests.
  No forbidden imports exist.
```

## Complete Spec

```sdd
# Comments are allowed as whole lines and do not create requirements.

Spec: Itinerary

Platform: TypeScript/Browser

Purpose:
  Keep Travel Planner itineraries organized by trip day.

Structure:
  ./itinerary.ts: Itinerary behavior
  ./itinerary.test.ts: Itinerary tests
  ./fixtures: Test fixtures

Owns:
  ./itinerary.ts
  ./itinerary.test.ts
  Itinerary
  ItineraryResult

Can modify:
  ./itinerary.ts
  ./itinerary.test.ts
  ./fixtures/*

Can read:
  ../models/itinerary-item.sdd
  ../ports/trip-storage.sdd
  ../repositories/*

References:
  ../models/itinerary-item.sdd
  ../ports/trip-storage.sdd
  ../errors/itinerary-error.sdd

Must:
  A missing place name is rejected before storage.
  Itinerary items have stable ids.
  Existing itinerary items are preserved when a new place is added.
  Storage failures are normalized before return.

Must not:
  Access browser storage directly.
  Manage destination search results.
  Import UI component code.

Forbids:
  localStorage
  ../ui/*

Depends on:
  TripRepository
  TripStoragePort
  TripLogger

Exposes:
  Itinerary.addPlace(input)
  Itinerary.movePlace(id, date)

Accepts:
  NewItineraryItemInput
  place name
  trip date

Returns:
  ItineraryResult
  created itinerary item id
  itinerary grouped by day

Raises:
  MissingPlaceNameError
  TripStorageError
  ItineraryItemNotFoundError

Handles:
  missing place name
  missing trip date
  storage write failure
  duplicate itinerary item id

Tasks:
  [x] #0 Define itinerary public contract.
  [ ] #1 Add validation for a missing place name.
  [ ] #2 Preserve itinerary order after moving a place.
  [!] #3 Decide whether items can overlap on the same day.
  [?] #4 Confirm whether the same place can be added more than once.
  [-] #5 Skip map rendering because map UI owns it.

Scenario: missing place name
  Given the place name is empty
  When the person adds the itinerary item
  Then validation fails
  And no itinerary item is stored

Scenario: storage failure
  Given the place name and trip date are valid
  And trip storage fails
  When the person adds the itinerary item
  Then a TripStorageError is returned
  And the existing itinerary is unchanged

Example:
  input place: Louvre Museum
  input date: 2026-06-12
  result itinerary item count: 1

Done when:
  All scenarios have tests.
  No forbidden dependencies are imported.
  Public contract is preserved.
  Relevant tasks are updated only after checks pass.
```

## Prime Directive

When working in a SpecDD project:

- Read the bootstrap files.
- Read the relevant specs.
- Resolve inherited constraints.
- Work only inside local authority.
- Make the smallest correct change.
- Do not violate `Must not` or `Forbids`.
- Use `Tasks` to guide work.
- Use `Scenario` to guide behavior and checks.
- Keep specs and changed assets aligned.

Specs are the project's durable prompt. Follow them.
