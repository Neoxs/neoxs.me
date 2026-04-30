interface LighthouseScore { perf: number; a11y: number; seo: number; bp: number }

export function Lighthouse({ perf, a11y, seo, bp }: LighthouseScore) {
  const items = [
    { label: 'PERF', value: perf },
    { label: 'A11Y', value: a11y },
    { label: 'SEO',  value: seo  },
    { label: 'BP',   value: bp   },
  ]

  return (
    <div style={{ border: '0.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
      <div style={{ background: 'var(--color-elevated)', padding: 'var(--space-6) var(--space-10)', borderBottom: '0.5px solid var(--color-border)' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-8)', color: 'var(--color-text-3)', letterSpacing: '2px' }}>LIGHTHOUSE</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-1)', background: 'var(--color-border)' }}>
        {items.map(item => (
          <div key={item.label} style={{ background: 'var(--color-surface)', padding: 'var(--space-12)', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-22)', color: 'var(--color-teal)', fontWeight: 500 }}>
              {item.value}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-7)', color: 'var(--color-text-3)', letterSpacing: '1.5px', marginTop: 'var(--space-3)' }}>
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}