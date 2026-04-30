import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '.'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
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
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    variant: 'teal',
    children: 'TypeScript',
  },
}

export const WithDot: Story = {
  args: {
    variant: 'teal',
    dot: true,
    children: 'Online',
  },
}

export const Warning: Story = {
  args: {
    variant: 'amber',
    dot: true,
    children: 'Degraded',
  },
}

export const Error: Story = {
  args: {
    variant: 'red',
    dot: true,
    children: 'Offline',
  },
}

export const Neutral: Story = {
  args: {
    variant: 'gray',
    children: 'Archived',
  },
}
