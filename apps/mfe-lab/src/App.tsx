import { Button }        from '@repo/ui/button'
import { Badge }         from '@repo/ui/badge'
import { Card }          from '@repo/ui/card'
import { Tag }           from '@repo/ui/tag'
import { StatGrid }      from '@repo/ui/stat'
import { Terminal }      from '@repo/ui/terminal'
import { Status }        from '@repo/ui/status'
import { Toast }         from '@repo/ui/toast'
import { Pipeline }      from '@repo/ui/pipeline'
import { SectionHeader } from '@repo/ui/section-header'

export default function App() {
    return (
      <main>
        <h1>Lab</h1>
        <p>Interactive component sandbox — CSR intentional.</p>
        <Card
          meta="FEATURED · MFE"
          title="yacine.dev"
          subtitle="Production-grade microfrontend portfolio on Kubernetes."
          tags={
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '12px' }}>
              <Tag>Next.js 16</Tag>
              <Tag>Turborepo</Tag>
              <Tag accent>GitHub Actions</Tag>
            </div>
          }
        />
      </main>
    )
  }