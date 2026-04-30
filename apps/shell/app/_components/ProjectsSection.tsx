import type { Project } from '@repo/content/projects'
import Link from 'next/link'
import { Badge } from '@repo/ui/badge'
import { Tag }   from '@repo/ui/tag'
import { SectionHeader } from '@repo/ui/section-header'

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const featured = projects.filter(p => p.featured)
  const rest      = projects.filter(p => !p.featured)

  return (
    <section id="work" className="section">
      <div className="container">

        <SectionHeader
          label="// SELECTED WORK"
          title="Projects"
          meta={`${projects.length} deployed`}
        />

        {/* Featured projects */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', marginBottom: '1px' }}>
          {featured.map(project => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <article style={{
                border:      '0.5px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                padding:     '24px',
                background:  'var(--color-surface)',
                transition:  'border-color 0.15s',
                cursor:      'pointer',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', gap: '12px', flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-teal)', letterSpacing: '2px', marginBottom: '6px' }}>
                      FEATURED · {project.tags.slice(0, 2).join(' · ').toUpperCase()}
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--color-text)', fontWeight: 400 }}>
                      {project.title}
                    </h2>
                  </div>
                  {project.live && <Badge variant="teal" dot>LIVE</Badge>}
                </div>

                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--color-text-3)', lineHeight: 1.7, marginBottom: '16px', maxWidth: '560px' }}>
                  {project.description}
                </p>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {project.tags.map((tag, i) => (
                    <Tag key={tag} accent={i === project.tags.length - 1}>{tag}</Tag>
                  ))}
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Compact grid for remaining */}
        {rest.length > 0 && (
          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap:                 '1px',
            background:          'var(--color-border)',
            border:              '0.5px solid var(--color-border)',
            borderRadius:        'var(--radius-sm)',
            overflow:            'hidden',
            marginTop:           '1px',
          }}>
            {rest.map(project => (
              <Link key={project.slug} href={`/projects/${project.slug}`} style={{ textDecoration: 'none' }}>
                <article style={{ background: 'var(--color-surface)', padding: '20px', height: '100%', transition: 'background 0.15s' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-text-3)', letterSpacing: '2px', marginBottom: '6px' }}>
                    {project.tags.slice(0, 2).join(' · ').toUpperCase()}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: 'var(--color-text)', fontWeight: 400, marginBottom: '8px' }}>
                    {project.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--color-text-3)', lineHeight: 1.65 }}>
                    {project.description}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}