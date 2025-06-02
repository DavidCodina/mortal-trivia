'use client'

import React, {
  PropsWithChildren,
  useRef,
  useEffect,
  useTransition,
  useState,
  useCallback
} from 'react'

import { createContext, useContextSelector } from 'use-context-selector'
import { useRouter, usePathname } from 'next/navigation'

export interface AppContextValue {
  test: string
  routePending: boolean
  handleRouteChange: (route: string) => void
  // [key: string]: any
}

/* ========================================================================

======================================================================== */

export const AppContext = createContext({} as AppContextValue)

export const AppProvider = ({ children }: PropsWithChildren) => {
  const pathname = usePathname()
  const previousPath = useRef<string | null>('')

  /* ======================
  Logic For CurrentPageLoader
  ====================== */

  const router = useRouter()
  const [_routePending, startRouteTransition] = useTransition()

  const [routePending, setRoutePending] = useState(false)
  // Works in conjunction with TransitionLoader component.
  const handleRouteChange = useCallback(
    (route: string) => {
      startRouteTransition(() => {
        router.push(route)
      })
    },
    [router]
  )

  // Defer the routePending state for an additional 250ms. This generally
  // prevents the loading spinner flicker when the page loads immediately.
  useEffect(() => {
    let routPendingTimeout: NodeJS.Timeout

    if (_routePending === true) {
      routPendingTimeout = setTimeout(() => {
        setRoutePending(_routePending)
      }, 250)
    } else {
      setRoutePending(_routePending)
    }

    return () => {
      clearTimeout(routPendingTimeout)
    }
  }, [_routePending])

  /* ======================
        useEffect()
  ====================== */

  useEffect(() => {
    return () => {
      previousPath.current = pathname
      // console.log('previousPath.current:', previousPath.current)
    }
  }, [pathname])

  /* ======================
          return
  ====================== */

  return (
    <AppContext.Provider
      value={{
        test: 'Testing 123...',
        routePending,
        handleRouteChange
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

///////////////////////////////////////////////////////////////////////////
//
// Usage:
//
//  ✅ const showMenu    = useAppContextSelector('showMenu')
//  ✅ const setShowMenu = useAppContextSelector('setShowMenu')
//
///////////////////////////////////////////////////////////////////////////

export const useAppContextSelector = <T extends keyof AppContextValue>(
  key: T
) => {
  const value = useContextSelector(AppContext, (state) => state[key])
  return value
}
