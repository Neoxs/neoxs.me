import { getAllProjects, getProjectBySlug } from '@repo/content/projects'
import { MDXRemote }    from 'next-mdx-remote/rsc'
import { notFound }     from 'next/navigation'
import Link             from 'next/link'
import { Tag }          from '@repo/ui/tag'
import { Prose }        from '@repo/ui/prose'
import type { Metadata } from 'next'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  return getAllProjects().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project  = getProjectBySlug(slug)
  if (!project) return {}
  return {
    title:       project.title,
    description: project.description,
    openGraph:   { title: project.title, description: project.description },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project  = getProjectBySlug(slug)
  if (!project) notFound()

  return (
    <main>
      <article className="section" style={{ borderTop: 'none', paddingTop: '56px' }}>
        <div className="container" style={{ maxWidth: '760px' }}>

          {/* Back */}
          <Link href="/projects" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-text-3)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '40px' }}>
            ← projects
          </Link>

          {/* Header */}
          <div style={{ marginBottom: '48px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--color-teal)', letterSpacing: '3px', marginBottom: '16px' }}>
              // PROJECT
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 400, color: 'var(--color-text)', lineHeight: 1.15, marginBottom: '16px' }}>
              {project.title}
            </h1>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-text-3)', lineHeight: 1.7, marginBottom: '24px' }}>
              {project.description}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', paddingTop: '20px', borderTop: '0.5px solid var(--color-border)' }}>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', flex: 1 }}>
                {project.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
              </div>
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-teal)', border: '0.5px solid var(--color-teal-border)', padding: '5px 12px', borderRadius: 'var(--radius-sm)', textDecoration: 'none', background: 'var(--color-teal-dim)' }}>
                    live →
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-text-3)', border: '0.5px solid var(--color-border-2)', padding: '5px 12px', borderRadius: 'var(--radius-sm)', textDecoration: 'none' }}>
                    github
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* MDX content */}
          <Prose>
            <MDXRemote source={project.content} />
          </Prose>

        </div>
      </article>
    </main>
  )
}