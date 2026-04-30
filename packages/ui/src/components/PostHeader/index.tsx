interface PostHeaderProps {
  eyebrow:     string
  title:       string
  description: string
  date:        string
  readingTime: number
  author?:     string
}

export function PostHeader({ eyebrow, title, description, date, readingTime, author = 'Yacine' }: PostHeaderProps) {
  return (
    <header style={{ marginBottom: '48px' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--color-teal)', letterSpacing: '3px', marginBottom: '16px' }}>
        {eyebrow} · {readingTime} MIN READ
      </div>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 400, color: 'var(--color-text)', lineHeight: 1.15, marginBottom: '16px' }}>
        {title}
      </h1>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-text-3)', lineHeight: 1.7, maxWidth: '560px', marginBottom: '24px' }}>
        {description}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '20px', borderTop: '0.5px solid var(--color-border)' }}>
        <div style={{
          width: '28px', height: '28px', borderRadius: '50%',
          background: 'var(--color-teal-dim)', border: '0.5px solid var(--color-teal-border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-teal)',
        }}>
          {author[0]}
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-text-2)' }}>{author}</span>
        <span style={{ color: 'var(--color-border-2)' }}>·</span>
        <time style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-text-3)' }}>{date}</time>
      </div>
    </header>
  )
}