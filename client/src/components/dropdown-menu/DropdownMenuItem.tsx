'use client'

import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { cn } from '@/utils'

type DropdownMenuItemProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Item
> & {
  inset?: boolean
  variant?: 'default' | 'destructive'
}

///////////////////////////////////////////////////////////////////////////
//
// --destructive-foreground: oklch(0.577 0.245 27.325);
// By default, ShadCN uses --destructive-foreground: oklch(0.577 0.245 27.325), another shade of red.
// Consequently, when constructing the destructive button class it does "bg-destructive text-white"
//
// Conversely, for the primary button, ShadCN uses --primary-foreground: oklch(0.985 0 0), which is off-white.
// Consequently, the primary button class uses "bg-primary text-primary-foreground". This inconsistency
// is one of the more annoying things about ShadCN. The solution used in this project has been to
// change --destructive-foreground to var(--background-light) (i.e., #fff in light mode). This
// addresses the inconsistency issue, but it also means ShadCN destructive variants may be
// broken across different components that use --destructive-foreground associated classes.
//
///////////////////////////////////////////////////////////////////////////

// ⚠️ Changed all instances of 'text-destructive-foreground' to 'text-destructive'.
const destructiveVariantClasses = `
data-[variant=destructive]:text-destructive
data-[variant=destructive]:focus:bg-destructive/10
dark:data-[variant=destructive]:focus:bg-destructive/40
data-[variant=destructive]:focus:text-destructive
data-[variant=destructive]:*:[svg]:!text-destructive
`

const baseClasses = `
focus:bg-accent focus:text-accent-foreground 
[&_svg:not([class*='text-'])]:text-muted-foreground
relative flex cursor-default items-center gap-2 rounded-sm
px-2 py-1.5 text-sm outline-hidden select-none
data-[disabled]:pointer-events-none
data-[disabled]:opacity-50
data-[inset]:pl-8
[&_svg]:pointer-events-none
[&_svg]:shrink-0
[&_svg:not([class*='size-'])]:size-4
${destructiveVariantClasses}
`

/* ========================================================================

======================================================================== */

function DropdownMenuItem({
  className,
  inset,
  variant = 'default',
  ...props
}: DropdownMenuItemProps) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot='dropdown-menu-item'
      data-inset={inset}
      data-variant={variant}
      className={cn(baseClasses, className)}
      {...props}
    />
  )
}

export { DropdownMenuItem }
