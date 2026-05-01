'use client'

import { useState } from 'react'

export interface SkillItem     { name: string; core?: boolean }
export interface SkillCategory { label: string; skills: SkillItem[] }
interface SkillsGridProps      { categories: SkillCategory[] }

export function SkillsGrid({ categories }: SkillsGridProps) {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div style={{
      display:             'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap:                 '1px',
      background:          'var(--color-border)',
      border:              '0.5px solid var(--color-border)',
      borderRadius:        'var(--radius-sm)',
      overflow:            'hidden',
    }}>
      {categories.map(cat => (
        <div
          key={cat.label}
          onMouseEnter={() => setHovered(cat.label)}
          onMouseLeave={() => setHovered(null)}
          style={{
            background:  hovered === cat.label ? 'var(--color-elevated)' : 'var(--color-surface)',
            padding:     'var(--space-20)',
            transition:  'background 0.15s',
          }}
        >
          <div style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      'var(--text-9)',
            color:         'var(--color-teal)',
            letterSpacing: '2px',
            marginBottom:  'var(--space-16)',
          }}>
            {cat.label}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
            {cat.skills.map(skill => (
              <div key={skill.name} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>
                {skill.core
                  ? <span style={{ color: 'var(--color-teal)', fontSize: 'var(--text-8)', flexShrink: 0, lineHeight: 1 }}>·</span>
                  : <span style={{ display: 'inline-block', width: 'var(--space-8)', flexShrink: 0 }} />
                }
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize:   skill.core ? 'var(--text-12)' : 'var(--text-11)',
                  color:      skill.core ? 'var(--color-text)' : 'var(--color-text-2)',
                  fontWeight: skill.core ? 500 : 400,
                }}>
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
