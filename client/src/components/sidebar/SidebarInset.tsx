'use client'

import * as React from 'react'
import { cn } from '@/utils'
import { useSidebar } from './SidebarProvider'

// Switched from 'main' to 'div' because the <Page> component uses <main> already.
type SidebarInsetProps = React.ComponentProps<'div'>

/* ========================================================================

======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// When the variant prop is set to inset, the sidebar becomes part of the background,
// while the main content area becomes more of a 'Paper' component (i.e., MUI).
// The main content area is pushed in and given rounded corners while the area
// behind it is blended with the sidebar color (See 'has-data-[variant=inset]:bg-sidebar'
// in SidebarProvider.tsx)
//
// If you want the content to scroll within the 'Paper' then do this:
// <SidebarInset className='md:max-h-[calc(100vh_-_16px)] md:overflow-y-auto'>
//
///////////////////////////////////////////////////////////////////////////

const SidebarInset = ({
  children,
  className,
  style = {},
  ...props
}: SidebarInsetProps) => {
  const { side, variant, state } = useSidebar()

  const class1 = 'bg-background relative flex w-full flex-1 flex-col'
  ///////////////////////////////////////////////////////////////////////////
  //
  // The default ShadCN SidebarInset used `peer-data-[variant=inset]`
  // Obviously, this ONLY works when <SidebarInset> is wrapped around children in layout.tsx
  // However, it also only works when the Sidebar is on the left. For example, this works:
  //
  //   <div className='peer mb-6 h-32 rounded-xl bg-sky-500' />
  //   <div className='h-32 rounded-xl bg-neutral-300 peer-hover:bg-pink-500' />
  //
  // But this doesn't:
  //
  //   <div className='h-32 rounded-xl bg-neutral-300 peer-hover:bg-pink-500' />
  //   <div className='peer mb-6 h-32 rounded-xl bg-sky-500' />
  //
  // In order to fully implement a side="right" implementation, the actual <AppSidebar /> needs
  // to be moved to the other side of children in the root layout. This ends up breaking
  // the intended Tailwind CSS.
  //
  // The intention with `peer-data-[variant=inset]` is that it allows the <SidebarInset>{childern}</SidebarInset>
  // implementation to be left in place even when the variant is NOT set to 'inset'. Fortunately, there's
  // a solution to all of this. Both side and variant should be moved to the SidebarProvider. In fact,
  // side was already moved to help conditionally render SidebarTrigger and tooltips within SidebarMenuButton.
  // Adding variant to the SidebarProvider now also makes sense.
  //
  ///////////////////////////////////////////////////////////////////////////

  // ❌ const class2 = `
  // md:peer-data-[variant=inset]:m-2
  // md:peer-data-[variant=inset]:ml-0
  // md:peer-data-[variant=inset]:rounded-xl
  // md:peer-data-[variant=inset]:shadow-sm
  // md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2`

  let class2 = ''
  if (variant === 'inset') {
    if (side === 'right') {
      const collapsedRight = state === 'collapsed' ? ' md:mr-2' : ''
      class2 = `md:m-2 md:mr-0 md:rounded-xl md:shadow-sm md:mr-2${collapsedRight}`
    } else {
      const collapsedLeft = state === 'collapsed' ? ' md:ml-2' : ''
      class2 = `md:m-2 md:ml-0 md:rounded-xl md:shadow-sm md:ml-2${collapsedLeft}`
    }
  }

  /* ======================
         return
  ====================== */

  // Just act as a passthrough if variant !== 'inset'.
  if (variant !== 'inset') {
    return children
  }

  return (
    <div
      data-slot='sidebar-inset'
      //
      className={cn(class1, class2, variant === 'inset' ? className : '')}
      style={
        variant === 'inset'
          ? style
          : {
              // This prevents the container from pushing the actual
              // sidebar off screen. When content can no longer shrink.
              // It works in conjunction with a Page that also has
              // overflow-hidden and a PageContainer that has overflow-x-auto.
              overflowX: 'hidden'
            }
      }
      {...props}
    >
      {children}
    </div>
  )
}

export { SidebarInset }
