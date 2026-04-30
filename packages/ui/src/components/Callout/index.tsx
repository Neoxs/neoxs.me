type CalloutVariant = 'tip' | 'warning' | 'info' | 'danger'

const calloutStyles: Record<CalloutVariant, { bg: string; border: string; labelColor: string; label: string }> = {
  tip:     { bg: 'var(--color-teal-dim)',  border: 'var(--color-teal-border)', labelColor: 'var(--color-teal)', label: 'TIP' },
  info:    { bg: 'var(--color-teal-dim)',  border: 'var(--color-teal-border)', labelColor: 'var(--color-teal)', label: 'INFO' },
  warning: { bg: 'var(--color-amber-bg)',  border: 'var(--color-amber-border)',labelColor: 'var(--color-amber)', label: 'WARNING' },
  danger:  { bg: 'var(--color-red-bg)',    border: 'var(--color-red-border)',  labelColor: 'var(--color-red)',  label: 'DANGER' },
}

export function Callout({ variant = 'tip', children }: { variant?: CalloutVariant; children: React.ReactNode }) {
  const s = calloutStyles[variant]
  return (
    <div style={{ background: s.bg, border: `0.5px solid ${s.border}`, borderRadius: 'var(--radius-sm)', padding: 'var(--space-10) var(--space-14)', margin: 'var(--space-16) 0' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-8)', color: s.labelColor, letterSpacing: '2px', marginBottom: 'var(--space-5)' }}>
        {s.label}
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-11)', color: 'var(--color-text-2)', lineHeight: 1.7 }}>
        {children}
      </div>
    </div>
  )
}