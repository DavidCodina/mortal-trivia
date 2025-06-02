'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/utils'

// This need an overhaul.
const focusMixin = `
focus-visible:border-ring focus-visible:ring-ring/50
focus-visible:outline-ring
focus-visible:ring-[3px]
focus-visible:outline-1
`

const activeMixin = `
data-[state=active]:bg-accent
data-[state=active]:text-foreground
data-[state=active]:border-border
data-[state=active]:shadow-[0_1px_2px_rgba(0,0,0,0.35)]
`

//# Test this.
const disabledMixin = `
disabled:pointer-events-none disabled:opacity-50
`

// ⚠️ It's unlikely that this will work: [&_svg:not([class*='size-'])]:size-4
//# Normally, I make the size 1.25em.
const svgMixin = `
[&_svg]:pointer-events-none
[&_svg]:shrink-0
[&_svg:not([class*='size-'])]:size-4
`

//# The gap is for SVGs presumably.
//# Test against svgs.

//# Not a big fan of using text-muted-foreground below.
//# Ultimately, I'd like to remove all instances of *-muted and *-muted-foreground
//# from app.
// flex-1 will give all triggers on the same line the same width.
// flex-auto would allow longer items to take up more space.
// In either case, you have to be careful that the text does not bleed out.
const baseClasses = `
inline-flex flex-1 items-center justify-center gap-1
px-2 py-1 
text-muted-foreground text-sm font-medium whitespace-nowrap
border border-transparent rounded-md
cursor-pointer
transition-[color,box-shadow]
${focusMixin}
${activeMixin}
${disabledMixin}
${svgMixin}
`

/* ========================================================================

======================================================================== */

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot='tabs-trigger'
      className={cn(baseClasses, className)}
      {...props}
    />
  )
}

export { TabsTrigger }
