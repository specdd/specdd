---
title: "I Built SpecDD Because AI Kept Forgetting What We Were Building - and Between the Two of Us, We Couldn't Spec-ify a Thing"
date: 2026-04-29
description: "Discover how SpecDD was born from years of frustration with AI agents that forget, violate boundaries, and lose context. Learn why specification-driven development is the missing layer between intent and reliable implementation in AI-assisted software projects."
excerpt: "AI agents are not failing because they are not quite smart enough. They are failing because no one gave them the right context at the right time. This is the origin story of SpecDD - a specification-driven development framework built to solve exactly that problem. Small, local, human-readable specs that live beside your code, giving both humans and AI the precise context they need, exactly where they need it."
---

*A creator's account of specification-driven development, why context is the real bottleneck, and what happens when you
stop treating AI like a search engine and start treating it like a tool that can actually read the manual.*

---

There is a moment that every developer working with AI agents eventually hits. You have been building something
for a while - a billing module, a new API, a data pipeline - and then you ask the agent to implement the next logical
piece. It comes back with something that contradicts what you instructed on three sessions ago. A dependency appears
that you explicitly said was forbidden. A boundary gets crossed. A pattern gets abandoned in favor of something the
model apparently prefers from its training data. The code is often technically correct, but it is wrong for *your*
project.

I hit that moment a lot. It annoyed me greatly. And then I started thinking hard about why it kept happening.

The mainstream response to this frustration, as best I could observe it, was to reach for more. More tokens. More
retries. More elaborate prompting strategies. Entire products were built around the idea of throwing larger and larger
amounts of context at the problem and hoping the model would find the relevant signal buried somewhere inside it. The
industry collectively decided that if the thing was not working well enough, the answer was to feed it more. Claw back
context from wherever you could find it. Stuff the window. Spend the tokens. Ship the wrapper.

I found that unsatisfying in the way that only a real engineer can find a workaround unsatisfying. Not because it never
worked, but because it was treating the symptom rather than the cause, and I have never been particularly good at
leaving causes alone once I have identified one. If something is not working the way I want it to, my instinct is not to
compensate around it. My instinct is to understand it well enough to make it work properly. That is, I would argue, what
engineering actually is.

So instead of spending more tokens, I started asking a different question: what would it take to give an AI agent
exactly the right context, in exactly the right place, in a form it could actually use reliably? Not approximately
right. Not probably enough. Exactly right. And that question, pursued far enough, is what became SpecDD.

## Will AI Make Developers Obsolete? Wrong Question.

Before getting into the diagnosis, though, I want to address something I hear constantly in conversations about
AI-assisted development, because it shapes how people think about the problem and whether they believe a solution like
SpecDD is even worth pursuing.

The question is whether any of this matters in the long run, whether AI is simply going
to replace the practice of software development entirely and make frameworks like this an interesting historical
footnote.

My answer is an unambiguous no, and the reason is written into the history of every major productivity leap this
industry has ever taken.

We have been through these inflection points before. The jump from assembly to high-level languages. The shift to
object-oriented programming. The emergence of modern frameworks and package ecosystems. Each transition looked, to
someone standing at the before side of it, like it might fundamentally change who does development and whether there is
any development left to do. Try building a modern web application in legacy Pascal and you will understand viscerally
just how large those productivity gaps were. Remember the world before package managers like NPM, before mature build
systems, before any of the scaffolding we now treat as furniture?

Today you spin up a Nuxt project in seconds, complete with reactive frontend, hot reload, and a curated ecosystem of
dependencies ready to go. Think about what that same task looked like twenty years ago. Think about thirty. Each leap
was genuinely transformative. And yet none of them reduced the amount of software being built. Every single one of them
caused an explosion of new software, new categories of applications, new industries built on top of the new capability.
The demand for software did not shrink to meet the new productivity ceiling. It grew past it, almost immediately, and
then kept growing.

Now, I can already hear the objection: this time is different. This time the leap is bigger.

