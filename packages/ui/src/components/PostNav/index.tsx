interface PostNavItem { slug: string; title: string }
interface PostNavProps { prev?: PostNavItem; next?: PostNavItem; onNavigate?: (slug: string) => void }

export function PostNav({ prev, next, onNavigate }: PostNavProps) {
  return (
    <nav style={{
      display:         'grid',
      gridTemplateColumns: '1fr 1fr',
      gap:             '1px',
      background:      'var(--color-border)',
      border:          '0.5px solid var(--color-border)',
      borderRadius:    'var(--radius-sm)',
      overflow:        'hidden',
      marginTop:       '64px',
    }}>
      <div
        onClick={() => prev && onNavigate?.(prev.slug)}
        style={{ background: 'var(--color-surface)', padding: '16px', cursor: prev ? 'pointer' : 'default', opacity: prev ? 1 : 0.3 }}
      >
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--color-text-3)', letterSpacing: '1px', marginBottom: '6px' }}>
          ← PREVIOUS
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-text)' }}>
          {prev?.title ?? '—'}
        </div>
      </div>
      <div
        onClick={() => next && onNavigate?.(next.slug)}
        style={{ background: 'var(--color-surface)', padding: '16px', textAlign: 'right', cursor: next ? 'pointer' : 'default', opacity: next ? 1 : 0.3 }}
      >
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--color-text-3)', letterSpacing: '1px', marginBottom: '6px' }}>
          NEXT →
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-text)' }}>
          {next?.title ?? '—'}
        </div>
      </div>
    </nav>
  )
}