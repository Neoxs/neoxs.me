import type { Meta, StoryObj } from '@storybook/react'
import { SectionHeader } from '../components/SectionHeader'
import { PostCard } from '../components/PostCard'

const meta: Meta = {
  title: 'Pages/Blog',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj

const posts = [
  {
    slug:        'react-server-components-data-patterns',
    title:       'React Server Components: data-fetching patterns that actually scale',
    description:
      "After migrating three production apps to the Next.js App Router I've catalogued the patterns that hold up under load — parallel routes, streaming boundaries, and cache strategies that survive a traffic spike.",
    date:        'Apr 18, 2026',
    readingTime: 11,
    tags:        ['React', 'Next.js', 'Architecture', 'RSC'],
  },
  {
    slug:        'kubernetes-zero-downtime-deploys',
    title:       'Zero-downtime deploys on a $20/mo k3s cluster',
    description:
      `Rolling updates, PodDisruptionBudgets, and a readiness gate that waits for the DB migration to finish — here's the exact Helm chart config that eliminated the "502 during deploy" problem.`,
    date:        'Mar 7, 2026',
    readingTime: 8,
    tags:        ['Kubernetes', 'DevOps', 'Helm', 'CI/CD'],
  },
  {
    slug:        'design-tokens-turborepo',
    title:       'Scaling a design system across apps with Turborepo and CSS custom properties',
    description:
      'How a flat token file, a small build script, and strict import rules let a two-person team ship consistent UI across four Next.js apps without a single pixel of drift.',
    date:        'Jan 29, 2026',
    readingTime: 6,
    tags:        ['Design System', 'TypeScript', 'CSS', 'Architecture'],
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
        label="// WRITING"
        title="Latest articles"
        meta={`${posts.length} posts`}
      />

      <div>
        {posts.map((post) => (
          <PostCard
            key={post.slug}
            {...post}
            onClick={(slug) => console.log('navigate to', slug)}
          />
        ))}
      </div>
    </div>
  ),
}
