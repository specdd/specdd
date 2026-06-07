---
title: "How to fix a failing SpecDD CLI install or \"command not found\""
seoDescription: "Fix SpecDD CLI install failures and command not found errors by checking Node, npm or Yarn globals, PATH, shell refresh, package manager output, Docker, and specdd --help."
excerpt: "Troubleshoot SpecDD CLI install problems by checking install method, Node version, global package path, shell PATH, terminal reload, Docker fallback, and help output."
level: "Beginner"
howtoID: "1191002"
weight: 30
---

This guide shows you how to fix a failing SpecDD CLI install or a `specdd: command not found` error.

The usual causes are an unsupported Node.js version, a global package directory that is not on `PATH`, installing in one
environment and running in another, or testing before the shell has refreshed.

## Short answer

Run `specdd --help`. If the command is missing, check your install method, confirm Node.js 22 or newer for npm or Yarn
installs, inspect the global package path, open a new terminal, and verify that the shell can find `specdd`. Use Docker
when you do not want or cannot use a local install.

## Steps

### 1. Check whether specdd is available

Run:

```sh
specdd --help
```

If help output appears, the CLI is installed and on your `PATH`.

If the shell says the command is not found, continue.

### 2. Verify the install method

Supported install paths include:

```sh
npm install --global specdd
```

```sh
yarn global add specdd
```

```sh
brew tap specdd/cli
brew install specdd
```

For Docker:

```sh
docker run --rm ghcr.io/specdd/cli:latest --help
```

Use one install path at a time so you know which command should provide `specdd`.

### 3. Check Node and package manager output

For npm or Yarn installs, check:

```sh
node -v
npm -v
```

Node.js must be version 22 or newer. If the install command printed warnings or errors, fix those first instead of only
checking `PATH`.

### 4. Refresh your shell PATH

After installing a global command, open a new terminal and try:

```sh
specdd --help
```

If it still fails, check where your package manager installs global binaries:

```sh
npm bin --global
```

or inspect your package manager's global directory. Add the global binary directory to your shell `PATH` using your
normal shell configuration.

### 5. Check environment mismatch

Make sure you installed and run the CLI in the same environment:

- Windows PowerShell vs WSL
- host machine vs container
- system Node.js vs `nvm`
- one shell profile vs another
- CI image vs local machine

Installing on Windows does not make `specdd` available inside WSL unless Node and the package are installed there too.

### 6. Try Docker when local install is blocked

Use Docker when local Node or PATH setup is not practical:

```sh
docker run --rm ghcr.io/specdd/cli:latest --help
```

For project commands, mount the project:

```sh
docker run --rm -v "$PWD:/workspace" ghcr.io/specdd/cli:latest init
```

### 7. Verify the command

Run:

```sh
specdd --help
specdd init --help
specdd update --help
```

The CLI is ready when these commands exit successfully.

## Common causes

- Node.js is older than version 22.
- npm or Yarn installed globally outside the shell `PATH`.
- The terminal was not restarted after install.
- The CLI was installed in Windows but run inside WSL.
- Docker was run without mounting the project for project commands.
- A CI image does not include the same Node or global package setup as local development.

## Related how-tos

- [How to install the SpecDD CLI](/how-to/install-and-setup/how-to-install-the-specdd-cli/)
- [How to fix SpecDD Node version errors](/how-to/troubleshooting/how-to-fix-specdd-node-version-errors/)
- [How to verify your SpecDD setup is correct](/how-to/install-and-setup/how-to-verify-your-specdd-setup-is-correct/)
- [How to use the CLI through an agent](/how-to/work-with-specdd-skills/how-to-use-the-cli-through-an-agent-specdd-cli/)

## Related reference

- [Tools](/tools/)
