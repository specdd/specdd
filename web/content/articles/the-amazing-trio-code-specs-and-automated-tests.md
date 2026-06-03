---
title: "The Amazing Trio: Code, Specs, and Automated Tests"
date: 2026-06-03T22:38:00+02:00
seoDescription: "Why spec-driven development works best when code, local specs, and automated tests reinforce each other, with SpecDD as a practical implementation of that approach."
excerpt: "Code, specs, and automated tests each tell a different part of the truth. In spec-driven development, the useful loop is not specs replacing code or tests, but all three reinforcing each other. Code shows what the system does, specs explain what it is supposed to mean, and automated tests prove the behavior still holds."
author: "Matīss Treinis"
---

There is a habit in software development of asking which artifact should be the source of truth.

Is it the code? The tests? The ticket or architecture document? Each answer has a reasonable argument behind it, and
each one becomes weak when it has to carry the whole system alone.

Code is the thing that runs, so it obviously matters most in the strict operational sense. If the code says one thing
and the document says another, production will follow the code. But code is a poor place to preserve intent by itself.
It can tell you what currently happens, but it does not reliably tell you which behavior is intentional, which boundary
is important, or which awkward rule exists because the business depends on it.

Automated tests are closer to intent because they describe behavior the team wants to preserve, and their executable
nature makes them enormously valuable. But tests usually show selected examples of expected behavior, not the whole local
contract. A test can prove that an invoice cannot be edited after posting, while still saying little about why the
invoice became immutable or which module owns the decision.

Specs fill that missing layer. In specification-driven development, a spec gives intent a stable place before
implementation turns it into code. SpecDD is one implementation of that idea: its local specs can describe the purpose
of a part of the system, the ownership around it, the rules it must follow, and the mistakes it must avoid. It gives
humans and AI agents the intent that code and tests often imply but do not fully explain.

The useful move is not choosing one of these artifacts as the only truth, but letting code, specs, and automated tests
each do the job they are good at.

Code is the mechanism, specs are the intent, and tests are the executable evidence.

Together, they make the approach feel less like a document-first ritual and more like a working engineering loop, which
is much stronger than any one artifact alone.

## Code is necessary, but it is a narrow witness

Code has the final operational authority because it is what runs. That makes it tempting to treat code as the only
artifact that really matters, and there is a certain hard-nosed appeal to that view. Working software beats a beautiful
document every time.

But code is not the same as understanding.

A developer can read a service and see that it hashes reset tokens and returns a generic failure for invalid tokens,
which is useful but still leaves important questions open. Is the generic failure a security rule or just the easiest
error shape? Is the service allowed to send email, or is it intentionally limited to token lifecycle?

Those questions matter because future changes depend on them. A developer trying to simplify error handling may
accidentally weaken a security invariant. An AI agent asked to "finish the reset flow" may wire email delivery into the
token service because the code has enough information to make that seem plausible.

The code is not lying, but simply answering a narrower question than the one the team needs answered.

This is why relying on code alone quietly increases the cost of review. Reviewers have to infer what the code means,
not only what it does. They read the implementation, reconstruct the surrounding design, and decide whether the patch is
preserving intent or merely preserving shape.

SpecDD reduces that burden by letting the code remain code. The implementation does not have to carry every reason in
comments, naming, and structure. Some of that intent can live in a local spec where it is easier to read, review, and
change deliberately.

## Specs keep intent from leaking into memory

A useful spec sits in a different position from code. It does not run, and it should not pretend to. Its job is to
describe what a part of the system is for, what it owns, what it must do, what it must not do, and what would count as a
finished change.

That sounds modest, but it solves a problem that most teams already have. Intent leaks out of the repository. It ends up
in tickets, review comments, meeting notes, and the memory of whoever was present when the decision was made. Those
places are not useless, but they are fragile because they are not consistently available at the point of change.

SpecDD puts the intent beside the files it governs, which changes the workflow in a practical way. A developer working
in a module can read the local contract before changing it. An AI agent can resolve the relevant spec chain instead of
guessing from nearby code alone.

The important part is locality. A root architecture document may be useful background, but it is usually too broad to
guide a narrow implementation decision. A local spec can say the thing that matters here, in this folder, for this
service or adapter. That is the level where many mistakes happen, and it is the level where agents especially need
guidance.

Specs also make ambiguity visible earlier. If nobody can write the `Purpose` without adding exceptions, the design may
not be clear yet. If `Done when` is vague, the team may not actually agree on what finished means.

