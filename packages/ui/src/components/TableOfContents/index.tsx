interface TocItem { id: string; label: string; depth: 1 | 2 | 3 }
interface TocProps { items: TocItem[]; activeId?: string }

export function TableOfContents({ items, activeId }: TocProps) {
  return (
    <nav style={{ position: 'sticky', top: '80px' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--color-text-3)', letterSpacing: '2px', marginBottom: '12px' }}>
        ON THIS PAGE
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {items.map(item => (
            <a
            key={item.id}
            href={`#${item.id}`}
            style={{
              display:        'block',
              fontFamily:     'var(--font-mono)',
              fontSize:       '10px',
              color:          item.id === activeId ? 'var(--color-teal)' : 'var(--color-text-3)',
              textDecoration: 'none',
              padding:        '3px 0',
              paddingLeft:    item.depth === 1 ? '0' : item.depth === 2 ? '12px' : '24px',
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