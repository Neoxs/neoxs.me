import type { Meta, StoryObj } from '@storybook/react'
import { ConsoleOutput } from '.'

const meta: Meta<typeof ConsoleOutput> = {
  title: 'Components/ConsoleOutput',
  component: ConsoleOutput,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 'var(--space-24)', background: 'var(--color-bg)', height: '320px', display: 'flex', flexDirection: 'column' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ConsoleOutput>

export const Default: Story = {
  args: {
    lines: [
      { level: 'info',  message: 'Server started on http://localhost:3000', timestamp: '09:41:02' },
      { level: 'log',   message: 'Compiled 42 modules in 318ms',            timestamp: '09:41:03' },
      { level: 'log',   message: 'GET /api/projects 200 – 12ms',            timestamp: '09:41:05' },
      { level: 'warn',  message: 'Deprecated: use fetchProjects() instead', timestamp: '09:41:06' },
      { level: 'error', message: 'TypeError: Cannot read properties of undefined (reading \'slug\')', timestamp: '09:41:08' },
    ],
    onClear: () => console.log('clear'),
  },
}

export const OnlyLogs: Story = {
  args: {
    lines: [
      { level: 'log', message: 'Fetching project list…',                   timestamp: '10:00:01' },
      { level: 'log', message: 'Received 8 projects',                      timestamp: '10:00:01' },
      { level: 'log', message: 'Cache hit for /api/projects?page=1',       timestamp: '10:00:02' },
      { level: 'log', message: 'Render complete in 4.2ms',                 timestamp: '10:00:02' },
    ],
    onClear: () => console.log('clear'),
  },
}

export const WithErrors: Story = {
  args: {
    lines: [
      { level: 'info',  message: 'Build started',                                                     timestamp: '11:20:00' },
      { level: 'error', message: 'SyntaxError: Unexpected token \'<\' in JSON at position 0',          timestamp: '11:20:01' },
      { level: 'error', message: 'Failed to fetch /api/auth/session — 401 Unauthorized',              timestamp: '11:20:02' },
      { level: 'warn',  message: 'Retrying in 3s… (attempt 1 of 3)',                                  timestamp: '11:20:03' },
      { level: 'error', message: 'Max retries exceeded. Aborting.',                                    timestamp: '11:20:06' },
    ],
    onClear: () => console.log('clear'),
  },
}

export const NoClearButton: Story = {
  args: {
    lines: [
      { level: 'info', message: 'Read-only output — no clear action',  timestamp: '08:00:00' },
      { level: 'log',  message: 'Pipeline step 1/4 — lint passed',     timestamp: '08:00:01' },
      { level: 'log',  message: 'Pipeline step 2/4 — type-check done', timestamp: '08:00:03' },
    ],
  },
}
