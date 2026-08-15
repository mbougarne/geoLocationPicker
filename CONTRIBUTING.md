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

The `check` command validates repository policy, lints the library and demo, builds the library, and builds the demo. To run only the demo checks:

```bash
pnpm --filter dev lint
pnpm --filter dev build
```

There is currently no test runner configured in the repository. Add focused behavioral tests when introducing behavior that can be tested, and do not claim tests passed unless a test command has been added and run.

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

## AI-Assisted Changes

All coding agents must follow [AGENTS.md](AGENTS.md) and the detailed rules in [docs/AGENTIC_RULES.md](docs/AGENTIC_RULES.md). These rules apply to human-authored and AI-assisted changes alike.
