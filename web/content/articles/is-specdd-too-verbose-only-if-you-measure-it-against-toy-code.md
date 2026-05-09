---
title: "Is SpecDD Too Verbose? Only If You Measure It Against Toy Code"
date: 2026-05-06
description: "A practical answer to the objection that SpecDD adds too much text, explaining why the spec-to-code ratio looks worse in tiny examples and drops sharply in real systems."
excerpt: "SpecDD can look verbose when the implementation is tiny, and our own example repo has that problem because it is designed to show the mechanics clearly. In real systems, the ratio changes. A small local spec can govern a much larger body of code, tests, edge cases, boundaries, and future changes."
author: "Matīss Treinis"
---

There is a fair objection to SpecDD that should not be dismissed too quickly: sometimes it looks like a lot of text.

You open a tiny example project, see a handful of source files, then see `.sdd` files sitting beside them with purpose,
ownership, constraints, scenarios, tasks, and completion criteria. If the implementation is small enough, the specs can
look larger than the code. At that point, a reasonable developer may ask whether this is all just bureaucracy with
better branding.

I understand the reaction, partly because our own example repo suffers from exactly this problem.

The SpecDD example repository is intentionally small. It exists to make the mechanics visible: how specs sit beside
code, how local context works, how agents should read the bootstrap instructions, how implementation stays aligned with
the spec. But because the code is small, the ratio looks strange. The text that explains the rules can appear large
next to a small task app or a simple service, not because SpecDD only works at that size, but because the example is
optimized for clarity rather than realistic scale.

That distinction matters because a teaching example is not a production denominator.

## The ratio is distorted at small scale

If you write a 40-line spec for a 20-line helper function, yes, that may be silly. Sometimes the correct answer is not
to write a spec at all because the code is obvious, the behavior is local, the failure cost is low, and the next
developer or agent can infer enough from the implementation and tests without additional structure.

SpecDD is not an argument that every function deserves a contract. It is an argument that important local intent should
live where implementation happens.

Tiny examples distort this because the implementation has not yet accumulated the things that make context expensive.
There are no years of boundary decisions, awkward dependencies kept in place for business reasons, support promises,
security exceptions, migration constraints, or old edge cases that look accidental until you delete them. The example is
too small to contain the real cost SpecDD is trying to manage, so the spec looks like extra weight instead of stored
context.

In a real system, the denominator changes quickly.

A 50-line spec beside the first 80 lines of implementation may look verbose. The same 50-line spec beside a service,
repository, adapter, tests, background job, future patch history, and repeated AI sessions starts to look much more
reasonable. Beside a subsystem that changes for years, it may look tiny.

The mistake is measuring the spec only against the first patch. The better denominator is the behavior and decision
surface the spec governs over time.

## Specs do not grow linearly with code

The important thing about local specs is that they do not need to grow in direct proportion to implementation size. A
good spec does not narrate every line of code. It captures the intent, boundaries, and completion criteria that code
alone often fails to explain.

A spec can govern a much larger amount of implementation than it physically resembles.

A password reset token spec might say that tokens must be hashed, expire after 30 minutes, invalidate older unused
tokens, avoid account enumeration, and never send email directly from the token service. That is not a lot of text, but
it can govern service code, repository code, endpoint behavior, tests, security review, future refactors, and several
AI-assisted implementation sessions.

The ratio drops because the spec is not trying to mirror the implementation. It is trying to constrain the decisions
that matter.

The same pattern shows up in a good interface, a good test name, or a good architectural boundary. The artifact may be
small, but the amount of behavior it organizes can be large. You would not judge the value of a public interface by
comparing its line count to the implementation behind it, because the point is not textual parity. The point is leverage
over future change.

## Verbose about intent, not about code

The right target is not the smallest possible spec, and it is definitely not the largest possible spec. The target is a
spec that is specific where ambiguity is expensive and quiet where the code already speaks for itself.

SpecDD should be verbose about intent, not verbose about code.

That distinction is where a lot of early specs go wrong. A bad spec restates implementation details that any competent
reader could see from the file. It describes every function, repeats test assertions, or turns obvious control flow into
requirements. That kind of spec ages badly because it duplicates the code without adding much context.

A useful spec spends its words on the things the code may not reveal clearly: what this part of the system owns, which
dependencies are allowed, which shortcuts are forbidden, which behavior is intentional, which edge cases matter, what
must not regress, and what counts as done. Those are the places where AI agents, new developers, and tired reviewers
are most likely to guess wrong.

The spec earns its keep when it prevents the wrong plausible implementation.

## The cost is not only writing

When people say SpecDD is verbose, they often mean the writing cost is visible, which is true. A spec is text in the
repository, and someone has to write it, review it, and keep it aligned.

But the absence of that text is not free. The cost moves somewhere else.

It moves into prompts where the same boundary gets explained again. It moves into review comments where a senior
engineer says, for the tenth time, that this service must not call the vendor SDK directly. It moves into tests that
cover behavior but do not explain why the behavior matters. It moves into Slack threads, tickets, incident notes, and
the memory of whoever happens to know the subsystem best.

