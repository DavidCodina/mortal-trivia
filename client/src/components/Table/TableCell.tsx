'use client'

import * as React from 'react'
import { cn } from '@/utils'

/* ========================================================================

======================================================================== */

export function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return <td data-slot='table-cell' className={cn('', className)} {...props} />
}
