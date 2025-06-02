'use client'

import * as React from 'react'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils'
import { toggleVariants } from '@/components/Toggle'
import { ToggleGroupContext } from './ToggleGroupContext'

///////////////////////////////////////////////////////////////////////////
//
// Added: not-last:border-r-0
//
// The original ShadCN implementation did:
//
//   data-[variant=outline]:border-l-0
//   data-[variant=outline]:first:border-l
//
// Gotcha: Adding min-w-0 here will break the w-fit on the ToggleGroup.
// This happens in part because the parent is also a flex container.
//
///////////////////////////////////////////////////////////////////////////

const baseClasses = `
flex-1 shrink-0 rounded-none shadow-none
first:rounded-l-[0.375em] last:rounded-r-[0.375em] 
not-last:border-r-0
focus:z-10 focus-visible:z-10
`

type ToggleGroupItemProps = React.ComponentProps<
  typeof ToggleGroupPrimitive.Item
> &
  VariantProps<typeof toggleVariants>

/* ========================================================================

======================================================================== */

export const ToggleGroupItem = ({
  className,
  children,
  variant,
  size,
  ...props
}: ToggleGroupItemProps) => {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      data-size={context.size || size}
      data-slot='toggle-group-item'
      data-variant={context.variant || variant}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size
        }),
        baseClasses,
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
}
