# SpecDD Language Specification

This document defines the `.sdd` file format used by SpecDD specifications.

It describes syntax, format, implementation guidance, and notes for tools that
parse, validate, index, highlight, or otherwise interpret `.sdd` files. It does
not define agent behavior or project adoption guidance.

The terms MUST, MUST NOT, SHOULD, SHOULD NOT, and MAY are used in their usual
normative sense.

## Formal Language Specification

This part defines the normative `.sdd` language: valid files, line structure,
sections, body syntax, inline syntax, and semantic text extraction.

### File Type

A SpecDD file:

- Uses the `.sdd` file extension.
- Is plain text.
- SHOULD be encoded as UTF-8.
- MAY use LF, CRLF, or CR line endings.
- Is line-oriented.

### Whitespace And Indentation

A blank line is an empty line or a line containing only whitespace.

Indentation is leading whitespace before the first non-whitespace character.

Indentation rules:

- Non-comment indentation MUST use spaces only.
- Tabs in non-comment indentation are invalid.
- Non-comment indentation width MUST be a multiple of 2 spaces.
- Section headers MUST start at column 0.
- Body entry lines use exactly 2 spaces of indentation.
- Continuation lines use 4 or more spaces of indentation, in multiples of 2.
- Comment lines MAY be preceded by any whitespace. Comment indentation is
  ignored.

Continuation lines are continuation text for the preceding body entry in the
same section. A continuation line without a preceding body entry in the current
section is invalid.

Formatters SHOULD emit body entry indentation as 2 spaces and continuation
indentation as 4 spaces unless preserving author formatting.

### Comments

A comment line is any line whose first non-whitespace character is `#`.

```sdd
# root comment
  # section comment
      # deeply indented comment
```

Comments:

- Are ignored as spec content.
- Do not create requirements, constraints, tasks, references, or write
  authority.
- MAY appear before, between, and inside sections.

Inline trailing comments are not recognized. Text after other syntax is
ordinary line content.

```sdd
Must:
  Validate input. # This is body text, not a comment.
```

### Line Model

A `.sdd` file is a sequence of lines. Each line is one of:

- blank line
- comment line
- section header
- body entry line
- continuation line
- invalid text

Line classification tracks the current section established by the most recent
recognized section header.

For each nonblank line, classification uses this precedence:

1. Comment line
2. Known section header
3. Continuation line
4. Task line
5. Scenario step line
6. Key-value line
7. Text line

Comments therefore take precedence over section syntax, task markers, scenario
steps, key-value syntax, paths, symbols, and ordinary text.

Task-line classification applies only inside the `Tasks` section.

A body entry in the `Tasks` section that begins with `[` at the first
non-whitespace position is classified as a task-like line before it may be
classified as text. If the bracketed marker is not one of the supported task
markers, it is an invalid task state.

### Sections

A section begins with a known section header.

A section header has this shape:

```text
KnownSectionLabel ":" [ 1*SPACE inline-value ]
```

Rules:

- Section labels are case-sensitive.
- Section headers MUST start at column 0.
- The colon MUST immediately follow the section label.
- Whitespace before the colon is invalid.
- If an inline value is present, it MUST be separated from the colon by at least
  one space.
- Unknown section labels are invalid in strict validation.

Valid:

```sdd
Spec: Itinerary
Scenario: missing place name
Purpose:
```

Invalid:

```sdd
Spec : Itinerary
Spec:Itinerary
Purpose: inline text is not allowed here
```

Canonical section labels are:

```text
Spec
Platform
Purpose
Structure
Owns
Can modify
Can read
References
Must
Must not
Forbids
Depends on
Exposes
Accepts
Returns
Raises
Handles
Tasks
Done when
Scenario
Example
```

### Inline Values

Only these sections may have inline values:

- `Spec`
- `Platform`
- `Scenario`
- `Example`

Inline value rules:

