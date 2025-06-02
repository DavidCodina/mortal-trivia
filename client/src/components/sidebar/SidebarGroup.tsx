'use client'

import * as React from 'react'
import { cn } from '@/utils'

/* ========================================================================

======================================================================== */
// Use the SidebarGroup component to create a section within the sidebar.
// A SidebarGroup has a SidebarGroupLabel, a SidebarGroupContent and an optional
// SidebarGroupAction.

function SidebarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='sidebar-group'
      data-sidebar='group'
      className={cn('relative flex w-full min-w-0 flex-col p-2', className)}
      {...props}
    />
  )
}

export { SidebarGroup }
