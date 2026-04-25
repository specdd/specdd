# SpecDD

SpecDD is an experimental approach to **Specification-Driven Development** for AI-assisted software projects.

SpecDD uses small, local, human-readable `.sdd` files that live beside the code they describe. These specs document
intent, architecture, behavior, boundaries, and implementation tasks in a way that both humans and AI coding agents can
follow.

SpecDD works for both greenfield and existing projects. In new projects, specs can define structure before
implementation starts. In existing projects, specs can be introduced gradually around modules, services, features, or
files that are actively changing.

## How it works

SpecDD is deliberately simple. You do not need to install anything to use it.

Add a `.specdd/bootstrap.md` file to your project, place small `.sdd` specs beside the code they describe, and tell your
AI agent to read the bootstrap file before it starts working. The agent then uses those specs as local source-of-truth
context for implementation. For best results, mirror all the contents of `src/` from this repository into your
code project.

## Tooling

SpecDD is at a fairly informal state right now but the core workflow should work with any editor, any repository, and
any AI coding agent that can read project files. Future tooling could help validate specs, resolve inheritance chains,
check forbidden dependencies, highlight syntax, or enforce task status rules. Tooling contributions are welcome.

It is strongly recommended to follow the documented language closely and avoid inventing custom syntax unless necessary.
Future tooling may rely on the current conventions.

## Current status

SpecDD has been tested and experimented with extensively, and results are generally very good. Still, it is
experimental technology. Expect unexpected behavior from AI agents, review all outputs, and verify code, tests, specs,
and generated changes before relying on them.

## Example

A complete working example is available in the SpecDD benchmark repository: https://github.com/specdd/benchmark. It
demonstrates a small TODO application with SpecDD bootstrap files, colocated .sdd specs, source code, tests, and agent
entrypoint files.

```text
Spec: Calculator Add

Purpose:
  Add two finite numbers.

Owns:
  calculator.js

Exposes:
  Calculator.add(a, b)

Must:
  Return a + b.
  Reject non-number inputs.

Must not:
  Round results.

Scenario: add numbers
  Given a is 2
  And b is 3
  When add is called
  Then 5 is returned
```


## The problem SpecDD solves

Software projects are hard for AI agents to reason about because the relevant context is usually quite large, scattered,
stale, or implicit. This is very similar to a problem humans have faced for a long time and understand well: operating
inside massive project contexts where the important decisions, constraints, and assumptions are spread across code,
docs, tickets, conversations, and individual memory.

SpecDD solves this by chunking a project into small, local specification units. Each spec gives the agent a concrete
source of truth for one part of the system. Instead of stuffing a huge architecture document into every prompt, the
agent resolves the relevant spec chain and works inside that bounded context.

SpecDD helps with:

- breaking large projects into small implementation areas
- giving agents durable project context inside the repository
- augmenting prompts with concrete local source of truth
- structuring otherwise loose design documents
- preserving architecture and ownership boundaries
- capturing business behavior near implementation
- recording implementation tasks where the work happens
- improving consistency between code, tests, and intent

While experimenting with SpecDD, software quality has generally remained high and at times improved as specs were
adopted, largely because important rules, boundaries, and expectations became explicit.

SpecDD also tends to encourage better software design by its mere presence. To write useful specs, developers must name
responsibilities, define boundaries, state non-goals, and decide where behavior belongs.

## What SpecDD is

SpecDD is a lightweight convention for organizing software projects around source-adjacent specification files.

A SpecDD spec describes a part of a system:

- what it is for
- what it owns
- what it may modify
- what it may read
- what it must do
- what it must not do
- what it may depend on
- what behavior it must support
- what tasks remain
- when implementation is complete

Specs live near the code they describe.

Example:

```text
src/
  billing/
    module.sdd
    invoice.sdd
    invoice.js
    stripe.adapter.sdd
    stripe.adapter.js
```

The goal is not to create large requirements documents. The goal is to create many small, useful contracts that guide
implementation.

SpecDD is language-agnostic. It can be used with JavaScript, TypeScript, Python, Go, PHP, Java, C#, Rust, Ruby, or other
platforms. It can be used with object-oriented, functional, procedural, service-oriented, or mixed styles. The main
assumption is that the project has code organized in files.


