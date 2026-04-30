import fs from 'fs'
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

function getProjectsDir() {
  return path.join(process.cwd(), '../../packages/content/src/projects')
}

export function getAllProjects(): Project[] {
  const dir = getProjectsDir()
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith('.mdx'))
    .map(filename => {
      const slug = filename.replace('.mdx', '')
      const raw = fs.readFileSync(path.join(dir, filename), 'utf-8')
      const { data, content } = matter(raw)
      return {
        slug,
        content,
        ...(data as Omit<Project, 'slug' | 'content' | 'featured' | 'tags'>),
        featured: (data as Partial<Project>).featured ?? false,
        tags: (data as Partial<Project>).tags ?? [],
      }
    })
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find(p => p.slug === slug)
}