import { getAllProjects } from '@repo/content/projects'
import { SectionHeader }  from '@repo/ui/section-header'
import { Badge }          from '@repo/ui/badge'
import { Tag }            from '@repo/ui/tag'
import Link               from 'next/link'
import type { Metadata }  from 'next'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title:       'Projects',
  description: 'Things I have shipped.',
}

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <main>
      <section className="section" style={{ borderTop: 'none', paddingTop: '56px' }}>
        <div className="container">
          <SectionHeader label="// ALL WORK" title="Projects" meta={`${projects.length} total`} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {projects.map((project, i) => (
              <Link key={project.slug} href={`/projects/${project.slug}`} style={{ textDecoration: 'none' }}>
                <article style={{
                  display:        'grid',
                  gridTemplateColumns: '1fr auto',
                  gap:            '24px',
                  alignItems:     'center',
                  padding:        '20px 0',
                  borderBottom:   i < projects.length - 1 ? '0.5px solid var(--color-border)' : 'none',
                  transition:     'opacity 0.15s',
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: 'var(--color-text)', fontWeight: 400 }}>
                        {project.title}
                      </h2>
                      {project.featured && <Badge variant="teal">FEATURED</Badge>}
                    </div>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-text-3)', lineHeight: 1.65, maxWidth: '520px', marginBottom: '10px' }}>
                      {project.description}
                    </p>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                      {project.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                    </div>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', color: 'var(--color-text-3)', flexShrink: 0 }}>→</span>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}