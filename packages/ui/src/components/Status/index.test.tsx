import { render, screen } from '@testing-library/react'
import { Status } from '.'

test('renders the name', () => {
  render(<Status name="api-server" state="running" />)
  expect(screen.getByText('api-server')).toBeInTheDocument()
})

test('renders detail when provided', () => {
  render(<Status name="api-server" state="running" detail="1/1" />)
  expect(screen.getByText('1/1')).toBeInTheDocument()
})

test('does not render detail when omitted', () => {
  const { container } = render(<Status name="api-server" state="running" />)
  // dot is a div, name is a span — only 1 span when detail is absent
  expect(container.querySelectorAll('span')).toHaveLength(1)
})

test('renders all state values without crashing', () => {
  const states = ['running', 'pending', 'error'] as const
  states.forEach(state => {
    const { unmount } = render(<Status name="svc" state={state} />)
    expect(screen.getByText('svc')).toBeInTheDocument()
    unmount()
  })
})
