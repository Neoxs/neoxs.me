import type { Metadata } from 'next'
import './globals.css'
import { ShellNavbar }  from './_components/ShellNavbar'
import { ShellFooter }  from './_components/ShellFooter'

export const metadata: Metadata = {
  title: {
    default:  'neoxs.me',
    template: '%s — neoxs.me',
  },
  description: 'Frontend engineer specialising in microfrontend architecture, performance, and DevOps. Based in Paris.',
  metadataBase: new URL('https://neoxs.me'),
  openGraph: {
    type:      'website',
    locale:    'en_US',
    url:       'https://neoxs.me',
    siteName:  'neoxs.me',
    title:     'neoxs.me',
    description: 'Frontend engineer. React, Vue, Next.js, Kubernetes.',
  },
  twitter: {
    card:  'summary_large_image',
    title: 'neoxs.me',
  },
  robots: {
    index:  true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ShellNavbar />
        {children}
        <ShellFooter />
      </body>
    </html>
  )
}