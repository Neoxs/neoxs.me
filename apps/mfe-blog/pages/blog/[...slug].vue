<script setup lang="ts">
import { toNuxtSeoMeta } from '@repo/seo/nuxt'

const route = useRoute()

const { data: post } = await useAsyncData(
  route.path,
  () => queryContent(route.path).findOne()
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

interface TocLink {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}

function flattenToc(links: TocLink[]): TocLink[] {
  return links.flatMap(link => [
    { id: link.id, text: link.text, depth: link.depth },
    ...(link.children ? flattenToc(link.children) : []),
  ])
}

const tocLinks = computed(() =>
  flattenToc((post.value?.body as any)?.toc?.links ?? [])
)

function estimateReadingTime(p: any): number {
  const words = JSON.stringify(p?.body ?? '').split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

const readingTime = computed(() =>
  post.value?.readingTime ?? estimateReadingTime(post.value)
)

function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day)))
}

const activeHeading = ref('')
let headingObserver: IntersectionObserver | null = null

onMounted(() => {
  nextTick(() => {
    headingObserver = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) activeHeading.value = entry.target.id
        }
      },
      { rootMargin: '-10% 0% -80% 0%' }
    )
    document.querySelectorAll('h2, h3').forEach(el => headingObserver!.observe(el))
  })
})

onUnmounted(() => headingObserver?.disconnect())

useSeoMeta(toNuxtSeoMeta({
  title:         post.value.title,
  description:   post.value.description ?? '',
  canonicalPath: route.path,
  publishedTime: post.value.date ? new Date(post.value.date).toISOString() : new Date().toISOString(),
  tags:          post.value.tags ?? [],
}))
</script>

<template>
  <div v-if="post">
    <ClientOnly>
      <ReadingProgress />
    </ClientOnly>

    <div class="article-layout">
      <!-- Article -->
      <article class="article-content">
        <NuxtLink to="/blog" class="top-back-link">← back to blog</NuxtLink>

        <header class="post-header">
          <div class="eyebrow">BLOG · {{ readingTime }} MIN READ</div>
          <h1 class="post-title">{{ post.title }}</h1>
          <p class="post-desc">{{ post.description }}</p>

          <div class="post-meta">
            <div class="avatar" aria-hidden="true">Y</div>
            <span class="author">Yacine</span>
            <span class="sep" aria-hidden="true">·</span>
            <time class="date" :datetime="post.date">{{ formatDate(post.date) }}</time>
          </div>

          <div v-if="post.tags?.length" class="post-tags">
            <BlogTag v-for="tag in post.tags" :key="tag" :label="tag" />
          </div>
        </header>

        <div class="prose">
          <ContentRenderer :value="post" />
        </div>

        <footer class="article-footer">
          <NuxtLink to="/blog" class="back-link">← back to blog</NuxtLink>
        </footer>
      </article>

      <!-- TOC sidebar -->
      <aside v-if="tocLinks.length > 0" class="toc-sidebar" aria-label="Table of contents">
        <div class="toc-label">ON THIS PAGE</div>
        <nav class="toc-nav">
          <a
            v-for="item in tocLinks"
            :key="item.id"
            :href="`#${item.id}`"
            :class="['toc-link', `depth-${item.depth}`, { active: activeHeading === item.id }]"
          >
            {{ item.text }}
          </a>
        </nav>
      </aside>
    </div>
  </div>
</template>

<style scoped>
/* ── Layout ─────────────────────────────────────── */
.article-layout {
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-80) var(--space-40);
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-48);
  align-items: start;
  border-top: 0.5px solid var(--color-border);
}

@media (min-width: 900px) {
  .article-layout {
    grid-template-columns: 1fr 200px;
  }
}

@media (max-width: 768px) {
  .article-layout {
    padding: var(--space-48) var(--space-20);
  }
}

.article-content {
  min-width: 0;
  max-width: 720px;
}

/* ── Top back link ───────────────────────────────── */
.top-back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-6);
  font-family: var(--font-mono);
  font-size: var(--text-11);
  color: var(--color-text-2);
  text-decoration: none;
  letter-spacing: 0.04em;
  margin-bottom: var(--space-40);
  transition: color 0.15s;
}

.top-back-link:hover {
  color: var(--color-teal);
}

/* ── Post header ─────────────────────────────────── */
.post-header {
  margin-bottom: var(--space-48);
}

.eyebrow {
  font-family: var(--font-mono);
  font-size: var(--text-9);
  color: var(--color-teal);
  letter-spacing: 3px;
  margin-bottom: var(--space-16);
}

.post-title {
  font-family: var(--font-serif);
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 400;
  color: var(--color-text);
  line-height: 1.15;
  letter-spacing: -0.01em;
  margin-bottom: var(--space-16);
}

.post-desc {
  font-family: var(--font-mono);
  font-size: var(--text-12);
  color: var(--color-text-2);
  line-height: 1.7;
  max-width: 560px;
  margin-bottom: var(--space-24);
}

.post-meta {
  display: flex;
  align-items: center;
  gap: var(--space-12);
  padding-top: var(--space-20);
  border-top: 0.5px solid var(--color-border);
  margin-bottom: var(--space-16);
}

.avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--color-teal-dim);
  border: 0.5px solid var(--color-teal-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: var(--text-10);
  color: var(--color-teal);
  flex-shrink: 0;
}

.author {
  font-family: var(--font-mono);
  font-size: var(--text-10);
  color: var(--color-text-2);
}

.sep {
  color: var(--color-border-2);
}

.date {
  font-family: var(--font-mono);
  font-size: var(--text-10);
  color: var(--color-text-3);
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-6);
}

/* ── TOC sidebar ─────────────────────────────────── */
.toc-sidebar {
  display: none;
}

@media (min-width: 900px) {
  .toc-sidebar {
    display: block;
    position: sticky;
    top: 80px;
  }
}

.toc-label {
  font-family: var(--font-mono);
  font-size: var(--text-8);
  color: var(--color-text-3);
  letter-spacing: 2px;
  margin-bottom: var(--space-12);
}

.toc-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.toc-link {
  display: block;
  font-family: var(--font-mono);
  font-size: var(--text-10);
  color: var(--color-text-3);
  text-decoration: none;
  padding: var(--space-3) var(--space-8);
  border-left: 2px solid transparent;
  line-height: 1.4;
  transition: color 0.15s, border-color 0.15s;
}

.toc-link.depth-3 {
  padding-left: var(--space-16);
}

.toc-link:hover {
  color: var(--color-text-2);
}

.toc-link.active {
  color: var(--color-teal);
  border-left-color: var(--color-teal);
}

/* ── Footer ─────────────────────────────────────── */
.article-footer {
  margin-top: var(--space-64);
  padding-top: var(--space-32);
  border-top: 0.5px solid var(--color-border);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-6);
  font-family: var(--font-mono);
  font-size: var(--text-11);
  color: var(--color-text-3);
  text-decoration: none;
  letter-spacing: 0.04em;
  transition: color 0.15s;
}

.back-link:hover {
  color: var(--color-teal);
}
</style>
