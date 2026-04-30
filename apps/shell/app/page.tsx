import { getAllProjects } from '@repo/content/projects'

export const dynamic = 'force-static'

export default function Home() {
  const projects = getAllProjects()
  return (
    <main>
      <h1>yacine.dev</h1>
      <p>Frontend engineer</p>
      <section>
        {projects.map(p => (
          <article key={p.slug}>
            <h2>{p.title}</h2>
            <p>{p.description}</p>
          </article>
        ))}
      </section>
    </main>
  )
}