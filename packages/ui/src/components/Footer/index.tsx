'use client'

interface FooterLink { label: string; href: string }

interface FooterProps {
  tagline?:   string
  nav?:       FooterLink[]
  socials?:   FooterLink[]
  copyright?: string
}

export function Footer({ tagline, nav = [], socials = [], copyright }: FooterProps) {
  return (
    <footer style={{
      borderTop:  '1px solid var(--color-teal)',
      background: 'var(--color-bg)',
    }}>

      {/* Main row */}
      <div style={{
        display:        'flex',
        justifyContent: 'space-between',
        alignItems:     'flex-start',
        gap:            'var(--space-40)',
        padding:        'var(--space-40)',
        flexWrap:       'wrap',
      }}>

        {/* Brand */}
        <div>
          <div style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      'var(--text-13)',
            color:         'var(--color-teal)',
            fontWeight:    500,
            letterSpacing: '0.06em',
            marginBottom:  'var(--space-8)',
          }}>
            neoxs.me
          </div>
          {tagline && (
            <p style={{
              fontFamily:  'var(--font-mono)',
              fontSize:    'var(--text-11)',
              color:       'var(--color-text-2)',
              lineHeight:  1.6,
              maxWidth:    'min(320px, 100%)',
              letterSpacing: '0.02em',
            }}>
              {tagline}
            </p>
          )}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-24)', alignItems: 'flex-end' }}>

          {/* Nav links */}
          {nav.length > 0 && (
            <div style={{ display: 'flex', gap: 'var(--space-24)', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              {nav.map(link => (
                <a key={link.label} href={link.href} style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      'var(--text-11)',
                  color:         'var(--color-text-2)',
                  textDecoration:'none',
                  letterSpacing: '0.04em',
                  transition:    'color 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-teal)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-2)')}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}

          {/* Social links */}
          {socials.length > 0 && (
            <div style={{ display: 'flex', gap: 'var(--space-20)', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              {socials.map(link => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      'var(--text-11)',
                  color:         'var(--color-text-3)',
                  textDecoration:'none',
                  letterSpacing: '0.04em',
                  transition:    'color 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-teal)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-3)')}
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        display:        'flex',
        justifyContent: 'space-between',
        alignItems:     'center',
        padding:        'var(--space-16) var(--space-40)',
        borderTop:      '0.5px solid var(--color-border)',
        flexWrap:       'wrap',
        gap:            'var(--space-12)',
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-9)', color: 'var(--color-text-3)', letterSpacing: '0.04em' }}>
          {copyright}
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-9)', color: 'var(--color-text-3)', letterSpacing: '0.04em' }}>
          built with Next.js · deployed on Kubernetes
        </span>
      </div>

    </footer>
  )
}
