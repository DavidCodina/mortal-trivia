'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/utils'

const baseClasses = `
flex h-8 items-center shrink-0 rounded-md px-2 text-xs text-primary font-semibold ring-sidebar-ring
outline-hidden transition-[margin,opacity] duration-200 ease-linear 
focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0
`

// Note: group-data-[collapsible=icon]:-mt-8 works in such a way that when the Sidebar has
// collapsible, then when closed the SidebarGroupLabel's are given -mt-8. Then when not
// closed, they revert back to normal. Ultimately, this has the effect of pushing content
// down as the sidebar opens. Then moving it back up as the sidebar closes.
const groupClasses = `group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0`

/* ========================================================================

======================================================================== */

function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'div'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp
      data-slot='sidebar-group-label'
      data-sidebar='group-label'
      className={cn(baseClasses, groupClasses, className)}
      {...props}
    />
  )
}

export { SidebarGroupLabel }
