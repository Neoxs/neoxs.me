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
  { label: 'linkedin', href: 'https://linkedin.com/in/yacinekharo' },
  { label: 'email',    href: 'mailto:y.abdelkaderkharoubi@gmail.com'               },
]
</script>

<template>
  <footer class="blog-footer">
    <div class="blog-footer__main">
      <div class="blog-footer__brand">
        <div class="blog-footer__brand-name">neoxs.me</div>
        <p class="blog-footer__tagline">
          Frontend engineer specialising in microfrontend architecture,
          performance, and DevOps. Based in Paris.
        </p>
      </div>

      <div class="blog-footer__links-col">
        <nav class="blog-footer__nav-links">
          <a v-for="link in navLinks" :key="link.label" :href="link.href" class="blog-footer__nav-link">
            {{ link.label }}
          </a>
        </nav>
        <div class="blog-footer__social-links">
          <a
            v-for="link in socials"
            :key="link.label"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="blog-footer__social-link"
          >
            {{ link.label }} ↗
          </a>
        </div>
      </div>
    </div>

    <div class="blog-footer__bottom">
      <span>© {{ year }} Yacine Kharoubi</span>
      <span>built with Nuxt 3 · deployed on Kubernetes</span>
    </div>
  </footer>
</template>

