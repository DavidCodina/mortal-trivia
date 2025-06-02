'use client'

import * as React from 'react'
import { cn } from '@/utils'

// Note: last:mb-6 will create a higher specificity such that
// if you pass in something like mb-4, it will get ignored.
// We could do this: [&:not(.mb-1,.mb-2,.mb-3,.mb-4,.mb-5)]:last:mb-6
// But it's easier to just do something like this when consuming: last:mb-4
const baseClasses = `px-6 mt-6 last:mb-6`

/* ========================================================================

======================================================================== */

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-content'
      className={cn(baseClasses, className)}
      {...props}
    />
  )
}

export { CardContent }
