interface PipelineStep { label: string; done?: boolean }
interface PipelineProps { steps: PipelineStep[] }

export function Pipeline({ steps }: PipelineProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
      {steps.map((step, i) => (
        <>
          <div key={step.label} style={{
            background:    step.done ? 'var(--color-teal-dim)'    : 'var(--color-surface)',
            border:        step.done ? '0.5px solid var(--color-teal-border)' : '0.5px solid var(--color-border)',
            borderRadius:  'var(--radius-sm)',
            padding:       '5px 10px',
            fontFamily:    'var(--font-mono)',
            fontSize:      '9px',
            color:         step.done ? 'var(--color-teal)' : 'var(--color-text-3)',
          }}>{step.label}</div>
          {i < steps.length - 1 && (
            <span key={`sep-${i}`} style={{ color: 'var(--color-teal)', fontSize: '11px' }}>→</span>
          )}
        </>
      ))}
    </div>
  )
}