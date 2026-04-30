import type { ReactNode } from 'react'

// Wraps MDX/markdown content with consistent prose styles
// Used in blog post pages around <MDXRemote> or <ContentRenderer>
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div style={{
      fontFamily: 'var(--font-mono)',
      fontSize:   '13px',
      lineHeight: 1.85,
      color:      'var(--color-text-2)',
      maxWidth:   '680px',
    }}>
      {children}
    </div>
  )
}