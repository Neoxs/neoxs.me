import type { Meta, StoryObj } from '@storybook/react'
import { HeroHeading } from '.'

const meta: Meta<typeof HeroHeading> = {
  title: 'Components/HeroHeading',
  component: HeroHeading,
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
type Story = StoryObj<typeof HeroHeading>

export const Default: Story = {
  args: {
    eyebrow: '// FRONTEND ENGINEER · PARIS',
    line1:   'I build products',
    line2:   'that feel',
    accent:  'alive.',
    sub:     'Currently open to full-time & freelance opportunities',
  },
}

export const WithoutEyebrow: Story = {
  args: {
    line1:  'Design systems',
    line2:  'done',
    accent: 'properly.',
    sub:    'Components, tokens, and docs — all in one monorepo.',
  },
}

export const WithoutSub: Story = {
  args: {
    eyebrow: '// OPEN SOURCE · SIDE PROJECTS',
    line1:   'Code worth',
    line2:   'shipping,',
    accent:  'open-sourced.',
  },
}

export const MinimalRequired: Story = {
  args: {
    line1:  'Hello,',
    line2:  "I'm Yacine —",
    accent: 'let\'s build.',
  },
}
