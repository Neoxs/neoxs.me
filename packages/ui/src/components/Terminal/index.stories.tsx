import type { Meta, StoryObj } from '@storybook/react'
import { Terminal } from '.'

const meta: Meta<typeof Terminal> = {
  title: 'Components/Terminal',
  component: Terminal,
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
type Story = StoryObj<typeof Terminal>

export const Default: Story = {
  args: {
    cwd: '~/yacine.dev ‹main› ✓',
    lines: [
      { prompt: true,  text: 'pnpm build' },
      { text: '▲ Next.js 15.3.1', dim: true },
      { text: '   Creating an optimized production build...', dim: true },
      { text: '✓ Compiled successfully', dim: false },
      { text: '✓ Linting and checking validity of types', dim: false },
      { text: '✓ Collecting page data', dim: false },
      { text: '✓ Generating static pages (14/14)', dim: false },
      { prompt: true,  text: 'pnpm deploy --prod' },
      { text: '  Deployed to production → https://yacine.dev', dim: false },
    ],
  },
}

export const GitLog: Story = {
  args: {
    cwd: '~/yacine.dev ‹main› ✓',
    lines: [
      { prompt: true, text: 'git log --oneline -6' },
      { text: 'a3f9c1e feat(hero): add lighthouse widget', dim: false },
      { text: '8b2e04d feat(blog): rss feed generation', dim: false },
      { text: 'd7c3a19 fix(og): correct image dimensions for twitter', dim: false },
      { text: '2f7d7c5 chore: set up turbo monorepo structure', dim: false },
      { text: '94c3b94 Initial commit from create-turbo', dim: true },
    ],
  },
}

export const DockerPs: Story = {
  args: {
    cwd: '~/infra ‹main› ✓',
    lines: [
      { prompt: true, text: 'docker ps --format "table {{.Names}}\\t{{.Status}}\\t{{.Ports}}"' },
      { text: 'NAMES                STATUS          PORTS', dim: true },
      { text: 'api_gateway          Up 3 days       0.0.0.0:3000->3000/tcp', dim: false },
      { text: 'postgres_primary     Up 3 days       5432/tcp', dim: false },
      { text: 'redis_cache          Up 3 days       6379/tcp', dim: false },
      { text: 'worker_1             Up 14 hours     -', dim: false },
      { text: 'worker_2             Up 14 hours     -', dim: false },
    ],
  },
}