- `Spec` MUST have a nonempty inline value.
- `Platform`, when present, MUST have a nonempty inline value.
- `Scenario` MUST have a nonempty inline value.
- `Example` MAY have an inline value.
- Sections other than `Spec`, `Platform`, `Scenario`, and `Example` MUST NOT
  contain inline text after `:`.
- Empty or whitespace-only required inline values are invalid.

Examples:

```sdd
Spec: Itinerary
Platform: JavaScript/ES6
Scenario: missing place name
Example: missing trip date
Example:
```

### Bodyless Sections

The following sections are bodyless:

- `Spec`
- `Platform`

Bodyless sections:

- MUST express their content as inline values.
- MUST NOT have body entry lines or continuation lines.
- MAY be followed by blank lines or comments.

Valid:

```sdd
Spec: Itinerary
Platform: JavaScript/ES6
```

Invalid:

```sdd
Platform:
  JavaScript
```

### Repeatability

Non-repeatable sections:

- All known sections except `Scenario` and `Example`.

Repeatable sections:

- `Scenario`
- `Example`

Rules:

- Duplicate non-repeatable sections are invalid.
- `Scenario` sections MAY repeat only when each repeated section has a distinct
  trimmed inline value.
- A repeated `Scenario` with the same trimmed inline value as an earlier
  `Scenario` is invalid on the later section.
- `Example` sections MAY repeat with or without inline titles.

### Section Order

The first section in a complete `.sdd` file MUST be `Spec`.

Only blank lines and comments may appear before the first section. Nonblank
non-comment text outside a section is invalid.

The recommended section order is:

```text
Spec
Platform
Purpose
Structure
Owns
Can modify
Can read
References
Must
Must not
Forbids
Depends on
Exposes
Accepts
Returns
Raises
Handles
Tasks
Done when
Scenario
Example
```

Tools SHOULD preserve source order unless explicitly formatting a file.

### Body Lines

A body entry line is a non-comment, non-section line under the current section
with exactly 2 spaces of indentation.

A continuation line is a non-comment, non-section line under the current section
with 4 or more spaces of indentation, in multiples of 2.

Continuation indentation is formatting only. When a body entry and its
continuation lines are extracted as semantic text, parsers MUST normalize them
into a single text value:

- Remove the body entry indentation from the first line.
- Remove the full continuation indentation from each continuation line.
- Trim leading and trailing whitespace from each extracted line segment.
- Drop empty continuation segments.
- Join remaining segments with a single ASCII space.

Example:

```sdd
Must:
  Validate itinerary input before saving
    and before updating trip days.
```

Extracted `Must` text:

```text
Validate itinerary input before saving and before updating trip days.
```

Accepted body entry kinds depend on the current section.

Bodyless sections:

- `Spec`: no body entries.
- `Platform`: no body entries.

Task-only sections:

- `Tasks`: task lines only.
- Continuation lines may follow task lines.

Default body-capable sections:

- All known sections except `Spec`, `Platform`, and `Tasks`.

Default body-capable sections accept:

- text lines
- scenario step lines
- key-value lines

Except where a section explicitly narrows its body rules, body-capable sections
are mixed-entry sections. A mixed-entry section may contain prose text,
explicit paths, globs, symbols, references, scenario step lines, and key-value
lines in the same section.

Blank lines and comments are accepted anywhere.

### Inline Code Spans And Symbol References

Inline code spans are inline text spans delimited by single backticks.

Only balanced single-line backtick pairs form inline code spans. Inline code
spans do not cross LF, CRLF, or CR line endings.

```sdd
Must:
  Use `TripStorage` and `./src/trips/itinerary.js`.
```

Inline code spans are code text. They do not change the section structure, body
line kind, or validity of the surrounding line.

Symbol references use `@`.

A symbol reference:

