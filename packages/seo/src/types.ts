export interface SiteConfig {
  name: string
  url: string
  author: string
  description: string
  twitterHandle?: string
  ogImage?: string
  favicon?: string
}

export interface PageSeoConfig {
  title: string
  description: string
  canonicalPath: string
  noIndex?: boolean
  imageUrl?: string
}

export interface ArticleSeoConfig extends PageSeoConfig {
  publishedTime: string
  tags?: string[]
}

export type AnySeoConfig = PageSeoConfig | ArticleSeoConfig

export function isArticle(config: AnySeoConfig): config is ArticleSeoConfig {
  return 'publishedTime' in config
}
