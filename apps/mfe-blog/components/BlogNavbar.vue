<script setup lang="ts">
const route = useRoute()

const links = [
  { label: 'work',  href: '/#work'  },
  { label: 'stack', href: '/#stack' },
  { label: 'infra', href: '/infra'  },
  { label: 'blog',  href: '/blog'   },
]

function isActive(href: string) {
  const path = href.replace('/#', '/')
  return path !== '/' && route.path.startsWith(path)
}
</script>

<template>
  <nav class="blog-navbar">
    <a href="/" class="blog-navbar__logo">neoxs.me</a>

    <div class="blog-navbar__links">
      <a
        v-for="link in links"
        :key="link.label"
        :href="link.href"
        :class="['blog-navbar__link', { 'blog-navbar__link--active': isActive(link.href) }]"
        :aria-current="isActive(link.href) ? 'page' : undefined"
      >
        {{ link.label }}
      </a>
    </div>

    <a href="mailto:y.abdelkaderkharoubi@gmail.com" class="blog-navbar__cta">contact →</a>
  </nav>
</template>

