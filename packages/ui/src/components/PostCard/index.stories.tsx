import type { Meta, StoryObj } from '@storybook/react'
import { PostCard } from '.'

const meta: Meta<typeof PostCard> = {
  title: 'Components/PostCard',
  component: PostCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 'var(--space-24)', background: 'var(--color-bg)', maxWidth: '720px' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof PostCard>

export const Default: Story = {
  args: {
    slug:        'zero-downtime-deploys-kubernetes',
    title:       'Zero-downtime deploys on Kubernetes with rolling updates and PodDisruptionBudgets',
    description: 'A practical guide to shipping code without dropping requests. Covers rolling update strategies, readiness gates, PodDisruptionBudgets, and how to verify your rollout with kubectl rollout status.',
    date:        '2026-04-12',
    readingTime: 8,
    tags:        ['kubernetes', 'devops', 'reliability'],
    onClick:     (slug) => console.log('navigate to', slug),
  },
}

export const Clickable: Story = {
  args: {
    slug:        'turborepo-remote-cache-self-hosted',
    title:       'Self-hosting Turborepo Remote Cache with Cloudflare R2',
    description: 'Cut CI times by 70% without paying for Vercel. Step-by-step setup of ducktape-cache on a single Fly.io machine backed by an R2 bucket, with signed artifact URLs and team token auth.',
    date:        '2026-03-28',
    readingTime: 6,
    tags:        ['turborepo', 'monorepo', 'ci', 'cloudflare'],
    onClick:     (slug) => console.log('navigate to', slug),
  },
}

export const LongRead: Story = {
  args: {
    slug:        'distributed-tracing-opentelemetry',
    title:       'Distributed tracing from scratch: OpenTelemetry, Tempo, and Grafana in a Next.js monorepo',
    description: 'End-to-end observability for a multi-app Turborepo. We instrument every HTTP request and background job with OTEL spans, ship traces to Grafana Tempo via the OTLP exporter, and query them in dashboards alongside logs and metrics.',
    date:        '2026-02-14',
    readingTime: 18,
    tags:        ['opentelemetry', 'observability', 'grafana', 'nextjs'],
    onClick:     (slug) => console.log('navigate to', slug),
  },
}

export const NoClickHandler: Story = {
  args: {
    slug:        'css-custom-properties-design-tokens',
    title:       'Using CSS custom properties as design tokens across a Turborepo UI package',
    description: 'How to define a single source of truth for spacing, colour, and typography in a shared @repo/ui package and consume it in every app without a build step.',
    date:        '2026-01-05',
    readingTime: 5,
    tags:        ['css', 'design-system', 'turborepo'],
  },
}
