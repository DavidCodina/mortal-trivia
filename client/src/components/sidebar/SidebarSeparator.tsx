'use client'

import * as React from 'react'
import { cn } from '@/utils'
import { Separator } from '@/components/separator'

/* ========================================================================

======================================================================== */
// Use the SidebarTrigger component to render a button that toggles the sidebar.
// The SidebarTrigger component must be used within a SidebarProvider.

function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot='sidebar-separator'
      data-sidebar='separator'
      // The original ShadCN used 'mx-2 w-auto', but that wasn't effective.
      className={cn(
        'bg-sidebar-border mx-auto max-w-[calc(100%_-_var(--spacing)_*_4)]',
        className
      )}
      {...props}
    />
  )
}

export { SidebarSeparator }
