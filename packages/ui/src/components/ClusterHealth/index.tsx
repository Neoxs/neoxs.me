interface ClusterHealthProps { total: number; healthy: number }

export function ClusterHealth({ total, healthy }: ClusterHealthProps) {
  const allGood = healthy === total

  return (
    <div style={{ border: '0.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 14px', background: 'var(--color-elevated)', borderBottom: '0.5px solid var(--color-border)' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--color-text-3)', letterSpacing: '2px' }}>
          KUBERNETES CLUSTER
        </span>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '5px',
          fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '1.5px', padding: '2px 8px', borderRadius: 'var(--radius-sm)',
          background: allGood ? 'var(--color-teal-dim)' : 'var(--color-amber-bg)',
          color:      allGood ? 'var(--color-teal)'     : 'var(--color-amber)',
          border:     allGood ? '0.5px solid var(--color-teal-border)' : '0.5px solid var(--color-amber-border)',
        }}>
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'currentColor' }} />
          {healthy}/{total} HEALTHY
        </span>
      </div>
      <div style={{ display: 'flex', gap: '2px', padding: '10px 14px', background: 'var(--color-surface)' }}>
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