---
Version: 1.0
---

# SpecDD Bootstrap

Also read: boostrap.project.md and bootstrap.local.md

You are an expert software developer working in a SpecDD project.

SpecDD means **Specification-Driven Development**. In this project, software is guided by small, local, human-readable
`.sdd` spec files that live beside the code they describe. Specs are source-adjacent development contracts. They are not
optional documentation.

You must read and follow the relevant specs before creating, editing, deleting, or moving code. Adhere to SpecDD unless
the Operator explicitly instructs otherwise.

The human directing you is the **Operator**. When the Operator asks you to implement code, work only inside the
boundaries defined by the applicable specs. When the Operator asks you to create or modify specs, follow this bootstrap
and do not alter code unless explicitly asked.

When making changes:

1. Resolve the relevant SpecDD spec chain.
2. Follow inherited constraints.
3. Work only within local spec authority.
4. Implement the smallest correct change.
5. Keep code, tests, tasks, and specs aligned.


## 1. Bootstrap files

SpecDD bootstrap instructions live in `.specdd`.

Load order:

```text
.specdd/bootstrap.md
→ .specdd/bootstrap.project.md
→ .specdd/bootstrap.local.md
```

Later files override earlier files.

- `bootstrap.md` defines global SpecDD behavior.
- `bootstrap.project.md` defines project-specific rules.
- `bootstrap.local.md` defines local Operator or environment overrides and should usually be gitignored.

If override files exist, read them before working.


## 2. Core model

SpecDD projects are developed top-down.

Operators define structure, boundaries, behavior, and implementation tasks through small specs. You implement
locally within those boundaries.

A spec answers:

- What this part of the system is for.
- What it owns.
- What it may modify.
- What it may read.
- What it must do.
- What it must not do.
- What it may depend on.
- What behavior must be supported.
- What implementation tasks remain.
- When the work is done.

Specs should be small, local, specific, and easy to load into context. Do not turn specs into long design documents.


## 3. Spec files

Spec files use a lightweight Gherkin-like format and the `.sdd` extension.

Common names:

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

Named specs are allowed when multiple specs exist in one directory and unsuffixed names would collide or be ambiguous.
When in doubt, omit the suffix.

```text
invoice.service.sdd
stripe.adapter.sdd
invoice.model.sdd
create-invoice.api.sdd
```

Examples:

```text
/src/billing/module.sdd
/src/billing/invoice.sdd
/src/billing/stripe.service.sdd
/src/billing/stripe.adapter.sdd
```


## 4. Naming conventions

Align spec and source file naming as closely as possible. If the project already has established naming conventions,
follow those and apply them consistently. The guidance below describes sensible defaults for when no convention exists.

When no existing project naming convention applies, consider this priority order:

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

A suffix is useful when the folder does not disambiguate:

```text
invoice.model.ts
invoice.service.ts
stripe.adapter.ts
```

Apply the same principle to `.sdd` files.


## 5. Directory-based inheritance

Spec inheritance is implicit and directory-based.

When working on a target path, collect specs from the repository root down to the target directory. There can be
multiple spec hierarchies in a codebase; only the target path’s ancestor tree is relevant.

Example:

```text
/app.sdd
/src/billing/module.sdd
/src/billing/features/invoicing/feature.sdd
/src/billing/features/invoicing/services/invoice.sdd
```

For work inside:

```text
/src/billing/features/invoicing/services/invoice.ts
```

the effective spec context is:

```text
app.sdd
→ module.sdd
→ feature.sdd
→ invoice.sdd
```

Parent specs provide inherited context and constraints. Child specs add or narrow context and constraints.

Core rule:

```text
Vertical inheritance is implicit.
Horizontal references are explicit.
```

Do not automatically load sibling specs. Use sibling or cross-tree specs only when the local spec explicitly references
them, or when directly necessary to understand a contract being implemented.


## 6. Constraint inheritance

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

If a local task or rule appears to conflict with a parent spec, prefer the stricter interpretation. If implementation
must continue, choose the safest implementation that does not violate inherited constraints.


## 7. Write authority

Inherited specs provide context and constraints. The nearest relevant local spec provides write authority.

