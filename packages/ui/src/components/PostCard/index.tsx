interface PostCardProps {
  slug:        string
  title:       string
  description: string
  date:        string
  readingTime: number
  tags:        string[]
  onClick?:    (slug: string) => void
}

export function PostCard({ slug, title, description, date, readingTime, tags, onClick }: PostCardProps) {
  return (
    <article
      onClick={() => onClick?.(slug)}
      style={{ cursor: onClick ? 'pointer' : 'default', padding: 'var(--space-20) 0', borderBottom: '0.5px solid var(--color-border)' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-8)' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-9)', color: 'var(--color-text-3)', marginBottom: 'var(--space-6)' }}>
            {date} · {readingTime} min read
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-18)', color: 'var(--color-text)', fontWeight: 400, marginBottom: 'var(--space-6)' }}>
            {title}
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-11)', color: 'var(--color-text-3)', lineHeight: 1.7 }}>
            {description}
          </p>
        </div>
        <span style={{ fontSize: 'var(--text-18)', color: 'var(--color-text-3)', marginLeft: 'var(--space-16)', marginTop: 'var(--space-4)' }}>→</span>
      </div>
      <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap', marginTop: 'var(--space-12)' }}>
        {tags.map(tag => (
          <span key={tag} style={{
            fontFamily: 'var(--font-mono)', fontSize: 'var(--text-9)',
            color: 'var(--color-text-3)', background: 'var(--color-surface)',
            border: '0.5px solid var(--color-border)', padding: 'var(--space-2) var(--space-7)', borderRadius: 'var(--radius-sm)',
          }}>{tag}</span>
        ))}
      </div>
    </article>
  )
}