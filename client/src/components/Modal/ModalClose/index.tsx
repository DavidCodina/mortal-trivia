'use client'

import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'
import { cn } from '@/utils'

type ModalCloseProps = React.ComponentProps<typeof Dialog.Close> & {
  closeButton?: boolean | React.JSX.Element
}

const focusMixin = `
focus-visible:ring-[2px] focus-visible:ring-primary/50 focus-visible:outline-none
`

const baseClasses = `
appearance-none
inline-flex items-center justify-center absolute top-3 right-3 rounded-full cursor-pointer
text-primary
opacity-80 transition-opacity
hover:opacity-100
disabled:pointer-events-none
[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-6
${focusMixin}
`

/* ========================================================================

======================================================================== */

export const ModalClose = ({
  closeButton = true,
  className = '',
  style = {},
  ...otherProps
}: ModalCloseProps) => {
  if (!closeButton) {
    return null
  }

  if (closeButton === true) {
    return (
      <Dialog.Close
        aria-label='Close'
        className={cn(baseClasses, className)}
        data-slot='modal-close'
        style={style}
        {...otherProps}
      >
        <XIcon />
        <span className='sr-only'>Close</span>
      </Dialog.Close>
    )
  }

  // This assumes that closeButton is a JSX element or component that can be forwarded a ref.
  return (
    <Dialog.Close asChild data-slot='modal-close' {...otherProps}>
      {closeButton}
    </Dialog.Close>
  )
}
