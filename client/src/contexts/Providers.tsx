'use client'

import { PropsWithChildren } from 'react'
import { ReduxProvider } from '@/redux-store'
import { AppProvider } from './AppContext'
import { NextThemeProvider } from './NextThemeProvider'

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ReduxProvider>
      <AppProvider>
        <NextThemeProvider>{children}</NextThemeProvider>
      </AppProvider>
    </ReduxProvider>
  )
}
