import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/app/components/nav/Header';
import '@/app/components/css/globals.css';
import '@/app/components/css/styles.css';
import '@/app/components/css/styles_mobile.css';
import '@/app/components/css/styles_tablet.css';
import '@/app/components/css/styles_desktop.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: `${process.env.productname}`,
  description: `${process.env.tag}_${process.env.version}`
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
