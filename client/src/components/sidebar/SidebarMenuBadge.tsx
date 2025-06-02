'use client'

import * as React from 'react'
import { cn } from '@/utils'

// ShadCN overcomplicates it with all of this instead of just doing: top-1/2 -translate-y-1/2
// 'peer-data-[size=sm]/menu-button:top-1',
// 'peer-data-[size=default]/menu-button:top-1.5',
// 'peer-data-[size=lg]/menu-button:top-2.5',
const baseClasses = `
flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-2
h-5 min-w-5
text-sidebar-foreground pointer-events-none rounded-md px-1 text-xs font-medium tabular-nums select-none
peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground
group-data-[collapsible=icon]:hidden
`

/* ========================================================================

======================================================================== */
// The SidebarMenuBadge component is used to render a badge within a SidebarMenuItem.

function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='sidebar-menu-badge'
      data-sidebar='menu-badge'
      className={cn(baseClasses, className)}
      {...props}
    />
  )
}

export { SidebarMenuBadge }
