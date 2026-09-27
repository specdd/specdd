# SpecDD Style Guide Plugin (SSG)

SSG guides the writing of SpecDD specifications, design documents, and other SpecDD artifacts. It helps humans and agents
express requirements, decisions, and instructions clearly while preserving their meaning and the rules of each document type.

**Be concise while preserving what readers need to understand and act.**

Treat the guidance as practical defaults. Choose the level of detail, structure, and formality that serves the audience
and the purpose. A brief explanation may need a paragraph; a complex procedure may need prerequisites, examples, and
recovery steps. Use judgment about what helps readers succeed.

## Scope

Apply SSG when creating, editing, or reviewing SpecDD artifacts selected by the current task.

SpecDD artifacts are content that defines, explains, or supports SpecDD contracts and workflows. They include:

- `.sdd` specifications and spec excerpts, including requirements, tasks, scenarios, and completion criteria.
- Domain Definitions and Solution Designs defined by the Domain & Solution Design (DSD) plugin, and comparable
  SpecDD document types defined by other framework plugins.
- Instructions authored for SpecDD, including project and local bootstrap instructions and framework plugin instructions.
- Documentation and examples about SpecDD itself or its use in a project.
- SpecDD plans, reviews, explanations, traceability notes, and completion reports produced as task deliverables, whether
  saved in files or presented to the Operator.

Ordinary project writing is outside the default scope. This includes application READMEs, product documentation,
user guides, API documentation, articles, marketing copy, user-interface text, and code or test comments that do not
serve one of the SpecDD purposes above. Being inside a SpecDD-governed project, generated through a SpecDD workflow,
or listed in a spec's `Owns`, `Can modify`, or `References` does not make that writing a SpecDD artifact.

Classify content by its role, not merely its filename, extension, or location. In a mixed document, apply SSG only to
the SpecDD-specific material selected by the task. A passing mention of SpecDD does not bring a whole document into scope.

Apply SSG to other writing only when the Operator explicitly requests that application. Follow the requested targets
and duration: a request covering one document or task does not establish a project-wide policy. A request to improve
ordinary project writing, without requesting SSG, does not itself extend this plugin's scope.

When the role of an artifact is unclear, continue the authorized task without extending SSG to that artifact. Clarify
the boundary only when it is necessary to complete the requested work.

## Authority and preservation of meaning

SSG governs writing quality within the task's existing authority. It grants no ownership, modification permission, or
additional change targets. Keep style edits within the artifacts selected for the task. Review and planning requests
remain read-only unless edits are also authorized.

Preserve the artifact's governing syntax and semantics. Exact section labels, required headings, identifiers, paths,
task states, reference forms, and other literal content take precedence over general formatting preferences. Use the
document type's own rules for required content and structure.

A style edit must preserve intended behavior, obligation strength, scope, ownership, conditions, exceptions, values,
and verification meaning. Do not resolve a requirements conflict or choose new behavior through a wording change.
Handle substantive conflicts and requested intent changes under the applicable SpecDD or plugin workflow.

When a stylistic preference would obscure meaning or violate an artifact rule, preserve the meaning and rule. Report
material incompatibilities without turning ordinary editorial choices into approval gates.

## Apply the guide in context

A single document can combine technical explanations, instructions, marketing, storytelling, and other kinds of writing.
A README, for example, may introduce a product's value before explaining how to use it. Evaluate both the document as a
whole and the purpose of each passage before applying this guide.

Assess nontechnical passages according to their audience, intent, and contribution to the document. Do not automatically
force them into the conventions of technical writing or remove deliberate voice and emphasis merely to achieve
uniformity. A product introduction can be enthusiastic while its installation instructions remain precise and direct.

Make cautious, proportionate changes with a clear benefit to readers. Preserve language that serves the passage's
purpose, and correct inaccuracies or misleading claims wherever they occur. When the benefit of a stylistic change is
uncertain, favor preserving the author's intent. Aim for a coherent document whose different kinds of writing each
fulfill their purpose.

## Start with the reader and their purpose

Before writing, establish who the text is for and what it should help them learn, decide, or do. Consider their
familiarity with the subject, the terminology they use, and the circumstances in which they will read it.

Someone diagnosing an outage needs a quick route from a symptom to a useful check. Someone evaluating a library needs to
understand its purpose, capabilities, and limitations. Let those needs determine what to include and how much
explanation to provide.

