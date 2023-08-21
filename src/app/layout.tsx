/** @jsxImportSource @emotion/react */
import './globals.css'
import EmotionJsxRegistry from "./registry"
import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import Header from '@/components/header'
const inter = DM_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: JSX.Element
}) {
  return (
    <html lang="en">
      <EmotionJsxRegistry>
        <body className={inter.className}>
          <Header />
          {children}
        </body>
        </EmotionJsxRegistry>
    </html>
  )
}
