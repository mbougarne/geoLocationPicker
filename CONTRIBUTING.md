# Contributing

Thank you for contributing to `geo-location-picker`. Keep changes focused, preserve the public API unless a change is intentional, and update documentation when user-facing behavior changes.

## Prerequisites

- Node.js 22 or newer
- Corepack-enabled pnpm

The repository pins pnpm in the root `package.json`. Use that version where possible so workspace behavior and lockfile updates stay consistent.

## Set Up Locally

```bash
corepack enable
pnpm install
pnpm prepare
```

Build the package:

```bash
pnpm build
```

Start the local demo application:

```bash
pnpm --filter dev dev
```

The demo is in `dev/` and imports the package through the workspace dependency. Build the library before starting the demo when validating package output or generated declarations.

## Validation

For library changes, run:

```bash
pnpm check
```

The `check` command validates repository policy, runs the package tests, lints the library tests, and builds the library. The `dev/` demo workspace is not part of the package check. To run only the package tests:

```bash
pnpm test
```

Demo checks are optional and can be run separately when changing the local demo:

```bash
pnpm --filter dev lint
pnpm --filter dev build
```

Add focused behavioral tests when introducing behavior that can be tested. Package component tests live in `tests/` and use Vitest with Testing Library; the `dev/` workspace remains a local demo and is not part of the package test suite.

## Making Changes

1. Read the relevant implementation, public types, call sites, and nearby documentation before editing.
2. Prefer the smallest change that fixes the root cause or implements the requested behavior.
3. Follow the existing TypeScript, React, formatting, accessibility, and package-export patterns.
4. Update the README or other documentation for public API or workflow changes.
5. Run the narrowest relevant validation, then review the final diff for unrelated changes.

## Pull Requests

- Explain the user-visible result and the reason for the change.
- Include the validation commands you actually ran and their results.
- Include screenshots or a short reproduction when changing the demo UI.
- Keep unrelated refactors out of the pull request.
- Do not commit generated `dist/` output unless the project maintainers request it.

## Publishing

Publishing is performed by `.github/workflows/publish.yml` using npm CLI Trusted Publishing. The workflow uses npm CLI 11.5.1 or newer for OIDC authentication; pnpm remains the package manager for installation, checks, and builds. Create a version commit and matching tag only after the workflow is merged to `main`:

```bash
pnpm version patch
git push origin main --follow-tags
```

The tag must match the package version exactly, for example `package.json` version `1.0.3` requires tag `v1.0.3`. The workflow runs `pnpm check` before publishing. Existing tags created before the workflow was added do not trigger it retroactively.

## AI-Assisted Changes

All coding agents must follow [AGENTS.md](AGENTS.md) and the detailed rules in [docs/AGENTIC_RULES.md](docs/AGENTIC_RULES.md). These rules apply to human-authored and AI-assisted changes alike.
