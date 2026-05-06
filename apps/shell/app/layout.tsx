import type { Metadata } from 'next'
import './globals.css'
import { ShellNavbar }  from './_components/ShellNavbar'
import { ShellFooter }  from './_components/ShellFooter'
import { toNextMetadata } from '@repo/seo/next'
import { siteConfig }     from '@repo/seo/site'

export const metadata: Metadata = {
  ...toNextMetadata({
    title:         siteConfig.name,
    description:   siteConfig.description,
    canonicalPath: '/',
  }),
  title: {
    default:  siteConfig.name,
    template: `%s — ${siteConfig.name}`,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ShellNavbar />
        {children}
        <ShellFooter builtWith="Next.js" />
      </body>
    </html>
  )
}