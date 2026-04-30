interface SectionHeaderProps {
  label:    string
  title:    string
  meta?:    string
}

export function SectionHeader({ label, title, meta }: SectionHeaderProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--space-32)' }}>
      <div>
        <div style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      'var(--text-9)',
          color:         'var(--color-teal)',
          letterSpacing: '3px',
          marginBottom:  'var(--space-6)',
        }}>{label}</div>
        <div style={{
          fontFamily: 'var(--font-serif)',
          fontSize:   'var(--text-32)',
          color:      'var(--color-text)',
          fontWeight: 400,
        }}>{title}</div>
      </div>
      {meta && (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-9)', color: 'var(--color-text-3)' }}>
          {meta}
        </span>
      )}
    </div>
  )
}