import type { Meta, StoryObj } from '@storybook/react'
import { SectionHeader } from '../components/SectionHeader'
import { SkillsGrid } from '../components/SkillsGrid'

const meta: Meta = {
  title: 'Pages/Stack',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj

const categories = [
  {
    label: 'FRONTEND',
    skills: [
      'React 19',
      'TypeScript 5',
      'Next.js 15 (App Router)',
      'CSS Modules / CSS vars',
      'Framer Motion',
      'Storybook 8',
    ],
  },
  {
    label: 'ARCHITECTURE',
    skills: [
      'Turborepo monorepo',
      'Design-system tokens',
      'Server Components / RSC',
      'Edge middleware',
      'ISR + on-demand revalidation',
      'API route handlers',
    ],
  },
  {
    label: 'DEVOPS',
    skills: [
      'Kubernetes (k3s)',
      'Terraform',
      'GitHub Actions CI/CD',
      'Vercel + custom infra',
      'Prometheus + Grafana',
      'Sentry error tracking',
    ],
  },
  {
    label: 'BACKEND',
    skills: [
      'Node.js / Hono',
      'PostgreSQL + Drizzle ORM',
      'Redis (BullMQ)',
      'tRPC',
      'OpenTelemetry traces',
      'S3-compatible object storage',
    ],
  },
]

export const Default: Story = {
  render: () => (
    <div
      style={{
        background: 'var(--color-bg)',
        padding:    'var(--space-80) var(--space-40)',
        maxWidth:   '1100px',
        margin:     '0 auto',
      }}
    >
      <SectionHeader
        label="// STACK"
        title="Tools & expertise"
        meta="updated Apr 2026"
      />
      <SkillsGrid categories={categories} />
    </div>
  ),
}
