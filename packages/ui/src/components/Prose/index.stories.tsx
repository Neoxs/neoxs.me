import type { Meta, StoryObj } from '@storybook/react'
import { Prose } from '.'

const meta: Meta<typeof Prose> = {
  title: 'Components/Prose',
  component: Prose,
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
type Story = StoryObj<typeof Prose>

export const Default: Story = {
  args: {
    children: (
      <>
        <h2>Why CSS Variables Beat Static Tokens</h2>
        <p>
          When we started building the design system, the first instinct was to reach for a
          preprocessor. Sass variables felt familiar. But familiarity is not the same as fit.
        </p>
        <p>
          CSS custom properties solve a different class of problem: they cascade. A token defined
          at <code>:root</code> can be overridden at any scope — a dark-mode selector, a component
          wrapper, a single element. That single capability unlocks theming patterns that preprocessor
          variables simply cannot express.
        </p>
        <h3>The trade-off</h3>
        <p>
          Runtime resolution comes at a cost. Tooling support is thinner: you lose static analysis,
          autocompletion in some editors, and compile-time errors for undefined tokens. These are
          real drawbacks worth weighing against the flexibility gains.
        </p>
        <blockquote>
          Design tokens are the single source of truth for your visual language. Make them easy to
          change and impossible to ignore.
        </blockquote>
      </>
    ),
  },
}

export const CodeHeavy: Story = {
  args: {
    children: (
      <>
        <h2>Setting Up the Token Layer</h2>
        <p>
          Start with a flat token file. Every value lives at <code>:root</code> and is referenced
          by semantic name, not raw value.
        </p>
        <pre>
          <code>{`:root {
  --color-bg:       #0a0a0a;
  --color-surface:  #111111;
  --color-teal:     #4ecdc4;
  --font-mono:      'JetBrains Mono', monospace;
  --space-16:       16px;
}`}</code>
        </pre>
        <p>
          Components never reference hex values directly. They always go through the token layer.
          This constraint pays dividends the first time you need to ship a light theme in an
          afternoon.
        </p>
      </>
    ),
  },
}

export const ShortParagraph: Story = {
  args: {
    children: (
      <p>
        The best component is the one that does exactly one thing and exposes exactly the props it
        needs — no more, no less. Restraint in API design is a form of respect for the people who
        will use it six months from now, when context is gone and the only guide is the interface
        itself.
      </p>
    ),
  },
}