Account for differences in experience, language fluency, and accessibility needs. Introduce knowledge that readers need
but may not have. Keep background proportionate to the task, and link to deeper explanations when useful.

When audiences have conflicting needs, identify the primary audience and give its needs priority. Use clearly labeled
sections or separate documents for distinct roles and tasks. Provide brief orientation and routes to deeper explanations
so readers can choose a suitable level of detail.

Readers may arrive through a search result or a direct link. Give each substantial topic enough context to identify its
subject, scope, and relevant conditions without requiring readers to have read every preceding section.

## Organize information around readers' needs

Put the main point, purpose, or expected outcome near the beginning. Help readers quickly determine whether the document
addresses their situation.

When a complex topic needs an overview, briefly explain how its parts fit together before developing the details.

Choose an order that fits the material:

- Present procedures in the order readers will perform them, with prerequisites before dependent actions.
- Build explanations from familiar ideas toward unfamiliar ones.
- Give reference entries a predictable organization that supports quick lookup.
- Cover the common path before less common alternatives, while keeping important conditions close to the information
  they qualify.

Group related information together. Keep background, rationale, and advanced detail close enough to support
understanding without interrupting the main task. Longer supporting material can live in a linked section or document.

Use headings that describe what follows. For example, "Set connection timeouts" gives readers more information than
"Additional settings." Add headings where they help readers navigate or recognize a change of topic. A short, coherent
passage can remain a single section.

Make connections explicit: explain how a choice affects later steps, why an example matters, or how one concept relates
to another. Structure should support both scanning and sustained reading.

## Write clear, connected prose

Prefer familiar words, direct verbs, and concrete subjects. Name the actor when readers need to know who or what
performs an action.

**Before:** Modification of the configuration file is required before initialization of the service.

**After:** Update the configuration file before initializing the service.

Use active voice when it makes responsibility or behavior clearer. Passive voice is useful when the result deserves
emphasis or the actor is irrelevant: "This option was removed in version 3.0."

Use present tense for general software behavior: "The command returns a list." Use future tense when it clarifies when
an action occurs: "The file will be archived during the next scheduled backup."

Keep each sentence focused and make its references clear. Replace an ambiguous "it," "this," or "they" with the relevant
name. Give each paragraph a coherent topic, usually introduced near its beginning. Connect sentences through meaningful
relationships such as sequence, cause, consequence, or contrast.

Place modifiers such as "only" next to the words they restrict. "Only administrators can reset passwords" restricts who
can act; "Administrators can reset only passwords" restricts what they can reset.

Unpack strings of nouns when their relationships are hard to follow: "request to delete a user account" is clearer than
"user account deletion request." Keep the subject and verb close enough to recognize their connection. Move long
interruptions to another sentence or a position where they do not obscure the main action.

Vary sentence length to fit the thought. A longer sentence can help readers understand a condition and its consequence
together. Split a sentence when its clauses become difficult to follow. Use readability scores and length checks as
prompts for review; judge the result by how well the text communicates.

Address readers as "you" where it feels natural. Use a calm, respectful tone. Avoid unsupported praise, unnecessary
formality, and words such as "obviously" or "simply" that can dismiss a reader's difficulty. When explaining a problem,
describe what happened and how to proceed without assigning blame.

In examples, use task-relevant role descriptions when names or personal details do not help explain the task. Avoid
stereotypes and irrelevant assumptions about people's background or personal characteristics. Keep examples focused on
the subject and describe people respectfully.

## Be concise without leaving gaps

Give each passage a purpose: answer a question, explain a relationship, support a decision, or help complete a task.
Remove repeated conclusions, empty introductions, vague modifiers, and details that do not contribute to that purpose.

**Before:** Please note that in order for the changes to take effect, it is necessary to restart the server.

**After:** Restart the server to apply the changes.

Preserve qualifications that affect meaning. "By default, logs are kept for seven days" describes a default that may be
configurable. Removing "By default" changes the claim.

Include rationale when it helps readers choose correctly, understand a limitation, or recover from a problem. Keep
articles, prepositions, and connective words that make relationships clear. Compressing prose into dense fragments can
increase the effort needed to interpret it.

Some repetition is useful. Restating a critical condition near the affected action can help readers who enter midway
through a document. Repeating a long explanation in several places creates reading and maintenance costs; a short
reminder and a meaningful link may work better.

Judge conciseness by the effort required to find, understand, and use the information. Add an example or explanation
when it reduces that effort.

## Keep technical meaning precise and consistent

