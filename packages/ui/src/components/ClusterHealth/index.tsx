interface ClusterHealthProps { total: number; healthy: number }

export function ClusterHealth({ total, healthy }: ClusterHealthProps) {
  const allGood = healthy === total

  return (
    <div style={{ border: '0.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-8) var(--space-14)', background: 'var(--color-elevated)', borderBottom: '0.5px solid var(--color-border)' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-8)', color: 'var(--color-text-3)', letterSpacing: '2px' }}>
          KUBERNETES CLUSTER
        </span>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 'var(--space-5)',
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-8)', letterSpacing: '1.5px', padding: 'var(--space-2) var(--space-8)', borderRadius: 'var(--radius-sm)',
          background: allGood ? 'var(--color-teal-dim)' : 'var(--color-amber-bg)',
          color:      allGood ? 'var(--color-teal)'     : 'var(--color-amber)',
          border:     allGood ? '0.5px solid var(--color-teal-border)' : '0.5px solid var(--color-amber-border)',
        }}>
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'currentColor' }} />
          {healthy}/{total} HEALTHY
        </span>
      </div>
      <div style={{ display: 'flex', gap: 'var(--space-2)', padding: 'var(--space-10) var(--space-14)', background: 'var(--color-surface)' }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{
            flex: 1, height: '4px', borderRadius: '1px',
            background: i < healthy ? 'var(--color-teal)' : 'var(--color-border-2)',
          }} />
        ))}
      </div>
    </div>
  )
}