That does not make the spec a burden, but useful. The goal is not to produce a perfect document before code exists, but
to make enough intent explicit that code and tests can be written against the same local understanding.

{{< protip title="Spec tip" >}}
Write the spec at the boundary you expect to review. If the spec cannot name what it owns, narrow the scope before
asking anyone, human or agent, to implement it.
{{< /protip >}}

## Tests prove behavior, but not always meaning

Automated tests are one of the best tools we have because they turn expectations into executable checks. A test suite
can prevent regression, make refactoring less frightening, and give AI-generated patches a basic reality check before a
human reviewer spends time on the diff.

But tests are not complete specifications.

A test can say that a posted invoice rejects edits, but it may not say that immutability is part of the accounting
contract rather than an incidental UI rule. A test can say that an invalid reset token returns a generic error, but it
may not say that the generic error exists to avoid account enumeration.

That distinction matters because tests tend to be specific, proving selected examples through arrangements that make
sense to developers but are difficult for product, QA, or a new engineer to read as a contract. Even well-written tests
can be too deep in implementation detail to explain the broader intent cleanly.

Specs help tests become better tests because they give them a target. Instead of asking "what should we test from this
implementation?", the team can ask "which spec clauses need executable evidence?" That question changes the shape of the
test suite. It points attention toward the behavior that matters, not only the code that was easiest to exercise.

It also makes missing coverage easier to discuss without turning the conversation into a percentage argument. If a
`Must` rule has no test, perhaps the team accepts a manual check for now. If a `Must not` rule protects a security
boundary, it probably deserves stronger verification. The spec gives the conversation a concrete object.

Tests are strongest when they do not have to explain everything. They should prove the contract holds. The spec should
explain the contract.

{{< protip title="Test tip" >}}
Map tests to important behavior, not to files. If a `Must` or `Must not` rule matters, decide whether it needs automated
coverage or an explicit manual check.
{{< /protip >}}

## The loop is where the value appears

The trio works because each artifact checks the others: the spec says what should be true, the code attempts to make it
true, and the tests prove that important parts of it remain true. When one changes, the others give the team a way to
notice whether the change is legitimate.

That feedback loop is especially useful with AI-assisted development because AI agents can produce implementation
quickly enough that the old bottleneck moves. The hard part is no longer getting a first version of the code, but
keeping that version aligned with local intent and proving that it behaves correctly.

In practice, the spec-driven development loop can stay small, and with SpecDD, that usually means writing or updating
the relevant local spec, implementing the change, adding or updating the tests that prove the important behavior, and
reviewing the diff against the spec. If the code, tests, and spec disagree, the team has a useful question to answer:
which one is wrong?

Sometimes the code is wrong because it violated the contract, and sometimes the tests are wrong because they preserved
an old assumption. The point is not that the spec always wins, but that disagreement becomes visible and reviewable.

Without the spec, the disagreement often stays softer. Someone feels the test is incomplete, or the implementation
looks odd, or the behavior seems different from what product expected. With the spec, the team can point to the contract
and decide whether the contract still says the right thing.

That gives the team a better conversation.

## Review gets much less vague

Code review becomes easier when reviewers can compare the patch against both a spec and tests.

Without a spec, a reviewer often has to reconstruct intent from the ticket, the diff, and the surrounding code. Without
tests, the reviewer has to decide whether the implementation is correct by inspection alone. Either situation can work
for small changes, but both become expensive as soon as the behavior matters.

The trio gives review a better shape.

First, the reviewer can check the spec. Does the intended behavior make sense? Did the spec change because the design
changed, or because the implementation wanted permission to take a shortcut?

Then the reviewer can check the implementation and tests together. Does the code satisfy the spec without reaching
outside its authority? Do the tests prove the behavior that the spec made important?

This does not make review mechanical, but it makes review less vague. It gives reviewers a way to separate three
questions that often get mixed together: did we ask for the right thing, did we build that thing, and did we prove the
important parts still work?

That separation matters because AI-generated diffs can look polished even when they are locally wrong. The code may be
well-formatted and the tests may pass, while the implementation quietly violates a boundary the agent was never given.
Specs make that boundary visible, tests make the behavior executable, and review ties the two back to the code.

## QA gets a better starting point

QA often receives software when the implementation is already carrying most of the assumptions. That can work, but it
puts QA in a reactive position. They find the missing behavior after the code has shape, which usually means the fix is
more expensive than it would have been when the team was still discussing intent.

