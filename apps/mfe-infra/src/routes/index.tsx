import { createFileRoute } from '@tanstack/react-router'
import { ComingSoon } from '@repo/ui/coming-soon'
import { useSeo } from '@repo/seo/react'

export const Route = createFileRoute('/')({
  component: InfraPage,
})

function InfraPage() {
  useSeo({
    title:         'Infrastructure Dashboard',
    description:   'Live Kubernetes cluster monitoring, pod health, and deployment pipelines.',
    canonicalPath: '/infra',
  })

  return (
    <ComingSoon
      title="Infrastructure Dashboard"
      description="Live Kubernetes cluster monitoring, pod health, and deployment pipelines."
    />
  )
}
