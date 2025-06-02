'use client'

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { cn } from '@/utils'
import { SelectScrollUpButton } from './SelectScrollUpButton'
import { SelectScrollDownButton } from './SelectScrollDownButton'
import { SELECT_ZINDEX_CLASS } from '@/components/component-constants'

// baseClasses is relying on tailwindcss-animate
const baseClasses = `
relative
bg-background-light text-foreground
max-h-(--radix-select-content-available-height)
min-w-[8rem] origin-(--radix-select-content-transform-origin)
rounded-md border shadow-md
overflow-x-hidden overflow-y-auto
data-[state=open]:animate-in
data-[state=open]:fade-in-0
data-[state=open]:zoom-in-95
data-[state=closed]:animate-out
data-[state=closed]:fade-out-0
data-[state=closed]:zoom-out-95
data-[side=bottom]:slide-in-from-top-2
data-[side=left]:slide-in-from-right-2
data-[side=right]:slide-in-from-left-2
data-[side=top]:slide-in-from-bottom-2 
${SELECT_ZINDEX_CLASS}
`

/* ========================================================================

======================================================================== */

function SelectContent({
  className,
  children,
  position = 'popper',
  ...otherProps
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot='select-content'
        className={cn(
          baseClasses,
          // 'popper' is the default, but what is 'item-aligned'?
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className
        )}
        position={position}
        {...otherProps}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            'p-1',
            position === 'popper' &&
              `h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1`
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

export { SelectContent }
