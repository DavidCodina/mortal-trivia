'use client'

import * as React from 'react'
import { cn } from '@/utils'

/* ========================================================================

======================================================================== */

export function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return <tr data-slot='table-row' className={cn('', className)} {...props} />
}
