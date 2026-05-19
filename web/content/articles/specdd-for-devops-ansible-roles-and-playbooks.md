---
title: "SpecDD for DevOps: Using Specs to Build Better Ansible Roles and Playbooks"
seoTitle: "SpecDD for DevOps: Specification-Driven Development for Ansible"
date: 2026-05-18
seoDescription: "A practical guide to using SpecDD with Ansible roles and playbooks, showing how local specs steer AI-assisted infrastructure automation, idempotency, review quality, and DevOps productivity."
excerpt: "Ansible starts approachable, but high-quality Ansible automation becomes complex quickly. SpecDD gives DevOps teams a local specification layer that steers roles, playbooks, inventories, variables, handlers, and templates, so humans and AI agents can build safer infrastructure automation with less repeated correction."
author: "Matīss Treinis"
---

Ansible has an interesting shape as a technology. It is easy enough to start that a useful playbook can appear in an
afternoon, yet serious Ansible projects become large and subtle much faster than people expect. A few tasks turn into a
deployment workflow. The workflow grows host groups, variables, conditionals, templates, handlers, tags, vault files,
environment overrides, and role dependencies. Before long, the hard part is no longer remembering which YAML indentation
level you are in. The hard part is keeping the automation structured enough that it can be rerun, reviewed, changed,
and trusted.

This is where AI-assisted infrastructure work gets both useful and risky.

An AI agent can generate a plausible Ansible role quickly. It can write the usual role structure and a Molecule scenario
with very little prompting. That is genuinely useful, especially for the repetitive work that DevOps and platform teams
deal with every day. But plausible Ansible is not the same as good Ansible. A generated role can pass syntax checks
while still restarting a service too often, hiding behavior in `shell`, or touching parts of the host that the role
should not own.

Ansible already gives operations teams a way to steer remote systems. A playbook describes what a host should become,
which tasks should run, which services should be present, and which configuration should exist. SpecDD can play a
similar role one level up. It steers the Ansible project itself by specifying what roles and playbooks should do, what
they should not do, and what shape the automation should keep as it grows.

That distinction matters because Ansible quality depends so much on intent that is not visible in the YAML itself. The
automation needs to know ownership, host scope, variable contracts, service lifecycle rules, secret handling, and the
operational risks that are explicitly out of bounds. Those rules usually exist somewhere, but often not where the next
human or AI agent will see them before making a change. SpecDD gives those rules a local home, which makes it useful
for code generation, code review, and day-to-day operational alignment.

## When YAML Starts Carrying Architecture

Small Ansible files can look deceptively straightforward when they install a package, render a file, and start a
service. There is nothing wrong with that beginning, and it is one of the reasons Ansible has remained so widely useful.
The problem arrives when those simple tasks become shared infrastructure automation.

A role is not just a folder of YAML. It is an API made from defaults, handlers, templates, and tasks. Together, those
files define inputs, service behavior, configuration assumptions, idempotency expectations, and platform support.

Playbooks have the same problem at a different level. A playbook that begins as orchestration can slowly become a junk
drawer for reusable tasks, environment exceptions, deployment policy, inventory-specific behavior, and one-off fixes.
The file still looks like YAML, but it has become architecture. If that architecture is only implied by convention, a
human or AI agent new to the project will usually infer something reasonable from common Ansible practice. Reasonable is
not enough when your production automation has local rules.

DevOps teams run into this every day. A playbook succeeds on staging but changes too much on production. A role works
for the first Linux family it saw, then fails elsewhere because nobody wrote the platform contract down. A default
variable looks harmless until downstream playbooks start treating it as public API. By the third review comment about
`shell`, secrets, or firewall ownership, the team is no longer arguing about style. It is paying a productivity cost for
missing context.

Every unclear boundary creates another loop: run the playbook, inspect the changed output, fix the task, adjust the
role after review, then repeat the same correction when the next role is generated. Some of that iteration is normal
infrastructure work, but a surprising amount of it is the cost of missing contracts, and this is not just an AI coding
problem.

## Valid YAML Is A Low Bar

AI agents tend to be good at producing YAML that looks like Ansible. They know common modules, common role layouts, and
the general shape of handlers, templates, defaults, and Molecule tests. That makes them useful, but it also makes their
mistakes less obvious at first glance.

The output usually does not fail because it is nonsense. It fails because it does not know your operating model.

