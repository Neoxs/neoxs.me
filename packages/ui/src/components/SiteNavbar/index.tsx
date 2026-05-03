'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '../Navbar'

const NAV_LINKS = [
  { label: 'work',     href: '/#work'   },
  { label: 'stack',    href: '/#stack'  },
  { label: 'infra',    href: '/infra/'  },
  { label: 'blog',     href: '/blog/'    },
]

export function SiteNavbar() {
  const [pathname, setPathname] = useState('')

  useEffect(() => {
    const update = () => setPathname(window.location.pathname)
    update()
    window.addEventListener('popstate', update)
    return () => window.removeEventListener('popstate', update)
  }, [])

  const links = NAV_LINKS.map(link => ({
    ...link,
    active: pathname.startsWith(link.href.replace('/#', '/')),
  }))

  return (
    <Navbar
      links={links}
      onCtaClick={() => { window.location.href = 'mailto:y.abdelkaderkharoubi@gmail.com' }}
    />
  )
}
