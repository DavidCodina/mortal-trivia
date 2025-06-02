'use client'

import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'

/* ========================================================================

======================================================================== */
// Used to group multiple DropdownMenu.Items. Using DropdownMenuGroup
// is primarily for accessibility, as it does not add any styles or behavior.

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot='dropdown-menu-group' {...props} />
  )
}

export { DropdownMenuGroup }