Common examples pull humans and agents toward shell commands, restart semantics, production assumptions in defaults,
and reusable logic placed directly in a playbook because those are often the shortest paths to a working answer.

None of those decisions are strange in isolation. They are just locally wrong.

SpecDD is useful here because it gives the implementer, human or AI, a smaller, sharper set of local rules before tasks
are written. Instead of asking for "an nginx role" and then correcting whatever generic nginx role the model produced,
you can first define what this role owns, what it must do, and what it must not do. The prompt becomes shorter because
the context is already in the repository.

```text
Implement the nginx role according to role.sdd.
Keep the role idempotent and update the Molecule scenario.
```

That prompt only works if `role.sdd` carries enough of the operational contract to matter.

## The Repo-Level Contract

For an Ansible repository, I would usually start with a project-level spec. It does not need to describe every role.
That would recreate the big-document problem in a different format. The project spec should define the operating rules
that apply everywhere unless a more local spec narrows them.

```sdd
Spec: Ansible Platform Automation

Purpose:
  Provision and maintain application hosts through repeatable Ansible automation.

Structure:
  ./inventories: Environment inventories and group variables
  ./playbooks: Entry-point playbooks
  ./roles: Reusable host configuration roles

Must:
  Keep playbooks thin and orchestration-focused.
  Put reusable host behavior in roles.
  Prefer Ansible modules over shell or command tasks.
  Keep tasks idempotent unless a task explains why it cannot be.
  Preserve useful check mode behavior for non-destructive validation.
  Run ansible-lint and playbook syntax checks before completion.

Must not:
  Store secrets outside Ansible Vault or the approved secret backend.
  Put production-only assumptions in reusable role defaults.
  Restart services unless reload is insufficient or unsafe.
  Modify firewall, users, or networking from application roles.
  Use shell or command when a purpose-built Ansible module exists.

Done when:
  ansible-lint passes.
  Affected playbooks pass syntax checks.
  Role changes include Molecule coverage when practical.
```

This kind of spec is not documentation in the usual passive sense. It is a working contract for the repository. When
someone touches a role, human or AI, the project spec tells them that roles own reusable behavior, that playbooks should
stay thin, and that shell is not the default escape hatch. When a human reviews a patch, the same spec gives them
something concrete to point at instead of rewriting team preferences in pull-request comments.

It also gives the ops team a shared surface for expectations. One engineer may think the nginx role owns only package
installation and virtual host configuration, while another may expect it to open firewall ports, manage certificates,
and place monitoring checks. That disagreement should not be discovered in the middle of a generated patch or a
production rollout. A local spec makes the role's intended behavior explicit enough that the team can align on it
before automation starts making changes.

The productivity gain is not that the spec writes the role for you. The gain is that the same correction does not have
to be rediscovered in every role.

## Playbooks Need Boundaries Too

It is tempting to spec only roles because roles feel like reusable components. Playbooks deserve specs as well, often
for the opposite reason. A playbook is where reuse can break down if orchestration turns into implementation.

Consider a `playbooks/site.yml` file for the web fleet. A useful local spec might look like this:

```sdd
Spec: Web Fleet Provisioning Playbook

Purpose:
  Apply baseline, web server, application runtime, and monitoring roles to web hosts.

Owns:
  ./site.yml

References:
  ../roles/baseline/role.sdd
  ../roles/nginx/role.sdd
  ../roles/app-runtime/role.sdd
  ../roles/node-exporter/role.sdd

Must:
  Target only the web host group.
  Run baseline before application-specific roles.
  Apply monitoring after web and runtime services are configured.
  Preserve tags for baseline, web, app, and monitoring.
  Keep environment-specific values in inventory or group variables.

Must not:
  Define reusable tasks directly in the playbook.
  Include database roles.
  Set production-only variables in the playbook.
  Override role defaults except for orchestration-specific values.

Done when:
  ansible-playbook --syntax-check passes for this playbook.
  The playbook remains a role orchestration entry point.
```

That spec is short, but it catches a common drift pattern. Without a boundary, a playbook slowly accumulates behavior
that should have become role behavior, often through small convenient additions that make sense one at a time. The
combined result is a playbook that no longer tells a clean story.

A playbook spec gives the implementer and reviewer the same question to ask: does this change belong in orchestration,
or is it reusable behavior trying to sneak into the entry point?

## A Role With Operational Shape

Roles are where SpecDD starts to feel very practical because the spec can describe the role's public contract, its
files, its variables, and its operational safety rules in one local place.