## Workflow

The recommended workflow is **spec-first**, similar in spirit to BDD.

Typical flow:

1. Write or update the relevant `.sdd` spec.
2. Review and edit the spec until it expresses the intended behavior and boundaries.
3. Prompt an AI agent or developer to implement the spec.
4. Run tests and checks.
5. Update tasks and specs as needed.

This works well in two modes.

First, a developer can write the spec manually and then ask an agent to implement it:

```text
Read .specdd/bootstrap.md, resolve the relevant SpecDD chain, and implement it.
```

Second, a developer can ask an agent to draft specs, review them, edit them as needed, and then ask for implementation:

```text
Create SpecDD specs for the billing module. Do not implement code yet.
```

After review:

```text
Implement the invoice service spec only.
```

Both workflows work well. The important part is that implementation should be driven by reviewed specs, not by vague
prompts alone.


## Basic project layout

SpecDD bootstrap instructions live in `.specdd`.

```text
.specdd/
  bootstrap.md              # Global SpecDD behavior
  bootstrap.project.md      # Project-specific rules
  bootstrap.local.md        # Local operator or environment overrides (git-ignored)
```

Load order:

```text
.specdd/bootstrap.md
-> .specdd/bootstrap.project.md
-> .specdd/bootstrap.local.md
```


## The role of the bootstrap file

The bootstrap file explains SpecDD rules to an AI agent.

It tells the agent how to:

- resolve specs
- follow inheritance
- respect local authority
- interpret tasks
- handle conflicts
- avoid broad edits
- keep code, tests, specs, and tasks aligned

A project can include a short `CLAUDE.md`, `AGENTS.md`, or similar file that simply tells the agent to read
`.specdd/bootstrap.md`.

Example:

```md
# AGENTS.md

Before working on this project, read `.specdd/bootstrap.md`.

Assume the role, rules, workflow, and implementation constraints described in SpecDD. Treat SpecDD specs as
source-adjacent development contracts, not optional documentation. Adhere to SpecDD rules unless explicitly
instructed otherwise.
```

The bootstrap file is for agents. The `.sdd` files are for both humans and agents.


## Spec files

SpecDD specs use the `.sdd` extension.

Named specs are allowed when multiple specs exist in one directory and unsuffixed names would collide or be ambiguous.

```text
stripe.adapter.sdd
stripe.service.sdd
invoice.model.sdd
invoice.service.sdd
```

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

You should default to no suffix when the directory already makes the role clear.

Example:

```text
src/billing/services/invoice.sdd
src/billing/services/invoice.ts
```

Use a suffix when the folder does not disambiguate:

```text
src/billing/invoice.service.sdd
src/billing/invoice.service.ts
```

The spec kind is inferred from the filename or its location in the project tree.


## Naming conventions for project files

To assist the agents you should generally align project and spec file naming as close as possible. It improves
performance of the spec files significantly, however, you can of course elect not to if your project does not
support such naming for whatever reason.

When creating files in a SpecDD project, use this priority:

1. Follow existing project naming conventions.
2. If the folder already describes the thing, do not suffix.
3. If the folder does not describe the thing, use a descriptive suffix.

Prefer option 2 when project naming is not defined.

Examples:

```text
models/invoice.ts
services/invoice.ts
adapters/stripe.ts
```

Use suffixes when needed:

```text
invoice.model.ts
invoice.service.ts
stripe.adapter.ts
```


## Directory-based inheritance

SpecDD inheritance is implicit and directory-based.

When working on a target path, agents must collect specs from the repository root down to the target directory.

Example:

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

For work on:

```text
src/billing/features/invoicing/services/invoice.ts
```

the effective spec context is:

```text
app.sdd
src/billing/module.sdd
src/billing/features/invoicing/feature.sdd
src/billing/features/invoicing/services/invoice.sdd
```

This means the service spec inherits constraints from the feature spec, module spec, and app spec.

The core rule is:

```text
Vertical inheritance is implicit.
Horizontal references are explicit.
```

Parent specs are automatically inherited. Sibling specs are not.


## Multiple hierarchies

A codebase can contain multiple spec hierarchies.

Only the target path’s ancestor tree is relevant.

Example:

```text
src/
  billing/
    module.sdd
  support/
    module.sdd
```

