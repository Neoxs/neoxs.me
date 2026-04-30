import type { Meta, StoryObj } from '@storybook/react'
import { ReadingProgress } from '.'

const meta: Meta<typeof ReadingProgress> = {
  title: 'Components/ReadingProgress',
  component: ReadingProgress,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 'var(--space-24)', background: 'var(--color-bg)', minHeight: '200px', position: 'relative' }}>
        <Story />
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-11)', color: 'var(--color-text-3)', marginTop: 'var(--space-24)' }}>
          The reading progress bar is fixed to the top of the viewport and driven by scroll position.
          Scroll the page to see it in action.
        </p>
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ReadingProgress>

// ReadingProgress takes no props — it wires up its own scroll listener.
// These stories demonstrate the rendered bar at different simulated progress states
// by overriding the inner fill width via a wrapper approach for visual testing.

export const Default: Story = {}

export const AtStart: Story = {
  decorators: [
    () => (
      <div style={{ padding: 'var(--space-24)', background: 'var(--color-bg)' }}>
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'var(--color-border)',
            zIndex: 100,
          }}
        >
          <div
            style={{
              height: '100%',
              width: '0%',
              background: 'var(--color-teal)',
              transition: 'width 0.1s linear',
            }}
          />
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-11)', color: 'var(--color-text-3)', marginTop: 'var(--space-24)' }}>
          Progress: 0% — reader is at the top of the article.
        </p>
      </div>
    ),
  ],
}

export const HalfwayThrough: Story = {
  decorators: [
    () => (
      <div style={{ padding: 'var(--space-24)', background: 'var(--color-bg)' }}>
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'var(--color-border)',
            zIndex: 100,
          }}
        >
          <div
            style={{
              height: '100%',
              width: '50%',
              background: 'var(--color-teal)',
              transition: 'width 0.1s linear',
            }}
          />
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-11)', color: 'var(--color-text-3)', marginTop: 'var(--space-24)' }}>
          Progress: 50% — reader is halfway through the article.
        </p>
      </div>
    ),
  ],
}

export const Complete: Story = {
  decorators: [
    () => (
      <div style={{ padding: 'var(--space-24)', background: 'var(--color-bg)' }}>
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'var(--color-border)',
            zIndex: 100,
          }}
        >
          <div
            style={{
              height: '100%',
              width: '100%',
              background: 'var(--color-teal)',
              transition: 'width 0.1s linear',
            }}
          />
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-11)', color: 'var(--color-text-3)', marginTop: 'var(--space-24)' }}>
          Progress: 100% — reader has reached the end of the article.
        </p>
      </div>
    ),
  ],
}
