interface HeroHeadingProps {
  eyebrow?: string
  line1:    string
  line2:    string
  accent:   string
  sub?:     string
}

export function HeroHeading({ eyebrow = '// FRONTEND ENGINEER · PARIS', line1, line2, accent, sub }: HeroHeadingProps) {
  return (
    <div>
      {eyebrow && (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--color-teal)', letterSpacing: '3px', marginBottom: '20px' }}>
          {eyebrow}
        </div>
      )}
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 400, lineHeight: 1.06, color: 'var(--color-text)', marginBottom: '8px' }}>
        {line1}
      </h1>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 400, lineHeight: 1.06, marginBottom: '28px' }}>
        {line2}{' '}
        <em style={{ color: 'var(--color-teal)', fontStyle: 'italic' }}>{accent}</em>
      </h1>
      {sub && (
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-text-3)', letterSpacing: '0.5px' }}>
          {sub}
        </p>
      )}
    </div>
  )
}