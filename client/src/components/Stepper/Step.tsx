'use client'

import * as React from 'react'
import { cn } from '@/utils'
import { useStepperContext } from './StepperContext'
import { StepCircle } from './StepCircle'
import { StepBody } from './StepBody'
import { StepSeparator } from './StepSeparator'
import { useMediaQuery } from '@/hooks'

// Why not use React.HTMLAttributes<HTMLButtonElement> ?
// Because ref is not baked into that type.
type StepProps = React.ComponentProps<'button'> & {
  description?: React.ReactNode
  icon?: React.ReactNode
  index: number
  isActive: boolean
  isCompleted: boolean
  isLoading?: boolean
  /** Use isValid  true | false | undefined to opt into success and/or error styles. */
  isValid?: boolean
  label?: React.ReactNode
}

// ⚠️ text-* size is NOT set here. Instead, set
// text-* on the `Stepper` and everything
// with em units will inherit from that.
// text-* is used to set the overall size.
const buttonBaseClasses = `
flex gap-2 text-left
[&_svg:not([class*='size-'])]:size-full
[&_svg:not([class*='size-'])]:p-[0.4em]
`

/* ========================================================================

======================================================================== */
//# Should there be a disabled prop that gets passed into the provider and
//# then propogates to buttons and determines styles?

export function Step({
  className = '',
  description = '',
  index = 0,
  isActive = false,
  isCompleted = false,
  isLoading = false,
  isValid = undefined, // Do not set true or false as the default.
  label = '',
  icon,
  ref,
  ...otherProps
}: StepProps) {
  const { alternativeLabel, separatorBreakpoint } = useStepperContext()

  // i.e., matches the breakpoint for removing the StepSeparators.
  const matches = useMediaQuery(`(max-width: ${separatorBreakpoint}px)`)

  /* ======================
        state & refs
  ====================== */

  const [_isFirst, setIsFirst] = React.useState(false)
  const [isLast, setIsLast] = React.useState(false)

  const internalButtonRef = React.useRef<HTMLButtonElement | null>(null)
  const stepCircleRef = React.useRef<HTMLDivElement | null>(null)
  // Used to calculate the gapSegment in AlternativeLabelStepSeparator.
  const gapRef = React.useRef<HTMLDivElement | null>(null)

  /* ======================
      useLayoutEffect()
  ====================== */
  // Implement useLayoutEffect to run after render and before paint.
  // At the time immediately following the first render, all steps
  // will have rendered and be known to the DOM. Consequently, we
  // can get the parent of Step, then get the [data-slot="step"] children,
  // then determine first and last buttons.

  React.useLayoutEffect(() => {
    if (!internalButtonRef.current) {
      return
    }

    const parent = internalButtonRef.current.parentElement
    const steps = parent!.querySelectorAll<HTMLElement>('[data-slot="step"]')

    if (steps.length > 0) {
      const isFirstStep = steps[0] === internalButtonRef.current
      const isLastStep = steps[steps.length - 1] === internalButtonRef.current
      setIsFirst(isFirstStep)
      setIsLast(isLastStep)
    }
  }, [])

  /* ======================
          return
  ====================== */

  return (
    <>
      <button
        // data-index is used within AlternativeLabelStepSeparator
        // to get the next button.
        data-index={index}
        data-slot='step'
        {...otherProps}
        className={cn(
          buttonBaseClasses,
          matches && 'grow-1',
          // The alternativeLabel implementation does not use horizontal
          // gap on the parent flex Stepper (only vertical gap of gap-y-4).
          // Instead, gap is emulated here with px-4.
          // The same is done in AlternativeLabelStepSeparator.
          { 'flex-col items-center px-4 text-center': alternativeLabel },
          className // If a text-* size class is passed it will override the size variant.
        )}
        ref={(node) => {
          if (ref && 'current' in ref) {
            ref.current = node
          } else if (typeof ref === 'function') {
            ref?.(node)
          }
          internalButtonRef.current = node
        }}
        type='button'
      >
        <StepCircle
          gapRef={gapRef}
          icon={icon}
          index={index}
          internalButtonRef={internalButtonRef}
          isActive={isActive}
          isCompleted={isCompleted}
          isLast={isLast}
          isLoading={isLoading}
          isValid={isValid}
          ref={stepCircleRef}
        />

        <StepBody
          description={description}
          isCompleted={isCompleted}
          isValid={isValid}
          label={label}
        />
      </button>

      {/* Used to calculate the gapSegment in AlternativeLabelStepSeparator. */}
      {alternativeLabel && !isLast && (
        <div
          ref={gapRef}
          className={cn('flex-1 self-center', matches && 'hidden')}
        />
      )}

      {!alternativeLabel && !isLast && (
        <StepSeparator
          isCompleted={isCompleted}
          isValid={isValid}
          stepCircleRef={stepCircleRef}
        />
      )}
    </>
  )
}
