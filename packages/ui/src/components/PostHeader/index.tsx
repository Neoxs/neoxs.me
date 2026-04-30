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
    <header style={{ marginBottom: 'var(--space-48)' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-9)', color: 'var(--color-teal)', letterSpacing: '3px', marginBottom: 'var(--space-16)' }}>
        {eyebrow} · {readingTime} MIN READ
      </div>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 400, color: 'var(--color-text)', lineHeight: 1.15, marginBottom: 'var(--space-16)' }}>
        {title}
      </h1>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-12)', color: 'var(--color-text-3)', lineHeight: 1.7, maxWidth: '560px', marginBottom: 'var(--space-24)' }}>
        {description}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-12)', paddingTop: 'var(--space-20)', borderTop: '0.5px solid var(--color-border)' }}>
        <div style={{
          width: '28px', height: '28px', borderRadius: '50%',
          background: 'var(--color-teal-dim)', border: '0.5px solid var(--color-teal-border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-10)', color: 'var(--color-teal)',
        }}>
          {author[0]}
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-10)', color: 'var(--color-text-2)' }}>{author}</span>
        <span style={{ color: 'var(--color-border-2)' }}>·</span>
        <time style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-10)', color: 'var(--color-text-3)' }}>{date}</time>
      </div>
    </header>
  )
}