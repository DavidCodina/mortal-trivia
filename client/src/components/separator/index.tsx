'use client'

import * as React from 'react'
import * as SeparatorPrimitive from '@radix-ui/react-separator'
import { cn } from '@/utils'

type SeparatorProps = React.ComponentProps<typeof SeparatorPrimitive.Root>

const baseClasses = `
bg-border shrink-0 
data-[orientation=horizontal]:h-px 
data-[orientation=horizontal]:w-full 
data-[orientation=vertical]:h-full 
data-[orientation=vertical]:w-px
`

/* ========================================================================

======================================================================== */
// Visually or semantically separates content.
// This component also has an asChild prop that it inherits from SeparatorPrimitive,
// but you're likely never going to need it. By default, it renders a div.

function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      data-slot='separator-root'
      // Whether or not the component is purely decorative. When true, accessibility-related attributes
      // are updated so that that the rendered element is removed from the accessibility tree.
      decorative={decorative}
      orientation={orientation}
      className={cn(baseClasses, className)}
      {...props}
    />
  )
}

export { Separator }
