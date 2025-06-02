'use client'

import * as React from 'react'
import { Check, LoaderCircle, X } from 'lucide-react'
import { cn } from '@/utils'
import { useStepperContext } from './StepperContext'
import { AlternativeLabelStepSeparator } from './AlternativeLabelStepSeparator'

type StepCircleProps = Omit<React.ComponentProps<'div'>, 'ref'> & {
  gapRef: React.RefObject<HTMLDivElement | null>
  internalButtonRef: React.RefObject<HTMLButtonElement | null>
  icon?: React.ReactNode
  index: number
  isActive: boolean
  isCompleted: boolean
  isLast: boolean
  isLoading?: boolean
  /** Use isValid  true | false | undefined to opt into success and/or error styles. */
  isValid?: boolean
  ref: React.RefObject<HTMLDivElement | null>
}

const baseClasses = `
flex justify-center items-center shrink-0
relative size-[2.5em] font-bold
border rounded-full shadow-[0px_1px_1px_rgba(0,0,0,0.35)]
`

/* ========================================================================

======================================================================== */

export const StepCircle = ({
  gapRef,
  icon,
  index = 0,
  internalButtonRef,
  isActive = false,
  isCompleted = false,
  isLast,
  isLoading = false,
  isValid = undefined, // Do not set true or false as the default.
  ref,
  ...otherProps
}: StepCircleProps) => {
  const { alternativeLabel, variant } = useStepperContext()

  // Note: <Check /> still is given precedence lower
  // down whenever isCompleted is true.
  icon = isLoading ? (
    <LoaderCircle className='animate-spin' />
  ) : isValid === false ? (
    <X />
  ) : (
    icon
  )

  /* ======================
  renderAlternativeLabelStepSeparator()
  ====================== */

  const renderAlternativeLabelStepSeparator = () => {
    // Opt out on the consuming side, rather than returning null internally. Why?
    // Because the internal logic setup up resize listener's and other expensive operation.
    if (!alternativeLabel || isLast) {
      return null
    }

    return (
      <AlternativeLabelStepSeparator
        gapRef={gapRef}
        index={index}
        internalButtonRef={internalButtonRef}
        isCompleted={isCompleted}
        isValid={isValid}
        stepCircleRef={ref}
      />
    )
  }

  /* ======================
         Variants
  ====================== */
  // Initially, I thought to use cva() for variants. However, on top of
  // each individual variant, there are also different states, and some of them
  // need to have precedence over others (i.e., isActive > isCompleted).
  // Consequently, it made more sense to do it all manually.

  const defaultVariant =
    // isActive styles should have precedence over isCompleted styles.
    isActive
      ? `
        bg-background-light border-foreground text-foreground
        `
      : isCompleted
        ? `
          bg-[oklch(from_var(--color-foreground)_calc(l_+_0.15)_c_h)]
          dark:bg-[oklch(from_var(--color-foreground)_calc(l_-_0.03)_c_h)]
          text-white dark:text-black border-foreground
          `
        : `
          text-foreground border-foreground dark:text-muted-foreground dark:border-border
          `

  const primaryVariant = isActive
    ? `
      bg-background-light border-primary text-primary
      `
    : isCompleted
      ? `
        bg-primary text-primary-foreground
        border-[oklch(from_var(--color-primary)_calc(l_-_0.25)_c_h)]
        dark:border-[oklch(from_var(--color-primary)_calc(l_+_0.25)_c_h)]
        `
      : `
        text-muted-foreground
        `

  const secondaryVariant = isActive
    ? `
      bg-background-light border-secondary text-secondary
      `
    : isCompleted
      ? `
        bg-secondary text-secondary-foreground
        border-[oklch(from_var(--color-secondary)_calc(l_-_0.25)_c_h)]
        dark:border-[oklch(from_var(--color-secondary)_calc(l_+_0.25)_c_h)]
        `
      : `
        text-muted-foreground
        `

  let stepCircleVariant = ''

  switch (variant) {
    case 'default':
      stepCircleVariant = defaultVariant
      break
    case 'primary':
      stepCircleVariant = primaryVariant
      break
    case 'secondary':
      stepCircleVariant = secondaryVariant
      break

    default:
      stepCircleVariant = defaultVariant
      break
  }

  /* ======================
          return
  ====================== */

  return (
    <div
      {...otherProps}
      className={cn(
        baseClasses,
        stepCircleVariant,
        !isCompleted &&
          isValid === false &&
          'data-[valid=false]:text-destructive data-[valid=false]:border-destructive',

        isCompleted &&
          isActive &&
          `data-[valid=true]:text-success data-[valid=true]:border-success`,
        isCompleted &&
          !isActive &&
          isValid === true &&
          `data-[valid=true]:bg-success data-[valid=true]:text-success-foreground data-[valid=true]:border-[oklch(from_var(--color-success)_calc(l_-_0.25)_c_h)]`
      )}
      data-slot='step-circle'
      {...(isValid === false
        ? { 'data-valid': false }
        : isValid === true
          ? { 'data-valid': true }
          : {})}
      ref={ref}
    >
      {isCompleted ? <Check /> : icon ? icon : <span>{index + 1}</span>}

      {renderAlternativeLabelStepSeparator()}
    </div>
  )
}
