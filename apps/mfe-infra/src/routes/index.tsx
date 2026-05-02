import { createFileRoute } from '@tanstack/react-router'
import { ComingSoon } from '@repo/ui/coming-soon'

export const Route = createFileRoute('/')({
  component: InfraPage,
})

function InfraPage() {
  return (
    <ComingSoon
      title="Infrastructure Dashboard"
      description="Live Kubernetes cluster monitoring, pod health, and deployment pipelines."
    />
  )
}
