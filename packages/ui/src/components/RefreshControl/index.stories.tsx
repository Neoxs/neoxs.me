import type { Meta, StoryObj } from '@storybook/react'
import { RefreshControl } from '.'

const meta: Meta<typeof RefreshControl> = {
  title: 'Components/RefreshControl',
  component: RefreshControl,
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
type Story = StoryObj<typeof RefreshControl>

export const Default: Story = {
  args: {
    interval: 30,
    onRefresh: () => console.log('Data refreshed'),
  },
}

export const FrequentRefresh: Story = {
  args: {
    interval: 10,
    onRefresh: () => console.log('Fast refresh triggered'),
  },
}

export const SlowRefresh: Story = {
  args: {
    interval: 60,
    onRefresh: () => console.log('Slow refresh triggered'),
  },
}
