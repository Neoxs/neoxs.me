import { Badge } from '../Badge'
import { Button } from '../Button'

interface ComingSoonProps {
  title: string
  description?: string
  badge?: string
  href?: string
}

export function ComingSoon({
  title,
  description,
  badge = 'COMING SOON',
  href = '/',
}: ComingSoonProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 200px)',
      padding: 'var(--space-40) var(--space-20)',
      textAlign: 'center',
    }}>
      <Badge variant="teal" dot>{badge}</Badge>

      <h1 style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-32)',
        fontWeight: 400,
        color: 'var(--color-text)',
        margin: 'var(--space-16) 0 var(--space-8)',
        letterSpacing: '-0.5px',
      }}>
        {title}
      </h1>

      {description && (
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-14)',
          color: 'var(--color-text-2)',
          maxWidth: '440px',
          lineHeight: 1.7,
          margin: '0 auto var(--space-32)',
        }}>
          {description}
        </p>
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={() => { window.location.href = href }}
      >
        ← back to portfolio
      </Button>
    </div>
  )
}
