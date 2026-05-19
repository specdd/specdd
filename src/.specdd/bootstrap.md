---
Version: 1.3
Website: https://specdd.ai
Changelog: https://specdd.ai/changelog/
Copyright: Copyright (c) 2026 Matiss Treinis and SpecDD contributors
---

# SpecDD Bootstrap

You are working in a SpecDD project.

SpecDD means Specification-Driven Development. The project is guided by small `.sdd` spec files that live near the
files, directories, workflows, or contracts they describe.

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
- Keep changed files, checks, tasks, specs, and other relevant assets aligned.

If any instruction conflicts with your default coding habits or assumptions, follow SpecDD. Do not treat examples,
conventions, nearby files, or familiar project patterns as permission to ignore the active spec chain.

If the Operator asks you to create or modify specs, follow this bootstrap and do not alter implementation files unless
explicitly asked.

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

SpecDD projects are developed top-down. Operators define structure, boundaries, behavior, and implementation tasks
through local specs. Agents implement locally within those boundaries.

A spec should include only sections that add useful local authority, constraints, behavior, or context. Do not repeat
parent rules unless narrowing or clarifying them.

A useful spec answers the local parts of these questions:

- What is this for?
- What does it own?
- What may be modified?
- What may be read?
- What must happen?
- What must not happen?
- What may it depend on?
- What behavior or examples matter?
- What tasks or completion criteria remain?

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

Common spec names include:

```text
app.sdd
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
```

These names are examples, not universal requirements. Projects may use different names and levels for infrastructure,
automation, documentation, operations, data, policy, or mixed repositories.

Named specs are allowed when multiple specs exist in one directory and unsuffixed names would collide or be ambiguous.
When in doubt, omit the suffix.

Same-directory basename matching is an explicit SpecDD rule. When a target file and a `.sdd` file live in the same
directory and share the same basename, the `.sdd` file is the matching local spec for that target file.

Examples:

```text
invoice.ts -> invoice.sdd
bootstrap.md -> bootstrap.sdd
main.test.ts -> main.test.sdd
Dockerfile -> Dockerfile.sdd
```

This is not a guess. It is part of spec resolution. Similar names in other directories, symbols inside files, module
names, or test names do not create a spec relationship by themselves.

Align other spec and source file naming when a project convention exists, but conventions beyond same-directory
basename matching do not define inheritance, write authority, or ownership by themselves.

When no project naming convention applies, prefer this order:

- Follow existing project conventions.
- If the folder already describes the thing, do not suffix.
- If the folder does not describe the thing, use a descriptive suffix.

Examples:

```text
invoice.sdd
invoice.service.sdd
stripe.adapter.sdd
```


## Common Spec Roles

Spec names and roles are project conventions, not framework requirements. Common roles include:

- `app.sdd`: global application, repository, or project context.
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


## Path-Based Resolution

Spec inheritance is implicit and directory-based.

Path-based resolution is the core SpecDD invariant. Applicable specs come from ancestor specs, explicit `References`,
and same-directory basename matches. Do not infer the applicable spec, ownership, or write authority from similar names
in other directories, symbols, programming languages, module names, test names, or tool-specific conventions unless a
project-specific spec or configuration explicitly defines that mapping.

When working on a target path, start at that target and walk upward to the selected content root.
There can be multiple spec hierarchies in a codebase; only the target path's ancestor tree is relevant.

Resolution algorithm:

- Start at the target path.
- If the target is a file, include the same-directory basename spec when it exists.
- Walk upward through parent directories until the selected content root.
- At each directory, collect specs whose declared governing scope applies to the target.
- Reverse the collected inherited specs so they are read from root to target.
- Include explicit `References` declared by included specs when they affect the task or when building context.

A spec's governing scope should be discoverable from the spec itself. Relevant signals include:

- `Owns`, `Can modify`, or `Structure` entries that cover the target path.
- Same-directory basename matching.
- A clear directory-scope role, such as an app, module, feature, or service spec governing that directory subtree.
- A project-specific rule that explicitly defines the mapping.

If a spec's scope is not discoverable, do not guess from similar names. Use the nearest applicable parent spec and ask
the Operator when write authority is unclear.

