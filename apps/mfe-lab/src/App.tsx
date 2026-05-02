import { SiteNavbar } from '@repo/ui/site-navbar'
import { SiteFooter } from '@repo/ui/site-footer'
import { ComingSoon } from '@repo/ui/coming-soon'

export default function App() {
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
