import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { TabBar } from '.'

const meta: Meta<typeof TabBar> = {
  title: 'Components/TabBar',
  component: TabBar,
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
type Story = StoryObj<typeof TabBar>

const editorTabs = [
  { id: 'index', label: 'index.tsx' },
  { id: 'styles', label: 'styles.css' },
  { id: 'test', label: 'index.test.tsx' },
]

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState('index')
    return <TabBar tabs={editorTabs} activeId={active} onSelect={setActive} />
  },
}

export const MiddleActive: Story = {
  render: () => {
    const [active, setActive] = useState('styles')
    return <TabBar tabs={editorTabs} activeId={active} onSelect={setActive} />
  },
}

export const ManyTabs: Story = {
  render: () => {
    const tabs = [
      { id: 'overview', label: 'overview.tsx' },
      { id: 'hero', label: 'Hero.tsx' },
      { id: 'stack', label: 'Stack.tsx' },
      { id: 'blog', label: 'Blog.tsx' },
      { id: 'contact', label: 'Contact.tsx' },
    ]
    const [active, setActive] = useState('hero')
    return <TabBar tabs={tabs} activeId={active} onSelect={setActive} />
  },
}
