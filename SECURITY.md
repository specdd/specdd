# Security

## Before Using SpecDD With an AI Agent

We do our best to keep SpecDD release files secure and verifiable. Each release artifact is signed so users can confirm
that the downloaded zip was produced by the SpecDD project and has not been changed after signing.

For best results, always download SpecDD release files from the official GitHub Releases page:

```text
https://github.com/specdd/specdd/releases
```

After verifying the GPG signature, we also recommend reviewing the files before copying them into a project or asking an
AI agent to follow them. In particular, inspect:

- `src/.specdd/bootstrap.md`
- `src/.specdd/bootstrap.project.md`
- `src/AGENTS.md`
- `src/CLAUDE.md`
- any other agent-facing instructions or code files included in the release

Bootstrap files and agent instruction files are intended to guide AI tooling, so it is worth reading them the same way
you would review any other project configuration before adoption. Check that the instructions match your expectations
and fit the boundaries of your project.

## Release Signing

SpecDD release artifacts are signed with a dedicated release signing key.

Current release signing key:

```text
Fingerprint: FD87 3132 56E0 8C48 6951  F909 1372 D385 6911 6BC5
Key ID:      FD87313256E08C486951F9091372D38569116BC5
UID:         SpecDD (This key is used to sign SpecDD releases) <hello@specdd.ai>
```

The public key is committed to this repository at:

```text
.gpg/code-signing-2026.01.gpg
```

The key is also published to these OpenPGP keyservers:

```sh
gpg --keyserver hkps://keys.openpgp.org --recv-keys FD87313256E08C486951F9091372D38569116BC5
gpg --keyserver hkps://keyserver.ubuntu.com --recv-keys FD87313256E08C486951F9091372D38569116BC5
gpg --keyserver hkps://pgp.mit.edu --recv-keys FD87313256E08C486951F9091372D38569116BC5
gpg --keyserver hkps://openpgp.circl.lu --recv-keys FD87313256E08C486951F9091372D38569116BC5
```

Always compare the fingerprint before trusting the key.

## Release Artifacts

Each GitHub release includes:

- `specdd.zip`: the packaged contents of `src/`
- `specdd.zip.asc`: a detached ASCII-armored GPG signature for `specdd.zip`

The signature proves that the zip file was signed by the SpecDD release signing key and has not been modified since it
was signed.

## Verifying a Release

Download both release files from the same GitHub release:

```text
specdd.zip
specdd.zip.asc
```

Then verify the signature with GPG.

### Option 1: Fetch the Key From a Keyserver

Fetch the public key from a keyserver, confirm the fingerprint, and verify the release:

```sh
gpg --keyserver hkps://keys.openpgp.org --recv-keys FD87313256E08C486951F9091372D38569116BC5
gpg --fingerprint FD87313256E08C486951F9091372D38569116BC5
gpg --verify specdd.zip.asc specdd.zip
```

Only trust the verification result if the fingerprint matches:

```text
FD87 3132 56E0 8C48 6951  F909 1372 D385 6911 6BC5
```

If one keyserver is unavailable, use another published keyserver:

```sh
gpg --keyserver hkps://keyserver.ubuntu.com --recv-keys FD87313256E08C486951F9091372D38569116BC5
gpg --keyserver hkps://pgp.mit.edu --recv-keys FD87313256E08C486951F9091372D38569116BC5
gpg --keyserver hkps://openpgp.circl.lu --recv-keys FD87313256E08C486951F9091372D38569116BC5
```

### Option 2: Verify With the Repository Public Key

From a checkout of this repository:

```sh
gpg --import .gpg/code-signing-2026.01.gpg
gpg --verify specdd.zip.asc specdd.zip
```

Expected result:

```text
Good signature from "SpecDD (This key is used to sign SpecDD releases) <hello@specdd.ai>"
Primary key fingerprint: FD87 3132 56E0 8C48 6951  F909 1372 D385 6911 6BC5
```

GPG may also print a warning that the key is not certified with a trusted signature. That warning means you have not
personally marked the key as trusted in your local GPG keyring. The release signature is still valid if the fingerprint
matches the expected SpecDD release signing key.

### Option 3: Verify With a Temporary GPG Keyring

This avoids importing the key into your normal GPG keyring:

```sh
tmp_gnupg="$(mktemp -d)"
chmod 700 "$tmp_gnupg"
gpg --homedir "$tmp_gnupg" --import .gpg/code-signing-2026.01.gpg
gpg --homedir "$tmp_gnupg" --verify specdd.zip.asc specdd.zip
rm -rf "$tmp_gnupg"
```

Check that the output reports a good signature and shows this fingerprint:

```text
FD87 3132 56E0 8C48 6951  F909 1372 D385 6911 6BC5
```

## Maintainer Signing Process

Maintainers create signed release artifacts with:

```sh
make build
```

The build target:

1. Confirms `.gpg/code-signing-2026.01.gpg` contains the configured release signing key.
2. Packages the contents of `src/` as `build/specdd.zip`.
3. Creates a detached signature at `build/specdd.zip.asc`.
4. Verifies the generated signature against a temporary GPG keyring that imports only `.gpg/code-signing-2026.01.gpg`.

The generated `specdd.zip` and `specdd.zip.asc` files are then uploaded to the matching GitHub release.
