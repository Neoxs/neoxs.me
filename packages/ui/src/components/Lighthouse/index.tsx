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
      <div style={{ background: 'var(--color-elevated)', padding: '6px 10px', borderBottom: '0.5px solid var(--color-border)' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--color-text-3)', letterSpacing: '2px' }}>LIGHTHOUSE</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--color-border)' }}>
        {items.map(item => (
          <div key={item.label} style={{ background: 'var(--color-surface)', padding: '12px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '22px', color: 'var(--color-teal)', fontWeight: 500 }}>
              {item.value}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', color: 'var(--color-text-3)', letterSpacing: '1.5px', marginTop: '3px' }}>
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}