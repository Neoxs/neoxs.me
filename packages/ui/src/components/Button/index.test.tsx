import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '.'

test('renders children', () => {
  render(<Button>Deploy</Button>)
  expect(screen.getByRole('button')).toHaveTextContent('Deploy')
})

test('is a button element', () => {
  render(<Button>Deploy</Button>)
  expect(screen.getByRole('button').tagName).toBe('BUTTON')
})

test('calls onClick when clicked', async () => {
  const fn = vi.fn()
  render(<Button onClick={fn}>Deploy</Button>)
  await userEvent.click(screen.getByRole('button'))
  expect(fn).toHaveBeenCalledOnce()
})

test('does not call onClick when disabled', async () => {
  const fn = vi.fn()
  render(<Button onClick={fn} disabled>Deploy</Button>)
  await userEvent.click(screen.getByRole('button'))
  expect(fn).not.toHaveBeenCalled()
})

test('forwards disabled attribute to the element', () => {
  render(<Button disabled>Deploy</Button>)
  expect(screen.getByRole('button')).toBeDisabled()
})

test('forwards arbitrary HTML attributes', () => {
  render(<Button aria-label="trigger deploy">Deploy</Button>)
  expect(screen.getByRole('button', { name: 'trigger deploy' })).toBeInTheDocument()
})
