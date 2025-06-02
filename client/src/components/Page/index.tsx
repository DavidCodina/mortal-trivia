'use client'

import { ComponentProps } from 'react'
import { cn } from '@/utils'
import { PageContainer } from './PageContainer'

import { CurrentPageLoader, CurrentPageLoaderProps } from '@/components'
type PageProps = ComponentProps<'main'> & {
  currentPageLoader?: boolean
  currentPageLoaderProps?: CurrentPageLoaderProps
}

/* ========================================================================
                                  Page
======================================================================== */

const Page = ({
  children,
  className = '',
  currentPageLoader = false,
  currentPageLoaderProps = {},
  style = {},
  ...otherProps
}: PageProps) => {
  /* ======================
          return
  ====================== */

  return (
    <>
      <main
        data-slot='page'
        ///////////////////////////////////////////////////////////////////////////
        //
        // ⚠️ New: Changed `overflow-x-auto` here to `overflow-hidden` and put `overflow-x-auto`
        // on Pagecontainer. Note: Some kind of overlflow strategy is necessary in order to
        // prevent a a right-aligned, defaultCollapsible='none' Sidebar from getting pushed off
        // the right side of the viewport when content gets scrunched.
        //
        // ⚠️ Normally, this would also be added: min-h-screen. However, using just flex-1 here
        // works because both SidebarProvider (flex min-h-svh) and SidebarInset (flex flex-1)
        // manage to set the height to at least 100% of the viewport height. In fact, if we
        // were to set min-h-screen here, it would be too much height for the Sidebar component's
        // inset variant.
        //
        ///////////////////////////////////////////////////////////////////////////

        className={cn(
          `relative mx-auto flex w-full flex-1 flex-wrap overflow-hidden`,
          className
        )}
        style={style}
        {...otherProps}
      >
        {currentPageLoader && <CurrentPageLoader {...currentPageLoaderProps} />}

        {children}
      </main>
    </>
  )
}

export { Page, PageContainer }
