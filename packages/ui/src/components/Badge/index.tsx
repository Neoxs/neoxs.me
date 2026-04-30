import type { ReactNode } from 'react'

export type BadgeVariant = 'teal' | 'gray' | 'red' | 'amber'

interface BadgeProps {
  variant?: BadgeVariant
  dot?:     boolean
  children: ReactNode
}

const variants: Record<BadgeVariant, React.CSSProperties> = {
  teal:  { background: 'var(--color-teal-dim)',  color: 'var(--color-teal)',  border: '0.5px solid var(--color-teal-border)' },
  gray:  { background: 'var(--color-surface)',   color: 'var(--color-text-3)', border: '0.5px solid var(--color-border)' },
  red:   { background: 'var(--color-red-bg)',    color: 'var(--color-red)',   border: '0.5px solid var(--color-red-border)' },
  amber: { background: 'var(--color-amber-bg)',  color: 'var(--color-amber)', border: '0.5px solid var(--color-amber-border)' },
}

export function Badge({ variant = 'teal', dot = false, children }: BadgeProps) {
  return (
    <span style={{
      display:       'inline-flex',
      alignItems:    'center',
      gap:           dot ? '5px' : undefined,
      fontFamily:    'var(--font-mono)',
      fontSize:      '9px',
      letterSpacing: '1.5px',
      padding:       '3px 8px',
      borderRadius:  'var(--radius-sm)',
      ...variants[variant],
    }}>
      {dot && (
        <span style={{
          width:        '5px',
          height:       '5px',
          borderRadius: '50%',
          background:   'currentColor',
          flexShrink:   0,
        }} />
      )}
      {children}
    </span>
  )
}