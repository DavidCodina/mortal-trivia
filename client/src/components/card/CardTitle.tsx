'use client'

import * as React from 'react'
import { cn } from '@/utils'

/* ========================================================================

======================================================================== */

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-title'
      // leading-none could be problematc for long titles
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  )
}

export { CardTitle }
