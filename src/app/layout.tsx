import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/app/components/menu/Header';
import './globals.css';

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
        <Header />
        {children}
      </body>
    </html>
  )
}
