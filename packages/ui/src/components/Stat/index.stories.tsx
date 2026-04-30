import type { Meta, StoryObj } from '@storybook/react'
import { StatGrid } from '.'

const meta: Meta<typeof StatGrid> = {
  title: 'Components/StatGrid',
  component: StatGrid,
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
type Story = StoryObj<typeof StatGrid>

export const Default: Story = {
  args: {
    items: [
      { label: 'COMMITS', value: '1,342' },
      { label: 'PROJECTS', value: '28' },
      { label: 'YEARS EXP', value: '6' },
    ],
  },
}

export const TwoColumn: Story = {
  args: {
    items: [
      { label: 'UPTIME', value: '99.9%' },
      { label: 'DEPLOYS / MO', value: '47' },
    ],
  },
}

export const FourColumn: Story = {
  args: {
    items: [
      { label: 'PERF SCORE', value: '100' },
      { label: 'A11Y', value: '98' },
      { label: 'SEO', value: '100' },
      { label: 'BEST PRACT.', value: '96' },
    ],
  },
}
