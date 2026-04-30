import type { Meta, StoryObj } from '@storybook/react'
import { CodeBlock } from '.'

const meta: Meta<typeof CodeBlock> = {
  title: 'Components/CodeBlock',
  component: CodeBlock,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 'var(--space-24)', background: 'var(--color-bg)', maxWidth: '720px' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof CodeBlock>

export const Default: Story = {
  args: {
    language: 'typescript',
    code: `import { createServer } from 'http'
import { parse } from 'url'

const server = createServer((req, res) => {
  const { pathname } = parse(req.url ?? '/')
  if (pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status: 'ok' }))
  }
})

server.listen(3000, () => console.log('Listening on :3000'))`,
  },
}

export const Shell: Story = {
  args: {
    language: 'bash',
    code: `# Install dependencies and start the dev server
pnpm install
pnpm --filter @repo/shell dev

# In a separate terminal, build the UI package in watch mode
pnpm --filter @repo/ui dev`,
  },
}

export const YAML: Story = {
  args: {
    language: 'yaml',
    code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-server
  namespace: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api-server
  template:
    metadata:
      labels:
        app: api-server
    spec:
      containers:
        - name: api
          image: ghcr.io/neoxs/api:latest
          ports:
            - containerPort: 8080
          resources:
            requests:
              cpu: "100m"
              memory: "128Mi"
            limits:
              cpu: "500m"
              memory: "512Mi"`,
  },
}
