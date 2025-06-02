'use client'

import * as React from 'react'
import { SidebarTrigger } from './SidebarTrigger'
import { AppSidebar } from '@/components/AppSidebar'
import { useSidebar } from './SidebarProvider'
import { cn } from '@/utils'

import { SIDEBAR_TRIGGER_ZINDEX_CLASS } from '../component-constants'

type SidebarFlipperProps = {
  children: React.ReactNode
  AppSidebar: typeof AppSidebar
  SidebarTrigger: typeof SidebarTrigger
  sidebarTriggerClassName?: string
  sidebarTriggerStyle?: React.CSSProperties
}

/* ========================================================================

======================================================================== */
// This component was added to the default ShadCN implementation.
// It works in conjunction with `side` state from the SidebarProvider.
// The goal of this component is to automatically change the location of
// <AppSidebar /> relative to children. It also allows us to render
// the SidebarTrigger in a different fixed position.

const SidebarFlipper = ({
  children,
  AppSidebar,
  SidebarTrigger,
  sidebarTriggerClassName,
  sidebarTriggerStyle
}: SidebarFlipperProps) => {
  const { side } = useSidebar()

  /* ======================
          return 
  ====================== */

  if (side === 'right') {
    return (
      <>
        {children}
        <AppSidebar />
        <SidebarTrigger
          className={cn(
            'fixed top-1 right-1 cursor-pointer',
            SIDEBAR_TRIGGER_ZINDEX_CLASS,
            sidebarTriggerClassName
          )}
          style={sidebarTriggerStyle}
        />
      </>
    )
  }

  return (
    <>
      <AppSidebar />
      {children}
      <SidebarTrigger
        className={cn(
          'fixed top-1 left-1 cursor-pointer',
          SIDEBAR_TRIGGER_ZINDEX_CLASS,
          sidebarTriggerClassName
        )}
        style={sidebarTriggerStyle}
      />
    </>
  )
}

export { SidebarFlipper }
