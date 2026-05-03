import type { Metadata } from 'next'
import type { AnySeoConfig } from './types'
import { mergeWithDefaults, siteConfig } from './site'

export function toNextMetadata(page: AnySeoConfig): Metadata {
  const r = mergeWithDefaults(page)

  return {
    title:       r.title,
    description: r.description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: r.canonicalUrl,
    },
    robots: {
      index:  !r.noIndex,
      follow: !r.noIndex,
    },
    icons: r.favicon ? { icon: r.favicon } : undefined,
    openGraph: {
      type:        r.isArticle ? 'article' : 'website',
      locale:      'en_US',
      url:         r.canonicalUrl,
      siteName:    r.siteName,
      title:       r.title,
      description: r.description,
      images:      r.imageUrl ? [{ url: r.imageUrl }] : [],
      ...(r.isArticle && r.publishedTime && {
        publishedTime: r.publishedTime,
        authors: [r.author],
        tags:    r.tags ?? [],
      }),
    },
    twitter: {
      card:        r.imageUrl ? 'summary_large_image' : 'summary',
      title:       r.title,
      description: r.description,
      images:      r.imageUrl ? [r.imageUrl] : [],
    },
  }
}