When working inside `src/billing`, do not automatically load `src/support/module.sdd`.

Use explicit references when one area needs another area’s contract.

```text
References:
  ../../support/customer-support.sdd
```


## Constraint inheritance

Parent specs provide constraints and context. Child specs add or narrow them.

A child spec may:

- add more specific rules
- narrow allowed behavior
- add local responsibilities
- add local tasks
- define local behavior

A child spec must not silently:

- loosen parent constraints
- ignore parent `Must not` rules
- use parent-forbidden dependencies
- expand modification scope beyond local authority
- contradict inherited architecture

If two specs conflict, the stricter rule wins unless the Operator explicitly resolves the conflict.


## Write authority

Inherited specs provide context and constraints. The nearest relevant local spec provides write authority.

By default, an implementation should modify only files listed in the nearest spec’s:

```text
Can modify:
```

or, if absent:

```text
Owns:
```

Example:

```text
Spec: Invoice Service

Owns:
  invoice.ts
  invoice.test.ts
```

If `Can modify` is absent, `Owns` acts as the modification boundary.

Parent specs do not automatically grant broad edit rights. A module spec can define architectural context for a whole
module, but a service-level task should not freely edit the whole module unless the local spec allows it.


## Universal spec language

All specs use the same basic language. Not every section is required for every spec.

Currently, the defined sections are:

```text
Spec:
Platform:
Purpose:
Structure:
Owns:
Can modify:
Can read:
References:
Must:
Must not:
Depends on:
Forbids:
Exposes:
Accepts:
Returns:
Raises:
Handles:
Tasks:
Scenario:
Example:
Done when:
```

A spec should include only sections that add useful local information.


## Section reference

### Spec

Names the thing being specified.

```text
Spec: Invoice Service
```

### Platform

Describes implementation language and platform. It can be present in any level of any spec, though for single language
projects it should generally live in the app level spec.

Format is free-form, but usually:

```text
language[/qualifier[/qualifier]]
```

Examples:

```text
Platform: JavaScript/ES6
Platform: Python/Django/5.2
Platform: TypeScript/Node/Express
```

### Purpose

A short statement of why this part exists.

```text
Purpose:
  Coordinate invoice validation, provider creation, and persistence.
```

### Structure

Describes file and directory structure for the current and descendant scope.

Format:

```text
path-or-glob: description
```

Example:

```text
Structure:
  lib: Libraries
  models: Models
  templates: Project templates
  templates/email: Email templates
```

This section helps humans and agents understand local organization without reading the whole tree.

### Owns

Files, directories, symbols, concepts, or responsibilities owned by the spec. Only one spec should own a specific item
at any given time.

```text
Owns:
  invoice.ts
  invoice.test.ts
```

### Can modify

Files or paths that may be changed when working under this spec.

```text
Can modify:
  invoice.ts
  invoice.test.ts
```

Use this when writable scope should be narrower or different from ownership.

### Can read

Files, paths, or specs that may be read to improve context. It serves as a recommendation for Agents to read relevant
sections for context.

```text
Can read:
  ../models/*
  ../ports/*
  ../repositories/*
```

### References

Explicit horizontal references to other specs or contracts.

```text
References:
  ../models/invoice.sdd
  ../ports/billing-provider.sdd
```

Use references for sibling or cross-cutting context. Do not infer sideways inheritance.

### Must

Responsibilities, rules, and required behavior.

```text
Must:
  Validate invoice input before provider calls.
  Persist invoice records after successful provider creation.
  Normalize provider errors before returning them.
```

### Must not

Forbidden behavior, non-goals, and architectural boundaries.

```text
Must not:
  Call Stripe directly.
  Calculate tax.
  Send emails.
  Import HTTP request or response objects.
```

### Depends on

Allowed dependencies, collaborators, modules, ports, libraries, or abstractions.

```text
Depends on:
  InvoiceRepository
  BillingCustomerRepository
  BillingProviderPort
```

`Depends on` does not override inherited `Forbids` or `Must not`.

### Forbids

Forbidden dependencies, paths, modules, libraries, or architectural access.

```text
Forbids:
  stripe
  ../../api/*
  ../../ui/*
```

### Exposes

Public exports, endpoints, commands, components, events, or interfaces.

