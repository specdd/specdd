# Security

## Before using SpecDD with an AI agent

The [official SpecDD CLI](./TOOLS.md#specdd-cli) automatically verifies the GPG signature of downloaded framework releases
during `specdd init` and `specdd update`, before installing their files. It also verifies every
[official framework plugin](./PLUGINS.md#official-plugins) during `specdd plugin add` and `specdd plugin update`, before
installing its instruction file. These checks use trusted SpecDD public keys bundled with the CLI and do not require
a separate GPG installation.

If you download release files manually, use the
[official GitHub Releases page](https://github.com/specdd/specdd/releases) and
[verify the release manually](#verify-a-release-manually) before copying its contents into a project.

For either method, review the files before asking an AI agent to follow their instructions. For manual installations,
review the extracted files before copying them into your project. In particular, inspect:

- `.specdd/bootstrap.md`
- `.specdd/bootstrap.project.md`
- `AGENTS.md`
- `CLAUDE.md`
- Any other agent-facing instructions or code files included in the release

These paths are relative to the project root after CLI installation or to the extracted archive's root. In a repository
checkout, the files are under `src/`.

Also review enabled plugin instruction files before asking an agent to use them. Their `src` paths are recorded in
`.specdd/plugins.json`; see [Plugin files and registry](./PLUGINS.md#plugin-files-and-registry).

Bootstrap, plugin, and other agent instruction files guide how AI agents work in your project. Check that the
instructions match your expectations and fit the boundaries of your project.

## Release artifacts

Each GitHub release includes:

- `specdd.zip`: the packaged contents of `src/`
- `specdd.zip.asc`: a detached ASCII-armored GPG signature for `specdd.zip`

A successful signature check with the SpecDD release signing key confirms that the archive was signed by that key and
has not been modified since signing.

## Plugin signatures

Each signed framework plugin has two files in its source repository:

- `.plugins/<pluginname>/plugin.md`: the plugin's agent instructions.
- `.plugins/<pluginname>/plugin.md.asc`: a detached ASCII-armored GPG signature for that instruction file.

Official plugins from `@specdd/specdd` are always signed with SpecDD keys and always verified by the CLI before
installation or update. A missing or invalid signature, or a signature from a key the CLI does not trust, prevents
installation of that plugin. The instruction file and signature must come from the same repository revision.

Signing third-party plugins is optional but recommended. Publishers use their own signing keys and should publish
their public keys and full fingerprints, including on an independent keyserver such as
[keys.openpgp.org](https://keys.openpgp.org/about/usage/). See [Verify a plugin manually](#verify-a-plugin-manually) before
using a signed third-party plugin, and [Sign your plugin with GPG](./PLUGINS.md#sign-your-plugin-with-gpg) for publishing
instructions.

The `sig` field in `.specdd/plugins.json` stores a SHA-256 checksum that the CLI uses to detect local changes before
replacing an installed plugin. This checksum does not authenticate the publisher or replace GPG signature verification.

## SpecDD signing key

SpecDD signs release archives and official plugin instruction files with a dedicated key. Its fingerprint and user ID
are:

```text
Fingerprint: FD87 3132 56E0 8C48 6951  F909 1372 D385 6911 6BC5
User ID:     SpecDD (This key is used to sign SpecDD releases) <hello@specdd.ai>
```

The public key is stored in this repository at `.gpg/code-signing-2026.01.gpg`. When verifying manually, compare the
signing key's fingerprint with the value above before accepting a verification result.

## Verify a release manually

Use these steps for manual downloads or to independently verify a release. You need GnuPG installed so the `gpg` command
is available. The examples below use a Unix-like shell.

1. Download `specdd.zip` and `specdd.zip.asc` from the same
   [official GitHub release](https://github.com/specdd/specdd/releases).
2. Verify the signature using one of the three methods below. Each method states where to place the downloaded files
   and run the commands.
3. [Check the verification result](#check-the-verification-result) before using the archive.

### Option 1: Fetch the key from a keyserver

Use this method to obtain the public key over the network. It adds the key to your normal GPG keyring.

From the directory containing both downloaded files, fetch the key:

```sh
gpg --keyserver hkps://keys.openpgp.org --recv-keys FD87313256E08C486951F9091372D38569116BC5
```

If that keyserver is unavailable, rerun the command with `hkps://keys.openpgp.org` replaced by one of these alternatives:

- `hkps://keyserver.ubuntu.com`
- `hkps://pgp.mit.edu`
- `hkps://openpgp.circl.lu`

Display the key's fingerprint and verify the archive:

```sh
gpg --fingerprint FD87313256E08C486951F9091372D38569116BC5
gpg --verify specdd.zip.asc specdd.zip
```

### Option 2: Verify with the repository public key

Use this method if you have a checkout of this repository and want to import its public key into your normal GPG
keyring. Place both downloaded files in the checkout's root directory, alongside `Makefile`, and run:

```sh
gpg --import .gpg/code-signing-2026.01.gpg
gpg --verify specdd.zip.asc specdd.zip
```

### Option 3: Verify with a temporary GPG keyring

Use this method if you have a repository checkout and want to keep the key separate from your normal GPG keyring.
Place both downloaded files in the checkout's root directory, alongside `Makefile`, and run the following block. It
requires `mktemp`, `chmod`, and `rm` in addition to GPG, and removes the temporary keyring when the block exits, including
if verification fails.

```sh
(
    set -e
    tmp_gnupg="$(mktemp -d)"
    trap 'rm -rf "$tmp_gnupg"' EXIT
    chmod 700 "$tmp_gnupg"
    gpg --homedir "$tmp_gnupg" --import .gpg/code-signing-2026.01.gpg
    gpg --homedir "$tmp_gnupg" --verify specdd.zip.asc specdd.zip
)
```

### Check the verification result

For all three methods, accept the release only if GPG verification succeeds and the signing key's fingerprint matches
the SpecDD release signing key. The relevant output may look like this excerpt:

```text
gpg: Good signature from "SpecDD (This key is used to sign SpecDD releases) <hello@specdd.ai>"
Primary key fingerprint: FD87 3132 56E0 8C48 6951  F909 1372 D385 6911 6BC5
```

GPG may also warn that the key is not certified with a trusted signature. This means GPG has not established that the
key belongs to its claimed owner through its trust model. You can accept the release if the signature check succeeds
and you have confirmed that the signing key's fingerprint matches the expected fingerprint above. See
[GnuPG's signature verification guidance](https://gnupg.org/download/integrity_check.html) for more detail.

If verification fails or the fingerprint differs, do not use the archive. Check that both files came from the same
release and that you obtained the expected public key, then retry verification.

## Verify a plugin manually

Use these steps for a signed third-party plugin or to independently verify an official plugin. You need GnuPG installed.

1. Obtain `plugin.md` and `plugin.md.asc` from the same `.plugins/<pluginname>/` directory at the same repository
   revision. Save both files unchanged in one directory and run the following commands there.
2. Obtain the publisher's public key and confirm its full fingerprint through a trusted source. For official plugins,
   use the [SpecDD signing key](#specdd-signing-key), available in this repository at `.gpg/code-signing-2026.01.gpg` or
   through the [keyserver command above](#option-1-fetch-the-key-from-a-keyserver). If you downloaded a public key file,
   import it with the following command, replacing `PUBLIC_KEY_FILE` with its path:

   ```sh
   gpg --import PUBLIC_KEY_FILE
   ```

3. Display the imported key's fingerprint and verify the instruction file. Replace `SIGNING_KEY_FINGERPRINT` with the
   publisher's expected full fingerprint:

   ```sh
   gpg --fingerprint SIGNING_KEY_FINGERPRINT
   gpg --verify plugin.md.asc plugin.md
   ```

4. Accept the plugin only if verification succeeds and the signature's signing key matches the expected fingerprint.
   For official plugins, apply the [verification result checks above](#check-the-verification-result). If verification
   fails, check that both files came from the same revision and that you obtained the expected public key, then retry.

## Maintainer signing process

### Sign release archives

To sign a release, you need `make`, `zip`, GnuPG, and access to the private key corresponding to the release signing
fingerprint above. From the repository root, run the following command. It replaces any existing `build/specdd.zip` and
`build/specdd.zip.asc` files.

```sh
make build
```

The build target:

1. Confirms `.gpg/code-signing-2026.01.gpg` contains the configured release signing key.
2. Packages the contents of `src/` as `build/specdd.zip`.
3. Creates a detached signature at `build/specdd.zip.asc`.
4. Verifies the generated signature against a temporary GPG keyring that imports only `.gpg/code-signing-2026.01.gpg`.

After the build succeeds, upload `build/specdd.zip` and `build/specdd.zip.asc` to the matching GitHub release.

### Sign official plugins

You need `make`, GnuPG, and access to the private key corresponding to the SpecDD signing fingerprint above. From the
repository root, run:

```sh
make sign-plugins
```

The target confirms that `.gpg/code-signing-2026.01.gpg` contains the configured signing key, then creates or replaces
`.plugins/dsd/plugin.md.asc` and `.plugins/ssg/plugin.md.asc` using the same key as release archives.

[Verify each plugin signature](#verify-a-plugin-manually) before publishing. Regenerate the signature whenever you edit
`plugin.md`, and commit the instruction file and its signature together at the same revision.
