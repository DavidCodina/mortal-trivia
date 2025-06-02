'use client'

import * as React from 'react'
import { Button } from '@/components'
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from '@/components/dropdown-menu'

type Checked = DropdownMenuCheckboxItemProps['checked']

/* ========================================================================

======================================================================== */

export const DropdownMenuDemo = () => {
  const [position, setPosition] = React.useState('bottom')
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  const [showPanel, setShowPanel] = React.useState<Checked>(false)

  /*======================
  renderDropdownMenuTrigger()
  ====================== */

  const renderDropdownMenuTrigger = () => {
    return (
      <DropdownMenuTrigger asChild>
        <Button
          className='mx-auto flex min-w-[100px] font-bold'
          variant='success'
          size='sm'
        >
          Open
        </Button>
      </DropdownMenuTrigger>
    )
  }

  /*======================
  renderDropdownMenuLabel()
  ====================== */

  const renderDropdownMenuLabel = () => {
    return (
      <DropdownMenuLabel
      // inset={true} // Default is undefined
      >
        My Account
      </DropdownMenuLabel>
    )
  }

  /*======================
  renderDropdownMenuGroup1()
  ====================== */

  const renderDropdownMenuGroup1 = () => {
    return (
      <DropdownMenuGroup>
        <DropdownMenuItem variant='destructive'>
          Profile
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Billing
          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Settings
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Keyboard shortcuts
          <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    )
  }

  /*======================
  renderDropdownMenuGroup2()
  ====================== */

  const renderDropdownMenuGroup2 = () => {
    return (
      <DropdownMenuGroup>
        <DropdownMenuItem>Team</DropdownMenuItem>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Email</DropdownMenuItem>
              <DropdownMenuItem>Message</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>More...</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuItem>
          New Team
          <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    )
  }

  /*======================
  renderDropdownMenuCheckboxGroup()
  ====================== */

  const renderDropdownMenuCheckboxGroup = () => {
    return (
      <DropdownMenuGroup>
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuCheckboxItem
          checked={showStatusBar}
          onCheckedChange={setShowStatusBar}
        >
          Status Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showActivityBar}
          onCheckedChange={setShowActivityBar}
          disabled
        >
          Activity Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showPanel}
          onCheckedChange={setShowPanel}
        >
          Panel
        </DropdownMenuCheckboxItem>
      </DropdownMenuGroup>
    )
  }

  /*======================
  renderDropdownMenuRadioGroup()
  ====================== */

  const renderDropdownMenuRadioGroup = () => {
    return (
      <>
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value='top'>Top</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='bottom'>Bottom</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='right'>Right</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </>
    )
  }

  /*======================
          return
  ====================== */

  return (
    <>
      <DropdownMenu
        defaultOpen={false}
        modal={true} // Default is true
      >
        {renderDropdownMenuTrigger()}

        <DropdownMenuContent className='w-56'>
          {renderDropdownMenuLabel()}

          <DropdownMenuSeparator />

          {/* <div role="group" data-slot="dropdown-menu-group"> 
          Using DropdownMenuGroup is primarily for accessibility, as 
          it does not add any styles or behavior. */}
          {renderDropdownMenuGroup1()}

          <DropdownMenuSeparator />

          {renderDropdownMenuGroup2()}

          <DropdownMenuSeparator />

          {renderDropdownMenuCheckboxGroup()}

          <DropdownMenuSeparator />

          {renderDropdownMenuRadioGroup()}

          <DropdownMenuSeparator />

          <DropdownMenuItem>GitHub</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuItem disabled>API</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
