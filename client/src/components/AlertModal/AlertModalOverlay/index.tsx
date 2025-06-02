'use client'

import * as React from 'react'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { cn } from '@/utils'

type AlertModalOverlayProps = React.ComponentProps<typeof AlertDialog.Overlay>

// ⚠️ This is using animations from modalPlugin.ts.
const animationMixin = `
[&[data-state=closed]]:[animation:modal-overlay-closed_300ms_both]
[&[data-state=open]]:[animation:modal-overlay-open_300ms_both]
`

const baseClasses = `
radix-modal-overlay
fixed inset-0 w-full h-full bg-black/50 outline-none
overflow-x-hidden overflow-y-auto
z-50
${animationMixin}
`

/* ========================================================================

======================================================================== */
// AlertDialog.Overlay differs from the regular Radix Dialog.Overlay in that
// it does not close the AlertDialog when clicking outside  of the content area.

export const AlertModalOverlay = ({
  children,
  className = '',
  style = {},
  ...otherProps
}: AlertModalOverlayProps) => {
  return (
    <AlertDialog.Overlay
      className={cn(baseClasses, className)}
      data-slot='modal-overlay'
      style={style}
      {...otherProps}
    >
      {children}
    </AlertDialog.Overlay>
  )
}
