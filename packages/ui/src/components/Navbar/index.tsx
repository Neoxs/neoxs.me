interface NavLink { label: string; href: string; active?: boolean }
interface NavbarProps { links: NavLink[]; cta?: string; onCtaClick?: () => void }

export function Navbar({ links, cta = 'contact →', onCtaClick }: NavbarProps) {
  return (
    <nav style={{
      display:         'flex',
      justifyContent:  'space-between',
      alignItems:      'center',
      padding:         '14px 40px',
      background:      'var(--color-bg)',
      borderBottom:    '1px solid var(--color-teal)',
    }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--color-teal)', fontWeight: 500 }}>
        yacine.dev
      </span>

      <div style={{ display: 'flex', border: '0.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
        {links.map(link => (
          <a key={link.label} href={link.href} style={{
            padding:       '6px 14px',
            fontSize:      '10px',
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
        fontSize:     '10px',
        padding:      '6px 14px',
        borderRadius: 'var(--radius-sm)',
        cursor:       'pointer',
      }}>{cta}</button>
    </nav>
  )
}