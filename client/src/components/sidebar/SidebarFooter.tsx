'use client'

import * as React from 'react'
import { cn } from '@/utils'

/* ========================================================================

======================================================================== */
// A presentational component.

function SidebarFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='sidebar-footer'
      data-sidebar='footer'
      className={cn(
        'text-primary flex flex-col gap-2 p-2 font-medium',
        className
      )}
      {...props}
    />
  )
}

export { SidebarFooter }
