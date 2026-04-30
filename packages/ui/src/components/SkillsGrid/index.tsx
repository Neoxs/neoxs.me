interface SkillCategory { label: string; skills: string[] }

interface SkillsGridProps { categories: SkillCategory[] }

export function SkillsGrid({ categories }: SkillsGridProps) {
  return (
    <div style={{
      display:             'grid',
      gridTemplateColumns: `repeat(${categories.length}, 1fr)`,
      gap:                 '1px',
      background:          'var(--color-border)',
      border:              '0.5px solid var(--color-border)',
      borderRadius:        'var(--radius-sm)',
      overflow:            'hidden',
    }}>
      {categories.map(cat => (
        <div key={cat.label} style={{ background: 'var(--color-surface)', padding: '18px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', color: 'var(--color-teal)', letterSpacing: '2px', marginBottom: '14px' }}>
            {cat.label}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {cat.skills.map(skill => (
              <span key={skill} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-text-3)' }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}