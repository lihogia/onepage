import Script from 'next/script';
import { Inter } from 'next/font/google';
import '@/app/components/css/globals.css';
import '@/app/components/css/styles.css';
import '@/app/components/css/styles_mobile.css';
import '@/app/components/css/styles_tablet.css';
import '@/app/components/css/styles_desktop.css';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: `${process.env.productname}`,
  description: `${process.env.tag}_${process.env.version}`/*,
  googleAdsenseAccount: 'ca-pub-1714100900353848'*/
}
/*
export default function RootLayout({
    children,
}: {
  children: React.ReactNode
}) {
*/
export default function RootLayout({
  children,
}) {

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
        <script async src="https://kit.fontawesome.com/945077c763.js" crossOrigin="anonymous"></script>
        {/* 
        <script async src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1714100900353848' 
      crossOrigin="anonymous"></script>
        */}
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
