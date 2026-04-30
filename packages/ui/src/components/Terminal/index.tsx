interface TerminalLine { prompt?: boolean; text: string; dim?: boolean }
interface TerminalProps { cwd?: string; lines: TerminalLine[] }

export function Terminal({ cwd = '~/yacine.dev ‹main› ✓', lines }: TerminalProps) {
  return (
    <div style={{
      background:   'var(--color-elevated)',
      border:       '0.5px solid var(--color-border)',
      borderLeft:   '2px solid var(--color-teal)',
      borderRadius: 'var(--radius-sm)',
      padding:      'var(--space-14) var(--space-16)',
    }}>
      <div style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      'var(--text-9)',
        color:         'var(--color-text-3)',
        letterSpacing: '1px',
        marginBottom:  'var(--space-10)',
      }}>{cwd}</div>
      {lines.map((line, i) => (
        <div key={i} style={{
          fontFamily: 'var(--font-mono)',
          fontSize:   'var(--text-10)',
          lineHeight: 2,
          color:      line.dim ? 'var(--color-text-3)' : 'var(--color-text)',
        }}>
          {line.prompt && (
            <span style={{ color: 'var(--color-teal)', marginRight: 'var(--space-6)' }}>$</span>
          )}
          {line.text}
        </div>
      ))}
    </div>
  )
}