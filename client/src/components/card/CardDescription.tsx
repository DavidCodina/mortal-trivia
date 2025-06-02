'use client'

import * as React from 'react'
import { cn } from '@/utils'

const baseClasses = `text-muted-foreground text-sm`

/* ========================================================================

======================================================================== */

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-description'
      className={cn(baseClasses, className)}
      {...props}
    />
  )
}

export { CardDescription }
