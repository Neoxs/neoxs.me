import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  featured?: boolean
  meta?:     string
  title?:    string
  subtitle?: string
  tags?:     ReactNode
  children?: ReactNode
}

export function Card({ featured, meta, title, subtitle, tags, children, style, ...props }: CardProps) {
  return (
    <div style={{
      background:   'var(--color-surface)',
      border:       featured ? '2px solid var(--color-teal)' : '0.5px solid var(--color-border)',
      borderLeft:   featured ? '2px solid var(--color-teal)' : undefined,
      borderRadius: featured ? '0' : 'var(--radius-sm)',
      padding:      '16px',
      transition:   'border-color 0.15s',
      ...style,
    }} {...props}>
      {meta && (
        <div style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '8px',
          color:         'var(--color-teal)',
          letterSpacing: '2px',
          marginBottom:  '8px',
        }}>{meta}</div>
      )}
      {title && (
        <div style={{
          fontFamily:  'var(--font-serif)',
          fontSize:    '16px',
          color:       'var(--color-text)',
          fontWeight:  400,
          marginBottom: subtitle ? '4px' : '0',
        }}>{title}</div>
      )}
      {subtitle && (
        <div style={{
          fontFamily:  'var(--font-mono)',
          fontSize:    '10px',
          color:       'var(--color-text-3)',
          lineHeight:  1.6,
          marginBottom: tags ? '12px' : '0',
        }}>{subtitle}</div>
      )}
      {tags}
      {children}
    </div>
  )
}