<script setup lang="ts">
const { data: posts } = await useAsyncData('posts',
  () => queryContent('/blog').sort({ date: -1 }).find()
)

useSeoMeta({
  title: 'Blog — neoxs.me',
  ogTitle: 'Blog — neoxs.me',
  description: 'Thoughts on frontend engineering, distributed systems, and DevOps.',
})
</script>

<template>
  <main class="blog-index">
    <section class="blog-section">
      <div class="container">

        <a href="/" class="back-link">← home</a>

        <header class="page-header">
          <div class="eyebrow">// WRITING</div>
          <div class="header-row">
            <h1 class="page-title">Blog</h1>
            <span class="post-count">{{ posts?.length ?? 0 }} posts</span>
          </div>
          <p class="page-desc">
            Thoughts on frontend engineering, distributed systems, and DevOps culture.
          </p>
        </header>

        <div class="post-list">
          <NuxtLink
            v-for="(post, i) in posts"
            :key="post._path"
            :to="post._path"
            class="post-card"
            :class="{ last: i === (posts?.length ?? 0) - 1 }"
          >
            <div class="post-index">{{ String(i + 1).padStart(2, '0') }}</div>

            <div class="card-body">
              <div class="post-meta">
                <time>{{ post.date }}</time>
                <template v-if="post.readingTime">
                  <span class="sep">·</span>
                  <span>{{ post.readingTime }} min read</span>
                </template>
              </div>
              <h2 class="post-title">{{ post.title }}</h2>
              <p class="post-desc-text">{{ post.description }}</p>
              <div v-if="post.tags?.length" class="post-tags">
                <BlogTag
                  v-for="(tag, j) in post.tags"
                  :key="tag"
                  :label="tag"
                  :accent="j === 0"
                />
              </div>
            </div>

            <span class="arrow">→</span>
          </NuxtLink>
        </div>

      </div>
    </section>
  </main>
</template>

<style scoped>
.blog-index {
  min-height: calc(100dvh - 52px);
  display: flex;
  flex-direction: column;
}

.blog-section {
  flex: 1;
  padding: var(--space-48) 0 var(--space-80);
}

.container {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 40px;
}

@media (max-width: 768px) {
  .blog-section { padding: 48px 0; }
  .container    { padding: 0 20px; }
}

/* ── Back link ─────────────────────────────────── */
.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-6);
  font-family: var(--font-mono);
  font-size: var(--text-11);
  color: var(--color-text-2);
  text-decoration: none;
  margin-bottom: var(--space-40);
  letter-spacing: 0.04em;
  transition: color 0.15s;
}

.back-link:hover { color: var(--color-teal); }

/* ── Page header ─────────────────────────────────── */
.page-header {
  margin-bottom: var(--space-32);
}

.eyebrow {
  font-family: var(--font-mono);
  font-size: var(--text-9);
  color: var(--color-teal);
  letter-spacing: 3px;
  margin-bottom: var(--space-6);
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.page-title {
  font-family: var(--font-serif);
  font-size: var(--text-32);
  font-weight: 400;
  color: var(--color-text);
}

.post-count {
  font-family: var(--font-mono);
  font-size: var(--text-9);
  color: var(--color-text-3);
}

.page-desc {
  font-family: var(--font-mono);
  font-size: var(--text-12);
  color: var(--color-text-2);
  line-height: 1.7;
  margin-top: var(--space-12);
}

/* ── Post list ─────────────────────────────────── */
.post-list {
  border: 0.5px solid var(--color-border);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.post-card {
  display: grid;
  grid-template-columns: var(--space-40) 1fr auto;
  gap: var(--space-20);
  align-items: center;
  padding: var(--space-20) var(--space-12);
  border-bottom: 0.5px solid var(--color-border);
  border-left: 2px solid transparent;
  text-decoration: none;
  background: var(--color-bg);
  transition: background 0.15s, border-color 0.15s;
  cursor: pointer;
}

.post-card.last {
  border-bottom: none;
}

.post-card:hover {
  background: var(--color-surface);
  border-left-color: var(--color-teal);
}

.post-card:hover .arrow {
  color: var(--color-teal);
  transform: translateX(4px);
}

/* ── Index number ─────────────────────────────────── */
.post-index {
  font-family: var(--font-mono);
  font-size: var(--text-10);
  color: var(--color-text-3);
  letter-spacing: 1px;
  flex-shrink: 0;
}

/* ── Card body ─────────────────────────────────── */
.card-body {
  min-width: 0;
}

.post-meta {
  display: flex;
  gap: var(--space-6);
  font-family: var(--font-mono);
  font-size: var(--text-9);
  color: var(--color-text-3);
  margin-bottom: var(--space-6);
}

.sep { color: var(--color-border-2); }

.post-title {
  font-family: var(--font-serif);
  font-size: var(--text-18);
  font-weight: 400;
  color: var(--color-text);
  margin-bottom: var(--space-8);
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.post-desc-text {
  font-family: var(--font-mono);
  font-size: var(--text-12);
  color: var(--color-text-2);
  line-height: 1.65;
  margin-bottom: var(--space-10);
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-5);
}

/* ── Arrow ─────────────────────────────────── */
.arrow {
  flex-shrink: 0;
  font-family: var(--font-mono);
  font-size: var(--text-16);
  color: var(--color-text-3);
  transition: color 0.15s, transform 0.15s;
  display: inline-block;
}
</style>