And I will grant you that it is louder, certainly, because the reach of AI extends well beyond software development into
almost every domain of human work simultaneously. But I remember the transition from simple code editors to
fully-featured IDEs with intelligent completion, integrated debugging, and real-time error analysis. At the time, it
felt like magic. Applications that used to take months were suddenly taking days. Some of them took hours. If you were
there for that shift, you know exactly what I mean, and you probably also remember that nobody seriously argued it would
be the end of programming as a profession. It just meant you could build more, faster, and want even more still.

The current moment feels different in magnitude. It rhymes with every previous one in pattern.

AI-assisted development is the same kind of leap, arguably the largest one yet. And I expect the same pattern to hold.
But we will not have less software development because of AI. We will have more, considerably more, because every time
the cost of building something drops, the number of things people want built goes up faster than the cost came down.
That is not a prediction. It is a description of what has already happened, repeatedly, across decades. The industry
grew because our capabilities grew, and our demands grew right alongside them, if not faster.

Our tools have changed, certainly. But they changed in exactly the same way when the open-source ecosystem matured. We
were handed hundreds of thousands of work years of collective human effort, packaged and ready for consumption across
registries like Maven, NPM, PyPi, Packagist. Development cycles that once spanned decades collapsed into months.
Sometimes weeks. Often days. The profession did not disappear, quite the contrary. The baseline simply shifted.

So no, I am not worried about development as a practice or developers as a profession. I am focused on how we do the
work well, which brings me back to the problem I kept running into.

## The Problem Was Never Entirely Intelligence

When I started experimenting with what eventually became SpecDD, my working assumption was that the models were simply
not smart enough yet. I figured this was a capability problem, a problem that more parameters and better training would
eventually eliminate. So I waited. Models got bigger. Yet I kept hitting the same wall in
slightly different ways.

Let me be clear: there is plenty left to be desired in terms of raw model capability. Anyone who tells you current AI
coding models are anywhere close to solved is either not spending enough time in the weeds with them, or lacks the
engineering experience to see the structural shortcomings and dangers. To pretend otherwise is naive. Reasoning still
breaks down in subtle ways. Long chains of logic still drift. Edge cases still get quietly ignored in favor of the happy
path. These are real limitations and they matter, and the industry is actively working on them.

But those were not the fundamental problem I kept running into. The wall I was hitting was not about intelligence at
all. It was about context.

This is not a new problem, and that realization was most clarifying. Humans have been dealing with exactly this
limitation for as long as we have been building complex software in teams. A new engineer joins a project and spends
their first weeks violating unwritten rules that every senior team member treats as obvious. A contractor implements a
feature correctly according to the ticket but totally wrong according to the architecture that nobody thought to write
down. A team spins up a new service and accidentally duplicates something that already exists because the relevant
decision was buried in a Slack thread from fourteen months ago.

I have been part of this industry professionally for close to twenty years, and considerably longer than that as a
wide-eyed enthusiast who could not stop building things. That is enough time to have watched these exact patterns play
out not once or twice but across projects, companies, and entire technology cycles. The symptoms change with the
tooling. The underlying dynamic does not.

The AI version of this problem is structurally identical, just faster and more relentless. An AI agent does not absorb
institutional knowledge through osmosis. It does not remember last week's architectural debate. It does not carry a
vague sense that *we do not do it that way around here*. It works with exactly what you give it, every single time, and
then fills the rest in with reasonable guesses drawn from billions of lines of code it has read that have nothing to do
with your project.

A smarter model making the same uninformed guess is still making the wrong guess.

Too much information, scattered across too many places, arriving too late or not at all. No human thrives under those
conditions either. Think about what onboarding actually looks like in most engineering organizations. You join a team,
you are handed access to a repository with years of accumulated decisions baked silently into the code, a wiki that was
last touched before the last major architectural pivot, and a handful of colleagues who each carry different and
partially overlapping mental models of how the system actually works.

