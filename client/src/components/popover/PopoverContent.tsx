'use client'

import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils'
import { POPOVER_ZINDEX_CLASS } from '../component-constants'

const baseClasses = `
bg-background-light 
p-4 w-72 rounded-md border shadow-md outline-hidden
data-[state=open]:animate-in
data-[state=closed]:animate-out
data-[state=closed]:fade-out-0
data-[state=open]:fade-in-0
data-[state=closed]:zoom-out-95
data-[state=open]:zoom-in-95
data-[side=bottom]:slide-in-from-top-2
data-[side=left]:slide-in-from-right-2
data-[side=right]:slide-in-from-left-2
data-[side=top]:slide-in-from-bottom-2 
${POPOVER_ZINDEX_CLASS}
`
/* ======================
popoverContentVariants
====================== */

export const popoverContentVariants = cva(baseClasses, {
  variants: {
    variant: {
      /* ======================
            Custom Colors
      ====================== */

      primary: `text-primary border-primary`,
      secondary: `text-secondary border-secondary`,
      info: `text-info border-info`,
      success: `text-success border-success`,
      warning: `text-warning border-warning`,
      destructive: `text-destructive border-destructive`
    }
  }
})

type PopoverContentVariants = VariantProps<typeof popoverContentVariants>

type PopoverContentProps = React.ComponentProps<
  typeof PopoverPrimitive.Content
> &
  PopoverContentVariants

/* ========================================================================

======================================================================== */

function PopoverContent({
  className,
  align = 'center',
  sideOffset = 4,
  variant,
  ...otherProps
}: PopoverContentProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align={align}
        className={cn(popoverContentVariants({ variant }), className)}
        data-slot='popover-content'
        sideOffset={sideOffset}
        {...otherProps}
      />
    </PopoverPrimitive.Portal>
  )
}

export { PopoverContent }
