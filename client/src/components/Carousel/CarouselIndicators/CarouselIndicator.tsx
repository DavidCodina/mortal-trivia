'use client'

import * as React from 'react'
import { cn } from '@/utils'

type CarouselIndicatorProps = Omit<
  React.ComponentProps<'button'>,
  'className' | 'style'
> & {
  className?: string | ((isSelected: boolean) => string)
  isSelected: boolean
  style?: React.CSSProperties | ((isSelected: boolean) => React.CSSProperties)
}

const baseClasses = `
h-2 w-6 rounded-full cursor-pointer outline-none
focus-visible:ring-1 focus-visible:ring-white
`

/* ========================================================================
                          CarouselIndicator               
======================================================================== */

export const CarouselIndicator = ({
  className = '',
  isSelected,
  onClick,
  style = {},
  ...props
}: CarouselIndicatorProps) => {
  // Both className and style can be functions that accept isSelected arg.
  className =
    typeof className === 'function' ? className(isSelected) : className

  style = typeof style === 'function' ? style(isSelected) : style

  return (
    <button
      className={cn(
        baseClasses,
        // Using alpha on the bg works better than opacity.
        // Otherwise, even the ring style would be affected.
        isSelected ? 'bg-white' : 'bg-white/50',
        className
      )}
      data-slot='carousel-indicator'
      onClick={onClick}
      style={style}
      type='button'
      {...props}
    />
  )
}