Here is a compact nginx role spec:

```sdd
Spec: Nginx Role

Purpose:
  Install nginx, manage virtual host configuration, and keep the service running.

Owns:
  ./defaults/main.yml
  ./tasks/main.yml
  ./handlers/main.yml
  ./templates/site.conf.j2
  ./molecule/default/*

Must:
  Install nginx through the platform package manager.
  Render virtual host configuration from role variables.
  Validate nginx configuration before applying a reload.
  Reload nginx only when managed configuration changes.
  Support Debian and Ubuntu hosts.
  Keep repeated runs idempotent.

Must not:
  Manage TLS certificate issuance.
  Modify firewall rules.
  Store private keys or secrets in templates.
  Restart nginx when reload is sufficient.
  Use shell for package installation or service management.

Scenario: first install
  Given a supported host without nginx installed
  When the role runs
  Then nginx is installed
  And the service is enabled and running

Scenario: no-change run
  Given the host already matches the desired role state
  When the role runs again
  Then no tasks report changed
  And no handlers run

Scenario: managed config change
  Given nginx is installed
  And the managed virtual host template changes
  When the role runs
  Then nginx configuration is validated
  And the nginx service is reloaded

Scenario: invalid config
  Given a rendered nginx configuration would be invalid
  When validation runs
  Then the role fails before reloading nginx

Done when:
  ansible-lint passes.
  Molecule verifies install and idempotency behavior.
  Template validation runs before reload.
```

The important parts are not exotic. They are the operational constraints that normally live in the head of the person
who has been maintaining the role: reload when reload is sufficient, validate before reload, do not own TLS or firewall
policy, support the intended platforms, and keep repeated runs quiet.

These are exactly the details a new contributor or AI agent can miss while still producing a role that looks
professional.

The spec also makes review less vague. If the generated role uses `ansible.builtin.service` with `state: restarted`,
there is no need for a philosophical discussion about whether restarts are acceptable. The local contract already says
reload is expected when reload is sufficient. If the role adds `ufw` tasks, the review can point to the `Must not`
section instead of relying on the reviewer to remember which role owns firewall policy.

## Variables Are Public API

Many Ansible problems come from variables that were treated as casual implementation details. Defaults are especially
easy to underestimate. Once a variable appears in `defaults/main.yml`, downstream playbooks and inventories may begin
using it. Renaming it later becomes a breaking change, even if nobody called it an API at the time.

A small spec beside the defaults file can help:

```sdd
Spec: Nginx Role Defaults

Purpose:
  Define the public variable contract for the nginx role.

Owns:
  ./defaults/main.yml

Must:
  Provide safe defaults for local and test environments.
  Treat variables in defaults/main.yml as public role inputs.
  Document required production overrides through comments in defaults.
  Keep variable names stable once used by playbooks or inventories.

Must not:
  Put secrets in defaults.
  Use production hostnames as defaults.
  Encode environment-specific policy in reusable defaults.
  Rename public variables without updating dependent playbook specs.

Example:
  nginx_listen_port: 8080
  nginx_server_name: localhost
  nginx_worker_connections: 1024
```

This looks small, but it changes implementation behavior. If a change needs a new variable, the spec forces the
question of whether the variable belongs in defaults, vars, group vars, or a playbook override. It also gives the
reviewer a place to judge whether a default is genuinely safe or whether it smuggles production policy into reusable
code.

Handlers deserve the same treatment when service behavior is sensitive. If a role has caused production incidents, the
handler spec may only need a few lines: validate before reload, reload after managed configuration changes, and do not
restart by default. Service lifecycle behavior is small in code and large in consequence.

## The Useful AI Loop

The SpecDD workflow for Ansible does not need to be heavy. In practice, I would use it to create a few checkpoints
before the agent writes too much YAML.

Start with a rough prompt that asks for a spec, not an implementation:

```text
Draft a SpecDD spec for an nginx Ansible role.
Focus on idempotency, handlers, variables, supported platforms, and operational boundaries.
Do not create role files yet.
```

Then use the agent to challenge the spec:

```text
Review this role spec for ambiguity and missing operational constraints.
Look especially for idempotency, check mode, service restarts, secrets, and role ownership.
Do not implement anything.
```

That prompt often produces useful questions about supported platforms, TLS ownership, reload safety, validation
failures, public variables, and whether the role manages one site or many.