Nobody sits you down and hands you a complete, accurate, current picture of the whole thing, because no such picture
exists in any single place. You piece it together over weeks and months, making mistakes along the way that your more
tenured colleagues find baffling because the constraints you violated seemed obvious to them. The knowledge was there.
It just was not where you could find it when you needed it.

Training has the same shape. You can put someone through onboarding sessions, walk them through architecture diagrams,
hand them documentation. But until that knowledge is grounded in the specific context of a specific task in a specific
part of the codebase, most of it does not stick in a way that changes behavior. People learn by doing, and they do best
when the relevant context is right in front of them at the moment they need it, not front-loaded in a presentation they
half-remember.

AI agents operate under a structurally identical constraint. We just expect them to be different, and at a fundamental
level, they are not.

## A Long History of Good Ideas, Partially Solved

Specification-driven development is not a novel concept. The idea of writing down what software should do before you
implement it has been around since the days of formal methods, and it has evolved through generations of practice.
Software Requirements Specifications gave us structure but produced documents so heavy they became artifacts in the
archaeological sense. Test-Driven Development gave us a feedback loop but expressed intent in a language only developers
could read. Behavior-Driven Development got closer to something humans could actually follow, with Gherkin and Cucumber
making behavior legible to product managers and QA engineers. Formal specification languages gave us mathematical
precision but demanded a level of expertise that put them out of reach for most teams.

Each of these approaches solved a real part of the problem and left other parts unsolved. What I kept running into was
that none of them addressed the specific challenge I was facing: how do you give an AI agent the right amount of the
right context, precisely where it is needed, at the moment it is working on a specific part of a large system?

The answer required borrowing from all of them and adding something new.

## The Insight That Changed Everything

The breakthrough came when I stopped thinking about documentation and started thinking about context management.

The way most projects handle documentation today is fundamentally incompatible with how AI agents reason. You have a big
`README.md`. Maybe an `ARCHITECTURE.md`. Perhaps a wiki somewhere that was last updated before the last major refactor.
When you need to give an agent context, you shove some or all of this into the prompt and hope for the best. The agent
reads it, uses what it can, and then that context evaporates the moment the session ends.

This approach fails for the same reason a massive stack trace fails to help you debug efficiently: too much information
is as bad as too little. Context that is not local to the thing you are working on is not really context at all - it is
noise. And the more noise you add, the more the signal that actually matters gets diluted.

When I was researching the space before building SpecDD, I looked carefully at every existing specification and context
framework I could find. What I discovered was that almost all of them share the same fundamental failure mode: large
collections of documentation files piled into a root folder, handed wholesale to the agent, and expected to work. A
`specs/` directory with forty markdown files in it. An `ARCHITECTURE.md` that runs to three thousand words. A
`CONTEXT.md` that tries to explain the entire system in one place. The assumption embedded in all of these approaches is
that more information at the top level means better-informed output, and that assumption is wrong in a way that is worth
understanding precisely.

Then consider the sprawling ecosystem of context management systems, specialized databases, and the accompanying
architectural bloat. It represents a tremendous amount of engineering effort applied to fundamentally sub-optimal
thinking. To be perfectly transparent, it is a trap I fell into myself a few times.

The confusion, I think, stems from conflating two very different things: training and runtime inference. During
training, a model processes enormous quantities of text across vast time horizons. Patterns emerge from that scale. The
model develops a generalized understanding of software architecture, common idioms, domain conventions, and language
semantics precisely because it has seen so much of it, synthesized across billions of examples. Size is an advantage at
training time. The more signal there is in the training corpus, the richer the learned representations become.

Runtime context windows are a completely different regime. When an agent is responding to a prompt, it is not
synthesizing patterns across billions of documents over weeks of compute. It is working within a fixed, bounded window
of tokens that must contain everything relevant to the current task, right now, in this session. That window is finite,
and every token you spend on information that is not directly relevant to the current task is a token that could have
been spent on information that is. An architecture document that explains the billing module in detail is not helpful
context when the agent is implementing a password reset endpoint. It is overhead. And as that overhead accumulates, the
precision of the agent's attention to what actually matters degrades.