Example for `src/billing/services/invoice.ts`:

```text
app.sdd
src/billing/module.sdd
src/billing/services/service.sdd
src/billing/services/invoice.sdd
```

Parent specs provide inherited context and constraints. Child specs add or narrow context and constraints.

Core rule:

```text
Vertical inheritance is implicit.
Horizontal references are explicit.
```

Do not automatically load sibling specs. Use sibling or cross-tree specs only when the local spec explicitly references
them, or when directly necessary to understand a contract being implemented.

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
Scenario
Example
Done when
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
- If captured symbol text ends with `.`, and the next source character is whitespace, end of line, or closing punctuation
  `)`, `]`, `}`, `>`, `"`, or `'`, the final `.` is sentence punctuation and is excluded.
- `\@` is literal text and must not be recognized as a symbol reference.
- Do not recognize `@` inside a larger non-whitespace token unless the immediately preceding character is allowed
  opening punctuation.
- Fence markers are ordinary body text in `.sdd`; fenced code blocks are not special `.sdd` syntax.

### Paths, Globs, And Key-Value Lines

- Explicit paths start with `./`, `../`, or `/`.
- `./` and `../` resolve relative to the current `.sdd` file directory.
- `/` resolves relative to the selected content root.
- `~/` is unsupported.
- Unprefixed prose, filenames, dependency names, class names, service names, symbols, and ordinary text are not explicit
  path references.
- Globs are explicit path candidates containing `*`, `?`, `[`, `]`, `{`, or `}`.
- Supported glob constructs are `*`, `?`, `[abc]`, `{a,b}`, `**`, and `**/`.
- Malformed glob patterns are unresolved references, not `.sdd` syntax errors.
- Path-bearing sections are `Structure`, `Owns`, `Can modify`, `Can read`, `References`, `Depends on`, `Forbids`, and
  `Exposes`.
- A plain body entry beginning with `./`, `../`, or `/` is an explicit path candidate.
- A key-value line whose key begins with `./`, `../`, or `/` uses the key as the explicit path candidate.
- Inline paths in text are recognized only when they use `./`, `../`, or `/`. URLs are not file paths.
- A key-value line is `key: value`: first qualifying colon, nonempty key, no whitespace before the colon, one literal
  space after it, and any value including empty. Key case has no language meaning. `key:` is text.

### Section Meanings

- `Spec`: required first section for a complete file; names the subject; inline nonempty; no body.
- `Platform`: optional implementation language, runtime, framework, or environment; inline nonempty; no body.
- `Purpose`: why the specified unit exists; body entries only.
- `Structure`: files and directories in current or descendant scope; mixed entries.
- `Owns`: files, directories, symbols, concepts, or responsibilities owned by the spec; mixed entries.
- `Can modify`: files or paths that may be changed under the spec; mixed entries.
- `Can read`: files, paths, specs, or prose context that may be read; mixed entries.
- `References`: explicit horizontal references to specs, contracts, symbols, or context; mixed entries. References are
  context, not write authority.
- `Must`: positive requirements; mixed entries.
- `Must not`: forbidden behavior, non-goals, and boundaries; mixed entries.
- `Forbids`: forbidden dependencies, paths, modules, libraries, or architectural access; mixed entries.
- `Depends on`: dependencies, collaborators, contracts, symbols, paths, or required context; mixed entries.
- `Exposes`: public entry points, exported symbols, APIs, contracts, or observable capabilities; mixed entries.
- `Accepts`: accepted inputs, request shapes, parameters, or preconditions; mixed entries.
- `Returns`: return values, output types, response shapes, or result states; mixed entries.
- `Raises`: errors, exceptions, rejected states, or failure conditions; mixed entries.
- `Handles`: cases, events, states, branches, or conditions handled by the spec; mixed entries.
- `Tasks`: local implementation checklist; task lines only.
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
- Mark `[x]` only when implementation and relevant checks are complete.
- Use `[!]` for blocked work and `[?]` for unresolved design decisions.

