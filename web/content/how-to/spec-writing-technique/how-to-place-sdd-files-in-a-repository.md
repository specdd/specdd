---
title: "How to place .sdd files in a repository"
seoDescription: "Place spec-driven development .sdd files beside the code, docs, workflows, or infrastructure they govern so context is local and discoverable."
excerpt: "Put specs near the files or areas they describe: root specs at the content root, directory specs in or beside directories, and local specs beside source files."
level: "Beginner"
howtoID: "1071005"
weight: 60
---

This guide shows you where to place SpecDD `.sdd` files in a repository.

SpecDD works because specs live close to the files, docs, workflows, infrastructure, or contracts they govern. Locality
helps humans, agents, reviewers, and onboarding because the right context is near the work.

## Short answer

Place the root spec at the selected content root and name it after that directory. Place directory specs in or beside
the directories they govern. Place same-basename specs beside files with substantial behavior. Use explicit references
for sibling context. Avoid one central folder full of disconnected specs.

## Steps

### 1. Choose the content root

The content root is the project boundary for spec resolution and `/` paths. In a normal repository, it is usually the
repository root. In a monorepo, choose deliberately based on whether specs need to cross packages or apps.

### 2. Place the root spec at the content root

```text
travel-planner/
  travel-planner.sdd
```

This gives child specs inherited project context.

### 3. Add directory specs for shared local context

```text
src/
  trips/
    trips.sdd
    itinerary.js
```

Use directory specs for:

- module responsibilities
- immediate child roles
- shared local boundaries
- dependency direction for the area
- tasks that truly belong to the area

### 4. Colocate same-basename specs with files

```text
src/trips/
  itinerary.js
  itinerary.sdd
```

This is the clearest pattern for implementation work. When a target file and `.sdd` file share a basename in the same
directory, the `.sdd` file is the local spec for that target.

### 5. Place named specs near the subject

Examples:

```text
src/trips/
  add-place.feature.sdd
  trip-access.policy.sdd
  itinerary-card.component.sdd
```

Named specs are useful, but they should be connected from applicable directory or local specs if they need to be found
during target resolution.

### 6. Use explicit references for sibling context

Sibling specs are not inherited automatically:

```sdd
References:
  ../storage/trip-storage.sdd
```

References provide context. They do not grant write authority.

### 7. Avoid central spec dumps

Avoid:

```text
specs/
  all-trips.sdd
  all-storage.sdd
  all-ui.sdd
```

unless that folder is itself the content being specified. Specs should usually live near the things they govern.

## Common mistakes

- Putting all specs in one central docs folder.
- Writing local behavior in the root spec.
- Placing a named spec near code but never referencing it.
- Treating sibling specs as inherited.
- Choosing a source directory as a content root when the repository root should govern references.

## How to verify placement

Placement is good when:

- the root spec is at the content root
- local specs are near the files they govern
- directory specs provide inherited context
- named specs are discoverable
- reviewers can locate the governing spec from a changed file

## Related how-tos

- [How to structure a SpecDD project layout](/how-to/install-and-setup/how-to-structure-a-specdd-project-layout/)
- [How to name SpecDD files](/how-to/spec-writing-technique/how-to-name-specdd-files/)
- [How to map an existing codebase into specs](/how-to/adopt-specdd-on-existing-projects/how-to-map-an-existing-codebase-into-specs/)

## Related reference

- [Quickstart](/quickstart/)
- [Language reference](/language-reference/)
