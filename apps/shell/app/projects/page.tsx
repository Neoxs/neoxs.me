import { getAllProjects }  from '@repo/content/projects'
import { ProjectList }     from './_components/ProjectList'
import Link                from 'next/link'
import type { Metadata }   from 'next'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title:       'Projects',
  description: 'Things I have shipped.',
}

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <main style={{ minHeight: 'calc(100dvh - 52px)', display: 'flex', flexDirection: 'column' }}>
      <section style={{ flex: 1, padding: 'var(--space-48) 0 var(--space-80)' }}>
        <div className="container">

          {/* Back link */}
          <Link href="/" style={{
            display:       'inline-flex',
            alignItems:    'center',
            gap:           'var(--space-6)',
            fontFamily:    'var(--font-mono)',
            fontSize:      'var(--text-11)',
            color:         'var(--color-text-2)',
            textDecoration:'none',
            marginBottom:  'var(--space-40)',
            letterSpacing: '0.04em',
          }}>
            ← home
          </Link>

          {/* Header */}
          <div style={{ marginBottom: 'var(--space-32)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-9)', color: 'var(--color-teal)', letterSpacing: '3px', marginBottom: 'var(--space-6)' }}>
              // ALL WORK
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-32)', color: 'var(--color-text)', fontWeight: 400 }}>
                Projects
              </h1>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-9)', color: 'var(--color-text-3)' }}>
                {projects.length} total
              </span>
            </div>
          </div>

          <ProjectList projects={projects} />

        </div>
      </section>
    </main>
  )
}
