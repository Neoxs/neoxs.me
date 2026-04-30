import type { Meta, StoryObj } from '@storybook/react'
import { Card } from '.'
import { Badge } from '../Badge'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 'var(--space-24)', background: 'var(--color-bg)', maxWidth: '480px' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    meta: '2024 — PRESENT',
    title: 'neoxs.me',
    subtitle: 'Personal site and design system built with Next.js, Turborepo, and custom CSS tokens.',
    tags: (
      <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
        <Badge variant="teal">TypeScript</Badge>
        <Badge variant="gray">Next.js</Badge>
        <Badge variant="gray">Turborepo</Badge>
      </div>
    ),
  },
}

export const Featured: Story = {
  args: {
    featured: true,
    meta: '2023 — 2024',
    title: 'Kubernetes Observability Platform',
    subtitle:
      'End-to-end metrics pipeline ingesting 1M+ events/min using Prometheus, Grafana, and a custom Go exporter.',
    tags: (
      <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
        <Badge variant="teal">Go</Badge>
        <Badge variant="gray">Prometheus</Badge>
        <Badge variant="gray">Grafana</Badge>
        <Badge variant="amber">WIP</Badge>
      </div>
    ),
  },
}

export const Minimal: Story = {
  args: {
    title: 'open-graph-img',
    subtitle: 'Zero-dependency edge function that generates OG images from URL parameters.',
  },
}

export const WithChildren: Story = {
  args: {
    meta: 'LATEST POST',
    title: 'Building a design system with CSS custom properties',
    subtitle: 'How I structured tokens, components, and docs in a Turborepo monorepo.',
    children: (
      <div style={{ marginTop: 'var(--space-12)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-9)', color: 'var(--color-text-3)', letterSpacing: '1px' }}>
        8 MIN READ · APR 2024
      </div>
    ),
  },
}
