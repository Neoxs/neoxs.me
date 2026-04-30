interface SkillCategory { label: string; skills: string[] }

interface SkillsGridProps { categories: SkillCategory[] }

export function SkillsGrid({ categories }: SkillsGridProps) {
  return (
    <div style={{
      display:             'grid',
      gridTemplateColumns: `repeat(${categories.length}, 1fr)`,
      gap:                 'var(--space-1)',
      background:          'var(--color-border)',
      border:              '0.5px solid var(--color-border)',
      borderRadius:        'var(--radius-sm)',
      overflow:            'hidden',
    }}>
      {categories.map(cat => (
        <div key={cat.label} style={{ background: 'var(--color-surface)', padding: 'var(--space-18)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-7)', color: 'var(--color-teal)', letterSpacing: '2px', marginBottom: 'var(--space-14)' }}>
            {cat.label}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
            {cat.skills.map(skill => (
              <span key={skill} style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-11)', color: 'var(--color-text-3)' }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}