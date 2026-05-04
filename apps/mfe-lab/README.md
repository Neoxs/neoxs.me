# mfe-lab

The lab microfrontend for [neoxs.me/lab](https://neoxs.me/lab). Built with **Vite 8** and **React 19**, it serves as an interactive component playground and experiments showcase.

## Role in the architecture

```
Browser → Nginx (/lab)
              └─→ mfe-lab (Vite + React)   ← this app
```

This is the lightest MFE in the stack — a pure client-side Vite app. It demonstrates that microfrontends don't have to be heavy server-rendered applications; a simple SPA integrates just as cleanly into the routing layer.

## What's inside

| Path | Description |
|------|-------------|
| `src/App.tsx` | Root component — the lab shell/layout |
| `src/main.tsx` | Vite entry point |
| `nginx.conf` | Nginx config used in the Docker image for client-side routing (`try_files`) |

## Stack

- **Vite 8** + **`@vitejs/plugin-react`**
- **React 19**
- **TypeScript 5**
- **`@repo/ui`** — shared component library
- **`@repo/seo`** — React SEO helpers

## Local development

> Run from the **monorepo root** unless you need to isolate this app.

```bash
# All apps together (recommended)
pnpm dev

# This app only
pnpm --filter mfe-lab dev
```

Runs on **http://localhost:3003**.

> **Note:** In isolation, the app runs at `localhost:3003`. In the full Docker Compose stack it is accessible at `http://localhost/lab/` via Nginx.

## Build

```bash
pnpm --filter mfe-lab build

# Preview the production build
pnpm --filter mfe-lab preview
```

Output lands in `dist/`.

## Lint & type-check

```bash
pnpm --filter mfe-lab lint
pnpm --filter mfe-lab typecheck
```

## Docker

The `Dockerfile` serves the Vite `dist/` via an Nginx container. The bundled `nginx.conf` handles the `try_files` fallback needed for client-side routing.

```bash
docker build -t mfe-lab ./apps/mfe-lab

# Or via Docker Compose (full stack)
docker compose up --build
```
