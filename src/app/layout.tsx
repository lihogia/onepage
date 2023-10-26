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

  function editClick() {
    console.log('Edit click!');
  }


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
          Copyright linh.hong.sg@gmail.com
        </footer>
      </body>
    </html>
  )
}
