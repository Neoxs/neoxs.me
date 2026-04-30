import type { Meta, StoryObj } from '@storybook/react'
import { EditorToolbar } from '.'

const meta: Meta<typeof EditorToolbar> = {
  title: 'Components/EditorToolbar',
  component: EditorToolbar,
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
type Story = StoryObj<typeof EditorToolbar>

export const Default: Story = {
  args: {
    status:   'idle',
    onRun:    () => console.log('run'),
    onReset:  () => console.log('reset'),
    onFormat: () => console.log('format'),
    onShare:  () => console.log('share'),
  },
}

export const Ready: Story = {
  args: {
    status:   'ready',
    onRun:    () => console.log('run'),
    onReset:  () => console.log('reset'),
    onFormat: () => console.log('format'),
    onShare:  () => console.log('share'),
  },
}

export const ErrorState: Story = {
  args: {
    status:  'error',
    onRun:   () => console.log('run'),
    onReset: () => console.log('reset'),
  },
}

export const MinimalActions: Story = {
  args: {
    status:  'idle',
    onRun:   () => console.log('run'),
    onReset: () => console.log('reset'),
  },
}
