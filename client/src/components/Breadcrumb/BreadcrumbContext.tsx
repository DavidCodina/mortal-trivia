'use client'

import { PropsWithChildren, createContext, useContext, ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'

export type BreadcrumbContextValue = {
  separator: ReactNode
  // [key: string]: any
}

type BreadcrumbProviderProps = PropsWithChildren & {
  separator?: ReactNode
}

/* ========================================================================

======================================================================== */

export const BreadcrumbContext = createContext({} as BreadcrumbContextValue)

export const BreadcrumbProvider = ({
  children,
  separator = <ChevronRight className='h-[1.25em] w-[1.25em]' />
}: BreadcrumbProviderProps) => {
  /* ======================
          return
  ====================== */

  return (
    <BreadcrumbContext.Provider
      value={{
        separator
      }}
    >
      {children}
    </BreadcrumbContext.Provider>
  )
}

export function useBreadcrumbContext() {
  const value = useContext(BreadcrumbContext)
  return value
}
