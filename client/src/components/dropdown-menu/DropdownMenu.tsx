'use client'

import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'

/* ========================================================================

======================================================================== */
// https://www.radix-ui.com/primitives/docs/components/dropdown-menu#root
// Props: defaultOpen, open, onOpenChange, modal, dir

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot='dropdown-menu' {...props} />
}

export { DropdownMenu }
