import { test, expect } from '@playwright/test'

test('shell home page loads', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/neoxs\.me/)
  // Hero text unique to shell
  await expect(page.getByText('Building interfaces')).toBeVisible()
})

test('/blog routes to the Nuxt MFE', async ({ page }) => {
  await page.goto('/blog')
  // Title rendered by mfe-blog (Nuxt)
  await expect(page.locator('h1')).toContainText('Blog')
  // Nuxt serves its own _nuxt assets — confirming the right app responded
  await expect(page).toHaveURL(/\/blog/)
})

test('/lab/ routes to the React lab MFE', async ({ page }) => {
  await page.goto('/lab/')
  await expect(page.getByText('Component Lab')).toBeVisible()
  await expect(page).toHaveURL(/\/lab\//)
})

test('/infra/ routes to the React infra MFE', async ({ page }) => {
  await page.goto('/infra/')
  await expect(page.getByText('Infrastructure Dashboard')).toBeVisible()
  await expect(page).toHaveURL(/\/infra\//)
})

test('/healthz returns 200', async ({ request }) => {
  const response = await request.get('/healthz')
  expect(response.status()).toBe(200)
  expect(await response.text()).toContain('ok')
})
