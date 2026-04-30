import type { Meta, StoryObj } from '@storybook/react'
import { ClusterHealth } from '.'

const meta: Meta<typeof ClusterHealth> = {
  title: 'Components/ClusterHealth',
  component: ClusterHealth,
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
type Story = StoryObj<typeof ClusterHealth>

export const Default: Story = {
  args: {
    total: 12,
    healthy: 12,
  },
}

export const Degraded: Story = {
  args: {
    total: 12,
    healthy: 9,
  },
}

export const Critical: Story = {
  args: {
    total: 8,
    healthy: 3,
  },
}
