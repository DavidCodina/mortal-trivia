'use client'

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { CheckIcon } from 'lucide-react'
import { cn } from '@/utils'

const disabledMixin = `
data-[disabled]:pointer-events-none
data-[disabled]:opacity-50 
`

//^ Again, not sure the svg part will work.
const svgMixin = `
[&_svg:not([class*='text-'])]:text-muted-foreground
[&_svg]:pointer-events-none
[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4
`

const baseClasses = `
flex items-center gap-2
relative w-full py-1.5 pr-8 pl-2 text-sm
select-none cursor-default rounded-sm outline-hidden 
focus:bg-accent focus:text-accent-foreground
*:[span]:last:flex *:[span]:last:items-center
*:[span]:last:gap-2
${disabledMixin}
${svgMixin}
`

/* ========================================================================

======================================================================== */

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot='select-item'
      className={cn(baseClasses, className)}
      {...props}
    >
      <span className='absolute right-2 flex size-3.5 items-center justify-center'>
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className='size-4' />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

export { SelectItem }
