import type { Meta, StoryObj } from '@storybook/react'
import { Terminal } from '../components/Terminal'
import { Lighthouse } from '../components/Lighthouse'

const meta: Meta = {
  title: 'Pages/Hero',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div
      style={{
        background:  'var(--color-bg)',
        padding:     'var(--space-80) var(--space-40)',
        maxWidth:    '1100px',
        margin:      '0 auto',
      }}
    >
      {/* Eyebrow */}
      <div
        style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      'var(--text-9)',
          color:         'var(--color-teal)',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          marginBottom:  'var(--space-18)',
        }}
      >
        // FRONTEND ENGINEER · PARIS
      </div>

      {/* H1 */}
      <h1
        style={{
          fontFamily:   'var(--font-serif)',
          fontSize:     'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight:   400,
          color:        'var(--color-text)',
          lineHeight:   1.1,
          marginBottom: 'var(--space-20)',
        }}
      >
        Building interfaces
        <br />
        <span style={{ color: 'var(--color-teal)', fontStyle: 'italic' }}>
          that scale.
        </span>
      </h1>

      {/* Sub */}
      <p
        style={{
          fontFamily:   'var(--font-mono)',
          fontSize:     'var(--text-11)',
          color:        'var(--color-text-3)',
          letterSpacing: '0.5px',
          lineHeight:   1.8,
          marginBottom: 'var(--space-40)',
        }}
      >
        React · TypeScript · Next.js · Node.js · PostgreSQL · Kubernetes · Terraform
      </p>

      {/* Widget row */}
      <div
        style={{
          display:   'grid',
          gridTemplateColumns: '1fr 1fr',
          gap:       'var(--space-14)',
          alignItems: 'start',
        }}
      >
        <Terminal
          cwd="~/yacine.dev ‹main› ✓"
          lines={[
            { prompt: true,  text: 'pnpm build' },
            { text: '▲ Next.js 15.3.1', dim: true },
            { text: '   Creating an optimized production build...', dim: true },
            { text: '✓ Compiled successfully', dim: false },
            { text: '✓ Linting and checking validity of types', dim: false },
            { text: '✓ Generating static pages (14/14)', dim: false },
            { prompt: true,  text: 'pnpm deploy --prod' },
            { text: '  Deployed → https://yacine.dev', dim: false },
          ]}
        />

        <Lighthouse perf={100} a11y={98} seo={100} bp={96} />
      </div>
    </div>
  ),
}
