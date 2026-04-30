import type { Meta, StoryObj } from '@storybook/react'
import { Status } from '.'

const meta: Meta<typeof Status> = {
  title: 'Components/Status',
  component: Status,
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
type Story = StoryObj<typeof Status>

export const Default: Story = {
  args: {
    name: 'api-gateway',
    state: 'running',
    detail: 'v1.4.2',
  },
}

export const Pending: Story = {
  args: {
    name: 'worker-deployment',
    state: 'pending',
    detail: 'rolling update',
  },
}

export const Error: Story = {
  args: {
    name: 'postgres-primary',
    state: 'error',
    detail: 'OOMKilled',
  },
}

export const NoDetail: Story = {
  args: {
    name: 'redis-cache',
    state: 'running',
  },
}