This is not a flaw that will be engineered away entirely by larger context windows. Longer windows help at the margins,
but they do not change the underlying dynamic: unfocused context produces unfocused output. The right answer is not to
give an agent everything and hope it finds what it needs. The right answer is to give it exactly what it needs,
structured in a way that is immediately usable, at the location where the work is happening.

No experienced human engineer tries to hold an entire codebase in their head while fixing a bug in the invoice service.
They navigate to that part of the system, read what is immediately relevant, recall or look up the constraints that
apply, and work within that bounded space. They do not reload their entire mental model of the application for every
task. That would be inefficient and impossible.

What I realized was that AI agents need the same affordance, and we needed to build the infrastructure to provide it.

SpecDD is, at its core, a system for making context local, persistent, and structured. Instead of one massive
specification document at the root of your project, you have small `.sdd` files that live beside the code they describe.
A spec for the invoice service lives next to the invoice service. A spec for the Stripe adapter lives next to the Stripe
adapter. When an agent is working on any part of the system, it resolves exactly the relevant chain of specifications
from the root down to that location, building a precise picture of what it is allowed to do, what it must not do, what
it owns, and what constitutes being done.

The context is never too large because it is always local.

## Teaching a Language, Not Writing a Manual

One of the things that took me a moment to dial in was how much the structure of the language itself mattered, and
how much could be eliminated once a consistent structure was established.

Early versions of what became SpecDD were more prose-heavy. I was writing paragraphs describing behavior and
constraints, and I hoped agents to understand them. They did, mostly. But prose is ambiguous. Prose requires
interpretation. Prose allows an agent to decide that a constraint was probably aspirational rather than mandatory, or
that a prohibition was context-dependent in a way the original author did not intend.

The shift to a semi-formal, section-based language changed the reliability of outcomes dramatically. When a spec says
`Must not: Call Stripe directly`, there is no interpretive wiggle room. When it says `Owns: invoice.ts`, the agent knows
exactly what it is authorized to modify. When it says `Forbids: ../../api/*`, the dependency boundary is explicit and
enforceable without any reasoning about intent.

The sections of the SpecDD language - `Must`, `Must not`, `Owns`, `Depends on`, `Forbids`, `Done when` - are not
arbitrary choices. They map directly to the categories of information an agent actually needs to make correct
implementation decisions. And because the language is consistent across every spec in the project, agents learn the
grammar quickly and can operate within it without being re-instructed each time.

There is something deeper here that I find genuinely important. Once an agent understands the SpecDD language, the specs
become self-explaining. Even if some of your prompt context is lost, even if a session starts fresh with minimal
instruction, a well-written spec file carries enough semantic information that a capable agent can recover the intent
and the constraints from the file alone. The language itself provides the missing context, because the language has been
designed to encode context precisely.

This is fundamentally different from putting instructions in a CLAUDE.md file or a README. Those are instructions for
behavior. SpecDD specs are contracts for implementation, and contracts are much harder to misinterpret.

## You Can Cheat, As Long As You Check Your Work

One of the most liberating realizations I had during development was that you do not have to write the specs yourself,
at least not all of them, at least not from scratch.

An AI agent can draft SpecDD specs from a description of what you are building, or even from an existing codebase. You
can ask for a complete spec for a new billing module before any code exists. You can ask for specs to be retroactively
generated for code that predates your adoption of SpecDD. The generation works well because the format is structured and
learnable.

What you must do is review those generated specs carefully. This is not optional. A generated spec that contains a wrong
assumption will be faithfully followed in implementation, and faithfully following the wrong spec produces wrong code
with great reliability and efficiency. GIGO, so to speak. The review step is where your architectural judgment enters
the process. The generation step is where you eliminate the blank-page problem and the tedium of translating mental
models into structured text.

