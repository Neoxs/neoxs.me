---
title: 'Hello, World!'
date: '2025-04-01'
description: "Welcome to my blog — a space for thoughts on frontend engineering, distributed systems, and DevOps."
tags: ["meta", "intro"]
readingTime: 3
---

## Why this blog?

I've been meaning to start writing for a while. The kind of problems I work on daily — micro-frontend architectures, Kubernetes deployments, design systems across framework boundaries — rarely get the nuanced treatment they deserve in short-form posts. This is my attempt at longer-form thinking.

## What you'll find here

Mostly technical writing, with a focus on things I've shipped or broken in production:

- Architecture decisions and the trade-offs behind them
- Frontend engineering patterns that scale
- DevOps culture and the gap between theory and practice
- The honest version of "lessons learned"

## The stack behind this post

This blog is itself a good example of what I'll write about. It's a **Nuxt 3 micro-frontend** running inside a Next.js shell app:

```ts
// shell/next.config.ts — routing the request to this Nuxt app
async rewrites() {
  return [
    {
      source: '/blog/:path*',
      destination: 'http://localhost:3002/blog/:path*',
    },
  ]
}
```

The shell proxies `/blog/*` at runtime. No module federation, no shared bundle — just HTTP routing. Each app is independently deployable.

## Why markdown?

Content as code. Every post lives in `content/blog/` as a `.md` file, versioned in git alongside the app. `@nuxt/content` handles parsing, syntax highlighting via Shiki, and table of contents generation automatically.

For code-heavy posts (most of what I write), this is the right trade-off:

| Approach | Pros | Cons |
| --- | --- | --- |
| CMS (Contentful, Sanity) | Rich editor, non-technical authors | Overkill for a solo blog |
| MDX | Full React in content | Tight coupling to React |
| Markdown + @nuxt/content | Simple, portable, version-controlled | No rich editor |

## Coming soon

A few posts in progress:

- Deep dive into the MFE architecture powering this site
- Design system in a multi-framework monorepo
- GitOps patterns for personal infrastructure
- Kubernetes the hard way (for a personal cluster)
