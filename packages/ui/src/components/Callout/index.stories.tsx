import type { Meta, StoryObj } from '@storybook/react'
import { Callout } from '.'

const meta: Meta<typeof Callout> = {
  title: 'Components/Callout',
  component: Callout,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 'var(--space-24)', background: 'var(--color-bg)', maxWidth: '640px' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Callout>

export const Default: Story = {
  args: {
    variant: 'tip',
    children:
      'Run pnpm install from the repo root to ensure all workspace dependencies are linked correctly before starting the dev server.',
  },
}

export const Info: Story = {
  args: {
    variant: 'info',
    children:
      'This component uses CSS custom properties for theming. Make sure your design tokens are loaded before rendering.',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    children:
      'Upgrading from v2 to v3 introduces breaking changes in the configuration schema. Review the migration guide before proceeding.',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    children:
      'Deleting a namespace is irreversible. All pods, services, and persistent volume claims within it will be permanently destroyed.',
  },
}
