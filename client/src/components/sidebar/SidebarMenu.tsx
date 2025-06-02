'use client'

import * as React from 'react'
import { cn } from '@/utils'

/* ========================================================================

======================================================================== */
// The SidebarMenu component is used for building a menu within a SidebarGroup.
// A SidebarMenu component is composed of SidebarMenuItem, SidebarMenuButton,
// <SidebarMenuAction /> and <SidebarMenuSub /> components.

function SidebarMenu({ className, ...props }: React.ComponentProps<'ul'>) {
  /* ======================
          return
  ====================== */

  return (
    <ul
      data-slot='sidebar-menu'
      data-sidebar='menu'
      className={cn('flex w-full min-w-0 flex-col gap-1', className)}
      {...props}
    />
  )
}

export { SidebarMenu }
