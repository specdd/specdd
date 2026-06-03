---
title: "SpecDD Superpowers: Traceable Intent"
date: 2026-06-03T19:09:00+02:00
seoDescription: "How SpecDD and spec-driven development make software intent traceable through semantic test coverage and contract-aware review."
excerpt: "SpecDD does more than make intent local. Once specs exist beside the code they govern, intent becomes traceable. Teams can compare tests to requirements, review AI-generated diffs against local contracts, and notice when code has drifted away from its contract."
author: "Matīss Treinis"
---

The first SpecDD superpower in this series is better software design. The second is safer delivery. The third is
traceable intent, which is easy to miss because it does not always show up as cleaner code or fewer review comments
right away.

That is the superpower: SpecDD makes intent traceable.

That word can sound heavier than what I mean. I am not talking about a formal enterprise traceability program where
every requirement is linked through a toolchain nobody wants to maintain. I mean something more ordinary and more useful
for day-to-day software work: when a team writes local specs beside the code they govern, the reason a piece of software
exists becomes easier to find and carry forward.

That is a practical change, because a reviewer can compare a diff to the spec instead of reconstructing intent from
memory, and QA can ask whether each important rule has a test or a known gap. Other teams get the same benefit because
the contract is available in the repository instead of buried in a conversation.

The immediate benefit of SpecDD as a spec-driven development framework is local context, and the larger value is that
local context becomes inspectable.

## Coverage becomes semantic

Most teams talk about test coverage in numerical terms because numbers are easy to produce. A file has some percentage
of line coverage or branch coverage. Those signals can be useful, but they do not answer the question people usually
care about during review: did we test the behavior that matters?

SpecDD gives teams a different coverage surface, where instead of asking only whether a file has tests, a reviewer can
ask whether the local spec is covered. Does each required behavior have verification? Do the scenarios correspond to
tests or deliberate manual checks?

That is a more useful question than whether the implementation crossed an arbitrary coverage threshold, and it also
changes how missing tests are discussed. A reviewer no longer has to say "this feels under-tested" and then argue from
instinct. They can point to a specific spec clause and ask how it is verified. The answer may be an automated test or a
known gap that the team accepts for now, and either answer is better than not knowing whether the requirement was
considered.

This is not a replacement for coverage tools, but a missing layer above them. Coverage tools tell you which code was
exercised, while SpecDD helps tell you whether the important intent was exercised.

## Code review gets a second axis

Code review tends to mix several different kinds of judgment, from whether the code is correct to whether it matches
the architecture, and that is a lot to ask from one pass over a diff.

When a local spec exists, review gets a second axis because the reviewer is not only reviewing code as code, but also
the relationship between code and contract. Did the patch satisfy the local spec? Did it touch files outside the
declared ownership?

That does not make review automatic, but it makes part of review more concrete. It also makes disagreement less
subjective. "I do not like this abstraction" may still be true, but "this adds behavior outside the spec" is a clearer
claim. "This dependency feels wrong" becomes stronger when the spec says the module must not depend on that layer.

SpecDD does not remove taste from engineering, and it should not try to. Some judgment will always be about experience,
trade-offs, and the shape of the code. But a local contract gives reviewers a way to separate taste from violation, and
that makes review more useful for everyone involved.

## AI review can become adversarial

There is a useful pattern that becomes possible once specs are local and structured: use one agent to implement, then
ask another agent to review the diff against the applicable SpecDD chain.

The prompt can be simple.

```text
Read the applicable SpecDD specs for this change.
Compare the diff against the spec chain.
Report contract violations and missing verification.
Do not suggest unrelated improvements.
```

That is different from asking an agent to perform a generic code review, because generic AI review often gives generic
advice. It may complain about style or suggest extra abstractions without understanding the local system, while a
spec-compliance review has the sharper job of checking whether the implementation honors a contract that humans wrote or
reviewed.

