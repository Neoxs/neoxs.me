export type StatusState = 'running' | 'pending' | 'error'

interface StatusProps {
  name:   string
  state:  StatusState
  detail?: string
}

const dots: Record<StatusState, string> = {
  running: '#1D9E75',
  pending: '#fbbf24',
  error:   '#f87171',
}

export function Status({ name, state, detail }: StatusProps) {
  return (
    <div style={{
      display:      'flex',
      alignItems:   'center',
      gap:          '8px',
      padding:      '8px 12px',
      background:   'var(--color-surface)',
      border:       '0.5px solid var(--color-border)',
      borderRadius: 'var(--radius-sm)',
    }}>
      <div style={{
        width:        '6px',
        height:       '6px',
        borderRadius: '50%',
        background:   dots[state],
        flexShrink:   0,
      }} />
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-text-2)' }}>
        {name}
      </span>
      {detail && (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--color-text-3)', marginLeft: 'auto' }}>
          {detail}
        </span>
      )}
    </div>
  )
}