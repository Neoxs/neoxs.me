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

export function getAllProjects(dir = getProjectsDir()): Project[] {
  if (!fs.existsSync(dir)) return []

  return fs
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
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
}

export function getProjectBySlug(slug: string, dir?: string): Project | undefined {
  return getAllProjects(dir).find(p => p.slug === slug)
}
