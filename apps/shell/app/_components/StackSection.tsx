import { SectionHeader } from '@repo/ui/section-header'
import { SkillsGrid }    from '@repo/ui/skills-grid'

const categories = [
  {
    label: 'FRONTEND',
    skills: ['React / Next.js', 'Vue / Nuxt', 'TypeScript', 'Tailwind / SCSS', 'Redux / Zustand'],
  },
  {
    label: 'ARCHITECTURE',
    skills: ['Microfrontends', 'Module Federation', 'Monorepos', 'Turborepo', 'Design Systems'],
  },
  {
    label: 'DEVOPS',
    skills: ['Kubernetes', 'Docker', 'GitHub Actions', 'Helm', 'GHCR'],
  },
  {
    label: 'BACKEND',
    skills: ['Node.js', 'Java / Spring', 'Go', 'Strapi', 'PostgreSQL'],
  },
]

export function StackSection() {
  return (
    <section id="stack" className="section">
      <div className="container">
        <SectionHeader label="// STACK" title="Tools & expertise" />
        <SkillsGrid categories={categories} />
      </div>
    </section>
  )
}