'use client'

import * as React from 'react'

type Variant = 'default' | 'primary' | 'secondary'
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'

export type StepperContextValue = {
  alternativeLabel: boolean
  /** The viewport width under which the separators are removed. */
  separatorBreakpoint: number
  size: Size | undefined
  variant: Variant
}

export const StepperContext = React.createContext({} as StepperContextValue)

type StepperProviderProps = {
  alternativeLabel?: boolean
  separatorBreakpoint?: number
  children: React.ReactNode
  size?: Size
  variant?: Variant
}

/* ========================================================================

======================================================================== */

export const StepperProvider = ({
  alternativeLabel = false,
  separatorBreakpoint = Infinity,
  children,
  size,
  variant = 'default'
}: StepperProviderProps) => {
  /* ======================
          return
  ====================== */

  return (
    <StepperContext.Provider
      value={{
        alternativeLabel,
        separatorBreakpoint,
        size,
        variant
      }}
    >
      {children}
    </StepperContext.Provider>
  )
}

/* ======================

====================== */

export const useStepperContext = () => {
  const context = React.useContext(StepperContext)
  if (context === undefined) {
    throw new Error('useStepperContext must be used within a StepperContext')
  }
  return context
}
