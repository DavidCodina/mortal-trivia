'use client'

import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { cn } from '@/utils'

type ModalOverlayProps = React.ComponentProps<typeof Dialog.Overlay>

const animationMixin = `
[&[data-state=closed]]:[animation:modal-overlay-closed_300ms_both]
[&[data-state=open]]:[animation:modal-overlay-open_300ms_both]
`

// By default the Radix Dialog doesn't even have a zIndex.
// Instead, it relies entirely on the Portal to put it on top
// of other content. For the most part that works, but in some
// cases it needs a little extra help. Bootstrap sets the zIndex
// of it's modals at 1055. However, the hamburger icon is set at
// 9998, so we want to use 9999 here.
const baseClasses = `
radix-modal-overlay
fixed inset-0 w-full h-full bg-black/50 outline-none
overflow-x-hidden overflow-y-auto
z-50
${animationMixin}
`

/* ========================================================================

======================================================================== */

export const ModalOverlay = ({
  children,
  className = '',
  style = {},
  ...otherProps
}: ModalOverlayProps) => {
  return (
    <Dialog.Overlay
      className={cn(baseClasses, className)}
      data-slot='modal-overlay'
      style={style}
      {...otherProps}
    >
      {children}
    </Dialog.Overlay>
  )
}
