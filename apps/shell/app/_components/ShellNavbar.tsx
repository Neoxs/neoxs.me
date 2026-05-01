'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@repo/ui/navbar'

const NAV_LINKS = [
  { label: 'work',  href: '/#work'  },
  { label: 'stack', href: '/#stack' },
  { label: 'infra', href: '/infra'  },
  { label: 'blog',  href: '/blog'   },
]

export function ShellNavbar() {
  const pathname = usePathname()
  const links = NAV_LINKS.map(link => ({
    ...link,
    active: pathname.startsWith(link.href.replace('/#', '/')),
  }))

  return (
    <Navbar
      links={links}
      onCtaClick={() => { window.location.href = 'mailto:hello@yacine.dev' }}
    />
  )
}
