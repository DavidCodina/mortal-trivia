'use client'

import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { cn } from '@/utils'
import { DROPDOWN_MENU_ZINDEX_CLASS } from '../component-constants'

const baseClasses = `
bg-background-light text-foreground
max-h-(--radix-dropdown-menu-content-available-height)
min-w-[8rem] overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md
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
${DROPDOWN_MENU_ZINDEX_CLASS}
`

/* ========================================================================

======================================================================== */

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot='dropdown-menu-content'
        sideOffset={sideOffset}
        className={cn(baseClasses, className)}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

export { DropdownMenuContent }
