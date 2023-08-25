
import './globals.css'
import StyledComponentRegistry from "./registry"
import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import Header from '@/components/header'
import ApolloWrapper from '@/lib/client'
const inter = DM_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Phone Book',
  description: 'Made by Ardyutama',
}

export default function RootLayout({
  children,
}: {
  children: JSX.Element
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>
          <StyledComponentRegistry>
              <Header />
              {children}
          </StyledComponentRegistry>
        </ApolloWrapper>
      </body>
    </html>
  )
}
