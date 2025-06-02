'use client'

import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { CircleIcon } from 'lucide-react'
import { cn } from '@/utils'

import {
  FIELD_BOX_SHADOW_MIXIN,
  FIELD_DISABLED_MIXIN,
  FIELD_FOCUS_VISIBLE_MIXIN,
  FIELD_VALID_MIXIN,
  FIELD_INVALID_MIXIN
} from '@/components/component-constants'

type RadioGroupItemBaseProps = React.ComponentProps<
  typeof RadioGroupPrimitive.Item
> & {
  error?: string
  touched?: boolean
}

// The text color matters because it affects the icon's outer border color.
// and the fill color.
const baseClasses = `
bg-background-light text-primary size-4 shrink-0 rounded-full border aspect-square
transition-[box-shadow] outline-none
${FIELD_BOX_SHADOW_MIXIN}
${FIELD_FOCUS_VISIBLE_MIXIN}
${FIELD_DISABLED_MIXIN}
`

/* ========================================================================

======================================================================== */

export const RadioGroupItemBase = ({
  className,
  error = '',
  disabled = false,
  touched = false,
  ...otherProps
}: RadioGroupItemBaseProps) => {
  /* ======================
    maybeValidationMixin
  ====================== */

  const maybeValidationMixin = disabled
    ? `data-[state=checked]:text-neutral-400`
    : error // i.e., !disabled && touched
      ? `${FIELD_INVALID_MIXIN} data-[state=checked]:text-destructive`
      : touched // i.e., !disabled && !error && touched
        ? `${FIELD_VALID_MIXIN} data-[state=checked]:text-success`
        : ``

  /* ======================
          return
  ====================== */

  return (
    <RadioGroupPrimitive.Item
      data-slot='radio-group-item'
      disabled={disabled}
      // maybeValidationMixin is intentionally last to
      // give precedence over the consumer className.
      className={cn(baseClasses, className, maybeValidationMixin)}
      {...otherProps}
    >
      <RadioGroupPrimitive.Indicator
        data-slot='radio-group-indicator'
        className='relative flex items-center justify-center'
      >
        <CircleIcon className='absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 fill-current' />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}
