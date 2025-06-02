'use client'

import * as React from 'react'
import { cn } from '@/utils'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '../sheet'

import { useSidebar } from './SidebarProvider'
import { SIDEBAR_WIDTH_MOBILE } from './SidebarConstants'

type SidebarProps = React.ComponentProps<'div'> & {
  ///////////////////////////////////////////////////////////////////////////
  //
  // This has been removed in favor of `defaultSide` on the SidebarProvider.
  // This allows for the side to be used in configuring tooltip placement in SidebarMenuButton.
  // It can also be used by the SidbarTrigger to determine which icon to use.
  // ❌ side?: 'left' | 'right'
  //
  // This has been removed in favor of `defaultVariant` on the SidebarProvider.
  // The variant is then read within SidebarInset to conditionally render certain styles.
  // This became necessary because the `peer-data-[variant=inset:` modifier within SidebarInset
  // will only work when side="left".
  // ❌ variant?: 'sidebar' | 'floating' | 'inset'
  //
  // This has been removed in favor of `defaultCollapsible` on the SidebarProvider.
  // Additionally, `collapsible` and `setCollapsible` are now exposed through the SidebarProvider.
  // The advantage of moving collapsiblet to the SidebarProvider is that it now becomes immediately
  // available. The disadvantage is that all instances of Sidebar will now share the same collapsible
  // value. Practically, speaking this assumens that Sidebar will only be used ONCE throughout the
  // entire application.
  // ❌ collapsible?: 'offcanvas' | 'icon' | 'none'
  //
  ///////////////////////////////////////////////////////////////////////////
}

// Added group-data-[variant=floating]:overflow-hidden to prevent SidebarHeader and/or
// SidebarFooter content from overflowing when collapsible='icon'. This does not affect tooltips.

const sidebarBaseClasses = `
!min-h-[100px]
bg-sidebar
flex h-full w-full flex-col 
group-data-[variant=floating]:overflow-hidden
group-data-[variant=floating]:border-sidebar-border
group-data-[variant=floating]:border
group-data-[variant=floating]:rounded-lg 
group-data-[variant=floating]:shadow-sm
`

/* ========================================================================
                                  Sidebar
======================================================================== */

