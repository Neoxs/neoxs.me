import { Footer } from '../Footer'

const NAV_LINKS = [
  { label: 'work',     href: '/#work'    },
  { label: 'stack',    href: '/#stack'   },
  { label: 'projects', href: '/projects' },
  { label: 'blog',     href: '/blog'     },
  { label: 'infra',    href: '/infra'    },
]

const SOCIALS = [
  { label: 'github',   href: 'https://github.com/neoxs'                          },
  { label: 'linkedin', href: 'https://linkedin.com/in/yacinekharo'},
  { label: 'email',    href: 'mailto:y.abdelkaderkharoubi@gmail.com'              },
]

export function SiteFooter() {
  return (
    <Footer
      tagline="Software engineer in Paris (Rakuten France). Frontend-first — React, Next.js, Vue — with CI/CD & Kubernetes. neoxs.me started as a weekend experiment and turned into my hands-on microfrontend + ops lab."
      nav={NAV_LINKS}
      socials={SOCIALS}
      copyright={`© ${new Date().getFullYear()} Yacine Kharoubi`}
    />
  )
}
