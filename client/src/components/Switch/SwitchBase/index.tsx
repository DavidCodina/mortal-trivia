'use client'

import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cn } from '@/utils'
import {
  FIELD_BOX_SHADOW_MIXIN,
  FIELD_DISABLED_MIXIN,
  FIELD_FOCUS_VISIBLE_MIXIN,
  FIELD_VALID_MIXIN,
  FIELD_INVALID_MIXIN
} from '@/components/component-constants'

type SwitchBaseProps = Omit<
  React.ComponentProps<typeof SwitchPrimitive.Root>,
  'onChange' | 'onCheckedChange' | 'onBlur'
> & {
  error?: string
  // Same as onCheckedChange, but the naming is more intuitive.
  onChange?: ((checked: boolean) => void) | undefined
  onBlur?: ((checked: boolean) => void) | undefined
  touched?: boolean
}

const rootBaseClasses = `
inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full
border border-transparent cursor-pointer
transition-all outline-none
data-[state=checked]:bg-primary
data-[state=unchecked]:bg-neutral-300
dark:data-[state=unchecked]:bg-accent
${FIELD_BOX_SHADOW_MIXIN}
${FIELD_FOCUS_VISIBLE_MIXIN}
${FIELD_DISABLED_MIXIN}
`

const thumbBaseClasses = `
block bg-background-light size-4 pointer-events-none  
rounded-full ring-0 transition-transform
data-[state=unchecked]:translate-x-0
dark:data-[state=unchecked]:bg-foreground
data-[state=checked]:translate-x-[calc(100%-2px)]
dark:data-[state=checked]:bg-primary-foreground
`

/* ========================================================================

======================================================================== */

export const SwitchBase = ({
  className,
  disabled = false,
  error = '',
  onChange,
  onBlur,
  touched = false,
  ...otherProps
}: SwitchBaseProps) => {
  /* ======================
    maybeValidationMixin
  ====================== */

  const maybeValidationMixin = disabled
    ? `
    data-[state=checked]:bg-neutral-400
    data-[state=unchecked]:bg-neutral-400
    
    `
    : error // i.e., !disabled && error
      ? `
      ${FIELD_INVALID_MIXIN}
      data-[state=checked]:bg-destructive
      data-[state=unchecked]:bg-destructive
   
      `
      : touched // i.e., !disabled && !error && touched
        ? `
         ${FIELD_VALID_MIXIN}
         data-[state=checked]:bg-success
          data-[state=unchecked]:bg-success
        `
        : ``

  /* ======================
          return
  ====================== */

  return (
    <SwitchPrimitive.Root
      {...otherProps}
      data-slot='switch'
      disabled={disabled}
      // maybeValidationMixin is intentionally last to
      // give precedence over the consumer className.
      className={cn(rootBaseClasses, className, maybeValidationMixin)}
      onCheckedChange={(checked) => {
        onChange?.(checked)
      }}
      onBlur={(e) => {
        const dataState = e.target.getAttribute('data-state')
        onBlur?.(dataState === 'checked')
      }}
    >
      <SwitchPrimitive.Thumb
        data-slot='switch-thumb'
        className={cn(thumbBaseClasses)}
      />
    </SwitchPrimitive.Root>
  )
}
