---
title: "SpecDD CLI 1.0.0 has been released"
date: 2026-05-16T21:08:00+02:00
seoDescription: "SpecDD CLI 1.0.0 is the first public release of the command-line tool for initializing, updating, and checking SpecDD framework files in projects."
---

SpecDD CLI 1.0.0 has been released as the first public version of the command-line tool for working with SpecDD-enabled
projects.

The CLI gives projects a supported way to add the official SpecDD framework files, keep them current, and check whether
an update is available without copying release files by hand. SpecDD remains plain-file first; this release only makes
the setup and maintenance path more direct.

The first release includes three main commands. `specdd init` initializes SpecDD in the current directory or another
target path, creating the target directory when needed. `specdd update` updates an existing setup when
`.specdd/bootstrap.md` is present, compares the local bootstrap version against the selected release, and prints the
changelog link when an update is applied. `specdd check-update` reports the local and latest available versions and
exits with a status code that can be used in automation. `init` and `update` also support selecting a specific release
with `--version`.

You can install SpecDD CLI using npm, Yarn, Homebrew, Docker Hub, or GitHub Container Registry. npm and Yarn installs
require Node.js 22 or newer.

With npm:

```bash
npm install --global specdd
```

With Yarn:

```bash
yarn global add specdd
```

With Homebrew:

```bash
brew tap specdd/cli
brew install specdd
```

With Docker Hub:

```bash
docker run --rm specdd/cli:latest --help
```

With GitHub Container Registry:

```bash
docker run --rm ghcr.io/specdd/cli:latest --help
```
