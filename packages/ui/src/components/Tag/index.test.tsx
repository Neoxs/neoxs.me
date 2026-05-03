import { render, screen } from '@testing-library/react'
import { Tag } from '.'

test('renders children', () => {
  render(<Tag>react</Tag>)
  expect(screen.getByText('react')).toBeInTheDocument()
})

test('renders as a span', () => {
  const { container } = render(<Tag>react</Tag>)
  expect(container.firstChild?.nodeName).toBe('SPAN')
})

test('renders with accent without crashing', () => {
  render(<Tag accent>typescript</Tag>)
  expect(screen.getByText('typescript')).toBeInTheDocument()
})
