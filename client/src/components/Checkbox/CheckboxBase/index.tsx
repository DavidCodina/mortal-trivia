'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from 'lucide-react'
import { cn } from '@/utils'

type CheckedState = CheckboxPrimitive.CheckedState

// Gotcha: simply overwriting the onChange, onBlur below is not
// sufficient. You MUST omit the original `onChange` and `onBlur`
// or Typescript will get very confused at some point.
type CheckboxBaseProps = Omit<
  React.ComponentProps<typeof CheckboxPrimitive.Root>,
  'onChange' | 'onCheckedChange' | 'onBlur'
> & {
  error?: string
  // Same type as the original onCheckedChange, but more intuitive.
  onChange?: (checkedState: CheckedState) => void
  onBlur?: (checkedState: CheckedState) => void
  touched?: boolean
}

import {
  FIELD_BOX_SHADOW_MIXIN,
  FIELD_DISABLED_MIXIN,
  FIELD_FOCUS_VISIBLE_MIXIN,
  FIELD_VALID_MIXIN,
  FIELD_INVALID_MIXIN
} from '@/components/component-constants'

const baseClasses = `
bg-background-light size-4 shrink-0 rounded-[4px] border
${FIELD_BOX_SHADOW_MIXIN}
transition-shadow outline-none
data-[state=checked]:bg-primary
data-[state=checked]:text-primary-foreground
data-[state=checked]:border-primary
${FIELD_DISABLED_MIXIN}
${FIELD_FOCUS_VISIBLE_MIXIN}
`

/* ========================================================================

======================================================================== */
// ⚠️ Internally, the Radix primitive Checkbox does implement an
// <input type='checkbox'>. However, it's not directly accessible.
// This means that any attempt to integrate react-hook-form
// with this component or any component built on top of it will
// necessarily require an RHF Controller component.

function CheckboxBase({
  className,
  disabled = false,
  error = '',
  onBlur,
  onChange,
  touched = false,
  ...otherProps
}: CheckboxBaseProps) {
  /* ======================
    maybeValidationMixin
  ====================== */

  const maybeValidationMixin = disabled
    ? `
      data-[state=checked]:bg-neutral-400
      data-[state=checked]:text-white
      data-[state=checked]:border-neutral-400
    `
    : error // i.e., !disabled && error
      ? `
      ${FIELD_INVALID_MIXIN}
      data-[state=checked]:bg-destructive
      data-[state=checked]:text-destructive-foreground
      data-[state=checked]:border-destructive
      `
      : touched // i.e., !disabled && !error && touched
        ? `
         ${FIELD_VALID_MIXIN}
        data-[state=checked]:bg-success
        data-[state=checked]:text-success-foreground
        data-[state=checked]:border-success
        `
        : ``

  /* ======================
       handleBlur()
  ====================== */

  const handleBlur = (e: React.FocusEvent<HTMLButtonElement, Element>) => {
    const dataState = e.target.getAttribute('data-state')
    const checkedState: CheckedState =
      dataState === 'checked'
        ? true
        : dataState === 'unchecked'
          ? false
          : 'indeterminate'

    onBlur?.(checkedState)
  }

  /* ======================
          return
  ====================== */

  return (
    <CheckboxPrimitive.Root
      data-slot='checkbox'
      disabled={disabled}
      // maybeValidationMixin is intentionally last to
      // give precedence over the consumer className.
      className={cn(baseClasses, className, maybeValidationMixin)}
      onBlur={handleBlur}
      onCheckedChange={(checkedState) => {
        onChange?.(checkedState)
      }}
      {...otherProps}
    >
      <CheckboxPrimitive.Indicator
        data-slot='checkbox-indicator'
        className='flex items-center justify-center text-current transition-none'
      >
        <CheckIcon className='size-3.5' />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { CheckboxBase }
