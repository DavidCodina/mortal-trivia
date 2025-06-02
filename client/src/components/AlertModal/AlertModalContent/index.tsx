'use client'

import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { cn } from '@/utils'

type AlertModalContentProps = React.ComponentProps<typeof AlertDialog.Content>

///////////////////////////////////////////////////////////////////////////
//
// flex styles are important here so that the following styles work correctly:
// '.radix-modal-dialog-scrollable [data-slot="modal-body"]'
//
// w-full - i.e., 100% of whatever the parent .radix-modal-dialog is.
// The important takeaway here is that width and maxWidth should
// ALWAYS BE SET ON THE DIALOG! (i.e., dialogClassName/dialogStyle props).
//
// Do not put padding on content. Instead put it on header, body, and footer.
//
// Bootstrap does this. Do we need it? // ???
// background-clip: padding-box;
//
///////////////////////////////////////////////////////////////////////////
//^ Not sure why pointer-events-auto

const baseClasses = `
flex flex-col relative w-full bg-background-light text-base
border border-(--modal-border-color) rounded-(--modal-border-radius)
shadow-[0_3px_10px_rgb(0,0,0,0.35)]
pointer-events-auto
focus:outline-none
`

/* ========================================================================

======================================================================== */

export const AlertModalContent = ({
  children,
  className = '',
  style = {},
  ...otherProps
}: AlertModalContentProps) => {
  return (
    <AlertDialog.Content
      className={cn(baseClasses, className)}
      data-slot='modal-content'
      style={style}
      {...otherProps}
    >
      {children}
    </AlertDialog.Content>
  )
}
