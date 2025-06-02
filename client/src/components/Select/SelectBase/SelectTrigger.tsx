'use client'

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { ChevronDownIcon } from 'lucide-react'
import { cn } from '@/utils'
import { cva, type VariantProps } from 'class-variance-authority'

import {
  FIELD_FOCUS_VISIBLE_MIXIN,
  FIELD_DISABLED_MIXIN,
  FIELD_VALID_MIXIN,
  FIELD_INVALID_MIXIN
} from '@/components/component-constants'

//^ The class*='size-' may not work as expected.
const svgMixin = `
[&_svg]:pointer-events-none
[&_svg]:shrink-0
[&_svg:not([class*='size-'])]:size-4
[&_svg:not([class*='text-'])]:text-muted-foreground
`

const baseClasses = `
flex items-center justify-between gap-2
bg-background-light w-full whitespace-nowrap
px-[0.5em] py-[0.25em] rounded-[0.375em]
border outline-none
shadow-[0_1px_2px_rgba(0,0,0,0.15)]
data-[placeholder]:text-muted-foreground
*:data-[slot=select-value]:line-clamp-1
*:data-[slot=select-value]:flex
*:data-[slot=select-value]:items-center
*:data-[slot=select-value]:gap-2
transition-[color,box-shadow]
${FIELD_FOCUS_VISIBLE_MIXIN}
${FIELD_DISABLED_MIXIN}
${svgMixin}
`

/* ======================
  selectTriggerVariants
====================== */

export const selectTriggerVariants = cva(baseClasses, {
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

type SelectTriggerProps = React.ComponentProps<
  typeof SelectPrimitive.Trigger
> & {
  disabled?: boolean
  error?: string
  touched?: boolean
} & VariantProps<typeof selectTriggerVariants>

/* ========================================================================

======================================================================== */

function SelectTrigger({
  children,
  className,
  disabled = false,
  error = '',
  fieldSize,
  touched = false,
  ...otherProps
}: SelectTriggerProps) {
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
    <SelectPrimitive.Trigger
      data-slot='select-trigger'
      // No need to pass disabled={disabled}. When the Radix SelectPrimitive.Root
      // receives disabled, it assigns it to SelectTrigger internally.

      // maybeValidationMixin is intentionally last to
      // give precedence over the consumer className.
      className={cn(
        selectTriggerVariants({ fieldSize }),
        className,
        maybeValidationMixin
      )}
      {...otherProps}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon
          className={cn('text-border pointer-events-none size-4', {
            'text-destructive': error && !disabled,
            'text-success': !error && !disabled && touched
          })}
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

export { SelectTrigger }
