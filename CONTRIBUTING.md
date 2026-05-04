# Contributing

Thank you for taking the time to look at this project. While this is primarily a personal portfolio, issues and pull requests are welcome — especially bug reports, suggestions, or discussions about architecture decisions.

---

## Table of contents

- [Prerequisites](#prerequisites)
- [Local setup](#local-setup)
- [Project conventions](#project-conventions)
- [Working with apps and packages](#working-with-apps-and-packages)
- [Testing](#testing)
- [Commit conventions](#commit-conventions)
- [Pull request process](#pull-request-process)

---

## Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| Node.js | `>= 22` | [nodejs.org](https://nodejs.org/) |
| pnpm | `>= 10` | `npm i -g pnpm` |
| Docker | latest | [docs.docker.com](https://docs.docker.com/get-docker/) |

---

## Local setup

```bash
# 1. Fork and clone
git clone https://github.com/<your-fork>/neoxs.me.git
cd neoxs.me

# 2. Install all workspace dependencies
pnpm install

# 3. Start all apps in development mode
pnpm dev
```

Each app runs on its own port. See the [README](./README.md#getting-started) for the full port map.

---

## Project conventions

### TypeScript everywhere

All apps and packages are 100% TypeScript. Avoid `any`; use `unknown` and narrow where needed.

### Shared configs — use them

- **ESLint:** Extend from `@repo/eslint-config` (`base`, `next-js`, `react-internal`). Do not add local overrides unless necessary.
- **tsconfig:** Extend from `@repo/tsconfig`. Use the appropriate base (`base.json`, `nextjs.json`, etc.).
- **Prettier:** Run `pnpm format` from the root before committing. No per-package Prettier configs unless the app absolutely requires it.

### Shared packages — keep them framework-agnostic

`@repo/ui`, `@repo/seo`, and `@repo/content` are consumed by multiple frameworks (Next.js, Nuxt, Vite). When modifying these packages, make sure your changes don't introduce framework-specific dependencies.

### Environment variables

Never commit `.env` files. Use `.env.example` to document required variables. Environment-specific configuration goes in Helm `values.<env>.yaml`.

---

## Working with apps and packages

### Adding a dependency

Always add to the correct workspace package:

```bash
# Add to a specific app
pnpm --filter shell add some-package

# Add to a shared package
pnpm --filter @repo/ui add some-package

# Add a dev dependency to the root
pnpm add -Dw some-dev-tool
```

### Adding a new shared component

1. Create the component in `packages/ui/src/components/`
2. Write a Storybook story alongside it (`*.stories.tsx`)
3. Write a Vitest unit test (`*.test.tsx`)
4. Export it from `packages/ui/src/index.ts`

```bash
# Verify stories render correctly
pnpm --filter @repo/ui storybook

# Run component tests
pnpm --filter @repo/ui test
```

### Updating the Helm chart

Helm templates live in `infra/helm/neoxs-me/templates/`. When adding a new MFE:

1. Add a `<name>-deployment.yaml` and `<name>-service.yaml`
2. Add the corresponding section in `values.yaml`
3. Update `infra/helm/neoxs-me/templates/ingress.yaml` with the new path
4. Do a local dry-run: `helm template neoxs-me infra/helm/neoxs-me -f infra/helm/neoxs-me/values.yaml`

---

## Testing

```bash
# Unit tests (all packages)
pnpm test

# Unit tests for a specific package
pnpm --filter @repo/ui test
pnpm --filter @repo/content test

# E2E tests (requires Docker Compose stack to be running)
docker compose up --build -d
pnpm --filter e2e test:e2e
docker compose down
```

All tests must pass before a PR can be merged. The CI pipeline runs unit tests on every push and E2E tests on every push to `main`.

---

## Commit conventions

This project follows [Conventional Commits](https://www.conventionalcommits.org/).

```
<type>(optional scope): <short description>

[optional body]

[optional footer]
```

Common types:

| Type | Use for |
|------|---------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation changes only |
| `style` | Formatting, no logic change |
| `refactor` | Code restructuring, no behavior change |
| `test` | Adding or updating tests |
| `chore` | Build, CI, tooling changes |
| `infra` | Helm, Kubernetes, Docker changes |

**Examples:**

```
feat(ui): add Button variant 'ghost'
fix(mfe-blog): correct OG image meta tag path
infra: add values.staging.yaml for staging environment
docs: update Helm deployment instructions in README
```

---

## Pull request process

1. **Branch** from `main` using a descriptive name: `feat/dark-mode`, `fix/blog-og-tags`, `infra/staging-values`
2. **Scope your changes** — one concern per PR makes review faster
3. **Ensure CI is green** — lint, type-check, and tests must pass
4. **Fill in the PR template** — describe what changed and why
5. **Link related issues** if applicable (`Closes #42`)

PRs that touch shared packages (`@repo/ui`, `@repo/seo`, `@repo/content`) require extra care — verify all consuming apps still build correctly with `pnpm build`.
