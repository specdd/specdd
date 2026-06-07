---
title: "How to install or upgrade Node.js 22+ for SpecDD"
seoDescription: "Install or upgrade Node.js 22 or newer for spec-driven development using major operating system package managers first, official installers for macOS and Windows, and nvm only as a fallback."
excerpt: "Check your Node.js version, install Node.js 22 or newer with your operating system package path, and use nvm only when system packages cannot provide a new enough runtime."
level: "Beginner"
howtoID: "1011001"
weight: 20
---

SpecDD CLI installs with npm or Yarn require Node.js 22 or newer. This guide shows how to check your current version,
install or upgrade Node.js on major operating systems, and verify that npm is available.

Use your operating system package manager first when it can provide Node.js 22 or newer. Use `nvm` only as the fallback
when system packages are unavailable or too old for SpecDD.

## Steps

### 1. Check your current version

Run:

```bash
node -v
npm -v
```

The Node.js line must start with `v22`, `v23`, `v24`, or a higher major version. If `node` or `npm` is missing, or if
the Node.js major version is below 22, install a newer runtime.

### 2. Debian and Ubuntu

Use `apt` first:

```bash
sudo apt update
sudo apt install nodejs npm
node -v
npm -v
```

Some Debian and Ubuntu releases package an older Node.js LTS. If the installed version is below `v22`, use the `nvm`
fallback later in this guide.

### 3. Fedora

Use `dnf`:

```bash
sudo dnf install nodejs
node -v
npm -v
```

Fedora also publishes versioned Node.js packages on supported releases. If `nodejs` installs a version below 22, install
a versioned package such as `nodejs24` or `nodejs22` when your Fedora release provides it:

```bash
sudo dnf install nodejs24
node -v
npm -v
```

### 4. RHEL, CentOS Stream, Rocky Linux, and AlmaLinux

Use the Node.js module stream from your enabled repositories:

```bash
sudo dnf module list nodejs
```

Choose a stream that is `22` or newer, then install it. For example, when a `24` stream is available:

```bash
sudo dnf module install nodejs:24/common
node -v
npm -v
```

If your enabled repositories do not provide a `22` or newer stream, use the `nvm` fallback.

### 5. Arch Linux

Use `pacman`:

```bash
sudo pacman -Syu nodejs npm
node -v
npm -v
```

If you specifically want the Node.js 22 LTS line while it is still supported in Arch, use the matching LTS package:

```bash
sudo pacman -Syu nodejs-lts-jod npm
node -v
npm -v
```

### 6. openSUSE

Use `zypper` and install a 22-or-newer package provided by your openSUSE release:

```bash
sudo zypper refresh
sudo zypper install nodejs22
node -v
npm -v
```

If `npm -v` is not available after installing Node.js, install the matching npm package your release provides, such as
`npm22`, then verify again.

### 7. macOS

Use the official macOS installer from the [Node.js download page](https://nodejs.org/en/download). Choose the current
LTS release or another supported release that is 22 or newer.

After the installer finishes, open a new terminal and run:

```bash
node -v
npm -v
```

### 8. Windows

Use the official Windows installer from the [Node.js download page](https://nodejs.org/en/download). Choose the current
LTS release or another supported release that is 22 or newer.

After the installer finishes, open a new PowerShell window and run:

```powershell
node -v
npm -v
```

If you work inside WSL, install Node.js inside the WSL Linux distribution with that distribution's package manager. Keep
the project files in the same environment where Node.js is installed.

### 9. Use nvm when system packages are too old

Use this path only when your Linux, WSL, or other Unix-like system package manager cannot provide Node.js 22 or newer.

Follow the current install command from the [`nvm` project](https://github.com/nvm-sh/nvm#installing-and-updating),
then open a new shell and install the latest LTS release:

```bash
nvm install --lts
nvm use --lts
nvm alias default 'lts/*'
node -v
npm -v
```

If the latest LTS is ever below 22 on your system, install a specific supported major:

```bash
nvm install 22
nvm use 22
node -v
npm -v
```

## Common mistakes

- Installing `nodejs` but not checking that the major version is 22 or newer.
- Mixing system Node.js and `nvm` in the same shell without checking which `node` is first on `PATH`.
- Installing Node.js on Windows but running SpecDD inside WSL, where Node.js is still missing.
- Using a distro package from an older OS release and assuming it satisfies the SpecDD CLI requirement.

## Related how-tos

- [How to install the SpecDD CLI](/how-to/install-and-setup/how-to-install-the-specdd-cli/)
- [How to verify your SpecDD setup is correct](/how-to/install-and-setup/how-to-verify-your-specdd-setup-is-correct/)

## Related reference

- [Tools](/tools/)
