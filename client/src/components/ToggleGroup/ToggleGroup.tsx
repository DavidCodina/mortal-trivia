'use client'

import * as React from 'react'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils'
import { toggleVariants } from '@/components/Toggle'
import { ToggleGroupContext } from './ToggleGroupContext'

// By setting size on the ToggleGroup to match that of the ToggleGroupItem,
// then setting rounded-[0.375em], we gaurantee that ToggleGroup will always
// have the same border radius as its items. But actually, we want TogggleGroup
// to have a slightly higher border radius.
const baseClasses = `
group/toggle-group flex w-fit items-center rounded-[calc(0.375em_+_1px)]
`

const toggleGroupVariants = cva(baseClasses, {
  variants: {
    size: {
      xs: 'text-xs leading-[1.5]',
      sm: 'text-sm leading-[1.5]',
      md: 'text-base leading-[1.5]',
      lg: 'text-lg leading-[1.5]',
      xl: 'text-xl leading-[1.5]'
    }
  },
  defaultVariants: {
    size: 'md'
  }
})

/* ========================================================================

======================================================================== */

export const ToggleGroup = ({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants>) => {
  return (
    <ToggleGroupPrimitive.Root
      data-slot='toggle-group'
      data-variant={variant}
      data-size={size}
      className={cn(toggleGroupVariants({ size }), className)}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
}
