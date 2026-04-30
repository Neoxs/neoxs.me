import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?:  string
  hint?:   string
  error?:  string
}

export function Input({ label, hint, error, style, ...props }: InputProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {label && (
        <label style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '9px',
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
        fontSize:     '11px',
        padding:      '9px 12px',
        borderRadius: 'var(--radius-sm)',
        outline:      'none',
        transition:   'border-color 0.15s',
        ...style,
      }} {...props} />
      {(hint || error) && (
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize:   '9px',
          color:      error ? 'var(--color-red)' : 'var(--color-text-3)',
        }}>{error ?? hint}</span>
      )}
    </div>
  )
}