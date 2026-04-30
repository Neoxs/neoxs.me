import type { Meta, StoryObj } from '@storybook/react'
import { Toast } from '.'

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 'var(--space-24)', background: 'var(--color-bg)', maxWidth: '360px' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Toast>

export const Default: Story = {
  args: {
    variant: 'success',
    title: 'Deployed to production',
    description: 'Build #142 is live at yacine.dev',
  },
}

export const SuccessNoDescription: Story = {
  args: {
    variant: 'success',
    title: 'Cache invalidated',
  },
}

export const ErrorWithDescription: Story = {
  args: {
    variant: 'error',
    title: 'Deployment failed',
    description: 'Type error in apps/shell/app/page.tsx — build aborted',
  },
}

export const ErrorNoDescription: Story = {
  args: {
    variant: 'error',
    title: 'Connection refused',
  },
}
