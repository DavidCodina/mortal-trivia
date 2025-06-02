'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { cn } from '@/utils'

type AccordionContentProps = React.ComponentProps<
  typeof AccordionPrimitive.Content
> & {
  shouldAnimate?: boolean
}

/* ========================================================================

======================================================================== */

function AccordionContent({
  className,
  children,
  shouldAnimate = true,
  ...props
}: AccordionContentProps) {
  /* ======================
            return 
  ====================== */

  return (
    <AccordionPrimitive.Content
      data-slot='accordion-content'
      className={cn(
        'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm',
        { AccordionContent: shouldAnimate }
      )}
      {...props}
    >
      <div className={cn('pt-0 pb-4', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { AccordionContent }
