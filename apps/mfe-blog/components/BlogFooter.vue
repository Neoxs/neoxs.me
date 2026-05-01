<script setup lang="ts">
const year = new Date().getFullYear()

const navLinks = [
  { label: 'work',     href: '/#work'    },
  { label: 'stack',    href: '/#stack'   },
  { label: 'projects', href: '/projects' },
  { label: 'blog',     href: '/blog'     },
  { label: 'infra',    href: '/infra'    },
]

const socials = [
  { label: 'github',   href: 'https://github.com/neoxs'                           },
  { label: 'linkedin', href: 'https://linkedin.com/in/yacine-abdelkader-kharoubi' },
  { label: 'email',    href: 'mailto:y.abdelkaderkharoubi@gmail.com'               },
]
</script>

<template>
  <footer class="footer">
    <div class="footer-main">
      <!-- Brand -->
      <div class="brand">
        <div class="brand-name">neoxs.me</div>
        <p class="tagline">
          Frontend engineer specialising in microfrontend architecture,
          performance, and DevOps. Based in Paris.
        </p>
      </div>

      <!-- Links -->
      <div class="links-col">
        <nav class="nav-links">
          <a v-for="link in navLinks" :key="link.label" :href="link.href" class="nav-link">
            {{ link.label }}
          </a>
        </nav>
        <div class="social-links">
          <a
            v-for="link in socials"
            :key="link.label"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
          >
            {{ link.label }} ↗
          </a>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="footer-bottom">
      <span>© {{ year }} Yacine Kharoubi</span>
      <span>built with Nuxt 3 · deployed on Kubernetes</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--color-teal);
  background: var(--color-bg);
}

.footer-main {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-40);
  padding: var(--space-40);
  flex-wrap: wrap;
}

.brand-name {
  font-family: var(--font-mono);
  font-size: var(--text-13);
  color: var(--color-teal);
  font-weight: 500;
  letter-spacing: 0.06em;
  margin-bottom: var(--space-8);
}

.tagline {
  font-family: var(--font-mono);
  font-size: var(--text-11);
  color: var(--color-text-2);
  line-height: 1.6;
  max-width: 220px;
  letter-spacing: 0.02em;
}

.links-col {
  display: flex;
  flex-direction: column;
  gap: var(--space-24);
  align-items: flex-end;
}

.nav-links {
  display: flex;
  gap: var(--space-24);
  flex-wrap: wrap;
  justify-content: flex-end;
}

.nav-link {
  font-family: var(--font-mono);
  font-size: var(--text-11);
  color: var(--color-text-2);
  text-decoration: none;
  letter-spacing: 0.04em;
  transition: color 0.15s;
}

.nav-link:hover {
  color: var(--color-teal);
}

.social-links {
  display: flex;
  gap: var(--space-20);
  flex-wrap: wrap;
  justify-content: flex-end;
}

.social-link {
  font-family: var(--font-mono);
  font-size: var(--text-11);
  color: var(--color-text-3);
  text-decoration: none;
  letter-spacing: 0.04em;
  transition: color 0.15s;
}

.social-link:hover {
  color: var(--color-teal);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-16) var(--space-40);
  border-top: 0.5px solid var(--color-border);
  flex-wrap: wrap;
  gap: var(--space-12);
  font-family: var(--font-mono);
  font-size: var(--text-9);
  color: var(--color-text-3);
  letter-spacing: 0.04em;
}
</style>
