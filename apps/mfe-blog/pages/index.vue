<script setup lang="ts">
const { data: posts } = await useAsyncData('posts',
  () => queryContent('/blog').sort({ date: -1 }).find()
)

useSeoMeta({
  title: 'Blog — neoxs.me',
  ogTitle: 'Blog — neoxs.me',
  description: 'Thoughts on frontend engineering, architecture, and DevOps.',
})
</script>

<template>
  <main>
    <h1>Blog</h1>
    <article v-for="post in posts" :key="post._path">
      <NuxtLink :to="(post._path ?? '').replace(/^\/blog/, '')"  >
        <h2>{{ post.title }}</h2>
      </NuxtLink>
      <p>{{ post.description }}</p>
      <time>{{ post.date }}</time>
    </article>
  </main>
</template>