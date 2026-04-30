import type { Meta, StoryObj } from '@storybook/react'
import { Lighthouse } from '.'

const meta: Meta<typeof Lighthouse> = {
  title: 'Components/Lighthouse',
  component: Lighthouse,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 'var(--space-24)', background: 'var(--color-bg)', maxWidth: '260px' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Lighthouse>

export const Default: Story = {
  args: {
    perf: 98,
    a11y: 100,
    seo:  100,
    bp:   100,
  },
}

export const GoodButNotPerfect: Story = {
  args: {
    perf: 84,
    a11y: 92,
    seo:  96,
    bp:   100,
  },
}

export const NeedsWork: Story = {
  args: {
    perf: 61,
    a11y: 78,
    seo:  82,
    bp:   93,
  },
}
