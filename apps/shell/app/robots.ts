import type { MetadataRoute } from 'next'
import { siteConfig } from '@repo/seo/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules:   { userAgent: '*', allow: '/', disallow: ['/lab/', '/api/'] },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