The question is not whether SpecDD adds text, because it does. The question is whether that text replaces repeated
context transfer that was already happening, badly, in more fragile places.

In small codebases, the answer may sometimes be no. In real systems with AI agents producing more patches, more often,
across more parts of the codebase, the answer changes. The cost of missing context starts showing up as review burden,
rework, architecture drift, and repeated correction. At that point, a local spec is not extra prose, but a cheaper place
to store a decision.

## The example repo is not the ratio target

This is why I am comfortable saying the example repo has a ratio problem. The specs can look large compared to the
implementation because the implementation is deliberately simple.

That does not invalidate the approach any more than a framework tutorial invalidates a framework because the example
app has more setup than business logic. Tutorials and examples often have distorted proportions because they are trying
to expose the machinery. A tiny project cannot demonstrate the compounding value of local context very well because
there is not enough context to compound.

The example repo is useful for seeing how SpecDD works, not for proving that every tiny application should have the
same spec density forever.

In production, the shape changes. Specs are usually introduced around parts of the system where context is already
expensive: service boundaries, adapters, security-sensitive flows, legacy modules, shared utilities, product behavior
that agents keep misunderstanding, and areas where review keeps catching the same wrong assumptions. Those areas tend
to have enough implementation, tests, history, and future change to make the text pay for itself.

## Balance specificity against surface area

The practical rule is simple enough: the spec should be as specific as the risk and ambiguity require.

For a trivial helper, that may mean no spec. For a small internal class, it may mean a very short class-level spec that
names one ownership rule or one `Must not`. For a service that handles money, permissions, account recovery, customer
data, or cross-team boundaries, the spec should probably be much more explicit.

Specificity is not the same as length. A single line under `Must not` can be more valuable than a page of general
guidance if it prevents the agent from crossing the wrong boundary. A scenario is worth writing when it clarifies
behavior that could otherwise be implemented in several plausible ways. A `Done when` line is worth writing when it
prevents the agent from stopping early or wandering into unrelated work.

What you do not want is a spec that grows because nobody made decisions. Long vague specs are usually worse than short
sharp specs. They create the feeling of precision without providing much authority, and agents are very good at sliding
through that kind of language.

The test I like is whether each part of the spec changes implementation or review behavior. If removing a line would
not make the agent more likely to guess wrong, the line may not belong there. If adding a line would prevent a mistake
you have already seen twice, it probably does.

## The ratio should fall as the system matures

In a healthy SpecDD adoption, the spec-to-code ratio should usually fall as the system grows. That does not mean specs
stop changing. It means they become a relatively small layer of local authority over a much larger body of code and
tests.

Early in a module's life, the spec may feel large because the implementation is still thin. As the module accumulates
behavior, integrations, tests, bug fixes, and future agent sessions, the same spec covers more work. It may gain a few
new rules or scenarios along the way, but it should not need to grow at the same rate as the code.

If it does, something is probably off. Maybe the spec is describing implementation instead of intent. Maybe one spec is
trying to cover too many concerns. Maybe the system boundary is unclear. Maybe the code itself is doing too many jobs,
and the verbosity is a symptom rather than the disease.

That is another useful side effect of SpecDD: awkward specs often reveal awkward design. If you cannot write a compact
contract for a module, it may be because the module has no compact responsibility, which is not a paperwork problem so
much as a design signal.

## Do not spec the obvious

There is a version of SpecDD adoption that would absolutely become annoying: every file gets a long spec, every method
gets a scenario, every implementation detail gets translated into prose, and every change requires more document edits
than code edits. I would not want to work that way either.

SpecDD works best when it follows the heat of development and the cost of being wrong.

Spec the places where agents keep guessing. Spec the places where humans keep explaining. Spec the places where review
keeps catching the same boundary violation. Spec behavior that is important but not obvious from the code. Spec
security-sensitive flows, vendor boundaries, product rules, ownership edges, and legacy decisions that should not be
rediscovered through pain.

Leave the obvious alone until it stops being obvious.

That is not a compromise with SpecDD. It is how the approach stays useful.

## The real comparison

The honest comparison is not spec text versus implementation text. It is spec text versus all the other places that
intent would otherwise leak.

A local spec may be 60 lines. The alternative may be three long prompts, two review threads, a Slack explanation, a
missed edge case, a follow-up patch, and another agent session next month that starts from zero. None of that shows up
as a neat line-count ratio, but it is still real work.

SpecDD makes some of that work visible and durable. That visibility can feel like verbosity at first, especially in
small examples where the hidden cost has not had time to appear. But in the systems where AI-assisted development
actually becomes hard to manage, the value is not in having more text, but in having the right local text, close to the
code, specific enough to prevent plausible mistakes, and small enough to keep current.

So yes, SpecDD can look verbose if you measure it against toy code. Our own example repo proves that. But real software
does not stay toy-sized for very long if it matters, and the ratio changes as soon as the code starts accumulating
history, boundaries, behavior, tests, and repeated agent work.

The goal is not to win a line-count contest, but to stop paying for the same missing context over and over.
