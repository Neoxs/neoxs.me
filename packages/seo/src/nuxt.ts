import type { AnySeoConfig } from './types'
import { mergeWithDefaults, siteConfig } from './site'

export interface NuxtSeoMeta {
  title:             string
  description:       string
  ogTitle:           string
  ogDescription:     string
  ogUrl:             string
  ogSiteName:        string
  ogType:            'website' | 'article'
  ogImage?:          string
  twitterCard:       'summary' | 'summary_large_image'
  twitterTitle:      string
  twitterDescription: string
  twitterImage?:     string
  articlePublishedTime?: string
  articleAuthor?:        string[]
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
      articleAuthor:        [r.author],
      articleTag:           r.tags ?? [],
    }),
  }
}

export function toNuxtHead(page?: AnySeoConfig): NuxtHead {
  const links: Array<{ rel: string; type?: string; href: string }> = []

  if (page) {
    const r = mergeWithDefaults(page)
    links.push({ rel: 'canonical', href: r.canonicalUrl })
  }

  const favicon = siteConfig.favicon
  if (favicon) {
    links.push({ rel: 'icon', type: 'image/png', href: favicon })
  }

  return links.length ? { link: links } : {}
}
