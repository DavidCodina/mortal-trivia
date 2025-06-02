'use client'

import * as React from 'react'
import { cn } from '@/utils'

/* ========================================================================

======================================================================== */

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='alert-title'
      // line-clamp-1 will generate ellipsis if the text is too long.
      className={cn(
        'line-clamp-1 text-base font-bold tracking-tight',
        className
      )}
      {...props}
    />
  )
}

export { AlertTitle }
