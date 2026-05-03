import { render, screen } from '@testing-library/react'
import { Badge } from '.'

test('renders children', () => {
  render(<Badge>running</Badge>)
  expect(screen.getByText('running')).toBeInTheDocument()
})

test('renders dot indicator when dot=true', () => {
  const { container } = render(<Badge dot>running</Badge>)
  // outer span + inner dot span
  expect(container.querySelectorAll('span')).toHaveLength(2)
})

test('does not render dot when dot is omitted', () => {
  const { container } = render(<Badge>running</Badge>)
  expect(container.querySelectorAll('span')).toHaveLength(1)
})

test('renders all variant values without crashing', () => {
  const variants = ['teal', 'gray', 'red', 'amber'] as const
  variants.forEach(variant => {
    const { unmount } = render(<Badge variant={variant}>status</Badge>)
    expect(screen.getByText('status')).toBeInTheDocument()
    unmount()
  })
})
