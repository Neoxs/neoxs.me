interface SectionHeaderProps {
  label:    string
  title:    string
  meta?:    string
}

export function SectionHeader({ label, title, meta }: SectionHeaderProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '32px' }}>
      <div>
        <div style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '9px',
          color:         'var(--color-teal)',
          letterSpacing: '3px',
          marginBottom:  '6px',
        }}>{label}</div>
        <div style={{
          fontFamily: 'var(--font-serif)',
          fontSize:   '28px',
          color:      'var(--color-text)',
          fontWeight: 400,
        }}>{title}</div>
      </div>
      {meta && (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--color-text-3)' }}>
          {meta}
        </span>
      )}
    </div>
  )
}