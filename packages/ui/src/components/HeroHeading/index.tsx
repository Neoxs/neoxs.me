interface HeroHeadingProps {
  eyebrow?:    string
  line1:       string
  line2:       string
  accent:      string
  sub?:        string
  openToWork?: boolean
}

export function HeroHeading({ eyebrow = '// FRONTEND ENGINEER · PARIS', line1, line2, accent, sub, openToWork }: HeroHeadingProps) {
  return (
    <div>
      {eyebrow && (
        <div style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          marginBottom:   'var(--space-20)',
        }}>
          <div style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      'var(--text-11)',
            color:         'var(--color-teal)',
            letterSpacing: '3px',
          }}>
            {eyebrow}
          </div>

          {openToWork && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-8)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-11)', color: 'var(--color-teal)', background: 'var(--color-teal-dim)', border: '0.5px solid var(--color-teal-border)', borderRadius: 'var(--radius-sm)', padding: 'var(--space-4) var(--space-10)', letterSpacing: '0.04em' }}>
              <div style={{ position: 'relative', width: '6px', height: '6px', flexShrink: 0 }}>
                <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--color-teal)', animation: 'dot-ping 1.6s ease-out infinite' }} />
                <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--color-teal)' }} />
              </div>
              open to work
            </div>
          )}
        </div>
      )}

      <h1 style={{
        fontFamily:    'var(--font-serif)',
        fontSize:      'clamp(40px, 6vw, 68px)',
        fontWeight:    400,
        lineHeight:    1.06,
        letterSpacing: '-0.02em',
        color:         'var(--color-text)',
        marginBottom:  'var(--space-28)',
      }}>
        {line1}<br />
        {line2}{' '}
        <em style={{ color: 'var(--color-teal)', fontStyle: 'italic' }}>{accent}</em>
      </h1>

      {sub && (
        <p style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      'var(--text-11)',
          color:         'var(--color-text-2)',
          letterSpacing: '0.04em',
        }}>
          {sub}
        </p>
      )}
    </div>
  )
}