This is especially useful because AI agents are often very good at finding inconsistencies when the rules are explicit;
they may miss project intent when it is hidden in history, but they can compare a diff to a nearby spec and flag places
where the implementation drifted.

The important word here is "adversarial", because the reviewing agent should not be trying to continue the
implementation or helpfully broaden scope. It should act like a contract reviewer: skeptical and bounded.

Humans still own the decision because the agent can be wrong, overly literal, or miss a subtle issue, but it gives
reviewers a cheap second pass focused on the exact place AI-generated code often fails: local intent.

## Bugs and product decisions separate earlier

Many disputes in software are not really about implementation, but about whether a behavior is supposed to happen.

The report export includes inactive users. Is that a bug? The customer sees a generic error instead of a detailed one.
Is that a bug?

Code can answer what currently happens, but it does not always answer whether the current behavior is intended.

SpecDD gives the team a better way to separate bugs from product decisions. If the behavior contradicts the spec, the
implementation is probably wrong. If the behavior matches the spec but surprises customers, product may need to change
the contract or clarify the intent.

That distinction prevents a lot of confused work. Developers do not waste time "fixing" behavior that product actually
wants. QA can file the issue with the right shape instead of treating every surprise as the same kind of defect.

It also makes changes easier to explain later. When the spec changes, the product decision is visible in the same place
future implementers will look. The code is not the only record of the decision.

## Blast radius review becomes possible

Before changing code, experienced developers often do a quick mental blast radius review. If I touch this service, what
else might break? Which neighboring modules depend on this behavior?

That review is hard when the system's intent is mostly implicit, and SpecDD makes blast radius review more practical
because specs can describe ownership and dependencies. Before
implementing a change, an agent or reviewer can inspect the applicable spec chain and ask what other specs might be
affected. The answer will not be perfect, but it is better than guessing from file names alone.

This is useful in older codebases where hidden coupling is common. A module may not import a neighboring service
directly, but it may share a business invariant. A report may not depend on a workflow implementation, but it may depend
on the same state transition.

Those relationships are hard to infer from code structure alone, which is why specs give teams a place to name them when
they matter.

The goal is not to build a perfect dependency graph by hand, but to make the important relationships visible enough that
a change does not surprise the team in the next release.

## Architectural intent becomes searchable

Searching code is useful, but searching code is not the same as searching intent.

If you search the implementation for `PII`, you may find variable names, comments, tests, logging code, or nothing at
all. If you search specs for `PII` or `retry`, you are searching the declared rules the team thought were important
enough to write down.

That difference matters because specs can make architectural intent grep-able. A security reviewer can find specs that
mention personal data or authorization. A platform engineer can find modules that must not call a vendor directly.

This is not sophisticated tooling, just text in Git, but searchable local intent is already a step up from institutional
memory, especially when the alternative is asking who remembers where a rule was discussed.

Over time, this also helps reveal inconsistency. If two specs describe similar retry behavior differently, that may be
intentional, or it may be drift. If one permission-sensitive area has clear `Must not` rules and another one does not,
the silence may deserve attention. Search makes those comparisons cheap enough to do.

## Spec debt becomes visible

Documentation drift is familiar enough that most teams have learned to ignore it until it hurts. A document is old, a
wiki page is wrong, and everyone quietly treats the code as the real source of truth.

SpecDD should not be treated that way.

Because local specs are supposed to guide implementation, drift between code and spec is not ordinary documentation
drift but spec debt. The project now has a visible mismatch between intended behavior and actual behavior, or between the
local contract and the implementation people are changing.

That mismatch is useful because it can be reviewed. If the code changed and the spec did not, was the implementation
wrong, or did the contract need to change? If the spec changed and the code did not, is the work incomplete?

This gives teams a sharper maintenance signal. Spec debt is closer to test debt or type debt than a stale wiki page
because it affects how future developers and agents will change the system. A stale local spec can mislead the next
patch. A missing local spec can leave the next patch underbriefed.

