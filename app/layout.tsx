import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Annanda Jacobs',
  description: 'Portfólio de Annanda Jacobs, desenvolvedora e pesquisadora com foco em inteligência artificial.',
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