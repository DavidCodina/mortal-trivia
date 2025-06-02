'use client'

import * as React from 'react'
import { cn } from '@/utils'

const baseClasses = `flex items-center justify-center px-6 my-6 gap-2`

/* ========================================================================

======================================================================== */

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-footer'
      className={cn(baseClasses, className)}
      {...props}
    />
  )
}

export { CardFooter }
