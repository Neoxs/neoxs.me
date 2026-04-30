import type { Meta, StoryObj } from '@storybook/react'
import { Pipeline } from '.'

const meta: Meta<typeof Pipeline> = {
  title: 'Components/Pipeline',
  component: Pipeline,
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
type Story = StoryObj<typeof Pipeline>

export const Default: Story = {
  args: {
    steps: [
      { label: 'lint',    done: true  },
      { label: 'test',    done: true  },
      { label: 'build',   done: true  },
      { label: 'push',    done: false },
      { label: 'deploy',  done: false },
    ],
  },
}

export const AllComplete: Story = {
  args: {
    steps: [
      { label: 'lint',    done: true },
      { label: 'test',    done: true },
      { label: 'build',   done: true },
      { label: 'push',    done: true },
      { label: 'deploy',  done: true },
    ],
  },
}

export const NoneComplete: Story = {
  args: {
    steps: [
      { label: 'lint',    done: false },
      { label: 'test',    done: false },
      { label: 'build',   done: false },
      { label: 'push',    done: false },
      { label: 'deploy',  done: false },
    ],
  },
}

export const MinimalSteps: Story = {
  args: {
    steps: [
      { label: 'typecheck', done: true  },
      { label: 'release',   done: false },
    ],
  },
}
