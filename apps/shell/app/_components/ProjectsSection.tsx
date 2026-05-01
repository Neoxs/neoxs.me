'use client'

import Link               from 'next/link'
import { useState }       from 'react'
import type { Project }   from '@repo/content/projects'
import { Badge }          from '@repo/ui/badge'
import { Tag }            from '@repo/ui/tag'
import { SectionHeader }  from '@repo/ui/section-header'

const FEATURED_LIMIT = 1
const COMPACT_LIMIT  = 3

function FeaturedCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link href={`/projects/${project.slug}`} style={{ textDecoration: 'none' }}>
      <article
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background:   hovered ? 'var(--color-elevated)' : 'var(--color-surface)',
          border:       '0.5px solid var(--color-border)',
          borderLeft:   `2px solid ${hovered ? 'var(--color-teal)' : 'var(--color-teal-border)'}`,
          borderRadius: 'var(--radius-sm)',
          padding:      'clamp(var(--space-16), 3vw, var(--space-24))',
          transition:   'background 0.15s, border-color 0.15s',
          cursor:       'pointer',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-16)', gap: 'var(--space-12)', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-10)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-9)', color: 'var(--color-teal)', letterSpacing: '2px' }}>
              FEATURED
            </div>
            {project.live && <Badge variant="teal" dot>LIVE</Badge>}
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-13)', color: hovered ? 'var(--color-teal)' : 'var(--color-text-3)', transition: 'color 0.15s' }}>→</span>
        </div>

        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(var(--text-18), 3vw, var(--text-24))', color: 'var(--color-text)', fontWeight: 400, marginBottom: 'var(--space-12)', letterSpacing: '-0.01em' }}>
          {project.title}
        </h2>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-13)', color: 'var(--color-text-2)', lineHeight: 1.7, marginBottom: 'var(--space-16)', maxWidth: '560px' }}>
          {project.description}
        </p>

        <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
          {project.tags.map((tag, i) => (
            <Tag key={tag} accent={i === 0}>{tag}</Tag>
          ))}
        </div>
      </article>
    </Link>
  )
}

function CompactCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link href={`/projects/${project.slug}`} style={{ textDecoration: 'none' }}>
      <article
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background:  hovered ? 'var(--color-elevated)' : 'var(--color-surface)',
          padding:     'var(--space-20)',
          height:      '100%',
          transition:  'background 0.15s',
          cursor:      'pointer',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-8)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-9)', color: 'var(--color-text-3)', letterSpacing: '2px' }}>
            {project.tags.slice(0, 2).join(' · ').toUpperCase()}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>
            {project.live && (
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--color-teal)', display: 'inline-block' }} />
            )}
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-11)', color: hovered ? 'var(--color-teal)' : 'var(--color-text-3)', transition: 'color 0.15s' }}>→</span>
          </div>
        </div>

        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-18)', color: 'var(--color-text)', fontWeight: 400, marginBottom: 'var(--space-8)', letterSpacing: '-0.01em' }}>
          {project.title}
        </h3>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-12)', color: 'var(--color-text-2)', lineHeight: 1.65 }}>
          {project.description}
        </p>
      </article>
    </Link>
  )
}

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const featured = projects.filter(p => p.featured).slice(0, FEATURED_LIMIT)
  const compact  = projects.filter(p => !p.featured).slice(0, COMPACT_LIMIT)

  return (
    <section id="work" className="section">
      <div className="container">

        <SectionHeader
          label="// SELECTED WORK"
          title="Projects"
          meta={`${projects.length} total`}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', marginBottom: 'var(--space-1)' }}>
          {featured.map(p => <FeaturedCard key={p.slug} project={p} />)}
        </div>

        {compact.length > 0 && (
          <div className="projects-grid">
            {compact.map(p => <CompactCard key={p.slug} project={p} />)}
          </div>
        )}

        {/* View all CTA */}
        <div style={{ marginTop: 'var(--space-32)', display: 'flex', justifyContent: 'flex-end' }}>
          <Link
            href="/projects"
            style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      'var(--text-11)',
              color:         'var(--color-teal)',
              border:        '0.5px solid var(--color-border-2)',
              padding:       'var(--space-6) var(--space-14)',
              borderRadius:  'var(--radius-sm)',
              textDecoration:'none',
              letterSpacing: '0.04em',
            }}
          >
            all {projects.length} projects →
          </Link>
        </div>

      </div>
    </section>
  )
}