function Sidebar({
  children,
  className = '',
  style = {},
  ...props
}: SidebarProps) {
  const {
    isMobile,
    state,
    openMobile,
    setOpenMobile,
    collapsible,
    side,
    variant
  } = useSidebar()

  /* ======================
        return 1
  ====================== */
  ///////////////////////////////////////////////////////////////////////////
  //
  // The original ShadCN version of this was as follows:
  //
  // if (collapsible === 'none') {
  //   return (
  //     <div
  //       data-slot='sidebar'
  //       className={cn(
  //         'bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col',
  //         className
  //       )}
  //       style={style}
  //       {...props}
  //     >
  //       {children}
  //     </div>
  //   )
  // }
  //
  // However, it seemed broken. This version is the fixed implementation.
  // Note: collapsible='none' generally seems like a bad idea unless you intend to
  // change it to some other value at some breakpoint (e.g., use isMobile from provider),
  // or you know for a fact that the application is NEVER intended on mobile or tablet resolutions.
  //
  ///////////////////////////////////////////////////////////////////////////

  if (collapsible === 'none') {
    return (
      <div
        className='group text-sidebar-foreground h-dvh w-(--sidebar-width)'
        data-state={state}
        data-variant={variant}
        data-side={side}
      >
        <div
          data-slot='sidebar'
          className={cn(
            'bg-sidebar fixed flex h-dvh w-(--sidebar-width) flex-col group-data-[side=left]:border-r group-data-[side=right]:border-l',
            className
          )}
          style={style}
          {...props}
        >
          {children}
        </div>
      </div>
    )
  }

  /* ======================
        return 2
  ====================== */
  // Added overflow-hidden to prevent SidebarHeader and/or SidebarFooter content from overflowing.
  // When collapsible='icon'. This does not affect tooltips.

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          sheetOverlayClassName=''
          sheetOverlayStyle={{}}
          data-sidebar='sidebar'
          data-slot='sidebar'
          data-mobile='true'
          className={cn(
            'bg-sidebar text-sidebar-foreground w-(--sidebar-width) overflow-hidden p-0 [&>button]:hidden',
            className
          )}
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
              ...style
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className='sr-only'>
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className='overlow-hidden flex h-full w-full flex-col'>
            {children}
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  /* ======================
        return 3
  ====================== */

  return (
    <div
      className='group peer text-sidebar-foreground hidden md:block'
      data-state={state}
      data-collapsible={state === 'collapsed' ? collapsible : ''}
      data-variant={variant}
      data-side={side}
      data-slot='sidebar'
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        className={cn(
          'relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear',
          'group-data-[collapsible=offcanvas]:w-0',

          // This doesn't really make any sense to do here. It's from the original ShadCN
          // implementation, but seems like a mistake. The intention was likely to try to
          // move the element to the right side the container.
          // ❌ 'group-data-[side=right]:rotate-180',

          variant === 'floating' || variant === 'inset'
            ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
            : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon)'
        )}
      />

      <div
        ///////////////////////////////////////////////////////////////////////////
        //
        // Initially, overflow-hidden was added to prevent SidebarHeader and/or
        // SidebarFooter content from overflowing when defaultCollapsible='icon'
        // on the SidebarProvider (in layout.tsx). This does not affect tooltips from showing.
        //
        // ⚠️ 3-Way Gotcha: Focus Visibility, Overflow Constraints and Flex Layout Distribution
        //
        // When tabbing off the menu icon, it would create epic layout instability related
        // to the flex implemenation in AppSidebar that wrapped SidebarTrigger, SidebarHeader and
        // ThemeToggle. Part of the solution was to use overflow-clip instead.
        //
        // The key difference is how they handle layout calculations:
        //
        //   overflow-hidden creates a new Block Formatting Context (BFC) and can trigger layout
        //   recalculations when content changes or focus moves.
        //
        //   overflow-clip is more strict - it just clips content without creating a new BFC and
        //   doesn't participate in layout recalculations.
        //
        // So when using overflow-hidden with flexbox in the collapsed icon mode:
        //
        //   1. Tab moves focus
        //   2. Focus styles trigger a small size change
        //   3. overflow-hidden creates a BFC and participates in layout recalculation
        //   4. This layout recalculation combines with flexbox's space distribution algorithm
        //   5. In the extremely tight space, this creates a feedback loop that crashes the layout
        //
        // But with overflow-clip:
        //
        //   1. Tab moves focus
        //   2. Focus styles trigger a small size change
        //   3. overflow-clip just clips without participating in layout
        //   4. No new layout calculations are triggered
        //   5. The flexbox stays stable because it's not getting conflicting layout information
        //
        // This is why overflow-clip fixes it - it prevents the cascade of layout recalculations
        // that was happening with overflow-hidden in that extremely constrained space.
        // It's a subtle but important difference in how these two overflow properties
        // interact with layout algorithms!
        //
        // The other part of the solution was to do this in AppSidebar:
        //
        //   <ThemeToggle tabIndex={isClosed ? -1 : 0} />
        //
        // In fact, that alone seemed to be sufficient, and allowed me to optionally move back
        // to using overflow-hidden. This suggests the root issue was actually more about focus behavior
        // than pure layout instability. When focus moved to ThemeToggle, the browser was trying
        // to scroll/adjust to make the focused element visible and was fighting with both the
        // overflow-hidden and the flex layout.
        //
        // By making the ThemeToggle unfocusable when closed, focus never attempts to go to ThemeToggle,
        // the browser never attempts to make it visible, and no conflict occurs between focus behavior
        // and overflow/layout. So while there might still be some flex layout instability in play,
        // the primary issue seemed to be about focus management in overflow contexts.
        //
        ///////////////////////////////////////////////////////////////////////////

        className={cn(
          'fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) overflow-clip transition-[left,right,width] duration-200 ease-linear md:flex',

          side === 'left'
            ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
            : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',

          // Adjust the padding for floating and inset variants.
          // Note: AppSidebar has a hardcoded const floatingOffset = '16px'
          // This corresponds to the current 'p-2' value below. If you change
          // the padding here, you will likely need to change the floatingOffset in AppSidebar.

          variant === 'floating' || variant === 'inset'
            ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]'
            : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l',
          className
        )}
        {...props}
      >
        <div data-sidebar='sidebar' className={sidebarBaseClasses}>
          {children}
        </div>
      </div>
    </div>
  )
}

export { Sidebar }
