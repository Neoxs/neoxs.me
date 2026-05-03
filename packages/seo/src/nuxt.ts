import type { AnySeoConfig } from './types'
import { mergeWithDefaults, siteConfig } from './site'

export interface NuxtSeoMeta {
  title:             string
  description:       string
  ogTitle:           string
  ogDescription:     string
  ogUrl:             string
  ogSiteName:        string
  ogType:            string
  ogImage?:          string
  twitterCard:       string
  twitterTitle:      string
  twitterDescription: string
  twitterImage?:     string
  articlePublishedTime?: string
  articleAuthor?:        string
  articleTag?:           string[]
}

export interface NuxtHead {
  link?: Array<{ rel: string; type?: string; href: string }>
}

export function toNuxtSeoMeta(page: AnySeoConfig): NuxtSeoMeta {
  const r = mergeWithDefaults(page)

  return {
    title:             r.title,
    description:       r.description,
    ogTitle:           r.title,
    ogDescription:     r.description,
    ogUrl:             r.canonicalUrl,
    ogSiteName:        r.siteName,
    ogType:            r.isArticle ? 'article' : 'website',
    ogImage:           r.imageUrl,
    twitterCard:       r.imageUrl ? 'summary_large_image' : 'summary',
    twitterTitle:      r.title,
    twitterDescription: r.description,
    twitterImage:      r.imageUrl,
    ...(r.isArticle && {
      articlePublishedTime: r.publishedTime,
      articleAuthor:        r.author,
      articleTag:           r.tags ?? [],
    }),
  }
}

export function toNuxtHead(): NuxtHead {
  const favicon = siteConfig.favicon
  if (!favicon) return {}
  return {
    link: [{ rel: 'icon', type: 'image/png', href: favicon }],
  }
}
