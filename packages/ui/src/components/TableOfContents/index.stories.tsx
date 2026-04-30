import type { Meta, StoryObj } from '@storybook/react'
import { TableOfContents } from '.'

const meta: Meta<typeof TableOfContents> = {
  title: 'Components/TableOfContents',
  component: TableOfContents,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 'var(--space-24)', background: 'var(--color-bg)', maxWidth: '240px' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof TableOfContents>

const items = [
  { id: 'motivation',    label: 'Motivation',            depth: 1 as const },
  { id: 'architecture',  label: 'Architecture overview',  depth: 1 as const },
  { id: 'data-layer',   label: 'Data layer',             depth: 2 as const },
  { id: 'caching',      label: 'Caching strategy',       depth: 3 as const },
  { id: 'edge-routing', label: 'Edge routing',           depth: 3 as const },
  { id: 'rendering',    label: 'Rendering model',        depth: 2 as const },
  { id: 'benchmarks',   label: 'Benchmarks',             depth: 1 as const },
  { id: 'conclusion',   label: 'Conclusion',             depth: 1 as const },
]

export const Default: Story = {
  args: { items },
}

export const WithActiveItem: Story = {
  args: {
    items,
    activeId: 'architecture',
  },
}

export const DeepActive: Story = {
  args: {
    items,
    activeId: 'caching',
  },
}
