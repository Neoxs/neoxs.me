import { HeroHeading }  from '@repo/ui/hero-heading'
import { LiveTerminal } from '@repo/ui/live-terminal'
import { Lighthouse }   from '@repo/ui/lighthouse'
import type { LiveScene } from '@repo/ui/live-terminal'

const stats = [
  { value: '05', label: 'years exp'        },
  { value: '12', label: 'projects shipped' },
  { value: '03', label: 'MFE systems'      },
]

const scenes: LiveScene[] = [
  {
    command: 'pnpm turbo build --filter=shell',
    lines: [
      { text: '▸ shell:build  cache miss, executing',  dim: true, hold: 80 },
      { text: '▸ compiling 324 modules',               dim: true,
        loading: true, hold: 1400,
        resolvedText: '✓ compiled  324 modules  3.8s', success: true },
    ],
    holdAfter: 1200,
  },
  {
    command: 'docker build -t registry.neoxs.me/mfe-shell:v1.4 .',
    lines: [
      { text: '[1/4] FROM node:20-alpine',             dim: true, hold: 90  },
      { text: '[2/4] RUN pnpm install --frozen-lockfile', dim: true, hold: 100 },
      { text: '[3/4] RUN pnpm turbo build',            dim: true, hold: 90  },
      { text: '[4/4] pushing layers',                  dim: true,
        loading: true, hold: 1600,
        resolvedText: '✓ pushed  registry.neoxs.me/mfe-shell:v1.4', success: true },
    ],
    holdAfter: 1200,
  },
  {
    command: 'kubectl apply -f k8s/ -n portfolio',
    lines: [
      { text: 'deployment.apps/mfe-shell      configured', dim: true },
      { text: 'deployment.apps/mfe-blog       configured', dim: true },
      { text: 'service/mfe-shell              unchanged',  dim: true },
      { text: 'ingress/neoxs-ingress          configured', dim: true },
    ],
    holdAfter: 1200,
  },
  {
    command: 'kubectl get pods -n portfolio -w',
    lines: [
      { text: 'mfe-shell   0/1  ContainerCreating',
        loading: true, hold: 1100,
        resolvedText: 'mfe-shell   1/1  Running  ●', success: true },
      { text: 'mfe-blog    0/1  ContainerCreating',
        loading: true, hold: 900,
        resolvedText: 'mfe-blog    1/1  Running  ●',  success: true },
      { text: 'mfe-lab     0/1  ContainerCreating',
        loading: true, hold: 750,
        resolvedText: 'mfe-lab     1/1  Running  ●',  success: true },
      { text: 'mfe-infra   0/1  ContainerCreating',
        loading: true, hold: 820,
        resolvedText: 'mfe-infra   1/1  Running  ●',  success: true },
    ],
    holdAfter: 2500,
  },
]

export function HeroSection() {
  return (
    <section style={{
      minHeight:      'calc(100dvh - 52px)',
      display:        'flex',
      flexDirection:  'column',
      justifyContent: 'center',
      borderBottom:   '0.5px solid var(--color-border)',
      position:       'relative',
    }}>
      <div className="container hero-padding">

        <HeroHeading
          line1="Building interfaces"
          line2="that"
          accent="scale."
          sub="React · Vue · Next.js · Module Federation · Kubernetes · Turborepo"
          openToWork
        />

        {/* Stats row */}
        <div className="hero-stats">
          {stats.map(s => (
            <div key={s.label}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-22)', color: 'var(--color-teal)', fontWeight: 500, lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-10)', color: 'var(--color-text-2)', letterSpacing: '0.06em', marginTop: 'var(--space-6)' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Widgets row */}
        <div style={{
          display:    'flex',
          gap:        'var(--space-16)',
          alignItems: 'flex-start',
          flexWrap:   'wrap',
          marginTop:  'var(--space-32)',
        }}>
          <div style={{ flex: 1, minWidth: '280px' }}>
            <LiveTerminal cwd="~/neoxs.me ‹main› ✓" scenes={scenes} />
          </div>
          <div style={{ flexShrink: 0 }}>
            <Lighthouse perf={100} a11y={100} seo={100} bp={100} />
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div style={{
        position:      'absolute',
        bottom:        'var(--space-24)',
        left:          '50%',
        transform:     'translateX(-50%)',
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
        gap:           'var(--space-6)',
        animation:     'scroll-pulse 2s ease-in-out infinite',
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-9)', color: 'var(--color-text-3)', letterSpacing: '2px' }}>SCROLL</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ color: 'var(--color-teal)' }}>
          <path d="M6 1v10M1 6l5 5 5-5" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

    </section>
  )
}
