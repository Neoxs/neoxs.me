import type { MetadataRoute } from 'next'
import { getAllProjects } from '@repo/content/projects'
import { getAllPosts }    from '@repo/content/blog'
import { siteConfig }    from '@repo/seo/site'

const url = (path: string) => `${siteConfig.url}${path}`

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllProjects().map(p => ({
    url:             url(`/projects/${p.slug}`),
    lastModified:    new Date(),
    changeFrequency: 'monthly' as const,
    priority:        0.9,
  }))

  const posts = getAllPosts().map(p => ({
    url:             url(`/blog/${p.slug}`),
    lastModified:    p.date ? new Date(p.date) : new Date(),
    changeFrequency: 'monthly' as const,
    priority:        0.7,
  }))

  return [
    { url: url('/'),        priority: 1.0, changeFrequency: 'weekly'  as const },
    { url: url('/projects'), priority: 0.9, changeFrequency: 'monthly' as const },
    { url: url('/blog'),    priority: 0.8, changeFrequency: 'weekly'  as const },
    { url: url('/infra'),   priority: 0.5, changeFrequency: 'daily'   as const },
    ...projects,
    ...posts,
  ]
}
