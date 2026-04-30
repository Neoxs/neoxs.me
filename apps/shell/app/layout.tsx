import type { Metadata } from 'next'
import '@repo/ui/styles'

export const metadata: Metadata = {
  title: { default: 'neoxs.me', template: '%s — neoxs.me' },
  description: 'Frontend engineer. React, Vue, Next.js, Kubernetes.',
  metadataBase: new URL('https://neoxs.me'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}