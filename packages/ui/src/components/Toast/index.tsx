export type ToastVariant = 'success' | 'error'

interface ToastProps { variant: ToastVariant; title: string; description?: string }

const styles: Record<ToastVariant, React.CSSProperties> = {
  success: { background: '#04190e', borderColor: '#0a3020', color: '#1D9E75' },
  error:   { background: '#1c0a0a', borderColor: '#7f1d1d', color: '#f87171' },
}

export function Toast({ variant, title, description }: ToastProps) {
  return (
    <div style={{
      display:      'flex',
      alignItems:   'flex-start',
      gap:          '10px',
      padding:      '10px 14px',
      borderRadius: 'var(--radius-sm)',
      border:       '0.5px solid',
      ...styles[variant],
    }}>
      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor', flexShrink: 0, marginTop: '2px' }} />
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 500 }}>{title}</div>
        {description && (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', opacity: 0.7, marginTop: '2px' }}>{description}</div>
        )}
      </div>
    </div>
  )
}