```text
Exposes:
  InvoiceService.createInvoice(input)
```

### Accepts

Inputs accepted by this unit.

```text
Accepts:
  CreateInvoiceInput
```

### Returns

Outputs returned by this unit.

```text
Returns:
  InvoiceResult
```

### Raises

Errors this unit may raise or return.

```text
Raises:
  InvalidInvoiceError
  BillingProviderError
```

### Handles

Errors, events, messages, states, or cases this unit must handle.

```text
Handles:
  provider timeout
  unsupported currency
  missing customer id
```

### Tasks

A lightweight local implementation checklist.

```text
Tasks:
  [ ] Add validation for unsupported currency.
  [ ] Add unit tests for invalid input.
```

Tasks are described in more detail below.

### Scenario

A behavioral example written in a Gherkin-like style.

```text
Scenario: invalid invoice amount
  Given an invoice input with amount less than or equal to zero
  When createInvoice is called
  Then the invoice is rejected
  And the billing provider is not called
```

Scenarios define behavior that should be implemented and tested when relevant.

### Example

Small concrete examples, payloads, usage snippets, or expected transformations.

Use examples sparingly.

### Done when

Completion criteria.

```text
Done when:
  All scenarios have tests.
  No forbidden dependencies are imported.
  Public contract is preserved.
```


## Tasks

Specs may include lightweight implementation tasks.

Tasks let developers control implementation order without using a separate project-management system.

Example:

```text
Tasks:
  [ ] Add validation for zero or negative amount.
  [ ] Persist provider invoice id after successful provider call.
  [ ] Map provider timeout to retryable BillingProviderError.
  [ ] Add unit tests for invalid input.
```

Allowed task states:

```text
[ ] open
[x] done
[-] skipped
[!] blocked
[?] needs decision
```

Examples:

```text
Tasks:
  [x] Define createInvoice public method.
  [ ] Add validation for unsupported currency.
  [!] Decide whether provider timeout should retry automatically.
  [?] Confirm whether draft invoices can be deleted.
  [-] Skip PDF rendering; owned by invoice-pdf feature.
```

Optional task IDs may be used:

```text
Tasks:
  [ ] #1 Add validation for zero or negative amount.
  [ ] #2 Persist provider invoice id after success.
  [ ] #3 Add tests for provider failure.
```

Task rules:

- Tasks are local to the spec where they appear.
- Tasks are implementation guidance, not architecture overrides.
- Tasks must not contradict `Must`, `Must not`, `Forbids`, or inherited constraints.
- Parent tasks are planning context, not automatically actionable in child specs.
- Only update task status in the currently targeted spec unless instructed otherwise.
- Prefer completing one task or a small related group of tasks at a time.
- Do not complete unrelated tasks opportunistically.
- Mark `[x]` only when implementation and relevant tests/checks are complete.
- Use `[!]` for blocked work.
- Use `[?]` for unresolved design decisions.


## Spec levels

SpecDD commonly uses the following spec levels.

You do not need every level in every project. Use the levels that add clarity.

SpecDD is adaptable to different project structures, languages, styles, and frameworks. The examples below are
illustrative, not prescriptive. Use specs and bootstrap overrides to adapt SpecDD to your project.

Important: remember that suffixes for the spec names are OPTIONAL and should be skipped when spec location implies
the spec level or component already.

### App spec

Defines global application context and architecture.

Typical file:

```text
app.sdd
```

Example:

```text
Spec: Billing Platform

Purpose:
  Internal platform for creating invoices, collecting payments, and tracking billing state.

Must:
  Use a modular monolith architecture.
  Keep domain logic out of controllers.
  Represent money as integer minor units.
  Access persistence only through repositories.
  Keep provider SDKs inside adapters.

Must not:
  Put business logic in UI components.
  Import external provider types into domain models.
  Use floating point numbers for money.
```

### Module spec

Defines a bounded domain or subsystem.

Typical file:

```text
module.sdd
```

Example:

```text
Spec: Billing Module

Purpose:
  Own invoice creation, billing customer state, payment attempts, and provider interaction.

Owns:
  src/billing/*

Must:
  Expose billing behavior through BillingService.
  Normalize provider errors before they leave the module.
  Keep billing domain models independent of provider SDKs.

Must not:
  Own tax calculation.
  Own accounting ledger behavior.
  Own authentication.
```

