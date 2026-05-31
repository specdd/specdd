---
title: SpecDD Framework Changelog
---

## [1.4] - 2026-05-31

### Added

- Added stronger guidance that specs describe durable subjects and outcomes, not tickets, prompts, migration notes,
  adoption plans, or task contracts.
- Added rules to keep negative requirements local and plausible, avoiding unrelated `Must not` lists and obvious
  non-goals.
- Added directory-spec guidance: directory specs describe local structure and immediate child roles, while substantial
  child behavior belongs in nearer same-basename specs.
- Added root spec naming rules: the root `.sdd` file must live at the selected content root and match that root
  directory basename.
- Added directory-level spec resolution, including parent-held and local directory specs, case-insensitive basename
  matching, and ambiguity handling.
- Added an agent-facing `.sdd` syntax checklist for section labels, inline values, indentation, task markers, explicit
  paths, key-value lines, and comments.
- Added guidance for symbol references, inline code spans, explicit path preferences, and content-root path usage.
- Added tool context discovery rules for exact path resolution, directory links, recursive glob expansion,
  deduplication, and context inclusion reasons.

### Changed

- Changed references language from “horizontal references” to explicit context references that may point anywhere
  resolvable by explicit path or symbol.
- Changed `Purpose`, `Must`, `Must not`, `Forbids`, `Tasks`, `Platform`, `Structure`, `References`, and `Exposes`
  descriptions to emphasize outcomes, boundaries, dependency direction, and subject ownership.
- Changed recommended section order so `Done when` appears before `Scenario` and `Example`.
- Changed task guidance from implementation-only wording to broader work/change wording.
- Changed malformed glob guidance: malformed glob patterns are valid text, not `.sdd` syntax errors.
- Changed examples from billing/invoice examples to the Travel Planner/Itinerary example set consistently across the
  bootstrap.
- Changed common spec role guidance to remove `app.sdd` as the root default and add workflow, operation, interface,
  dataset, schema, and runbook examples.

### Fixed

- Clarified that `References` are read context only and never grant write authority.
- Clarified that parent/facade `Exposes` entries may include child-owned surfaces only when the parent deliberately
  presents, routes, aggregates, or proxies that surface.
- Clarified that broad prohibitions belong in the nearest shared parent or policy spec instead of being repeated in
  every child.
- Clarified compactness rules to discourage duplicate inverted requirements, task-shaped `Purpose` or `Must` entries,
  far-field exclusions, deep inventory in parent specs, and platform labels mixed with subject roles.

## [1.3] - 2026-05-19

### Changed

- Formalize the SpecDD language rules in the bootstrap, making `.sdd` syntax, section bodies, continuation lines,
  tasks, comments, inline code, paths, and `@` references explicit.

## [1.2] - 2026-05-16

### Changed

- Improve agent bootstrap instructions for resolving relevant specs before editing.
- Strengthen write authority guidance so agents better distinguish context from permission to modify files.
- Expand minimal and complete spec examples to make valid SpecDD usage easier to infer.
- Improve internal benchmark performance on the two higher-signal cases covering ambiguous authority and a larger
  workflow: combined Codex plus Claude score increased from 86.36% to 90.91%, and Claude Sonnet score increased from
  85.71% to 94.81%.

### Added

- Add a more structured embedded agent contract while preserving the Markdown bootstrap format.
- Add rationale notes for important rules so agents can handle edge cases and competing instructions more reliably.

### Fixed

- Clarify same-directory basename matching, directory-based inheritance, and explicit horizontal references.

## [1.1] - 2026-05-14

### Changed

- Make minor cosmetic changes from the original release.

### Added

- Add support for line comments in specs.

## [1.0] - 2026-04-26

_Initial experimental release._
