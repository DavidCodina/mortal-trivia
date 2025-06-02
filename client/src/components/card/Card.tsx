'use client'

import * as React from 'react'
import { cn } from '@/utils'

// https://ui.aceternity.com/tools/box-shadows
const aestheicShadow = `shadow-[0_3px_10px_rgb(0,0,0,0.2)]`

// The original ShadCN implementation used py-6 on Card.
// However, a better approach is to use mt-6 on each of the direct children.
// Then, CardContent gets: last:mb-6 and CardFooter gets: my-6.
const baseClasses = `
bg-background-light text-foreground
flex flex-col rounded-xl border overflow-hidden 
${aestheicShadow}
`

/* ========================================================================

======================================================================== */

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot='card' className={cn(baseClasses, className)} {...props} />
  )
}

export { Card }
