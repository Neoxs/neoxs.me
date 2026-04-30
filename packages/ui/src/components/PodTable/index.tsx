export type PodStatus = 'Running' | 'Pending' | 'Failed' | 'Unknown'

export interface Pod {
  name:     string
  status:   PodStatus
  ready:    boolean
  version?: string
  restarts: number
  age:      string
}

const statusStyle: Record<PodStatus, { bg: string; border: string; color: string }> = {
  Running: { bg: 'var(--color-teal-dim)',  border: 'var(--color-teal-border)',  color: 'var(--color-teal)'  },
  Pending: { bg: 'var(--color-amber-bg)',  border: 'var(--color-amber-border)', color: 'var(--color-amber)' },
  Failed:  { bg: 'var(--color-red-bg)',    border: 'var(--color-red-border)',   color: 'var(--color-red)'   },
  Unknown: { bg: 'var(--color-surface)',   border: 'var(--color-border)',       color: 'var(--color-text-3)'},
}

export function PodTable({ pods }: { pods: Pod[] }) {
  const cols = ['70px', '1fr', '70px', '55px', '45px']
  const headers = ['STATUS', 'NAME', 'VERSION', 'RESTART', 'AGE']

  return (
    <div style={{ border: '0.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: cols.join(' '), padding: '7px 14px', background: 'var(--color-elevated)', borderBottom: '0.5px solid var(--color-border)' }}>
        {headers.map(h => (
          <span key={h} style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', color: 'var(--color-text-3)', letterSpacing: '2px' }}>{h}</span>
        ))}
      </div>
      {pods.map((pod, i) => {
        const s = statusStyle[pod.status]
        return (
          <div key={pod.name} style={{
            display:         'grid',
            gridTemplateColumns: cols.join(' '),
            alignItems:      'center',
            padding:         '9px 14px',
            borderBottom:    i < pods.length - 1 ? '0.5px solid var(--color-border)' : 'none',
            background:      'var(--color-surface)',
            transition:      'background 0.1s',
          }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '1px', padding: '2px 7px', borderRadius: 'var(--radius-sm)', background: s.bg, border: `0.5px solid ${s.border}`, color: s.color, width: 'fit-content' }}>
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'currentColor', flexShrink: 0 }} />
              {pod.status}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pod.name}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--color-text-3)' }}>{pod.version ?? '—'}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: pod.restarts > 0 ? 'var(--color-red)' : 'var(--color-text-3)' }}>{pod.restarts}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--color-text-3)' }}>{pod.age}</span>
          </div>
        )
      })}
    </div>
  )
}