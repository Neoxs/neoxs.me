import { useEffect } from 'react'
import type { AnySeoConfig } from './types'
import { mergeWithDefaults } from './site'

type MetaEntry = { property?: string; name?: string; content: string }

function syncHead(entries: MetaEntry[], title: string, favicon?: string) {
  document.title = title
  document.querySelectorAll('[data-seo-managed]').forEach(el => el.remove())

  const fragment = document.createDocumentFragment()

  entries.forEach(({ property, name, content }) => {
    const el = document.createElement('meta')
    if (property) el.setAttribute('property', property)
    if (name)     el.setAttribute('name', name)
    el.setAttribute('content', content)
    el.setAttribute('data-seo-managed', '')
    fragment.appendChild(el)
  })

  if (favicon && !document.querySelector(`link[rel="icon"]`)) {
    const link = document.createElement('link')
    link.rel  = 'icon'
    link.type = 'image/png'
    link.href = favicon
    fragment.appendChild(link)
  }

  document.head.appendChild(fragment)
}

export function useSeo(page: AnySeoConfig) {
  useEffect(() => {
    const r = mergeWithDefaults(page)

    syncHead([
      { name: 'description',           content: r.description },
      { property: 'og:title',          content: r.title },
      { property: 'og:description',    content: r.description },
      { property: 'og:url',            content: r.canonicalUrl },
      { property: 'og:site_name',      content: r.siteName },
      { property: 'og:type',           content: r.isArticle ? 'article' : 'website' },
      ...(r.imageUrl ? [{ property: 'og:image', content: r.imageUrl }] : []),
      { name: 'twitter:card',          content: r.imageUrl ? 'summary_large_image' : 'summary' },
      { name: 'twitter:title',         content: r.title },
      { name: 'twitter:description',   content: r.description },
      ...(r.imageUrl ? [{ name: 'twitter:image', content: r.imageUrl }] : []),
      ...(r.isArticle && r.publishedTime
        ? [{ property: 'article:published_time', content: r.publishedTime }]
        : []),
    ], r.title, r.favicon)
  }, [page.title, page.description, page.canonicalPath])
}
