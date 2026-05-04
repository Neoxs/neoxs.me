# shell

The main shell application for [neoxs.me](https://neoxs.me). Built with **Next.js 16** and **React 19**, it serves as the entry point and orchestrator of the microfrontend architecture.

## Role in the architecture

```
Browser → Nginx (/)
              └─→ shell (Next.js)   ← this app
                   /projects/*
```

The shell owns the primary domain (`/`) and all routes that don't belong to another MFE. Nginx routes `/blog` and `/lab` to their respective microfrontends; everything else lands here.

## What's inside

| Path | Description |
|------|-------------|
| `app/page.tsx` | Home page — hero, about, featured projects |
| `app/projects/` | Project listing and `[slug]` detail pages |
| `app/api/` | Next.js API routes |
| `app/sitemap.ts` | Dynamic XML sitemap |
| `app/robots.ts` | `robots.txt` generation |
| `app/layout.tsx` | Root layout — fonts, global styles, `@repo/seo` metadata |

## Stack

- **Next.js 16** (webpack mode, App Router)
- **React 19** with React Compiler (`babel-plugin-react-compiler`)
- **`@repo/ui`** — shared component library
- **`@repo/content`** — typed blog and project data
- **`@repo/seo`** — Next.js metadata helpers
- **`next-mdx-remote`** — renders MDX content from `@repo/content`

## Local development

> Run from the **monorepo root** unless you need to isolate this app.

```bash
# All apps together (recommended)
pnpm dev

# This app only
pnpm --filter shell dev
```

Runs on **http://localhost:3000**.

## Build

```bash
pnpm --filter shell build
pnpm --filter shell start
```

## Lint & type-check

```bash
pnpm --filter shell lint
pnpm --filter shell typecheck
```

## Docker

```bash
# Build the image
docker build -t shell ./apps/shell

# Or via Docker Compose (all MFEs + Nginx)
docker compose up --build
```

## Environment variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Port the Next.js server listens on | `3000` |

Create a `.env.local` file at the app root for local overrides. Never commit `.env` files.