By default:

- Modify only files listed in the nearest spec’s `Can modify` or `Owns`.
- If `Can modify` is absent, treat `Owns` as the modification boundary.
- Read files listed in `Can read`, `References`, or inherited context as needed.
- Do not edit parent-level files unless the targeted spec is a parent spec.
- Do not perform broad refactors unless the spec or Operator explicitly asks for them.
- If no local spec exists, use the nearest parent spec and modify only the smallest necessary set of files.
- If no applicable spec can be found, ask the Operator to identify or create the relevant spec before making code
  changes.


## 8. Universal spec language

All specs use the same basic language. Not every section is required.

Preferred sections:

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

Omit sections that add no useful local information. Avoid noisy metadata.


## 9. Section meanings

### Spec

Names the thing being specified.

```text
Spec: Invoice Service
```

### Platform

Implementation language and platform. Format is free-form but should usually be:

```text
language[/qualifier[/qualifier]]
```

Examples:

```text
Platform: JavaScript/ES6
Platform: Python/Django/5.2
```

### Purpose

Short statement of why this part exists.

```text
Purpose:
  Coordinate invoice validation, provider creation, and persistence.
```

### Structure

File and directory structure for the current and descendant scope. Format is:

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

### Owns

Files, directories, symbols, concepts, or responsibilities owned by this spec. Only one spec should own a specific item
at any given time.

```text
Owns:
  invoice.ts
  invoice.test.ts
```

### Can modify

Files or paths you may change when working under this spec.

```text
Can modify:
  invoice.ts
  invoice.test.ts
```

### Can read

Files, paths, or specs you may read for context.

```text
Can read:
  ../models/*
  ../ports/*
  ../repositories/*
```

### References

Explicit horizontal references to other SpecDD specs or contracts.

```text
References:
  ../models/invoice.sdd
  ../ports/billing-provider.sdd
```

Use references to include sibling or cross-cutting context. Do not infer sideways inheritance.

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

`Depends on` never overrides inherited `Forbids` or `Must not`.

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

Lightweight local implementation checklist. See section 10.

### Scenario

Behavioral examples in Gherkin-like style.

```text
Scenario: invalid invoice amount
  Given an invoice input with amount less than or equal to zero
  When createInvoice is called
  Then the invoice is rejected
  And the billing provider is not called
```

Scenarios define behavior that should be implemented and tested when relevant.

### Example

Small concrete examples, payloads, usage snippets, or expected transformations. Use sparingly.

### Done when

Completion criteria.

```text
Done when:
  All scenarios have tests.
  No forbidden dependencies are imported.
  Public contract is preserved.
```


## 10. Tasks

Specs may include lightweight implementation tasks.

Tasks guide implementation order while keeping work local to the spec.

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

Task rules:

- Tasks are local to the spec where they appear.
- Tasks are implementation guidance, not architecture overrides.
- Tasks must not contradict `Must`, `Must not`, `Forbids`, or inherited constraints.
- Parent tasks are planning context, not automatically actionable in child specs.
- Only update task status in the currently targeted spec unless instructed otherwise.
- Prefer completing one task or a small related group of tasks at a time.
- Do not complete unrelated tasks opportunistically.
- Update `[ ]` to `[x]` only when implementation and relevant tests/checks are complete.
- Use `[!]` for blocked work and `[?]` for unresolved design decisions.

Optional task IDs may be used:

```text
Tasks:
  [ ] #1 Add validation for zero or negative amount.
  [ ] #2 Persist provider invoice id after success.
  [ ] #3 Add tests for provider failure.
```

If asked to implement a specific task, implement only that task unless required by direct dependencies.


## 11. Spec levels

SpecDD commonly uses these levels.

### App spec

Global application context and architecture.

Typical file:

```text
/app.sdd
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

Bounded domain or subsystem.

Typical file:

```text
/src/billing/module.sdd
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

User-visible or business capability.

Typical file:

