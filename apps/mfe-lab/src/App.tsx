import { SiteNavbar } from '@repo/ui/site-navbar'
import { SiteFooter } from '@repo/ui/site-footer'
import { ComingSoon } from '@repo/ui/coming-soon'
import { useSeo } from '@repo/seo/react'

export default function App() {
  useSeo({
    title:         'Component Lab',
    description:   'Interactive sandbox for the neoxs.me design system components.',
    canonicalPath: '/lab',
  })

  return (
    <>
      <SiteNavbar />
      <ComingSoon
        title="Component Lab"
        description="Interactive sandbox for the neoxs.me design system components."
      />
      <SiteFooter />
    </>
  )
}
