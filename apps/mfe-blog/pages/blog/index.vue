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
    <header class="page-header">
      <span class="eyebrow">WRITING</span>
      <h1 class="page-title">Blog</h1>
      <p class="page-desc">
        Thoughts on frontend engineering, distributed systems, and DevOps culture.
      </p>
    </header>

    <div class="post-list">
      <NuxtLink
        v-for="post in posts"
        :key="post._path"
        :to="post._path"
        class="post-card"
      >
        <div class="card-body">
          <div class="post-meta">
            <time>{{ post.date }}</time>
            <template v-if="post.readingTime">
              <span class="meta-sep">·</span>
              <span>{{ post.readingTime }} min read</span>
            </template>
          </div>
          <h2 class="post-title">{{ post.title }}</h2>
          <p class="post-desc">{{ post.description }}</p>
          <div v-if="post.tags?.length" class="post-tags">
            <BlogTag v-for="tag in post.tags" :key="tag" :label="tag" />
          </div>
        </div>
        <span class="arrow">→</span>
      </NuxtLink>
    </div>
  </main>
</template>

<style scoped>
.blog-index {
  max-width: 720px;
  margin: 0 auto;
  padding: var(--space-64) var(--space-24);
}

.page-header {
  margin-bottom: var(--space-48);
}

.eyebrow {
  display: block;
  font-family: var(--font-mono);
  font-size: var(--text-9);
  color: var(--color-teal);
  letter-spacing: 3px;
  margin-bottom: var(--space-16);
}

.page-title {
  font-family: var(--font-serif);
  font-size: var(--text-32);
  font-weight: 400;
  color: var(--color-text);
  margin-bottom: var(--space-12);
}

.page-desc {
  font-family: var(--font-mono);
  font-size: var(--text-12);
  color: var(--color-text-3);
  line-height: 1.7;
}

/* ── Post cards ─────────────────────────────────── */
.post-list {
  display: flex;
  flex-direction: column;
}

.post-card {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: var(--space-24) 0;
  border-bottom: 0.5px solid var(--color-border);
  text-decoration: none;
  transition: opacity 0.15s;
  gap: var(--space-16);
}

.post-card:hover {
  opacity: 0.8;
}

.post-card:hover .arrow {
  color: var(--color-teal);
  transform: translateX(4px);
}

.card-body {
  flex: 1;
  min-width: 0;
}

.post-meta {
  display: flex;
  gap: var(--space-6);
  font-family: var(--font-mono);
  font-size: var(--text-9);
  color: var(--color-text-3);
  margin-bottom: var(--space-8);
}

.meta-sep {
  color: var(--color-border-2);
}

.post-title {
  font-family: var(--font-serif);
  font-size: var(--text-18);
  font-weight: 400;
  color: var(--color-text);
  margin-bottom: var(--space-8);
  line-height: 1.3;
}

.post-desc {
  font-family: var(--font-mono);
  font-size: var(--text-11);
  color: var(--color-text-3);
  line-height: 1.7;
  margin-bottom: var(--space-12);
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-6);
}

.arrow {
  flex-shrink: 0;
  font-size: var(--text-18);
  color: var(--color-text-3);
  margin-top: var(--space-4);
  transition: color 0.15s, transform 0.15s;
}
</style>
