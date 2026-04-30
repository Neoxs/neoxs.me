import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface Post {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  content: string
}

function getBlogDir() {
  return path.join(process.cwd(), '../../packages/content/src/blog')
}

export function getAllPosts(): Post[] {
  const dir = getBlogDir()
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
        tags: [],
        ...(data as Omit<Post, 'slug' | 'content'>),
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find(p => p.slug === slug)
}