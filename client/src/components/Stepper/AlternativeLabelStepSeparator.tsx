'use client'

import * as React from 'react'
import { cn } from '@/utils'
import { useStepperContext } from './StepperContext'
import { useMediaQuery } from '@/hooks'

type AlternativeLabelStepSeparatorProps = React.ComponentProps<'div'> & {
  gapRef: React.RefObject<HTMLDivElement | null>
  index: number
  internalButtonRef: React.RefObject<HTMLButtonElement | null>
  isCompleted: boolean
  /** Use isValid  true | false | undefined to opt into success and/or error styles. */
  isValid: boolean | undefined
  stepCircleRef: React.RefObject<HTMLDivElement | null>
}

/* ========================================================================

======================================================================== */
// Inspired by: https://mui.com/material-ui/react-stepper/#alternative-label

export const AlternativeLabelStepSeparator = ({
  gapRef,
  index,
  internalButtonRef,
  isCompleted = false,
  isValid = undefined, // Do not set true or false as the default.
  stepCircleRef,
  ...otherProps
}: AlternativeLabelStepSeparatorProps) => {
  const { /*alternativeLabel, */ separatorBreakpoint, variant } =
    useStepperContext()

  // i.e., matches the breakpoint for removing the StepSeparators.
  const matches = useMediaQuery(`(max-width: ${separatorBreakpoint}px)`)
  const [stepCircleHeight, setStepCircleHeight] = React.useState(0)
  const [stepCircleSize, setStepCircleSize] = React.useState(0)
  const [separatorWidth, setSeparatorWidth] = React.useState(0)

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
  ///////////////////////////////////////////////////////////////////////////
  //
  // It's plausible that one may change the size of the Step at
  // some point based on the viewport size, or some other criteria.
  // This, in turn affects the size of the stepCircle.
  //
  // Regardless of how this is accomplished, the height
  // of the stepCircle is checked on EVERY render.
  // Then stepCircleHeight is added to the dependency array
  // of the subsequent useEffect that updates the stepCircleSize.
  // Then stepCircleSize is added to the final useEffect's
  // dependency array that updates buttonWidth.
  //
  // ⚠️ This useEffect runs on EVERY render and assumes that any change to
  // stepCircleHeight will be the result of a prop change higher up
  // (e.g., className, style, or size (if exists) prop) on the Stepper:
  //
  //   <Stepper className={`${size}`} />
  //
  // Conversely, if the height changes as a result of some preexisting media query
  // that targets the step circles's size, then this useEffect will not be triggered.
  //
  //   <Stepper className="text-base lg:text-3xl" />
  //
  // However, the latter implementation still seems to work, thanks
  // to the resize handler in the buttonWidth useEffect().
  //
  ///////////////////////////////////////////////////////////////////////////

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
          useEffect()
  ====================== */
  // Update buttonWidth.

  React.useEffect(() => {
    const updateSeparatorWidth = () => {
      // Prior to implementing the resize handler, buttonWidth was only
      // being set on mount. However, the width was getting miscalculated.
      // This was fixed by creating a new macrotask. Follwing that pattern,
      // the setTimeout has also been baked into the resize handler. This
      // could potentially be too expensive, but it seems to work fine.
      setTimeout(() => {
        if (internalButtonRef.current) {
          const stepper = internalButtonRef.current.parentElement
          const currentButton = internalButtonRef.current
          const currentButtonIndex = index

          // Gotcha: offsetWidth will not consider fractions of pixels.
          // ❌ const newButtonWidth = currentButton.offsetWidth
          const newButtonWidth = currentButton.getBoundingClientRect().width

          if (gapRef.current) {
            const currentButtonSeparatorSegment =
              (newButtonWidth - stepCircleSize) / 2

            // Here gap is referring to the space between buttons - NOT a flex gap.
            // Gotcha: offsetWidth will not consider fractions of pixels.
            // ❌ const gapSegment = gapRef.current.offsetWidth
            const gapSegment = gapRef.current.getBoundingClientRect().width

            let newSeparatorWidth = currentButtonSeparatorSegment + gapSegment

            // Get nextButtonSeparatorSegment
            const nextButton = stepper?.querySelector(
              `button[data-index="${currentButtonIndex + 1}"]`
            )

            if (nextButton && nextButton instanceof HTMLElement) {
              const nextButtonWidth = nextButton.getBoundingClientRect().width
              const nextButtonSeparatorSegment =
                (nextButtonWidth - stepCircleSize) / 2
              newSeparatorWidth += nextButtonSeparatorSegment
            }

            setSeparatorWidth(newSeparatorWidth)
          }
        }
      }, 0)
    }

    updateSeparatorWidth()

    window.addEventListener('resize', updateSeparatorWidth)
    return () => {
      window.removeEventListener('resize', updateSeparatorWidth)
    }
  }, [gapRef, index, internalButtonRef, stepCircleSize])

  /* ======================
          return
  ====================== */

  return (
    <div
      {...otherProps}
      // px-4 is intended to compliment a gap-y-4 on the Stepper parent.
      className={cn('px-4', matches && 'hidden')}
      data-slot='step-separator'
      {...(isValid === false
        ? { 'data-valid': false }
        : isValid === true
          ? { 'data-valid': true }
          : {})}
      style={{
        position: 'absolute',
        top: '50%',
        left: stepCircleSize - 1, // The -1 corrects for the border
        transform: 'translateY(-50%)',
        width: separatorWidth // + 1
      }}
    >
      <div
        className={cn(
          'h-[2px]',
          isCompleted ? separatorVariant : 'bg-border',

          isCompleted && isValid === true && 'data-[valid=true]:bg-success'
        )}
      />
    </div>
  )
}
