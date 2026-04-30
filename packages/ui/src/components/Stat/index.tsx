interface StatItem { label: string; value: string }
interface StatGridProps { items: StatItem[] }

export function StatGrid({ items }: StatGridProps) {
  return (
    <div style={{
      display:             'grid',
      gridTemplateColumns: `repeat(${items.length}, 1fr)`,
      gap:                 '1px',
      background:          'var(--color-border)',
      border:              '0.5px solid var(--color-border)',
    }}>
      {items.map(item => (
        <div key={item.label} style={{
          background: 'var(--color-surface)',
          padding:    '12px',
          textAlign:  'center',
        }}>
          <div style={{
            fontFamily:  'var(--font-mono)',
            fontSize:    '20px',
            color:       'var(--color-teal)',
            fontWeight:  500,
          }}>{item.value}</div>
          <div style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '8px',
            color:         'var(--color-text-3)',
            letterSpacing: '2px',
            marginTop:     '3px',
          }}>{item.label}</div>
        </div>
      ))}
    </div>
  )
}