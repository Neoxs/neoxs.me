<script setup lang="ts">
const route = useRoute()

const { data: post } = await useAsyncData(
  route.path,
  () => queryContent(route.path).findOne()
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

useSeoMeta({
  title: () => `${post.value?.title} — neoxs.me`,
  ogTitle: () => post.value?.title,
  description: () => post.value?.description,
  ogType: 'article',
})
</script>

<template>
  <article v-if="post">
    <h1>{{ post.title }}</h1>
    <time>{{ post.date }}</time>
    <ContentRenderer :value="post" />
  </article>
</template>
