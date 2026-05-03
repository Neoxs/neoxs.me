<script setup lang="ts">
import { toNuxtHead } from '@repo/seo/nuxt'

useHead({ htmlAttrs: { lang: 'en' }, ...toNuxtHead() })
</script>

<template>
  <div>
    <BlogNavbar />
    <NuxtPage />
    <BlogFooter />
  </div>
</template>
