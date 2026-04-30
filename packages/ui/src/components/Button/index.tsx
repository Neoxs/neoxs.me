import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'ghost' | 'danger'
export type ButtonSize    = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?:    ButtonSize
  children: ReactNode
}

const base: React.CSSProperties = {
  display:        'inline-flex',
  alignItems:     'center',
  gap:            'var(--space-6)',
  fontFamily:     'var(--font-mono)',
  letterSpacing:  '0.5px',
  cursor:         'pointer',
  borderRadius:   'var(--radius-sm)',
  transition:     'all 0.15s',
  border:         'none',
  whiteSpace:     'nowrap',
}

const variants: Record<ButtonVariant, React.CSSProperties> = {
  primary: { background: 'var(--color-teal)',    color: '#fff' },
  ghost:   { background: 'none', border: '0.5px solid var(--color-border-2)', color: 'var(--color-text-2)' },
  danger:  { background: 'none', border: '0.5px solid var(--color-red-border)', color: 'var(--color-red)' },
}

const sizes: Record<ButtonSize, React.CSSProperties> = {
  sm: { padding: 'var(--space-4) var(--space-10)',  fontSize: 'var(--text-10)' },
  md: { padding: 'var(--space-8) var(--space-16)',  fontSize: 'var(--text-11)' },
  lg: { padding: 'var(--space-12) var(--space-24)', fontSize: 'var(--text-12)' },
}

export function Button({
  variant = 'primary',
  size    = 'md',
  style,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      style={{ ...base, ...variants[variant], ...sizes[size], ...style }}
      {...props}
    >
      {children}
    </button>
  )
}