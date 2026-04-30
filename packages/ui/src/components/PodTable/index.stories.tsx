import type { Meta, StoryObj } from '@storybook/react'
import { PodTable } from '.'

const meta: Meta<typeof PodTable> = {
  title: 'Components/PodTable',
  component: PodTable,
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
type Story = StoryObj<typeof PodTable>

export const Default: Story = {
  args: {
    pods: [
      { name: 'api-server-7d9f8b-xk2pq',  status: 'Running', ready: true,  version: 'v1.4.2', restarts: 0, age: '3d'  },
      { name: 'api-server-7d9f8b-m8wlr',  status: 'Running', ready: true,  version: 'v1.4.2', restarts: 0, age: '3d'  },
      { name: 'worker-5c6d7f-m9nqr',       status: 'Running', ready: true,  version: 'v1.4.1', restarts: 1, age: '1d'  },
      { name: 'gateway-6b7c8d-wq4lv',      status: 'Running', ready: true,  version: 'v2.0.0', restarts: 0, age: '7d'  },
      { name: 'scheduler-8e1a2c-p5zkx',    status: 'Running', ready: true,  version: 'v1.4.2', restarts: 0, age: '3d'  },
    ],
  },
}

export const WithUnhealthyPods: Story = {
  args: {
    pods: [
      { name: 'api-server-7d9f8b-xk2pq',  status: 'Running', ready: true,  version: 'v1.4.2', restarts: 0,  age: '3d'   },
      { name: 'worker-5c6d7f-m9nqr',       status: 'Failed',  ready: false, version: 'v1.4.1', restarts: 4,  age: '1d'   },
      { name: 'gateway-6b7c8d-wq4lv',      status: 'Pending', ready: false, version: 'v2.0.0', restarts: 0,  age: '2m'   },
      { name: 'scheduler-8e1a2c-p5zkx',    status: 'Running', ready: true,  version: 'v1.4.2', restarts: 2,  age: '3d'   },
      { name: 'cache-proxy-3f4g5h-r7tnw',  status: 'Unknown', ready: false, version: undefined, restarts: 0, age: '14d'  },
    ],
  },
}

export const SinglePod: Story = {
  args: {
    pods: [
      { name: 'api-server-7d9f8b-xk2pq', status: 'Running', ready: true, version: 'v1.4.2', restarts: 0, age: '6h' },
    ],
  },
}

export const NoVersions: Story = {
  args: {
    pods: [
      { name: 'migrator-job-4x9pz',  status: 'Running', ready: true,  restarts: 0, age: '45s' },
      { name: 'seed-job-7kq2m',      status: 'Pending', ready: false, restarts: 0, age: '10s' },
      { name: 'cleanup-job-1rw8v',   status: 'Failed',  ready: false, restarts: 1, age: '2m'  },
    ],
  },
}
