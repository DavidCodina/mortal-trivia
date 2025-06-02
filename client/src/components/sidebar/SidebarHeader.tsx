'use client'

import * as React from 'react'
import { cn } from '@/utils'

/* ========================================================================

======================================================================== */
// A presentational component.
// The primary benefit of SidebarHeader is that it's sticky
// in the sense that it's unaffected by content scrolling.

function SidebarHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='sidebar-header'
      data-sidebar='header'
      className={cn(
        'text-primary flex flex-col gap-2 p-2 font-medium',
        className
      )}
      {...props}
    />
  )
}

export { SidebarHeader }
