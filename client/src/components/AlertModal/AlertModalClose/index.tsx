'use client'

import * as React from 'react'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { XIcon } from 'lucide-react'
import { cn } from '@/utils'

type AlertModalCloseProps = React.ComponentProps<typeof AlertDialog.Cancel> & {
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
///////////////////////////////////////////////////////////////////////////
//
// The standard Radix Dialog exposes a Dialog.Close component. However, the AlertDialog
// does not have an AlertDialog.Close component. Instead, it has a AlertDialog.Cancel
// and/or AlertDialog.Action. Essentially,they behave the same, but the naming convention
// is intended to emphasize the fact that AlertDialog is designed for critical interactions.
//
// AlertDialog.Cancel is a contextual cancel action that explicitly signals a user opting
// out of a critical decision. Since AlertDialog is intended for irreversible or important
// actions, having a "Cancel" button reinforces the idea that the user is making an intentional
// choice to not proceed rather than simply closing the modal.
//
// Having said that, it's arguably somewhat conceptually inappropriate to have a close button
// that defaults to an X for an AlertModal. It's not wrong, but it's going against the grain
// of having an explicit "Cancel" button. Instead, the consumer is allowed to pass closeButton={true}
// for the X icon. Conversely, for creating a dedicated "Cancel" button, the AlertModal exports:
//
//   export const AlertModalCancel = AlertDialog.Cancel
//
// This allows the consumer to create their own "Cancel" button:
//
//   <AlertModalCancel asChild>
//     <Button
//       className='min-w-[100px]'
//       size='sm'
//       type='button'
//       variant='destructive'
//     >Cancel</Button>
//   </AlertModalCancel>
//
///////////////////////////////////////////////////////////////////////////

export const AlertModalClose = ({
  closeButton = true,
  className = '',
  style = {},
  ...otherProps
}: AlertModalCloseProps) => {
  if (!closeButton) {
    return null
  }

  if (closeButton === true) {
    return (
      <AlertDialog.Cancel
        aria-label='Close'
        className={cn(baseClasses, className)}
        data-slot='modal-close'
        style={style}
        {...otherProps}
      >
        <XIcon />
        <span className='sr-only'>Close</span>
      </AlertDialog.Cancel>
    )
  }

  // This assumes that closeButton is a JSX element or component that can be forwarded a ref.
  return (
    <AlertDialog.Cancel
      aria-label='Close'
      asChild
      className={className}
      data-slot='modal-close'
      style={style}
      {...otherProps}
    >
      {closeButton}
    </AlertDialog.Cancel>
  )
}
