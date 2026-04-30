interface PipelineRunProps {
  commit:    string
  message:   string
  branch:    string
  duration:  string
  ago:       string
  status:    'success' | 'failed' | 'running'
  steps:     Array<{ label: string; done: boolean; active?: boolean }>
  affectedApp?: string
}

const runStatus = {
  success: { color: 'var(--color-teal)',  border: 'var(--color-teal-border)',  bg: 'var(--color-teal-dim)',  label: '✓ SUCCESS' },
  failed:  { color: 'var(--color-red)',   border: 'var(--color-red-border)',   bg: 'var(--color-red-bg)',    label: '✗ FAILED'  },
  running: { color: 'var(--color-amber)', border: 'var(--color-amber-border)', bg: 'var(--color-amber-bg)', label: '⋯ RUNNING' },
}

export function PipelineRun({ commit, message, branch, duration, ago, status, steps, affectedApp }: PipelineRunProps) {
  const s = runStatus[status]

  return (
    <div style={{ border: '0.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: 'var(--space-14)', background: 'var(--color-surface)', borderBottom: '0.5px solid var(--color-border)' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-8)', color: 'var(--color-text-3)', letterSpacing: '1px', marginBottom: 'var(--space-4)' }}>
            {ago} · {branch}{affectedApp ? ` · ${affectedApp} only` : ''}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-11)', color: 'var(--color-text)', marginBottom: '2px' }}>{message}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-9)', color: 'var(--color-text-3)' }}>{commit}</div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 'var(--space-16)' }}>
          <span style={{ display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-8)', letterSpacing: '1px', padding: 'var(--space-3) var(--space-8)', borderRadius: 'var(--radius-sm)', background: s.bg, border: `0.5px solid ${s.border}`, color: s.color }}>{s.label}</span>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-9)', color: 'var(--color-text-3)', marginTop: 'var(--space-5)' }}>{duration}</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap', padding: 'var(--space-10) var(--space-14)', background: 'var(--color-elevated)' }}>
        {steps.map((step, i) => (
          <>
            <div key={step.label} style={{
              fontFamily:  'var(--font-mono)', fontSize: 'var(--text-8)', padding: 'var(--space-4) var(--space-9)', borderRadius: 'var(--radius-sm)',
              background:  step.done ? 'var(--color-teal-dim)'   : step.active ? 'var(--color-amber-bg)' : 'var(--color-surface)',
              border:      step.done ? '0.5px solid var(--color-teal-border)' : step.active ? '0.5px solid var(--color-amber-border)' : '0.5px solid var(--color-border)',
              color:       step.done ? 'var(--color-teal)'        : step.active ? 'var(--color-amber)' : 'var(--color-text-3)',
            }}>{step.label}</div>
            {i < steps.length - 1 && <span key={`a${i}`} style={{ color: 'var(--color-teal)', fontSize: '10px' }}>→</span>}
          </>
        ))}
      </div>
    </div>
  )
}