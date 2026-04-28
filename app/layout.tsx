import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LocalLeads — Get Local Service Quotes Fast',
  description: 'Submit one request. Get matched with vetted local service providers. Free.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">{children}</body>
    </html>
  )
}
