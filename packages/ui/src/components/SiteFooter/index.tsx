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

export interface SiteFooterProps {
  /** Stack for this microfrontend, e.g. Next.js, Nuxt 3, React · TanStack Router. */
  builtWith: string
  /** Optional override for the deploy/runtime segment (defaults to k3s + Kubernetes). */
  deployedOn?: string
}

export function SiteFooter({ builtWith, deployedOn }: SiteFooterProps) {
  return (
    <Footer
      tagline="Software engineer at Rakuten France. Frontend-focused exploring DevOps, Kubernetes, CI/CD, and scalable microfrontend systems through neoxs.me."
      nav={NAV_LINKS}
      socials={SOCIALS}
      copyright={`© ${new Date().getFullYear()} Yacine Kharoubi`}
      builtWith={builtWith}
      deployedOn={deployedOn}
    />
  )
}
