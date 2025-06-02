'use client'

import * as React from 'react'
import { cn } from '@/utils'

type ModalFooterProps = React.ComponentProps<'div'>

// --modal-border-radius is set within the baseClasses
// of AlertModalDialog: [--modal-border-radius:var(--radius-lg)]
const baseClasses = `
flex items-center justify-center shrink-0 flex-wrap gap-2 px-4 py-2
rounded-b-[calc(var(--modal-border-radius)_-_1px)]
`

/* ========================================================================

======================================================================== */

export const AlertModalFooter = ({
  children,
  className = '',
  style = {},
  ...otherProps
}: ModalFooterProps) => {
  /* ======================
          return
  ====================== */

  return (
    <div
      className={cn(baseClasses, className)}
      data-slot='modal-footer'
      style={style}
      {...otherProps}
    >
      {children}
    </div>
  )
}
