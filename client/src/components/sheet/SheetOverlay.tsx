'use client'

import * as React from 'react'
import * as SheetPrimitive from '@radix-ui/react-dialog'
import { cn } from '@/utils'
import { SHEET_ZINDEX_CLASS } from '../component-constants'

const baseClasses = `
data-[state=open]:animate-in
data-[state=closed]:animate-out
data-[state=closed]:fade-out-0
data-[state=open]:fade-in-0
fixed inset-0 bg-black/65
${SHEET_ZINDEX_CLASS}
`

/* ========================================================================

======================================================================== */

function SheetOverlay({
  className = '',
  style = {},
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot='sheet-overlay'
      className={cn(baseClasses, className)}
      style={style}
      {...props}
    />
  )
}

export { SheetOverlay }
