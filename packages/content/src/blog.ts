import fs   from 'fs'
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

function getBlogDir(): string {
  // apps/mfe-blog/content/blog is the single source of truth for blog posts
  return path.resolve(__dirname, '../../../apps/mfe-blog/content/blog')
}

export function getAllPosts(dir = getBlogDir()): Post[] {
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((f: string) => f.endsWith('.md') || f.endsWith('.mdx'))
    .map((filename: string) => {
      const slug = filename.replace(/\.mdx?$/, '')
      const raw  = fs.readFileSync(path.join(dir, filename), 'utf-8')
      const { data, content } = matter(raw)
      const { tags, ...rest } = data as Omit<Post, 'slug' | 'content'>
      return {
        slug,
        content,
        tags: tags ?? [],
        ...rest,
      }
    })
    .sort((a: Post, b: Post) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string, dir?: string): Post | undefined {
  return getAllPosts(dir).find(p => p.slug === slug)
}
