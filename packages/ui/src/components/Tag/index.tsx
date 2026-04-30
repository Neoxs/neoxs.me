interface TagProps { children: React.ReactNode; accent?: boolean }

export function Tag({ children, accent }: TagProps) {
  return (
    <span style={{
      display:       'inline-flex',
      alignItems:    'center',
      fontFamily:    'var(--font-mono)',
      fontSize:      'var(--text-9)',
      letterSpacing: '0.5px',
      padding:       'var(--space-2) var(--space-8)',
      borderRadius:  'var(--radius-sm)',
      background:    accent ? 'var(--color-teal-dim)'  : 'var(--color-surface)',
      border:        accent ? '0.5px solid var(--color-teal-border)' : '0.5px solid var(--color-border)',
      color:         accent ? 'var(--color-teal)'       : 'var(--color-text-3)',
    }}>
      {children}
    </span>
  )
}