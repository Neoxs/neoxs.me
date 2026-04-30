import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '.'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
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
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    label:       'EMAIL',
    placeholder: 'you@example.com',
    type:        'email',
    hint:        'Used for project update notifications only.',
  },
}

export const WithError: Story = {
  args: {
    label:       'EMAIL',
    placeholder: 'you@example.com',
    type:        'email',
    value:       'not-an-email',
    error:       'Enter a valid email address.',
    readOnly:    true,
  },
}

export const NoLabelNoHint: Story = {
  args: {
    placeholder: 'Search components…',
    type:        'search',
  },
}

export const Disabled: Story = {
  args: {
    label:    'API KEY',
    value:    'sk-••••••••••••••••••••••••••••••••',
    disabled: true,
    hint:     'Rotate your key from the account settings page.',
    readOnly: true,
  },
}
