import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="section" style={{ borderTop: 'none', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--color-teal)', letterSpacing: '3px', marginBottom: '16px' }}>
          // 404
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '48px', color: 'var(--color-text)', fontWeight: 400, marginBottom: '12px' }}>
          Page not found.
        </h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-text-3)', marginBottom: '32px' }}>
          This route doesn't exist in any of the MFEs.
        </p>
        <Link href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-teal)', border: '0.5px solid var(--color-teal-border)', padding: '8px 16px', borderRadius: 'var(--radius-sm)', textDecoration: 'none', background: 'var(--color-teal-dim)' }}>
          ← back home
        </Link>
      </div>
    </main>
  )
}