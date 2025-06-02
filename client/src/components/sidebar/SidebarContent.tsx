'use client'

import * as React from 'react'
import { cn } from '@/utils'

const baseClasses = `
 flex min-h-0 flex-1 flex-col gap-2
 overflow-auto
 group-data-[collapsible=icon]:overflow-hidden
 `

/* ========================================================================

======================================================================== */
// The SidebarContent component is used to wrap the content of the sidebar.
// This is where you add your SidebarGroup components. It is scrollable.

function SidebarContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='sidebar-content'
      data-sidebar='content'
      className={cn(baseClasses, className)}
      {...props}
    />
  )
}

export { SidebarContent }
