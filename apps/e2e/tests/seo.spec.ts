import { test, expect } from '@playwright/test'

test('shell home has correct meta description', async ({ page }) => {
  await page.goto('/')
  const description = page.locator('meta[name="description"]')
  await expect(description).toHaveAttribute('content', /frontend engineer/i)
})

test('shell home has og:title', async ({ page }) => {
  await page.goto('/')
  const ogTitle = page.locator('meta[property="og:title"]')
  await expect(ogTitle).toHaveAttribute('content', /neoxs\.me/i)
})

test('blog index has correct meta description', async ({ page }) => {
  await page.goto('/blog')
  const description = page.locator('meta[name="description"]')
  await expect(description).toHaveAttribute('content', /frontend engineering/i)
})

test('blog index has og:type website', async ({ page }) => {
  await page.goto('/blog')
  const ogType = page.locator('meta[property="og:type"]')
  await expect(ogType).toHaveAttribute('content', 'website')
})

test('blog article page has og:type article', async ({ page }) => {
  // Navigate to the blog index first and follow the first article link
  await page.goto('/blog')
  const firstArticle = page.locator('a[href*="/blog/"]').first()
  await firstArticle.click()
  await page.waitForLoadState('networkidle')

  const ogType = page.locator('meta[property="og:type"]')
  await expect(ogType).toHaveAttribute('content', 'article')
})

test('all pages have a canonical link', async ({ page }) => {
  for (const path of ['/', '/blog']) {
    await page.goto(path)
    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute('href', /https:\/\/neoxs\.me/)
  }
})

test('favicon is present on the shell', async ({ page }) => {
  await page.goto('/')
  const favicon = page.locator('link[rel="icon"]')
  await expect(favicon).toHaveAttribute('href', /favicon/)
})
