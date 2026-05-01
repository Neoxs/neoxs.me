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
  { label: 'linkedin', href: 'https://linkedin.com/in/yacine-abdelkader-kharoubi'},
  { label: 'email',    href: 'mailto:y.abdelkaderkharoubi@gmail.com'              },
]

export function SiteFooter() {
  return (
    <Footer
      tagline="Frontend engineer specialising in microfrontend architecture, performance, and DevOps. Based in Paris."
      nav={NAV_LINKS}
      socials={SOCIALS}
      copyright={`© ${new Date().getFullYear()} Yacine Kharoubi`}
    />
  )
}