Think of it as maintaining offline context that persists across every session, across every agent, across every
contributor to the project. The specs become a shared source of truth that lives in the repository alongside the code,
versioned with the code, reviewed with the code, and kept in sync with the code. They serve as documentation for humans
who want to understand what a part of the system does and why. They serve as operational contracts for AI agents that
need to work within boundaries. They serve as onboarding material for engineers new to the codebase. They do all of this
simultaneously, without duplication of effort, because they were designed to occupy all of those roles at once.

## What the Numbers Actually Look Like

I want to be careful about making claims that sound like marketing copy, but I also want to be honest about what I have
actually observed. The improvements are real and they are substantial.

Working without structured specifications in an AI-assisted workflow is, in my experience, essentially a probabilistic
exercise. The agent might do exactly what you need. It might do something adjacent that requires significant correction.
It might wander into a part of the system it should not have touched and produce a cascade of changes you did not ask
for. On any given task, you are operating with meaningful uncertainty about whether the output will be acceptable
without major revision.

And if you believe you can simply prompt-engineer your way out of this uncertainty, let me save you the time: you
cannot. Unless your entire codebase fits cleanly inside a single context window, no amount of clever instruction will
bridge the gap. It is not a matter of skill; it is a structural limitation. It simply will not work.

With SpecDD in place, the success rate feels categorically different. When a spec is well-written and the task is
clearly scoped, the agent's output is almost always in the right ballpark on the first attempt. Not always perfect -
review is still essential and always will be - but correct in structure, correct in boundary respect, correct in the
choices it makes about dependencies and patterns. The failures become smaller and easier to correct.

The honest trade-off is time. Writing specs takes time. Reviewing generated specs takes time. Keeping specs in sync with
code changes is a discipline that requires attention. None of this happens for free. But the time you invest upfront in
specification is returned with interest in the form of reduced rework, fewer architectural violations, and
implementation that you can trust rather than implementation that you have to audit line by line.

Working without this kind of structure is very often a game of chance. Working with it is something closer to
systematically reliable engineering. The ROI is not subtle.

## A Format Built for Humans Too

Something that I did not fully anticipate when I started building this was how much the format would matter to people
who are not primarily developers.

The SpecDD language is deliberately readable. The sections are labeled in plain English. The behavioral scenarios borrow
from the Gherkin tradition that Cucumber popularized, which means they can be written and understood by product
managers, QA engineers, and technical leads who are not primarily coders. A `Must not` rule is comprehensible to anyone.
A `Scenario` written in Given/When/Then notation is comprehensible to almost anyone who has ever thought about software
behavior.

This turns out to be valuable in ways that go beyond AI tooling. When the spec for a feature lives next to the code for
that feature, the barrier between business intent and implementation detail collapses. A product manager can read a
feature spec and understand what the system is supposed to do. A QA engineer can derive test cases directly from the
scenarios. A new engineer can understand the purpose and constraints of a module without excavating conversation history
or reverse-engineering intent from code.

The specs are documentation that is also operational. That combination is rare and useful.

Even more practically: you do not need to be particularly technical to write a useful SpecDD spec. If you can describe
what a piece of the system should do, what it should not do, and how you will know when it is done, you can write a
meaningful spec. The rest - the implementation details, the dependency management, the technical constraints - can be
layered in by people with the appropriate expertise. This makes specification a collaborative activity rather than a
purely technical one.

## Why This Matters Beyond Today's Models

I was asked whether SpecDD will become irrelevant as AI models continue to improve. The question assumes that
context limitations are a temporary problem, a capability gap that the next generation of models will eliminate. I do
not believe this assumption is correct. Not in foreseeable future.

