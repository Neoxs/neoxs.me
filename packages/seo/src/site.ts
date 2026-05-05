import type { SiteConfig, AnySeoConfig } from './types'

export const siteConfig: SiteConfig = {
  name:        'neoxs.me',
  url:         'https://neoxs.me',
  author:      'Yacine Kharoubi',
  description:
    'Yacine Kharoubi — software engineer in Paris (Rakuten France). Frontend-first: React, Next.js, Vue. CI/CD, Kubernetes, Docker. Portfolio & blog at neoxs.me — a microfrontend monorepo I grow end-to-end.',
  ogImage:     '/opengraph-image.jpg',
  favicon:     '/favicon.ico',
}

export interface ResolvedSeoConfig {
  title:         string
  description:   string
  canonicalUrl:  string
  noIndex:       boolean
  siteName:      string
  siteUrl:       string
  author:        string
  imageUrl?:     string
  favicon?:      string
  publishedTime?: string
  tags?:          string[]
  isArticle:     boolean
}

export function mergeWithDefaults(page: AnySeoConfig): ResolvedSeoConfig {
  const isArticle = 'publishedTime' in page

  return {
    title:        `${page.title} — ${siteConfig.name}`,
    description:  page.description,
    canonicalUrl: `${siteConfig.url}${page.canonicalPath}`,
    noIndex:      page.noIndex ?? false,
    siteName:     siteConfig.name,
    siteUrl:      siteConfig.url,
    author:       siteConfig.author,
    imageUrl:     page.imageUrl ?? siteConfig.ogImage,
    favicon:      siteConfig.favicon,
    isArticle,
    ...(isArticle && {
      publishedTime: page.publishedTime,
      tags:          page.tags,
    }),
  }
}
