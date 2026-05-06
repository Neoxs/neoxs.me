import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { SiteNavbar } from '@repo/ui/site-navbar'
import { SiteFooter } from '@repo/ui/site-footer'

import '../styles.css'

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => (
    <p className="p-8 text-zinc-500 font-mono text-sm">404 — not found</p>
  ),
})

function RootComponent() {
  return (
    <>
      <SiteNavbar />
      <Outlet />
      <SiteFooter builtWith="React · TanStack" />
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  )
}