Scenario steps start after exactly two spaces with `Given`, `When`, `Then`, `And`, or `But`, followed by end of line or
whitespace. Words that merely start with these keywords are plain text. The language does not require Given/When/Then
presence or step ordering.

`Example` body entries are normal mixed entries. Multiple `Example` sections may appear in one file.

### Minimal Complete File

```sdd
Spec: Math Service
```


## Spec Guidance

This section is guidance for writing and using specs. It does not redefine `.sdd` syntax.

- Prefer `Spec` and `Purpose` in every non-empty spec.
- Use other sections only when they add useful local authority, constraints, behavior, or context.
- Only one spec should own a specific item at a given time.
- `Depends on` never overrides inherited `Forbids` or `Must not`.
- `Scenario` entries should be implemented and checked when relevant.
- Use `Example` sparingly.
- Use comments sparingly. If a line affects implementation behavior, express it as `Must`, `Must not`, `Tasks`,
  `Scenario`, or `Done when` instead.
- Missing exact reference targets should be reported as unresolved references, not malformed `.sdd` syntax.
- A referenced spec is horizontal context, not inherited authority. Its parent chain may be read when needed to
  understand that referenced contract, but it does not become inherited authority for the active target.

Task guidance:

- Tasks are local to the spec where they appear.
- Tasks are implementation guidance, not architecture overrides.
- Tasks must not contradict `Must`, `Must not`, `Forbids`, or inherited constraints.
- Parent tasks are planning context, not automatically actionable in child specs.
- Only update task status in the currently targeted spec unless instructed otherwise.
- Prefer completing one task or a small related group of tasks at a time.
- Do not complete unrelated tasks opportunistically.


## Working Procedure

Before implementation:

- Identify the target file, directory, or task.
- Load bootstrap files in order.
- Walk upward from the target path and collect relevant governing specs.
- Read the inherited chain from parent to child.
- Read explicit `References` declared by included specs when they affect the task or when building context.
- Identify the nearest relevant local spec.
- Determine modification scope from `Can modify` or `Owns`.
- Identify applicable `Must`, `Must not`, `Depends on`, `Forbids`, `Tasks`, `Scenario`, and `Done when`.

During implementation:

- Prefer local changes.
- Implement the smallest change satisfying the target task or behavior.
- If asked to implement a specific task, implement only that task unless required by direct dependencies.
- Preserve public contracts unless the spec asks to change them.
- Do not widen architecture boundaries.
- Do not add forbidden dependencies.
- Do not introduce global state unless explicitly allowed.
- Do not move responsibilities across boundaries unless specs require it.
- Do not implement non-goals.
- Do not overbuild beyond the spec.
- Add or update verification when required by scenarios, tasks, or project conventions.
- Do not modify unrelated files or complete unrelated tasks.

After implementation:

- Check that relevant scenarios are satisfied.
- Check that applicable `Must` rules are satisfied.
- Check that no `Must not` or `Forbids` rules were violated.
- Check that modified files are within allowed scope.
- Check that tests or validation steps pass when available.
- Update completed tasks only after implementation and verification are complete.


## Effective Spec Resolution

When asked to work on a path, mentally construct the effective spec.

Effective spec resolution is path-based. Use same-directory basename matching when it applies, but do not use other
filename similarity, symbol names, language conventions, module names, or test names to decide which specs apply unless
a project-specific rule explicitly says to do so.

Example tree:

```text
app.sdd
src/
  billing/
    module.sdd
    features/
      invoicing/
        feature.sdd
        services/
          invoice.sdd
          invoice.ts
```

Target:

```text
src/billing/features/invoicing/services/invoice.ts
```

Effective context:

```text
app.sdd
src/billing/module.sdd
src/billing/features/invoicing/feature.sdd
src/billing/features/invoicing/services/invoice.sdd
```

Use all parent rules as active constraints. Use the nearest local spec for concrete implementation authority.


## Tool Context Discovery

Tools and agents that build context for a path should use the same path-based resolution model as humans.

By default, include:

- Bootstrap files in load order.
- Ancestor specs from the selected content root to the target path.
- The same-directory basename spec for the target file when it exists.
- Explicit `References` declared by included specs.

