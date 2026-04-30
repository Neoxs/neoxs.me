interface NavLink { label: string; href: string; active?: boolean }
interface NavbarProps { links: NavLink[]; cta?: string; onCtaClick?: () => void }

export function Navbar({ links, cta = 'contact →', onCtaClick }: NavbarProps) {
  return (
    <nav style={{
      display:         'flex',
      justifyContent:  'space-between',
      alignItems:      'center',
      padding:         'var(--space-14) var(--space-40)',
      background:      'var(--color-bg)',
      borderBottom:    '1px solid var(--color-teal)',
    }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-13)', color: 'var(--color-teal)', fontWeight: 500 }}>
       neoxs.me
      </span>

      <div style={{ display: 'flex', border: '0.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
        {links.map(link => (
          <a key={link.label} href={link.href} style={{
            padding:       'var(--space-6) var(--space-14)',
            fontSize:      'var(--text-10)',
            fontFamily:    'var(--font-mono)',
            color:         link.active ? 'var(--color-teal)' : 'var(--color-text-3)',
            background:    link.active ? 'var(--color-teal-dim)' : 'none',
            borderRight:   '0.5px solid var(--color-border)',
            textDecoration:'none',
            transition:    'all 0.15s',
          }}>{link.label}</a>
        ))}
      </div>

      <button onClick={onCtaClick} style={{
        background:   'none',
        border:       '0.5px solid var(--color-border-2)',
        color:        'var(--color-teal)',
        fontFamily:   'var(--font-mono)',
        fontSize:     'var(--text-10)',
        padding:      'var(--space-6) var(--space-14)',
        borderRadius: 'var(--radius-sm)',
        cursor:       'pointer',
      }}>{cta}</button>
    </nav>
  )
}