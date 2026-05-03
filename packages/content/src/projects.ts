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
  return path.resolve(__dirname, '../src/projects')
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
