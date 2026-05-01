<script setup lang="ts">
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

const activeHeading = ref('')

onMounted(() => {
  nextTick(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) activeHeading.value = entry.target.id
        }
      },
      { rootMargin: '-10% 0% -80% 0%' }
    )
    document.querySelectorAll('h2, h3').forEach(el => observer.observe(el))
    onUnmounted(() => observer.disconnect())
  })
})

useSeoMeta({
  title: () => `${post.value?.title} — neoxs.me`,
  ogTitle: () => post.value?.title,
  description: () => post.value?.description,
  ogType: 'article',
})
</script>

<template>
  <div v-if="post">
    <ClientOnly>
      <ReadingProgress />
    </ClientOnly>

    <div class="article-layout">
      <!-- Article -->
      <article class="article-content">
        <header class="post-header">
          <div class="eyebrow">BLOG · {{ readingTime }} MIN READ</div>
          <h1 class="post-title">{{ post.title }}</h1>
          <p class="post-desc">{{ post.description }}</p>

          <div class="post-meta">
            <div class="avatar">Y</div>
            <span class="author">Yacine</span>
            <span class="sep">·</span>
            <time class="date">{{ post.date }}</time>
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
      <aside v-if="tocLinks.length > 0" class="toc-sidebar">
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
  padding: var(--space-64) var(--space-24);
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-48);
  align-items: start;
}

@media (min-width: 900px) {
  .article-layout {
    grid-template-columns: 1fr 200px;
  }
}

.article-content {
  min-width: 0;
  max-width: 720px;
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
  margin-bottom: var(--space-16);
}

.post-desc {
  font-family: var(--font-mono);
  font-size: var(--text-12);
  color: var(--color-text-3);
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
  font-family: var(--font-mono);
  font-size: var(--text-11);
  color: var(--color-text-3);
  text-decoration: none;
  transition: color 0.15s;
}

.back-link:hover {
  color: var(--color-teal);
}
</style>
