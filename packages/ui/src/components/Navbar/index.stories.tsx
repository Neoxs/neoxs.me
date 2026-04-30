import type { Meta, StoryObj } from '@storybook/react'
import { Navbar } from '.'

const meta: Meta<typeof Navbar> = {
  title: 'Components/Navbar',
  component: Navbar,
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
type Story = StoryObj<typeof Navbar>

export const Default: Story = {
  args: {
    links: [
      { label: 'home',     href: '/',         active: true },
      { label: 'projects', href: '/projects'               },
      { label: 'writing',  href: '/writing'                },
      { label: 'stack',    href: '/stack'                  },
    ],
    cta: 'contact →',
    onCtaClick: () => console.log('contact clicked'),
  },
}

export const ProjectsActive: Story = {
  args: {
    links: [
      { label: 'home',     href: '/'                       },
      { label: 'projects', href: '/projects', active: true },
      { label: 'writing',  href: '/writing'                },
      { label: 'stack',    href: '/stack'                  },
    ],
    cta: 'contact →',
    onCtaClick: () => console.log('contact clicked'),
  },
}

export const WritingActive: Story = {
  args: {
    links: [
      { label: 'home',     href: '/'                      },
      { label: 'projects', href: '/projects'              },
      { label: 'writing',  href: '/writing', active: true },
      { label: 'stack',    href: '/stack'                 },
    ],
    cta: 'contact →',
    onCtaClick: () => console.log('contact clicked'),
  },
}

export const CustomCta: Story = {
  args: {
    links: [
      { label: 'home',     href: '/',         active: true },
      { label: 'projects', href: '/projects'               },
      { label: 'writing',  href: '/writing'                },
    ],
    cta: 'hire me →',
    onCtaClick: () => console.log('hire me clicked'),
  },
}
