interface TerminalLine { prompt?: boolean; text: string; dim?: boolean }
interface TerminalProps { cwd?: string; lines: TerminalLine[] }

export function Terminal({ cwd = '~/yacine.dev ‹main› ✓', lines }: TerminalProps) {
  return (
    <div style={{
      background:   'var(--color-elevated)',
      border:       '0.5px solid var(--color-border)',
      borderLeft:   '2px solid var(--color-teal)',
      borderRadius: 'var(--radius-sm)',
      padding:      '14px 16px',
    }}>
      <div style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      '9px',
        color:         'var(--color-text-3)',
        letterSpacing: '1px',
        marginBottom:  '10px',
      }}>{cwd}</div>
      {lines.map((line, i) => (
        <div key={i} style={{
          fontFamily: 'var(--font-mono)',
          fontSize:   '10px',
          lineHeight: 2,
          color:      line.dim ? 'var(--color-text-3)' : 'var(--color-text)',
        }}>
          {line.prompt && (
            <span style={{ color: 'var(--color-teal)', marginRight: '6px' }}>$</span>
          )}
          {line.text}
        </div>
      ))}
    </div>
  )
}