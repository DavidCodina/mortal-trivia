'use client'

import * as React from 'react'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import { cn } from '@/utils'

const viewportBaseClasses = `
size-full outline-none rounded-[inherit]
transition-[color,box-shadow]
focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-1
`

type ScrollAreaThumbProps = React.ComponentProps<
  typeof ScrollAreaPrimitive.ScrollAreaThumb
>

type ScrollAreaProps = React.ComponentProps<typeof ScrollAreaPrimitive.Root> & {
  thumbProps?: ScrollAreaThumbProps
  scrollbarProps?: React.ComponentProps<
    typeof ScrollAreaPrimitive.ScrollAreaScrollbar
  >
}

/* ========================================================================

======================================================================== */

function ScrollArea({
  className,
  children,
  scrollbarProps,
  thumbProps,
  ...props
}: ScrollAreaProps) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot='scroll-area'
      className={cn('relative', className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        className={viewportBaseClasses}
        data-slot='scroll-area-viewport'
      >
        {children}
      </ScrollAreaPrimitive.Viewport>

      <ScrollBar thumbProps={thumbProps} {...scrollbarProps} />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

/* ========================================================================

======================================================================== */

type ScrollbarProps = React.ComponentProps<
  typeof ScrollAreaPrimitive.ScrollAreaScrollbar
> & {
  thumbProps?: ScrollAreaThumbProps
}

function ScrollBar({
  className,
  orientation = 'vertical',
  thumbProps,
  ...props
}: ScrollbarProps) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot='scroll-area-scrollbar'
      orientation={orientation}
      className={cn(
        'flex touch-none p-px transition-colors select-none',
        orientation === 'vertical' &&
          'h-full w-1.5 border-l border-l-transparent',
        orientation === 'horizontal' &&
          'h-1.5 flex-col border-t border-t-transparent',
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        {...thumbProps}
        className={cn(
          'bg-border relative flex-1 rounded-full',
          thumbProps?.className
        )}
        data-slot='scroll-area-thumb'
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea }
