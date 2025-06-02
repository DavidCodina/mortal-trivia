'use client'

import * as React from 'react'
import { cn } from '@/utils'

const baseClasses = `flex flex-col gap-1.5 px-6 mt-6`

/* ========================================================================

======================================================================== */

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(baseClasses, className)}
      data-slot='card-header'
      {...props}
    />
  )
}

export { CardHeader }