### Feature spec

Defines a user-visible or business capability.

Typical file:

```text
feature.sdd
```

Example:

```text
Spec: Invoice Creation

Purpose:
  Create a valid invoice for a billing customer through an external billing provider.

Must:
  Validate invoice input before provider calls.
  Store provider invoice id after successful creation.
  Return normalized billing errors.

Must not:
  Collect payment.
  Render invoice PDFs.
  Calculate tax.

Scenario: invoice is valid
  Given a billing customer exists
  And the invoice amount is greater than zero
  When an invoice is created
  Then the provider invoice is created
  And the local invoice is stored
```

### Service spec

Defines orchestration or application/domain service behavior.

Typical files:

```text
invoice.sdd
invoice.service.sdd
```

Example:

```text
Spec: Invoice Service

Purpose:
  Coordinate invoice creation.

Owns:
  invoice.ts
  invoice.test.ts

Must:
  Validate input before provider calls.
  Persist invoice after provider success.
  Normalize provider failures.

Must not:
  Call Stripe directly.
  Calculate tax.
  Send emails.

Depends on:
  InvoiceRepository
  BillingProviderPort

Tasks:
  [ ] Add validation for zero or negative amount.
  [ ] Add unit tests for invalid input.

Scenario: invalid invoice
  Given invoice amount is zero
  When createInvoice is called
  Then validation fails
  And provider is not called
```

### Model spec

Defines domain state, entities, value objects, and invariants.

Typical files:

```text
invoice.sdd
invoice.model.sdd
```

Example:

```text
Spec: Invoice

Purpose:
  Represent an invoice and protect invoice state transitions.

Must:
  Store amounts in integer minor units.
  Require a supported ISO currency.
  Prevent paid invoices from returning to draft.

Must not:
  Import repository code.
  Import provider SDK types.
```

### Adapter spec

Defines a boundary implementation for an external system.

Typical files:

```text
stripe.sdd
stripe.adapter.sdd
```

Example:

```text
Spec: Stripe Billing Adapter

Purpose:
  Implement the billing provider port using Stripe.

Must:
  Convert internal invoice data into Stripe requests.
  Convert Stripe errors into BillingProviderError.
  Keep Stripe types inside this adapter.

Must not:
  Import repositories.
  Change domain models.
  Return Stripe response objects.

Depends on:
  stripe
  BillingProviderPort
```

### API spec

Defines an inbound interface such as HTTP, GraphQL, RPC, CLI, or webhook.

Typical files:

```text
create-invoice.sdd
create-invoice.api.sdd
```

Example:

```text
Spec: Create Invoice API

Purpose:
  Expose invoice creation to authorized clients.

Must:
  Validate request shape.
  Call the invoice service.
  Convert service errors into API errors.

Must not:
  Contain domain business logic.
  Call repositories directly.
  Call provider SDKs directly.

Accepts:
  POST /invoices
  CreateInvoiceRequest

Returns:
  201 with InvoiceResponse
  400 for validation failure
  502 for provider failure
```

### Component spec

Defines UI component behavior.

Typical files:

```text
invoice-form.sdd
invoice-form.component.sdd
```

Use for frontend or UI units.

### Job spec

Defines background or scheduled work.

Typical files:

```text
invoice-sync.sdd
invoice-sync.job.sdd
```

Use for queues, scheduled tasks, workers, and background processes.

### Event spec

Defines emitted or consumed event/message contracts.

Typical files:

```text
invoice-created.sdd
invoice-created.event.sdd
```

Use for domain events, integration events, pub/sub messages, or queue payloads.

### Policy spec

Defines authorization, permission, or business decision rules.

Typical files:

```text
invoice-access.sdd
invoice-access.policy.sdd
```

Use for rules that decide whether something is allowed.


## Working with SpecDD manually

You can use SpecDD without any special tooling.

A normal manual workflow:

1. Create or update the relevant `.sdd` spec.
2. Define purpose, ownership, rules, scenarios, and tasks.
3. Implement one task or behavior at a time.
4. Add or update tests.
5. Mark completed tasks as `[x]`.
6. Keep the spec aligned with the code.

For example:

