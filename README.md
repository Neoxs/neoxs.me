<div align="center">

# neoxs.me

**Enterprise-grade microfrontend portfolio — built to learn, built to ship.**

[![CI](https://github.com/neoxs/neoxs.me/actions/workflows/ci.yml/badge.svg)](https://github.com/neoxs/neoxs.me/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![pnpm](https://img.shields.io/badge/pnpm-10-orange)](https://pnpm.io/)
[![Node](https://img.shields.io/badge/node-%3E%3D22-brightgreen)](https://nodejs.org/)

[Live site](https://neoxs.me) · [Blog MFE](https://neoxs.me/blog) · [Lab MFE](https://neoxs.me/lab)

</div>

---

## Why this repo exists

Most portfolio sites are a single Next.js app deployed to Vercel. This one is different on purpose.

The goal was to simulate the kind of architecture decisions you make at scale: splitting a product into independently deployable **microfrontends**, sharing UI and content through a **monorepo**, automating the full **CI/CD pipeline**, and shipping everything to a real **Kubernetes cluster** — while keeping the codebase approachable enough to walk through end-to-end.

Every layer of the stack was a deliberate learning path:

| Challenge | What I explored |
|-----------|----------------|
| **Microfrontends** | Runtime composition via Nginx routing, independent deployments, framework-agnostic design |
| **Monorepo** | pnpm workspaces + Turborepo, shared packages, remote caching |
| **Multi-framework** | Next.js, Nuxt 3, and Vite/React living side-by-side with a shared `@repo/ui` |
| **CI/CD** | Reusable GitHub Actions workflows, path-based change detection, GHCR image publishing |
| **Kubernetes** | Helm chart with per-environment values, k3s/k3d local testing, cert-manager TLS |
| **Testing** | Vitest unit tests, Storybook component isolation, Playwright E2E across the full stack |

---

## Architecture overview

```
                         ┌──────────────────────────┐
                         │      neoxs.me (Nginx)     │
                         │    Ingress / API Gateway   │
                         └──────────┬───────────────-┘
                                    │
               ┌────────────────────┼───────────────────────┐
               │                    │                       │
       ┌───────▼──────┐   ┌─────────▼──────┐   ┌──────────▼────────┐
       │  shell (/)   │   │ mfe-blog (/blog)│   │  mfe-lab  (/lab)  │
       │   Next.js    │   │    Nuxt 3       │   │   Vite + React    │
       └──────────────┘   └────────────────┘   └───────────────────┘
               │                    │                       │
               └────────────────────┼───────────────────────┘
                                    │  shared packages
                          ┌─────────▼──────────────┐
                          │  @repo/ui  @repo/seo    │
                          │  @repo/content          │
                          └────────────────────────-┘
```

Each microfrontend is:
- **Independently built and containerized** — its own `Dockerfile` and image tag
- **Independently deployable** — Helm templating per MFE, path-based CI change detection
- **Routed at the edge** — Nginx ingress handles path-based routing with security headers

---

## Monorepo structure

```
neoxs.me/
├── apps/
│   ├── shell/          # Main shell — Next.js 16, React 19
│   ├── mfe-blog/       # Blog microfrontend — Nuxt 3 + @nuxt/content
│   ├── mfe-lab/        # Lab/experiments MFE — Vite + React 19
│   ├── mfe-infra/      # Internal dashboard — TanStack Router, Tailwind 4
│   └── e2e/            # End-to-end tests — Playwright
├── packages/
│   ├── ui/             # Shared React component library + Storybook
│   ├── content/        # Typed blog/project content exports
│   ├── seo/            # SEO helpers for Next.js, Nuxt, and React
│   ├── eslint-config/  # Shared ESLint flat configs
│   └── tsconfig/       # Shared TypeScript base configs
├── infra/
│   └── helm/
│       └── neoxs-me/   # Helm chart — Deployments, Services, Ingress
├── docker/
│   └── nginx/          # Local reverse-proxy Dockerfile + nginx.conf
├── .github/
│   └── workflows/      # CI, reusable test/docker workflows, manual deploy
├── docker-compose.yml  # Full local stack for E2E
├── turbo.json          # Turborepo pipeline configuration
└── pnpm-workspace.yaml
```

---

## Tech stack at a glance

| Layer | Technology |
|-------|-----------|
| Package manager | pnpm 10 workspaces |
| Build orchestration | Turborepo (with optional remote cache) |
| Shell app | Next.js 16, React 19 |
| Blog MFE | Nuxt 3, Nitro, `@nuxt/content` |
| Lab MFE | Vite 6, React 19 |
| Infra dashboard | TanStack Router + Start, Tailwind 4 |
| Shared UI | React, Storybook 8, Vitest |
| Linting | ESLint flat config (shared `@repo/eslint-config`) |
| Formatting | Prettier |
| Type checking | TypeScript 5, shared `@repo/tsconfig` |
| Unit tests | Vitest |
| E2E tests | Playwright (Chromium) |
| Containerization | Docker, multi-stage builds |
| Local orchestration | Docker Compose |
| Production orchestration | Kubernetes (k3s/k3d), Helm 3 |
| TLS | cert-manager + Let's Encrypt |
| CI/CD | GitHub Actions (reusable workflows) |
| Container registry | GitHub Container Registry (GHCR) |

---

## Getting started

### Prerequisites

- **Node.js** `>= 22`
- **pnpm** `>= 10` — install with `npm i -g pnpm`
- **Docker** (for the full local stack)

### Install dependencies

```bash
pnpm install
```

### Run all apps in development mode

```bash
pnpm dev
```

Turborepo starts all apps concurrently. Each app's dev server runs on its own port:

| App | URL |
|-----|-----|
| `shell` | http://localhost:3000 |
| `mfe-blog` | http://localhost:3001 |
| `mfe-lab` | http://localhost:3002 |
| `mfe-infra` | http://localhost:3003 |
| Storybook | http://localhost:6006 |

### Run a single app

```bash
pnpm --filter shell dev
pnpm --filter mfe-blog dev
```

### Build everything

```bash
pnpm build
```

### Lint and type-check

```bash
pnpm lint
pnpm check-types
```

### Run unit tests

```bash
pnpm test
```

---

## Local full-stack with Docker Compose

Docker Compose starts all MFEs behind a shared Nginx reverse-proxy — the same routing topology used in production.

```bash
# Build and start the full stack
docker compose up --build

# Open http://localhost  (Nginx routes / → shell, /blog → mfe-blog, /lab → mfe-lab)

# Run E2E tests against the stack
pnpm --filter e2e test:e2e

# Tear down
docker compose down
```

The `docker-compose.yml` is also used by the CI pipeline to run integration tests on every push to `main`.

---

## CI/CD pipeline

```
push / pull_request → main
        │
        ├─ paths-filter (dorny/paths-filter)
        │     Detects which apps changed
        │
        ├─ reusable-test.yml
        │     pnpm install → turbo run test
        │
        └─ (push to main only)
              │
              ├─ reusable-docker.yml  (per changed app)
              │     buildx → push to ghcr.io/neoxs/neoxs-me-<app>:<sha>
              │
              └─ E2E job
                    docker compose build/up → Playwright → compose down


manual trigger (workflow_dispatch)
        │
        └─ deploy.yml
              kubectl + Helm upgrade --install
              namespace: portfolio
              environments: production | staging
```

Reusable workflows (`reusable-test.yml`, `reusable-docker.yml`) are designed to be composable — they can be called from other pipelines with minimal configuration.

---

## Kubernetes deployment

The Helm chart at `infra/helm/neoxs-me/` manages the full production stack.

```bash
# Deploy to production (requires KUBECONFIG secret in GitHub)
# This is triggered via workflow_dispatch in GitHub Actions

# Local dry-run (requires kubectl + helm)
helm template neoxs-me infra/helm/neoxs-me \
  -f infra/helm/neoxs-me/values.yaml \
  --debug
```

### Helm values per environment

| File | Purpose |
|------|---------|
| `values.yaml` | Base defaults (local / dev) |
| `values.prod.yaml` | Production overrides — GHCR images, `neoxs.me` ingress host, TLS via cert-manager |
| `values.staging.yaml` | Staging overrides |

### What the chart manages

- **Deployments** — one per MFE (`shell`, `mfe-blog`, `mfe-lab`, `mfe-infra`)
- **Services** — ClusterIP per deployment
- **Ingress** — path-based routing with `ingress-nginx` + security headers ConfigMap
- **TLS** — cert-manager `Certificate` resource with Let's Encrypt production issuer

---

## Shared packages

### `@repo/ui`

Framework-agnostic React component library consumed by `shell`, `mfe-lab`, and `mfe-infra`. Stories are written in Storybook 8; components are tested with Vitest.

```bash
pnpm --filter @repo/ui storybook   # Start Storybook
pnpm --filter @repo/ui test        # Run component unit tests
```

### `@repo/content`

Typed content exports (blog posts, project writeups) shared across the shell and blog MFE. Content lives as Markdown/MDX under `packages/content/src/`.

### `@repo/seo`

Framework-specific SEO helpers with a shared type contract. Provides adapters for Next.js metadata API, Nuxt `useHead`, and plain React.

### `@repo/eslint-config`

Shared ESLint flat config presets:
- `base` — framework-agnostic TypeScript rules
- `next-js` — Next.js-specific additions
- `react-internal` — for shared packages

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development workflow, commit conventions, and PR guidelines.

---

## License

[MIT](./LICENSE) — Mohamed Abdelkader Kharoubi