Use the same term for the same concept. Match names used in the product, interface, and related documentation. Introduce
unfamiliar terms where readers need them, and explain abbreviations unless the intended audience already knows them.

Where a name alone is unclear, add a noun that identifies the kind of object: "the `timeout` parameter" or
"the `settings.yaml` file."

Preserve exact spelling and capitalization in commands, identifiers, filenames, configuration keys, and interface
labels. A stylistic improvement must not change something readers need to recognize or enter literally.

Be explicit about details that affect interpretation:

- **Scope:** Identify the relevant component, version, platform, or operating mode when behavior varies.
- **Conditions:** State when a behavior applies and what changes it. Keep exceptions next to the claims they qualify.
- **Obligation:** Use "must" for a requirement and "should" for a recommendation. Identify optional steps directly.
  Distinguish capability from permission.
- **Values:** Give units, defaults, limits, and accepted values when readers need them. Use unambiguous dates, and
  include a time zone when timing depends on it.
- **Certainty:** Separate established behavior from assumptions, likely causes, and planned features. Support claims
  with verification or relevant sources.

Attribute borrowed ideas, data, and illustrations to their sources. Common knowledge for the intended audience does not
need a citation. Mark exact quotations clearly. Paraphrase in your own wording and sentence structure while preserving
the source's meaning and attribution. In software documentation, a descriptive link beside the relevant material often
provides sufficient attribution.

Prefer concrete descriptions when the facts are known. "The client stops after three failed attempts" is more useful
than "The client eventually stops." Preserve uncertainty when the behavior has not been established.

Avoid unexplained comparisons such as "faster," "safer," or "more efficient." State the relevant comparison and
conditions when they matter to the reader's decision.

When drawing a conclusion, distinguish observations from interpretations and explain how the evidence supports it.
When recommending an approach, state the relevant criteria, assumptions, alternatives, and tradeoffs. Include
limitations
or contrary evidence that could change the reader's decision. Check that the overall account remains accurate; omitting
material information can mislead even when individual statements are true.

## Make instructions and examples usable

Give readers enough information to start, proceed, and recognize completion. Depending on the task, that can include its
purpose, prerequisites, required access, relevant settings, ordered actions, and expected results. Scale the
presentation to the task's complexity.

Number steps when their order matters. Use a clear imperative verb in each step's first sentence and keep the step
focused on a manageable unit of work. Put conditions, purposes, or locations before the action when readers need that
context first: "If caching is enabled, clear the cache before restarting the service." Put supporting explanations and
examples beside the step they support. For a long procedure, group actions into meaningful stages and explain how the
stages relate.

Make choices explicit. State the condition under which each branch applies, so readers can identify their next action
without guessing.

Place warnings before the action that creates the risk. Describe the consequence and the relevant precaution. For
example: "This command permanently deletes stored logs. Export any logs you need before running it." Give warnings
prominence in proportion to their consequences.

Explain consequential effects beyond the immediate result, such as settings that remain changed or resources that
continue to incur costs. Include cleanup or restoration steps when they are part of completing the task, and describe
the expected final state.

Keep prerequisites, required actions, and expected results in the main instructional flow. Use notes and tips for
supplementary information that readers can skip and still complete the task. Use notices sparingly so they retain their
prominence.

Use examples that reflect realistic tasks. Keep them small enough to follow and complete enough to demonstrate the
intended behavior:

- State the working directory, dependencies, and environment when the example depends on them. Identify the target host,
  user, and minimum required privileges where relevant. Explain changes to this context before the affected commands.
- Distinguish literal values from placeholders. Give placeholders descriptive names, such as `PROJECT_ID`, and explain
  what to substitute and where readers can obtain the value when necessary.
- Use fictional sample data. For generic domains and IP addresses, use values reserved for documentation, such as
  `example.com` or `192.0.2.1`. Avoid using real customer or account data.
- Separate commands or input from output. Identify shortened output when omissions matter.
- Identify whether an example is runnable code, a syntax template, or an abbreviated excerpt. Keep notation such as
  `[OPTIONAL_ARGUMENT]` and `{CHOICE_A|CHOICE_B}` out of runnable examples unless it is literal syntax.
- Ensure copied commands exclude prompt symbols and preserve valid line continuations for the documented shell.
- Mark omitted code explicitly, using comments when the language supports them and surrounding prose otherwise.
- If an example is simplified, explain limitations that affect its reuse and any changes needed for its intended
  environment.
