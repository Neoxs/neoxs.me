import { render, screen } from '@testing-library/react'
import { Route } from './index'

// Grab the component without needing a full router context —
// InfraPage uses no router hooks (no useNavigate, useParams, etc.)
const InfraPage = Route.options.component as React.FC

test('renders the page title', () => {
  render(<InfraPage />)
  expect(screen.getByText('Infrastructure Dashboard')).toBeInTheDocument()
})

test('renders the description', () => {
  render(<InfraPage />)
  expect(
    screen.getByText('Live Kubernetes cluster monitoring, pod health, and deployment pipelines.')
  ).toBeInTheDocument()
})
