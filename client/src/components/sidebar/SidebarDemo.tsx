'use client'

import { useState, useEffect } from 'react'

import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  Settings2,
  ChevronDown,
  Plus,
  Menu,
  MoreHorizontal
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  // SidebarRail,
  SidebarGroupAction,
  SidebarMenuAction,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuBadge,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar
} from '@/components/sidebar'

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from '@/components/collapsible'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/dropdown-menu'

import { ThemeToggle } from 'components'

import {
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_MOBILE
} from '@/components/sidebar/SidebarConstants'

const items = [
  {
    title: 'Home',
    url: '#!',
    icon: Home
  },
  {
    title: 'Inbox',
    url: '#!',
    icon: Inbox
  },
  {
    title: 'Calendar',
    url: '#!',
    icon: Calendar
  },
  {
    title: 'Search',
    url: '#!',
    icon: Search
  },
  {
    title: 'General Settings',
    url: '#!',
    icon: Settings
  }
]

import { SIDEBAR_ZINDEX_CLASS } from '@/components/component-constants'
import { cn } from '@/utils'

/* ========================================================================

======================================================================== */

export const AppSidebar = () => {
  const { open, openMobile, isMobile, collapsible, variant /*, side */ } =
    useSidebar()
  const isOpen = (open && !isMobile) || (openMobile && isMobile)
  const isClosed = !isOpen

  const _isOffcanvas = collapsible === 'offcanvas'
  const isIcon = collapsible === 'icon'
  const isNone = collapsible === 'none'

  const _isIconAndOpen = isIcon && isOpen
  const _isIconAndClosed = isIcon && isClosed

  const sidebarWidth = isMobile ? SIDEBAR_WIDTH_MOBILE : SIDEBAR_WIDTH

  // If you have a long text in SidebarHeader, SidebarFooter or SidebarGroupLabel
  // then you may not want to do this. However, for the current implementation,
  // setting whiteSpace to 'nowrap' prevents the text from increasing the height of
  // component when the sidebar isIcon and isClosed.
  const isIconTextWrappingFix = isIcon ? { whiteSpace: 'nowrap' } : {}

  const floatingOffset = '16px'

  const [collapsibleOpen, setCollapsibleOpen] = useState(false)

  useEffect(() => {
    if (isOpen === false) {
      setCollapsibleOpen(false)
    }
  }, [isOpen])

  /* ======================
  renderCollapsibleSidebarMenu()
  ====================== */

  const renderCollapsibleSidebarMenu = () => {
    return (
      <Collapsible defaultOpen={false} className='group/collapsible'>
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip='Collapsible Menu'>
              <Menu />
              <span>Collapsible Menu</span>
            </SidebarMenuButton>
          </CollapsibleTrigger>

          {/* The .CollapsibleContent class was added manually within the collapsible component.
          See here for more info: https://www.radix-ui.com/primitives/docs/components/collapsible#animating-content-size */}
          <CollapsibleContent className='CollapsibleContent'>
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild>
                  <a href='#!' className='text-[inherit]'>
                    <span>Subitem 1</span>
                  </a>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>

              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild>
                  <a href='#!' className='text-[inherit]'>
                    <span>Subitem 2</span>
                  </a>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>

              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild>
                  <a href='#!' className='text-[inherit]'>
                    <span>Subitem 3</span>
                  </a>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    )
  }

  /* ======================
      renderDropdownMenu()
  ====================== */

  const renderDropdownMenu = () => {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton asChild tooltip='Dropdown Menu'>
          <a href='#!'>
            <Settings2 />
            <span>Project Settings</span>
          </a>
        </SidebarMenuButton>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuAction>
              <MoreHorizontal />
            </SidebarMenuAction>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className='border-primary' // 'translate-x-4'
            side='right'
            align='start'
          >
            <DropdownMenuItem>
              <span>Edit Project</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Delete Project</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    )
  }

  /* ======================
      renderNavLinkGroup()
  ====================== */

  const renderNavLinkGroup = () => {
    return (
      <SidebarGroup>
        <SidebarGroupLabel
          style={{
            ...isIconTextWrappingFix
          }}
        >
          Application
        </SidebarGroupLabel>
        <SidebarGroupAction
          title='Show Alert'
          className='cursor-pointer'
          onClick={() => {
            alert('Clicked SidebarGroupAction!')
          }}
        >
          <Plus /> <span className='sr-only'>Show Alert</span>
        </SidebarGroupAction>
        <SidebarGroupContent />

        <SidebarGroupContent>
          <SidebarMenu className='gap-2'>
            {items.map((item, index) => (
              <SidebarMenuItem key={item.title}>
                {/* 
                  //# Switch to actual links.
                  //# Also what is the function of the SidebarMenuButton?
                */}
                <SidebarMenuButton
                  asChild
                  // Use the isActive prop to mark a menu item as active.
                  // This essentially changes the styles in the component by setting this: data-active={isActive}
                  // Then using the data-[active=true]: modifier. The current styles are very subtle.
                  // Right now it doesn't make any sense to implement isActive because we're mapping over the
                  // dummy items, but eventually, we can set it.

                  tooltip='This is a tooltip!'
                >
                  <a href={item.url} className='text-[inherit]'>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>

                {index === 0 ? (
                  <SidebarMenuAction
                    title='Show Alert'
                    className='cursor-pointer'
                    onClick={() => {
                      alert('Clicked SidebarMenuAction!')
                    }}
                  >
                    <Plus /> <span className='sr-only'>Show Alert</span>
                  </SidebarMenuAction>
                ) : (
                  <SidebarMenuBadge
                    // Internally SidebarMenuBadge has `pointer-events-none` so clicks
                    // and hovers  won't work here unless you overwrite that class.

                    className='bg-primary h-5 min-w-5 rounded-full text-white peer-hover/menu-button:text-white'
                  >
                    {index + 10}
                  </SidebarMenuBadge>
                )}
              </SidebarMenuItem>
            ))}

            {renderDropdownMenu()}

            {renderCollapsibleSidebarMenu()}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    )
  }

  /* ======================
  renderCollapsibleSidebarGroup()
  ====================== */
  // By default, the collapsible will not close simply because the Sidebar
  // menu closes. To fix this, make it a controlled component. Then add
  // a useEffect() that sets collapsibleOpen to false when the menu closes
  // - i.e., isOpen is false.

  const renderCollapsibleSidebarGroup = () => {
    return (
      <Collapsible
        open={collapsibleOpen}
        onOpenChange={(value) => {
          setCollapsibleOpen(value)
        }}
        className='group/collapsible'
      >
        <SidebarGroup>
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger
              tabIndex={isClosed ? -1 : 0}
              style={{
                ...isIconTextWrappingFix
              }}
            >
              Collapsible SidebarGroup
              <ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
            </CollapsibleTrigger>
          </SidebarGroupLabel>

          <CollapsibleContent className='CollapsibleContent'>
            <SidebarGroupContent>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis, cum. Minima laborum vel esse soluta, exercitationem
              voluptatem error at modi asperiores, facere alias voluptatum
              veritatis quia iusto nesciunt nemo illo repellat amet,
              reprehenderit pariatur. Quae possimus iure, inventore quasi labore
              sunt, modi qui architecto asperiores, fugiat nemo! Repellendus
              molestiae, molestias ullam id ipsa at deserunt nobis blanditiis
              tenetur veritatis asperiores accusantium non officia numquam
              voluptatem. Illo debitis fugit magnam quos blanditiis modi, ipsa
              harum nisi!
            </SidebarGroupContent>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
    )
  }

  /* ======================
         renderFooter()
  ====================== */

  const renderFooter = () => {
    if (collapsible === 'icon' && !open && !isMobile) {
      return null
    }

    return (
      <>
        <SidebarSeparator />

        {/* A presentational component that is simply a div with
        className={cn('flex flex-col gap-2 p-2', className)} */}
        <SidebarFooter
          className='items-center'
          style={{
            ...isIconTextWrappingFix
          }}
        >
          Sidebar Footer
        </SidebarFooter>
      </>
    )
  }

  /* ======================
          return
  ====================== */

  return (
    <Sidebar
      // The collapsible prop has been removed. Use defaultCollapsible on the SidebarProvider instead.
      // ❌ collapsible={collapsible}

      // ❌  variant={variant}

      // The side prop has been removed. Use defaultSide on the SidebarProvider instead.
      // side='right' will stil push content to the left.
      // In order for it to work properly, you need to place
      // <AppSidebar /> BELOW children in the layout.tsx file.
      // This is now done automatically through the SidebarFlipper component.
      // ❌ side={side}

      className={SIDEBAR_ZINDEX_CLASS}
    >
      {/* A presentational component that is simply a div with
      className={cn('flex flex-col gap-2 p-2', className)} 
      The primary benefit of SidebarHeader is that it's sticky 
      in the sense that it's unaffected by content scrolling. */}

      <div
        className={cn('flex items-center px-2', {
          'justify-between': !isNone
        })}
        style={{
          // When floating or inset, the Sidebar component sets `p-2`. This offsets that.
          minWidth:
            variant === 'floating' || variant === 'inset'
              ? `calc(${sidebarWidth} - ${floatingOffset})`
              : sidebarWidth

          // This solution was used when <ThemeToggle /> was placed on the left.
          // However, it's kind of janky because of the race condition mentioned below.
          // ...(isIconAndClosed
          //   ? {
          //       // Only do the transition when closing!
          //       // The goal is for the content here to slide off screen in sync with the
          //       // way the <SidebarContent> slides off screen. However, sometimes this
          //       // kicks off a moment before <SidebarContent> does.
          //       // transition: side === 'left' ? 'transform 200ms linear' : undefined,
          //       transform: floating
          //         ? `translateX(calc(-${sidebarWidth} + ${SIDEBAR_WIDTH_ICON} + ${floatingOffset}))`
          //         : `translateX(calc(-${sidebarWidth} + ${SIDEBAR_WIDTH_ICON}))`
          //     }
          //   : {})
        }}
      >
        {collapsible !== 'none' && (
          <SidebarTrigger className='cursor-pointer' />
        )}

        <SidebarHeader>Sidebar Header</SidebarHeader>

        {/* Conditionally setting tabIndex to -1 is very important! 
        When defaultCollapsible='icon', the content is hidden with
        overflow-hidden (now overflow-clip) in Sidebar.tsx. If you try 
        to tab to an element that is effectively hidden, the browser will 
        have a meltdown and crash the layout. This ultimately was causing
        all of SidebarContent to momentarily disappear! */}
        <ThemeToggle tabIndex={isClosed ? -1 : 0} />
      </div>

      <SidebarSeparator />

      {/* A scrollable content div with vertical flex and padding. */}
      <SidebarContent>
        {renderNavLinkGroup()}

        {renderCollapsibleSidebarGroup()}
      </SidebarContent>

      {renderFooter()}

      {/* <SidebarRail /> */}
    </Sidebar>
  )
}
