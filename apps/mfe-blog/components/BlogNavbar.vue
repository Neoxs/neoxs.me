<script setup lang="ts">
const route = useRoute()

const links = [
  { label: 'work',  href: '/#work' },
  { label: 'stack', href: '/#stack' },
  { label: 'infra', href: '/infra' },
  { label: 'blog',  href: '/blog' },
]

function isActive(href: string) {
  const path = href.replace('/#', '/')
  return route.path.startsWith(path) && path !== '/'
}
</script>

<template>
  <nav class="navbar">
    <a href="/" class="logo">neoxs.me</a>

    <div class="nav-links">
      <NuxtLink
        v-for="link in links"
        :key="link.label"
        :to="link.href"
        :class="['nav-link', { active: isActive(link.href) }]"
      >
        {{ link.label }}
      </NuxtLink>
    </div>

    <a href="mailto:y.abdelkaderkharoubi@gmail.com" class="cta">contact →</a>
  </nav>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-14) var(--space-40);
  background: rgba(10, 10, 10, 0.72);
  backdrop-filter: blur(16px) saturate(160%);
  -webkit-backdrop-filter: blur(16px) saturate(160%);
  border-bottom: 1px solid var(--color-teal);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.logo {
  font-family: var(--font-mono);
  font-size: var(--text-13);
  color: var(--color-teal);
  font-weight: 500;
  letter-spacing: 0.06em;
  text-decoration: none;
}

.nav-links {
  display: flex;
  border: 0.5px solid var(--color-border);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.nav-link {
  padding: var(--space-6) var(--space-14);
  font-size: var(--text-11);
  font-family: var(--font-mono);
  letter-spacing: 0.04em;
  color: var(--color-text-2);
  text-decoration: none;
  border-right: 0.5px solid var(--color-border);
  transition: color 0.15s, background 0.15s;
}

.nav-link:last-child {
  border-right: none;
}

.nav-link:hover {
  color: var(--color-teal);
  background: var(--color-surface);
}

.nav-link.active {
  color: var(--color-teal);
  background: var(--color-teal-dim);
  font-weight: 500;
}

.cta {
  background: none;
  border: 0.5px solid var(--color-border-2);
  color: var(--color-teal);
  font-family: var(--font-mono);
  font-size: var(--text-11);
  letter-spacing: 0.04em;
  padding: var(--space-6) var(--space-14);
  border-radius: var(--radius-sm);
  text-decoration: none;
  transition: background 0.15s, border-color 0.15s;
}

.cta:hover {
  background: var(--color-teal-dim);
  border-color: var(--color-teal-border);
}

@media (max-width: 600px) {
  .navbar {
    padding: var(--space-12) var(--space-16);
  }

  .nav-links {
    display: none;
  }
}
</style>