- Starts with `@`.
- May appear at line start, after whitespace, or after opening punctuation.
- The first symbol character after `@` MUST be an ASCII letter or `_`.
- Subsequent symbol characters MAY be ASCII letters, digits, `_`, `.`, `:`,
  `#`, `\`, `/`, `?`, or `!`.
- Ends at the first character not allowed by the symbol character set.
- Is recognized in body entry lines, continuation lines, and inline code spans.

If the captured symbol text ends with `.`, and the next source character after
the captured symbol text is whitespace, end of line, or closing punctuation, the
final `.` is sentence punctuation and is excluded from the resolved symbol text.

Opening punctuation before `@` includes:

```text
(
[
{
<
"
'
```

Examples:

```sdd
Depends on:
  @TripStorage
  @TravelPlanner.DestinationSearch

Must:
  Call @Itinerary.addPlace before returning.
  See (@Itinerary.addPlace).
  Use `@dataclass` as a symbol reference inside code text.
  Treat `Itinerary.addPlace` as code text, not a symbol reference.
  Use \@decorator as literal text.
```

In the first `Must` line above, the symbol reference is
`@Itinerary.addPlace`; the final sentence period is not part of the
reference.

Because symbol references use an explicit `@` prefix, plain text such as
`Itinerary.addPlace` is not a symbol reference.

`\@` escapes a literal `@` and MUST NOT be recognized as a symbol reference.

Tools MUST NOT recognize `@` inside a larger non-whitespace token as a symbol
reference unless the immediately preceding character is allowed opening
punctuation. This prevents ordinary text such as email addresses from being
treated as symbol references while still allowing forms like `(@Symbol)`.
Embedded `@` text is ignored rather than reported as invalid syntax.

Inline code spans, escaped `@` sequences, and symbol references may appear
inside text body entries, task text, scenario step text, key-value values, and
continuation lines.

Fenced code blocks are not supported as special `.sdd` syntax. Fence markers are
ordinary body text when they appear in a body-capable section.

### Path Syntax

Path-like values may appear in any body-capable section.

Explicit path prefixes:

- `./`
- `../`
- `/`

Prefix meaning:

- `./` denotes a path relative to the directory containing the current `.sdd`
  file.
- `../` denotes a path relative to the directory containing the current `.sdd`
  file.
- `/` denotes a path relative to the selected content root.

Unsupported path prefix:

- `~/`

Unprefixed prose, filenames, dependency names, class names, service names,
symbols, and ordinary text are allowed, but they are not explicit path
references.

Example:

```sdd
Structure:
  ./src/trips: trip planning sources
  Generated files are not committed.
Owns:
  /README.md
  ./fixtures/*.sdd
Depends on:
  TripStorage
```

In the example above, `TripStorage` is dependency text, not a path reference.

### Glob Syntax

Glob path candidates are path candidates containing one or more glob
metacharacters.

Glob metacharacters:

```text
*
?
[
]
{
}
```

Supported glob constructs:

```text
*       zero or more characters within one path segment
?       exactly one character within one path segment
[abc]   character class
{a,b}   alternatives
**      zero or more characters across directory boundaries
**/     zero or more directories
```

Rules:

- `./` and `../` glob patterns are relative to the current `.sdd` file
  directory.
- `/` glob patterns are relative to the selected content root.
- Malformed glob patterns are valid `.sdd` text and are warning-level unresolved
  glob issues.

### Key-Value Lines

A key-value line has the form:

```text
key ": " value
```

Recognition rules:

- Key-value recognition uses the first `:` that qualifies as a separator.
- The separator `:` MUST have a nonempty key before it.
- The character before `:` MUST NOT be whitespace.
- The character after `:` MUST be a literal space.
- The key MAY contain any valid text except that it MUST NOT be empty and MUST
  NOT end in whitespace.
- The value MAY contain any valid text.
- The value MAY be empty after the required post-colon space.
- Key case is not meaningful to the language.

Examples:

```sdd
Structure:
  ./src: implementation sources
  glob path: generated/*.json
  Output/Delta Path!: generated/delta.json
  key:
```

In the last example, `key:` is text rather than a key-value line because there
is no space after `:`.

Invalid key-value forms are classified as text and may then be rejected by the
current section's body rules.

### Mixed-Entry Sections

Most body-capable sections are mixed-entry sections. They may contain any
combination of ordinary prose, explicit paths, globs, symbols, references,
scenario step lines, and key-value lines.

Common mixed-entry body forms:

```text
text
path-or-glob
path-or-glob: text
symbol-or-reference
symbol-or-reference: text
```

Section names give the entries their semantic role. They do not make the body
path-only, reference-only, or symbol-only unless that section explicitly says
so.

### Identity Sections

#### Spec

`Spec` names the subject being specified.

Canonical form:

```sdd
Spec: Itinerary
```

`Spec` is required for a complete `.sdd` file. It MUST be the first
section, MUST have a nonempty inline value, and MUST NOT have body lines.

#### Platform

`Platform` describes the implementation language, runtime, platform, framework,
or environment when useful.

Canonical form:

```sdd
Platform: JavaScript/ES6
```

`Platform` is optional. When present, it MUST have a nonempty inline value and
MUST NOT have body lines.

#### Purpose

`Purpose` states why the specified unit exists.

Canonical form:

```sdd
Purpose:
  Keep a trip itinerary organized by day.
```

`Purpose` is a body-capable block section and MUST NOT have an inline value.

### Scope Sections

#### Structure

`Structure` describes files and directories in the current or descendant scope.

Common body entry forms:

```text
path-or-glob
path-or-glob: description
text
```

Example:

```sdd
Structure:
  ./src: Source code
  ./tests: Test suite
  ./docs
  Generated files are not committed.
```

#### Owns

`Owns` lists files, directories, symbols, concepts, or responsibilities owned by
the spec. It is a mixed-entry section.

Example:

```sdd
Owns:
  ./itinerary.js
  ./itinerary.test.js
  Itinerary
  Itinerary behavior for trip planning.
```

#### Can modify

`Can modify` lists files or paths that may be changed when working under the
spec. It is a mixed-entry section.

Example:

```sdd
Can modify:
  ./itinerary.js
  ./itinerary.test.js
  ./fixtures/*
  Generated fixtures for itinerary tests.
```

#### Can read

`Can read` lists files, paths, specs, or prose context that may be read for
context. It is a mixed-entry section.

Example:

```sdd
Can read:
  ../storage/*
  ../destinations/*
  Review trip storage contracts before editing.
```

#### References

`References` lists explicit references to other specs, contracts, or context.
It is a mixed-entry section.

Example:

```sdd
References:
  ../storage/trip-storage.sdd
  ../destinations/destination-search.sdd
  @TripStorage
```

Reference paths SHOULD use explicit path prefixes. See "Path Syntax" and
"Glob Syntax".

### Requirement Sections

Requirement sections are mixed-entry sections. Their entries are normally prose
requirements, but explicit paths, symbols, references, scenario step lines, and
key-value lines are valid unless a project rule narrows them.

#### Must

`Must` lists positive requirements.

Example:

```sdd
Must:
  Reject itinerary items without a place name.
  Save itinerary changes after adding a place.
```

#### Must not

`Must not` lists forbidden behavior, non-goals, and boundaries.

Example:

```sdd
Must not:
  Purchase bookings or tickets.
  Change destination search behavior.
```

#### Forbids

`Forbids` lists forbidden dependencies, paths, modules, libraries, or
architectural access. It is a mixed-entry section.

Example:

```sdd
Forbids:
  ../booking/*
  ../destinations/editor/*
  Direct booking API access from itinerary behavior.
```

### Contract Sections

Contract sections describe interfaces, dependencies, results, errors, and
handled cases. Each contract section is a mixed-entry section and accepts normal
body entry kinds.

Values in these sections are free-form text. Tools MAY add project-specific
interpretation.

#### Depends on

`Depends on` lists dependencies, collaborators, contracts, symbols, paths, or
required context.

```sdd
Depends on:
  TripStorage
  DestinationSearch
  @ItineraryLogger
```

#### Exposes

`Exposes` lists public entry points, exported symbols, APIs, contracts, or
observable capabilities.

```sdd
Exposes:
  Itinerary.addPlace(input)
  @ItineraryUpdateResult
```

#### Accepts

`Accepts` lists accepted inputs, input types, request shapes, parameters, or
preconditions.

```sdd
Accepts:
  AddItineraryPlaceInput
```

#### Returns

`Returns` lists return values, output types, response shapes, or result states.

```sdd
Returns:
  ItineraryUpdateResult
```

#### Raises

`Raises` lists errors, exceptions, rejected states, or failure conditions.

```sdd
Raises:
  ItineraryPlaceRequired
  ItinerarySaveFailed
```

#### Handles

`Handles` lists cases, events, states, branches, or conditions handled by the
spec.

```sdd
Handles:
  missing place name
  missing trip date
  save failure
```

### Tasks

`Tasks` is a local implementation checklist.

The `Tasks` section accepts task lines only. Non-task body entry lines in
`Tasks` are invalid.

A task line starts with a supported task marker after exactly 2 spaces of
indentation.

Task lines are valid only inside the `Tasks` section. In other sections, text
that looks like a task marker is ordinary text unless another rule rejects it.

Supported task markers:

```text
[ ] open
[x] done
[X] done
[-] skipped
[!] blocked
[?] needs decision
```

Examples:

```sdd
Tasks:
  [ ] Write the parser.
  [x] #12 Add tests.
  [X] #13 Update docs.
  [?] #7 Decide fixture policy.
```

Unsupported bracketed task states inside `Tasks` are invalid task states.

Task id rules:

- A task id is optional.
- A task id appears after the marker and following whitespace.
- A task id starts with `#`.
- `#` MUST be followed by one or more digits.
- Empty hash ids such as `# blocked` are not task ids.
- A task id after a task marker is not a comment.

Task text is free-form text after the marker and optional task id.

Continuation lines may follow task lines. When a continuation follows a task
line, it is part of that task's text and uses the normal continuation text
normalization rules.

### Scenarios

`Scenario` defines a behavioral example in a Gherkin-like form.

Canonical header form:

```text
Scenario: scenario name
```

`Scenario` MUST have a nonempty inline title.

Scenario step lines start after exactly 2 spaces of indentation with one of:

```text
Given
When
Then
And
But
```

The keyword MUST be followed by end of line or whitespace.

Example:

```sdd
Scenario: missing place name
  Given the place name is empty
  When the person adds a place
  Then validation fails
  And no itinerary item is stored
```

Words that merely start with a scenario keyword are not scenario steps:

```sdd
Scenario: plain text line
  Andorra is plain text.
```

The language does not enforce that scenario bodies contain `Given`, `When`, or
`Then`, and it does not enforce step ordering.

### Examples

`Example` provides concrete examples, payloads, usage snippets, or expected
transformations.

Both forms are valid:

```sdd
Example:
  input place name: Louvre Museum
  input trip date: 2026-06-12
  result itinerary status: updated
```

```sdd
Example: missing trip date
  input place name: Louvre Museum
  result error: missing trip date
```

Example body entries are normal mixed-entry body entries.

Multiple `Example` sections MAY appear in one file.

### Done When

`Done when` lists completion criteria. It is a mixed-entry section and MUST NOT
have an inline value.

Example:

```sdd
Done when:
  All scenarios have tests.
  No forbidden dependencies are imported.
  Public contract is preserved.
```

### Basename Matching

Same-directory basename matching is part of SpecDD resolution, but its syntax is
only a file naming convention.

When a source file and a spec file share the same basename in the same
directory, the `.sdd` file is the local spec for that source file.

Examples:

```text
itinerary.js    -> itinerary.sdd
main.test.js    -> main.test.sdd
Dockerfile      -> Dockerfile.sdd
bootstrap.md    -> bootstrap.sdd
```

This rule does not create additional syntax inside the `.sdd` file.

### Minimal Complete File

A minimal complete `.sdd` file contains a `Spec` section.

```sdd
Spec: Itinerary
```

A useful minimal spec usually also contains `Purpose`:

```sdd
Spec: Itinerary

Purpose:
  Keep a trip itinerary organized by day.
```

Other sections are optional and should be included only when they add useful
local information.

## Implementation Guidelines

This part is for parsers, validators, IDEs, editors, highlighters, and related
tools. It is implementation guidance unless it explicitly restates a normative
rule from the formal language specification.

### Informal Grammar For Implementers

This grammar is informative rather than a complete parser contract.

When tokenizing `text`, implementations should recognize `inline-code-span`,
`escaped-at`, and `symbol-reference` before falling back to `character`.
Implementations that extract references MAY tokenize `code-text` recursively for
paths and symbol references.

```ebnf
document             = { blank-line | comment } { section } ;

newline              = "\n" | "\r\n" | "\r" ;
blank-line           = { whitespace } newline ;
whitespace           = " " | "\t" ;
comment              = { whitespace } "#" [ text ] newline ;

section              = section-header { blank-line | comment | body-entry | continuation } ;
section-header       = section-name ":" [ inline-tail ] newline ;
inline-tail          = inline-separator text ;
inline-separator     = " " { " " } ;

section-name         = "Spec"
                     | "Platform"
                     | "Purpose"
                     | "Structure"
                     | "Owns"
                     | "Can modify"
                     | "Can read"
                     | "References"
                     | "Must"
                     | "Must not"
                     | "Forbids"
                     | "Depends on"
                     | "Exposes"
                     | "Accepts"
                     | "Returns"
                     | "Raises"
                     | "Handles"
                     | "Tasks"
                     | "Done when"
                     | "Scenario"
                     | "Example" ;

body-entry           = body-indent body-content newline ;
body-indent          = "  " ;

continuation         = continuation-indent text newline ;
continuation-indent  = body-indent body-indent { body-indent } ;

body-content         = tasks-body-content
                     | default-body-content ;
tasks-body-content   = task-content ;
default-body-content = scenario-step-content
                     | key-value-content
                     | text ;

; tasks-body-content is valid only in the Tasks section.
; default-body-content is valid only outside the Tasks section.

text                 = { inline-code-span | escaped-at | symbol-reference | character } ;
task-text            = text ;
value                = text ;

inline-code-span     = "`" code-text "`" ;
escaped-at           = backslash "@" ;
backslash            = U+005C ;
symbol-reference     = symbol-boundary "@" symbol-start { symbol-char } ;
symbol-boundary      = line-start | whitespace | opening-punctuation ;
opening-punctuation  = "(" | "[" | "{" | "<" | "\"" | "'" ;
closing-punctuation  = ")" | "]" | "}" | ">" | "\"" | "'" ;
symbol-start         = ascii-letter | "_" ;
symbol-char          = ascii-letter
                     | digit
                     | "_"
                     | "."
                     | ":"
                     | "#"
                     | backslash
                     | "/"
                     | "?"
                     | "!" ;

; If captured symbol text ends with "." and the next source character after the
; captured symbol text is whitespace, line-end, or closing-punctuation, the
; final "." is sentence punctuation and is not part of the resolved symbol text.

task-content         = task-marker [ " " task-id ] " " task-text ;
task-marker          = "[ ]" | "[x]" | "[X]" | "[-]" | "[!]" | "[?]" ;
task-id              = "#" digit { digit } ;

scenario-step-content = scenario-keyword [ whitespace text ] ;
scenario-keyword     = "Given" | "When" | "Then" | "And" | "But" ;

key-value-content    = key ": " value ;
```

### Content Root Selection

A content root is the highest relevant directory that a tool treats as the
boundary of one SpecDD-aware project.

The content root is not `.sdd` syntax. It is implementation context used for
features that need a project boundary, including:

- resolving `/` paths
- constraining resolved paths to the project
- indexing `.sdd` files
- deciding the search space for related specs and references

In implementation guidance, "project root" means the selected content root for
the `.sdd` file being processed.

Content root selection SHOULD prefer explicit configuration when available. If
no explicit configuration exists, tools SHOULD choose the highest project or
workspace root that reasonably contains the relevant SpecDD files.

Common content root choices:

- A single-repository project usually uses the repository root.
- A monorepo usually uses the monorepo root when specs may refer across packages,
  apps, or modules.
- An IDE workspace usually uses the workspace or project root.
- A Java, Maven, or Gradle multi-module project usually uses the repository or
  project root that contains the modules, not each module root.

Module roots, package roots, source roots such as `src/main/java`, test roots,
generated-output directories, and individual feature directories SHOULD NOT be
chosen as content roots unless they are explicitly configured as independent
SpecDD projects.

Multiple independent content roots MAY exist in one editor workspace. When
candidate roots are nested, tools SHOULD prefer explicit configuration; without
explicit configuration, they SHOULD choose the outer root when SpecDD references
are expected to cross the inner boundary, and the inner root only when it is
opened or configured as an independent project.

Tools SHOULD make the selected content root visible or inspectable and SHOULD
allow projects to override it.

### Directory Context And Target Resolution Guidance

Tools that resolve nearby specs SHOULD classify a requested target as one of:

- a directory
- a `.sdd` spec file
- an ordinary file

Targets SHOULD exist before related-spec resolution begins. A `.sdd` target is
itself the target spec. An ordinary file target may have a same-directory
same-basename `.sdd` spec. Same-basename matching is case-insensitive, but an
exact filename match is preferred when present. If multiple case-insensitive
matches exist and no exact match exists, tools SHOULD report ambiguity. If no
same-basename spec exists for an ordinary file, tools SHOULD continue resolving
upward directory context from the file's containing directory.

Directory-level specs are specs whose basename matches the directory they
govern. Matching is case-insensitive, but exact basename matches are preferred.
If multiple case-insensitive matches exist for the same placement and no exact
match exists, tools SHOULD report ambiguity.

For a directory path, two directory-level spec placements are recognized:

- local: a spec inside the governed directory with the same basename as that
  directory, such as `src/trips/trips.sdd` for `src/trips/`
- parent-held: a spec in the parent directory with the same basename as the
  governed child directory, such as `src/trips.sdd` for `src/trips/`

Parent-held specs SHOULD be considered only when the governed child path exists
as a directory. Parent-held and local specs for the same directory are
cumulative context, not ambiguity. When both exist, tools SHOULD order
parent-held context before local context for that directory.

The same basename rule applies at the selected content root. A content root
whose basename is `travel-planner` uses `travel-planner.sdd` as its root
directory context spec. This is a convention, not new `.sdd` syntax.

Related-spec tools SHOULD resolve vertical directory context from the content
root down to the target directory, using the directory-level rules above. A tool
that scans a directory target may also include specs recursively under that
target according to that tool's command semantics.

### Reference Extraction And Resolution Guidance

Tools that extract references SHOULD treat only explicit syntax as references.

Path-bearing sections:

- `Structure`
- `Owns`
- `Can modify`
- `Can read`
- `References`
- `Depends on`
- `Forbids`
- `Exposes`

Path-bearing section guidance:

- Path-bearing means tools may extract explicit path candidates from the
  section. It does not mean the section is path-only.
- A plain body entry whose trimmed text starts with `./`, `../`, or `/` is an
  explicit path candidate.
- A key-value line whose key starts with `./`, `../`, or `/` uses the key as the
  explicit path candidate.
- Text that does not start with an explicit path prefix is not an explicit path
  candidate, even in path-bearing sections.
- A path-bearing section may still contain prose.

Inline paths in text are recognized only when they use `./`, `../`, or `/`.
URLs are not file paths.

Reference extraction inside inline code spans:

- Tools MAY tokenize inline code span content recursively.
- References such as `@dataclass` and `./src/app.py` MAY resolve even though the
  surrounding backticks remain code-span delimiters.
- References found inside inline code spans SHOULD NOT create structural
  validation errors only because they appear inside code text.

Path resolution guidance:

- `./` and `../` exact paths resolve relative to the current `.sdd` file
  directory.
- `/` exact paths resolve relative to the selected content root.
- Resolved targets SHOULD remain inside the selected content root.
- Missing exact paths are unresolved references, not syntax errors.
- Glob resolution returns matching existing files and directories.
- Glob resolution MAY be capped by implementations.
- Malformed glob patterns are warning-level unresolved glob issues, not syntax errors.

Related-spec relevance resolution may be narrower than generic reference
indexing. A relevance resolver SHOULD follow explicit path references from:

- `Structure`
- `Owns`
- `Can modify`
- `Can read`
- `References`
- `Depends on`

A relevance resolver SHOULD NOT follow links from `Forbids` or `Exposes`,
although a generic reference index MAY still extract and index paths from those
sections.

When a relevance resolver follows an exact path:

- a linked `.sdd` file resolves to that spec
- a linked ordinary file resolves to its same-basename `.sdd` spec when present
- a linked directory resolves to directory-level specs for that directory only

Non-glob directory links such as `./` or `../shared` SHOULD NOT recursively
include every descendant `.sdd` file. Recursive descendant inclusion SHOULD
require an explicit glob such as `./**` or `./**/*.sdd`.

Relevance resolvers SHOULD deduplicate resolved specs by normalized path
relative to the selected content root, protect recursive expansion against
cycles, and expose or document any depth limit used for soft-link expansion.

### Validation Guidance

Strict validators SHOULD report:

- unknown section names
- likely section-name typos
- known section labels missing `:`
- whitespace before `:` in section headers
- indented section headers
- tabs in non-comment indentation
- non-comment indentation width not divisible by 2 spaces
- first section not being `Spec`
- duplicate non-repeatable sections
- duplicate `Scenario` titles
- inline text after `:` on sections that do not support inline values
- inline values not separated from `:` by at least one space
- missing or empty inline value on `Spec`
- missing or empty inline value on `Platform` when `Platform` is present
- missing or empty inline value on `Scenario`
- body lines under `Spec`
- body lines under `Platform`
- non-task body entries under `Tasks`
- malformed task markers inside `Tasks`
- invalid task states inside `Tasks`
- missing task text inside `Tasks`
- invalid body line kind under the current section
- continuation lines without a preceding body entry in the current section

Strict validators MAY report:

- empty sections
- empty files or files with no sections as incomplete specs
- non-canonical section order after `Spec`

### Formatting Guidance

Formatters SHOULD preserve all semantic content and comments, including inline
values, body entries, continuation text, task text and ids, scenario steps,
key-value text, paths, globs, symbol references, and inline code spans. They MAY
normalize blank lines, section spacing, and indentation.

## Language Changelog

### [1.1] - 2026-05-30

#### Added

- Add implementation guidance for target classification, same-basename file
  specs, directory-level spec matching, parent-held directory specs, and
  cumulative directory context.
- Add relevance resolution guidance for followed sections, non-glob directory
  links, glob-based recursive inclusion, and soft-link expansion safety.

#### Changed

- Expand the language specification scope to include implementation guidance and
  notes for parsers, validators, indexers, highlighters, and related tools.
- Move `Done when` before `Scenario` and `Example` in the canonical section
  order.
- Clarify that `/` paths and globs resolve from the selected content root, not a
  generic project root.
- Clarify that malformed glob patterns are valid `.sdd` text and should be
  reported as warning-level unresolved glob issues.
- Rename `References` guidance from horizontal references to explicit
  references.

### [1.0] - 2026-05-19

#### Added

- Add the initial formal version of the SpecDD `.sdd` language specification.
