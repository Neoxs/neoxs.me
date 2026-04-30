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
  gap:            '6px',
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
  sm: { padding: '4px 10px',  fontSize: '10px' },
  md: { padding: '8px 16px',  fontSize: '11px' },
  lg: { padding: '12px 24px', fontSize: '12px' },
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