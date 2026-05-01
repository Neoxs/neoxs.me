'use client'

import Link             from 'next/link'
import { useState }     from 'react'
import type { Project } from '@repo/content/projects'
import { Badge }        from '@repo/ui/badge'
import { Tag }          from '@repo/ui/tag'

const MAX_TAGS = 3

function ProjectRow({ project, index, last }: { project: Project; index: number; last: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link href={`/projects/${project.slug}`} style={{ textDecoration: 'none' }}>
      <article
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display:    'grid',
          gridTemplateColumns: 'var(--space-40) 1fr auto',
          gap:        'var(--space-20)',
          alignItems: 'center',
          padding:    'var(--space-20) var(--space-12)',
          borderBottom:  last ? 'none' : '0.5px solid var(--color-border)',
          borderLeft:    `2px solid ${hovered && project.featured ? 'var(--color-teal)' : project.featured ? 'var(--color-teal-border)' : 'transparent'}`,
          background:    hovered ? 'var(--color-surface)' : 'var(--color-bg)',
          transition:    'background 0.15s, border-color 0.15s',
          cursor:        'pointer',
        }}
      >
        {/* Index */}
        <div style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      'var(--text-10)',
          color:         'var(--color-text-3)',
          letterSpacing: '1px',
          flexShrink:    0,
        }}>
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Content */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-10)', marginBottom: 'var(--space-6)', flexWrap: 'wrap' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-18)', color: 'var(--color-text)', fontWeight: 400, letterSpacing: '-0.01em' }}>
              {project.title}
            </h2>
            {project.featured && <Badge variant="teal">FEATURED</Badge>}
            {project.live     && <Badge variant="teal" dot>LIVE</Badge>}
          </div>

          <p style={{
            fontFamily:        'var(--font-mono)',
            fontSize:          'var(--text-12)',
            color:             'var(--color-text-2)',
            lineHeight:        1.65,
            maxWidth:          '520px',
            marginBottom:      'var(--space-10)',
            overflow:          'hidden',
            display:           '-webkit-box',
            WebkitLineClamp:   2,
            WebkitBoxOrient:   'vertical' as const,
          }}>
            {project.description}
          </p>

          <div style={{ display: 'flex', gap: 'var(--space-5)', flexWrap: 'wrap' }}>
            {project.tags.slice(0, MAX_TAGS).map((tag, i) => (
              <Tag key={tag} accent={i === 0}>{tag}</Tag>
            ))}
            {project.tags.length > MAX_TAGS && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-9)', color: 'var(--color-text-3)', alignSelf: 'center' }}>
                +{project.tags.length - MAX_TAGS}
              </span>
            )}
          </div>
        </div>

        {/* Arrow */}
        <span style={{
          fontFamily:  'var(--font-mono)',
          fontSize:    'var(--text-16)',
          color:       hovered ? 'var(--color-teal)' : 'var(--color-text-3)',
          flexShrink:  0,
          transition:  'color 0.15s, transform 0.15s',
          transform:   hovered ? 'translateX(4px)' : 'translateX(0)',
          display:     'inline-block',
        }}>
          →
        </span>
      </article>
    </Link>
  )
}

export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div style={{ border: '0.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
      {projects.map((project, i) => (
        <ProjectRow key={project.slug} project={project} index={i} last={i === projects.length - 1} />
      ))}
    </div>
  )
}
