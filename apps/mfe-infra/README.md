# mfe-infra

The infrastructure dashboard microfrontend for [neoxs.me/infra](https://neoxs.me/infra). Built with **Vite 8**, **React 19**, **TanStack Router**, and **Tailwind CSS 4**.

## Role in the architecture

```
Browser → Nginx (/infra)
              └─→ mfe-infra (Vite + TanStack Router)   ← this app
```

This MFE was built to explore the [TanStack](https://tanstack.com/) ecosystem — specifically TanStack Router's type-safe file-based routing and its approach to data loading via `loader` functions. It also experiments with **Tailwind CSS v4's** new Vite plugin API.

## What's inside

| Path | Description |
|------|-------------|
| `src/routes/__root.tsx` | Root layout — shell component, navigation |
| `src/routes/index.tsx` | Dashboard home route |
| `src/routes/index.test.tsx` | Vitest unit test for the index route |
| `vite.config.ts` | Vite config with TanStack Router plugin, Tailwind, React |
| `prettier.config.js` | TanStack-style Prettier config |
| `eslint.config.js` | `@tanstack/eslint-config` preset |

## Stack

- **Vite 8** + **`@vitejs/plugin-react`**
- **React 19**
- **TanStack Router** — type-safe file-based routing, `loader` functions
- **Tailwind CSS 4** (Vite plugin, `@tailwindcss/typography`)
- **Vitest 3** + **Testing Library** — unit and component testing
- **Lucide React** — icon set
- **`@repo/ui`** — shared component library
- **`@repo/seo`** — React SEO helpers

## Local development

> Run from the **monorepo root** unless you need to isolate this app.

```bash
# All apps together (recommended)
pnpm dev

# This app only
pnpm --filter mfe-infra dev
```

Runs on **http://localhost:3000** (or whichever port Vite assigns in isolation).

> **Note:** In the full Docker Compose stack it is accessible at `http://localhost/infra/` via Nginx.

## Build

```bash
pnpm --filter mfe-infra build
pnpm --filter mfe-infra preview
```

## Test

```bash
pnpm --filter mfe-infra test
```

Vitest runs in node mode. Testing Library is used for component-level assertions.

## Lint & format

```bash
# Lint
pnpm --filter mfe-infra lint

# Format with Prettier + auto-fix ESLint
pnpm --filter mfe-infra format

# Check formatting without writing
pnpm --filter mfe-infra check
```

This app uses `@tanstack/eslint-config` and `@tanstack/prettier-config` — different from the rest of the monorepo — to evaluate TanStack's opinionated tooling setup.

## Adding a route

TanStack Router uses file-based routing. Create a file under `src/routes/`:

```bash
src/routes/my-page.tsx
```

The router plugin auto-generates the route tree. Use the `createFileRoute` factory:

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/my-page')({
  component: MyPage,
})

function MyPage() {
  return <div>My Page</div>
}
```

## Docker

```bash
docker build -t mfe-infra ./apps/mfe-infra

# Or via Docker Compose (full stack)
docker compose up --build
```
