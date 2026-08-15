# Repository Agent Rules

These are mandatory instructions for any coding agent working in this repository, regardless of model, editor, or machine.

Before changing files:

1. Read [docs/AGENTIC_RULES.md](docs/AGENTIC_RULES.md).
2. Inspect the relevant implementation, public types, call sites, configuration, and nearby tests or documentation.
3. Form a concrete hypothesis about the behavior being changed and identify a focused validation that could disprove it.

While working:

- Prefer the smallest safe change that fixes the root cause.
- Follow existing architecture, naming, formatting, libraries, and public API boundaries.
- Do not invent APIs, files, dependencies, behavior, or verification results.
- Preserve type safety and security controls. Treat external and user-controlled input as untrusted.
- Add or update focused behavioral tests when behavior changes and when practical.
- Do not leave dead code, speculative abstractions, unrelated cleanup, or unnecessary TODOs.
- Do not disable checks or weaken safeguards to make a change pass.
- Preserve unrelated user changes. Do not reset, revert, commit, or create branches unless explicitly requested.

After editing:

- Run the narrowest relevant executable validation before expanding the change.
- Run broader typecheck, lint, build, or test checks when the affected surface justifies them.
- Review the final diff and report only validation that was actually performed.

For reviews, report concrete findings first, ordered by severity, followed by assumptions, test gaps, and a concise summary.
