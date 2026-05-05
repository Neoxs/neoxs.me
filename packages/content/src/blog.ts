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
  // __dirname is the bundle output dir in Next.js webpack builds, not the source dir.
  // Try candidates in order; fs.existsSync picks the one that's actually on disk.
  const candidates = [
    path.resolve(__dirname, '../../../apps/mfe-blog/content/blog'),         // vitest / ts-node
    path.join(process.cwd(), '../mfe-blog/content/blog'),                   // Next.js: CWD = apps/shell/
    path.join(process.cwd(), 'apps/mfe-blog/content/blog'),                 // Next.js: CWD = monorepo root
  ]
  return candidates.find(dir => fs.existsSync(dir)) ?? candidates[0]!
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
