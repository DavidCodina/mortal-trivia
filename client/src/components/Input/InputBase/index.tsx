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

// The padding and border radius match that of the button component.
const baseClasses = `
flex bg-background-light
w-full min-w-0 
[&:not([type='file'])]:px-[0.5em]
[&:not([type='file'])]:py-[0.25em]
rounded-[0.375em]
border outline-none
placeholder:text-muted-foreground
transition-[color,box-shadow]
file:text-primary-foreground 
file:bg-primary
file:border-r
file:border-border
file:font-medium
file:px-[0.5em]
file:py-[0.25em]
file:inline-flex
${FIELD_BOX_SHADOW_MIXIN}
${FIELD_FOCUS_VISIBLE_MIXIN}
${FIELD_DISABLED_MIXIN}
`

/* ======================
      inputVariants
====================== */

export const inputVariants = cva(baseClasses, {
  variants: {
    fieldSize: {
      xs: 'text-xs leading-[1.5] file:text-xs file:leading-[1.5]',
      sm: 'text-sm leading-[1.5] file:text-sm file:leading-[1.5]',
      md: 'text-base leading-[1.5] file:text-base file:leading-[1.5]',
      lg: 'text-lg leading-[1.5] file:text-lg file:leading-[1.5]',
      xl: 'text-xl leading-[1.5] file:text-xl file:leading-[1.5]'
    },
    defaultVariants: {
      fieldSize: 'md'
    }
  }
})

type InputBaseProps = React.ComponentProps<'input'> & {
  error?: string
  touched?: boolean
} & VariantProps<typeof inputVariants>

/* ========================================================================

======================================================================== */

function InputBase({
  className,
  disabled = false,
  error = '',
  fieldSize,
  touched = false,
  ...otherProps
}: InputBaseProps) {
  /* ======================
    maybeValidationMixin
  ====================== */

  const maybeValidationMixin = disabled
    ? `
    file:text-white
    file:bg-neutral-400
    file:border-neutral-400
    `
    : error // i.e., !disabled && error
      ? `
      ${FIELD_INVALID_MIXIN}
      file:text-destructive-foreground
      file:bg-destructive
      file:border-destructive
      `
      : touched // i.e., !disabled && !error && touched
        ? `
         ${FIELD_VALID_MIXIN}
         file:text-success-foreground
         file:bg-success
         file:border-success
        `
        : ``

  /* ======================
          return
  ====================== */

  return (
    <input
      data-slot='input'
      disabled={disabled}
      // maybeValidationMixin is intentionally last to
      // give precedence over the consumer className.
      className={cn(
        inputVariants({ fieldSize }),
        className,
        maybeValidationMixin
      )}
      {...otherProps}
    />
  )
}

export { InputBase }
