---
title: "How to install the SpecDD CLI"
seoDescription: "Install the SpecDD CLI for spec-driven development with npm, Yarn, Linux Homebrew, or Docker, then verify the command is ready to initialize and update SpecDD projects."
excerpt: "Install the SpecDD CLI with a supported package path, verify `specdd --help`, and choose the next setup step for a new or existing project."
level: "Beginner"
howtoID: "1011000"
weight: 10
---

This guide shows you how to install the SpecDD CLI for spec-driven development and verify that the `specdd` command is
ready to initialize or update a project.

The CLI is the tool that installs the SpecDD framework files, checks for framework updates, and deploys universal Agent
Skills when you need them.

## Prerequisites

Choose one install path:

- Node.js 22 or newer, if you install with npm or Yarn
- Docker, if you want to run the CLI without installing it locally
- Homebrew on Linux, if that is how you manage this workstation

If Node.js is missing or too old, start with [How to install or upgrade Node.js 22+ for SpecDD](/how-to/install-and-setup/how-to-install-or-upgrade-node-js-22-for-specdd/).

## Steps

### 1. Check whether the CLI is already installed

Run:

```bash
specdd --help
```

If the command prints help output, the CLI is already on your `PATH`.

### 2. Install with npm

Use npm when Node.js 22 or newer is already installed:

```bash
npm install --global specdd
```

This is the simplest local install path for most Node-ready developer machines.

### 3. Install with Yarn

If your global JavaScript tooling is managed with Yarn, install the CLI with:

```bash
yarn global add specdd
```

The npm and Yarn paths both require Node.js 22 or newer.

### 4. Install with Linux Homebrew

If your Linux workstation already uses Homebrew, install the SpecDD formula:

```bash
brew tap specdd/cli
brew install specdd
```

Prefer your operating system package manager for system dependencies. Use this Homebrew path only when Linux Homebrew is
already part of how you manage command-line tools.

### 5. Run with Docker instead

Use Docker when you do not want a local CLI install.

Check the CLI help from Docker Hub:

```bash
docker run --rm specdd/cli:latest --help
```

Or use GitHub Container Registry:

```bash
docker run --rm ghcr.io/specdd/cli:latest --help
```

When you run project commands with Docker, mount the project at `/workspace`:

```bash
docker run --rm -v "$PWD:/workspace" ghcr.io/specdd/cli:latest init
```

### 6. Verify the install

Run:

```bash
specdd --help
specdd init --help
specdd update --help
specdd check-update --help
```

The command is ready when each help command exits successfully.

## Common mistakes

- Installing with npm or Yarn while `node -v` is older than `v22`.
- Installing the CLI in one shell, then testing in another shell before `PATH` has refreshed.
- Running Docker commands without mounting the project directory.
- Running `specdd update` in a directory that has not been initialized yet.

## Related how-tos

- [How to install or upgrade Node.js 22+ for SpecDD](/how-to/install-and-setup/how-to-install-or-upgrade-node-js-22-for-specdd/)
- [How to initialize SpecDD in a new project](/how-to/install-and-setup/how-to-initialize-specdd-in-a-new-project/)
- [How to verify your SpecDD setup is correct](/how-to/install-and-setup/how-to-verify-your-specdd-setup-is-correct/)

## Related reference

- [Tools](/tools/)
- [Quickstart](/quickstart/)
