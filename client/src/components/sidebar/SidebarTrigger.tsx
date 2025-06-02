'use client'

import * as React from 'react'
import {
  PanelLeftIcon,
  PanelRightIcon,
  PanelLeftClose,
  PanelRightClose
  // XIcon
} from 'lucide-react'
import { cn } from '@/utils'
import { Button } from '@/components'
import { useSidebar } from './SidebarProvider'

type SidebarTriggerProps = React.ComponentProps<typeof Button>

/* ========================================================================

======================================================================== */
// Use the SidebarTrigger component to render a button that toggles the sidebar.
// The SidebarTrigger component must be used within a SidebarProvider.
// The side prop here, the collapsible state from useSidebar(), the null return
// and the conditional OpenIcon/CloseIcon logic have all been added.

function SidebarTrigger({ className, onClick, ...props }: SidebarTriggerProps) {
  const { toggleSidebar, open, isMobile, openMobile, collapsible, side } =
    useSidebar()
  const OpenIcon = side === 'right' ? PanelRightIcon : PanelLeftIcon
  const CloseIcon = side === 'right' ? PanelRightClose : PanelLeftClose // XIcon

  if (collapsible === 'none') {
    return null
  }

  return (
    <button
      data-sidebar='trigger'
      data-slot='sidebar-trigger'
      //# Add focus-visible style...
      className={cn(
        'text-primary hover:bg-primary/15 cursor-pointer rounded-full p-1',
        className
      )}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      {(open && !isMobile) || (isMobile && openMobile) ? (
        <CloseIcon />
      ) : (
        <OpenIcon />
      )}
      <span className='sr-only'>Toggle Sidebar</span>
    </button>
  )
}

export { SidebarTrigger }
