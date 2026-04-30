import type { Meta, StoryObj } from '@storybook/react'
import { SectionHeader } from '.'

const meta: Meta<typeof SectionHeader> = {
  title: 'Components/SectionHeader',
  component: SectionHeader,
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
type Story = StoryObj<typeof SectionHeader>

export const Default: Story = {
  args: {
    label: 'WRITING',
    title: 'Latest Posts',
    meta: '12 articles',
  },
}

export const WithoutMeta: Story = {
  args: {
    label: 'PROJECTS',
    title: 'Selected Work',
  },
}

export const SkillsSection: Story = {
  args: {
    label: 'EXPERTISE',
    title: 'Skills & Tools',
    meta: 'Updated Apr 2025',
  },
}

export const ExperienceSection: Story = {
  args: {
    label: 'CAREER',
    title: 'Work Experience',
    meta: '4 roles',
  },
}