Specs and automated tests move some of that work earlier.

QA can read the spec before implementation is complete and ask whether the behavior is testable. They can turn important
scenarios into automated tests where that makes sense, or into manual checks when automation is unreasonable for now.
Either way, QA is reviewing intent rather than reverse-engineering it from the finished product.

This is particularly useful for negative behavior. Many important quality rules are about what must not happen. A reset
flow must not reveal whether an account exists. A report must not expose another team's data. Tests can protect those
rules, but the spec is often where the rule becomes visible enough to test deliberately.

The result is not QA owning the spec alone, and it is not developers outsourcing quality to a file. The useful model is
collaborative: product and engineering clarify intent, QA sharpens the scenarios, and tests preserve the cases the team
does not want to rediscover later.

That is a healthier loop than building first and asking QA to infer what everyone meant.

## The trio is especially good at refactoring

Refactoring is where the difference between code, specs, and tests becomes very practical.

If you only have code, refactoring depends heavily on the developer's understanding of what must remain true. If you
only have tests, refactoring is safer, but the tests may preserve incidental behavior without explaining whether it
should remain part of the contract. If you have a spec as well, the team can distinguish the behavior that must survive
from the implementation shape that is allowed to change.

That matters when AI agents are involved because agents often treat refactoring as permission to improve whatever they
can see. They may reorganize a service or broaden a helper in a way that looks cleaner but changes the meaning of the
feature.

A local spec gives the refactor a target. It says what purpose stays stable, which boundaries should remain intact, and
what behavior must still be true after the structure changes, while automated tests provide the executable guardrail.
The code is free to move inside those constraints.

That combination matters because refactoring should not be a vote between fear and taste. The team should not avoid
change because nobody remembers what matters, and it should not accept a cleaner-looking patch because the shape feels
better. The trio gives the refactor a contract and a proof path.

## When one side is missing

The value of the trio is easiest to see when one part is missing.

Code without specs or tests may work today, but every future change asks the next person to infer both intent and
correctness from implementation alone. Code with tests but no spec is better, and often much better, although tests can
still become the only readable trace of intent even when they were not written for that audience.

Code with specs but weak tests has a different failure mode because the intent may be clear, while the proof remains
manual and review-heavy. That may be acceptable for a while, especially around behavior that is hard to automate, but
the team should know where the gap is.

The point is not that every module needs all three artifacts at the same density. A tiny helper may not deserve a local
spec. A low-risk script may be fine with a small test and no broader contract. The point is that important behavior
benefits when implementation, intent, and verification are all present in a form the team can inspect.

## The practical workflow

The workflow does not have to be ceremonial. For a meaningful change, start by finding or writing the local spec. If the
intended behavior is changing, update the spec before the implementation becomes the argument. Then write the code
against that contract, and add or update automated tests for the behavior that matters most.

After that, review the three together.

If the code and spec disagree, decide whether the implementation is wrong or the contract changed. If the tests and
spec disagree, decide whether the test is preserving old behavior or the spec is missing a case. If the code and tests
agree but the spec does not, do not silently let the spec rot. Either update it deliberately or treat the patch as
incomplete.

This is a small discipline, but it changes the shape of development. The prompt does not have to carry the whole
contract, the code does not have to explain every reason, and the tests do not have to double as documentation for every
stakeholder.

Each artifact gets to do its own job.

{{< protip title="Workflow tip" >}}
For AI-assisted work, put all three in the task: read the relevant spec, implement only that change, and update the
tests that prove the changed behavior.
{{< /protip >}}

## A better source of truth

The phrase "source of truth" is still useful, but it can mislead teams into looking for one artifact to rule them all.
Real software usually needs a more layered answer.

Code is the source of truth for what runs, specs are the source of truth for what this part of the system is supposed to
mean, and automated tests are the source of truth for which important behaviors are being checked continuously.

That is the trio inside spec-driven development, not a new ceremony for its own sake, but a practical way to keep
implementation, intent, and verification close enough that they can correct each other.

For human teams, that means fewer decisions trapped in memory and fewer reviews that depend on reconstructing intent
from scratch.

For AI-assisted development, it matters even more. Agents are good at producing plausible code and increasingly good at
adding tests, but they still need local intent to avoid building the wrong thing cleanly. SpecDD gives them that intent
in a concrete file-based format, while automated tests give both the agent and the reviewer a way to see whether the
important behavior survived.

Code, specs, and automated tests are not competing answers, but the parts of one working loop.
