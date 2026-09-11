import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Annanda Jacobs',
  description: 'Portfolio de design criativo focado em branding, identidade visual e direção de arte.',
  generator: 'v0.app',
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="bg-[var(--background)]">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}