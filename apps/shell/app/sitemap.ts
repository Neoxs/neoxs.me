import type { MetadataRoute } from 'next'
import { getAllProjects }     from '@repo/content/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllProjects().map(p => ({
    url:             `https://neoxs.me/projects/${p.slug}`,
    lastModified:    new Date(),
    changeFrequency: 'monthly' as const,
    priority:        0.9,
  }))

  return [
    { url: 'https://neoxs.me',          priority: 1.0, changeFrequency: 'weekly'  as const },
    { url: 'https://neoxs.me/projects', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: 'https://neoxs.me/blog',     priority: 0.8, changeFrequency: 'weekly'  as const },
    { url: 'https://neoxs.me/infra',    priority: 0.5, changeFrequency: 'daily'   as const },
    ...projects,
  ]
}