```text
Tasks:
  [ ] Add todo completion.
```

After implementing and testing it:

```text
Tasks:
  [x] Add todo completion.
```

Do not mark a task done just because code was written. Mark it done when the behavior is implemented and checked.


## Working with AI agents

A good agent prompt is short:

```text
Implement task 2 in invoice service as defined by the spec.
```

In a correct coding environment, the agent should:

1. read bootstrap files
2. find the spec chain
3. read parent specs
4. read the local spec
5. obey local write authority
6. implement the requested task
7. update tests
8. update task status only when complete

Best practice: prompt implementation in small chunks. Depending on spec complexity, ask for at most one to three specs
at a time. Prefer one spec at a time for best results.


## Creating a new SpecDD project

A minimal setup example:

```text
.specdd/
  bootstrap.md

app.sdd
src/
  module.sdd
```

Then add local specs where useful:

```text
src/
  todos/
    module.sdd
    todo.sdd
    todo.js
```

A minimal `app.sdd`:

```text
Spec: Todo App

Platform: JavaScript/ES6

Purpose:
  Demonstrate SpecDD using a small todo application.

Structure:
  src: Source code and colocated specs
  tests: Test suite

Must:
  Keep implementation simple.
  Prefer plain JavaScript.
  Keep tests readable.

Must not:
  Introduce frameworks unless requested.
```

A minimal local spec:

```text
Spec: Todo Store

Purpose:
  Manage todo items in memory.

Owns:
  todo.js

Must:
  Add todos with unique ids.
  List todos in insertion order.
  Mark todos complete.

Must not:
  Persist todos to disk.
  Use external dependencies.

Tasks:
  [ ] Add todo creation.
  [ ] Add todo completion.
  [ ] Add todo listing.

Scenario: add todo
  Given an empty todo store
  When a todo is added
  Then the todo appears in the list
```


## Best practices and observations

Keep specs short and concise. Long specs are harder for humans to maintain and harder for agents to use reliably.

Be explicit. The less an agent must infer, the better the outcome. State constraints, non-goals, dependencies, and
completion criteria directly.

Prefer many small specs over one large spec. Local specs preserve context and reduce prompt size.

Prompt implementation in small chunks. One spec at a time gives the best results. One to three related specs can work
when the task is simple and the boundaries are clear.

Use `Must not` aggressively. Non-goals and forbidden behavior are often more important for AI agents than positive
requirements.

Keep tasks local. A task should usually be implementable inside the local spec’s `Owns` or `Can modify` boundary.

Review agent output. SpecDD improves reliability, but it does not remove the need for human review, tests, and
verification.


## Conflict handling

If specs conflict, the agent should use these rules:

1. Prefer the more restrictive rule.
2. Prefer explicit local behavior only when it does not violate parent constraints.
3. Treat `Must not` and `Forbids` as stronger than `Must`, `Depends on`, or `Tasks`.
4. Treat inherited architecture as active unless explicitly and safely narrowed.
5. Do not use a task as justification to violate a rule.
6. If safe partial implementation is possible, do the safe subset.
7. If implementation cannot proceed safely, mark the task `[?]` or `[!]` and explain the issue.

Example conflict:

```text
Must not:
  Call Stripe directly.

Tasks:
  [ ] Call Stripe from InvoiceService.
```

The task is invalid because it violates `Must not`.


## Good specs and bad specs

Good specs are short and actionable.

Good:

```text
Must:
  Validate input before provider calls.
```

Bad:

```text
Must:
  The implementation should carefully validate every possible kind of user input in a robust and production-quality way before it makes any calls to downstream services or external providers.
```

Good task:

```text
Tasks:
  [ ] Add validation for unsupported currency.
```

Bad task:

```text
Tasks:
  [ ] Make billing better.
```

Good specs:

- are local
- are specific
- describe behavior
- define constraints
- avoid obvious implementation details
- guide tests
- keep AI agents inside boundaries

Bad specs:

- are long
- duplicate parent rules unnecessarily
- contain vague tasks
- hide architecture decisions in prose
- ask for broad refactors without scope
- describe unrelated parts of the system


## Relationship to tests

Specs are not tests, but they should guide tests.

Scenarios are especially useful as test inputs.

Spec:

