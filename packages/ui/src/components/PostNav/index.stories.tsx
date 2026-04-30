import type { Meta, StoryObj } from '@storybook/react'
import { PostNav } from '.'

const meta: Meta<typeof PostNav> = {
  title: 'Components/PostNav',
  component: PostNav,
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
type Story = StoryObj<typeof PostNav>

export const Default: Story = {
  args: {
    prev: {
      slug: 'building-a-design-system',
      title: 'Building a Design System from Scratch with React and CSS Variables',
    },
    next: {
      slug: 'animating-with-view-transitions',
      title: 'Animating with the View Transitions API in Next.js 14',
    },
    onNavigate: (slug) => console.log('Navigate to:', slug),
  },
}

export const NoPrevious: Story = {
  args: {
    prev: undefined,
    next: {
      slug: 'why-i-stopped-using-tailwind',
      title: 'Why I Stopped Using Tailwind',
    },
    onNavigate: (slug) => console.log('Navigate to:', slug),
  },
}

export const NoNext: Story = {
  args: {
    prev: {
      slug: 'from-cs-grad-to-senior-engineer',
      title: 'From CS Graduate to Senior Frontend Engineer in Three Years',
    },
    next: undefined,
    onNavigate: (slug) => console.log('Navigate to:', slug),
  },
}

export const BothDisabled: Story = {
  args: {
    prev: undefined,
    next: undefined,
  },
}
