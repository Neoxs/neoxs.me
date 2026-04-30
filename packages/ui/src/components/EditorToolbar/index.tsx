type RunStatus = 'idle' | 'ready' | 'error'

interface EditorToolbarProps {
  status:    RunStatus
  onRun:     () => void
  onReset:   () => void
  onFormat?: () => void
  onShare?:  () => void
}

const statusStyles: Record<RunStatus, { label: string; color: string; bg: string; border: string }> = {
  idle:  { label: 'IDLE',  color: 'var(--color-text-3)', bg: 'var(--color-surface)',  border: 'var(--color-border)'       },
  ready: { label: 'READY', color: 'var(--color-teal)',   bg: 'var(--color-teal-dim)', border: 'var(--color-teal-border)'  },
  error: { label: 'ERROR', color: 'var(--color-red)',    bg: 'var(--color-red-bg)',   border: 'var(--color-red-border)'   },
}

const btnStyle: React.CSSProperties = {
  background: 'none', border: '0.5px solid var(--color-border-2)',
  color: 'var(--color-text-2)', fontFamily: 'var(--font-mono)',
  fontSize: 'var(--text-10)', padding: 'var(--space-6) var(--space-12)', borderRadius: 'var(--radius-sm)', cursor: 'pointer',
}

export function EditorToolbar({ status, onRun, onReset, onFormat, onShare }: EditorToolbarProps) {
  const s = statusStyles[status]
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-8) var(--space-14)', background: 'var(--color-elevated)', borderBottom: '0.5px solid var(--color-border)' }}>
      <div style={{ display: 'flex', gap: 'var(--space-6)' }}>
        <button onClick={onRun}   style={{ ...btnStyle, background: 'var(--color-teal)', border: 'none', color: '#fff' }}>▶ run</button>
        <button onClick={onReset} style={btnStyle}>↺ reset</button>
        {onFormat && <button onClick={onFormat} style={btnStyle}>⬡ format</button>}
      </div>
      <div style={{ display: 'flex', gap: 'var(--space-8)', alignItems: 'center' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-5)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-8)', letterSpacing: '1.5px', padding: 'var(--space-3) var(--space-8)', borderRadius: 'var(--radius-sm)', background: s.bg, border: `0.5px solid ${s.border}`, color: s.color }}>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'currentColor' }} />
          {s.label}
        </span>
        {onShare && <button onClick={onShare} style={btnStyle}>share →</button>}
      </div>
    </div>
  )
}