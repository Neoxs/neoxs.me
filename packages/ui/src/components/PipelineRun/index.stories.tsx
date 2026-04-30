import type { Meta, StoryObj } from '@storybook/react'
import { PipelineRun } from '.'

const meta: Meta<typeof PipelineRun> = {
  title: 'Components/PipelineRun',
  component: PipelineRun,
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
type Story = StoryObj<typeof PipelineRun>

export const Default: Story = {
  args: {
    commit:   'a3f8c21',
    message:  'feat(api): add pagination to /projects endpoint',
    branch:   'main',
    duration: '2m 14s',
    ago:      '3 minutes ago',
    status:   'success',
    steps: [
      { label: 'lint',   done: true  },
      { label: 'test',   done: true  },
      { label: 'build',  done: true  },
      { label: 'push',   done: true  },
      { label: 'deploy', done: true  },
    ],
  },
}

export const Running: Story = {
  args: {
    commit:      'b7d2e94',
    message:     'chore: upgrade Next.js to 15.3.1',
    branch:      'main',
    duration:    '1m 07s',
    ago:         'just now',
    status:      'running',
    affectedApp: 'shell',
    steps: [
      { label: 'lint',   done: true,  active: false },
      { label: 'test',   done: true,  active: false },
      { label: 'build',  done: false, active: true  },
      { label: 'push',   done: false, active: false },
      { label: 'deploy', done: false, active: false },
    ],
  },
}

export const Failed: Story = {
  args: {
    commit:   'c1a9f03',
    message:  'fix(worker): handle SMTP timeout with exponential backoff',
    branch:   'fix/smtp-timeout',
    duration: '0m 52s',
    ago:      '12 minutes ago',
    status:   'failed',
    steps: [
      { label: 'lint',   done: true,  active: false },
      { label: 'test',   done: false, active: false },
      { label: 'build',  done: false, active: false },
      { label: 'push',   done: false, active: false },
      { label: 'deploy', done: false, active: false },
    ],
  },
}

export const AffectedAppOnly: Story = {
  args: {
    commit:      'd4e5f67',
    message:     'feat(shell): redesign project card layout',
    branch:      'main',
    duration:    '1m 38s',
    ago:         '28 minutes ago',
    status:      'success',
    affectedApp: 'shell',
    steps: [
      { label: 'lint',   done: true },
      { label: 'test',   done: true },
      { label: 'build',  done: true },
      { label: 'deploy', done: true },
    ],
  },
}