Context is not just a technical limitation of current architectures. It is a fundamental property of how any intelligent
system - biological or synthetic - reasons about complex problems. No human software engineer can hold an entire
enterprise codebase in their head at once. No team operates effectively without shared conventions, documented
decisions, and explicit boundaries. The engineering practices we have developed around these limitations - modularity,
encapsulation, documented interfaces, code review, architectural decision records - are not workarounds for human
limitations. They are the *solutions* to problems that are intrinsic to the complexity of software systems.

AI systems face versions of the same intrinsic problems. The scale of the context window may grow. The precision of
retrieval may improve. But the need for structured, local, persistent specification of what software should do and what
boundaries it should respect will persist, because that need is not primarily about what AI can or cannot do. It is
about what software systems require in order to be built and maintained reliably over time by any combination of human
and artificial contributors.

SpecDD is positioned in that durable space. It addresses a need that exists regardless of how the AI tooling evolves,
and it does so with a format that is light enough to adopt without disruption and structured enough to provide genuine
reliability improvements from day one.

## Where This Is Going

SpecDD is experimental today. I want to be transparent about that. The tooling is minimal by design - the format should
work with any editor, any repository, any AI coding agent that can read files. There is no validator, no parser, no
language server. This is intentional. The first priority was to prove that the approach worked reliably in real
development workflows, and it does.

The next phase is building the tooling that formalization enables: spec validation, dependency graph analysis, forbidden
import checking, task state enforcement, editor highlighting. These are tractable problems now that the language is
stable, and they represent an opportunity to make the guarantees that SpecDD provides even stronger and easier to
maintain.

But the core insight is already working: keep context local, make constraints explicit, teach a formal enough language
that AI agents can operate within it reliably, and let the specs do the work of holding the project together across
sessions, across contributors, and across time.

## The Bootstrap File Has an Expiration Date?

There is one more thing I want to say about where this is headed, and it is the part that genuinely excites me most.

Right now, SpecDD requires a bootstrap file. You place it in your project, you point your agent at it, and the bootstrap
explains the SpecDD language, the inheritance rules, the conventions, and the expected workflow. It works well, and for
most teams adopting SpecDD today it is a small and worthwhile setup cost. But it is still a setup cost, and the reason
it is necessary is simply that current models do not yet know what SpecDD is.

Modern AI models are trained continuously on data gathered from the web. The landscape of what they know reflects, with
a lag, the landscape of what exists and gets used and discussed online. As SpecDD gets adopted, as projects using it
appear in public repositories, as the `.sdd` format and the `Must`, `Must not`, `Owns` vocabulary show up in codebases
that feed into training pipelines, something interesting becomes possible: the language itself becomes part of the
model's pre-trained understanding.

At that point, the bootstrap file might become optional in any meaningful sense. A model that has internalized SpecDD as
part of its training does not need to be told what a `Must not` constraint means or how directory-based inheritance
works. It already knows, the same way it already knows what a Python decorator is or what a REST endpoint looks like.
You would drop a `.sdd` file next to your code and a capable model would simply understand it, without instruction,
without preamble, without a three-hundred-line bootstrap explaining the rules.

What remains would be thin enablers and project-specific overrides, the kind of configuration that tells a model about
your particular conventions rather than about the language itself. The heavy lifting of explanation dissolves into the
model's existing knowledge.

I expect this to happen naturally over time, as adoption grows and the format becomes visible enough in the training
corpus to leave a durable impression. And when it does, SpecDD will not be a framework you reach for and configure. It
will be a language your model already speaks. That is, frankly, a remarkable thing to be building toward.

---

I built SpecDD because I was tired of losing ground to context. Every time I found myself re-explaining the same
architectural decision to an agent that had no way to remember the last conversation, every time I watched a carefully
designed boundary get violated because nowhere was it written in a way the agent could actually use, every time a
session ended and took all its accumulated context with it - I felt the waste of it.

Specification-driven development has always been the right idea. The format was the missing piece. And now it exists.

---

*SpecDD is available at [specdd.ai](https://specdd.ai) and on GitHub. The framework is open source under the Apache
License 2.0.*
