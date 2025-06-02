'use client'

import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { TooltipProvider } from './TooltipProvider'

type RadixTooltipProps = React.ComponentProps<typeof TooltipPrimitive.Root> & {
  skipDelayDuration?: number
}

/* ========================================================================

======================================================================== */

function Tooltip({ skipDelayDuration, ...otherProps }: RadixTooltipProps) {
  return (
    <TooltipProvider skipDelayDuration={skipDelayDuration}>
      <TooltipPrimitive.Root
        data-slot='tooltip'
        // i.e., defaultOpen, open, onOpenChange, delayDuration, disableHoverableContent
        {...otherProps}
      />
    </TooltipProvider>
  )
}

export { Tooltip }
