import { Navbar } from '@/components/Navbar'
import './globals.css'
import { Footer } from '@/components/Footer'
import { HeadScripts } from '@/components/HeadScripts'

export const metadata = {
  title: 'catalogo de produtos',
  description: 'catálogo de produtos variados',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-Br">
      <HeadScripts />
      <body>
        <Navbar />
        <main className='min-h-[calc(100vh-7rem)]'>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
