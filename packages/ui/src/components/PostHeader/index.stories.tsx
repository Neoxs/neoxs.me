import type { Meta, StoryObj } from '@storybook/react'
import { PostHeader } from '.'

const meta: Meta<typeof PostHeader> = {
  title: 'Components/PostHeader',
  component: PostHeader,
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
type Story = StoryObj<typeof PostHeader>

export const Default: Story = {
  args: {
    eyebrow: 'ENGINEERING',
    title: 'Building a Design System from Scratch with React and CSS Variables',
    description:
      'A deep dive into the decisions, trade-offs, and lessons learned while building a fully typed, token-driven design system for a personal portfolio.',
    date: 'April 12, 2025',
    readingTime: 8,
    author: 'Yacine',
  },
}

export const ShortPost: Story = {
  args: {
    eyebrow: 'THOUGHTS',
    title: 'Why I Stopped Using Tailwind',
    description:
      'A short reflection on utility-first CSS, cognitive overhead, and why plain CSS variables feel like coming home.',
    date: 'March 3, 2025',
    readingTime: 3,
    author: 'Yacine',
  },
}

export const GuestAuthor: Story = {
  args: {
    eyebrow: 'TUTORIAL',
    title: 'Animating with the View Transitions API in Next.js 14',
    description:
      'Step-by-step guide to wiring up native browser view transitions alongside Next.js App Router navigation for silky-smooth page changes.',
    date: 'January 28, 2025',
    readingTime: 12,
    author: 'Mehdi Larbi',
  },
}

export const LongTitle: Story = {
  args: {
    eyebrow: 'CAREER',
    title: 'From Computer Science Graduate to Senior Frontend Engineer in Three Years: What Actually Moved the Needle',
    description:
      'Honest retrospective on the skills, projects, and mindset shifts that mattered most early in my career — and the ones that were mostly noise.',
    date: 'February 14, 2025',
    readingTime: 15,
    author: 'Yacine',
  },
}
