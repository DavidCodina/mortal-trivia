import * as React from 'react'
import { MoreHorizontal } from 'lucide-react'
import { cn } from '@/utils/index'

const baseClasses = `flex items-center justify-center h-full`

/* ========================================================================

======================================================================== */

export const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => {
  return (
    <span
      aria-hidden='true'
      data-slot='breadcrumb-ellipsis'
      role='presentation'
      className={cn(baseClasses, className)}
      {...props}
    >
      <MoreHorizontal className='h-[1.25em] w-[1.25em]' />
      <span className='sr-only'>More</span>
    </span>
  )
}
