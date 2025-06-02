'use client'

import * as React from 'react'
import { cn } from '@/utils'

type AlertModalDialogProps = React.ComponentProps<'div'> & {
  centered: boolean
  scrollable: boolean
  fullscreen: boolean
}

// ⚠️ This is using classes from modalPlugin.ts.
const baseClasses = `
radix-modal-dialog
relative
[--modal-dialog-spacing:24px]
[--modal-border-radius:var(--radius-lg)]
[--modal-border-color:var(--primary)]
pointer-events-none
`

/* ========================================================================

======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// In Radix, the convention is to name the entire component 'AlertDialog'. However, in Bootstrap
// the 'dialog' (i.e., <div className='modal-dialog'>) refers to the part of the modal that
// contains/wraps the <div className='modal-content'>. This extra wrapper is useful
// for features like centering and scrolling.
//
// Note: The radix-modal-dialog CSS styles were originally taken from Bootstrap. With Bootstrap modal's
// the width of the modal is responsive. However, often the width of the modal becomes too narrow even when there
// is still sufficient browser width. To counteract this, you can do something like the following:
//
//   modalDialogStyle={{
//     width: 800,
//     maxWidth: 'calc(100vw - 48px)'
//   }}
//
// But actually, the easiest way to adjust the horizontal/vertical spacing around
// the dialog is to reset the custom property from within Tailwind,
// using an arbitrary property. For example:
//
//   dialogClassName='w-[800px] [--modal-dialog-spacing:24px]'
//
///////////////////////////////////////////////////////////////////////////

export const AlertModalDialog = ({
  centered = false,
  children,
  className = '',
  fullscreen = false,
  // By default this should be true so that <select>s will be able to overflow.
  scrollable = false,
  style = {},
  ...otherProps
}: AlertModalDialogProps) => {
  /* ======================
          return
  ====================== */

  return (
    <div
      className={cn(
        baseClasses,
        !fullscreen &&
          'mx-auto my-(--modal-dialog-spacing) max-w-[calc(100%_-_var(--modal-dialog-spacing)_*_2)]',
        fullscreen && 'radix-modal-fullscreen',
        // scrollable will interfere with fullscreen
        scrollable && !fullscreen && 'radix-modal-dialog-scrollable',
        // centered is unnecessary if fullscreen
        centered && !fullscreen && 'radix-modal-dialog-centered',
        className
      )}
      data-slot='modal-dialog'
      style={style}
      {...otherProps}
    >
      {children}
    </div>
  )
}
