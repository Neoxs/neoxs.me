import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from '.'

test('renders an input element', () => {
  render(<Input />)
  expect(screen.getByRole('textbox')).toBeInTheDocument()
})

test('renders label when provided', () => {
  render(<Input label="Email" />)
  expect(screen.getByText('Email')).toBeInTheDocument()
})

test('renders hint when provided', () => {
  render(<Input hint="Must be unique" />)
  expect(screen.getByText('Must be unique')).toBeInTheDocument()
})

test('renders error and hides hint when both provided', () => {
  render(<Input hint="Must be unique" error="Already taken" />)
  expect(screen.getByText('Already taken')).toBeInTheDocument()
  expect(screen.queryByText('Must be unique')).not.toBeInTheDocument()
})

test('forwards placeholder to the input', () => {
  render(<Input placeholder="you@example.com" />)
  expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument()
})

test('accepts typed input', async () => {
  render(<Input />)
  await userEvent.type(screen.getByRole('textbox'), 'hello')
  expect(screen.getByDisplayValue('hello')).toBeInTheDocument()
})
