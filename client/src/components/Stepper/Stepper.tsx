'use client'

import * as React from 'react'
import { cn } from '@/utils'
import { StepperProvider } from './StepperContext'

type Variant = React.ComponentProps<typeof StepperProvider>['variant']
type Size = React.ComponentProps<typeof StepperProvider>['size']
type StepperProps = React.ComponentProps<'div'>

const basesClasses = `
flex flex-wrap justify-between
`

// 1.5 is a sensible default for line-height.
// Bootstrap does: --bs-body-line-height: 1.5;
// On the other hand, Tailwind uses a line-height of 1
// for text-5xl and above. This would inevitably cause
// wrapped text lines to touch each other. The fact that
// Tailwind couples font-size with line-height is one of
// its few shortcomings.
const sizeDictionary = {
  xs: 'text-xs leading-[1.5]',
  sm: 'text-sm leading-[1.5]',
  md: 'text-base leading-[1.5]',
  lg: 'text-lg leading-[1.5]',
  xl: 'text-xl leading-[1.5]',
  '2xl': 'text-2xl leading-[1.5]',
  '3xl': 'text-3xl leading-[1.5]',
  '4xl': 'text-4xl leading-[1.5]',
  '5xl': 'text-5xl leading-[1.5]',
  '6xl': 'text-6xl leading-[1.5]',
  '7xl': 'text-7xl leading-[1.5]',
  '8xl': 'text-8xl leading-[1.5]',
  '9xl': 'text-9xl leading-[1.5]'
}

/* ========================================================================

======================================================================== */

export function Stepper({
  alternativeLabel = false,
  children,
  className,
  separatorBreakpoint = Infinity,
  size,
  variant = 'default',
  ...otherProps
}: StepperProps & {
  alternativeLabel?: boolean
  separatorBreakpoint?: number
  size?: Size
  variant?: Variant
}) {
  /* ======================
          return
  ====================== */

  return (
    <StepperProvider
      alternativeLabel={alternativeLabel}
      separatorBreakpoint={separatorBreakpoint}
      // The size variant is applied to the Stepper itself. All children
      // then inherit the font-size. Associated element sizes are based off
      // of em units .Technically, there's no reason to pass  size into
      // StepperProvider, but it doesn't hurt.
      size={size}
      variant={variant}
    >
      <div
        data-slot='stepper'
        {...otherProps}
        className={cn(
          basesClasses,
          alternativeLabel ? 'gap-y-4' : 'gap-4',
          size && sizeDictionary[size],
          // Passing a text-* class to the className will override the size variant.
          className
        )}
      >
        {children}
      </div>
    </StepperProvider>
  )
}
