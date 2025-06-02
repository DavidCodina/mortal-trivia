'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDownIcon } from 'lucide-react'
import { cn } from '@/utils'

import { FIELD_FOCUS_VISIBLE_MIXIN } from '@/components/component-constants'

const baseClasses = `
flex flex-1 items-start justify-between gap-4
py-4 text-left text-sm font-medium transition-all outline-none
${FIELD_FOCUS_VISIBLE_MIXIN}
disabled:pointer-events-none disabled:opacity-50 
[&[data-state=open]>svg]:rotate-180
`

/* ========================================================================

======================================================================== */

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className='flex'>
      <AccordionPrimitive.Trigger
        data-slot='accordion-trigger'
        className={cn(baseClasses, className)}
        {...props}
      >
        {children}
        <ChevronDownIcon
          // ❌ text-muted-foreground - removing this enables text color inheritance
          className='pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200'
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

export { AccordionTrigger }
