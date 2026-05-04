# mfe-blog

The blog microfrontend for [neoxs.me/blog](https://neoxs.me/blog). Built with **Nuxt 3** and served under the `/blog` path by the Nginx ingress — making it the only Vue-based app in an otherwise React-dominated monorepo, which is exactly the point.

## Role in the architecture

```
Browser → Nginx (/blog)
              └─→ mfe-blog (Nuxt 3)   ← this app
```

Running a Vue framework alongside Next.js and Vite/React apps demonstrates that microfrontend routing is framework-agnostic. Each MFE is a fully independent process; they share only `@repo/ui` and `@repo/seo` via the monorepo — no runtime coupling.

## What's inside

| Path | Description |
|------|-------------|
| `pages/` | File-based Nuxt pages (`index`, `[slug]`) |
| `content/blog/` | Markdown blog posts rendered by `@nuxt/content` |
| `components/` | Vue components local to this MFE |
| `assets/` | Static assets, global styles |
| `nuxt.config.ts` | Nuxt configuration — modules, runtime config |
| `app.vue` | Root app component |

## Stack

- **Nuxt 3** + **Nitro** (SSR / static rendering)
- **`@nuxt/content` v2** — file-based Markdown/MDX CMS
- **Mermaid 11** — renders architecture and flow diagrams in blog posts
- **`@repo/seo`** — Nuxt-specific `useHead` SEO helpers
- **`@repo/ui`** — shared React → Vue cross-framework components (via the shared package)

## Local development

> Run from the **monorepo root** unless you need to isolate this app.

```bash
# All apps together (recommended)
pnpm dev

# This app only
pnpm --filter mfe-blog dev
```

Runs on **http://localhost:3002**.

> **Note:** In isolation, the app runs at `localhost:3002`. When running the full Docker Compose stack, it is accessible at `http://localhost/blog` via the Nginx reverse-proxy.

## Build

```bash
pnpm --filter mfe-blog build

# Preview the production build locally
pnpm --filter mfe-blog preview
```

The Nitro server output lands in `.output/`. The production start command is:

```bash
node .output/server/index.mjs
```

## Lint & type-check

```bash
pnpm --filter mfe-blog lint
pnpm --filter mfe-blog typecheck
```

## Docker

```bash
docker build -t mfe-blog ./apps/mfe-blog

# Or via Docker Compose (full stack)
docker compose up --build
```

## Writing blog posts

Add a new Markdown file to `content/blog/`:

```
content/
└── blog/
    └── my-new-post.md
```

Frontmatter fields:

```yaml
---
title: "My post title"
description: "Short description for SEO"
date: "2024-01-15"
tags: ["microfrontends", "nuxt"]
---
```

`@nuxt/content` picks up the file automatically — no manual registration needed.
