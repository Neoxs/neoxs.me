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

const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
  document.body.style.overflow = menuOpen.value ? 'hidden' : ''
}

function closeMenu() {
  menuOpen.value = false
  document.body.style.overflow = ''
}
</script>

<template>
  <div>
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

      <button
        class="blog-navbar__menu-btn"
        @click="toggleMenu"
        :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
        :aria-expanded="menuOpen"
      >
        {{ menuOpen ? '×' : '≡' }}
      </button>
    </nav>

    <div
      v-if="menuOpen"
      class="blog-navbar__mobile-overlay"
      role="dialog"
      aria-label="Navigation"
    >
      <div class="blog-navbar__mobile-links">
        <a
          v-for="link in links"
          :key="link.label"
          :href="link.href"
          :class="['blog-navbar__mobile-link', { 'blog-navbar__mobile-link--active': isActive(link.href) }]"
          :aria-current="isActive(link.href) ? 'page' : undefined"
          @click="closeMenu"
        >
          {{ link.label }}
        </a>
      </div>
      <a
        href="mailto:y.abdelkaderkharoubi@gmail.com"
        class="blog-navbar__mobile-cta"
        @click="closeMenu"
      >
        contact →
      </a>
    </div>
  </div>
</template>
