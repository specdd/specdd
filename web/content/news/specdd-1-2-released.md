---
title: "SpecDD 1.2 has been released"
date: 2026-05-16T20:17:00+02:00
seoDescription: "SpecDD 1.2 strengthens the agent bootstrap, clarifies spec resolution and write authority, and improves benchmark results on higher-signal agent tasks."
---

SpecDD 1.2 has been released, focused on making the rules introduced in the first public release more explicit and
harder for an agent to misinterpret.

Version 1.0 was the first public release after months of experiments, rewrites, and practical testing against the same
problem from several angles: how to give AI agents local, persistent, useful context without burying them in a large
body of documentation. By the time 1.0 shipped, the core shape was already there: local `.sdd` files,
directory-based inheritance, write authority through `Owns` and `Can modify`, explicit `References`, tasks, scenarios,
and the basic idea that specs are source-adjacent contracts rather than optional documentation.

That made 1.0 the first public statement of the SpecDD model, language, and expected agent workflow.

Version 1.1 was intentionally small, making minor cosmetic changes from that first release and adding support for line
comments in specs without changing how the framework thinks.

Version 1.2 is different because it takes the early framework shape and tightens it into a more explicit operating
contract, with the bootstrap now sharper around the places where AI agents most often drift: finding the right specs,
distinguishing context from permission, and knowing when to stop and ask instead of guessing.

That matters because agents fail not only when a rule is missing, but also when a rule is present but leaves enough
room for the model to fill in the blank with its own idea of what a reasonable developer would do.

The biggest visible change is the new execution contract:

```text
Resolve -> Read -> Authorize -> Change -> Verify -> Report
```

That sequence matters because most bad agent output does not start with bad code but earlier, when the agent skips
directly from a vague task to an edit. SpecDD 1.2 makes the pre-edit work explicit: resolve the target, read the
applicable bootstrap and spec chain, authorize the change from the nearest relevant spec, then edit, verify, and report
what happened.

The release also makes path-based resolution more precise by making same-directory basename matching an explicit rule,
not a convention the agent is expected to infer. A target like `invoice.ts` can be governed by `invoice.sdd` in the same
directory, and that relationship is part of spec resolution, while similar names elsewhere do not create authority by
themselves and nearby files remain useful context rather than permission.

Write authority got sharper for the same reason, with `References` now given a clearer role as horizontal context rather
than write access. A referenced spec may explain another contract, but it does not automatically grant permission to
edit
that other area, which is exactly the kind of distinction that humans often carry in their heads and agents quietly get
wrong unless it is written down.

There are also more rationale notes and better minimal and complete examples, which may sound cosmetic but is not.
Examples teach the language, while rationale helps an agent handle edge cases without treating every rule as an isolated
sentence. The goal is not to make the bootstrap longer for its own sake, but to make the contract sturdier at the points
where ambiguity is expensive.

These changes were tested against the internal benchmark suite that has been guiding the framework's development. On the
two higher-signal cases covering ambiguous authority and a larger workflow, the combined Codex plus Claude score went
from 86.36% to 90.91%, while Claude Sonnet moved from 85.71% to 94.81%. I treat numbers like this carefully, because
benchmarks are only useful when they point back to real failure modes, and in this case they helped identify where the
bootstrap needed to become more explicit.

The next releases will continue in the same direction, alongside work on a publication-ready test and benchmark suite
that can support further evaluation, validation, and evolution of the framework.
