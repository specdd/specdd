---
title: Plugins
layout: single
seoDescription: "Install, list, update, and publish SpecDD plugins. Learn how to choose versions, manage plugin files, and load instructions in your project."
---

SpecDD framework plugins add reusable instructions and workflows to your project. Each plugin is a Markdown instruction
file that agents load through the SpecDD bootstrap, alongside the framework and project rules. Plugins can add document
types, design practices, or workflows while keeping your project's intent in plain files.

[Agent plugins](./TOOLS.md#dedicated-agent-plugins) serve a different purpose: they provide SpecDD skills for your
coding
agent.

Use plugins from SpecDD, third-party maintainers, or your own team to share domain-specific methods and conventions
across projects. The SpecDD command-line interface (CLI) installs plugins from public or private Git repositories,
records their sources and versions, lists enabled plugins, and updates their instruction files.

## Official plugins

| Plugin                                               | Repository       | Plugin name | Purpose                                                                                     |
|------------------------------------------------------|------------------|-------------|---------------------------------------------------------------------------------------------|
| [Domain & Solution Design](./.plugins/dsd/README.md) | `@specdd/specdd` | `dsd`       | Document problem domains and solution designs that guide implementation specs.              |
| [SpecDD Style Guide](./.plugins/ssg/README.md)       | `@specdd/specdd` | `ssg`       | Write clear specs, designs, and other SpecDD artifacts while preserving meaning and format. |
| [Zen](./.plugins/zen/README.md)                      | `@specdd/specdd` | `zen`       | Guide AI-agent work with attention, restraint, honesty, and care.                           |

## Install a plugin

Framework plugins require SpecDD framework 1.6 or newer.

You need the SpecDD CLI and Git. See [Tools](./TOOLS.md) for CLI installation, agent integrations, and editor support.
For SSH repositories, you also need an SSH client; the CLI uses your existing SSH agent and configuration.

Run plugin commands from your project's SpecDD root: the directory containing `.specdd/bootstrap.md`. If you have not
initialized the project, run `specdd init` first. See [Quickstart](./QUICKSTART.md) for setup instructions.

If your project uses an older framework version, run `specdd update` from that root before installing a plugin.

To install the official DSD plugin from the repository's default branch, run:

```bash
specdd plugin add @specdd/specdd dsd
```

For other plugins or a specific version, use:

```text
specdd plugin add <repository> <pluginname> [version]
```

Replace `<repository>` and `<pluginname>` with the repository address and plugin name supplied by the publisher. Replace
`[version]` with a tag, branch, or commit identifier, or omit it to use the remote default branch. Do not include the
brackets. See [Choose a version](#choose-a-version) for details.

The repository address can use any of these forms:

| Address form              | Example                                        |
|---------------------------|------------------------------------------------|
| GitHub shorthand over SSH | `@owner/repository`                            |
| SSH address               | `git@example.com:namespace/repository.git`     |
| HTTPS URL                 | `https://example.com/namespace/repository.git` |

The repository must contain `.plugins/<pluginname>/plugin.md`. The CLI installs that instruction file in your project
and registers it in `.specdd/plugins.json`, the ordered list of enabled plugins. Adding the same plugin again updates
its existing registration. After installation, run `specdd plugin list` to check the registration.

## Choose a version

The optional `version` argument accepts an exact Git tag, branch, or reachable commit identifier. The CLI preserves the
string you supply, including prefixes such as `v`, and records the resolved commit separately.

| Version argument  | What the CLI installs            | Recorded `version`             |
|-------------------|----------------------------------|--------------------------------|
| Omitted           | The remote default branch        | `latest`                       |
| Tag or branch     | The exact tag or branch you name | The supplied name              |
| Commit identifier | The selected revision            | The supplied commit identifier |

Version selection uses Git references (refs), rather than semantic version ranges or GitHub releases. If a branch and
tag share a name, use `refs/heads/<name>` for the branch or `refs/tags/<name>` for the tag. Replace `<name>` with the
branch or tag name.

If you explicitly supply `latest`, installation uses the Git ref named `latest`, but later updates treat the recorded
`latest` as the remote default branch. To keep following a ref named `latest`, use `refs/heads/latest` or
`refs/tags/latest`. To follow the remote default branch from installation onward, omit the version.

## List installed plugins

To see which plugins are enabled in your project, run:

```bash
specdd plugin list
```

The default text output shows each plugin's local path, requested version, source revision, and checksum, in load
order. The command reads the local registry without contacting remote repositories or changing files. A listed entry
can still point to a missing instruction file. If no plugins are registered, text output says `No plugins installed.`

For scripts and tooling, choose a JSON output format:

```bash
specdd plugin list --output json
specdd plugin list --output json-extended
```

Both formats include `rootDirectoryPath`, `registryPath`, and a `plugins` array with the fields described in
[Plugin files and registry](#plugin-files-and-registry). The `json-extended` format also includes custom registration
fields. When no plugins are registered, `plugins` is an empty array. You can use `--format` as an alias for `--output`.

## Update plugins

The update command manages plugins installed under your project's `.specdd/plugins/` directory. Plugins registered
at other locations can still be listed and loaded, but you must update their files separately.

Before replacing an existing instruction file, the CLI checks it against the recorded checksum. If you have edited
the file locally, the operation stops and preserves your edits;
see [Recover from local edits](#recover-from-local-edits)
before retrying. If an update fails, any earlier successful updates remain in place.

To update every managed plugin in the current project, run:

```bash
specdd plugin update
```

To update one plugin, supply both its repository and name, with an optional version override:

```text
specdd plugin update <repository> <pluginname> [version]
```

Replace the placeholders as described in [Install a plugin](#install-a-plugin). Leave out `[version]` to use the
recorded version. Supply a version to replace the selected plugin's recorded version, following the rules in
[Choose a version](#choose-a-version).

Updates fetch each plugin from its recorded repository using its requested `version`. A recorded `latest` follows the
remote default branch; other values resolve the recorded tag, branch, or commit. The commit in `origin` records what
was installed, while `version` determines what a later update requests.

The repository and plugin name together identify the installation, including when several repositories provide a
plugin with the same name. You can select a plugin with the same shorthand, SSH, or HTTPS address forms used for
installation. The CLI fetches from the address recorded at installation, even if you select the plugin with a different
address form.

Successful updates refresh `origin`, `sig`, and `version` while preserving registration order and additional metadata.

### Recover from local edits

If the CLI reports `Plugin has local modifications and does not match its recorded checksum`, preserve your edits
before retrying:

1. Move the affected `plugin.md` to a backup location outside `.specdd/plugins/`. Leave its entry in
   `.specdd/plugins.json` unchanged.
2. Rerun the update command. The CLI recreates the missing registered file. If the update fails and the file is still
   missing, restore the backup to its original path.
3. After a successful update, compare the installed file with your backup. Keep project-specific instructions in
   `.specdd/bootstrap.project.md` and personal instructions in `.specdd/bootstrap.local.md` so future updates can
   replace
   the plugin file without overwriting your customizations.

## How plugins load

When your agent reads the project's SpecDD instructions, it loads them in this order:

1. `.specdd/bootstrap.md`
2. Enabled plugins, in registry order
3. `.specdd/bootstrap.project.md`
4. `.specdd/bootstrap.local.md`

Use the project and local bootstrap files to customize how plugins are used in your project.

## Plugin files and registry

The CLI installs each plugin's instruction file at:

```text
.specdd/plugins/<host>/<namespace>/<repository-name>/<pluginname>/plugin.md
```

Here, `<repository-name>` is the repository name without the `.git` suffix. The `<repository>` argument in commands is
the full repository address. For example, installing `dsd` from `@specdd/specdd` creates:

```text
.specdd/plugins/github.com/specdd/specdd/dsd/plugin.md
```

`.specdd/plugins.json` stores registrations as an ordered JSON array. Each registration must contain these four nonempty
string fields:

| Field     | Meaning                                                                             |
|-----------|-------------------------------------------------------------------------------------|
| `src`     | Instruction file path. CLI-generated paths are relative to `plugins.json`.          |
| `origin`  | Repository address followed by `#` and the full resolved commit identifier.         |
| `sig`     | Lowercase SHA-256 checksum of the installed instruction file bytes.                 |
| `version` | Requested tag, branch, or commit string; `latest` when omitted during installation. |

Existing `src` paths can also be absolute or begin with `~` for the user's home directory. Relative paths are resolved
from the directory containing `plugins.json`.

## Publish a plugin

Distribute your plugin through a public or private Git repository accessible over SSH or HTTPS. One repository can
contain several plugins, each in its own directory under `.plugins/`:

```text
.plugins/
`-- <pluginname>/
    |-- plugin.md
    |-- plugin.md.asc
    `-- README.md
```

Replace `<pluginname>` with your plugin's name. Put the agent instructions in `plugin.md`, including when the plugin
applies and what it adds. An optional `README.md` can explain use cases and examples to developers.
The optional `plugin.md.asc` contains a GPG signature; see [Sign your plugin with GPG](#sign-your-plugin-with-gpg).

The CLI installs only the selected `plugin.md`; supporting documentation stays in the source repository. Write
instructions that work from the [installed location](#plugin-files-and-registry). Give users the repository address
and plugin name so they can run the installation command.

For command help, run `specdd plugin --help` or `specdd plugin <command> --help`, replacing `<command>` with `add`,
`list`,
or `update`.

### Sign your plugin with GPG

Signing is optional but recommended. A detached GPG signature lets users verify that `plugin.md` was signed by your key
and has not changed since signing.

You need GnuPG installed and access to your private signing key. Run these commands from the directory containing
`plugin.md`. Replace `SIGNING_KEY_FINGERPRINT` with your key's full fingerprint, which you can find with
`gpg --list-secret-keys --fingerprint`.

1. Create the signature:

   ```bash
   gpg --local-user SIGNING_KEY_FINGERPRINT --armor --detach-sign --output plugin.md.asc plugin.md
   ```

2. Verify the signature against the instruction file:

   ```bash
   gpg --verify plugin.md.asc plugin.md
   ```

   Confirm that GPG reports `Good signature` and the expected signing key.

3. Commit `plugin.md.asc` alongside `plugin.md` in `.plugins/<pluginname>/` and publish both files at the same Git
   revision. Regenerate the signature whenever you change `plugin.md`, and commit both files together.

Publish your public key and its full fingerprint, and link to them from the plugin's `README.md`. You should also
publish
the public key to an independent keyserver such as [keys.openpgp.org](https://keys.openpgp.org/about/usage/) so users
can
retrieve it outside the plugin repository. Users need the public key to verify the signature and should confirm its
fingerprint through a trusted source before accepting it.