- Show a useful result or explain how readers can confirm success.
- Verify examples against the software version being documented.

For troubleshooting, start with a symptom the reader can recognize. Include exact error text when it helps
identification or search. Explain the likely cause, a useful diagnostic check, and an appropriate recovery action.
Distinguish a suspected cause from one the check has confirmed.

## Use formatting to support comprehension

Choose presentation according to the information:

- Use paragraphs for explanations, relationships, and reasoning.
- Use bullets for related items and numbered lists for sequences.
- Use tables when readers need to compare the same properties across several items.
- Use code blocks for commands, configuration, and code examples, with a language label where useful.
- Use diagrams or images when they clarify relationships, behavior, or locations more effectively than prose alone.

Use the document format's heading, list, and table markup so assistive technology can recognize the structure. Mark
table
headers explicitly. Keep commands, code, and terminal output as text that readers can select and copy.

Apply a small set of consistent conventions:

- Use descriptive headings in a logical hierarchy without skipping levels. Prefer sentence case while preserving
  proper names and technical identifiers.
- Use matching grammatical forms for comparable list items and headings that serve the same purpose. For example,
  "Install dependencies," "Configure authentication," and "Start the service" all begin with actions.
- Use inline code for literal commands, paths, keys, and values. Make interface labels easy to recognize; bold text can
  help distinguish them from surrounding prose.
- Use emphasis selectively so it retains meaning.
- Write link text that identifies the destination or purpose, such as "Configure authentication." Place links where
  readers need the supporting information. Include short instructions essential to the current task in the topic itself.
  Use links for further detail. Reconsider the organization if completing a task requires repeated jumps between pages.
- Keep illustrations near the relevant text. Label them accurately, give them descriptive titles or captions, and
  explain
  in the surrounding text what readers should learn from them. Use figure numbers or descriptive links when they help
  readers identify the intended visual.
- Provide text alternatives or explanations for essential visual information, and avoid relying on color or position
  alone to convey meaning.

Use a consistent spelling variant and punctuation style appropriate to the audience. Preserve the original spelling of
names and literal text. Prefer wording and examples that remain understandable across cultures, and explain idioms or
local conventions when they are necessary.

Prefer ASCII in plain text, including Markdown source. Use straight quotes and apostrophes, ordinary spaces, and simple
punctuation that is easy to type, search, copy, and maintain. Apply this preference to prose, headings, link text, and
reference titles; replace decorative punctuation such as curly quotes and typographic dashes with ASCII alternatives.

Preserve non-ASCII characters needed for correct spelling or meaning, including in personal and place names. Keep exact
characters in verbatim quotations, code, identifiers, paths, and data.

## Adapt the guidance to the document

Use these patterns as starting points. Select and combine them according to what the document needs to accomplish.

| Document                                 | Useful emphasis                                                                                                                                            |
|------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| README                                   | Explain the project's purpose, who it serves, how to reach a useful first result, and where to find further documentation or help.                         |
| User guide or how-to                     | Establish the goal and prerequisites, guide readers through the task, and help them confirm success or resolve problems.                                   |
| Conceptual or architectural explanation  | Explain concepts, relationships, motivations, and tradeoffs that help readers understand behavior or make decisions.                                       |
| API, command, or configuration reference | Present exact behavior, syntax, inputs, defaults, constraints, outputs, and errors in a consistent form for quick lookup.                                  |
| AI-facing instructions                   | State the task, relevant context, constraints, expected output, and observable completion criteria. Distinguish instructions from background and examples. |

For an unfamiliar concept, explain what it is, why it matters to the reader, and how it works. Define terms in language
readers already understand. Build on familiar ideas, and use examples to clarify the concept's boundaries or distinguish
it from related concepts. When an analogy helps, explain where the comparison stops being accurate.

For AI-facing prose, identify the objects or material an instruction applies to. Make conditional actions explicit, and
state how to handle missing information when it affects the result. If requirements you control can conflict, explain
their relative priority.

For example:

> Summarize the release notes for users upgrading from version 2. Include breaking changes and required migration steps.
> Preserve command names exactly. If migration details are missing, say so. Present the result as a short Markdown list.

Keep AI instructions readable enough for a person to review and maintain.

## Review for understanding, accuracy, and continued usefulness

Review while drafting and after substantive changes. Start with purpose and organization, then check content for
completeness and technical accuracy before refining wording, formatting, and mechanics. Read headings and paragraph
openings in sequence to check whether the explanation develops logically.

