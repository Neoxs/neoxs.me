import { getAllProjects, getProjectBySlug } from '@repo/content/projects'
import { MDXRemote }    from 'next-mdx-remote/rsc'
import { notFound }     from 'next/navigation'
import Link             from 'next/link'
import { Tag }          from '@repo/ui/tag'
import { Prose }        from '@repo/ui/prose'
import type { Metadata } from 'next'
import { toNextMetadata } from '@repo/seo/next'
import { TocSidebar }   from './TocSidebar'
import { ReadingProgress } from './ReadingProgress'
import styles from './page.module.css'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  return getAllProjects().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project  = getProjectBySlug(slug)
  if (!project) return {}
  return toNextMetadata({
    title:         project.title,
    description:   project.description,
    canonicalPath: `/projects/${slug}`,
  })
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function extractToc(content: string) {
  const re = /^(#{2,3})\s+(.+)$/gm
  const items: { id: string; text: string; depth: number }[] = []
  let match
  while ((match = re.exec(content)) !== null) {
    items.push({ id: slugify(match[2].trim()), text: match[2].trim(), depth: match[1].length })
  }
  return items
}

function readingTime(content: string): number {
  return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200))
}

const mdxComponents = {
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 id={slugify(String(children))}>{children}</h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 id={slugify(String(children))}>{children}</h3>
  ),
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project  = getProjectBySlug(slug)
  if (!project) notFound()

  const toc  = extractToc(project.content)
  const mins = readingTime(project.content)

  return (
    <main>
      <ReadingProgress />

      <div className={styles.layout}>
        <article className={styles.content}>

          <Link href="/projects" className={styles.backLink}>← projects</Link>

          <header className={styles.header}>
            <div className={styles.eyebrow}>// PROJECT · {mins} MIN READ</div>
            <h1 className={styles.title}>{project.title}</h1>
            <p className={styles.description}>{project.description}</p>

            <div className={styles.meta}>
              <div className={styles.tags}>
                {project.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
              </div>
              <div className={styles.links}>
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className={styles.linkLive}>
                    live →
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.linkGithub}>
                    github
                  </a>
                )}
              </div>
            </div>
          </header>

          <Prose>
            <MDXRemote source={project.content} components={mdxComponents} />
          </Prose>

          <footer className={styles.footer}>
            <Link href="/projects" className={styles.backLink}>← back to projects</Link>
          </footer>

        </article>

        <TocSidebar items={toc} />
      </div>
    </main>
  )
}
