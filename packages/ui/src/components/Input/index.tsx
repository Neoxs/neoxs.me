import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?:  string
  hint?:   string
  error?:  string
}

export function Input({ label, hint, error, style, ...props }: InputProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      {label && (
        <label style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      'var(--text-9)',
          letterSpacing: '1.5px',
          color:         'var(--color-text-3)',
        }}>{label}</label>
      )}
      <input style={{
        width:        '100%',
        background:   'var(--color-elevated)',
        border:       error ? '0.5px solid var(--color-red-border)' : '0.5px solid var(--color-border-2)',
        color:        'var(--color-text)',
        fontFamily:   'var(--font-mono)',
        fontSize:     'var(--text-11)',
        padding:      'var(--space-9) var(--space-12)',
        borderRadius: 'var(--radius-sm)',
        outline:      'none',
        transition:   'border-color 0.15s',
        ...style,
      }} {...props} />
      {(hint || error) && (
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize:   'var(--text-9)',
          color:      error ? 'var(--color-red)' : 'var(--color-text-3)',
        }}>{error ?? hint}</span>
      )}
    </div>
  )
}