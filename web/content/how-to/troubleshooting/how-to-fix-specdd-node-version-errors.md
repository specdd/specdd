---
title: "How to fix SpecDD Node version errors"
seoDescription: "Fix SpecDD Node version errors by checking node -v, installing Node.js 22 or newer, avoiding mixed Node environments, and using Docker or another install path when needed."
excerpt: "Resolve SpecDD Node.js errors by confirming the active runtime is version 22 or newer, upgrading the right environment, and retesting the CLI install."
level: "Beginner"
howtoID: "1191003"
weight: 40
---

This guide shows you how to fix Node.js version errors when installing or running the SpecDD CLI.

The npm and Yarn install paths require Node.js 22 or newer. A common failure is upgrading Node in one environment while
the shell running `specdd` still uses an older runtime.

## Short answer

Run `node -v` in the same shell where the SpecDD command fails. If the major version is below 22, upgrade Node.js in
that environment, open a new terminal, reinstall or retest the CLI, and confirm `specdd --help` works. Use Docker if you
cannot upgrade local Node.js.

## Steps

### 1. Check the active Node version

Run:

```sh
node -v
npm -v
```

The Node.js version must start with `v22`, `v23`, `v24`, or a newer major version.

If `node` is missing or older than `v22`, install a newer runtime.

### 2. Confirm the failing environment

Check the same environment where the error occurs:

- local terminal
- IDE terminal
- WSL shell
- CI image
- container
- remote development host

Do not assume a version installed on the host is available inside a container or WSL distribution.

### 3. Upgrade Node.js

Use the install path that fits your environment:

- operating system package manager when it provides Node.js 22 or newer
- official installers on macOS or Windows
- `nvm` when system packages are unavailable or too old

After upgrading, open a new terminal and check:

```sh
node -v
npm -v
```

### 4. Avoid mixed Node installs

If you use `nvm`, make sure the active shell is using the intended version:

```sh
nvm use 22
node -v
```

If you use system packages, check whether a different `node` appears earlier on `PATH`.

Mixed Node installs can make `npm install --global specdd` succeed in one environment while `specdd` runs with another
runtime.

### 5. Reinstall or retest the CLI

After Node.js is correct, run:

```sh
npm install --global specdd
specdd --help
```

If you use Yarn:

```sh
yarn global add specdd
specdd --help
```

If the command is still missing, troubleshoot the global binary path.

### 6. Use Docker when needed

If you cannot upgrade local Node.js, run the CLI through Docker:

```sh
docker run --rm ghcr.io/specdd/cli:latest --help
```

For project commands:

```sh
docker run --rm -v "$PWD:/workspace" ghcr.io/specdd/cli:latest init
```

## Common causes

- Node.js major version is below 22.
- The IDE terminal uses a different Node than the system terminal.
- WSL does not have the same Node.js install as Windows.
- `nvm` is installed but not loaded in the current shell.
- CI uses an older image than local development.
- npm globals were installed under an older Node version.

## How to verify the fix

The Node issue is fixed when:

- `node -v` reports `v22` or newer in the failing environment
- `npm -v` or Yarn works in the same shell
- `specdd --help` runs
- `specdd init --help` runs
- the project command succeeds from the intended root

## Related how-tos

- [How to install or upgrade Node.js 22+ for SpecDD](/how-to/install-and-setup/how-to-install-or-upgrade-node-js-22-for-specdd/)
- [How to fix a failing SpecDD CLI install or command not found](/how-to/troubleshooting/how-to-fix-a-failing-specdd-cli-install-or-command-not-found/)
- [How to install the SpecDD CLI](/how-to/install-and-setup/how-to-install-the-specdd-cli/)

## Related reference

- [Tools](/tools/)
