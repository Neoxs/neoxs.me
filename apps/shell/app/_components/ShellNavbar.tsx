'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { label: 'work',  href: '/#work'     },
  { label: 'stack', href: '/#stack'    },
  { label: 'infra', href: '/infra'     },
  { label: 'blog',  href: '/blog'      },
]

export function ShellNavbar() {
  const pathname = usePathname()

  return (
    <header style={{
      position:      'sticky',
      top:           0,
      zIndex:        50,
      background:    'var(--color-bg)',
      borderBottom:  '1px solid var(--color-teal)',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '52px' }}>

        <Link href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--color-teal)', fontWeight: 500, textDecoration: 'none', letterSpacing: '0.5px' }}>
         neoxs.me
        </Link>

        <nav style={{ display: 'flex', border: '0.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
          {links.map(link => {
            const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href.replace('/#', '/'))
            return (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  padding:        '6px 16px',
                  fontFamily:     'var(--font-mono)',
                  fontSize:       '11px',
                  letterSpacing:  '0.5px',
                  color:          active ? 'var(--color-teal)' : 'var(--color-text-3)',
                  background:     active ? 'var(--color-teal-dim)' : 'none',
                  borderRight:    '0.5px solid var(--color-border)',
                  textDecoration: 'none',
                  transition:     'all 0.15s',
                }}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <a
          href="mailto:hello@yacine.dev"
          style={{
            fontFamily:     'var(--font-mono)',
            fontSize:       '11px',
            color:          'var(--color-teal)',
            border:         '0.5px solid var(--color-teal-border)',
            padding:        '6px 14px',
            borderRadius:   'var(--radius-sm)',
            textDecoration: 'none',
            background:     'var(--color-teal-dim)',
            transition:     'all 0.15s',
          }}
        >
          contact →
        </a>

      </div>
    </header>
  )
}