'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import StoreProvider from './StoreProvider'

export default function Providers({
  children,
  session,
}: {
  children: ReactNode
  session: any
}) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>{children}</StoreProvider>
    </SessionProvider>
  )
}
