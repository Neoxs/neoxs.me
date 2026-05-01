import { useState } from 'react'

interface NavLink { label: string; href: string; active?: boolean }
interface NavbarProps { links: NavLink[]; logoHref?: string; cta?: string; onCtaClick?: () => void }

export function Navbar({ links, logoHref = '/', cta = 'contact →', onCtaClick }: NavbarProps) {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [ctaHovered, setCtaHovered]   = useState(false)

  return (
    <nav style={{
      position:             'sticky',
      top:                  0,
      zIndex:               50,
      display:              'flex',
      justifyContent:       'space-between',
      alignItems:           'center',
      padding:              'var(--space-14) var(--space-40)',
      background:           'rgba(10, 10, 10, 0.72)',
      backdropFilter:       'blur(16px) saturate(160%)',
      WebkitBackdropFilter: 'blur(16px) saturate(160%)',
      borderBottom:         '1px solid var(--color-teal)',
      boxShadow:            'inset 0 1px 0 rgba(255,255,255,0.04)',
    }}>

      <a href={logoHref} style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      'var(--text-13)',
        color:         'var(--color-teal)',
        fontWeight:    500,
        letterSpacing: '0.06em',
        textDecoration:'none',
      }}>
        neoxs.me
      </a>

      <div style={{
        display:      'flex',
        border:       '0.5px solid var(--color-border)',
        borderRadius: 'var(--radius-sm)',
        overflow:     'hidden',
      }}>
        {links.map((link, i) => {
          const hovered = hoveredLink === link.label
          const isLast  = i === links.length - 1
          return (
            <a
              key={link.label}
              href={link.href}
              aria-current={link.active ? 'page' : undefined}
              onMouseEnter={() => setHoveredLink(link.label)}
              onMouseLeave={() => setHoveredLink(null)}
              style={{
                padding:        'var(--space-6) var(--space-14)',
                fontSize:       'var(--text-11)',
                fontFamily:     'var(--font-mono)',
                letterSpacing:  '0.04em',
                fontWeight:     link.active ? 500 : 400,
                color:          link.active || hovered ? 'var(--color-teal)' : 'var(--color-text-2)',
                background:     link.active
                  ? 'var(--color-teal-dim)'
                  : hovered ? 'var(--color-surface)' : 'none',
                borderRight:    isLast ? 'none' : '0.5px solid var(--color-border)',
                textDecoration: 'none',
                transition:     'color 0.15s, background 0.15s',
              }}
            >
              {link.label}
            </a>
          )
        })}
      </div>

      <button
        onClick={onCtaClick}
        onMouseEnter={() => setCtaHovered(true)}
        onMouseLeave={() => setCtaHovered(false)}
        style={{
          background:    ctaHovered ? 'var(--color-teal-dim)' : 'none',
          border:        `0.5px solid ${ctaHovered ? 'var(--color-teal-border)' : 'var(--color-border-2)'}`,
          color:         'var(--color-teal)',
          fontFamily:    'var(--font-mono)',
          fontSize:      'var(--text-11)',
          letterSpacing: '0.04em',
          padding:       'var(--space-6) var(--space-14)',
          borderRadius:  'var(--radius-sm)',
          cursor:        'pointer',
          transition:    'background 0.15s, border-color 0.15s',
        }}
      >
        {cta}
      </button>

    </nav>
  )
}
