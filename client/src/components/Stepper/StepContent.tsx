'use client'

import * as React from 'react'
import { cn } from '@/utils'

type StepContentProps = React.ComponentProps<'div'> & {
  show: boolean
}

/* ========================================================================

======================================================================== */

const StepContent = ({
  children,
  className,
  show = false,
  ...otherProps
}: StepContentProps) => {
  /* ======================
          return
  ====================== */

  if (!show) {
    return null
  }

  return (
    <div
      {...otherProps}
      className={cn('bg-background-light rounded-md border p-4', className)}
      data-slot='step-content'
    >
      {children}
    </div>
  )
}

export { StepContent, StepContent as CompletedContent }
