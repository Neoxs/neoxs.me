# Security policy

## Supported versions

This is a personal portfolio project. Security fixes are applied to the `main` branch only.

| Branch | Supported |
|--------|-----------|
| `main` | Yes |

## Reporting a vulnerability

Please **do not** open a public GitHub issue for security vulnerabilities.

Instead, send a description of the issue to **y.abdelkaderkharoubi@gmail.com** with the subject line `[SECURITY] neoxs.me`.

Include:

- A description of the vulnerability and its potential impact
- Steps to reproduce the issue
- Any relevant logs, screenshots, or proof-of-concept code

I will acknowledge your report within **72 hours** and aim to resolve confirmed vulnerabilities within **14 days**.

## Scope

Security reports are relevant for:

- The deployed site at `neoxs.me`
- The Docker images published to GHCR (`ghcr.io/neoxs/neoxs-me-*`)
- The Helm chart and Kubernetes configuration in `infra/`

Reports about third-party dependencies should be filed directly with those projects (or via `pnpm audit`).
