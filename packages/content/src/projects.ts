import fs   from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface Project {
  slug: string
  title: string
  description: string
  tags: string[]
  live?: string
  github?: string
  featured: boolean
  content: string
}

function getProjectsDir(): string {
  // __dirname is the bundle output dir in Next.js webpack builds, not the source dir.
  // Try candidates in order; fs.existsSync picks the one that's actually on disk.
  const candidates = [
    path.resolve(__dirname, '../src/projects'),                               // vitest / ts-node: __dirname = packages/content/src/
    path.join(process.cwd(), '../../packages/content/src/projects'),          // Next.js: CWD = apps/shell/
    path.join(process.cwd(), 'packages/content/src/projects'),                // Next.js: CWD = monorepo root
  ]
  return candidates.find(dir => fs.existsSync(dir)) ?? candidates[0]!
}

/** Shell home: 1 featured row + 3 compact — pin this quartet first, then the rest. */
const SHELL_HOME_PROJECT_ORDER = [
  'rakuten-france',
  'alwasaet-scholarship-management',
  'lasting-dynamics-insurance',
  'neoxs-me',
] as const

function shellHomeOrderRank(slug: string): number {
  const i = SHELL_HOME_PROJECT_ORDER.indexOf(slug as (typeof SHELL_HOME_PROJECT_ORDER)[number])
  return i === -1 ? SHELL_HOME_PROJECT_ORDER.length : i
}

function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    const ra = shellHomeOrderRank(a.slug)
    const rb = shellHomeOrderRank(b.slug)
    if (ra !== rb) return ra - rb
    if (a.featured !== b.featured) return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
    return a.slug.localeCompare(b.slug)
  })
}

export function getAllProjects(dir = getProjectsDir()): Project[] {
  if (!fs.existsSync(dir)) return []

  const projects = fs
    .readdirSync(dir)
    .filter((f: string) => f.endsWith('.md') || f.endsWith('.mdx'))
    .map((filename: string) => {
      const slug = filename.replace(/\.mdx?$/, '')
      const raw  = fs.readFileSync(path.join(dir, filename), 'utf-8')
      const { data, content } = matter(raw)
      return {
        slug,
        content,
        ...(data as Omit<Project, 'slug' | 'content' | 'featured' | 'tags'>),
        featured: (data as Partial<Project>).featured ?? false,
        tags:     (data as Partial<Project>).tags     ?? [],
      }
    })

  return sortProjects(projects)
}

export function getProjectBySlug(slug: string, dir?: string): Project | undefined {
  return getAllProjects(dir).find(p => p.slug === slug)
}
