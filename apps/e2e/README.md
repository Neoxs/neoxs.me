# e2e

End-to-end test suite for the full neoxs.me microfrontend stack. Built with **Playwright** (Chromium), it runs against the complete Docker Compose environment to validate cross-MFE routing and SEO correctness.

## What's tested

### `tests/navigation.spec.ts`

Cross-MFE routing through the Nginx ingress layer:

| Test | What it validates |
|------|------------------|
| Shell home loads | `GET /` returns the shell with correct title and hero text |
| `/blog` routes to Nuxt MFE | Nginx correctly proxies to `mfe-blog`; Nuxt assets are served |
| `/lab/` routes to React lab MFE | Nginx correctly proxies to `mfe-lab`; React app is visible |
| `/infra/` routes to infra MFE | Nginx correctly proxies to `mfe-infra` |
| `/healthz` returns 200 | Nginx health check endpoint responds with `ok` |

### `tests/seo.spec.ts`

`@repo/seo` integration across frameworks:

| Test | What it validates |
|------|------------------|
| Shell `meta[name="description"]` | Correct description content |
| Shell `og:title` | Contains `neoxs.me` |
| Blog index `meta[name="description"]` | Correct description for `/blog` |
| Blog index `og:type` | `website` |
| Blog article `og:type` | `article` (navigates to first post) |
| Canonical links | All pages have a `https://neoxs.me/...` canonical |
| Favicon | Shell has `<link rel="icon">` |

## Running the tests

E2E tests require the **full Docker Compose stack** to be running first.

```bash
# 1. Start the full stack
docker compose up --build -d

# 2. Wait for the stack to be healthy (check http://localhost/healthz)

# 3. Run E2E tests
pnpm --filter e2e test:e2e

# 4. Tear down
docker compose down
```

### Interactive / headed mode

```bash
pnpm --filter e2e test:ui
```

Launches the Playwright UI for stepping through tests visually.

### View the last report

```bash
pnpm --filter e2e report
```

## Configuration

`playwright.config.ts` key settings:

| Setting | Value |
|---------|-------|
| `baseURL` | `http://localhost` (the Nginx ingress) |
| Browser | Chromium only |
| Retries in CI | 2 |
| Reporter in CI | `github` (annotates PR checks) |
| Trace | Saved on first retry |

## Adding tests

Create a new spec file under `tests/`:

```bash
tests/my-feature.spec.ts
```

Playwright picks it up automatically. Use `baseURL`-relative paths so the tests work identically locally and in CI:

```ts
import { test, expect } from '@playwright/test'

test('my feature works', async ({ page }) => {
  await page.goto('/blog')          // → http://localhost/blog
  await expect(page.locator('h1')).toBeVisible()
})
```

## CI behaviour

In CI (`ci.yml`), the E2E job:

1. Builds and starts the stack with `docker compose up --build -d`
2. Polls `/healthz` until it returns 200
3. Installs Playwright Chromium via `pnpm install`
4. Runs `pnpm --filter e2e test:e2e`
5. Uploads the Playwright report as a CI artifact on failure
6. Always runs `docker compose down` as a cleanup step
