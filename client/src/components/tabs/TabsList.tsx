'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/utils'

const baseClasses = `
inline-flex items-center justify-center flex-wrap gap-1
p-1 w-fit bg-background-light border rounded-lg
`

/* ========================================================================

======================================================================== */

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot='tabs-list'
      className={cn(baseClasses, className)}
      {...props}
    />
  )
}

export { TabsList }