Naming that debt helps teams decide when to pay it down, where it matters, and which areas can tolerate a looser
contract for now.

## Progress gets a better shape

Status reporting in software is often strangely poor, with a ticket "in progress" and a pull request open while everyone
has a slightly different idea of what remains.

SpecDD can give progress a more meaningful shape, where a feature can move through states that describe the actual
work, such as spec reviewed and tests aligned. That is not ceremony for its own sake, but a way to distinguish activity
from progress.

This is especially useful with AI-assisted work because implementation can appear very quickly. A large diff may exist
before the team has agreed that the behavior is correct. Without a spec, the presence of code can create a false sense
that the work is far along. With a spec, the team can ask whether the implementation has satisfied the contract rather
than whether the agent produced files.

Managers do not need to inspect every clause of every spec to benefit from this. They need a delivery process where
"done" means implementation and local intent agree. SpecDD makes that state easier to see.

## Backend behavior gets a design system

Frontend teams often have visible design systems. They define components and interaction patterns. Backend and
infrastructure teams usually have fewer artifacts that play the same role for behavior.

There are architecture documents and review habits, but the local behavioral contracts are often missing. How should
modules expose behavior? Which responsibilities should a module refuse?

SpecDD can become a lightweight behavioral design system for the parts of software that do not render on a screen.

That does not mean every backend service should look identical, only that the organization gains a repeated language for
describing behavior and boundaries. A service spec or adapter spec can use a common structure while still describing a
local reality. Over time, teams start to see patterns in how their system defines responsibility and draws dependency
lines.

This is one of the reasons the format being plain matters. A design system that lives only in a specialized tool is
often hard to apply at the point of change. A local spec beside the code can be read by a developer, an agent, a QA
engineer, or a reviewer without switching contexts.

## Tooling has something to work with

Once intent exists in a regular, local, machine-readable-ish form, tooling becomes much more realistic.

You can imagine spec-test coverage reports that show which requirements map to tests. You can imagine agent preflight
checks that refuse to edit files outside declared ownership unless the user explicitly expands the scope.

Some of that can be built with simple scripts, while some of it needs better parsers, but the important point is that
the project has an artifact worth tooling around.

Tooling around ordinary prose documentation is hard because the structure is loose and the authority is unclear.
Tooling around code alone is powerful but incomplete because code often shows mechanism more clearly than intent.
SpecDD sits in the middle, structured enough to inspect and local enough to mean something.

This does not require teams to wait for future tools before getting value, because the same regularity that helps tools
also helps humans and agents today. Future tooling is leverage on top of a habit that already pays for itself when the
specs are useful.

## The point is not paperwork

Traceability has a bad reputation in software because people have seen the heavyweight version. Requirements matrices,
approval workflows, and documents that exist mainly to satisfy an audit can make traceability feel like a tax on the
work rather than part of the work.

SpecDD should not be that, because the useful version is smaller and closer to implementation. The spec describes the
part of the system it governs, while tests and review both have a local contract to refer back to. When the contract
changes, the change is visible in Git beside the code it affects.

This creates practical traceability without turning the team into document clerks, while still letting the team ask
better questions, such as which spec clause protects this test and which behavior changed.

Those questions are not theoretical. They show up in ordinary software work every week.

## The intent becomes part of the system

SpecDD starts as a way to put context near implementation. That alone is useful, especially with AI agents that need
clear local instructions instead of another long prompt. But once the specs are there, the repository changes shape.
The code is no longer the only durable artifact that describes the system.

The intent is there too, and that intent can be compared to tests or checked during review. From there, it becomes
easier to search, notice when it drifts, and build tooling around it without treating code as the only durable source of
truth.

None of that happens merely because a `.sdd` file exists. A vague, stale, decorative spec will not help much. But when
teams write useful local specs and treat them as contracts, they get more than better prompts and better patches.

They get a project where intent is less private, less temporary, and less dependent on whoever happens to remember the
last conversation.
