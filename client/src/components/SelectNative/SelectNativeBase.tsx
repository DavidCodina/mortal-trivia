'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils'

import {
  FIELD_BOX_SHADOW_MIXIN,
  FIELD_FOCUS_VISIBLE_MIXIN,
  FIELD_DISABLED_MIXIN,
  FIELD_VALID_MIXIN,
  FIELD_INVALID_MIXIN
} from '@/components/component-constants'

const baseClasses = `
flex bg-background-light
w-full min-w-0 
px-[0.5em] py-[0.25em] rounded-[0.375em]
border rounded-[0.375em] outline-none
shadow-[0_1px_2px_rgba(0,0,0,0.15)]
transition-[color,box-shadow]
${FIELD_BOX_SHADOW_MIXIN}
${FIELD_FOCUS_VISIBLE_MIXIN}
${FIELD_DISABLED_MIXIN}
`

const selectVariants = cva(baseClasses, {
  variants: {
    fieldSize: {
      xs: 'text-xs leading-[1.5]',
      sm: 'text-sm leading-[1.5]',
      md: 'text-base leading-[1.5]',
      lg: 'text-lg leading-[1.5]',
      xl: 'text-xl leading-[1.5]'
    },
    defaultVariants: {
      fieldSize: 'md'
    }
  }
})

type SelectNativeBaseProps = React.ComponentProps<'select'> & {
  error?: string
  touched?: boolean
} & VariantProps<typeof selectVariants>

/* ========================================================================

======================================================================== */

export const SelectNativeBase = ({
  children,
  className = '',
  disabled = false,
  error = '',
  fieldSize,
  touched = false,
  ...otherProps
}: SelectNativeBaseProps) => {
  /* ======================
    maybeValidationMixin
  ====================== */

  const maybeValidationMixin = disabled
    ? ``
    : error // i.e., !disabled && error
      ? `${FIELD_INVALID_MIXIN}`
      : touched // i.e., !disabled && !error && touched
        ? `${FIELD_VALID_MIXIN}`
        : ``

  /* ======================
            return
    ====================== */

  return (
    <select
      // maybeValidationMixin is intentionally last to
      // give precedence over the consumer className.
      className={cn(
        selectVariants({ fieldSize }),
        className,
        maybeValidationMixin
      )}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </select>
  )
}
