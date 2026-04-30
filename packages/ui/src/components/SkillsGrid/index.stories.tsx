import type { Meta, StoryObj } from '@storybook/react'
import { SkillsGrid } from '.'

const meta: Meta<typeof SkillsGrid> = {
  title: 'Components/SkillsGrid',
  component: SkillsGrid,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 'var(--space-24)', background: 'var(--color-bg)' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SkillsGrid>

export const Default: Story = {
  args: {
    categories: [
      {
        label: 'LANGUAGES',
        skills: ['TypeScript', 'JavaScript', 'Python', 'CSS', 'HTML'],
      },
      {
        label: 'FRAMEWORKS',
        skills: ['React', 'Next.js', 'Node.js', 'Fastify', 'Turborepo'],
      },
      {
        label: 'TOOLING',
        skills: ['Vite', 'ESBuild', 'Storybook', 'Vitest', 'Playwright'],
      },
    ],
  },
}

export const TwoColumns: Story = {
  args: {
    categories: [
      {
        label: 'FRONTEND',
        skills: ['React', 'Next.js', 'CSS Variables', 'Framer Motion', 'Radix UI'],
      },
      {
        label: 'BACKEND',
        skills: ['Node.js', 'PostgreSQL', 'Redis', 'REST APIs', 'GraphQL'],
      },
    ],
  },
}

export const SingleColumn: Story = {
  args: {
    categories: [
      {
        label: 'DESIGN',
        skills: ['Figma', 'Design Systems', 'Typography', 'Color Theory', 'Prototyping'],
      },
    ],
  },
}

export const FourColumns: Story = {
  args: {
    categories: [
      {
        label: 'LANGUAGES',
        skills: ['TypeScript', 'Python', 'Rust', 'SQL'],
      },
      {
        label: 'FRAMEWORKS',
        skills: ['React', 'Next.js', 'FastAPI', 'Axum'],
      },
      {
        label: 'INFRA',
        skills: ['Docker', 'Vercel', 'Fly.io', 'GitHub Actions'],
      },
      {
        label: 'DESIGN',
        skills: ['Figma', 'Storybook', 'CSS Variables', 'Motion'],
      },
    ],
  },
}
