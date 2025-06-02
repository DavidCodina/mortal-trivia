'use client'

import * as React from 'react'
import { cn } from '@/utils'

/* ========================================================================

======================================================================== */

export function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
  return <th data-slot='table-head' className={cn('', className)} {...props} />
}