Those questions are cheap before the role exists. They are much more annoying after the agent has generated files,
tests, and templates around the wrong assumptions.

Once the spec is tight enough, ask for a plan:

```text
Read the nginx role spec and produce an implementation plan.
Name the files you expect to create or modify.
Name the checks you expect to run.
Do not edit files yet.
```

The plan is another checkpoint. If the agent plans to cross a boundary, such as editing inventory from a role task or
putting reusable behavior into a playbook, you can stop the mistake while it is still text. After the plan is aligned,
implementation can happen in smaller slices.

```text
Implement only the first unchecked task in the nginx role spec.
Keep the role idempotent.
Update Molecule coverage for that task.
Run the relevant checks and update the task status.
```

That style of prompt is not slower in practice. It feels slower only if you compare it to the first generation of YAML
and ignore the rework that often follows. For DevOps work, the expensive part is not typing the role. The expensive part
is discovering late that the role was structured around the wrong assumptions.

## Whole Projects, Local Specs

SpecDD becomes more useful as the Ansible repository grows because the specs can follow the same locality as the
automation. You do not need one enormous infrastructure specification that explains every host, every playbook, and
every role. You need small specs near the things they govern.

A mature Ansible repository might grow into something like this:

```text
ansible/
  project.sdd
  inventories/
    production/
      inventory.sdd
      group_vars/
        web.sdd
    staging/
      inventory.sdd
  playbooks/
    site.yml
    site.sdd
    deploy-app.yml
    deploy-app.sdd
  roles/
    nginx/
      role.sdd
      defaults/
        main.yml
        main.sdd
      handlers/
        main.yml
        main.sdd
      tasks/
        main.yml
        main.sdd
      templates/
        site.conf.j2
        site.conf.sdd
    app-runtime/
      role.sdd
    postgres/
      role.sdd
```

The inheritance model matters here. A role inherits the broad project rules, then narrows them locally. A playbook can
reference role specs, but it does not automatically own the role implementation. Inventory specs can capture
environment-specific constraints without leaking those constraints into reusable role defaults.

For production inventory, a spec might say:

```sdd
Spec: Production Inventory

Purpose:
  Define production host groups and production-only operational constraints.

Owns:
  ./hosts.yml
  ./group_vars/*

Must:
  Keep production-only values inside production inventory files.
  Use encrypted storage for secret values.
  Require explicit operator approval for destructive maintenance playbooks.
  Preserve host group names consumed by production playbooks.

Must not:
  Store plain-text secrets.
  Change host group semantics without updating dependent playbook specs.
  Override role defaults to compensate for broken role behavior.
```

That last rule is the kind of thing teams learn from pain. Inventories often become the place where broken role design
gets patched over because it is faster than fixing the role. Sometimes an override is appropriate, but if it becomes
the default way to make automation work, the project starts carrying invisible coupling. A local spec gives the team a
place to name that pattern and push back on it.

## DRY Applies To Specs Too

SpecDD has the same duplication problem as any other engineering tool if you use it poorly. If every `role.sdd` says
"prefer Ansible modules over shell," "keep tasks idempotent," "do not store secrets in defaults," and "keep playbooks
thin," the specs will start to feel like boilerplate quickly.

SpecDD inheritance is meant to avoid that by moving shared rules up and keeping local rules local.

The repository-level spec should carry rules that apply across the Ansible project. A `roles/` spec can describe what
reusable roles are allowed to own, how role defaults should behave, and what checks role changes are expected to run. A
specific `roles/nginx/role.sdd` should only add the nginx-shaped contract: supported platforms, managed templates,
public variables, handler behavior, and boundaries such as not owning TLS issuance.

That keeps specs DRY in the same way good Ansible keeps automation DRY. You do not copy shared task logic into every
playbook, and you should not copy shared specification rules into every role. If application roles must not manage
firewall policy, that rule belongs high enough for those roles to inherit it. The nginx spec only needs to mention the
rule again if it is narrowing the boundary or making a local exception explicit.

This matters for AI agents and humans alike because they can read the inherited chain and get both kinds of context at
once. The parent specs explain the general rules of the repository, while the local spec explains the role or playbook
being changed. That is better than making every file carry the full policy load, and it makes policy changes easier to
review because the shared rule has one home.

## What Gets Caught Earlier

SpecDD will not prevent every bad playbook, and it does not replace `ansible-lint`, Molecule, syntax checks, review, or
careful production rollout. It gives those practices a better target.

