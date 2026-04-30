interface TocItem { id: string; label: string; depth: 1 | 2 | 3 }
interface TocProps { items: TocItem[]; activeId?: string }

export function TableOfContents({ items, activeId }: TocProps) {
  return (
    <nav style={{ position: 'sticky', top: 'var(--space-80)' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-8)', color: 'var(--color-text-3)', letterSpacing: '2px', marginBottom: 'var(--space-12)' }}>
        ON THIS PAGE
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {items.map(item => (
            <a
            key={item.id}
            href={`#${item.id}`}
            style={{
              display:        'block',
              fontFamily:     'var(--font-mono)',
              fontSize:       'var(--text-10)',
              color:          item.id === activeId ? 'var(--color-teal)' : 'var(--color-text-3)',
              textDecoration: 'none',
              padding:        'var(--space-3) 0',
              paddingLeft:    item.depth === 1 ? '0' : item.depth === 2 ? 'var(--space-12)' : 'var(--space-24)',
              borderLeft:     item.id === activeId ? '2px solid var(--color-teal)' : '2px solid transparent',
              transition:     'all 0.15s',
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  )
}