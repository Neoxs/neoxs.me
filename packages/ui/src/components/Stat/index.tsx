interface StatItem { label: string; value: string }
interface StatGridProps { items: StatItem[] }

export function StatGrid({ items }: StatGridProps) {
  return (
    <div style={{
      display:             'grid',
      gridTemplateColumns: `repeat(${items.length}, 1fr)`,
      gap:                 'var(--space-1)',
      background:          'var(--color-border)',
      border:              '0.5px solid var(--color-border)',
    }}>
      {items.map(item => (
        <div key={item.label} style={{
          background: 'var(--color-surface)',
          padding:    'var(--space-12)',
          textAlign:  'center',
        }}>
          <div style={{
            fontFamily:  'var(--font-mono)',
            fontSize:    'var(--text-20)',
            color:       'var(--color-teal)',
            fontWeight:  500,
          }}>{item.value}</div>
          <div style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      'var(--text-8)',
            color:         'var(--color-text-3)',
            letterSpacing: '2px',
            marginTop:     'var(--space-3)',
          }}>{item.label}</div>
        </div>
      ))}
    </div>
  )
}