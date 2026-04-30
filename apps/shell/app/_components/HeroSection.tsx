import { Terminal }  from '@repo/ui/terminal'
import { Lighthouse } from '@repo/ui/lighthouse'

export function HeroSection() {
  return (
    <section className="section" style={{ paddingTop: '72px', paddingBottom: '72px', borderTop: 'none' }}>
      <div className="container">

        {/* Eyebrow */}
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-teal)', letterSpacing: '3px', marginBottom: '24px' }}>
          // FRONTEND ENGINEER · PARIS
        </div>

        {/* Headline */}
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(40px, 6vw, 68px)', fontWeight: 400, color: 'var(--color-text)', lineHeight: 1.06, marginBottom: '8px' }}>
          Building interfaces
        </h1>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(40px, 6vw, 68px)', fontWeight: 400, lineHeight: 1.06, marginBottom: '36px' }}>
          that{' '}
          <em style={{ color: 'var(--color-teal)', fontStyle: 'italic' }}>scale.</em>
        </h1>

        {/* Sub */}
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-text-3)', letterSpacing: '0.5px', marginBottom: '52px' }}>
          React · Vue · Next.js · Module Federation · Kubernetes · Turborepo
        </p>

        {/* Terminal + Lighthouse row */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '280px' }}>
            <Terminal
              cwd="~/yacine.dev ‹main› ✓"
              lines={[
                { prompt: true,  text: 'kubectl get pods -n portfolio' },
                { dim: true,     text: 'mfe-shell     1/1  Running  ●' },
                { dim: true,     text: 'mfe-blog      1/1  Running  ●' },
                { dim: true,     text: 'mfe-lab       1/1  Running  ●' },
                { dim: true,     text: 'mfe-infra     1/1  Running  ●' },
              ]}
            />
          </div>
          <div style={{ flexShrink: 0 }}>
            <Lighthouse perf={100} a11y={100} seo={100} bp={100} />
          </div>
        </div>

      </div>
    </section>
  )
}