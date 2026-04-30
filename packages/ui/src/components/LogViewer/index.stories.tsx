import type { Meta, StoryObj } from '@storybook/react'
import { LogViewer } from '.'

const meta: Meta<typeof LogViewer> = {
  title: 'Components/LogViewer',
  component: LogViewer,
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
type Story = StoryObj<typeof LogViewer>

export const Default: Story = {
  args: {
    podName: 'api-server-7d9f8b-xk2pq',
    lines: [
      { time: '2026-04-30T10:12:01Z', level: 'info',  message: 'Server listening on :8080' },
      { time: '2026-04-30T10:12:03Z', level: 'info',  message: 'Connected to PostgreSQL at db.internal:5432' },
      { time: '2026-04-30T10:12:07Z', level: 'info',  message: 'GET /api/health 200 2ms' },
      { time: '2026-04-30T10:12:15Z', level: 'warn',  message: 'Slow query detected: 320ms on users.find_by_email' },
      { time: '2026-04-30T10:12:22Z', level: 'info',  message: 'POST /api/auth/login 200 18ms' },
    ],
  },
}

export const WithErrors: Story = {
  args: {
    podName: 'worker-5c6d7f-m9nqr',
    lines: [
      { time: '2026-04-30T09:45:00Z', level: 'info',  message: 'Worker started, queue: jobs.default' },
      { time: '2026-04-30T09:45:03Z', level: 'info',  message: 'Processing job 8f2a1c4e: send_digest_email' },
      { time: '2026-04-30T09:45:04Z', level: 'error', message: 'SMTP connection refused: mail.internal:587' },
      { time: '2026-04-30T09:45:04Z', level: 'error', message: 'Job 8f2a1c4e failed after 3 retries, moving to DLQ' },
      { time: '2026-04-30T09:45:10Z', level: 'warn',  message: 'Queue depth: 248 (threshold: 200)' },
      { time: '2026-04-30T09:45:15Z', level: 'error', message: 'panic: runtime error: index out of range [4] with length 4' },
    ],
    onTail: () => console.log('tail -f clicked'),
  },
}

export const NoPodName: Story = {
  args: {
    lines: [
      { time: '2026-04-30T11:00:01Z', level: 'info',  message: 'Deployment rolling update started' },
      { time: '2026-04-30T11:00:04Z', level: 'info',  message: 'Scaled replicas: 2 → 4' },
      { time: '2026-04-30T11:00:18Z', level: 'warn',  message: 'Readiness probe failing on pod api-7d9f8b-r3tpz' },
      { time: '2026-04-30T11:00:45Z', level: 'info',  message: 'All pods ready. Rollout complete' },
    ],
  },
}

export const TailEnabled: Story = {
  args: {
    podName: 'gateway-6b7c8d-wq4lv',
    onTail: () => console.log('tail -f clicked'),
    lines: [
      { time: '2026-04-30T12:00:00Z', level: 'info',  message: 'Upstream: api-server:8080 healthy' },
      { time: '2026-04-30T12:00:01Z', level: 'info',  message: 'GET /projects 200 5ms' },
      { time: '2026-04-30T12:00:02Z', level: 'info',  message: 'GET /projects/neoxs-me 200 3ms' },
      { time: '2026-04-30T12:00:03Z', level: 'warn',  message: 'Rate limit reached for IP 203.0.113.42 (100 req/min)' },
      { time: '2026-04-30T12:00:04Z', level: 'info',  message: 'POST /auth/refresh 200 12ms' },
    ],
  },
}
