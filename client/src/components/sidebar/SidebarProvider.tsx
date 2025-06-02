'use client'

import * as React from 'react'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/utils'

import {
  SIDEBAR_COOKIE_NAME,
  SIDEBAR_COOKIE_MAX_AGE,
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_ICON,
  SIDEBAR_KEYBOARD_SHORTCUT
} from './SidebarConstants'

type Collapsible = 'offcanvas' | 'icon' | 'none'
type Variant = 'sidebar' | 'floating' | 'inset'

type SidebarContext = {
  state: 'expanded' | 'collapsed'
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
  // Added.
  collapsible: Collapsible
  // Added.
  setCollapsible: React.Dispatch<
    React.SetStateAction<'offcanvas' | 'icon' | 'none'>
  >
  // Added.
  side: 'left' | 'right'
  setSide: React.Dispatch<React.SetStateAction<'left' | 'right'>>
  // Added.
  variant: Variant
  setVariant: React.Dispatch<React.SetStateAction<Variant>>
}

type SidebarProviderProps = React.ComponentProps<'div'> & {
  forceMobile?: boolean
  defaultCollapsible?: Collapsible
  defaultVariant?: Variant
  defaultOpen?: boolean
  defaultSide?: 'left' | 'right'
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

/* ========================================================================

======================================================================== */

const SidebarContext = React.createContext<SidebarContext | null>(null)

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  defaultCollapsible = 'offcanvas',
  defaultSide = 'left',
  defaultVariant = 'sidebar',
  forceMobile = false,
  ...props
}: SidebarProviderProps) {
  // Do it like this otherwise you may get an error for conditionally calling useIsMobile():
  // React has detected a change in the order of Hooks called by SidebarProvider.
  // This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks:
  // https://react.dev/link/rules-of-hooks
  let isMobile = useIsMobile()
  isMobile = forceMobile || isMobile

  /* ======================
        State & Refs
  ====================== */

  //  It's used by SidebarMenuButton to set hidden to true on tooltips when collapsible is 'none'.
  // Also used in SidebarTrigger - when 'none', null is returned.
  const [collapsible, setCollapsible] = React.useState<
    'offcanvas' | 'icon' | 'none'
  >(defaultCollapsible)

  // The `side` props has been removed from Sidebar. Instead defaultSide
  // is applied to the SidebarProvider. This allows for `side` to be used in
  // configuring tooltip placement in SidebarMenuButton and which icon to use within
  // SidbarTrigger.
  const [side, setSide] = React.useState<'left' | 'right'>(defaultSide)

  // The `variant` prop has bee removed from Sidebar. Instead defaultVariant
  // is applied to the SidebarProvider. This allows for `variant` to be used in
  // setting Tailwind styles within SidebarInset.
  const [variant, setVariant] = React.useState<Variant>(defaultVariant)

  const [openMobile, setOpenMobile] = React.useState(false)

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? 'expanded' : 'collapsed'

  /* ======================
          setOpen()
  ====================== */

  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === 'function' ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open]
  )

  /* ======================
        toggleSidebar()
  ====================== */
  // Helper to toggle the sidebar.

  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
  }, [isMobile, setOpen, setOpenMobile])

  /* ======================
        contextValue
  ====================== */

  const contextValue = React.useMemo<SidebarContext>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
      collapsible, // Added
      setCollapsible, // Added
      side, // Added
      setSide, // Added
      variant, // Added
      setVariant // Added
    }),
    [
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
      collapsible, // Added
      side, // Added
      variant // Added
    ]
  )

  /* ======================
         useEffect()
  ====================== */
  // Adds a keyboard shortcut to toggle the sidebar.
  // The SIDEBAR_KEYBOARD_SHORTCUT variable is used to set the keyboard
  // shortcut used to open and close the sidebar. To trigger the sidebar,
  // you use the cmd+b keyboard shortcut on Mac and ctrl+b on Windows.

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggleSidebar])

  /* ======================
          return
  ====================== */

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        data-slot='sidebar-wrapper'
        style={
          {
            '--sidebar-width': SIDEBAR_WIDTH,
            '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
            ...style
          } as React.CSSProperties
        }
        className={cn(
          'group/sidebar-wrapper group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

/* ======================

====================== */

function useSidebar() {
  const context = React.useContext(SidebarContext)

  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.')
  }

  return context
}

export { SidebarProvider, useSidebar }
