import { SectionHeader }    from '@repo/ui/section-header'
import { SkillsGrid }        from '@repo/ui/skills-grid'
import type { SkillCategory } from '@repo/ui/skills-grid'

const categories: SkillCategory[] = [
  {
    label: 'FRONTEND',
    skills: [
      { name: 'React 18/19',           core: true },
      { name: 'Next.js',               core: true },
      { name: 'Vue.js',                core: true },
      { name: 'TypeScript',            core: true },
      { name: 'Tailwind CSS'                      },
      { name: 'React Native'                      },
      { name: 'CSS custom properties'             },
    ],
  },
  {
    label: 'ARCHITECTURE',
    skills: [
      { name: 'Micro-frontends',       core: true },
      { name: 'Design Systems',        core: true },
      { name: 'Module Federation',     core: true },
      { name: 'Monorepo / Nx'                     },
      { name: 'Storybook'                         },
      { name: 'WCAG 2.1 / A11y'                   },
    ],
  },
  {
    label: 'DEVOPS',
    skills: [
      { name: 'Kubernetes',            core: true },
      { name: 'Docker',                core: true },
      { name: 'GitHub Actions',        core: true },
      { name: 'Helm / Helmfile'                   },
      { name: 'AWS ECR / ECS'                     },
      { name: 'Grafana / Prometheus'              },
    ],
  },
  {
    label: 'BACKEND',
    skills: [
      { name: 'Node.js / NestJS',      core: true },
      { name: 'Java / Spring Boot',    core: true },
      { name: 'Apache Kafka',          core: true },
      { name: 'PostgreSQL / Redis'                },
      { name: 'Go'                                },
      { name: 'REST / Swagger'                    },
    ],
  },
  {
    label: 'TESTING & QA',
    skills: [
      { name: 'Playwright',            core: true },
      { name: 'Cypress',               core: true },
      { name: 'Jest',                  core: true },
      { name: 'MSW'                               },
      { name: 'ESLint v9'                         },
      { name: 'Security Analysis'                 },
    ],
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
