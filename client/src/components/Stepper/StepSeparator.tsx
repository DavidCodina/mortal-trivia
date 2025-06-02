'use client'

import * as React from 'react'
import { cn } from '@/utils'
import { useStepperContext } from './StepperContext'
import { useMediaQuery } from '@/hooks'

type StepSeparatorProps = React.ComponentProps<'div'> & {
  isCompleted: boolean
  /** Use isValid  true | false | undefined to opt into success and/or error styles. */
  isValid: boolean | undefined
  stepCircleRef: React.RefObject<HTMLDivElement | null>
}

/* ========================================================================

======================================================================== */
// This is the horizontal step separator that is used when !alternativeLabel.
// When alternativeLabel is true, AlternativeLabelStepSeparator is used, which
// implements an entirely different approach.

export const StepSeparator = ({
  isCompleted = false,
  isValid = undefined, // Do not set true or false as the default.
  stepCircleRef,
  style = {},
  ...otherProps
}: StepSeparatorProps) => {
  const { separatorBreakpoint, variant } = useStepperContext()

  // i.e., matches the breakpoint for removing the StepSeparators.
  const matches = useMediaQuery(`(max-width: ${separatorBreakpoint}px)`)
  const [stepCircleHeight, setStepCircleHeight] = React.useState(0)
  const [stepCircleSize, setStepCircleSize] = React.useState(0)

  const separatorPosition: React.CSSProperties = {
    position: 'relative',
    top: stepCircleSize / 2,
    transform: 'translateY(-50%)'
  }

  /* ======================
      separatorVariant
  ====================== */

  let separatorVariant = ''

  switch (variant) {
    case 'default':
      separatorVariant = 'bg-foreground'
      break
    case 'primary':
      separatorVariant = 'bg-primary'
      break
    case 'secondary':
      separatorVariant = 'bg-secondary'
      break
    default:
      separatorVariant = 'bg-foreground'
      break
  }

  /* ======================
          useEffect()
  ====================== */

  // eslint-disable-next-line
  React.useEffect(() => {
    if (stepCircleRef.current) {
      // Gotcha: offsetHeight will not consider fractions of pixels.
      // ❌ const newHeight = stepCircleRef.current.offsetHeight
      const newHeight = stepCircleRef.current.getBoundingClientRect().height
      if (newHeight !== stepCircleHeight) {
        setStepCircleHeight(newHeight)
      }
    }
  })

  /* ======================
          useEffect()
  ====================== */
  // Update stepCircleSize.

  React.useEffect(() => {
    // Creating a new macrotask is important for getting the correct size.
    setTimeout(() => {
      if (stepCircleRef.current) {
        // This assumes the element has the same height and width.
        // Gotcha: offsetHeight will not consider fractions of pixels.
        // ❌ const height = stepCircleRef.current.offsetHeight
        const height = stepCircleRef.current.getBoundingClientRect().height
        setStepCircleSize(height)
      }
    }, 0)
  }, [stepCircleHeight, stepCircleRef])

  /* ======================
          return
  ====================== */

  return (
    <div
      {...otherProps}
      data-slot='step-separator'
      {...(isValid === false
        ? { 'data-valid': false }
        : isValid === true
          ? { 'data-valid': true }
          : {})}
      className={cn(
        'h-[2px] flex-1 self-start',
        matches && 'hidden',
        isCompleted ? separatorVariant : 'bg-border',
        isCompleted && isValid === true && 'data-[valid=true]:bg-success'
      )}
      style={{ ...style, ...separatorPosition }}
    />
  )
}
