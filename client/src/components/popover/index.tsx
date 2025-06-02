'use client'

import * as React from 'react'
import { Popover as RadixPopover } from '@/components/popover/Popover'
import { PopoverContent } from '@/components/popover/PopoverContent'
import { PopoverTrigger } from '@/components/popover/PopoverTrigger'

type PopoverContentProps = React.ComponentProps<typeof PopoverContent>
type PopoverContentRef = PopoverContentProps['ref']

type PopoverProps = React.ComponentProps<typeof RadixPopover> & {
  trigger: React.JSX.Element
  /** Useful in components like DatePicker to opt out of blur logic
   * when blur occurs and focus goes to popover menu.
   */
  popoverContentRef?: PopoverContentRef
} & PopoverContentProps

/* ========================================================================

======================================================================== */

export const Popover = ({
  children,
  defaultOpen,
  open,
  onOpenChange,
  modal = false,
  popoverContentRef,
  trigger,
  ...otherContentProps
}: PopoverProps) => {
  return (
    <RadixPopover
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
      modal={modal}
    >
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        ref={popoverContentRef}
        // See here for full list of props (implicitly includes className, style, etc.)
        // https://www.radix-ui.com/primitives/docs/components/popover#content
        {...otherContentProps}
      >
        {children}
      </PopoverContent>
    </RadixPopover>
  )
}
