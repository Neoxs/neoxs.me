import { getAllProjects } from '@repo/content/projects'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Things I have built.',
}

export const dynamic = 'force-static'

export default function ProjectsPage() {
  const projects = getAllProjects()
  return (
    <main>
      <h1>Projects</h1>
      {projects.map(p => (
        <article key={p.slug}>
          <h2>{p.title}</h2>
          <p>{p.description}</p>
        </article>
      ))}
    </main>
  )
}