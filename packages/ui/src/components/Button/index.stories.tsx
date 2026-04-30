import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '.'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
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
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Deploy to production',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'md',
    children: 'View source',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    size: 'md',
    children: 'Delete cluster',
  },
}

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    children: 'Save draft',
  },
}

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    children: 'Get started',
  },
}
