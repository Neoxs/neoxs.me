import { HeroHeading }  from '@repo/ui/hero-heading'
import { LiveTerminal } from '@repo/ui/live-terminal'
import { Lighthouse }   from '@repo/ui/lighthouse'
import type { LiveScene } from '@repo/ui/live-terminal'

function heroStats(projectCount: number) {
  return [
    { value: '03', label: 'years exp' },
    { value: String(projectCount).padStart(2, '0'), label: 'projects' },
    { value: '04', label: 'MFE apps here' },
  ]
}

/** Mirrors real neoxs.me flows: Turborepo → Compose + Nginx → Helm → cluster */
const scenes: LiveScene[] = [
  {
    command: 'pnpm turbo build',
    lines: [
      { text: '• Packages in scope: shell, mfe-blog, mfe-lab, mfe-infra', dim: true, hold: 90 },
      { text: '• Running build in 4 packages', dim: true, hold: 80 },
  
      {
        text: '▸ shell:build        ░░░░░░░░░░░░░░░░░░░░  BUILDING',
        dim: true,
        loading: true,
        hold: 500,
        resolvedText: '▸ shell:build        ████████████████████  DONE',
        success: true,
      },
  
      {
        text: '▸ mfe-blog:build     ░░░░░░░░░░░░░░░░░░░░  BUILDING',
        dim: true,
        loading: true,
        hold: 500,
        resolvedText: '▸ mfe-blog:build     ████████████████████  DONE',
        success: true,
      },
  
      {
        text: '▸ mfe-lab:build      ░░░░░░░░░░░░░░░░░░░░  BUILDING',
        dim: true,
        loading: true,
        hold: 500,
        resolvedText: '▸ mfe-lab:build      ████████████████████  DONE',
        success: true,
      },
  
      {
        text: '▸ mfe-infra:build    ░░░░░░░░░░░░░░░░░░░░  BUILDING',
        dim: true,
        loading: true,
        hold: 500,
        resolvedText: '▸ mfe-infra:build    ████████████████████  DONE',
        success: true,
      },
  
      {
        text: 'Tasks:    0 successful, 4 total · Cached: 0',
        dim: true,
        loading: true,
        hold: 900,
        resolvedText: 'Tasks:    4 successful, 4 total · Cached: 0',
        success: true,
      },
    ],
    holdAfter: 1100,
  },
  {
    command: 'docker compose up -d --build',
    lines: [
      {
        text: '[+] Building … nginx · shell · blog · lab · infra',
        dim: true,
        loading: true,
        hold: 700,
        resolvedText: '[+] Building complete',
        success: true,
      },
  
      {
        text: '◌ Container neoxs-nginx-1   Starting',
        dim: true,
        loading: true,
        hold: 400,
        resolvedText: '✔ Container neoxs-nginx-1   Started',
        success: true,
      },
  
      {
        text: '◌ Container mfe-shell-1    Waiting healthcheck',
        dim: true,
        loading: true,
        hold: 500,
        resolvedText: '✔ Container mfe-shell-1    Healthy',
        success: true,
      },
  
      {
        text: '◌ Container mfe-blog-1     Waiting healthcheck',
        dim: true,
        loading: true,
        hold: 500,
        resolvedText: '✔ Container mfe-blog-1     Healthy',
        success: true,
      },
  
      {
        text: '◌ Container mfe-lab-1      Waiting healthcheck',
        dim: true,
        loading: true,
        hold: 700,
        resolvedText: '✔ Container mfe-lab-1      Healthy',
        success: true,
      },
  
      {
        text: '◌ Container mfe-infra-1    Waiting healthcheck',
        dim: true,
        loading: true,
        hold: 650,
        resolvedText: '✔ Container mfe-infra-1    Healthy',
        success: true,
      },
  
      {
        text: '→ Exposing services on localhost...',
        dim: true,
        loading: true,
        hold: 300,
        resolvedText: '→ http://localhost  (nginx → / · /blog · /lab)',
        success: true,
      },
    ],
    holdAfter: 1200,
  },
  {
    command: 'helm upgrade --install neoxs-me ./infra/helm/neoxs-me -n portfolio --wait',
    lines: [
      {
        text: 'Release "neoxs-me" does not exist. Installing.',
        dim: true,
        hold: 120,
      },
  
      {
        text: '◌ Pulling chart dependencies...',
        dim: true,
        loading: true,
        hold: 500,
        resolvedText: '✔ Chart dependencies resolved',
        success: true,
      },
  
      {
        text: '◌ Rendering Kubernetes manifests...',
        dim: true,
        loading: true,
        hold: 600,
        resolvedText: '✔ Manifests rendered successfully',
        success: true,
      },
  
      {
        text: '◌ Deploying workloads to namespace/portfolio',
        dim: true,
        loading: true,
        hold: 900,
        resolvedText: '✔ Workloads deployed',
        success: true,
      },
  
      {
        text: '◌ Waiting for deployments to become ready',
        dim: true,
        loading: true,
        hold: 1100,
        resolvedText: '✔ All deployments ready',
        success: true,
      },
  
      {
        text: 'STATUS: pending-upgrade',
        dim: true,
        loading: true,
        hold: 500,
        resolvedText: 'STATUS: deployed',
        success: true,
      },
  
      {
        text: '◌ Registering ingress + TLS certificates',
        dim: true,
        loading: true,
        hold: 700,
        resolvedText: 'Ingress: neoxs.me · TLS cert-manager/Let\'s Encrypt',
        success: true,
      },
  
      {
        text: '◌ Syncing microfrontends',
        dim: true,
        loading: true,
        hold: 500,
        resolvedText: 'Deployed apps: shell · mfe-blog · mfe-lab · mfe-infra',
        success: true,
      },
    ],
    holdAfter: 1100,
  },
  {
    command: 'kubectl get pods -n portfolio',
    lines: [
      {
        text: 'NAME                         READY   STATUS              RESTARTS   AGE',
        dim: true,
        hold: 120,
      },
  
      {
        text: 'neoxs-me-shell-7d9f8c6      0/1     ContainerCreating   0          3s',
        dim: true,
        loading: true,
        hold: 600,
        resolvedText: 'neoxs-me-shell-7d9f8c6      0/1     PodInitializing    0          8s',
        success: true,
      },
  
      {
        text: 'neoxs-me-shell-7d9f8c6      0/1     PodInitializing    0          12s',
        dim: true,
        loading: true,
        hold: 900,
        resolvedText: 'neoxs-me-shell-7d9f8c6      1/1     Running            0          18s  ●',
        success: true,
      },
  
      {
        text: 'neoxs-me-blog-54bc21        0/1     ContainerCreating   0          2s',
        dim: true,
        loading: true,
        hold: 500,
        resolvedText: 'neoxs-me-blog-54bc21        1/1     Running            0          14s  ●',
        success: true,
      },
  
      {
        text: 'neoxs-me-lab-c8a901         0/1     ContainerCreating   0          2s',
        dim: true,
        loading: true,
        hold: 500,
        resolvedText: 'neoxs-me-lab-c8a901         1/1     Running            0          13s  ●',
        success: true,
      },
  
      {
        text: 'neoxs-me-infra-33f2bb       0/1     ContainerCreating   0          1s',
        dim: true,
        loading: true,
        hold: 500,
        resolvedText: 'neoxs-me-infra-33f2bb       1/1     Running            0          11s  ●',
        success: true,
      },
    ],
    holdAfter: 2400,
  },
]

interface HeroSectionProps {
  /** Total project entries (from content); keeps the stat in sync with /projects */
  projectCount: number
}

export function HeroSection({ projectCount }: HeroSectionProps) {
  const stats = heroStats(projectCount)

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
          eyebrow="// SOFTWARE ENGINEER · PARIS"
          line1="Software engineer"
          line2="shipping end-to-end —"
          accent="UI to cluster."
          sub="React · Next.js · Vue · TypeScript · Node.js · Docker · Kubernetes · CI/CD"
          openToWork={false}
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