Use these questions to guide editing:

- Is the purpose clear, and does the content address the intended readers' needs?
- Can readers find the information relevant to their situation?
- Are the wording, structure, and relationships understandable without unnecessary inference?
- Is there enough information to make the intended decision or complete the task?
- Do claims, names, instructions, and examples match the relevant software version?
- Do links lead to useful information, and can readers recognize successful results?
- Can anything be shortened or removed while preserving meaning and usefulness?

Try important procedures in the environment described. Involve representative readers when practical, especially for
unfamiliar, complex, or consequential material. Scale the review effort to the document's use and the consequences of
misunderstanding it.

For published documentation, include checks of reading order and keyboard navigation for links and interactive content,
as appropriate to the content and publishing format.

Automated checks can help find spelling errors, broken links, and some inconsistencies. Observe whether readers can
actually use the information, and revise it based on their difficulties.

Maintain documentation alongside the behavior it describes. Update affected examples and explanations when software
changes. Clearly identify historical guidance when it remains useful, and retire material that no longer serves readers.

In persistent instructions and reference material, avoid unanchored terms such as "new," "currently," and "latest." When
a change matters, identify its version or date. Preserve time references that serve release notes, announcements, or
historical explanations.

## Apply the guidance to the artifact

### SpecDD specifications

Follow the active bootstrap's `.sdd` syntax. Improve prose within the permitted structure. Do not apply Markdown heading,
list, or table conventions to native `.sdd` structure, invent section labels, or change syntax for visual consistency.
Preserve required indentation, task markers, scenario steps, path notation, and symbols.

Keep requirements explicit about the behavior, conditions, and observable outcomes that matter. Preserve distinctions
between requirements, prohibitions, implementation tasks, and completion criteria. Editing a task's wording does not
change its state or establish that it is complete.

Follow SpecDD's relevance, inheritance, and ownership rules. Improve the selected local contract without copying whole
ancestor specs, introducing redundant obligations, or silently moving a requirement to a different scope. Make style
suggestions that need a substantive contract change explicit for the applicable workflow to resolve.

### DSD and other plugin documents

Follow the defining plugin's rules for document types, placement, headings, identifiers, references, sources, and
required content. With DSD, preserve Domain and Solution ownership, requirement strength, decision rationale, acceptance
criteria, and realization mappings.

Use the document's abstraction level to choose detail. A Domain Definition explains its problem space and shared intent;
a Solution Design explains how one Solution addresses that intent. Improve readability without turning either into a
source-file inventory or discarding material design reasoning.

Sentence-case preferences do not rename required headings such as `# Domain Definition: Trip Planning`, stable IDs
such as `BR-1`, or references such as `trip-planning#BR-1`. Do not introduce required metadata or empty template sections
merely to standardize appearance.

### SpecDD instructions and task deliverables

State the task, relevant context, applicable artifacts, conditions, constraints, expected output, and observable completion
criteria when they affect the result. Distinguish instructions from background and examples. Make conditional actions
and handling of missing information explicit.

If instructions you author can conflict, state their relative priority where the governing rules establish one; otherwise
explain the applicable conflict process. Do not invent precedence or silently change it. Keep AI-facing instructions
readable enough for people to review and maintain.

Keep plans, reviews, explanations, and reports focused on the requested decision or result. Distinguish work proposed,
performed, and verified. Report material limitations and unresolved questions without adding an unsolicited compliance
checklist to every response.

## Review and verification

Review selected artifacts while drafting and after substantive changes, in this order:

1. Confirm scope, audience, purpose, governing format, and edit authority.
2. Check organization by reading headings and paragraph openings in sequence.
3. Check completeness, technical accuracy, conditions, sources, and usefulness of instructions and examples.
4. Assess wording and formatting, preserving meaning and deliberate voice in proposed changes.
5. Check affected syntax, references, links, examples, and rendered reading order as appropriate to the change.

Use the project's relevant checks when available. Try important procedures in the documented environment when authorized
and practical, accounting for their effects. Where practical, involve representative readers through the project's
authorized review process, especially for unfamiliar, complex, or consequential material. Scale review effort to the
document's use and the consequences of misunderstanding it.

For a review, report findings with locations, reader impact, and proportionate suggestions. Distinguish material problems
from optional preferences. For an edit, summarize changes and verification accurately, including checks not performed
when that limits confidence. A style review must not claim that implementation behavior was verified.
