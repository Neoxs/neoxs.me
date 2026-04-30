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
      padding:      'var(--space-16)',
      transition:   'border-color 0.15s',
      ...style,
    }} {...props}>
      {meta && (
        <div style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      'var(--text-8)',
          color:         'var(--color-teal)',
          letterSpacing: '2px',
          marginBottom:  'var(--space-8)',
        }}>{meta}</div>
      )}
      {title && (
        <div style={{
          fontFamily:  'var(--font-serif)',
          fontSize:    'var(--text-16)',
          color:       'var(--color-text)',
          fontWeight:  400,
          marginBottom: subtitle ? 'var(--space-4)' : '0',
        }}>{title}</div>
      )}
      {subtitle && (
        <div style={{
          fontFamily:  'var(--font-mono)',
          fontSize:    'var(--text-10)',
          color:       'var(--color-text-3)',
          lineHeight:  1.6,
          marginBottom: tags ? 'var(--space-12)' : '0',
        }}>{subtitle}</div>
      )}
      {tags}
      {children}
    </div>
  )
}