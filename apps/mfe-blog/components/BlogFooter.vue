<script setup lang="ts">
import { FOOTER_DEPLOY_NOTE } from '@repo/ui/footer/constants'

const year = new Date().getFullYear()
const builtWith = 'Nuxt 3'
const deployedOn = FOOTER_DEPLOY_NOTE

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
          Software engineer at Rakuten France. Frontend-focused exploring DevOps, Kubernetes, CI/CD, and scalable microfrontend systems through neoxs.me.
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
      <span class="blog-footer__bottom-text">© {{ year }} Yacine Kharoubi</span>
      <span class="blog-footer__bottom-text">built with {{ builtWith }} · {{ deployedOn }}</span>
    </div>
  </footer>
</template>