```text
Scenario: invalid invoice
  Given invoice amount is zero
  When createInvoice is called
  Then validation fails
  And provider is not called
```

This should usually become a test.

Tests prove behavior. Specs explain why the behavior exists and where it belongs.


## Relationship to documentation

Specs are not ordinary documentation.

Documentation often explains how something works after the fact. Specs define how something should work and what
boundaries implementation must respect.

That said, specs are still readable by humans and can serve as useful project documentation. They can capture business
rules, development intent, architecture, and operational constraints in a structured way.

The difference is that specs are operational. Developers and agents use them while changing code.


## Relationship to issues and tickets

SpecDD tasks are not a replacement for project management.

Use issues or tickets for:

- planning across teams
- prioritization
- release tracking
- product management
- long-running work

Use SpecDD tasks for:

- local implementation steps
- AI-agent work packets
- unfinished work inside a spec boundary (TODO!)
- keeping code and spec progress aligned

A good SpecDD task should be small enough to implement locally.


## Tooling status

SpecDD is currently an informal language and convention.

At present, there is no official:

- validator
- parser
- formatter
- highlighter
- language server
- dependency checker
- task-state checker
- spec-chain resolver

This is intentional for the early stage. SpecDD should work with plain files and ordinary AI agents.

Future tooling could add validation, highlighting, chain resolution, forbidden-import checks, prompt generation, task
tracking, and editor support. Contributions are welcome.


## What is in this repository

In this repository:

- `src/.specdd/` contains SpecDD bootstrap templates and project bootstrap files.
- `src/AGENTS.md` is the agent entrypoint. It tells agents to read the bootstrap files and follow their instructions.
- `src/CLAUDE.md` is a compatibility entrypoint for Claude-style workflows. It simply points to `AGENTS.md`.


## Recommended repository files

A practical SpecDD project may include:

```text
.specdd/bootstrap.md
.specdd/bootstrap.project.md
.specdd/bootstrap.local.md
AGENTS.md
CLAUDE.md
README.md
app.sdd
src/**/**/*.sdd
```

Suggested `.gitignore` entry:

```text
.specdd/bootstrap.local.md
```

Optional short `CLAUDE.md`:

```md
# CLAUDE.md

Before working on this project, read `AGENTS.md`.
```

Optional short `AGENTS.md`:

```md
# AGENTS.md

Before working on this project, read `.specdd/bootstrap.md` and any bootstrap override files.

Assume the role, rules, workflow, and implementation constraints described there. Treat SpecDD specs as source-adjacent
development contracts, not optional documentation.
```


## FAQ

### Is SpecDD production-ready?

SpecDD is experimental. Results are generally very good, but you should expect surprises and always verify agent
outputs.

### Is SpecDD a programming language?

No. SpecDD is a lightweight specification convention.

### Is SpecDD a formal language?

No. It is currently informal. There is no official parser, validator, or highlighter yet.

It is strongly recommended to follow the documented language closely and avoid inventing custom syntax unless necessary.
Future tooling may rely on the current conventions.

### Is SpecDD a testing framework?

No. Specs can guide tests, but they are not tests.

### Is SpecDD only for AI?

No. Humans can use it directly. It is designed to be especially useful with AI coding agents.

### Do I need tools?

No. SpecDD can work with plain text files and any LLM that can read repository files.

### Can SpecDD work with my language or framework?

Yes. SpecDD is designed to adapt to any language, platform, framework, project structure, or programming style as long
as the code is organized in files.

### Why not just use tests?

Tests describe expected behavior. Specs also describe ownership, architecture, constraints, dependencies, non-goals, and
implementation tasks.

### Why not use one big specification?

Large specs are hard to keep in context and tend to rot. SpecDD prefers many small specs close to the code they govern.

### Can a project have multiple app specs?

Usually there should be one root `app.sdd` per hierarchy. A monorepo may have multiple independent app-level
hierarchies.

### Should specs be reviewed?

Yes. Specs define architecture and implementation authority, so they should be reviewed just like code.

### Is SpecDD only for new projects?

No. SpecDD works well for both greenfield and existing projects. For existing codebases, start small: add specs around
the parts you are actively modifying, then expand coverage as needed.



## License

SpecDD is licensed under the Apache License 2.0.
