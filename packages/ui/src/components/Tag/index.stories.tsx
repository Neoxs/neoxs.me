import type { Meta, StoryObj } from '@storybook/react'
import { Tag } from '.'

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
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
type Story = StoryObj<typeof Tag>

export const Default: Story = {
  args: {
    children: 'TypeScript',
    accent: false,
  },
}

export const Accent: Story = {
  args: {
    children: 'React',
    accent: true,
  },
}

export const TagCloud: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
      <Tag accent>React</Tag>
      <Tag accent>TypeScript</Tag>
      <Tag>Next.js</Tag>
      <Tag>Kubernetes</Tag>
      <Tag>Rust</Tag>
      <Tag>PostgreSQL</Tag>
      <Tag accent>Architecture</Tag>
      <Tag>CI/CD</Tag>
    </div>
  ),
}