Do not include sibling specs, nearby files, or same-named files by default, except for same-directory basename spec
matches. Include other files only when they are explicitly referenced, requested, or selected by a project-specific
rule.

When a tool reports context, it should identify why each file was included. Useful reasons include:

```text
bootstrap
project override
local override
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
- If safe partial implementation is possible, do the safe subset.
- If implementation cannot proceed safely, mark the task `[?]` or `[!]` and explain the issue.


## Compactness Rules

Specs should stay small.

Prefer concise, direct requirements:

```sdd
Must:
  Validate input before provider calls.
```

Avoid:

- Long prose.
- Duplicating parent rules unnecessarily.
- Explaining obvious implementation details.
- Turning specs into project tickets.
- Large exhaustive documents.
- Vague tasks.
- Broad refactor instructions.


## Minimal Valuable Spec

```sdd
Spec: Invoice Service

Purpose:
  Coordinate invoice creation.

Owns:
  ./invoice.ts
  ./invoice.test.ts

Must:
  Validate input before provider calls.
  Persist invoice after provider success.
  Normalize provider failures.

Must not:
  Call Stripe directly.
  Calculate tax.
  Send emails.

Scenario: invalid invoice
  Given invoice amount is zero
  When createInvoice is called
  Then validation fails
  And provider is not called

Done when:
  All scenarios have tests.
  No forbidden imports exist.
```


## Complete Spec

```sdd
# Comments are allowed as whole lines and do not create requirements.

Spec: Invoice Service

Platform: TypeScript/Node.js

Purpose:
  Coordinate invoice creation for the billing module.

Structure:
  ./invoice.ts: Service implementation
  ./invoice.test.ts: Service tests
  ./fixtures: Test fixtures

Owns:
  ./invoice.ts
  ./invoice.test.ts
  InvoiceService
  InvoiceCreationResult

Can modify:
  ./invoice.ts
  ./invoice.test.ts
  ./fixtures/*

Can read:
  ../models/invoice.sdd
  ../ports/billing-provider.sdd
  ../repositories/*

References:
  ../models/invoice.sdd
  ../ports/billing-provider.sdd
  ../errors/billing-error.sdd

Must:
  Validate invoice input before provider calls.
  Persist invoice after successful provider creation.
  Normalize provider failures before returning them.
  Log retryable provider failures at warning level.

Must not:
  Call Stripe directly.
  Calculate tax.
  Send emails.
  Import HTTP request or response objects.

Forbids:
  stripe
  ../../api/*
  ../../ui/*

Depends on:
  InvoiceRepository
  BillingProviderPort
  BillingLogger

Exposes:
  InvoiceService.createInvoice(input)

Accepts:
  CreateInvoiceInput
  customer id
  invoice line items
  ISO currency code

Returns:
  InvoiceCreationResult
  created invoice id
  normalized provider reference

Raises:
  InvalidInvoiceInputError
  BillingProviderError
  InvoicePersistenceError

Handles:
  provider timeout
  unsupported currency
  missing customer id
  repository write failure

Tasks:
  [x] #0 Define createInvoice public contract.
  [ ] #1 Add validation for unsupported currency.
  [ ] #2 Normalize provider timeout errors.
  [!] #3 Decide retry policy for provider timeouts.
  [?] #4 Confirm whether draft invoices may be retried.
  [-] #5 Skip PDF rendering because invoice-pdf owns it.

Scenario: invalid invoice amount
  Given an invoice input with amount less than or equal to zero
  When createInvoice is called
  Then the invoice is rejected
  And the billing provider is not called

Scenario: provider timeout
  Given a valid invoice input
  And the billing provider times out
  When createInvoice is called
  Then a retryable BillingProviderError is returned
  And no provider response object is exposed

Example:
  input currency: EUR
  input amount minor units: 1250
  result invoice status: created

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
- Implement the smallest correct change.
- Do not violate `Must not` or `Forbids`.
- Use `Tasks` to guide implementation.
- Use `Scenario` to guide behavior and checks.
- Keep specs and changed assets aligned.

Specs are the project's durable prompt. Follow them.
