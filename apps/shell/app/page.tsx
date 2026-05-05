import { getAllProjects } from '@repo/content/projects'
import { HeroSection }    from './_components/HeroSection'
import { ProjectsSection } from './_components/ProjectsSection'
import { StackSection }   from './_components/StackSection'

export const dynamic = 'force-static'

export default function Home() {
  const projects = getAllProjects()

  return (
    <main>
      <HeroSection projectCount={projects.length} />
      <ProjectsSection projects={projects} />
      <StackSection />
    </main>
  )
}