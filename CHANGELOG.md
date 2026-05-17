---
title: Framework changelog
---

## 1.2 - 2026-05-16

- Improved agent bootstrap instructions for resolving relevant specs before editing.
- Clarified same-directory basename matching, directory-based inheritance, and explicit horizontal references.
- Strengthened write authority guidance so agents better distinguish context from permission to modify files.
- Added a more structured embedded agent contract while preserving the Markdown bootstrap format.
- Added rationale notes for important rules so agents can handle edge cases and competing instructions more reliably.
- Expanded examples for minimal and complete specs to make valid SpecDD usage easier to infer.
- Improved internal benchmark performance on the two higher-signal cases covering ambiguous authority and a larger
  workflow: combined Codex plus Claude score increased from 86.36% to 90.91%, and Claude Sonnet score increased from
  85.71% to 94.81%.

## 1.1 - 2026-05-14

- Minor cosmetic changes from the original release.
- Support for line comments in specs.

## 1.0 - 2026-04-26

- Initial experimental release.
