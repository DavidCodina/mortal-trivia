'use client'

import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { cn } from '@/utils'

// Exporting this is useful for typing state when consuming.
export type RadioValue = React.ComponentProps<
  typeof RadioGroupPrimitive.Item
>['value']

// Gotcha: simply overwriting the onChange, onBlur below is not
// sufficient. You MUST omit the original `onChange` and `onBlur`
// or Typescript will get very confused at some point.
type RadioGroupBaseProps = Omit<
  React.ComponentProps<typeof RadioGroupPrimitive.Root>,
  'onValueChange' | 'onChange' | 'onBlur'
> & {
  // Same type as the original Radix onValueChange, but more intuitive.
  onChange?: (value: RadioValue) => void
  onBlur?: (value: RadioValue) => void
}

/* ========================================================================

======================================================================== */
// ⚠️ Internally, the Radix primitive RadioGroup does implement an
// <input type='radio'>. However, it's not directly accessible.
// This means that any attempt to integrate react-hook-form
// with this component or any component built on top of it will
// necessarily require an RHF Controller component.

export const RadioGroupBase = ({
  className,
  onBlur,
  onChange,
  ref,
  ...otherProps
}: RadioGroupBaseProps) => {
  const radioGroupRef = React.useRef<HTMLDivElement>(null)

  /* ======================
          return
  ====================== */

  return (
    <RadioGroupPrimitive.Root
      {...otherProps}
      ref={(node) => {
        if (ref && 'current' in ref) {
          ref.current = node
        } else if (typeof ref === 'function') {
          ref?.(node)
        }
        radioGroupRef.current = node
      }}
      data-slot='radio-group'
      className={cn('flex flex-col gap-2', className)}
      onBlur={(e) => {
        const currentTarget = e.currentTarget
        // Use setTimeout to create a new macrotask.
        setTimeout(() => {
          let value = ''
          ///////////////////////////////////////////////////////////////////////////
          //
          // The onBlur should only run when the element that gets
          // focus is outside of the radio group container.
          // This creates the effect of a group blur.
          // Without this, the RadioGroup actually blurs on focus!
          // This happens because focus is initially on the group <div> itself,
          // then moves the the specific 'radio' button - one of the many quirks
          // of Radix primitives!
          //
          ///////////////////////////////////////////////////////////////////////////

          const radioGroup = radioGroupRef.current
          const activeElement = document.activeElement
          if (radioGroup && radioGroup.contains(activeElement)) {
            return
          }

          // Find the first button with data-state="checked".
          const checkedButton = Array.from(
            currentTarget.querySelectorAll('button[data-state="checked"]')
          )[0]

          if (checkedButton) {
            value = checkedButton.getAttribute('value') || ''
          }

          onBlur?.(value)
        }, 0)
      }}
      onValueChange={(value) => {
        onChange?.(value)
      }}
    />
  )
}
