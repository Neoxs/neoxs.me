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
      style={{ cursor: onClick ? 'pointer' : 'default', padding: '20px 0', borderBottom: '0.5px solid var(--color-border)' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--color-text-3)', marginBottom: '6px' }}>
            {date} · {readingTime} min read
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: 'var(--color-text)', fontWeight: 400, marginBottom: '6px' }}>
            {title}
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-text-3)', lineHeight: 1.7 }}>
            {description}
          </p>
        </div>
        <span style={{ fontSize: '18px', color: 'var(--color-text-3)', marginLeft: '16px', marginTop: '4px' }}>→</span>
      </div>
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '12px' }}>
        {tags.map(tag => (
          <span key={tag} style={{
            fontFamily: 'var(--font-mono)', fontSize: '9px',
            color: 'var(--color-text-3)', background: 'var(--color-surface)',
            border: '0.5px solid var(--color-border)', padding: '2px 7px', borderRadius: 'var(--radius-sm)',
          }}>{tag}</span>
        ))}
      </div>
    </article>
  )
}