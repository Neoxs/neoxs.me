import type { Meta, StoryObj } from '@storybook/react'
import { ComponentSidebar } from '.'

const meta: Meta<typeof ComponentSidebar> = {
  title: 'Components/ComponentSidebar',
  component: ComponentSidebar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 'var(--space-24)', background: 'var(--color-bg)', height: '480px', display: 'flex' }}>
        <div style={{ width: '220px', height: '100%' }}>
          <Story />
        </div>
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ComponentSidebar>

const allItems = [
  { id: 'button',          name: 'Button',          package: '@neoxs/ui' },
  { id: 'input',           name: 'Input',           package: '@neoxs/ui' },
  { id: 'lighthouse',      name: 'Lighthouse',      package: '@neoxs/ui' },
  { id: 'hero-heading',    name: 'HeroHeading',     package: '@neoxs/ui' },
  { id: 'console-output',  name: 'ConsoleOutput',   package: '@neoxs/ui' },
  { id: 'editor-toolbar',  name: 'EditorToolbar',   package: '@neoxs/ui' },
  { id: 'code-block',      name: 'CodeBlock',       package: '@neoxs/primitives' },
  { id: 'tag',             name: 'Tag',             package: '@neoxs/primitives' },
  { id: 'badge',           name: 'Badge',           package: '@neoxs/primitives' },
]

export const Default: Story = {
  args: {
    items: allItems,
    activeId: 'input',
    onSelect: (id) => console.log('selected', id),
  },
}

export const NothingActive: Story = {
  args: {
    items: allItems,
    onSelect: (id) => console.log('selected', id),
  },
}

export const SinglePackage: Story = {
  args: {
    items: allItems.filter((i) => i.package === '@neoxs/ui'),
    activeId: 'lighthouse',
    onSelect: (id) => console.log('selected', id),
  },
}

export const FewItems: Story = {
  args: {
    items: [
      { id: 'button', name: 'Button', package: '@neoxs/ui' },
      { id: 'input',  name: 'Input',  package: '@neoxs/ui' },
    ],
    activeId: 'button',
    onSelect: (id) => console.log('selected', id),
  },
}