The most useful catches are often mundane: a command task that reports changed on every run, a handler that restarts
when reload would be enough, or a playbook absorbing work that belongs in a role.

None of those mistakes require a bad model. They only require missing local context.

The productivity benefit comes from catching those decisions at the spec and plan level, then preserving the correction
for the next change. If a reviewer says "this role must not manage firewall rules" and that sentence stays only in a
pull request, the next contributor or agent can make the same mistake next week. If it becomes a local `Must not`,
future work has a better chance of starting from the right boundary.

That is especially valuable for teams where DevOps work is spread across people who do not all live in the Ansible repo
every day. Backend engineers, platform engineers, SREs, and AI agents may all touch the automation from different
angles. SpecDD gives those contributors the same local surface for intent.

## Start With The Role That Hurts

I would not start by trying to spec an entire Ansible repository. That sounds thorough, but it is usually the wrong
shape of work. Start where the cost is already visible.

Pick the role that gets the most review comments, causes the most unexpected changes on rerun, or makes people nervous
when it touches production. Write a small `role.sdd` that names what it owns, what it must do, and what it must not do.
Add scenarios for the behaviors that have broken before. If the risk sits in handlers, defaults, or a playbook that has
become a dumping ground, put the spec beside that boundary and make the ownership explicit.

Then use the agent in smaller loops: draft the spec, challenge it, plan against it, implement one task group, run the
checks, and update the spec when the work reveals a real missing rule.

This is where SpecDD fits DevOps particularly well. Infrastructure automation is full of small decisions that look
obvious after the incident and ambiguous before the implementation. A local spec gives those decisions somewhere to
live while they are still cheap to change.

Good Ansible is not just YAML that runs. It is structured automation that can be reviewed, reused, rerun, and changed
without everyone rebuilding the same mental model from scattered files and old conversations. SpecDD gives that
structure a local contract, which is exactly what humans and AI agents need before the next playbook grows around a
guess.

## Wait, Isn't Good YAML Enough?

It is a fair objection. If Ansible is already declarative, and if a well-written role already describes the desired
state of a host, why add a spec on top? Why not just write better YAML?

The short answer is that good YAML still has to be good according to something. Ansible can describe the desired state
of a host and show a careful implementation of that work, but it does not naturally explain whether the role owns the
right responsibility, whether its defaults are public API, or whether a restart is unacceptable because the operational
model expects reload.

Those are project intent questions, not YAML quality questions. A role can be clean, idempotent, linted, and still
wrong for the repository, the project, the environment, or the operating model around it. It might be good Ansible in
the abstract while still violating the way this team wants infrastructure automation to be shaped.

There is also a review problem hidden in "just write good YAML." Once the YAML exists, reviewers have to infer which
parts are deliberate and which parts are incidental. If the role currently restarts nginx on config changes, is that an
intentional operational choice or a mistake that nobody noticed? If a variable lives in defaults, is it public contract
or just the first place someone put it? Treating the implementation as the complete source of truth makes current
behavior look intentional, even when it is only historical residue.

SpecDD gives the team a place to write the operating rule down before the YAML is written or changed. It can say that
the role owns package installation and virtual host configuration, but not TLS issuance, or that the playbook
orchestrates roles and does not absorb reusable tasks. Comments can express pieces of that, but they are scattered
through the implementation, rarely describe the whole boundary, and are easy for humans and agents to treat as
background prose when they are not part of a local contract.

You also lose the spec-driven workflow if YAML is the only artifact. A local spec gives an implementer something to
plan against before editing, gives reviewers something to compare the patch against afterward, and gives the team a
place to track phased work through `Tasks`, scenarios, and `Done when` criteria. That is what makes iterative
development and checked planning phases cleaner: draft the spec, check the plan, implement the next slice, run the
checks, and update the contract when the work reveals a real missing rule.

The timing matters. Good YAML is the output you want, and the spec is part of how you get there. If you wait until the
role exists and then decide whether the YAML is good, you are back to inspecting a finished shape and arguing from
taste, habit, and memory. If the local contract is written first, the implementer can make better choices before
creating the tasks, handlers, defaults, templates, and tests.

SpecDD is not a replacement for writing good Ansible. You still need good modules, idempotent tasks, careful
variables, useful checks, and disciplined rollout. SpecDD is where the repository defines what good means locally, so
the next human or AI agent is not forced to reverse-engineer that definition from whatever YAML happens to exist today.
