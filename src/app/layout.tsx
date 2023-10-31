import type { Metadata } from 'next';
import Image from 'next/image';
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Onepage Alpha',
  description: 'Alpha version'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <nav>
            <ul className='menu'>
              <li><a href="/"><Image src='/onepage.png' width={20} height={20} alt='OnePage'/></a></li>
              <li><a href="/edit">Edit</a></li>
              <li><a href="#">Config</a></li>
            </ul>
          </nav>
        </header>
        {children}
        <footer>
          © 2023 <a href='mailto:lilogia@gmail.com'>lilogia</a>. All right reserved.
        </footer>
      </body>
    </html>
  )
}