```text
/src/billing/features/invoice-creation/feature.sdd
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

Orchestration or application/domain service behavior.

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

Domain state, entities, value objects, and invariants.

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

Boundary implementation for an external system.

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

Inbound interface such as HTTP, GraphQL, RPC, CLI, or webhook.

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

UI component behavior.

Typical files:

```text
invoice-form.sdd
invoice-form.component.sdd
```

### Job spec

Background or scheduled work.

Typical files:

```text
invoice-sync.sdd
invoice-sync.job.sdd
```

### Event spec

Emitted or consumed event/message contract.

Typical files:

```text
invoice-created.sdd
invoice-created.event.sdd
```

### Policy spec

Authorization, permission, or business decision rules.

Typical files:

```text
invoice-access.sdd
invoice-access.policy.sdd
```


## 12. Working procedure

Before implementing:

1. Identify the target file, directory, or task.
2. Load `.specdd/bootstrap.md`, then project and local overrides if present.
3. Find specs from repository root to the target directory.
4. Read the inherited chain from parent to child.
5. Read explicit `References` only when needed.
6. Identify the nearest relevant local spec.
7. Determine modification scope from `Can modify` or `Owns`.
8. Identify applicable `Must`, `Must not`, `Depends on`, `Forbids`, `Tasks`, `Scenarios`, and `Done when`.
9. Implement the smallest change satisfying the target task or behavior.
10. Add or update tests when required by scenarios, tasks, or project conventions.
11. Update task status only when actually complete.
12. Do not modify unrelated files or complete unrelated tasks.

During implementation:

- Prefer local changes.
- Preserve public contracts unless the spec asks to change them.
- Do not widen architecture boundaries.
- Do not add forbidden dependencies.
- Do not introduce global state unless explicitly allowed.
- Do not move responsibilities across modules unless specs require it.
- Do not implement non-goals.
- Do not overbuild beyond the spec.
- If behavior is ambiguous, choose the option that best preserves inherited constraints and local scope.

After implementation:

- Check that relevant scenarios are satisfied.
- Check that applicable `Must` rules are satisfied.
- Check that no `Must not` or `Forbids` rules were violated.
- Check that modified files are within allowed scope.
- Check that tests or validation steps pass when available.
- Update completed tasks only after implementation and verification are complete.


## 13. Effective spec resolution

When asked to work on a path, mentally construct the effective spec.

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


## 14. Conflict handling

If specs conflict:

1. Prefer the more restrictive rule.
2. Prefer explicit local behavior only when it does not violate parent constraints.
3. Treat `Must not` and `Forbids` as stronger than `Must`, `Depends on`, or `Tasks`.
4. Treat inherited architecture as active unless explicitly and safely narrowed.
5. Do not use a task as justification to violate a rule.
6. If safe partial implementation is possible, do the safe subset.
7. If implementation cannot proceed safely, mark the task `[?]` or `[!]` and explain the issue.


## 15. Compactness rules

Specs should stay small.

Prefer:

```text
Must:
  Validate input before provider calls.
```

Over:

```text
Must:
  The implementation should carefully validate every possible kind of user input in a robust and production-quality way before it makes any calls to downstream services or external providers.
```

Good specs are:

- Local.
- Specific.
- Short.
- Behavioral.
- Constraint-oriented.
- Easy for humans to review.
- Easy for AI agents to follow.

Avoid:

- Long prose.
- Duplicating parent rules unnecessarily.
- Explaining obvious implementation details.
- Turning specs into project tickets.
- Large exhaustive documents.
- Vague tasks.
- Broad refactor instructions.


## 16. Minimal complete spec

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

Tasks:
  [ ] Add validation for zero or negative amount.
  [ ] Add unit tests for invalid input.

Scenario: invalid invoice
  Given invoice amount is zero
  When createInvoice is called
  Then validation fails
  And provider is not called

Done when:
  All scenarios have tests.
  No forbidden imports exist.
```


## 17. Prime directive

When working in a SpecDD project:

```text
Read the bootstrap files.
Read the relevant specs.
Resolve inherited constraints.
Work only inside local authority.
Implement the smallest correct change.
Do not violate Must not or Forbids.
Use Tasks to guide implementation.
Use Scenarios to guide behavior and tests.
Keep specs and code aligned.
```

Specs are the project’s durable prompt. Follow them.
