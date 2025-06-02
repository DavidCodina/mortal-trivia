'use client'

import * as React from 'react'
import { cn } from '@/utils'

type AlertModalBodyProps = React.ComponentProps<'div'>

// --modal-border-radius is set within the baseClasses
// of AlertModalDialog: [--modal-border-radius:var(--radius-lg)]
const baseClasses = `
relative flex-auto p-4
rounded-[calc(var(--modal-border-radius)_-_1px)]
`

/* ========================================================================

======================================================================== */

export const AlertModalBody = ({
  children,
  className,
  style,
  ...otherProps
}: AlertModalBodyProps) => {
  return (
    <div
      className={cn(baseClasses, className)}
      data-slot='modal-body'
      style={style}
      {...otherProps}
    >
      {children}
    </div>
  )
}
